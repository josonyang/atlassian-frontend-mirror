import {
	LIMITED_MODE_DEFAULT_DOC_SIZE_THRESHOLD,
	LIMITED_MODE_DEFAULT_NODE_COUNT_THRESHOLD,
} from '@atlaskit/editor-common/limited-mode-document-thresholds';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { PluginKey } from '@atlaskit/editor-prosemirror/state';
import type { EditorState, ReadonlyTransaction } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';

import type { LimitedModePluginState } from '../limitedModePluginType';

export const limitedModePluginKey: PluginKey = new PluginKey('limitedModePlugin');

type EditorStateConfig = Parameters<typeof EditorState.create>[0];

/**
 * Determines whether limited mode should be enabled for a document.
 * If this logic changes, update the duplicate in `editor-common/src/node-anchor/node-anchor-provider.ts` to avoid drift.
 *
 * Limited mode is activated when ANY of the following conditions are met:
 * 1. Document size exceeds `LIMITED_MODE_DEFAULT_DOC_SIZE_THRESHOLD`
 * 2. Node count exceeds `LIMITED_MODE_DEFAULT_NODE_COUNT_THRESHOLD`
 * 3. Document contains a legacy-content macro (LCM)
 *
 * Performance optimisations:
 * - Doc size is checked first (O(1)) - if it exceeds threshold, we skip traversal entirely.
 * - If we find an LCM during traversal, we exit early since limited mode will be enabled.
 */
const shouldEnableLimitedModeForDocument = (doc: PMNode): boolean => {
	const nodeCountThreshold = LIMITED_MODE_DEFAULT_NODE_COUNT_THRESHOLD;
	const docSizeThreshold = LIMITED_MODE_DEFAULT_DOC_SIZE_THRESHOLD;

	// Early exit: doc size exceeds threshold - O(1), no traversal needed
	if (doc.nodeSize > docSizeThreshold) {
		return true;
	}

	// Single traversal for node count and LCM detection
	let nodeCount = 0;
	let hasLcm = false;

	doc.descendants((node: PMNode) => {
		nodeCount += 1;

		if (node.attrs?.extensionKey === 'legacy-content') {
			hasLcm = true;

			// Early exit: LCM found — limited mode will be enabled
			return false;
		}
	});

	// LCM condition takes precedence (if we early exited traversal, this is why)
	if (hasLcm) {
		return true;
	}

	// Check node count threshold
	if (nodeCount > nodeCountThreshold) {
		return true;
	}

	return false;
};

export const createPlugin = (): SafePlugin<LimitedModePluginState> => {
	return new SafePlugin<LimitedModePluginState>({
		key: limitedModePluginKey,
		view: (_view: EditorView) => {
			return {};
		},
		state: {
			init(_config: EditorStateConfig, editorState: EditorState) {
				return {
					documentSizeBreachesThreshold: shouldEnableLimitedModeForDocument(editorState.doc),
				};
			},
			apply: (
				tr: ReadonlyTransaction,
				currentPluginState: LimitedModePluginState,
				_oldState: EditorState,
				_newState: EditorState,
			) => {
				// Don't check the document size if we're already in limited mode.
				// We ALWAYS want to re-check the document size if we're replacing the document (e.g. live-to-live page navigation).

				if (currentPluginState.documentSizeBreachesThreshold && !tr.getMeta('replaceDocument')) {
					return currentPluginState;
				}

				return {
					documentSizeBreachesThreshold: shouldEnableLimitedModeForDocument(tr.doc),
				};
			},
		},
	});
};
