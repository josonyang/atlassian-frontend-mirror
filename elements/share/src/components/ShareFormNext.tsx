import React from 'react';

import { FormattedMessage, injectIntl, type WrappedComponentProps } from 'react-intl-next';

import { AnalyticsContext } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button/new';
import { cssMap, cx } from '@atlaskit/css';
import Form, { RequiredAsterisk } from '@atlaskit/form';
import EmailIcon from '@atlaskit/icon/core/migration/email';
import ErrorIcon from '@atlaskit/icon/core/migration/status-error--error';
import { MenuGroup } from '@atlaskit/menu';
import { Box } from '@atlaskit/primitives/compiled';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import { N300, R400 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import Tooltip from '@atlaskit/tooltip';

import { messages } from '../i18n';
import {
	type FormChildrenArgs,
	type MenuType,
	type ShareData,
	type ShareFormProps,
	TabType,
} from '../types';

import { ANALYTICS_SOURCE, INTEGRATION_MODAL_SOURCE } from './analytics/analytics';
import { CommentField } from './CommentField';
import CopyLinkButton from './CopyLinkButton';
import { IntegrationForm } from './IntegrationForm';
import { ShareHeader } from './ShareHeader';
import { ShareMenuItem } from './ShareMenuItem';
import { UserPickerField } from './UserPickerField';

const styles = cssMap({
	submitButtonWrapperStyles: {
		display: 'flex',
		marginLeft: 'auto',
	},
	centerAlignedIconWrapperStyles: {
		display: 'flex',
		alignSelf: 'center',
		paddingBlock: token('space.0'),
		paddingInline: token('space.150'),
	},
	formWrapperStyles: {
		marginTop: token('space.100', '8px'),
		width: '100%',
	},
	formFooterStyles: {
		display: 'flex',
		justifyContent: 'flex-start',
	},
	formFieldStyles: {
		marginBottom: token('space.150', '12px'),
	},
	integrationWrapperStyles: {
		display: 'flex',
		alignItems: 'center',
	},
	integrationIconWrapperStyles: {
		marginBottom: token('space.negative.075', '-6px'),
		marginRight: token('space.050', '4px'),
	},
	requiredFieldInfoStyles: {
		marginBottom: token('space.200', '16px'),
		color: token('color.text.subtle', N300),
		font: token('font.body.small'),
	},
	menuGroupContainerStyles: {
		color: token('color.text'),
		borderRadius: token('radius.small'),
		alignItems: 'flex-start',
		width: '150px',
		marginBlock: token('space.negative.100'),
		marginInline: token('space.negative.300'),
	},
});

const integrationTabText = (integrationName: string) => (
	<FormattedMessage {...messages.shareInIntegrationButtonText} values={{ integrationName }} />
);

export type State = {
	selectedMenuItem: MenuType;
	selectedTab: TabType;
};

export type InternalFormProps = FormChildrenArgs<ShareData> &
	ShareFormProps &
	WrappedComponentProps;

// eslint-disable-next-line @repo/internal/react/no-class-components
class InternalForm extends React.PureComponent<InternalFormProps> {
	static defaultProps = {
		onSubmit: () => {},
	};

	state: State = {
		selectedTab: TabType.default,
		selectedMenuItem: 'none',
	};

	componentWillUnmount() {
		const { onDismiss, getValues } = this.props;
		if (onDismiss) {
			onDismiss(getValues());
		}
	}

	renderShareForm = () => {
		const {
			formProps,
			title,
			showTitle = true,
			loadOptions,
			onLinkCopy,
			copyLink,
			defaultValue,
			config,
			isFetchingConfig,
			product,
			onUserInputChange,
			enableSmartUserPicker,
			loggedInAccountId,
			cloudId,
			onUserSelectionChange,
			fieldsFooter,
			selectPortalRef,
			isDisabled,
			isPublicLink,
			copyTooltipText,
			helperMessage,
			orgId,
			isBrowseUsersDisabled,
			intl: { formatMessage },
			shareError,
			userPickerOptions,
			productAttributes,
		} = this.props;

		return (
			<AnalyticsContext data={{ source: ANALYTICS_SOURCE }}>
				<form {...formProps}>
					{showTitle && <ShareHeader title={title} />}
					<Box xcss={cx(styles.requiredFieldInfoStyles)}>
						<FormattedMessage {...messages.requiredFieldSummary} />
						<RequiredAsterisk />
					</Box>
					<Box xcss={cx(styles.formFieldStyles)}>
						<UserPickerField
							onInputChange={onUserInputChange}
							onChange={onUserSelectionChange}
							loadOptions={loadOptions}
							defaultValue={defaultValue && defaultValue.users}
							config={config}
							isLoading={isFetchingConfig}
							product={product || 'confluence'}
							enableSmartUserPicker={enableSmartUserPicker}
							loggedInAccountId={loggedInAccountId}
							cloudId={cloudId}
							selectPortalRef={selectPortalRef}
							isPublicLink={isPublicLink}
							helperMessage={helperMessage}
							orgId={orgId}
							isBrowseUsersDisabled={isBrowseUsersDisabled}
							shareError={shareError}
							userPickerOptions={userPickerOptions}
							productAttributes={productAttributes}
						/>
					</Box>
					<Box xcss={cx(styles.formFieldStyles)}>
						<CommentField defaultValue={defaultValue && defaultValue.comment} />
					</Box>
					{fieldsFooter}
					<Box xcss={cx(styles.formFooterStyles)} testId="form-footer">
						<CopyLinkButton
							isDisabled={isDisabled}
							onLinkCopy={onLinkCopy}
							link={copyLink}
							copyTooltipText={copyTooltipText}
							copyLinkButtonText={formatMessage(
								isPublicLink ? messages.copyPublicLinkButtonText : messages.copyLinkButtonText,
							)}
							copiedToClipboardText={formatMessage(messages.copiedToClipboardMessage)}
						/>
						{this.renderSubmitButton()}
					</Box>
				</form>
			</AnalyticsContext>
		);
	};

	renderSubmitButton = () => {
		const {
			intl: { formatMessage },
			isSharing,
			shareError,
			submitButtonLabel,
			isDisabled,
			isPublicLink,
			integrationMode,
			isSubmitShareDisabled,
		} = this.props;
		const isRetryableError = !!shareError?.retryable;
		const isNonRetryableError = shareError && !shareError.retryable;
		const shouldShowWarning = isRetryableError && !isSharing;

		const buttonAppearance = !shouldShowWarning ? 'primary' : 'warning';
		const tabMode = integrationMode === 'tabs';
		const formPublicLabel = tabMode ? messages.formSharePublic : messages.formSendPublic;
		const formSendLabel = messages.formShare;
		const sendLabel = isPublicLink ? formPublicLabel : formSendLabel;
		const buttonLabel = isRetryableError ? messages.formRetry : sendLabel;
		const buttonDisabled = isDisabled || isNonRetryableError || isSubmitShareDisabled;
		const ButtonLabelWrapper = buttonAppearance === 'warning' ? 'strong' : React.Fragment;

		return (
			<Box xcss={cx(styles.submitButtonWrapperStyles)}>
				<Box xcss={cx(styles.centerAlignedIconWrapperStyles)}>
					{shouldShowWarning && (
						<Tooltip
							content={<FormattedMessage {...messages.shareFailureMessage} />}
							position="top"
						>
							<ErrorIcon
								spacing="spacious"
								label={formatMessage(messages.shareFailureIconLabel)}
								color={token('color.icon.danger', R400)}
							/>
						</Tooltip>
					)}
				</Box>
				<Button
					appearance={buttonAppearance}
					type="submit"
					isLoading={isSharing}
					isDisabled={buttonDisabled}
				>
					<ButtonLabelWrapper>
						{submitButtonLabel || <FormattedMessage {...buttonLabel} />}
					</ButtonLabelWrapper>
				</Button>
			</Box>
		);
	};

	renderMainTabTitle = () => {
		const { title, product } = this.props;

		if (title) {
			return title;
		}

		if (!product) {
			return <FormattedMessage {...messages.formTitle} />;
		}

		const productShareType =
			product === 'jira'
				? { ...messages.shareMainTabTextJira }
				: { ...messages.shareMainTabTextConfluence };

		return <FormattedMessage {...productShareType} />;
	};

	changeTab = (tab: TabType) => {
		this.setState({ selectedTab: tab });
		this.props.onTabChange?.(tab);
	};

	changeMenuItem = (menuItem: MenuType) => {
		this.setState({ selectedMenuItem: menuItem });
		this.props.onMenuItemChange?.(menuItem);
	};

	render() {
		const {
			integrationMode = 'off',
			shareIntegrations,
			additionalTabs,
			builtInTabContentWidth,
			handleCloseDialog,
		} = this.props;

		const { selectedMenuItem } = this.state;

		const hasShareIntegrations = shareIntegrations && shareIntegrations.length;
		const hasAdditionalTabs = additionalTabs && additionalTabs.length;

		if (integrationMode === 'off' || (!hasShareIntegrations && !hasAdditionalTabs)) {
			return this.renderShareForm();
		}

		if (selectedMenuItem === 'default') {
			return this.renderShareForm();
		}

		if (hasShareIntegrations) {
			const firstIntegration = shareIntegrations[0];

			if (selectedMenuItem === 'Slack') {
				return (
					<IntegrationForm
						Content={firstIntegration.Content}
						onIntegrationClose={() => handleCloseDialog?.()}
					/>
				);
			}

			if (integrationMode === 'menu') {
				return (
					<Box
						xcss={cx(styles.menuGroupContainerStyles)}
						backgroundColor="elevation.surface.overlay"
					>
						<MenuGroup>
							<ShareMenuItem
								iconName={<firstIntegration.Icon />}
								labelId={messages.slackMenuItemText}
								onClickHandler={() => this.changeMenuItem('Slack')}
							/>
							<ShareMenuItem
								iconName={
									<EmailIcon
										color="currentColor"
										label=""
										LEGACY_size="medium"
										spacing="spacious"
									/>
								}
								labelId={messages.emailMenuItemText}
								onClickHandler={() => this.changeMenuItem('default')}
							/>
						</MenuGroup>
					</Box>
				);
			}
		}

		if (integrationMode === 'tabs') {
			const DEFAULT_TAB_CONTENT_WIDTH = 304;

			return (
				<Tabs
					id="ShareForm-Tabs-Integrations"
					onChange={this.changeTab}
					selected={this.state.selectedTab}
				>
					<TabList>
						<Tab key={`share-tab-default`}>{this.renderMainTabTitle()}</Tab>
						{shareIntegrations?.map((integration) => (
							<Tab key={`share-tab-${integration.type}`}>
								<Box xcss={cx(styles.integrationWrapperStyles)}>
									<Box as="span" xcss={cx(styles.integrationIconWrapperStyles)}>
										<integration.Icon />
									</Box>
									{integrationTabText(integration.type)}
								</Box>
							</Tab>
						))}
						{additionalTabs?.map((tab) => (
							<Tab key={`share-tab-${tab.label}`}>{tab.label}</Tab>
						))}
					</TabList>
					<TabPanel key={`share-tabPanel-default`}>
						<Box xcss={cx(styles.formWrapperStyles)}>
							<div style={{ width: `${builtInTabContentWidth || DEFAULT_TAB_CONTENT_WIDTH}px` }}>
								{this.renderShareForm()}
							</div>
						</Box>
					</TabPanel>
					{shareIntegrations?.map((integration) => (
						<TabPanel key={`share-tabPanel-integration`}>
							<AnalyticsContext data={{ source: INTEGRATION_MODAL_SOURCE }}>
								<Box xcss={cx(styles.formWrapperStyles)}>
									<div
										style={{ width: `${builtInTabContentWidth || DEFAULT_TAB_CONTENT_WIDTH}px` }}
									>
										<IntegrationForm
											Content={integration.Content}
											onIntegrationClose={() => handleCloseDialog?.()}
											changeTab={this.changeTab}
										/>
									</div>
								</Box>
							</AnalyticsContext>
						</TabPanel>
					))}
					{additionalTabs?.map((tab) => (
						<TabPanel key={`share-tabPanel-${tab.label}`}>
							<Box xcss={cx(styles.formWrapperStyles)}>
								<IntegrationForm
									Content={tab.Content}
									onIntegrationClose={() => handleCloseDialog?.()}
									changeTab={this.changeTab}
								/>
							</Box>
						</TabPanel>
					))}
				</Tabs>
			);
		}

		return this.renderShareForm();
	}
}

const InternalFormWithIntl = injectIntl(InternalForm);

export const ShareForm: React.FC<ShareFormProps> = (props) => (
	<Form<ShareData> onSubmit={props.onSubmit!}>
		{({ formProps, getValues }) => (
			<InternalFormWithIntl {...props} formProps={formProps} getValues={getValues} />
		)}
	</Form>
);

ShareForm.defaultProps = {
	isSharing: false,
	product: 'confluence',
	onSubmit: () => {},
};
