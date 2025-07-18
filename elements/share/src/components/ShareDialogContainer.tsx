import React from 'react';

import deepEqual from 'fast-deep-equal';
import memoizeOne from 'memoize-one';
import { FormattedMessage } from 'react-intl-next';
import assert from 'tiny-invariant';

import {
	type AnalyticsEventPayload,
	withAnalyticsEvents,
	type WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import { fg } from '@atlaskit/platform-feature-flags';

import {
	AtlassianUrlShortenerClient,
	type ShortenRequest,
	type UrlShortenerClient,
} from '../clients/AtlassianUrlShortenerClient';
import {
	type ConfigResponse,
	type ShareClient,
	ShareServiceClient,
} from '../clients/ShareServiceClient';
import { messages } from '../i18n';
import type {
	Content,
	MetaData,
	OriginTracing,
	OriginTracingFactory,
	ShareData,
	ShareDialogContainerProps,
} from '../types';

import {
	CHANNEL_ID,
	copyLinkButtonClicked,
	errorEncountered,
	shortUrlGenerated,
	shortUrlRequested,
} from './analytics/analytics';
import { isValidFailedExperience } from './analytics/ufoExperienceHelper';
import { renderShareDialogExp } from './analytics/ufoExperiences';
import ErrorBoundary from './ErrorBoundary';
import MessagesIntlProvider from './MessagesIntlProvider';
import { ShareDialogWithTrigger } from './ShareDialogWithTrigger';
import { optionDataToUsers } from './utils';

const COPY_LINK_EVENT = copyLinkButtonClicked({ start: 0 });

export const defaultConfig: ConfigResponse = {
	disableSharingToEmails: false,
};

export type State = {
	config?: ConfigResponse;
	isFetchingConfig: boolean;
	shareActionCount: number;
	currentPageUrl: string;
	shortenedCopyLink: null | string;
	shortenedCopyLinkData?: ShortenRequest;
};

const memoizedFormatCopyLink: (origin: OriginTracing, link: string) => string = memoizeOne(
	(origin: OriginTracing, link: string): string => origin.addToUrl(link),
);

function getCurrentPageUrl(): string {
	return window.location.href;
}

type ShareDialogContainerInternalProps = WithAnalyticsEventsProps & ShareDialogContainerProps;

/**
 * This component serves as a Provider to provide customizable implementations
 * to ShareDialogTrigger component
 */
// eslint-disable-next-line @repo/internal/react/no-class-components
export class ShareDialogContainerInternal extends React.Component<
	ShareDialogContainerInternalProps,
	State
> {
	private shareClient: ShareClient;
	private urlShortenerClient: UrlShortenerClient;
	private _isMounted = false;
	private _urlShorteningRequestCounter = 0;
	private _lastUrlShorteningWasTooSlow = false;

	static defaultProps: Partial<ShareDialogContainerInternalProps> = {
		enableSmartUserPicker: false,
		shareeAction: 'view',
		product: 'confluence',
	};

	constructor(props: ShareDialogContainerProps) {
		super(props);

		// v0.4 -> v0.5 .client -> .shareClient
		assert(!(props as any).client, 'elements/share: Breaking change, please update your props!');
		this.shareClient = props.shareClient || new ShareServiceClient();

		this.urlShortenerClient = props.urlShortenerClient || new AtlassianUrlShortenerClient();

		this.state = {
			shareActionCount: 0,
			config: defaultConfig,
			isFetchingConfig: false,
			currentPageUrl: getCurrentPageUrl(),
			shortenedCopyLink: null,
		};
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	componentDidUpdate(prevProps: ShareDialogContainerProps) {
		if (!deepEqual(prevProps.shortLinkData, this.props.shortLinkData)) {
			this.updateShortCopyLink();
		}
	}

	private createAndFireEvent = (payload: AnalyticsEventPayload) => {
		const { createAnalyticsEvent } = this.props;
		if (createAnalyticsEvent) {
			createAnalyticsEvent(payload).fire(CHANNEL_ID);
		}
	};

	fetchConfig = () => {
		this.setState(
			{
				isFetchingConfig: true,
			},
			async () => {
				try {
					renderShareDialogExp.start();
					const config: ConfigResponse = await this.shareClient.getConfig(this.props.cloudId);
					if (this._isMounted) {
						this.setState({
							config,
							isFetchingConfig: false,
						});
					}
					renderShareDialogExp.success();
				} catch (error: any) {
					if (this._isMounted) {
						this.setState({
							config: defaultConfig,
							isFetchingConfig: false,
						});
					}

					let { ...errObj }: { [key: string]: any } = error;

					if (error instanceof Error) {
						errObj = { ...errObj, className: error.constructor.name };
					}

					isValidFailedExperience(renderShareDialogExp, errObj);
				}
			},
		);
	};

	handleSubmitShare = ({ users, comment, ...rest }: ShareData): Promise<void> => {
		const shareLink = this.getFormShareLink();
		const {
			productId,
			shareAri,
			shareContentType,
			shareTitle,
			shareeAction,
			workspaceAri,
			isExtendedShareDialogEnabled,
		} = this.props;
		const content: Content = {
			ari: shareAri,
			link: shareLink,
			title: shareTitle,
			type: shareContentType,
			workspaceAri,
		};
		const metaData: MetaData = {
			productId,
			atlOriginId: this.getFormShareOriginTracing().id,
			shareeAction,
		};

		this.props.onSubmit?.({ users, comment, ...rest });

		if (isExtendedShareDialogEnabled && users.length === 0) {
			return Promise.resolve();
		}

		return this.shareClient.share(content, optionDataToUsers(users), metaData, comment).then(() => {
			if (!this._isMounted) {
				return;
			}

			// renew Origin Tracing Id per share action succeeded
			this.setState((state) => ({
				shareActionCount: state.shareActionCount + 1,
			}));
		});
	};

	handleDialogOpen = async () => {
		if (this.props.onDialogOpen) {
			this.props.onDialogOpen();
		}
		this.setState(
			{
				currentPageUrl: getCurrentPageUrl(),
			},
			() => {
				this.updateShortCopyLink();
			},
		);

		// always refetch the config when modal is re-opened
		this.fetchConfig();
	};

	decorateAnalytics = (payload: AnalyticsEventPayload): AnalyticsEventPayload => {
		if (
			payload.type === COPY_LINK_EVENT.type &&
			payload.action === COPY_LINK_EVENT.action &&
			payload.actionSubjectId === COPY_LINK_EVENT.actionSubjectId
		) {
			const isCopyLinkShortened = !!this.getShortenedCopyLink();

			payload = {
				...payload,
				attributes: {
					...payload.attributes,
					shortUrl: isCopyLinkShortened,
				},
			};

			if (this.shouldShortenCopyLink() && !isCopyLinkShortened) {
				this._lastUrlShorteningWasTooSlow = true;
			}
		}

		return payload;
	};

	// ensure origin is re-generated if the link or the factory changes
	// separate memoization is needed since copy != form
	getUniqueCopyLinkOriginTracing = memoizeOne(
		(link: string, originTracingFactory: OriginTracingFactory): OriginTracing => {
			return originTracingFactory();
		},
	);
	// form origin must furthermore be regenerated after each form share
	getUniqueFormShareOriginTracing = memoizeOne(
		(
			link: string,
			originTracingFactory: OriginTracingFactory,
			shareCount: number,
		): OriginTracing => {
			return originTracingFactory();
		},
	);

	getUpToDateShortenedCopyLink: (data: ShortenRequest, originId: string) => Promise<string | null> =
		memoizeOne((data: ShortenRequest, originId: string): Promise<string | null> => {
			this._lastUrlShorteningWasTooSlow = false;
			this._urlShorteningRequestCounter++;
			this.createAndFireEvent(shortUrlRequested());

			const start = Date.now();
			return this.urlShortenerClient
				.shorten({ ...data, originId: originId })
				.then((response) => {
					this.createAndFireEvent(shortUrlGenerated(start, this._lastUrlShorteningWasTooSlow));
					return response.shortUrl;
				})
				.catch(() => {
					this.createAndFireEvent(errorEncountered('urlShortening'));
					return null;
				});
		}, deepEqual);

	getRawLink(): string {
		const { shareLink } = this.props;
		const { currentPageUrl } = this.state;
		return shareLink || currentPageUrl;
	}

	getCopyLinkOriginTracing(): OriginTracing {
		const { originTracingFactory } = this.props;
		const shareLink = this.getRawLink();
		return this.getUniqueCopyLinkOriginTracing(shareLink, originTracingFactory);
	}

	getFormShareOriginTracing(): OriginTracing {
		const { originTracingFactory } = this.props;
		const { shareActionCount } = this.state;
		const shareLink = this.getRawLink();
		return this.getUniqueFormShareOriginTracing(shareLink, originTracingFactory, shareActionCount);
	}

	getFullCopyLink(): string {
		const { formatCopyLink } = this.props;
		const shareLink = this.getRawLink();
		const copyLinkOrigin = this.getCopyLinkOriginTracing();
		return (formatCopyLink || memoizedFormatCopyLink)(copyLinkOrigin, shareLink);
	}

	shouldShortenCopyLink(): boolean {
		return !!this.props.shortLinkData || !!this.props.useUrlShortener;
	}

	getShortenedCopyLink(): string | undefined {
		return (this.shouldShortenCopyLink() && this.state.shortenedCopyLink) || undefined;
	}

	getCopyLink(): string {
		return this.getShortenedCopyLink() || this.getFullCopyLink();
	}

	updateShortCopyLink() {
		this.setState({
			shortenedCopyLink: null,
		});
		const { shortLinkData } = this.props;

		if (!shortLinkData) {
			return;
		}

		const originId = this.getCopyLinkOriginTracing().id;

		const shortLink = this.getUpToDateShortenedCopyLink(shortLinkData, originId);

		const requestCounter = this._urlShorteningRequestCounter;
		shortLink.then((shortenedCopyLink) => {
			if (!this._isMounted) {
				return;
			}
			const isRequestOutdated = requestCounter !== this._urlShorteningRequestCounter;
			if (isRequestOutdated) {
				return;
			}

			this.setState({ shortenedCopyLink });
		});
	}

	getFormShareLink = (): string => {
		const rawLink = this.getRawLink();
		// Check if origin tracing on share link is enabled
		if (fg('jira_client_side_error_handled_track_event')) {
			const originTracing = this.getFormShareOriginTracing();
			return memoizedFormatCopyLink(originTracing, rawLink);
		}
		// original share link is used if feature flag is disabled
		return rawLink;
	};

	render() {
		const {
			cloudId,
			orgId,
			isAutoOpenDialog,
			dialogPlacement,
			loadUserOptions,
			renderCustomTriggerButton,
			customTriggerButtonIcon,
			shareContentType,
			shareContentSubType,
			shareContentId,
			shareFormTitle,
			shareFormHelperMessage,
			shouldCloseOnEscapePress,
			showFlags,
			enableSmartUserPicker,
			loggedInAccountId,
			triggerButtonAppearance,
			triggerButtonIcon,
			triggerButtonStyle,
			triggerButtonTooltipText,
			triggerButtonTooltipPosition,
			bottomMessage,
			shareeAction,
			product,
			productAttributes,
			customHeader,
			customFooter,
			onTriggerButtonClick,
			onUserSelectionChange,
			shareFieldsFooter,
			isCopyDisabled,
			isPublicLink,
			integrationMode,
			shareIntegrations,
			additionalTabs,
			builtInTabContentWidth,
			shareAri,
			tabIndex,
			copyTooltipText,
			onDialogClose,
			isBrowseUsersDisabled,
			userPickerOptions,
			isSubmitShareDisabled,
			additionalUserFields,
			isExtendedShareDialogEnabled,
			CustomSubmitButton,
		} = this.props;
		const { config, isFetchingConfig } = this.state;

		return (
			<ErrorBoundary>
				<MessagesIntlProvider>
					<ShareDialogWithTrigger
						onTriggerButtonClick={onTriggerButtonClick}
						isAutoOpenDialog={isAutoOpenDialog}
						config={config}
						isFetchingConfig={isFetchingConfig}
						copyLink={this.getCopyLink()}
						analyticsDecorator={this.decorateAnalytics}
						dialogPlacement={dialogPlacement}
						loadUserOptions={loadUserOptions}
						onDialogOpen={this.handleDialogOpen}
						onShareSubmit={this.handleSubmitShare}
						renderCustomTriggerButton={renderCustomTriggerButton}
						customTriggerButtonIcon={customTriggerButtonIcon}
						shareContentType={shareContentType}
						shareContentSubType={shareContentSubType}
						shareContentId={shareContentId}
						shareFormTitle={shareFormTitle}
						shareFormHelperMessage={shareFormHelperMessage}
						copyLinkOrigin={this.getCopyLinkOriginTracing()}
						formShareOrigin={this.getFormShareOriginTracing()}
						shouldCloseOnEscapePress={shouldCloseOnEscapePress}
						showFlags={showFlags}
						enableSmartUserPicker={enableSmartUserPicker}
						loggedInAccountId={loggedInAccountId}
						cloudId={cloudId}
						orgId={orgId}
						triggerButtonAppearance={triggerButtonAppearance}
						triggerButtonIcon={triggerButtonIcon}
						triggerButtonStyle={triggerButtonStyle}
						triggerButtonTooltipPosition={triggerButtonTooltipPosition}
						triggerButtonTooltipText={triggerButtonTooltipText}
						bottomMessage={bottomMessage}
						submitButtonLabel={
							shareeAction === 'edit' && <FormattedMessage {...messages.inviteTriggerButtonText} />
						}
						product={product!}
						productAttributes={productAttributes}
						customHeader={customHeader}
						customFooter={customFooter}
						onUserSelectionChange={onUserSelectionChange}
						shareFieldsFooter={shareFieldsFooter}
						isCopyDisabled={isCopyDisabled}
						isPublicLink={isPublicLink}
						integrationMode={integrationMode}
						shareIntegrations={shareIntegrations}
						shareAri={shareAri}
						tabIndex={tabIndex}
						copyTooltipText={copyTooltipText}
						onDialogClose={onDialogClose}
						isBrowseUsersDisabled={isBrowseUsersDisabled}
						userPickerOptions={userPickerOptions}
						additionalTabs={additionalTabs}
						builtInTabContentWidth={builtInTabContentWidth}
						isSubmitShareDisabled={isSubmitShareDisabled}
						additionalUserFields={additionalUserFields}
						isExtendedShareDialogEnabled={isExtendedShareDialogEnabled}
						CustomSubmitButton={CustomSubmitButton}
					/>
				</MessagesIntlProvider>
			</ErrorBoundary>
		);
	}
}

export const ShareDialogContainer = withAnalyticsEvents()(ShareDialogContainerInternal);
