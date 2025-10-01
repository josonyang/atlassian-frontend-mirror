import { defineMessages } from 'react-intl-next';

export const messages = defineMessages({
	copyBlock: {
		id: 'fabric.editor.block.menu.copy.block',
		defaultMessage: 'Copy block',
		description: 'Copy the selected block to the clipboard',
	},
	copyContent: {
		id: 'fabric.editor.block.menu.copy.content',
		defaultMessage: 'Copy content',
		description: 'Copy the selected content to the clipboard',
	},
	moveUpBlock: {
		id: 'fabric.editor.block.menu.move.up',
		defaultMessage: 'Move up',
		description: 'Move the selected block up',
	},
	moveDownBlock: {
		id: 'fabric.editor.block.menu.move.down',
		defaultMessage: 'Move down',
		description: 'Move the selected block down',
	},
	copyLink: {
		id: 'fabric.editor.block.menu.copy.link',
		defaultMessage: 'Copy link',
		description: 'Copy link to the selected block',
	},
	copyLinkToBlock: {
		id: 'fabric.editor.block.menu.copy.link.to.block',
		defaultMessage: 'Copy link to block',
		description: 'Copy link to the selected block',
	},
	paragraph: {
		id: 'fabric.editor.block.menu.paragraph',
		defaultMessage: 'Paragraph',
		description: 'Change the selected block to a paragraph',
	},
	codeBlock: {
		id: 'fabric.editor.block.menu.codeblock',
		defaultMessage: 'Code block',
		description: 'Convert to a code block',
	},
	layout: {
		id: 'fabric.editor.block.menu.layout',
		defaultMessage: 'Layout',
		description: 'Convert to a layout node',
	},
	deleteBlock: {
		id: 'fabric.editor.block.menu.delete.block',
		defaultMessage: 'Delete',
		description: 'Delete the selected block',
	},
	turnInto: {
		id: 'fabric.editor.block.menu.turn.into',
		defaultMessage: 'Turn into',
		description: 'Turn the selected block into another type',
	},
	createSyncedBlock: {
		id: 'fabric.editor.block.menu.create.synced.block',
		defaultMessage: 'Create synced block',
		description: 'Create a synced block at this empty line',
	},
});
