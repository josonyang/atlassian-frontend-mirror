import React, { Suspense } from 'react';

import { FormattedMessage, injectIntl, type WrappedComponentProps } from 'react-intl-next';

import { type AnalyticsEventPayload, withAnalyticsEvents } from '@atlaskit/analytics-next';
import { GiveKudosLauncherLazy, KudosType } from '@atlaskit/give-kudos';
import { fg } from '@atlaskit/platform-feature-flags';
import Popup from '@atlaskit/popup';
import { type TriggerProps } from '@atlaskit/popup/types';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box } from '@atlaskit/primitives';
import { layers } from '@atlaskit/theme/constants';

import filterActions from '../../internal/filterActions';
import messages from '../../messages';
import type {
	AnalyticsFromDuration,
	AnalyticsProps,
	ProfileCardAction,
	Team,
	TeamProfilecardProps,
	TeamProfileCardTriggerProps,
	TeamProfileCardTriggerState,
} from '../../types';
import { cardTriggered, fireEvent, profileCardRendered } from '../../util/analytics';
import { isBasicClick } from '../../util/click';
import { DELAY_MS_HIDE, DELAY_MS_SHOW } from '../../util/config';
import { getPageTime } from '../../util/performance';
import { ErrorBoundary } from '../Error';

import { TeamProfileCardLazy } from './lazyTeamProfileCard';
import TeamLoadingState from './TeamLoadingState';

export class TeamProfileCardTriggerInternal extends React.PureComponent<
	TeamProfileCardTriggerProps & AnalyticsProps & WrappedComponentProps,
	TeamProfileCardTriggerState
> {
	static defaultProps: Partial<TeamProfileCardTriggerProps> = {
		actions: [],
		trigger: 'hover',
		position: 'bottom-start',
		triggerLinkType: 'link',
		shouldRenderToParent: true,
	};

	_isMounted: boolean = false;
	showTimer: number = 0;
	hideTimer: number = 0;

	openedByHover: boolean = false;

	openTime = 0;

	fireAnalytics = (payload: AnalyticsEventPayload) => {
		// Don't fire any analytics if the component is unmounted
		if (!this._isMounted) {
			return;
		}

		if (this.props.createAnalyticsEvent) {
			fireEvent(this.props.createAnalyticsEvent, payload);
		}
	};

	fireAnalyticsWithDuration = (generator: AnalyticsFromDuration) => {
		const event = generator(getPageTime() - this.openTime);
		this.fireAnalytics(event);
	};

	hideProfilecard = (delay = 0) => {
		clearTimeout(this.showTimer);
		clearTimeout(this.hideTimer);

		this.hideTimer = window.setTimeout(() => {
			this.setState({ visible: false });
		}, delay);
	};

	showProfilecard = (delay = 0) => {
		clearTimeout(this.hideTimer);
		clearTimeout(this.showTimer);

		this.showTimer = window.setTimeout(() => {
			if (!this.state.visible) {
				this.clientFetchProfile();
				this.openTime = getPageTime();
				this.setState({ visible: true });
			}
		}, delay);
	};

	onClick = (event: React.MouseEvent<HTMLElement>) => {
		if (this.props.triggerLinkType === 'link') {
			// We want to prevent navigation occurring on basic click, but it's important that
			// cmd+click, ctrl+click, etc. still work as expected.
			if (isBasicClick(event)) {
				event.preventDefault();
			}
		}

		if (this.props.triggerLinkType === 'clickable-link') {
			if (this.props.viewProfileOnClick) {
				this.props.viewProfileOnClick(event);
			}
		}

		if (this.props.trigger !== 'hover') {
			this.openedByHover = false;
			this.showProfilecard(0);

			if (!this.state.visible) {
				this.fireAnalytics(cardTriggered('team', 'click', this.props.teamId));
			}
		}
	};

	onMouseEnter = () => {
		if (this.props.trigger === 'click') {
			return;
		}

		if (!this.state.visible) {
			this.openedByHover = true;

			this.fireAnalytics(cardTriggered('team', 'hover', this.props.teamId));
		}

		this.showProfilecard(DELAY_MS_SHOW);
	};

	onMouseLeave = () => {
		if (this.props.trigger === 'click') {
			return;
		}

		if (this.openedByHover) {
			this.hideProfilecard(DELAY_MS_HIDE);
		}
	};

	onKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			this.setState({ isTriggeredByKeyboard: true });
			this.showProfilecard(0);
			if (!this.state.visible) {
				this.fireAnalytics(cardTriggered('team', 'click', this.props.teamId));
			}
		}
	};

	onClose = () => {
		this.hideProfilecard();
		this.setState({ isTriggeredByKeyboard: false });
	};

	openKudosDrawer = () => {
		this.hideProfilecard(DELAY_MS_HIDE);
		this.setState({ kudosDrawerOpen: true });
	};

	closeKudosDrawer = () => {
		this.setState({ kudosDrawerOpen: false });
	};

	kudosUrl = (): string => {
		const recipientId = (this.props.teamId && `&recipientId=${this.props.teamId}`) || '';
		const cloudId = (this.props.cloudId && `&cloudId=${this.props.cloudId}`) || '';

		return `${this.state.teamCentralBaseUrl}/kudos/give?type=team${recipientId}${cloudId}`;
	};

	stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
		// We need to stop propagation when users click on the card, so that it
		// doesn't trigger any special effects that occur when clicking the trigger.
		event.stopPropagation();
	};

	triggerListeners = {
		onClick: this.onClick,
		onMouseEnter: this.onMouseEnter,
		onMouseLeave: this.onMouseLeave,
	};

	cardListeners = {
		onClick: this.stopPropagation,
		onMouseEnter: this.onMouseEnter,
		onMouseLeave: this.onMouseLeave,
	};

	state: TeamProfileCardTriggerState = {
		visible: false,
		isLoading: undefined,
		hasError: false,
		error: null,
		data: null,
		shouldShowGiveKudos: false,
		teamCentralBaseUrl: undefined,
		kudosDrawerOpen: false,
		isTriggeredByKeyboard: false,
	};

	componentDidMount() {
		this._isMounted = true;
	}

	componentDidUpdate(prevProps: TeamProfileCardTriggerProps) {
		const { orgId, teamId, resourceClient } = this.props;
		const { visible } = this.state;

		// just re-fetching data when the card opens
		if (
			visible &&
			(teamId !== prevProps.teamId ||
				orgId !== prevProps.orgId ||
				resourceClient !== prevProps.resourceClient)
		) {
			this.setState(
				{
					isLoading: undefined,
				},
				this.clientFetchProfile,
			);
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
		clearTimeout(this.showTimer);
		clearTimeout(this.hideTimer);
	}

	clientFetchProfile = () => {
		const { orgId, teamId } = this.props;
		const { isLoading } = this.state;

		if (isLoading === true) {
			// don't fetch data when fetching is in process
			return;
		}

		this.setState(
			{
				isLoading: true,
				data: null,
			},
			() => {
				const fireEvent = (event: AnalyticsEventPayload) => {
					this.fireAnalytics(event);
				};

				const requests = Promise.all([
					this.props.resourceClient.getTeamProfile(teamId, orgId, fireEvent),
					this.props.resourceClient.shouldShowGiveKudos(),
					this.props.resourceClient.getTeamCentralBaseUrl({
						withOrgContext: true,
						withSiteContext: true,
					}),
				]);

				requests
					.then(
						(res) => this.handleClientSuccess(...res),
						(err) => this.handleClientError(err),
					)
					.catch((err) => this.handleClientError(err));
			},
		);
	};

	onErrorBoundary = () => {
		this.fireAnalytics(
			profileCardRendered('team', 'errorBoundary', {
				duration: 0,
			}),
		);

		this.setState({
			renderError: true,
		});
	};

	handleClientSuccess(
		team: Team,
		shouldShowGiveKudos: boolean,
		teamCentralBaseUrl: string | undefined,
	) {
		if (!this._isMounted) {
			return;
		}

		this.setState({
			isLoading: false,
			hasError: false,
			data: team,
			shouldShowGiveKudos,
			teamCentralBaseUrl,
		});
	}

	handleClientError(err: any) {
		if (!this._isMounted) {
			return;
		}

		this.setState({
			isLoading: false,
			hasError: true,
			error: err,
		});
	}

	filterActions(): ProfileCardAction[] {
		const actions = filterActions(this.props.actions, this.state.data);
		if (this.state.shouldShowGiveKudos) {
			const kudosAction = {
				label: <FormattedMessage {...messages.giveKudosButton} />,
				id: 'give-kudos',
				callback: () => {
					this.openKudosDrawer();
				},
				link: this.kudosUrl(),
			};
			return actions.concat([kudosAction]);
		}
		return actions;
	}

	renderProfileCard = () => {
		const { generateUserLink, onUserClick, viewingUserId, viewProfileLink, viewProfileOnClick } =
			this.props;
		const { data, error, hasError, isLoading } = this.state;

		const newProps: TeamProfilecardProps = {
			clientFetchProfile: this.clientFetchProfile,
			actions: this.filterActions(),
			analytics: this.fireAnalyticsWithDuration,
			team: data || undefined,
			generateUserLink,
			onUserClick,
			viewingUserId,
			viewProfileLink,
			viewProfileOnClick,
		};

		return (
			<div {...this.cardListeners}>
				{this.state.visible && (
					<Suspense fallback={<TeamLoadingState analytics={this.fireAnalyticsWithDuration} />}>
						<TeamProfileCardLazy
							{...newProps}
							isLoading={isLoading}
							hasError={hasError}
							errorType={error}
							isTriggeredByKeyboard={this.state.isTriggeredByKeyboard}
						/>
					</Suspense>
				)}
			</div>
		);
	};

	renderKudosLauncher = () => {
		return (
			this.state.shouldShowGiveKudos && (
				<Suspense fallback={null}>
					<GiveKudosLauncherLazy
						isOpen={this.state.kudosDrawerOpen}
						recipient={{
							type: KudosType.TEAM,
							recipientId: this.props.teamId!,
						}}
						analyticsSource="team-profile-card"
						teamCentralBaseUrl={this.state.teamCentralBaseUrl!}
						cloudId={this.props.cloudId || ''}
						addFlag={this.props.addFlag}
						onClose={this.closeKudosDrawer}
					/>
				</Suspense>
			)
		);
	};

	renderTrigger = (triggerProps: TriggerProps) => {
		const { children, intl, triggerLinkType, viewProfileLink } = this.props;

		if (triggerLinkType === 'none') {
			return (
				<>
					{this.renderKudosLauncher()}
					{fg('enable_team_profilecard_toggletip_a11y_fix') ? (
						<Box
							as="span"
							role="button"
							testId="team-profilecard-trigger-wrapper"
							tabIndex={0}
							aria-label={intl.formatMessage(messages.teamProfileCardAriaLabel)}
							onKeyUp={this.onKeyPress}
							{...triggerProps}
							{...this.triggerListeners}
						>
							{children}
						</Box>
					) : (
						<span
							data-testid="team-profilecard-trigger-wrapper"
							{...triggerProps}
							{...this.triggerListeners}
						>
							{children}
						</span>
					)}
				</>
			);
		}

		return (
			<>
				{this.renderKudosLauncher()}
				{/* eslint-disable-next-line @atlaskit/design-system/no-html-anchor */}
				<a
					data-testid="team-profilecard-trigger-wrapper"
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					style={{ color: 'initial', textDecoration: 'none' }}
					href={viewProfileLink}
					{...triggerProps}
					ref={triggerProps.ref as React.RefObject<HTMLAnchorElement>}
					{...this.triggerListeners}
				>
					{children}
				</a>
			</>
		);
	};

	renderPopup() {
		if (this.state.renderError) {
			return this.props.children;
		}

		return (
			<ErrorBoundary onError={this.onErrorBoundary}>
				<Popup
					isOpen={!!this.state.visible}
					onClose={this.onClose}
					placement={this.props.position}
					content={this.renderProfileCard}
					trigger={(triggerProps) => this.renderTrigger(triggerProps)}
					zIndex={layers.modal()}
					shouldFlip
					autoFocus={this.props.trigger !== 'hover' && !this.openedByHover}
					shouldRenderToParent={
						fg('enable_appropriate_reading_order_in_profile_card') &&
						this.props.shouldRenderToParent
					}
				/>
			</ErrorBoundary>
		);
	}

	render() {
		if (this.props.children) {
			return this.renderPopup();
		} else {
			throw new Error('Component "TeamProfileCardTrigger" must have "children" property');
		}
	}
}

export default withAnalyticsEvents()(injectIntl(TeamProfileCardTriggerInternal));
