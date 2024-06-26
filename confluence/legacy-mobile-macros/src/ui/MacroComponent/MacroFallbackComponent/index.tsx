import React, { type ComponentType, type FC, useEffect, useState } from 'react';

import { useIntl } from 'react-intl-next';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from 'styled-components';

import Button from '@atlaskit/button/standard-button';
import Spinner from '@atlaskit/spinner';
import * as colors from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { useMacroViewedAnalyticsEvent } from '../../../common/utils';
import { legacyMobileMacrosMessages } from '../../../messages';

import {
	FALLBACK_TEST_ID,
	OPEN_IN_BROWSER_TEST_ID,
	TAP_TO_LOAD_PROMISE,
	TAP_TO_OPEN_IN_BROWSER_PROMISE,
	TAP_TO_REFRESH_EVENT,
	TAP_TO_REFRESH_PAGE_PROMISE,
	TAP_TO_VIEW_PROMISE,
} from './constants';
import { MacroFallbackCard } from './MacroFallbackCard';
import { type ActionProps, type CreateMacro, type MacroFallbackComponentProps } from './types';

const noop = () => {};

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-dynamic-styles -- Ignored via go/DSP-18766
const Action = styled.span<ActionProps>((props) => ({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	color: props.callToAction
		? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
			token('color.link', colors.B300)
		: // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
			token('color.text.subtlest', colors.N90),
	alignSelf: 'center',
	textAlign: 'right',
	whiteSpace: 'nowrap',
	paddingLeft: token('space.200', '16px'),
	minWidth: '50px',
}));

const cardStyles = (componentType: ComponentType<any>) => {
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled -- To migrate as part of go/ui-styling-standard
	return styled(componentType)({
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
		'&&': {
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
			backgroundColor: token('elevation.surface', colors.N0),
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
			border: `solid 2px ${token('color.border', colors.N30)}`,
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-important-styles, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
			color: `${token('color.text', colors.N800)} !important`,
			display: 'flex',
			height: 'unset',
			minHeight: '44px',
			whiteSpace: 'normal',
			textAlign: 'left',
			minWidth: '150px',
			alignItems: 'center',
			lineHeight: '22px',
		},
	});
};

// create standard translated error messages here????
export const MacroFallbackComponent: FC<MacroFallbackComponentProps> = (props) => {
	const { createPromise, eventDispatcher, extension, openInBrowser } = props;
	const { extensionKey, parameters, localId } = extension;

	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [retryCount, setRetryCount] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');

	const { formatMessage } = useIntl();

	const cardProps: CreateMacro = {
		isDisabled: false,
		action: <></>,
		onClick: null,
		secondaryAction: <></>,
		testId: FALLBACK_TEST_ID,
	};

	const getMacroId = () => {
		return parameters?.macroMetadata?.macroId?.value || localId;
	};

	const getIconUrl = () => {
		return (
			parameters?.macroMetadata?.placeholder?.[0]?.type === 'icon' &&
			parameters.macroMetadata.placeholder[0].data?.url
		);
	};

	const getMacroName = () => {
		const macroTitle = parameters?.macroMetadata?.title || parameters?.extensionTitle;

		// a title can be a long string eg com.atlassian.packages.label
		// or excerpt-include vs Excerpt include
		// or toc vs Table of contents
		if (
			macroTitle &&
			typeof macroTitle === 'string' &&
			!/(\w+\.\w+)+/.test(macroTitle) &&
			!/(\w+-\w+)+/.test(macroTitle)
		) {
			return macroTitle;
		} else {
			return extensionKey;
		}
	};

	// action can be view/retry/spinner/nothing
	const createCard = ({
		action,
		errorMessage,
		onClick,
		isDisabled,
		secondaryAction,
		testId,
	}: CreateMacro) => {
		// fallback to the extensionkey while the changes soak for the title to be f
		// title might not be a string??
		const macroName = getMacroName();
		const iconUrl = getIconUrl();

		const CardButton = cardStyles(Button.type);

		return (
			<div data-testid={testId} data-macro-id={getMacroId()}>
				<CardButton onClick={onClick || noop} isDisabled={isDisabled} shouldFitContainer>
					<MacroFallbackCard
						action={action}
						errorMessage={errorMessage}
						extensionKey={extensionKey}
						iconUrl={iconUrl}
						loading={loading}
						macroName={macroName}
						secondaryAction={secondaryAction}
					/>
				</CardButton>
			</div>
		);
	};

	const setLoadingErrorState = () => {
		setLoaded(false);
		setLoading(false);
		setErrorMessage(formatMessage(legacyMobileMacrosMessages.errorLoadingMacro));
	};

	const setLoadingRetryState = () => {
		setLoaded(false);
		setLoading(true);
		setErrorMessage('');
		setRetryCount(retryCount + 1);
	};

	const setErrorUnableToLoadState = () => {
		setLoaded(false);
		setLoading(false);
		setErrorMessage(formatMessage(legacyMobileMacrosMessages.finalErrorLoadingMacro));
	};

	const setLoadingSuccessState = () => {
		setLoaded(true);
		setLoading(false);
		setErrorMessage('');
	};

	const tapToLoad = () => {
		// on button click
		// set state to loading
		setLoading(true);

		createPromise(
			TAP_TO_LOAD_PROMISE.name,
			JSON.stringify({
				macroId: getMacroId(),
				extensionKey,
				retryCount,
			}),
		)
			.submit()
			.then((isSuccessful: boolean) => {
				if (isSuccessful) {
					setLoadingSuccessState();
				} else {
					setLoadingErrorState();
				}
			})
			.catch(() => {
				setErrorUnableToLoadState();
			});
	};

	const tapToView = () => {
		// on button click
		// do not set state to loading
		createPromise(
			TAP_TO_VIEW_PROMISE.name,
			JSON.stringify({
				macroId: getMacroId(),
				extensionKey,
			}),
		)
			.submit()
			.catch(() => {
				setErrorUnableToLoadState();
			});
	};

	const tapToOpenBrowser = () => {
		createPromise(
			TAP_TO_OPEN_IN_BROWSER_PROMISE.name,
			JSON.stringify({
				macroId: getMacroId(),
				extensionKey,
			}),
		)
			.submit()
			.catch(() => {
				setErrorUnableToLoadState();
			});
	};

	const tapToRetry = () => {
		setLoadingRetryState();

		createPromise(
			TAP_TO_LOAD_PROMISE.name,
			JSON.stringify({
				macroId: getMacroId(),
				extensionKey,
				retryCount,
			}),
		)
			.submit()
			.then((isSuccessful: boolean) => {
				if (isSuccessful) {
					setLoadingSuccessState();
				} else if (retryCount > 2) {
					setErrorUnableToLoadState();
				} else {
					setLoadingErrorState();
				}
			})
			.catch(() => {
				setErrorUnableToLoadState();
			});
	};

	const tapToRefreshPage = () => {
		// Emit a refresh event with no data
		eventDispatcher.emit(TAP_TO_REFRESH_EVENT, null);
		// on button click
		// do not set state to loading
		createPromise(TAP_TO_REFRESH_PAGE_PROMISE.name)
			.submit()
			.then(() => {
				// re-invoking the load method of the macro
				tapToLoad();
			})
			.catch(() => {
				setErrorUnableToLoadState();
			});
	};

	const getTapToLoadCardProps = (cardProps: CreateMacro): CreateMacro => {
		const newProps = {
			action: <Action>{formatMessage(legacyMobileMacrosMessages.tapToLoadMacro)}</Action>,
			isDisabled: false,
			onClick: tapToLoad,
		};

		return { ...cardProps, ...newProps };
	};

	const getLoadingCardProps = (cardProps: CreateMacro): CreateMacro => {
		const newProps = {
			action: (
				<Action data-testid="macro-card-spinner">
					<Spinner />
				</Action>
			),
			isDisabled: true,
			errorMessage,
		};

		return { ...cardProps, ...newProps };
	};

	const getTapToViewCardProps = (cardProps: CreateMacro): CreateMacro => {
		const newProps = {
			action: (
				<Action callToAction>{formatMessage(legacyMobileMacrosMessages.tapToViewMacro)}</Action>
			),
			isDisabled: false,
			onClick: tapToView,
		};

		return { ...cardProps, ...newProps };
	};

	const getTapToOpenBrowserCardProps = (cardProps: CreateMacro): CreateMacro => {
		const newProps = {
			action: (
				<Action callToAction>{formatMessage(legacyMobileMacrosMessages.tapToOpenBrowser)}</Action>
			),
			isDisabled: false,
			onClick: tapToOpenBrowser,
			testId: OPEN_IN_BROWSER_TEST_ID,
		};

		return { ...cardProps, ...newProps };
	};

	const getTapToRetryCardProps = (cardProps: CreateMacro): CreateMacro => {
		const newProps = {
			action: (
				<Action callToAction>
					{formatMessage(legacyMobileMacrosMessages.tapToRetryLoadingMacro)}
				</Action>
			),
			isDisabled: false,
			onClick: tapToRetry,
			errorMessage,
		};

		return { ...cardProps, ...newProps };
	};

	const getTapToRefreshPageCardProps = (cardProps: CreateMacro): CreateMacro => {
		const newProps = {
			isDisabled: false,
			onClick: tapToRefreshPage,
			errorMessage,
			secondaryAction: (
				<Action callToAction>{formatMessage(legacyMobileMacrosMessages.tapToRefreshPage)}</Action>
			),
		};

		return { ...cardProps, ...newProps };
	};

	const onTapToRefresh = () => {
		setLoaded(false);
		setLoading(false);
		setErrorMessage('');
		setRetryCount(0);
	};

	useEffect(() => {
		// Attach a listener to the tapToRefresh event emitted during refresh.
		eventDispatcher.on(TAP_TO_REFRESH_EVENT, onTapToRefresh);

		return () => {
			// Removing the listener to the event before the component is unMounted.
			eventDispatcher.off(TAP_TO_REFRESH_EVENT, onTapToRefresh);
		};
	}, [eventDispatcher]);

	const fireMacroViewedAnalyticsEvent = useMacroViewedAnalyticsEvent();
	useEffect(() => {
		fireMacroViewedAnalyticsEvent(extensionKey, 'fallback');
	}, [extensionKey, fireMacroViewedAnalyticsEvent]);

	if (openInBrowser) {
		return createCard(getTapToOpenBrowserCardProps(cardProps));
	} else if (!loaded && !loading && !errorMessage) {
		// show tap to load
		return createCard(getTapToLoadCardProps(cardProps));
	} else if (loaded && !loading && !errorMessage) {
		// show tap to show button
		// promise to show button
		return createCard(getTapToViewCardProps(cardProps));
	} else if (!loaded && loading) {
		// show loading state, possible to have error message and loading
		return createCard(getLoadingCardProps(cardProps));
	} else {
		// loaded && loading should not be a possible state unless an error has occurred
		// check retry count state
		if (retryCount < 3) {
			// allow to retry
			return createCard(getTapToRetryCardProps(cardProps));
		} else {
			// show tap to refresh page
			return createCard(getTapToRefreshPageCardProps(cardProps));
		}
	}

	return createCard(cardProps);
};

export { MacroFallbackCard };
