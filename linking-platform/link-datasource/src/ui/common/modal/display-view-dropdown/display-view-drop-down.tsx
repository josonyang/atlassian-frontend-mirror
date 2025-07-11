import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl-next';

import Button from '@atlaskit/button/new';
import { cssMap } from '@atlaskit/css';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import ChevronDownIcon from '@atlaskit/icon/core/chevron-down';
import { fg } from '@atlaskit/platform-feature-flags';
import { Box } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

import { type DisplayViewModes } from '../../../../common/types';

import { displayViewDropDownMessages } from './messages';

const styles = cssMap({
	dropDownItemGroupStylesOld: {
		width: '320px',
		height: '140px',
		paddingTop: token('space.050'),
		paddingBottom: token('space.050'),
		borderRadius: token('border.radius'),
	},
	dropDownItemGroupStyles: {
		width: '420px',
		height: '116px',
		borderRadius: token('border.radius'),
	},
});

const InlineIconOld = (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M4 9C2.89543 9 2 9.67155 2 10.5V13.5C2 14.3285 2.89543 15 4 15H20C21.1046 15 22 14.3285 22 13.5V10.5C22 9.67155 21.1046 9 20 9H4ZM4.22222 11.25C4.22222 10.5 4.22222 10.5 5 10.5H7C7.55556 10.5 7.55556 10.5 7.55556 11.25V13C7.55556 13.5 7.55556 13.5 7 13.5H5C4.22222 13.5 4.22222 13.5 4.22222 13V11.25ZM9 12C9 11.7929 9.2239 11.625 9.5 11.625H19.5C19.7761 11.625 20 11.7929 20 12C20 12.2071 19.7761 12.375 19.5 12.375H9.5C9.2239 12.375 9 12.2071 9 12Z"
			fill={'currentColor'}
		/>
	</svg>
);

const InlineIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M6 10.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2.5v-3H6Zm4 0v3h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-8ZM4 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2Z"
			clipRule="evenodd"
		/>
	</svg>
);

const ListIconOld = (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15" fill="none">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 2C0 0.89543 0.895431 0 2 0H13C14.1046 0 15 0.895431 15 2V13C15 14.1046 14.1046 15 13 15H2C0.89543 15 0 14.1046 0 13V2ZM5 6C5 5.44772 5.44772 5 6 5L12 5C12.5523 5 13 5.44772 13 6C13 6.55229 12.5523 7 12 7L6 7C5.44772 7 5 6.55228 5 6ZM6 8C5.44772 8 5 8.44771 5 9C5 9.55228 5.44772 10 6 10L12 10C12.5523 10 13 9.55229 13 9C13 8.44772 12.5523 8 12 8L6 8ZM5 12C5 11.4477 5.44772 11 6 11L12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13L6 13C5.44772 13 5 12.5523 5 12ZM3 7C3.55228 7 4 6.55228 4 6C4 5.44772 3.55228 5 3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7ZM5 3C5 2.44772 5.44772 2 6 2L12 2C12.5523 2 13 2.44772 13 3C13 3.55229 12.5523 4 12 4L6 4C5.44772 4 5 3.55228 5 3ZM3 4C3.55228 4 4 3.55228 4 3C4 2.44772 3.55228 2 3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4ZM4 9C4 9.55229 3.55228 10 3 10C2.44772 10 2 9.55229 2 9C2 8.44771 2.44772 8 3 8C3.55228 8 4 8.44771 4 9ZM3 13C3.55228 13 4 12.5523 4 12C4 11.4477 3.55228 11 3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13Z"
			fill={'currentColor'}
		/>
	</svg>
);

const ListIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M5 7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Zm2-.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5H7Zm2.5 3H8V8h1.5v1.5Zm6.5 0h-5V8h5v1.5Zm-6.5 3.25H8v-1.5h1.5v1.5Zm6.5 0h-5v-1.5h5v1.5ZM9.5 16H8v-1.5h1.5V16Zm6.5 0h-5v-1.5h5V16Z"
			clipRule="evenodd"
		/>
	</svg>
);

export type DisplayViewDropDownProps = {
	onViewModeChange: (value: DisplayViewModes) => void;
	viewMode: DisplayViewModes;
};

export const DisplayViewDropDown = ({ onViewModeChange, viewMode }: DisplayViewDropDownProps) => {
	const { formatMessage } = useIntl();
	const isTable = viewMode === 'table';
	const triggerText = isTable
		? formatMessage(displayViewDropDownMessages.viewModeListLabel)
		: formatMessage(displayViewDropDownMessages.viewModeInlineLinkLabel);

	if (fg('platform-linking-visual-refresh-sllv')) {
		return (
			<DropdownMenu
				trigger={({ triggerRef, ...triggerProps }) => (
					<Button
						{...triggerProps}
						ref={triggerRef}
						iconAfter={() => <ChevronDownIcon label="" color="currentColor" size="small" />}
					>
						{triggerText}
					</Button>
				)}
				testId="datasource-modal--view-drop-down"
			>
				<Box xcss={styles.dropDownItemGroupStyles}>
					<DropdownItemGroup>
						<DropdownItem
							testId="dropdown-item-table"
							onClick={() => onViewModeChange('table')}
							isSelected={isTable}
							description={formatMessage(displayViewDropDownMessages.viewModeListDescription)}
							elemBefore={ListIcon}
						>
							<FormattedMessage {...displayViewDropDownMessages.viewModeListLabel} />
						</DropdownItem>
						<DropdownItem
							testId="dropdown-item-inline-link"
							onClick={() => onViewModeChange('inline')}
							isSelected={!isTable}
							description={formatMessage(displayViewDropDownMessages.viewModeInlineLinkDescription)}
							elemBefore={InlineIcon}
						>
							<FormattedMessage {...displayViewDropDownMessages.viewModeInlineLinkLabel} />
						</DropdownItem>
					</DropdownItemGroup>
				</Box>
			</DropdownMenu>
		);
	}

	return (
		<DropdownMenu trigger={triggerText} testId="datasource-modal--view-drop-down">
			<Box xcss={styles.dropDownItemGroupStylesOld}>
				<DropdownItemGroup>
					<DropdownItem
						testId="dropdown-item-table"
						onClick={() => onViewModeChange('table')}
						isSelected={isTable}
						description={formatMessage(displayViewDropDownMessages.viewModeListDescriptionOld)}
						elemBefore={ListIconOld}
					>
						<FormattedMessage {...displayViewDropDownMessages.viewModeListLabel} />
					</DropdownItem>
					<DropdownItem
						testId="dropdown-item-inline-link"
						onClick={() => onViewModeChange('inline')}
						isSelected={!isTable}
						description={formatMessage(
							displayViewDropDownMessages.viewModeInlineLinkDescriptionOld,
						)}
						elemBefore={InlineIconOld}
					>
						<FormattedMessage {...displayViewDropDownMessages.viewModeInlineLinkLabel} />
					</DropdownItem>
				</DropdownItemGroup>
			</Box>
		</DropdownMenu>
	);
};
