// Disable no-re-export rule for entry point files
/* eslint-disable @atlaskit/editor/no-re-export */

export enum TypeAheadAvailableNodes {
	EMOJI = 'emojiTypeAhead',
	MENTION = 'mentionTypeAhead',
	QUICK_INSERT = 'quickInsertTypeAhead',
}

export enum SelectItemMode {
	SHIFT_ENTER = 'shift-enter',
	ENTER = 'enter',
	SPACE = 'space',
	SELECTED = 'selected',
	TAB = 'tab',
}

export { typeAheadListMessages } from './messages';
