/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import { useIntl } from 'react-intl-next';

import {
	toggleBulletList as toggleBulletListKeymap,
	indent as toggleIndentKeymap,
	toggleOrderedList as toggleOrderedListKeymap,
	outdent as toggleOutdentKeymap,
	tooltip,
} from '@atlaskit/editor-common/keymaps';
import { indentationMessages, listMessages } from '@atlaskit/editor-common/messages';
import {
	expandIconContainerStyle,
	separatorStyles,
	wrapperStyle,
} from '@atlaskit/editor-common/styles';
import {
	DropdownMenuWithKeyboardNavigation as DropdownMenu,
	ToolbarButton,
} from '@atlaskit/editor-common/ui-menu';
import type { DropdownItem } from '@atlaskit/editor-plugin-block-type';
import { shortcutStyle } from '@atlaskit/editor-shared-styles/shortcut';
import BulletListIcon from '@atlaskit/icon/core/migration/list-bulleted--editor-bullet-list';
import ExpandIcon from '@atlaskit/icon/utility/migration/chevron-down';
import { fg } from '@atlaskit/platform-feature-flags';

import { type ButtonName, type ToolbarProps, ToolbarType } from '../types';

export type DropdownProps = ToolbarProps & {
	popupsMountPoint?: HTMLElement;
	popupsBoundariesElement?: HTMLElement;
	popupsScrollableElement?: HTMLElement;
	toolbarType: ToolbarType;
};

export function ToolbarDropdown(props: DropdownProps) {
	const { formatMessage } = useIntl();
	const {
		disabled,
		isReducedSpacing,
		bulletListActive,
		orderedListActive,
		popupsMountPoint,
		popupsBoundariesElement,
		popupsScrollableElement,
		onItemActivated,
		pluginInjectionApi,
	} = props;
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
	const [isOpenedByKeyboard, setOpenedByKeyboard] = React.useState(false);

	const labelLists = formatMessage(listMessages.lists);

	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onOpenChange = (attrs: any) => {
		setIsDropdownOpen(attrs.isDropdownOpen);
	};

	const handleTriggerClick = () => {
		onOpenChange({ isDropdownOpen: !isDropdownOpen });
	};

	const handleOnKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			setIsDropdownOpen(!isDropdownOpen);
			setOpenedByKeyboard(true);
		}
	};

	const items = useItems(props);

	const handleOnItemActivated = ({
		item,
		shouldCloseMenu = true,
	}: {
		item: DropdownItem;
		shouldCloseMenu: boolean;
	}) => {
		setIsDropdownOpen(!shouldCloseMenu);
		return onItemActivated({
			editorView: props.editorView,
			buttonName: item.value.name as ButtonName,
		});
	};

	const reducedSpacing = props.toolbarType === ToolbarType.FLOATING ? 'compact' : 'none';

	return (
		// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
		<span css={wrapperStyle}>
			<DropdownMenu
				items={items}
				onItemActivated={handleOnItemActivated}
				mountTo={popupsMountPoint}
				boundariesElement={popupsBoundariesElement}
				scrollableElement={popupsScrollableElement}
				isOpen={isDropdownOpen}
				onOpenChange={onOpenChange}
				fitHeight={188}
				fitWidth={175}
				shouldUseDefaultRole
				shouldFocusFirstItem={() => {
					if (isOpenedByKeyboard) {
						setOpenedByKeyboard(false);
					}
					return isOpenedByKeyboard;
				}}
			>
				<ToolbarButton
					spacing={isReducedSpacing ? reducedSpacing : 'default'}
					selected={bulletListActive || orderedListActive || isDropdownOpen}
					aria-expanded={isDropdownOpen}
					aria-haspopup
					aria-label={labelLists}
					disabled={disabled}
					onClick={handleTriggerClick}
					onKeyDown={handleOnKeyDown}
					title={labelLists}
					iconBefore={
						// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
						<span css={wrapperStyle}>
							<BulletListIcon color="currentColor" spacing="spacious" label={labelLists} />
							{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
							<span
								css={[
									// eslint-disable-next-line @atlaskit/platform/ensure-feature-flag-registration
									fg('platform-visual-refresh-icons') &&
										//eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
										expandIconContainerStyle,
								]}
							>
								<ExpandIcon color="currentColor" label="" LEGACY_margin="0 0 0 -8px" />
							</span>
						</span>
					}
				/>
			</DropdownMenu>
			{!pluginInjectionApi?.primaryToolbar && (
				/* eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage */
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
				<span css={separatorStyles} />
			)}
		</span>
	);
}

function useItems(
	props: Pick<
		DropdownProps,
		| 'bulletListDisabled'
		| 'bulletListActive'
		| 'orderedListDisabled'
		| 'orderedListActive'
		| 'indentDisabled'
		| 'outdentDisabled'
		| 'showIndentationButtons'
	>,
) {
	const { formatMessage } = useIntl();

	const labelUnorderedList = formatMessage(listMessages.unorderedList);
	const labelOrderedList = formatMessage(listMessages.orderedList);

	const items = [
		{
			key: 'unorderedList',
			content: labelUnorderedList,
			value: { name: 'bullet_list' },
			isDisabled: props.bulletListDisabled,
			isActive: Boolean(props.bulletListActive),
			elemAfter: (
				// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				<div css={shortcutStyle}>{tooltip(toggleBulletListKeymap)}</div>
			),
		},
		{
			key: 'orderedList',
			content: labelOrderedList,
			value: { name: 'ordered_list' },
			isDisabled: props.orderedListDisabled,
			isActive: Boolean(props.orderedListActive),
			elemAfter: (
				// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				<div css={shortcutStyle}>{tooltip(toggleOrderedListKeymap)}</div>
			),
		},
	];
	if (props.showIndentationButtons) {
		const labelIndent = formatMessage(indentationMessages.indent);
		const labelOutdent = formatMessage(indentationMessages.outdent);
		items.push(
			{
				key: 'outdent',
				content: labelOutdent,
				value: { name: 'outdent' },
				isDisabled: props.outdentDisabled,
				isActive: false,
				elemAfter: (
					// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
					<div css={shortcutStyle}>{tooltip(toggleOutdentKeymap)}</div>
				),
			},
			{
				key: 'indent',
				content: labelIndent,
				value: { name: 'indent' },
				isDisabled: props.indentDisabled,
				isActive: false,
				// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				elemAfter: <div css={shortcutStyle}>{tooltip(toggleIndentKeymap)}</div>,
			},
		);
	}
	return [{ items }];
}
