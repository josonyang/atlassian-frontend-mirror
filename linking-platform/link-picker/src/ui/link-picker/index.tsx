/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import {
	type ChangeEvent,
	type FormEvent,
	Fragment,
	type KeyboardEvent,
	memo,
	useCallback,
	useLayoutEffect,
	useMemo,
	useReducer,
} from 'react';

import { css, jsx } from '@compiled/react';
import { FormattedMessage, useIntl } from 'react-intl-next';
import uuid from 'uuid';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { cssMap } from '@atlaskit/css';
import { HelperMessage } from '@atlaskit/form';
import { CardClient } from '@atlaskit/link-provider';
import { isSafeUrl, normalizeUrl } from '@atlaskit/linking-common/url';
import { browser } from '@atlaskit/linking-common/user-agent';
import { fg } from '@atlaskit/platform-feature-flags';
import { Box } from '@atlaskit/primitives/compiled';
import LinkUrl from '@atlaskit/smart-card/link-url';
import { N700 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import VisuallyHidden from '@atlaskit/visually-hidden';

import {
	useLinkPickerAnalytics,
	withInputFieldTracking,
	withLinkPickerAnalyticsContext,
} from '../../common/analytics';
import { ANALYTICS_CHANNEL } from '../../common/constants';
import type {
	LinkInputType,
	LinkPickerProps,
	LinkSearchListItemData,
	PickerState,
} from '../../common/types';
import createEventPayload from '../../common/utils/analytics/analytics.codegen';
import { handleNavKeyDown } from '../../common/utils/handleNavKeyDown';
import { usePlugins } from '../../services/use-plugins';
import { useSearchQuery } from '../../services/use-search-query';

import { Announcer } from './announcer';
import { FormFooter, testIds as formFooterTestIds } from './form-footer';
import { LinkPickerSubmitButton } from './form-footer/link-picker-submit-button';
import { formMessages, linkMessages, linkTextMessages, searchMessages } from './messages';
import { SearchResults, testIds as searchTestIds } from './search-results';
import { testIds as textFieldTestIds, TextInput } from './text-input';
import { TrackMount } from './track-mount';
import { getDataSource, getScreenReaderText } from './utils';

const styles = cssMap({
	fullWidthSubmitButton: {
		marginTop: token('space.200'),
		display: 'flex',
		flexDirection: 'column',
	},
	linkDisplayHelperTextContainer: {
		marginTop: token('space.050'),
		color: token('color.text.subtlest', N700),
	},
	linkDisplayHelperText: {
		font: token('font.body.small'),
	},
});

const baseRootContainerStyles = css({
	paddingLeft: 'var(--link-picker-padding-left)',
	paddingRight: 'var(--link-picker-padding-right)',
	paddingTop: 'var(--link-picker-padding-top)',
	paddingBottom: 'var(--link-picker-padding-bottom)',
	boxSizing: 'border-box',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-important-styles
	display: 'block !important',
});

const formFooterMargin = css({
	marginTop: token('space.200', '16px'),
});

export const testIds = {
	linkPickerRoot: 'link-picker-root',
	linkPicker: 'link-picker',
	urlInputField: 'link-url',
	textInputField: 'link-text',
	linkHelperText: 'link-helper-text',
	...searchTestIds,
	...formFooterTestIds,
	...textFieldTestIds,
} as const;

const initState: PickerState = {
	url: '',
	displayText: '',
	activeIndex: -1,
	selectedIndex: -1,
	invalidUrl: false,
	activeTab: 0,
	preventHidingRecents: false,
	hasPreview: true,
};

function reducer(state: PickerState, payload: Partial<PickerState>): PickerState {
	if (payload.url && state.url !== payload.url) {
		return {
			...state,
			invalidUrl: false,
			hasPreview: true,
			selectedIndex: isSafeUrl(payload.url) && payload.url.length ? -1 : state.selectedIndex,
			...payload,
		};
	}

	return { ...state, ...payload };
}

/**
 * Bind input fields to analytics tracking
 */
const getLinkFieldContent = (value: string) => {
	if (!Boolean(value)) {
		return null;
	}
	return isSafeUrl(value) ? 'url' : 'text_string';
};

const LinkInputField = withInputFieldTracking(TextInput, 'link', (event, attributes) => ({
	...attributes,
	linkFieldContent: getLinkFieldContent(event.currentTarget.value),
}));

const DisplayTextInputField = withInputFieldTracking(TextInput, 'displayText');

const client = new CardClient();

export const LinkPicker = withLinkPickerAnalyticsContext(
	memo(
		({
			onSubmit,
			onCancel,
			onContentResize,
			plugins,
			isLoadingPlugins,
			url: initUrl,
			displayText: initDisplayText,
			hideDisplayText,
			featureFlags,
			customMessages,
			isSubmitting = false,
			adaptiveHeight = false,
			moveSubmitButton = false,
			inputRef,
			previewableLinksOnly = false,
			additionalError,
		}: LinkPickerProps) => {
			const { createAnalyticsEvent } = useAnalyticsEvents();

			const [state, dispatch] = useReducer(reducer, {
				...initState,
				url: normalizeUrl(initUrl) || '',
				displayText: initDisplayText || '',
			});

			const { activeIndex, selectedIndex, url, displayText, invalidUrl, activeTab, hasPreview } =
				state;

			const intl = useIntl();
			const queryState = useSearchQuery(state);

			const {
				items,
				isLoading: isLoadingResults,
				isActivePlugin,
				activePlugin,
				tabs,
				error,
				retry,
				pluginAction,
			} = usePlugins(queryState, activeTab, plugins);

			const isEditing = !!initUrl;
			const selectedItem: LinkSearchListItemData | undefined = items?.[selectedIndex];
			const isSelectedItem = selectedItem?.url === url;
			const previewableOnly =
				fg('platform-linking-link-picker-previewable-only') && previewableLinksOnly;

			const { trackAttribute, getAttributes } = useLinkPickerAnalytics();

			const submitMessageId = useMemo(() => uuid(), []);

			useLayoutEffect(() => {
				if (onContentResize) {
					onContentResize();
				}
			}, [onContentResize, items, isLoadingResults, isActivePlugin, tabs]);

			const handleChangeUrl = useCallback(
				(e: ChangeEvent<HTMLInputElement>) => {
					if (isSubmitting) {
						// Prevent changing url while submitting
						return;
					}

					/** Any on change event is triggered by manual input or paste, so source is null */
					trackAttribute('linkFieldContentInputSource', null);
					dispatch({
						url: e.currentTarget.value,
						// If the last action was changing tabs, make sure we're now allowing recents to be hidden
						preventHidingRecents: false,
					});
				},
				[dispatch, trackAttribute, isSubmitting],
			);

			const handleChangeText = useCallback(
				(e: ChangeEvent<HTMLInputElement>) => {
					dispatch({
						displayText: e.currentTarget.value,
					});
				},
				[dispatch],
			);

			const handleClear = useCallback(
				(field: string) => {
					dispatch({
						activeIndex: -1,
						selectedIndex: -1,
						[field]: '',
						hasPreview: true,
					});
				},
				[dispatch],
			);

			const handleUrlClear = useCallback(() => {
				if (isSubmitting) {
					// Prevent clearing url while submitting
					return;
				}
				trackAttribute('linkFieldContentInputSource', null);
				handleClear('url');
			}, [trackAttribute, handleClear, isSubmitting]);

			const handleInsert = useCallback(
				(
					url: string,
					title: string | null,
					inputType: LinkInputType,
					data?: Record<string, unknown>,
				) => {
					const event = createAnalyticsEvent(
						createEventPayload('ui.form.submitted.linkPicker', {}),
					);

					// Clone the event so that it can be emitted for consumer usage
					// This must happen BEFORE the original event is fired!
					const consumerEvent = event.clone();
					// Cloned event doesnt have the attributes that are added by
					// the analytics listener in the LinkPickerAnalyticsContext, add them here
					consumerEvent?.update({ attributes: getAttributes() });
					// Dispatch the original event to our channel
					event.fire(ANALYTICS_CHANNEL);

					onSubmit(
						{
							url,
							displayText: displayText || null,
							title: title || null,
							meta: { inputMethod: inputType },
							data,
							...(inputType === 'manual' ? { rawUrl: state.url } : {}),
						},
						consumerEvent,
					);
				},
				[displayText, onSubmit, state.url, createAnalyticsEvent, getAttributes],
			);

			const handleSelected = useCallback(
				(objectId: string) => {
					if (isSubmitting) {
						// Prevent changing selection while submitting
						return;
					}

					const selectedItem = items?.find((item) => item.objectId === objectId);

					if (selectedItem) {
						const { url, name } = selectedItem;
						/**
						 * Manually track that the url has been updated using searchResult method
						 */
						dispatchEvent(new Event('submit'));
						trackAttribute('linkFieldContent', getLinkFieldContent(url));
						trackAttribute('linkFieldContentInputMethod', 'searchResult');
						trackAttribute(
							'linkFieldContentInputSource',
							getDataSource(selectedItem, activePlugin),
						);
						handleInsert(url, name, 'typeAhead', { ...selectedItem });
					}
				},
				[handleInsert, trackAttribute, items, activePlugin, isSubmitting],
			);

			const handleSubmit = useCallback(
				async (event?: FormEvent<HTMLFormElement>): Promise<void> => {
					event?.preventDefault();
					if (isSubmitting) {
						// Prevent submit while submitting
						return;
					}
					if (isSelectedItem && selectedItem) {
						return handleInsert(selectedItem.url, selectedItem.name, 'typeAhead');
					}

					const normalized = normalizeUrl(url);
					if (normalized) {
						if (previewableOnly) {
							try {
								const urlResponse = await client.fetchData(normalized);
								const responseObject = urlResponse?.data;
								if (responseObject && 'preview' in responseObject) {
									return handleInsert(normalized, null, 'manual');
								} else {
									return dispatch({
										invalidUrl: true,
										hasPreview: false,
									});
								}
							} catch (error) {
								return dispatch({
									invalidUrl: true,
								});
							}
						} else {
							return handleInsert(normalized, null, 'manual');
						}
					}
					return dispatch({
						invalidUrl: true,
					});
				},
				[dispatch, handleInsert, isSelectedItem, selectedItem, url, isSubmitting, previewableOnly],
			);

			const handleTabChange = useCallback(
				(activeTab: number) => {
					dispatch({
						// We don't want any selection to exist after changing tab, as the selection
						// wouldn't mean anything.
						activeIndex: -1,
						selectedIndex: -1,

						// We don't want recents to be hidden, even though we don't have a selection
						preventHidingRecents: true,
						invalidUrl: false,
						hasPreview: true,
						activeTab,
					});
					trackAttribute('tab', plugins?.[activeTab]?.tabKey ?? null);
				},
				[dispatch, plugins, trackAttribute],
			);

			const handleSearchListOnChange = (id: string) => {
				if (isSubmitting) {
					// Prevent changing item while submitting
					return;
				}
				const index = items?.findIndex((item) => item.objectId === id);
				if (typeof index === 'number') {
					const item = items?.[index];
					if (item) {
						/**
						 * Manually track that the url has been updated using searchResult method
						 */
						trackAttribute('linkFieldContent', getLinkFieldContent(item.url));
						trackAttribute('linkFieldContentInputMethod', 'searchResult');
						trackAttribute('linkFieldContentInputSource', getDataSource(item, activePlugin));
						dispatch({
							activeIndex: index,
							selectedIndex: index,
							url: item.url,
							invalidUrl: false,
							hasPreview: true,
						});
					}
				}
			};

			const handleKeyDown = useCallback(
				(event: KeyboardEvent<HTMLElement>) => {
					if (!items?.length) {
						return;
					}

					let updatedIndex = activeIndex;
					if (event.key === 'Enter') {
						event.preventDefault();
						if (selectedItem) {
							handleSelected(selectedItem.objectId);
						} else {
							// triggers validation error message
							handleSubmit();
						}
					} else {
						updatedIndex = handleNavKeyDown(event, items.length, activeIndex);
					}

					const item = items[updatedIndex];

					if (['Enter', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) && item) {
						/**
						 * Manually track that the url has been updated using searchResult method
						 */
						trackAttribute('linkFieldContent', getLinkFieldContent(item.url));
						trackAttribute('linkFieldContentInputMethod', 'searchResult');
						trackAttribute('linkFieldContentInputSource', getDataSource(item, activePlugin));
						dispatch({
							activeIndex: updatedIndex,
							selectedIndex: updatedIndex,
							url: item.url,
							invalidUrl: false,
							hasPreview: true,
						});
					}
				},
				[
					items,
					activeIndex,
					selectedItem,
					handleSelected,
					handleSubmit,
					trackAttribute,
					activePlugin,
				],
			);

			const messages = isActivePlugin ? searchMessages : linkMessages;

			const screenReaderDescriptionId = 'search-recent-links-field-description';
			const linkSearchListId = 'link-picker-search-list';
			const ariaActiveDescendant =
				selectedIndex > -1 ? `link-search-list-item-${selectedIndex}` : '';

			const a11yList =
				isActivePlugin || isLoadingPlugins
					? ({
							role: 'combobox',
							// When a combobox popup is not visible, the element with role combobox has aria-expanded set to false
							// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded#combobox
							'aria-expanded': !!items?.length,
							'aria-autocomplete': 'list',
							'aria-controls': linkSearchListId,
							'aria-activedescendant': ariaActiveDescendant,
							'aria-describedby': screenReaderDescriptionId,
						} as const)
					: undefined;

			// Added workaround with a screen reader Announcer specifically for VoiceOver + Safari
			// as the Aria design pattern for combobox does not work in this case
			// for details: https://a11y-internal.atlassian.net/browse/AK-740
			const screenReaderText =
				browser().safari && getScreenReaderText(items ?? [], selectedIndex, intl);
			const customSubmitButtonLabel = customMessages?.submitButtonLabel
				? customMessages.submitButtonLabel
				: undefined;

			const additionalErrorMessage =
				fg('platform-linking-link-picker-previewable-only') && additionalError;
			const errorMessage = invalidUrl ? (
				previewableOnly && !hasPreview ? (
					<FormattedMessage
						{...formMessages.noEmbedAvailable}
						values={{
							a: (chunk) => (
								<LinkUrl
									target="_blank"
									href="https://support.atlassian.com/platform-experiences/docs/smart-links-from-jira-and-other-products/"
								>
									{chunk}
								</LinkUrl>
							),
						}}
					/>
				) : (
					intl.formatMessage(formMessages.linkInvalid)
				)
			) : null;

			return (
				<form
					data-testid={testIds.linkPicker}
					css={[baseRootContainerStyles]}
					// Use onSubmitCapture instead of onSubmit so that any possible parent form isn't submitted
					onSubmitCapture={handleSubmit}
				>
					<TrackMount />
					{isActivePlugin && (
						<Fragment>
							{screenReaderText && (
								<Announcer
									ariaLive="assertive"
									text={screenReaderText}
									ariaRelevant="additions"
									delay={250}
								/>
							)}
							<VisuallyHidden id={screenReaderDescriptionId}>
								{customMessages?.linkAriaLabel ? (
									<FormattedMessage {...customMessages.linkAriaLabel} />
								) : (
									<FormattedMessage {...messages.linkAriaLabel} />
								)}
							</VisuallyHidden>
						</Fragment>
					)}
					<LinkInputField
						name="url"
						autoComplete="off"
						testId={testIds.urlInputField}
						label={
							customMessages?.linkLabel
								? intl.formatMessage(customMessages.linkLabel)
								: intl.formatMessage(messages.linkLabel)
						}
						placeholder={
							customMessages?.linkPlaceholder
								? intl.formatMessage(customMessages?.linkPlaceholder)
								: intl.formatMessage(messages.linkPlaceholder)
						}
						value={url}
						autoFocus
						clearLabel={intl.formatMessage(formMessages.clearLink)}
						error={errorMessage || additionalErrorMessage}
						spotlightTargetName="link-picker-search-field-spotlight-target"
						aria-readonly={isSubmitting}
						{...a11yList}
						onClear={handleUrlClear}
						onKeyDown={handleKeyDown}
						onChange={handleChangeUrl}
						inputRef={inputRef}
					/>
					{!hideDisplayText && (
						<Fragment>
							<DisplayTextInputField
								autoComplete="off"
								name="displayText"
								testId={testIds.textInputField}
								value={displayText}
								label={
									customMessages?.linkTextLabel
										? intl.formatMessage(customMessages.linkTextLabel)
										: intl.formatMessage(linkTextMessages.linkTextLabel)
								}
								placeholder={
									customMessages?.linkTextPlaceholder
										? intl.formatMessage(customMessages?.linkTextPlaceholder)
										: intl.formatMessage(linkTextMessages.linkTextPlaceholder)
								}
								clearLabel={intl.formatMessage(linkTextMessages.clearLinkText)}
								readOnly={isSubmitting}
								onClear={handleClear}
								onChange={handleChangeText}
							/>
							<HelperMessage testId={testIds.linkHelperText}>
								{customMessages?.linkHelperTextLabel
									? intl.formatMessage(customMessages?.linkHelperTextLabel)
									: intl.formatMessage(linkTextMessages.linkHelperTextLabel)}
							</HelperMessage>
						</Fragment>
					)}
					{moveSubmitButton && (
						<Box xcss={styles.fullWidthSubmitButton}>
							<LinkPickerSubmitButton
								isEditing={isEditing}
								isLoading={isLoadingResults || !!isLoadingPlugins}
								isSubmitting={isSubmitting}
								customSubmitButtonLabel={customSubmitButtonLabel}
								error={error}
								items={items}
								queryState={queryState}
								submitMessageId={submitMessageId}
								testId={testIds.insertButton}
								url={url}
							/>
						</Box>
					)}
					{!!queryState && (isLoadingPlugins || isActivePlugin) && (
						<SearchResults
							activeTab={activeTab}
							tabs={tabs}
							activePlugin={activePlugin}
							isLoadingResults={isLoadingResults}
							isLoadingPlugins={isLoadingPlugins}
							isSubmitting={isSubmitting}
							linkSearchListId={linkSearchListId}
							error={error}
							featureFlags={featureFlags}
							activeIndex={activeIndex}
							selectedIndex={selectedIndex}
							items={items}
							queryState={queryState}
							handleKeyDown={handleKeyDown}
							handleSelected={handleSelected}
							handleTabChange={handleTabChange}
							handleSearchListOnChange={handleSearchListOnChange}
							adaptiveHeight={adaptiveHeight}
							retry={retry}
						/>
					)}
					<FormFooter
						error={error}
						items={items}
						/** If the results section appears to be loading, impact whether the submit button is disabled */
						isLoading={isLoadingResults || !!isLoadingPlugins}
						isSubmitting={isSubmitting}
						queryState={queryState}
						url={url}
						isEditing={isEditing}
						onCancel={onCancel}
						action={pluginAction}
						css={(!queryState || !plugins?.length) && formFooterMargin}
						customSubmitButtonLabel={customSubmitButtonLabel}
						submitMessageId={submitMessageId}
						hideSubmitButton={moveSubmitButton}
					/>
				</form>
			);
		},
	),
);
