/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { B400, N800, N200 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import React from 'react';
import { type User } from '../types';
import { AvatarItemOption, textWrapper } from './AvatarItemOption';
import { HighlightText } from './HighlightText';
import { SizeableAvatar } from './SizeableAvatar';
import { hasValue } from './utils';
import { fg } from '@atlaskit/platform-feature-flags';

export type UserOptionProps = {
	user: User;
	status?: string;
	isSelected: boolean;
};

export class UserOption extends React.PureComponent<UserOptionProps> {
	getPrimaryText = () => {
		const {
			user: { name, publicName, highlight },
		} = this.props;

		const result = [
			<span
				key="name"
				// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				css={textWrapper(
					this.props.isSelected ? token('color.text.selected', B400) : token('color.text', N800),
				)}
			>
				<HighlightText highlights={highlight && highlight.name}>{name}</HighlightText>
			</span>,
		];
		if (hasValue(publicName) && name.trim() !== publicName.trim()) {
			result.push(
				<React.Fragment key="publicName">
					{' '}
					<span
						// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
						css={textWrapper(
							this.props.isSelected
								? token('color.text.selected', B400)
								: token('color.text.subtlest', N200),
						)}
					>
						(
						<HighlightText highlights={highlight && highlight.publicName}>
							{publicName}
						</HighlightText>
						)
					</span>
				</React.Fragment>,
			);
		}
		return result;
	};

	renderSecondaryText = () =>
		this.props.user.byline ? (
			<span
				// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				css={textWrapper(
					this.props.isSelected
						? token('color.text.selected', B400)
						: token('color.text.subtlest', N200),
				)}
			>
				{this.props.user.byline}
			</span>
		) : undefined;

	private renderAvatar = () => {
		const {
			user: { avatarUrl },
			status,
		} = this.props;

		return (
			<SizeableAvatar
				appearance={
					// eslint-disable-next-line @atlaskit/platform/ensure-feature-flag-prefix
					fg('platform-component-visual-refresh') ? 'medium' : 'big'
				}
				src={avatarUrl}
				presence={status}
			/>
		);
	};

	private getLozengeProps = () =>
		typeof this.props.user.lozenge === 'string'
			? {
					text: this.props.user.lozenge,
				}
			: this.props.user.lozenge;

	render() {
		return (
			<AvatarItemOption
				avatar={this.renderAvatar()}
				lozenge={this.getLozengeProps()}
				isDisabled={this.props.user.isDisabled}
				primaryText={this.getPrimaryText()}
				secondaryText={this.renderSecondaryText()}
			/>
		);
	}
}
