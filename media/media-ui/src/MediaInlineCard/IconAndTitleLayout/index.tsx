import React from 'react';
import ImageLoader from 'react-render-image';
import { Icon } from '../Icon';
import {
	IconEmptyWrapper,
	IconPositionWrapper,
	IconTitleWrapper,
	IconWrapper,
	EmojiWrapper,
} from './styled';
import LinkIcon from '@atlaskit/icon/core/migration/link';

export interface IconAndTitleLayoutProps {
	emoji?: React.ReactNode;
	icon?: React.ReactNode;
	title: React.ReactNode;
	titleColor?: string;
	children?: React.ReactNode;
	defaultIcon?: React.ReactNode;
	testId?: string;
}

export class IconAndTitleLayout extends React.Component<IconAndTitleLayoutProps> {
	private renderAtlaskitIcon() {
		const { icon, emoji } = this.props;

		if (emoji) {
			return <EmojiWrapper>{emoji}</EmojiWrapper>;
		}

		if (!icon || typeof icon === 'string') {
			return null;
		}

		return <IconWrapper>{icon}</IconWrapper>;
	}

	private renderImageIcon(errored: React.ReactNode, testId: string) {
		const { icon: url } = this.props;

		if (!url || typeof url !== 'string') {
			return null;
		}

		return (
			<ImageLoader
				src={url}
				loaded={
					<Icon
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
						className="smart-link-icon"
						src={url}
						data-testid={`${testId}-image`}
					/>
				}
				errored={errored}
			/>
		);
	}

	private renderIconPlaceholder(testId: string) {
		const { defaultIcon } = this.props;

		if (defaultIcon) {
			return <IconWrapper>{defaultIcon}</IconWrapper>;
		}

		return (
			<IconWrapper>
				<LinkIcon
					color="currentColor"
					label="link"
					LEGACY_size="small"
					testId={`${testId}-default`}
				/>
			</IconWrapper>
		);
	}

	renderIcon(testId: string) {
		// We render two kinds of icons here:
		// - Image: acquired from either DAC or Teamwork Platform Apps;
		// - Atlaskit Icon: an Atlaskit SVG;
		// Each of these are scaled down to 12x12.
		const icon = this.renderAtlaskitIcon();
		if (icon) {
			return icon;
		}

		const placeholder = this.renderIconPlaceholder(testId);
		const image = this.renderImageIcon(placeholder, testId);

		return image || placeholder;
	}

	render() {
		const { children, title, titleColor, testId = 'media-inline-card-icon-and-title' } = this.props;

		return (
			<>
				<IconTitleWrapper
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					style={titleColor ? { color: titleColor } : undefined}
				>
					<IconPositionWrapper>
						{children || (
							<>
								<IconEmptyWrapper />
								{this.renderIcon(testId)}
							</>
						)}
					</IconPositionWrapper>
					<span data-test-id="title">{title}</span>
				</IconTitleWrapper>
			</>
		);
	}
}
