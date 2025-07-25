import type { IntlShape } from 'react-intl-next';

import { type PortalProviderAPI } from '@atlaskit/editor-common/portal';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { stepAddsOneOf } from '@atlaskit/editor-common/utils';
import { getChangedNodes, isReplaceDocOperation } from '@atlaskit/editor-common/utils/document';
import type { Mark, Node, NodeType } from '@atlaskit/editor-prosemirror/model';
import { PluginKey } from '@atlaskit/editor-prosemirror/state';
import type {
	EditorState,
	ReadonlyTransaction,
	Transaction,
} from '@atlaskit/editor-prosemirror/state';
import type { Step } from '@atlaskit/editor-prosemirror/transform';
import type { ContentNodeWithPos } from '@atlaskit/editor-prosemirror/utils';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import {
	akEditorDefaultLayoutWidth,
	akEditorFullWidthLayoutWidth,
	akEditorCalculatedWideLayoutWidth,
} from '@atlaskit/editor-shared-styles';
import { fg } from '@atlaskit/platform-feature-flags';

import type {
	BreakoutPlugin,
	BreakoutPluginOptions,
	BreakoutPluginState,
} from '../breakoutPluginType';

import { type GUIDELINE_KEYS } from './get-guidelines';
import { handleKeyDown } from './handle-key-down';
import { ResizingMarkView } from './resizing-mark-view';
import { updateExpandedStateNew } from './utils/single-player-expand';

type AddBreakoutToResizableNodeProps = {
	node: Node;
	pos: number;
	newState: EditorState;
	newTr: Transaction;
	breakoutResizableNodes: Set<NodeType>;
	isFullWidthEnabled: boolean;
};

const addBreakoutToResizableNode = ({
	node,
	pos,
	newState,
	newTr,
	breakoutResizableNodes,
	isFullWidthEnabled,
}: AddBreakoutToResizableNodeProps) => {
	let updatedDocChanged = false;
	let updatedTr = newTr;

	const $pos = newState.doc.resolve(pos);
	const isTopLevelNode = $pos?.depth === 0;

	if (breakoutResizableNodes.has(node.type) && isTopLevelNode) {
		const { breakout } = newState.schema.marks;
		const { expand } = newState.schema.nodes;
		const breakoutMark = node.marks.find((mark) => mark.type === breakout);
		const isExpand = node.type === expand;

		if (!breakoutMark) {
			const width = isFullWidthEnabled ? akEditorFullWidthLayoutWidth : akEditorDefaultLayoutWidth;

			updatedTr = newTr.setNodeMarkup(pos, node.type, node.attrs, [
				breakout.create({ width: width }),
			]);

			if (isExpand && fg('platform_editor_breakout_resizing_hello_release')) {
				updateExpandedStateNew({ tr: updatedTr, node, pos, isLivePage: true });
			}

			updatedDocChanged = true;
		} else if (breakoutMark?.attrs.width === null || breakoutMark?.attrs.width === undefined) {
			const mode = breakoutMark.attrs.mode;

			const newWidth = fg('platform_editor_breakout_resizing_patch_1')
				? // if breakout is present on node, but page appearance is 'full width' force width to full width to maintain backwards compatibility
					isFullWidthEnabled || mode === 'full-width'
					? akEditorFullWidthLayoutWidth
					: akEditorCalculatedWideLayoutWidth
				: mode === 'wide'
					? akEditorCalculatedWideLayoutWidth
					: akEditorFullWidthLayoutWidth;

			updatedTr = newTr.setNodeMarkup(pos, node.type, node.attrs, [
				breakout.create({ width: newWidth, mode: mode }),
			]);

			if (isExpand && fg('platform_editor_breakout_resizing_hello_release')) {
				updateExpandedStateNew({ tr: updatedTr, node, pos, isLivePage: true });
			}

			updatedDocChanged = true;
		}
	}

	return { updatedTr, updatedDocChanged };
};

export const resizingPluginKey = new PluginKey<BreakoutPluginState>('breakout-resizing');

export type ActiveGuidelineKey = Exclude<
	(typeof GUIDELINE_KEYS)[keyof typeof GUIDELINE_KEYS],
	'grid_left' | 'grid_right'
>;

type UpdateBreakoutNode = {
	type: 'UPDATE_BREAKOUT_NODE';
	data: ContentNodeWithPos;
};

type ResetState = {
	type: 'RESET_STATE';
};

type UpdateActiveGuidelineKey = {
	type: 'UPDATE_ACTIVE_GUIDELINE_KEY';
	data: {
		activeGuidelineKey: ActiveGuidelineKey;
	};
};

type ClearActiveGuidelineKey = {
	type: 'CLEAR_ACTIVE_GUIDELINE_KEY';
};

type ResizingPluginStateMeta =
	| UpdateBreakoutNode
	| UpdateActiveGuidelineKey
	| ClearActiveGuidelineKey
	| ResetState;

const pluginState = {
	init() {
		return {
			breakoutNode: undefined,
			activeGuidelineLabel: undefined,
		};
	},
	apply(tr: ReadonlyTransaction, pluginState: BreakoutPluginState) {
		const meta = tr.getMeta(resizingPluginKey) as undefined | ResizingPluginStateMeta;

		if (meta) {
			switch (meta.type) {
				case 'UPDATE_BREAKOUT_NODE':
					return {
						...pluginState,
						breakoutNode: meta.data,
					};
				case 'UPDATE_ACTIVE_GUIDELINE_KEY':
					return {
						...pluginState,
						activeGuidelineKey: meta.data.activeGuidelineKey,
					};

				case 'CLEAR_ACTIVE_GUIDELINE_KEY':
					return {
						...pluginState,
						activeGuidelineKey: undefined,
					};
				case 'RESET_STATE':
					return {
						activeGuidelineLabel: undefined,
						breakoutNode: undefined,
					};
			}
		}

		return pluginState;
	},
};

export const createResizingPlugin = (
	api: ExtractInjectionAPI<BreakoutPlugin> | undefined,
	getIntl: () => IntlShape,
	nodeViewPortalProviderAPI: PortalProviderAPI,
	options?: BreakoutPluginOptions,
) => {
	return new SafePlugin({
		key: resizingPluginKey,
		state: fg('platform_editor_breakout_resizing_hello_release') ? pluginState : undefined,
		props: {
			markViews: {
				breakout: (mark: Mark, view: EditorView) => {
					return new ResizingMarkView(mark, view, api, getIntl, nodeViewPortalProviderAPI);
				},
			},
			handleKeyDown: handleKeyDown(api),
		},
		appendTransaction(
			transactions: readonly Transaction[],
			oldState: EditorState,
			newState: EditorState,
		) {
			if (fg('platform_editor_breakout_resizing_patch_1')) {
				if (api?.editorViewMode?.sharedState.currentState()?.mode === 'view') {
					return;
				}
			} else {
				// if editor is in live-view mode don't send transactions
				if (
					api?.editorViewMode?.sharedState.currentState()?.mode !== 'edit' &&
					fg('platform_editor_breakout_resizing_hello_release')
				) {
					return;
				}
			}

			let newTr = newState.tr;
			let hasDocChanged = false;

			const { expand, codeBlock, layoutSection } = newState.schema.nodes;
			const breakoutResizableNodes = new Set([expand, codeBlock, layoutSection]);

			const isFullWidthEnabled = !(options?.allowBreakoutButton === true);

			if (isReplaceDocOperation(transactions, oldState)) {
				newState.doc.forEach((node: Node, pos: number) => {
					const { updatedTr, updatedDocChanged } = addBreakoutToResizableNode({
						node,
						pos,
						newState,
						newTr,
						breakoutResizableNodes,
						isFullWidthEnabled,
					});

					newTr = updatedTr;
					hasDocChanged = hasDocChanged || updatedDocChanged;
				});
			} else {
				transactions.forEach((tr: Transaction) => {
					const isAddingResizableNodes = tr.steps.some((step: Step) =>
						stepAddsOneOf(step, breakoutResizableNodes),
					);

					if (isAddingResizableNodes) {
						const changedNodes = getChangedNodes(tr);
						changedNodes.forEach(({ node, pos }) => {
							const { updatedTr, updatedDocChanged } = addBreakoutToResizableNode({
								node,
								pos,
								newState,
								newTr,
								breakoutResizableNodes,
								isFullWidthEnabled,
							});

							newTr = updatedTr;
							hasDocChanged = hasDocChanged || updatedDocChanged;
						});
					}
				});
			}

			if (hasDocChanged) {
				return newTr;
			}
		},
	});
};
