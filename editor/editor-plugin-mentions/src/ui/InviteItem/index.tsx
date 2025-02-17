/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import type { MouseEvent, SyntheticEvent } from 'react';
import React, { useCallback, useEffect } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import type { WrappedComponentProps } from 'react-intl-next';
import { FormattedMessage, injectIntl } from 'react-intl-next';

import { mentionMessages as messages } from '@atlaskit/editor-common/messages';
import AddIcon from '@atlaskit/icon/glyph/add';
import type { UserRole } from '@atlaskit/mention';
import type { MentionDescription } from '@atlaskit/mention/resource';
import { N300 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import {
	avatarStyle,
	capitalizedStyle,
	mentionItemSelectedStyle,
	mentionItemStyle,
	nameSectionStyle,
	rowStyle,
} from './styles';

interface OnMentionEvent {
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(mention: MentionDescription, event?: SyntheticEvent<any>): void;
}

export const INVITE_ITEM_DESCRIPTION = { id: 'invite-teammate' };

// Ignored via go/ees005
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const leftClick = (event: MouseEvent<any>): boolean => {
	return event.button === 0 && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
};

interface Props {
	productName?: string;
	onMount?: () => void;
	onMouseEnter?: OnMentionEvent;
	onSelection?: OnMentionEvent;
	selected?: boolean;
	userRole?: UserRole;
}

const InviteItem = ({
	productName,
	onMount,
	onMouseEnter,
	onSelection,
	selected,
	userRole,
	intl,
}: Props & WrappedComponentProps) => {
	const onSelected = useCallback(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(event: React.MouseEvent<any>) => {
			if (leftClick(event) && onSelection) {
				event.preventDefault();
				onSelection(INVITE_ITEM_DESCRIPTION, event);
			}
		},
		[onSelection],
	);

	const onItemMouseEnter = useCallback(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(event: React.MouseEvent<any>) => {
			if (onMouseEnter) {
				onMouseEnter(INVITE_ITEM_DESCRIPTION, event);
			}
		},
		[onMouseEnter],
	);

	useEffect(() => {
		if (onMount) {
			onMount();
		}
	}, [onMount]);

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
			css={[mentionItemStyle, selected && mentionItemSelectedStyle]}
			onMouseDown={onSelected}
			onMouseEnter={onItemMouseEnter}
			data-id={INVITE_ITEM_DESCRIPTION.id}
		>
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
			<div css={rowStyle}>
				{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
				<span css={avatarStyle}>
					<AddIcon
						label={intl.formatMessage(messages.mentionsAddLabel)}
						primaryColor={token('color.icon.subtle', N300)}
					/>
				</span>
				{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
				<div css={nameSectionStyle} data-testid="name-section">
					<FormattedMessage
						// Ignored via go/ees005
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...messages.inviteItemTitle}
						values={{
							userRole: userRole || 'basic',
							productName: (
								// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
								<span css={capitalizedStyle} data-testid="capitalized-message">
									{productName}
								</span>
							),
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default injectIntl(InviteItem);
