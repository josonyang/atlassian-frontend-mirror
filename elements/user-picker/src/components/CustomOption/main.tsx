/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { B400, N800, N200 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import React from 'react';
import { type Custom } from '../../types';
import { AvatarItemOption, textWrapper } from '../AvatarItemOption';
import { HighlightText } from '../HighlightText';
import { SizeableAvatar } from '../SizeableAvatar';

export type CustomOptionProps = {
	data: Custom;
	isSelected: boolean;
};

export class CustomOption extends React.PureComponent<CustomOptionProps> {
	private getPrimaryText = () => {
		const {
			data: { name, highlight },
		} = this.props;

		return [
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
	};

	private getBylineComponent = (isSelected: boolean, message: string) => (
		<span
			// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
			css={textWrapper(
				isSelected ? token('color.text.selected', B400) : token('color.text.subtlest', N200),
			)}
			data-testid="user-picker-custom-secondary-text"
		>
			{message}
		</span>
	);

	private renderByline = () => {
		if (!this.props.data?.byline) {
			return undefined;
		}

		return this.getBylineComponent(this.props.isSelected, this.props.data.byline);
	};

	private renderAvatar = () => {
		const {
			data: { avatarUrl },
		} = this.props;
		return <SizeableAvatar appearance="big" src={avatarUrl} />;
	};

	private getLozengeProps = () =>
		typeof this.props.data.lozenge === 'string'
			? {
					text: this.props.data.lozenge,
				}
			: this.props.data.lozenge;

	render() {
		return (
			<AvatarItemOption
				avatar={this.renderAvatar()}
				isDisabled={this.props.data.isDisabled}
				lozenge={this.getLozengeProps()}
				primaryText={this.getPrimaryText()}
				secondaryText={this.renderByline()}
			/>
		);
	}
}
