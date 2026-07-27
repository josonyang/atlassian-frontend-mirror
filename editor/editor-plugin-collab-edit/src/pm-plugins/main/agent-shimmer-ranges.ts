import type { AgentEditShimmerNotShownReason } from '@atlaskit/editor-common/analytics/types/agent-edit-shimmer-events';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { Transaction } from '@atlaskit/editor-prosemirror/state';
import type { Step } from '@atlaskit/editor-prosemirror/transform';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { getCollabState } from '@atlaskit/prosemirror-collab';
import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';

import type { AgentShimmerPhase, AgentShimmerRange } from './agent-shimmer-decorations';

// When an agent step lands we cover the top-level block(s) it wrote with a skeleton-loader shimmer
// (plus a Rovo agent telepointer at the end of the range), then remove it on a timer to reveal the
// content. Gated behind the `platform_editor_agent_be_streaming` experiment. `shimmerDurationMs` and
// `highlightDurationMs` size the skeleton and purple-highlight phases and toggle independently: `0` on
// either skips that phase, `0` on both shows nothing.
let agentShimmerIdCounter = 0;

// A step is position-neutral when its StepMap changes no range's length — i.e. it shifts no
// positions. Attribute-only steps (e.g. `localId` assignment) produce an empty StepMap, and
// same-size replacements preserve lengths, so both are position-neutral. Used to decide whether a
// rebase over local unconfirmed steps could have invalidated our index-based range math.
export const isPositionNeutralStep = (step: Step): boolean => {
	let neutral = true;
	step.getMap().forEach((oldStart: number, oldEnd: number, newStart: number, newEnd: number) => {
		if (oldEnd - oldStart !== newEnd - newStart) {
			neutral = false;
		}
	});
	return neutral;
};

// Top-level block/position helpers over a doc. Kept at module scope (rather than re-created as
// closures on every call) so they are defined once, reusable, and unit-testable. Each clamps into
// valid document coordinates before resolving.
const clampToDoc = (doc: PMNode, pos: number): number =>
	Math.min(Math.max(pos, 1), doc.content.size);
const topLevelBlockIndexAt = (doc: PMNode, pos: number): number =>
	doc.resolve(clampToDoc(doc, pos)).index(0);
// Start of the content of the top-level block containing `pos`, so the whole block is covered.
const topLevelBlockContentStart = (doc: PMNode, pos: number): number => {
	const $pos = doc.resolve(clampToDoc(doc, pos));
	return $pos.depth >= 1 ? $pos.start(1) : pos;
};
// End of the content of the top-level block containing `pos`, so the whole block is covered.
const topLevelBlockContentEnd = (doc: PMNode, pos: number): number => {
	const $pos = doc.resolve(clampToDoc(doc, pos));
	return $pos.depth >= 1 ? $pos.end(1) : pos;
};

/**
 * Derive the shimmer ranges for the agent-authored steps in a received batch, in final-doc
 * coordinates. `agentType` present ⇒ agent-authored (per the NCS↔Editor steps contract). Each
 * emitted range is expanded to the whole top-level block(s) the agent touched, which the plugin
 * covers with the skeleton shimmer. Ranges with no new content (pure deletions) are dropped.
 *
 * Steps whose new content is in the same or directly-adjacent top-level block are coalesced into one
 * range, so an edit that arrives as several steps in a region shimmers as a single unit. Edits
 * separated by an untouched block stay independent.
 *
 * Correctness: the range math assumes `tr` is a linear 1:1 apply of `steps`. Under the native collab
 * plugin, `receiveTransaction` rebases incoming steps over unconfirmed local steps when they exist;
 * that only invalidates our positions if a local step shifted positions, so we skip solely when a
 * rebased local step changed sizes (a rare, safe degrade). Any unexpected error also degrades to no
 * shimmer, so this never throws into the shared remote-step handler.
 */
export const getAgentShimmerRanges = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	json: any[],
	steps: Step[],
	tr: Transaction,
	view: EditorView,
	shimmerDurationMs: number,
	highlightDurationMs: number,
	telepointerEnabled: boolean,
	// Called when an agent-authored batch did NOT get the shimmer and applied instantly, so the
	// caller can fire the `agentEditShimmerNotShown` operational event. Not called when both phases are
	// off (config) or the batch has no agent steps; those aren't "not shown" cases.
	onNotShown?: (reason: AgentEditShimmerNotShownReason, agentType?: string, error?: Error) => void,
): AgentShimmerRange[] => {
	if (!expValEquals('platform_editor_agent_be_streaming', 'isEnabled', true)) {
		return [];
	}
	// The two phases toggle independently: `shimmerDurationMs` sizes the skeleton, `highlightDurationMs`
	// sizes the purple highlight, and `0` on either skips just that phase. Nothing to reveal only when
	// both are off.
	if (shimmerDurationMs <= 0 && highlightDurationMs <= 0) {
		return [];
	}
	// Start in the skeleton phase when it's enabled, otherwise straight into the purple highlight phase
	// (skeleton toggled off, highlight on).
	const initialPhase: AgentShimmerPhase = shimmerDurationMs > 0 ? 'skeleton' : 'highlight';
	// Telepointer label = the agent's type upper-cased (e.g. `mcp` → "MCP"), falling back to a generic
	// "Agent"; `undefined` when the telepointer is disabled, so the plugin skips it. `agentType` is the
	// same on every step of an agent batch, so read it from the first agent-authored step.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const agentType = json.find((step: any) => typeof step?.agentType === 'string')?.agentType as
		| string
		| undefined;
	// No agent-authored steps in this batch — nothing to shimmer, and not a "not shown" case.
	if (agentType === undefined) {
		return [];
	}
	const telepointerLabel = telepointerEnabled ? agentType.toUpperCase() || 'Agent' : undefined;
	// When the batch was rebased over local unconfirmed steps, our index-based range math is only
	// valid if those local steps shifted no positions. Attribute-only steps (e.g. `localId`) and
	// same-size replacements are position-neutral, so the shimmer stays correct. Skip only when a
	// local step actually changed sizes (a genuine concurrent content edit).
	if (Number(tr.getMeta('rebased')) > 0) {
		const unconfirmed = getCollabState(view.state)?.unconfirmed ?? [];
		if (unconfirmed.some((entry) => !isPositionNeutralStep(entry.step))) {
			onNotShown?.('rebasedConcurrentEdit', agentType);
			return [];
		}
	}

	try {
		// Map an inserted range in doc_{i+1} forward through the remaining steps to final-doc coords.
		// (A later step's own inserted content starts at its `from`; only subsequent steps shift it.)
		const mapToFinalDoc = (pos: number, stepIndex: number, bias: number): number => {
			let p = pos;
			for (let j = stepIndex + 1; j < steps.length; j++) {
				p = steps[j].getMap().map(p, bias);
			}
			return p;
		};

		// Derive each agent step's changed ranges from its StepMap — the canonical, step-type-agnostic
		// source of what a step wrote. We only need the NEW extent (the content now in the document), in
		// final-doc coords, since the highlight decorates content that is already present.
		type StepRange = { from: number; to: number };
		const infos: StepRange[] = [];
		json.forEach((rawStep, index) => {
			if (typeof rawStep?.agentType !== 'string') {
				return;
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const pmStep = steps[index] as any;
			if (typeof pmStep?.getMap !== 'function') {
				return;
			}
			pmStep
				.getMap()
				.forEach((_oldStart: number, _oldEnd: number, newStart: number, newEnd: number) => {
					if (newEnd <= newStart) {
						return; // pure deletion / attribute-only — no new content to highlight
					}
					infos.push({
						from: mapToFinalDoc(newStart, index, -1),
						to: mapToFinalDoc(newEnd, index, 1),
					});
				});
		});

		if (!infos.length) {
			onNotShown?.('nothingToShow', agentType);
			return [];
		}

		// Group the changed ranges by the TOP-LEVEL block they landed in, then highlight each touched
		// block IN FULL. NCS emits a single agent edit as many small replace fragments and often keeps a
		// common prefix/suffix untouched, so the changed sub-ranges cover only part of a block (e.g. half
		// a rewritten heading). Expanding to the whole block's content makes the entire heading/paragraph
		// shimmer as one unit rather than leaving the unchanged half undecorated. Directly-adjacent
		// touched blocks (index n and n+1) merge into one group so a multi-block rewrite reveals together;
		// a genuinely untouched block in between (index gap > 1) splits the run, so far-apart edits stay
		// independent.
		const sorted = [...infos].sort((a, b) => a.from - b.from || a.to - b.to);
		const groups: Array<{ from: number; maxBlock: number; to: number }> = [];
		sorted.forEach((info) => {
			const block = topLevelBlockIndexAt(tr.doc, info.from);
			const current = groups[groups.length - 1];
			if (current && block <= current.maxBlock + 1) {
				current.to = Math.max(current.to, info.to);
				current.maxBlock = Math.max(current.maxBlock, block);
			} else {
				groups.push({ from: info.from, to: info.to, maxBlock: block });
			}
		});

		return groups.map(
			(group): AgentShimmerRange => ({
				shimmerId: `agent-shimmer-${agentShimmerIdCounter++}`,
				from: topLevelBlockContentStart(tr.doc, group.from),
				to: topLevelBlockContentEnd(tr.doc, group.to),
				telepointerLabel,
				phase: initialPhase,
				highlightDurationMs,
			}),
		);
	} catch (err) {
		// Never let shimmer range derivation throw into the shared remote-step handler; degrade to no
		// shimmer.
		onNotShown?.('captureThrew', agentType, err as Error);
		return [];
	}
};
