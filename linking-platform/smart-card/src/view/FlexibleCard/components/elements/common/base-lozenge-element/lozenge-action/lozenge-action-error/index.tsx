/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { Fragment, useCallback, useMemo } from 'react';

import { css, jsx } from '@compiled/react';
import { FormattedMessage } from 'react-intl-next';

import { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import ErrorIcon from '@atlaskit/icon/core/migration/status-error--error';
import { fg } from '@atlaskit/platform-feature-flags';
import { N800, R50, R500 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { useAnalyticsEvents } from '../../../../../../../../common/analytics/generated/use-analytics-events';
import { messages } from '../../../../../../../../messages';
import useInvokeClientAction from '../../../../../../../../state/hooks/use-invoke-client-action';
import { getFormattedMessage } from '../../../../../utils';

import type { LozengeActionErrorProps } from './types';

const MAX_LINE_NUMBER = 8;

const contentStyles = css({
	display: 'flex',
	gap: token('space.100'),
	font: token('font.body.large'),
	minWidth: 0,
	overflow: 'hidden',
	flexDirection: 'row',
	marginTop: token('space.025'),
	alignItems: 'flex-start',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'> span, > div': {
		font: token('font.body'),
		color: token('color.text', N800),
	},
});

const linkStyles = css({
	display: 'flex',
	gap: token('space.100'),
	minWidth: 0,
	overflow: 'hidden',
	flexDirection: 'row',
	alignItems: 'center',
	cursor: 'pointer',
	font: token('font.body'),
	marginTop: token('space.100'),
	marginLeft: token('space.400'),
	marginBottom: token('space.025'),
});

const textStylesBase = css({
	// lineHeight: '1rem',
	font: token('font.body.large'),
	whiteSpace: 'normal',
	display: '-webkit-box',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	wordBreak: 'break-word',
	WebkitBoxOrient: 'vertical',
});

const dropdownItemGroupStyles = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	button: {
		width: '220px',
		'&:hover': {
			backgroundColor: 'inherit',
			cursor: 'default',
		},
	},
});

const LozengeActionError = ({
	errorMessage,
	testId,
	maxLineNumber = MAX_LINE_NUMBER,
	invokePreviewAction,
}: LozengeActionErrorProps) => {
	const { fireEvent } = useAnalyticsEvents();
	const invoke = useInvokeClientAction({});

	const isPreviewAvailable = invokePreviewAction !== undefined;

	const handlePreviewOpen = useCallback(() => {
		if (isPreviewAvailable) {
			fireEvent('ui.button.clicked.smartLinkStatusOpenPreview', {});
			if (invokePreviewAction) {
				invoke(invokePreviewAction);
			}
		}
	}, [isPreviewAvailable, invoke, invokePreviewAction, fireEvent]);

	const dynamicCss = css({
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values
		WebkitLineClamp: maxLineNumber,
		'@supports not (-webkit-line-clamp: 1)': {
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
			maxHeight: `calc(${maxLineNumber} * 1rem)`,
		},
	});

	const content = useMemo(() => {
		return (
			<Fragment>
				<div css={contentStyles}>
					<ErrorIcon
						testId={`${testId}-icon`}
						LEGACY_size="medium"
						color={token('color.icon.danger', R500)}
						LEGACY_secondaryColor={token('color.background.danger', R50)}
						label={'error'}
						spacing="spacious"
					/>
					{/* eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage */}
					<span css={[textStylesBase, dynamicCss]} data-testid={`${testId}-error-message`}>
						{typeof errorMessage === 'string' ? errorMessage : getFormattedMessage(errorMessage)}
					</span>
				</div>
				{isPreviewAvailable ? (
					<div css={linkStyles}>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlaskit/design-system/no-html-anchor */}
						<a target="_blank" data-testid={`${testId}-open-embed`} onClick={handlePreviewOpen}>
							{fg('confluence-issue-terminology-refresh') ? (
								<FormattedMessage {...messages.open_issue_in_jiraIssueTermRefresh} />
							) : (
								<FormattedMessage {...messages.open_issue_in_jira} />
							)}
						</a>
					</div>
				) : null}
			</Fragment>
		);
	}, [errorMessage, handlePreviewOpen, isPreviewAvailable, testId, dynamicCss]);

	return (
		<span css={dropdownItemGroupStyles} data-testid={`${testId}-error-item-group`}>
			<DropdownItemGroup>
				<DropdownItem testId={`${testId}-error`}>{content}</DropdownItem>
			</DropdownItemGroup>
		</span>
	);
};

export default LozengeActionError;
