import type { Match } from '@atlaskit/adf-schema';
import { getLinkMatch } from '@atlaskit/adf-schema';
import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import { INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import { addLinkMetadata } from '@atlaskit/editor-common/card';
import {
	addLink,
	bindKeymapWithCommand,
	bindKeymapWithEditorCommand,
	enter,
	escape,
	insertNewLine,
} from '@atlaskit/editor-common/keymaps';
import type { HyperlinkState } from '@atlaskit/editor-common/link';
import type { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { Command } from '@atlaskit/editor-common/types';
import {
	findFilepaths,
	getLinkCreationAnalyticsEvent,
	isLinkInMatches,
	shouldAutoLinkifyMatch,
} from '@atlaskit/editor-common/utils';
import { keymap } from '@atlaskit/editor-prosemirror/keymap';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';

import { hideLinkToolbar, showLinkToolbar } from '../editor-commands/commands';
import { stateKey } from '../pm-plugins/main';

import { toolbarKey } from './toolbar-buttons';

export function createKeymapPlugin(
	editorAnalyticsApi: EditorAnalyticsAPI | undefined,
): SafePlugin | undefined {
	const list = {};

	bindKeymapWithEditorCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addLink.common!,
		showLinkToolbar(INPUT_METHOD.SHORTCUT, editorAnalyticsApi),
		list,
	);

	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	bindKeymapWithCommand(enter.common!, mayConvertLastWordToHyperlink(editorAnalyticsApi), list);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		insertNewLine.common!,
		mayConvertLastWordToHyperlink(editorAnalyticsApi),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		escape.common!,
		(state: EditorState, dispatch, view) => {
			const hyperlinkPlugin = stateKey.getState(state) as HyperlinkState;
			if (hyperlinkPlugin.activeLinkMark) {
				hideLinkToolbar()(state, dispatch);
				if (view) {
					view.focus();
				}
				return false;
			}
			return false;
		},
		list,
	);

	return keymap(list) as SafePlugin;
}

/**
 * Convert the last word before the selection to a hyperlink if it's a valid URL with a tld we want to linkify
 */
const mayConvertLastWordToHyperlink: (
	editorAnalyticsApi: EditorAnalyticsAPI | undefined,
) => Command = (editorAnalyticsApi) => {
	return function (state, dispatch) {
		const skipAnalytics = toolbarKey.getState(state)?.skipAnalytics ?? false;

		const nodeBefore = state.selection.$from.nodeBefore;
		if (!nodeBefore || !nodeBefore.isText || !nodeBefore.text) {
			return false;
		}

		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const words = nodeBefore.text!.split(' ');
		const lastWord = words[words.length - 1];
		const match: Match | null = getLinkMatch(lastWord);

		if (match) {
			if (!shouldAutoLinkifyMatch(match)) {
				return false;
			}

			const hyperlinkedText = match.raw;
			const start = state.selection.$from.pos - hyperlinkedText.length;
			const end = state.selection.$from.pos;
			if (state.doc.rangeHasMark(start, end, state.schema.marks.link)) {
				return false;
			}
			const url = match.url;
			const markType = state.schema.mark('link', { href: url });

			const filepaths = findFilepaths(
				nodeBefore.text,
				start - (nodeBefore.text.length - hyperlinkedText.length), // The position referenced by 'start' is relative to the start of the document, findFilepaths deals with index in a node only.
			);
			if (isLinkInMatches(start, filepaths)) {
				return false;
			}

			const tr = state.tr.addMark(start, end, markType);
			if (dispatch) {
				addLinkMetadata(state.selection, tr, {
					inputMethod: INPUT_METHOD.AUTO_DETECT,
				});
				if (skipAnalytics) {
					dispatch(tr);
				} else {
					editorAnalyticsApi?.attachAnalyticsEvent(
						getLinkCreationAnalyticsEvent(INPUT_METHOD.AUTO_DETECT, url),
					)(tr);
					dispatch(tr);
				}
			}
		}
		return false;
	};
};

export default createKeymapPlugin;
