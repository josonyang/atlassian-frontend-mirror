import { uuid } from '@atlaskit/adf-schema';
import { SetAttrsStep } from '@atlaskit/adf-schema/steps';
import type { Dispatch, EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import { type PortalProviderAPI } from '@atlaskit/editor-common/portal';
import type { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { createSelectionClickHandler, GapCursorSelection } from '@atlaskit/editor-common/selection';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { getStepRange } from '@atlaskit/editor-common/utils';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { ReadonlyTransaction, Transaction } from '@atlaskit/editor-prosemirror/state';
import { NodeSelection } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';

import { lazyDecisionView } from '../nodeviews/decision-lazy-node-view';
import { lazyTaskView } from '../nodeviews/task-lazy-node-view';
import type { TaskDecisionPluginState, TasksAndDecisionsPlugin } from '../types';

import { focusTaskDecision, setProvider } from './actions';
import {
	focusCheckboxAndUpdateSelection,
	getTaskItemDataAtPos,
	getTaskItemDataToFocus,
	removeCheckboxFocus,
} from './helpers';
import { stateKey } from './plugin-key';
import { ACTIONS, type TaskDecisionPluginAction, type TaskDecisionPluginCommand } from './types';

type ChangedFn = (
	node: PMNode,
	pos: number,
	parent: PMNode | null,
	index: number,
) => boolean | void;
function nodesBetweenChanged(
	tr: Transaction | ReadonlyTransaction,
	f: ChangedFn,
	startPos?: number,
) {
	const stepRange = getStepRange(tr);
	if (!stepRange) {
		return;
	}

	tr.doc.nodesBetween(stepRange.from, stepRange.to, f, startPos);
}

export function createPlugin(
	portalProviderAPI: PortalProviderAPI,
	eventDispatcher: EventDispatcher,
	providerFactory: ProviderFactory,
	dispatch: Dispatch,
	api: ExtractInjectionAPI<TasksAndDecisionsPlugin> | undefined,
	useLongPressSelection: boolean = false,
	hasEditPermission?: boolean,
	hasRequestedEditPermission?: boolean,
	requestToEditContent?: () => void,
	taskPlaceholder?: string,
) {
	return new SafePlugin<TaskDecisionPluginState>({
		props: {
			nodeViews: {
				taskItem: lazyTaskView(
					portalProviderAPI,
					eventDispatcher,
					providerFactory,
					api,
					taskPlaceholder,
				),
				decisionItem: lazyDecisionView(portalProviderAPI, eventDispatcher, api),
			},
			handleTextInput(view: EditorView, from: number, to: number, text: string) {
				// When a decision item is selected and the user starts typing, the entire node
				// should be replaced with what was just typed. This custom text input handler
				// is needed to implement that behaviour.

				// TODO: ProseMirror should already do this by default
				// Tech debt to investigate why we need a custom handler here:
				// https://product-fabric.atlassian.net/browse/ED-9278

				const { state, dispatch } = view;
				const { tr } = state;
				if (
					state.selection instanceof NodeSelection &&
					state.selection.node.type === view.state.schema.nodes.decisionItem
				) {
					state.selection.replace(tr);
					tr.insertText(text);
					if (dispatch) {
						dispatch(tr);
					}
					return true;
				}
				return false;
			},
			handleClickOn: createSelectionClickHandler(
				['decisionItem'],
				(target) =>
					target.hasAttribute('data-decision-wrapper') ||
					target.getAttribute('aria-label') === 'Decision',
				{ useLongPressSelection },
			),
			handleKeyDown: (view: EditorView, event: KeyboardEvent) => {
				const { state, dispatch } = view;
				const { selection, schema } = state;
				const { $from, $to } = selection;
				const parentOffset = $from.parentOffset;
				const isInTaskItem = $from.node().type === schema.nodes.taskItem;

				const focusedTaskItemLocalId = stateKey.getState(state).focusedTaskItemLocalId;

				const currentTaskItemData = getTaskItemDataAtPos(view);

				const currentTaskItemFocused = focusedTaskItemLocalId === currentTaskItemData?.localId;

				// if task item checkbox not focused and arrow key is not pressed
				//  then we don't want to handle event.
				if (!['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
					return false;
				}

				// We want to handle arrow up, down and left key only
				//  when selection is inside task item and no text is selected.
				if (
					['ArrowUp', 'ArrowDown', 'ArrowLeft'].includes(event.key) &&
					(!isInTaskItem || $from.pos !== $to.pos)
				) {
					return false;
				}

				// Arrow keys are pressed and shift, ctrl or meta is pressed as well.
				//  along with arrow keys and task item checkbox is focused
				//  then first move focus to view and proceed with default event handling.
				if (event.shiftKey || event.ctrlKey || event.metaKey) {
					currentTaskItemFocused && removeCheckboxFocus(view);
					return false;
				}

				// task item checkbox is already focused
				if (focusedTaskItemLocalId) {
					if (event.key === 'ArrowLeft') {
						// Move focus to view and proceed with default keyboard handler.
						// Which will move cursor to previous position.
						removeCheckboxFocus(view);
						return false;
					}
					if (event.key === 'ArrowRight') {
						// Move focus to view and DON'T proceed with default handler.
						// We have assumed that selection is already before first character of task item.
						removeCheckboxFocus(view);
						return true;
					}
					if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
						const taskItemData = getTaskItemDataToFocus(
							view,
							event.key === 'ArrowUp' ? 'previous' : 'next',
						);
						if (taskItemData) {
							focusCheckboxAndUpdateSelection(view, taskItemData);
							return true;
						} else {
							// If any how checkbox input not found, then move focus to view
							//  and proceed with default keyboard handler.
							removeCheckboxFocus(view);
							return false;
						}
					}
				}

				// If left arrow key is pressed and cursor is at first position in task-item
				//  then focus checkbox and DON'T proceed with default keyboard handler
				if (event.key === 'ArrowLeft' && parentOffset === 0) {
					// here we are not using focusCheckboxAndUpdateSelection() method
					// because it is working incorretly when we are placing is inside the nested items
					dispatch(
						state.tr.setMeta(stateKey, {
							action: ACTIONS.FOCUS_BY_LOCALID,
							data: currentTaskItemData?.localId,
						}),
					);
					return true;
				}

				if (event.key === 'ArrowRight') {
					// If gap cursor is just before task list then focus first task item in list.
					if (
						selection instanceof GapCursorSelection &&
						selection.side === 'left' &&
						$from.nodeAfter?.type === schema.nodes.taskList
					) {
						const taskList = $from.nodeAfter;
						const firstTaskItemNode = taskList.child(0);
						const taskItemPos = $from.pos + 1;
						focusCheckboxAndUpdateSelection(view, {
							pos: taskItemPos,
							localId: firstTaskItemNode.attrs.localId,
						});
						return true;
					}
					// if cursor is at then end of task item text then focus next task item checkbox
					else if (isInTaskItem && $from.node().content.size === parentOffset) {
						const nextTaskItemData = getTaskItemDataToFocus(view, 'next');
						if (nextTaskItemData) {
							focusCheckboxAndUpdateSelection(view, nextTaskItemData);
							return true;
						}
					} else {
						return false;
					}
				}
			},
		},
		state: {
			init() {
				return {
					insideTaskDecisionItem: false,
					hasEditPermission,
					hasRequestedEditPermission,
					requestToEditContent,
					focusedTaskItemLocalId: null,
					taskDecisionProvider: undefined,
				};
			},
			apply(tr, pluginState) {
				const metaData: (TaskDecisionPluginAction & TaskDecisionPluginCommand) | undefined =
					tr.getMeta(stateKey);
				const { action, data } = metaData ?? {
					action: null,
					data: null,
				};
				let newPluginState = pluginState;

				// Actions
				switch (action) {
					case ACTIONS.FOCUS_BY_LOCALID:
						newPluginState = focusTaskDecision(newPluginState, {
							action: ACTIONS.FOCUS_BY_LOCALID,
							data,
						});
						break;

					case ACTIONS.SET_PROVIDER:
						newPluginState = setProvider(newPluginState, {
							action: ACTIONS.SET_PROVIDER,
							data,
						});
						break;
				}

				// Commands
				if (metaData && 'hasEditPermission' in metaData && fg('editor_request_to_edit_task')) {
					newPluginState = {
						...newPluginState,
						hasEditPermission: metaData.hasEditPermission,
					};
				}

				if (
					metaData &&
					'hasRequestedEditPermission' in metaData &&
					fg('editor_request_to_edit_task')
				) {
					newPluginState = {
						...newPluginState,
						hasRequestedEditPermission: metaData.hasRequestedEditPermission,
					};
				}

				// Dispatch
				dispatch(stateKey, newPluginState);
				return newPluginState;
			},
		},
		key: stateKey,
		/*
		 * After each transaction, we search through the document for any decisionList/Item & taskList/Item nodes
		 * that do not have the localId attribute set and generate a random UUID to use. This is to replace a previous
		 * Prosemirror capabibility where node attributes could be generated dynamically.
		 * See https://discuss.prosemirror.net/t/release-0-23-0-possibly-to-be-1-0-0/959/17 for a discussion of this approach.
		 *
		 * Note: we currently do not handle the edge case where two nodes may have the same localId
		 */
		appendTransaction: (transactions, _oldState, newState) => {
			const tr = newState.tr;
			let modified = false;
			transactions.forEach((transaction) => {
				if (!transaction.docChanged) {
					return;
				}

				// Adds a unique id to a node
				nodesBetweenChanged(transaction, (node, pos) => {
					const { decisionList, decisionItem, taskList, taskItem } = newState.schema.nodes;
					if (
						!!node.type &&
						(node.type === decisionList ||
							node.type === decisionItem ||
							node.type === taskList ||
							node.type === taskItem)
					) {
						const { localId, ...rest } = node.attrs;
						if (localId === undefined || localId === null || localId === '') {
							tr.step(
								new SetAttrsStep(pos, {
									localId: uuid.generate(),
									...rest,
								}),
							);

							modified = true;
						}
					}
				});
			});

			if (modified) {
				return tr.setMeta('addToHistory', false);
			}
			return;
		},
	});
}
