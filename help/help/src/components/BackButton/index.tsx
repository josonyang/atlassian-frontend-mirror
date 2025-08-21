import React from 'react';
import { injectIntl, type WrappedComponentProps } from 'react-intl-next';
import {
	useAnalyticsEvents,
	type UIAnalyticsEvent,
	AnalyticsContext,
} from '@atlaskit/analytics-next';
import { Transition } from 'react-transition-group';
import ArrowleftIcon from '@atlaskit/icon/core/migration/arrow-left';
import Button from '@atlaskit/button/standard-button';

import { messages } from '../../messages';
import { BackButtonContainer, BACK_BUTTON_CONTAINER_TRANSITION_DURATION_MS } from '../styled';
import { type TransitionStatus } from '../constants';

interface Props {
	// Defines if the back button is visible
	isVisible?: boolean;
	// Function executed when the user press the "Back" button.
	onClick(
		event: React.MouseEvent<HTMLElement, MouseEvent>,
		analyticsEvent?: UIAnalyticsEvent,
	): void;
}

export const BackButton: React.FC<Props & WrappedComponentProps> = ({
	onClick,
	isVisible = true,
	intl: { formatMessage },
}) => {
	const { createAnalyticsEvent } = useAnalyticsEvents();

	const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		if (onClick) {
			const analyticsEvent: UIAnalyticsEvent = createAnalyticsEvent({
				action: 'clicked',
			});
			onClick(event, analyticsEvent);
		}
	};

	return (
		<Transition
			in={isVisible}
			timeout={BACK_BUTTON_CONTAINER_TRANSITION_DURATION_MS}
			mountOnEnter
			unmountOnExit
		>
			{(state: TransitionStatus) => (
				<BackButtonContainer transitionState={state}>
					<Button
						onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
							if (state === 'entered') {
								handleOnClick(event);
							}
						}}
						appearance="subtle"
						iconBefore={<ArrowleftIcon color="currentColor" label="" LEGACY_size="medium" />}
					>
						{formatMessage(messages.help_panel_search_back)}
					</Button>
				</BackButtonContainer>
			)}
		</Transition>
	);
};

const BackButtonWithContext: React.FC<Props & WrappedComponentProps> = (props) => {
	return (
		<AnalyticsContext
			data={{
				componentName: 'backButton',
				packageName: process.env._PACKAGE_NAME_,
				packageVersion: process.env._PACKAGE_VERSION_,
			}}
		>
			<BackButton {...props} />
		</AnalyticsContext>
	);
};

export default injectIntl(BackButtonWithContext);
