import React from 'react';
import { Component, type ReactNode, type MouseEvent } from 'react';
import { CardActionButton } from './cardActionButton';

import { type CardActionIconButtonVariant } from './styles';

export type CardActionIconButtonProps = {
	readonly icon: ReactNode;
	readonly label?: string;
	readonly variant?: CardActionIconButtonVariant;
	readonly triggerColor?: string;
	readonly onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export class CardActionIconButton extends Component<CardActionIconButtonProps> {
	render(): JSX.Element {
		const { icon, label, triggerColor, onClick, variant } = this.props;
		return (
			<CardActionButton
				onClick={onClick}
				onMouseDown={this.onMouseDown}
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				style={{ color: triggerColor }}
				label={label}
				variant={variant}
			>
				{icon}
			</CardActionButton>
		);
	}

	// this is to prevent currently focused text to loose cursor on clicking card action
	// this does not prevent onclick behavior
	private onMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
}
