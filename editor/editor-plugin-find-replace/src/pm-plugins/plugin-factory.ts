import { pluginFactory, stepHasSlice } from '@atlaskit/editor-common/utils';
import type { ReadonlyTransaction, Transaction } from '@atlaskit/editor-prosemirror/state';
import type { Step } from '@atlaskit/editor-prosemirror/transform';
import type { Decoration } from '@atlaskit/editor-prosemirror/view';
import { DecorationSet } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';
import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';
import { expValEqualsNoExposure } from '@atlaskit/tmp-editor-statsig/exp-val-equals-no-exposure';

import type { FindReplacePluginState, Match } from '../types';

import { initialState } from './main';
import { findReplacePluginKey } from './plugin-key';
import reducer from './reducer';
import {
	createDecorations,
	findClosestMatch,
	findDecorationFromMatch,
	findMatches,
	findSearchIndex,
	getSelectionForMatch,
	isMatchAffectedByStep,
	removeDecorationsFromSet,
	removeMatchesFromSet,
} from './utils';
import { findUniqueItemsIn } from './utils/array'; // TODO: ED-26959 - move into index export

const handleDocChanged = (
	tr: ReadonlyTransaction,
	pluginState: FindReplacePluginState,
): FindReplacePluginState => {
	const { isActive, findText } = pluginState;
	if (!isActive || !findText) {
		return pluginState;
	}

	if (!tr.steps.find(stepHasSlice)) {
		return pluginState;
	}

	// Ignored via go/ees005
	// eslint-disable-next-line prefer-const
	let { index, decorationSet, matches, shouldMatchCase, getIntl, api } = pluginState;
	const newMatches = findMatches({
		content: tr.doc,
		searchText: findText,
		shouldMatchCase: shouldMatchCase,
		getIntl,
		api,
	});
	decorationSet = decorationSet.map(tr.mapping, tr.doc);
	const numDecorations = decorationSet.find().length;

	const mappedMatches = matches.map((match) => ({
		start: tr.mapping.map(match.start),
		end: tr.mapping.map(match.end),
		canReplace: match.canReplace,
		nodeType: match.nodeType,
	}));

	let matchesToAdd: Match[] = [];
	let matchesToDelete: Match[] = [];

	if (newMatches.length > 0 && numDecorations === 0) {
		matchesToAdd = newMatches;
	} else if (newMatches.length === 0 && numDecorations > 0) {
		decorationSet = DecorationSet.empty;
	} else if (newMatches.length > 0 || numDecorations > 0) {
		// go through tr steps and find any new matches from user adding content or
		// any dead matches from user deleting content
		tr.steps.forEach((step: Step) => {
			if (stepHasSlice(step)) {
				// add all matches that are between the affected positions and don't already have
				// corresponding decorations
				matchesToAdd = [
					...matchesToAdd,
					...newMatches.filter(
						(match) =>
							isMatchAffectedByStep(match, step, tr) &&
							!findDecorationFromMatch(decorationSet, match),
					),
				];

				// delete any matches that are missing from the newMatches array and have a
				// corresponding decoration
				matchesToDelete = [
					...matchesToDelete,
					...findUniqueItemsIn<Match>(
						mappedMatches.filter(
							(match) =>
								isMatchAffectedByStep(match, step, tr) &&
								!!findDecorationFromMatch(decorationSet, match),
						),
						newMatches,
						(firstMatch, secondMatch) =>
							firstMatch.start === secondMatch.start && firstMatch.end === secondMatch.end,
					),
				];
			}
		});
	}

	// update decorations if matches changed following document update
	if (matchesToDelete.length > 0) {
		const decorationsToDelete = matchesToDelete.reduce(
			(decorations: Decoration[], match) => [
				...decorations,
				...decorationSet.find(match.start, match.end),
			],
			[],
		);
		decorationSet = removeDecorationsFromSet(decorationSet, decorationsToDelete, tr.doc);
	}
	if (matchesToAdd.length > 0) {
		decorationSet = decorationSet.add(tr.doc, createDecorations(tr.selection.from, matchesToAdd));
	}

	// update selected match if it has changed
	let newIndex = index;
	const selectedMatch = mappedMatches[index];
	if (selectedMatch) {
		newIndex = newMatches.findIndex((match) => match.start === selectedMatch.start);
	}
	if (newIndex === undefined || newIndex === -1) {
		newIndex =
			expValEquals('platform_editor_find_and_replace_improvements', 'isEnabled', true) &&
			fg('platform_editor_find_and_replace_improvements_1')
				? findClosestMatch(tr.selection.from, newMatches)
				: findSearchIndex(tr.selection.from, newMatches);
	}
	const newSelectedMatch = newMatches[newIndex];

	decorationSet = removeMatchesFromSet(decorationSet, [selectedMatch, newSelectedMatch], tr.doc);
	if (newSelectedMatch) {
		decorationSet = decorationSet.add(tr.doc, createDecorations(0, [newSelectedMatch]));
	}

	if (expValEqualsNoExposure('platform_editor_toggle_expand_on_match_found', 'isEnabled', true)) {
		const newSelection = getSelectionForMatch(tr.selection, tr.doc, newIndex, newMatches);
		// the exposure is fired inside toggleExpandWithMatch when user is exposed to the experiment
		api?.expand?.commands.toggleExpandWithMatch(newSelection)({ tr: tr as unknown as Transaction });
	}

	return {
		...pluginState,
		matches: newMatches,
		index: newIndex,
		decorationSet,
	};
};

export const { createCommand, getPluginState, createPluginState } = pluginFactory(
	findReplacePluginKey,
	reducer(() => initialState),
	{
		onDocChanged: handleDocChanged,
	},
);
