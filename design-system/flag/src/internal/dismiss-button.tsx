import React, { memo } from 'react';

import CloseIcon from '@atlaskit/icon/core/migration/close--cross';
import ChevronDownIcon from '@atlaskit/icon/utility/migration/chevron-down--hipchat-chevron-down';
import ChevronUpIcon from '@atlaskit/icon/utility/migration/chevron-up--hipchat-chevron-up';
import { Pressable, xcss } from '@atlaskit/primitives';

import { flagTextColorToken } from '../theme';
import { type AppearanceTypes } from '../types';

const buttonStyles = xcss({
	display: 'flex',
	width: '24px',
	height: '24px',
	padding: 'space.0',
	alignItems: 'center',
	justifyContent: 'center',
	flex: '0 0 auto',
	background: 'none',
	borderStyle: 'none',
	cursor: 'pointer',
	whiteSpace: 'nowrap',
});

interface DismissButtonProps {
	appearance: AppearanceTypes;
	onClick: (...args: any) => void;
	isExpanded: boolean;
	isBold: boolean;
	testId?: string;
}

const DismissButtonComponent = ({
	appearance,
	onClick,
	isBold,
	isExpanded,
	testId,
}: DismissButtonProps) => {
	let ButtonIcon = CloseIcon;
	let buttonLabel = 'Dismiss';

	let size: 'small' | 'medium' = 'small';
	let buttonTestId = testId && `${testId}-dismiss`;

	if (isBold) {
		ButtonIcon = isExpanded ? ChevronUpIcon : ChevronDownIcon;
		buttonLabel = isExpanded ? 'Collapse' : 'Expand';
		size = 'medium';
		buttonTestId = testId && `${testId}-toggle`;
	}

	return (
		<Pressable
			xcss={buttonStyles}
			onClick={onClick}
			aria-expanded={isBold ? isExpanded : undefined}
			testId={buttonTestId}
			aria-label={buttonLabel}
		>
			<ButtonIcon
				label=""
				LEGACY_size={size}
				LEGACY_primaryColor={flagTextColorToken[appearance]}
				color={flagTextColorToken[appearance]}
			/>
		</Pressable>
	);
};

const DismissButton = memo(DismissButtonComponent);

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default DismissButton;
