import React from 'react';
import { R300 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import ErrorIcon from '@atlaskit/icon/utility/migration/error';
import Button from '@atlaskit/button';
import { Frame } from '../Frame';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import { AKIconWrapper } from '../Icon';
import { messages } from '../../../messages';
import { FormattedMessage } from 'react-intl-next';
import { IconStyledButton } from '../styled';
import withFrameStyleControl from '../utils/withFrameStyleControl';
import { HoverCard } from '../../HoverCard';

export interface InlineCardErroredViewProps {
	/** The url to display */
	url: string;
	/** The error message to display */
	message: string;
	/** The optional click handler */
	onClick?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
	/** What to do when a user clicks "Try again" button */
	onRetry?: () => void;
	/** A flag that determines whether the card is selected in edit mode. */
	isSelected?: boolean;
	/** A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests */
	testId?: string;
	/* Icon to be provided to show this error state */
	icon?: React.ReactNode;
	/** Enables showing a custom preview on hover of link */
	showHoverPreview?: boolean;
	/** Truncates the card to one line */
	truncateInline?: boolean;
}

export class InlineCardErroredView extends React.Component<InlineCardErroredViewProps> {
	private frameRef = React.createRef<HTMLSpanElement & null>();

	handleRetry = (event: React.MouseEvent<HTMLElement>) => {
		const { onRetry } = this.props;
		if (onRetry) {
			event.preventDefault();
			event.stopPropagation();
			onRetry();
		}
	};

	renderActionButton = () => {
		const { onRetry } = this.props;

		const ActionButton = withFrameStyleControl(Button, this.frameRef);

		return (
			onRetry && (
				<ActionButton
					spacing="none"
					component={IconStyledButton}
					onClick={this.handleRetry}
					role="button"
				>
					<FormattedMessage {...messages.try_again} />
				</ActionButton>
			)
		);
	};

	render() {
		const {
			url,
			onClick,
			isSelected,
			testId = 'inline-card-errored-view',
			icon,
			message,
			truncateInline,
		} = this.props;

		const content = (
			<Frame
				testId={testId}
				isSelected={isSelected}
				ref={this.frameRef}
				truncateInline={truncateInline}
			>
				<IconAndTitleLayout
					icon={
						icon || (
							<AKIconWrapper>
								<ErrorIcon
									label="error"
									LEGACY_size="small"
									color={token('color.icon.danger', R300)}
									testId="errored-view-default-icon"
								/>
							</AKIconWrapper>
						)
					}
					link={url}
					title={url}
					onClick={onClick}
					rightSide={message}
				/>
				{this.renderActionButton()}
			</Frame>
		);

		if (this.props.showHoverPreview) {
			return <HoverCard url={url}>{content}</HoverCard>;
		}

		return content;
	}
}
