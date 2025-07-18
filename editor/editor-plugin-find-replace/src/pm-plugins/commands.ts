import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { TextSelection } from '@atlaskit/editor-prosemirror/state';
import type { Decoration, EditorView } from '@atlaskit/editor-prosemirror/view';
import { DecorationSet } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';
import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';
import { expValEqualsNoExposure } from '@atlaskit/tmp-editor-statsig/exp-val-equals-no-exposure';

import type { Match } from '../types';

import type { FindReplaceAction } from './actions';
import { FindReplaceActionTypes } from './actions';
import { createCommand, getPluginState } from './plugin-factory';
import {
	createDecoration,
	findClosestMatch,
	findDecorationFromMatch,
	findMatches,
	findSearchIndex,
	getSelectedText,
	getSelectionForMatch,
	nextIndex,
	prevIndex,
	removeDecorationsFromSet,
	removeMatchesFromSet,
} from './utils';
import batchDecorations from './utils/batch-decorations';
import { withScrollIntoView } from './utils/commands';

export const activate = () =>
	createCommand((state: EditorState) => {
		const { selection } = state;
		let findText: string | undefined;
		let matches: Match[] | undefined;
		let index: number | undefined;

		// if user has selected text and hit cmd-f, set that as the keyword
		if (selection instanceof TextSelection && !selection.empty) {
			findText = getSelectedText(selection);
			const { shouldMatchCase, getIntl, api } = getPluginState(state);
			matches = findMatches({
				content: state.doc,
				searchText: findText,
				shouldMatchCase,
				getIntl,
				api,
			});

			index =
				expValEquals('platform_editor_find_and_replace_improvements', 'isEnabled', true) &&
				fg('platform_editor_find_and_replace_improvements_1')
					? findClosestMatch(selection.from, matches)
					: findSearchIndex(selection.from, matches);
		}

		return {
			type: FindReplaceActionTypes.ACTIVATE,
			findText,
			matches,
			index,
		};
	});

export const find = (
	editorView: EditorView,
	containerElement: HTMLElement | null,
	keyword?: string,
) =>
	withScrollIntoView(
		createCommand(
			(state: EditorState) => {
				const { selection } = state;
				const { shouldMatchCase, getIntl, api } = getPluginState(state);
				const matches =
					keyword !== undefined
						? findMatches({
								content: state.doc,
								searchText: keyword,
								shouldMatchCase,
								getIntl,
								api,
							})
						: [];

				const index =
					expValEquals('platform_editor_find_and_replace_improvements', 'isEnabled', true) &&
					fg('platform_editor_find_and_replace_improvements_1')
						? findClosestMatch(selection.from, matches)
						: findSearchIndex(selection.from, matches);

				// we can't just apply all the decorations to highlight the search results at once
				// as if there are a lot ProseMirror cries :'(
				batchDecorations.applyAllSearchDecorations(
					editorView,
					containerElement,
					(decorations) => addDecorations(decorations)(editorView.state, editorView.dispatch),
					(decorations) => removeDecorations(decorations)(editorView.state, editorView.dispatch),
				);

				return {
					type: FindReplaceActionTypes.FIND,
					findText: keyword || '',
					matches,
					index,
				};
			},
			(tr, state: EditorState) => {
				const { selection } = state;
				const { shouldMatchCase, getIntl, api } = getPluginState(state);
				const matches =
					keyword !== undefined
						? findMatches({
								content: state.doc,
								searchText: keyword,
								shouldMatchCase,
								getIntl,
								api,
							})
						: [];

				if (matches.length > 0) {
					const index =
						expValEquals('platform_editor_find_and_replace_improvements', 'isEnabled', true) &&
						fg('platform_editor_find_and_replace_improvements_1')
							? findClosestMatch(selection.from, matches)
							: findSearchIndex(selection.from, matches);
					const newSelection = getSelectionForMatch(tr.selection, tr.doc, index, matches);
					if (
						expValEqualsNoExposure(
							'platform_editor_toggle_expand_on_match_found',
							'isEnabled',
							true,
						)
					) {
						// the exposure is fired inside toggleExpandWithMatch when user is exposed to the experiment
						api?.expand?.commands.toggleExpandWithMatch(newSelection)({ tr });
					}
					return tr.setSelection(newSelection);
				}
				return tr;
			},
		),
	);

export const findNext = (editorView: EditorView) =>
	withScrollIntoView(
		createCommand(
			(state: EditorState) => findInDirection(state, 'next'),
			(tr, state: EditorState) => {
				const { matches, index, api } = getPluginState(state);
				// can't use index from plugin state because if the cursor has moved, it will still be the
				// OLD index (the find next operation should look for the first match forward starting
				// from the current cursor position)
				let searchIndex = findSearchIndex(state.selection.from, matches);
				if (searchIndex === index) {
					// cursor has not moved, so we just want to find the next in matches array
					searchIndex = nextIndex(searchIndex, matches.length);
				}
				const newSelection = getSelectionForMatch(tr.selection, tr.doc, searchIndex, matches);
				if (
					expValEqualsNoExposure('platform_editor_toggle_expand_on_match_found', 'isEnabled', true)
				) {
					// the exposure is fired inside toggleExpandWithMatch when user is exposed to the experiment
					api?.expand?.commands.toggleExpandWithMatch(newSelection)({ tr });
				}
				return tr.setSelection(newSelection);
			},
		),
	);

export const findPrevious = (editorView: EditorView) =>
	withScrollIntoView(
		createCommand(
			(state: EditorState) => findInDirection(state, 'previous'),
			(tr, state: EditorState) => {
				const { matches, api } = getPluginState(state);
				// can't use index from plugin state because if the cursor has moved, it will still be the
				// OLD index (the find prev operation should look for the first match backward starting
				// from the current cursor position)
				const searchIndex = findSearchIndex(state.selection.from, matches, true);
				const newSelection = getSelectionForMatch(tr.selection, tr.doc, searchIndex, matches);
				if (
					expValEqualsNoExposure('platform_editor_toggle_expand_on_match_found', 'isEnabled', true)
				) {
					// the exposure is fired inside toggleExpandWithMatch when user is exposed to the experiment
					api?.expand?.commands.toggleExpandWithMatch(newSelection)({ tr });
				}
				return tr.setSelection(newSelection);
			},
		),
	);

const findInDirection = (state: EditorState, dir: 'next' | 'previous'): FindReplaceAction => {
	const pluginState = getPluginState(state);
	const { matches, findText } = pluginState;
	let { decorationSet, index } = pluginState;

	if (findText) {
		const searchIndex = findSearchIndex(state.selection.from, matches, dir === 'previous');
		// compare index from plugin state and index of first match forward from cursor position
		if (index === searchIndex) {
			// normal case, cycling through matches
			index = dir === 'next' ? nextIndex(index, matches.length) : prevIndex(index, matches.length);
		} else {
			// cursor has moved
			index = searchIndex;
		}
		decorationSet = updateSelectedHighlight(state, index);
	}

	return {
		type: dir === 'next' ? FindReplaceActionTypes.FIND_NEXT : FindReplaceActionTypes.FIND_PREVIOUS,
		index,
		decorationSet,
	};
};

export const replace = (replaceText: string) =>
	withScrollIntoView(
		createCommand(
			(state: EditorState) => {
				const pluginState = getPluginState(state);
				const { findText, matches } = pluginState;
				let { decorationSet, index } = pluginState;

				decorationSet = updateSelectedHighlight(state, nextIndex(index, matches.length));
				if (replaceText.toLowerCase().indexOf(findText.toLowerCase()) === -1) {
					decorationSet = removeMatchesFromSet(decorationSet, [matches[index]], state.doc);
					matches.splice(index, 1);
					if (index > matches.length - 1) {
						index = 0;
					}
				} else {
					index = nextIndex(index, matches.length);
				}

				return {
					type: FindReplaceActionTypes.REPLACE,
					replaceText,
					decorationSet,
					matches,
					index,
				};
			},
			(tr, state: EditorState) => {
				const { matches, index, findText } = getPluginState(state);
				if (matches[index]) {
					if (
						!matches[index].canReplace &&
						expValEquals('platform_editor_find_and_replace_improvements', 'isEnabled', true)
					) {
						return tr;
					}
					const { start, end } = matches[index];
					const newIndex = nextIndex(index, matches.length);
					tr.insertText(replaceText, start, end).setSelection(
						getSelectionForMatch(
							tr.selection,
							tr.doc,
							newIndex,
							matches,
							newIndex === 0 ? 0 : replaceText.length - findText.length,
						),
					);
				}
				return tr;
			},
		),
	);

export const replaceAll = (replaceText: string) =>
	createCommand(
		{
			type: FindReplaceActionTypes.REPLACE_ALL,
			replaceText: replaceText,
			decorationSet: DecorationSet.empty,
			matches: [],
			index: 0,
		},
		(tr, state: EditorState) => {
			const pluginState = getPluginState(state);
			pluginState.matches.forEach((match: Match) => {
				if (
					!match.canReplace &&
					expValEquals('platform_editor_find_and_replace_improvements', 'isEnabled', true)
				) {
					return tr;
				}
				tr.insertText(replaceText, tr.mapping.map(match.start), tr.mapping.map(match.end));
			});
			tr.setMeta('scrollIntoView', false);
			return tr;
		},
	);

export const addDecorations = (decorations: Decoration[]) =>
	createCommand((state: EditorState) => {
		const { decorationSet } = getPluginState(state);
		return {
			type: FindReplaceActionTypes.UPDATE_DECORATIONS,
			decorationSet: decorationSet.add(state.doc, decorations),
		};
	});

export const removeDecorations = (decorations: Decoration[]) =>
	createCommand((state: EditorState) => {
		const { decorationSet } = getPluginState(state);
		return {
			type: FindReplaceActionTypes.UPDATE_DECORATIONS,
			decorationSet: removeDecorationsFromSet(decorationSet, decorations, state.doc),
		};
	});

export const cancelSearch = () =>
	createCommand(() => {
		batchDecorations.stop();
		return {
			type: FindReplaceActionTypes.CANCEL,
		};
	});

export const blur = () =>
	createCommand({
		type: FindReplaceActionTypes.BLUR,
	});

export const toggleMatchCase = () =>
	createCommand({ type: FindReplaceActionTypes.TOGGLE_MATCH_CASE });

const updateSelectedHighlight = (state: EditorState, nextSelectedIndex: number): DecorationSet => {
	const { index, matches } = getPluginState(state);
	let { decorationSet } = getPluginState(state);
	const currentSelectedMatch = matches[index];
	const nextSelectedMatch = matches[nextSelectedIndex];
	if (index === nextSelectedIndex) {
		return decorationSet;
	}

	const currentSelectedDecoration = findDecorationFromMatch(decorationSet, currentSelectedMatch);
	const nextSelectedDecoration = findDecorationFromMatch(decorationSet, nextSelectedMatch);

	// Update decorations so the current selected match becomes a normal match
	// and the next selected gets the selected styling
	const decorationsToRemove: Decoration[] = [];
	if (currentSelectedDecoration) {
		decorationsToRemove.push(currentSelectedDecoration);
	}
	if (nextSelectedDecoration) {
		decorationsToRemove.push(nextSelectedDecoration);
	}
	if (decorationsToRemove.length > 0) {
		// removeDecorationsFromSet depends on decorations being pre-sorted
		decorationsToRemove.sort((a, b) => (a.from < b.from ? -1 : 1));
		decorationSet = removeDecorationsFromSet(decorationSet, decorationsToRemove, state.doc);
	}

	if (currentSelectedMatch) {
		decorationSet = decorationSet.add(state.doc, [createDecoration(currentSelectedMatch)]);
	}
	if (nextSelectedMatch) {
		decorationSet = decorationSet.add(state.doc, [createDecoration(nextSelectedMatch, true)]);
	}

	return decorationSet;
};
