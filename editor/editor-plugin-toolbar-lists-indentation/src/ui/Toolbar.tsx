/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useEffect, useRef } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import { useIntl } from 'react-intl-next';

import {
	getAriaKeyshortcuts,
	toggleBulletList as toggleBulletListKeymap,
	indent as toggleIndentKeymap,
	toggleOrderedList as toggleOrderedListKeymap,
	outdent as toggleOutdentKeymap,
	tooltip,
	ToolTipContent,
} from '@atlaskit/editor-common/keymaps';
import { indentationMessages, listMessages as messages } from '@atlaskit/editor-common/messages';
import {
	buttonGroupStyle,
	buttonGroupStyleBeforeVisualRefresh,
	separatorStyles,
} from '@atlaskit/editor-common/styles';
import { TOOLBAR_BUTTON, ToolbarButton } from '@atlaskit/editor-common/ui-menu';
import BulletedListIcon from '@atlaskit/icon/core/migration/list-bulleted--editor-bullet-list';
import NumberListIcon from '@atlaskit/icon/core/migration/list-numbered--editor-number-list';
import OutdentIcon from '@atlaskit/icon/core/migration/text-indent-left--editor-outdent';
import IndentIcon from '@atlaskit/icon/core/migration/text-indent-right--editor-indent';
import { fg } from '@atlaskit/platform-feature-flags';

import type { ButtonName, ToolbarProps } from '../types';

export function Toolbar(props: ToolbarProps) {
	const { formatMessage } = useIntl();

	const indentButtonRef = useRef<HTMLElement | null>(null);
	const outdentButtonRef = useRef<HTMLElement | null>(null);

	const {
		disabled,
		isReducedSpacing,
		bulletListActive,
		bulletListDisabled,
		orderedListActive,
		orderedListDisabled,
		showIndentationButtons,
		indentDisabled,
		outdentDisabled,
		onItemActivated,
		pluginInjectionApi,
	} = props;
	const labelUnorderedList = formatMessage(messages.unorderedList);
	const labelOrderedList = formatMessage(messages.orderedList);
	const labelListsFormat = formatMessage(messages.listsFormat);
	const indentMessage = formatMessage(indentationMessages.indent);
	const outdentMessage = formatMessage(indentationMessages.outdent);
	const isIndentButtonFocused = document.activeElement === indentButtonRef.current;
	const isOutdentButtonFocused = document.activeElement === outdentButtonRef.current;

	const handleOnItemActivated =
		(buttonName: ButtonName) => (event: React.MouseEvent<HTMLElement, MouseEvent>) =>
			onItemActivated({
				editorView: props.editorView,
				buttonName,
			});

	useEffect(() => {
		if (isIndentButtonFocused && indentDisabled && outdentButtonRef.current) {
			outdentButtonRef.current.focus();
		}
	}, [indentButtonRef, indentDisabled, isIndentButtonFocused]);

	useEffect(() => {
		if (isOutdentButtonFocused && outdentDisabled && indentButtonRef.current) {
			indentButtonRef.current.focus();
		}
	}, [outdentButtonRef, outdentDisabled, isOutdentButtonFocused]);

	return (
		// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
		<span
			css={
				// eslint-disable-next-line @atlaskit/platform/ensure-feature-flag-registration, @atlaskit/platform/ensure-feature-flag-prefix
				fg('platform-visual-refresh-icons')
					? // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values
						buttonGroupStyle
					: // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values
						buttonGroupStyleBeforeVisualRefresh
			}
		>
			<div role="group" aria-label={labelListsFormat}>
				<ToolbarButton
					buttonId={TOOLBAR_BUTTON.BULLET_LIST}
					testId={labelUnorderedList}
					spacing={isReducedSpacing ? 'none' : 'default'}
					onClick={handleOnItemActivated('bullet_list')}
					selected={bulletListActive}
					aria-pressed={bulletListActive}
					aria-label={tooltip(toggleBulletListKeymap, labelUnorderedList)}
					aria-keyshortcuts={getAriaKeyshortcuts(toggleBulletListKeymap)}
					disabled={bulletListDisabled || disabled}
					title={
						<ToolTipContent description={labelUnorderedList} keymap={toggleBulletListKeymap} />
					}
					iconBefore={<BulletedListIcon label="" color="currentColor" spacing="spacious" />}
				/>
				<ToolbarButton
					buttonId={TOOLBAR_BUTTON.ORDERED_LIST}
					testId={labelOrderedList}
					spacing={isReducedSpacing ? 'none' : 'default'}
					onClick={handleOnItemActivated('ordered_list')}
					selected={orderedListActive}
					aria-pressed={orderedListActive}
					aria-label={tooltip(toggleOrderedListKeymap, labelOrderedList)}
					aria-keyshortcuts={getAriaKeyshortcuts(toggleOrderedListKeymap)}
					disabled={orderedListDisabled || disabled}
					title={<ToolTipContent description={labelOrderedList} keymap={toggleOrderedListKeymap} />}
					iconBefore={<NumberListIcon color="currentColor" spacing="spacious" label="" />}
				/>
				{showIndentationButtons && (
					<ToolbarButton
						buttonId={TOOLBAR_BUTTON.OUTDENT}
						testId={TOOLBAR_BUTTON.OUTDENT}
						ref={outdentButtonRef}
						spacing={isReducedSpacing ? 'none' : 'default'}
						onClick={handleOnItemActivated('outdent')}
						iconBefore={<OutdentIcon color="currentColor" spacing="spacious" label="" />}
						disabled={outdentDisabled || disabled}
						aria-label={tooltip(toggleOutdentKeymap, outdentMessage)}
						aria-keyshortcuts={getAriaKeyshortcuts(toggleOutdentKeymap)}
						title={<ToolTipContent description={outdentMessage} keymap={toggleOutdentKeymap} />}
					/>
				)}
				{showIndentationButtons && (
					<ToolbarButton
						buttonId={TOOLBAR_BUTTON.INDENT}
						testId={TOOLBAR_BUTTON.INDENT}
						ref={indentButtonRef}
						spacing={isReducedSpacing ? 'none' : 'default'}
						onClick={handleOnItemActivated('indent')}
						iconBefore={<IndentIcon color="currentColor" spacing="spacious" label="" />}
						disabled={indentDisabled || disabled}
						aria-label={tooltip(toggleIndentKeymap, indentMessage)}
						aria-keyshortcuts={getAriaKeyshortcuts(toggleIndentKeymap)}
						title={<ToolTipContent description={indentMessage} keymap={toggleIndentKeymap} />}
					/>
				)}
			</div>
			{!pluginInjectionApi?.primaryToolbar && (
				/* eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage */
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
				<span css={separatorStyles} />
			)}
		</span>
	);
}
