/**
 * This plugin allows sorting of table nodes in the Editor without modifying the underlying ProseMirror document.
 * Instead of making changes to the ProseMirror document, the plugin sorts the table rows in the DOM. This allows the sorting to be
 * visible to the user without affecting the document's content.
 */

import { createElement } from 'react';

import { RawIntlProvider } from 'react-intl-next';
import uuid from 'uuid/v4';

import { type PortalProviderAPI } from '@atlaskit/editor-common/portal';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { SortOrder } from '@atlaskit/editor-common/types';
import { Decoration, DecorationSet } from '@atlaskit/editor-prosemirror/view';
import { TableMap } from '@atlaskit/editor-tables/table-map';
import { fg } from '@atlaskit/platform-feature-flags';

import type tablePlugin from '../../tablePlugin';
import { SortingIconWrapper } from '../../ui/icons/SortingIconWrapper';
import { getPluginState } from '../plugin-factory';

import {
	IS_DISABLED_CLASS_NAME,
	SORT_INDEX_DATA_ATTRIBUTE,
	SORTING_ICON_CLASS_NAME,
} from './consts';
import { tableViewModeSortPluginKey as key } from './plugin-key';
import type { ViewModeSortPluginState } from './types';
import { getTableElements, toggleSort } from './utils';

export const createPlugin = (
	api: ExtractInjectionAPI<typeof tablePlugin>,
	nodeViewPortalProviderAPI: PortalProviderAPI,
) => {
	return new SafePlugin({
		state: {
			init: () => ({
				decorations: DecorationSet.empty,
				sort: {},
				allTables: [],
			}),
			apply(tr, pluginState: ViewModeSortPluginState, oldState) {
				// TODO: ED-26961 - move this mode check to plugin creation if possible. Right now it's here because the initial state
				// does not appear correct when the plugin is created.
				const { mode } = api.editorViewMode?.sharedState.currentState() || {};
				if (mode !== 'view') {
					const sortingDecorations = pluginState?.decorations?.find(
						undefined,
						undefined,
						(s) => s?.type === 'sorting-decoration',
					);

					return fg('platform_editor_sort_decoration_fix_on_live_page')
						? {
								...pluginState,
								decorations: pluginState?.decorations?.remove(sortingDecorations),
							}
						: pluginState;
				}
				let { decorations, sort, allTables } = pluginState;

				const sortMeta = tr.getMeta('tableSortMeta');

				const hoverTableMeta = tr.getMeta('mouseEnterTable');
				const removeTableMeta = tr.getMeta('removeTable');
				let tableId = '';

				// Remove the table from the state
				if (removeTableMeta) {
					allTables = allTables.filter(([id]) => id !== removeTableMeta);
				} else {
					tableId = hoverTableMeta?.[0];
				}

				sort = { ...sort, ...sortMeta };

				const isTableInState = allTables.some(([id]) => id === tableId);

				// Update the table in the state
				if (hoverTableMeta) {
					allTables = allTables.filter(([id]) => id !== hoverTableMeta[0]);
					allTables.push(hoverTableMeta);
				}

				/**
				 * Create decorations for the sorting icons
				 */
				const decs: Decoration[] = [];

				const sortingDecorations = pluginState.decorations.find(
					undefined,
					undefined,
					(spec) => spec.tableId === tableId && spec.type === 'sorting-decoration',
				);

				// TODO: ED-26961 - add support for keyboard only users
				if (
					(hoverTableMeta && !isTableInState) ||
					sortMeta ||
					(isTableInState &&
						!sortingDecorations.length &&
						fg('platform_editor_sort_decoration_fix_on_live_page'))
				) {
					allTables.forEach((table) => {
						const [tableId, _node, pos] = table;
						const tableNode = tr.doc.nodeAt(tr.mapping.map(pos));
						if (!tableNode || tableNode.type.name !== 'table') {
							return pluginState;
						}
						const map = TableMap.get(tableNode);
						const hasMergedCells = new Set(map.map).size !== map.map.length;
						map.mapByRow[0].forEach((cell, index) => {
							const decorationRenderKey = uuid();
							decs.push(
								Decoration.widget(
									cell + pos + 2,
									() => {
										const element = document.createElement('div');
										element.setAttribute(SORT_INDEX_DATA_ATTRIBUTE, `${index}`);
										element.classList.add(SORTING_ICON_CLASS_NAME);
										if (hasMergedCells) {
											element.classList.add(IS_DISABLED_CLASS_NAME);
										}

										let sortOrdered;
										if (index === sort[tableId]?.index) {
											sortOrdered = sort[tableId]?.direction;
										} else {
											sortOrdered = SortOrder.NO_ORDER;
										}

										const { getIntl } = getPluginState(oldState);

										nodeViewPortalProviderAPI.render(
											() =>
												createElement(
													RawIntlProvider,
													{ value: getIntl() },
													createElement(SortingIconWrapper, {
														isSortingAllowed: !hasMergedCells,
														sortOrdered,
														onClick: () => {},
														onKeyDown: () => {},
														api,
													}),
												),
											element,
											decorationRenderKey,
										);

										return element;
									},
									{
										destroy: (node) => {
											nodeViewPortalProviderAPI.remove(decorationRenderKey);
										},
										type: 'sorting-decoration',
										tableId,
									},
								),
							);
						});
					});
					decorations = DecorationSet.create(tr.doc, decs);
				}

				/**
				 * Map the decorations to the new document if there are changes
				 */
				if (tr.docChanged) {
					decorations = decorations.map(tr.mapping, tr.doc);
					allTables = allTables.map((table) => {
						return [table[0], table[1], tr.mapping.map(table[2])];
					});
				}

				return {
					decorations,
					sort,
					allTables,
				};
			},
		},
		key,
		appendTransaction: (trs, oldState, newState) => {
			// return newState.tr;
			const { mode } = api?.editorViewMode?.sharedState.currentState() || {};
			if (mode !== 'view') {
				return newState.tr;
			}

			let allTables = key.getState(newState)?.allTables || [];

			/**
			 * If incoming changes have affected a table node, remove the sorting. This prevents the
			 * table from breaking if changes like merged cells are incoming.
			 */
			for (const tr of trs) {
				const hoverTableMeta = tr.getMeta('mouseEnterTable');
				if (hoverTableMeta) {
					allTables = allTables.filter(([id]) => id !== hoverTableMeta[0]);
					allTables.push(hoverTableMeta);
				}
				const isRemote = tr.getMeta('isRemote');
				const isDocChanged = tr.docChanged;
				const isChangesIncoming = isRemote && isDocChanged;

				const oldPluginState = key.getState(oldState);
				const newPluginState = key.getState(newState);

				for (const table of allTables) {
					const [tableId, node, pos] = table;
					const {
						order: oldOrder,
						direction: oldDirection,
						index: oldIndex,
					} = oldPluginState?.sort?.[tableId] || {};

					if (isChangesIncoming) {
						const maybeTableNode = tr.doc.nodeAt(pos);
						const isTableNodeChanged =
							maybeTableNode?.attrs?.localId !== tableId || !node.eq(maybeTableNode);

						if (isTableNodeChanged) {
							const newtr = newState.tr;
							newtr.setMeta('tableSortMeta', {
								[tableId]: {},
							});
							newtr.setMeta('removeTable', tableId);

							// Unsort the table here
							if (oldOrder !== undefined) {
								const { rows, tbody } = getTableElements(tableId);
								if (!rows || !tbody) {
									return newtr;
								}
								const sortedOrder = [...oldOrder].sort((a, b) => a.value - b.value);
								sortedOrder.forEach((index, i) => {
									tbody.appendChild(rows[index.index + 1]);
								});
								return newtr;
							}
						}
					}

					/**
					 * Sort the table if the sort order has changed
					 */
					const {
						order: newOrder,
						direction: newDirection,
						index: newIndex,
					} = newPluginState?.sort?.[tableId] || {};
					const orderChanged = oldDirection !== newDirection || oldIndex !== newIndex;

					if (orderChanged) {
						if (!isRemote && newDirection !== SortOrder.NO_ORDER) {
							const { rows, tbody } = getTableElements(tableId);
							if (rows && newOrder) {
								newOrder.forEach((index, i) => {
									tbody?.appendChild(rows[index.value + 1]);
								});
							}
						}
					}
				}
			}
			return newState.tr;
		},
		props: {
			handleDOMEvents: {
				keydown: (view, event) => {
					// TODO: ED-26961 - fix the focus issue here, where toggling sort with a keypress loses focus
					if (event.key === 'Enter' || event.key === ' ') {
						const pluginState = key.getState(view.state)?.sort || {};
						toggleSort(view, event, pluginState);
					}
				},

				click: (view, event) => {
					const pluginState = key.getState(view.state)?.sort || {};
					toggleSort(view, event, pluginState);
				},
			},
			decorations(state) {
				const decs = key.getState(state)?.decorations || DecorationSet.empty;
				return decs;
			},
		},
	});
};
