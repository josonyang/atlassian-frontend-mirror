import React from 'react';
import { type ReactNode, type MouseEvent } from 'react';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { CardActionButton } from './cardActionButton';

import { type CardActionIconButtonVariant } from './styles';
import { fireMediaCardEvent } from '../../../../utils/analytics';

export type CardActionIconButtonProps = {
	readonly icon: ReactNode;
	readonly label?: string;
	readonly isPrimary?: boolean;
	readonly filename?: string;
	readonly variant?: CardActionIconButtonVariant;
	readonly triggerColor?: string;
	readonly onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const CardActionIconButton = ({
	icon,
	label,
	filename,
	triggerColor,
	onClick,
	isPrimary,
	variant,
}: CardActionIconButtonProps) => {
	const { createAnalyticsEvent } = useAnalyticsEvents();

	// this is to prevent currently focused text to loose cursor on clicking card action
	// this does not prevent onclick behavior
	const onMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		const actionSubjectId = isPrimary
			? 'mediaCardPrimaryActionButton'
			: 'mediaCardSecondaryActionButton';

		fireMediaCardEvent(
			{
				eventType: 'ui',
				action: 'clicked',
				actionSubject: 'button',
				actionSubjectId,
				attributes: {
					label,
				},
			},
			createAnalyticsEvent,
		);
		onClick?.(e);
	};

	return (
		<CardActionButton
			onClick={handleClick}
			onMouseDown={onMouseDown}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
			style={{ color: triggerColor }}
			label={filename ? `${filename} — ${label}` : label}
			variant={variant}
		>
			{icon}
		</CardActionButton>
	);
};
