import type { IntlShape } from 'react-intl-next/src/types';

import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import {
	ACTION,
	ACTION_SUBJECT,
	ACTION_SUBJECT_ID,
	EVENT_TYPE,
	INPUT_METHOD,
} from '@atlaskit/editor-common/analytics';
import {
	addColumnAfter,
	addColumnAfterVO,
	addColumnBefore,
	addColumnBeforeVO,
	addRowAfter,
	addRowAfterVO,
	addRowBefore,
	addRowBeforeVO,
	backspace,
	bindKeymapWithCommand,
	decreaseMediaSize,
	deleteColumn,
	deleteRow,
	escape,
	focusToContextMenuTrigger,
	increaseMediaSize,
	moveColumnLeft,
	moveColumnRight,
	moveDown,
	moveLeft,
	moveRight,
	moveRowDown,
	moveRowUp,
	moveUp,
	nextCell,
	previousCell,
	startColumnResizing,
	toggleTable,
} from '@atlaskit/editor-common/keymaps';
import { type PortalProviderAPI } from '@atlaskit/editor-common/portal';
import { editorCommandToPMCommand } from '@atlaskit/editor-common/preset';
import type { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { GetEditorContainerWidth } from '@atlaskit/editor-common/types';
import { chainCommands } from '@atlaskit/editor-prosemirror/commands';
import { keymap } from '@atlaskit/editor-prosemirror/keymap';
import { fg } from '@atlaskit/platform-feature-flags';

import { moveSourceWithAnalyticsViaShortcut } from '../pm-plugins/drag-and-drop/commands-with-analytics';
import type { PluginInjectionAPI, PluginInjectionAPIWithA11y } from '../types';

import { goToNextCell, moveCursorBackward, setFocusToCellMenu } from './commands';
import {
	activateNextResizeArea,
	initiateKeyboardColumnResizing,
	stopKeyboardColumnResizing,
} from './commands/column-resize';
import {
	addRowAroundSelection,
	changeColumnWidthByStepWithAnalytics,
	deleteSelectedRowsOrColumnsWithAnalyticsViaShortcut,
	deleteTableIfSelectedWithAnalytics,
	emptyMultipleCellsWithAnalytics,
} from './commands/commands-with-analytics';
import { goToNextCellVertical } from './commands/go-to-next-cell';
import {
	addColumnAfter as addColumnAfterCommand,
	addColumnBefore as addColumnBeforeCommand,
	createTable,
	insertTableWithNestingSupport,
} from './commands/insert';

export function keymapPlugin(
	getEditorContainerWidth: GetEditorContainerWidth,
	api: PluginInjectionAPI | undefined | null,
	nodeViewPortalProviderAPI: PortalProviderAPI,
	editorAnalyticsAPI: EditorAnalyticsAPI | undefined | null,
	dragAndDropEnabled?: boolean,
	isTableScalingEnabled = false,
	isTableAlignmentEnabled = false,
	isFullWidthEnabled?: boolean,
	pluginInjectionApi?: PluginInjectionAPIWithA11y,
	getIntl?: () => IntlShape,
	isTableFixedColumnWidthsOptionEnabled = false,
	shouldUseIncreasedScalingPercent?: boolean,
	isCommentEditor?: boolean,
	isChromelessEditor?: boolean,
	isTableResizingEnabled?: boolean,
): SafePlugin {
	const list = {};

	const ariaNotifyPlugin = pluginInjectionApi?.accessibilityUtils?.actions.ariaNotify;

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		nextCell.common!,
		goToNextCell(editorAnalyticsAPI, ariaNotifyPlugin, getIntl)(1),
		list,
	);
	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		previousCell.common!,
		goToNextCell(editorAnalyticsAPI, ariaNotifyPlugin, getIntl)(-1),
		list,
	);
	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		toggleTable.common!,
		fg('platform_editor_use_nested_table_pm_nodes')
			? editorCommandToPMCommand(
					insertTableWithNestingSupport(
						{
							isTableScalingEnabled,
							isTableAlignmentEnabled,
							isFullWidthModeEnabled: !!isFullWidthEnabled,
							isCommentEditor: isCommentEditor,
							isChromelessEditor: isChromelessEditor,
							isTableResizingEnabled,
						},
						api,
						{
							action: ACTION.INSERTED,
							actionSubject: ACTION_SUBJECT.DOCUMENT,
							actionSubjectId: ACTION_SUBJECT_ID.TABLE,
							attributes: { inputMethod: INPUT_METHOD.SHORTCUT },
							eventType: EVENT_TYPE.TRACK,
						},
					),
				)
			: createTable(
					isTableScalingEnabled,
					isTableAlignmentEnabled,
					!!isFullWidthEnabled,
					editorAnalyticsAPI,
					isCommentEditor,
					isChromelessEditor,
					isTableResizingEnabled,
				),
		list,
	);
	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		backspace.common!,
		chainCommands(
			deleteTableIfSelectedWithAnalytics(editorAnalyticsAPI)(INPUT_METHOD.KEYBOARD),
			emptyMultipleCellsWithAnalytics(editorAnalyticsAPI)(INPUT_METHOD.KEYBOARD),
		),
		list,
	);
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	bindKeymapWithCommand(backspace.common!, moveCursorBackward, list);

	// Add row/column shortcuts
	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addRowBefore.common!,
		addRowAroundSelection(editorAnalyticsAPI)('TOP'),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addRowAfter.common!,
		addRowAroundSelection(editorAnalyticsAPI)('BOTTOM'),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addColumnBefore.common!,
		addColumnBeforeCommand(
			api,
			isTableScalingEnabled,
			isTableFixedColumnWidthsOptionEnabled,
			shouldUseIncreasedScalingPercent,
		),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addColumnAfter.common!,
		addColumnAfterCommand(
			api,
			isTableScalingEnabled,
			isTableFixedColumnWidthsOptionEnabled,
			shouldUseIncreasedScalingPercent,
		),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addRowBeforeVO.common!,
		addRowAroundSelection(editorAnalyticsAPI)('TOP'),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addRowAfterVO.common!,
		addRowAroundSelection(editorAnalyticsAPI)('BOTTOM'),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addColumnBeforeVO.common!,
		addColumnBeforeCommand(
			api,
			isTableScalingEnabled,
			isTableFixedColumnWidthsOptionEnabled,
			shouldUseIncreasedScalingPercent,
		),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addColumnAfterVO.common!,
		addColumnAfterCommand(
			api,
			isTableScalingEnabled,
			isTableFixedColumnWidthsOptionEnabled,
			shouldUseIncreasedScalingPercent,
		),
		list,
	);

	if (dragAndDropEnabled) {
		// Move row/column shortcuts
		/**
		 * NOTE: If the keyboard shortcut for moving rows or columns is changed, we need to update the handleKeyDown function
		 * in packages/editor/editor-plugin-table/src/pm-plugins/drag-and-drop/plugin.ts
		 * to make sure the logic for holding the shortcut keys is valid
		 * See ticket ED-22154 https://product-fabric.atlassian.net/browse/ED-22154
		 */

		bindKeymapWithCommand(
			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			moveRowDown.common!,
			moveSourceWithAnalyticsViaShortcut(
				editorAnalyticsAPI,
				ariaNotifyPlugin,
				getIntl,
			)('table-row', 1),
			list,
		);

		bindKeymapWithCommand(
			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			moveRowUp.common!,
			moveSourceWithAnalyticsViaShortcut(
				editorAnalyticsAPI,
				ariaNotifyPlugin,
				getIntl,
			)('table-row', -1),
			list,
		);

		bindKeymapWithCommand(
			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			moveColumnLeft.common!,
			moveSourceWithAnalyticsViaShortcut(
				editorAnalyticsAPI,
				ariaNotifyPlugin,
				getIntl,
			)('table-column', -1),
			list,
		);

		bindKeymapWithCommand(
			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			moveColumnRight.common!,
			moveSourceWithAnalyticsViaShortcut(
				editorAnalyticsAPI,
				ariaNotifyPlugin,
				getIntl,
			)('table-column', 1),
			list,
		);

		// Delete row/column shortcuts
		bindKeymapWithCommand(
			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			deleteColumn.common!,
			deleteSelectedRowsOrColumnsWithAnalyticsViaShortcut(
				editorAnalyticsAPI,
				api,
				isTableScalingEnabled,
				isTableFixedColumnWidthsOptionEnabled,
				shouldUseIncreasedScalingPercent,
			),
			list,
		);

		bindKeymapWithCommand(
			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			deleteRow.common!,
			deleteSelectedRowsOrColumnsWithAnalyticsViaShortcut(
				editorAnalyticsAPI,
				api,
				isTableScalingEnabled,
				isTableFixedColumnWidthsOptionEnabled,
				shouldUseIncreasedScalingPercent,
			),
			list,
		);
	}

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		startColumnResizing.common!,
		initiateKeyboardColumnResizing({
			ariaNotify: ariaNotifyPlugin,
			getIntl: getIntl,
			nodeViewPortalProviderAPI,
		}),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		moveRight.common!,
		activateNextResizeArea({
			direction: 1,
			ariaNotify: ariaNotifyPlugin,
			getIntl: getIntl,
			nodeViewPortalProviderAPI,
		}),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		moveLeft.common!,
		activateNextResizeArea({
			direction: -1,
			ariaNotify: ariaNotifyPlugin,
			getIntl: getIntl,
			nodeViewPortalProviderAPI,
		}),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		moveDown.common!,
		goToNextCellVertical(1),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		moveUp.common!,
		goToNextCellVertical(-1),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		decreaseMediaSize.common!,
		changeColumnWidthByStepWithAnalytics(editorAnalyticsAPI, api)(
			-10,
			getEditorContainerWidth,
			isTableScalingEnabled,
			isTableFixedColumnWidthsOptionEnabled,
			!!isCommentEditor,
			INPUT_METHOD.SHORTCUT,
			ariaNotifyPlugin,
			getIntl,
		),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		increaseMediaSize.common!,
		changeColumnWidthByStepWithAnalytics(editorAnalyticsAPI, api)(
			10,
			getEditorContainerWidth,
			isTableScalingEnabled,
			isTableFixedColumnWidthsOptionEnabled,
			!!isCommentEditor,
			INPUT_METHOD.SHORTCUT,
			ariaNotifyPlugin,
			getIntl,
		),
		list,
	);

	bindKeymapWithCommand(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		escape.common!,
		stopKeyboardColumnResizing({
			ariaNotify: ariaNotifyPlugin,
			getIntl: getIntl,
		}),
		list,
	);

	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	bindKeymapWithCommand(focusToContextMenuTrigger.common!, setFocusToCellMenu(), list);

	return keymap(list) as SafePlugin;
}

export default keymapPlugin;
