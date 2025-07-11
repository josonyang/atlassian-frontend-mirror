import React, { Fragment, useState } from 'react';

import { styled } from '@compiled/react';

import Button, { IconButton } from '@atlaskit/button/new';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import { token } from '@atlaskit/tokens';
import Tooltip, {
	type PositionType,
	TooltipPrimitive,
	type TooltipPrimitiveProps,
} from '@atlaskit/tooltip';

const VALID_POSITIONS: PositionType[] = ['mouse', 'top', 'right', 'bottom', 'left'];

const shortMessage = "I'm a short tooltip";
const longMessage = 'I am a longer tooltip with a decent amount of content inside';

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled -- To migrate as part of go/ui-styling-standard
const InlineDialog = styled<TooltipPrimitiveProps>(TooltipPrimitive)({
	background: 'white',
	borderRadius: token('border.radius', '4px'),
	boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
	boxSizing: 'content-box',
	color: token('color.text'),
	maxHeight: '300px',
	maxWidth: '300px',
	paddingTop: token('space.100', '8px'),
	paddingRight: token('space.150', '12px'),
	paddingBottom: token('space.100', '8px'),
	paddingLeft: token('space.150', '12px'),
});

export default function RenderPropsExample() {
	const [message, setMessage] = React.useState(shortMessage);
	const [position, setPosition] = useState(0);

	const updateTooltip = React.useRef<() => void>();

	const changeDirection = () => {
		setPosition((position + 1) % VALID_POSITIONS.length);
	};

	const handleOnMouseDown = (event: React.MouseEvent<HTMLElement>) => console.log(event);

	const positionText = VALID_POSITIONS[position];

	React.useLayoutEffect(() => {
		updateTooltip.current?.();
	}, [message]);

	return (
		<Fragment>
			<p>Icon</p>
			<Tooltip content="Save">
				{(tooltipProps) => <IconButton icon={AddIcon} testId="add" {...tooltipProps} label="Add" />}
			</Tooltip>

			<p>Position</p>
			<div
				style={{
					padding: `${token('space.500', '40px')} ${token('space.500', '40px')}`,
				}}
			>
				<Tooltip content={positionText} position={positionText}>
					{(tooltipProps) => (
						<Button {...tooltipProps} onClick={changeDirection}>
							Target
						</Button>
					)}
				</Tooltip>
			</div>

			<p>Position without render props</p>
			<div
				style={{
					padding: `${token('space.500', '40px')} ${token('space.500', '40px')}`,
				}}
			>
				<Tooltip content={positionText} position={positionText}>
					<Button onClick={changeDirection}>Target</Button>
				</Tooltip>
			</div>

			<p>Click to update</p>
			<Tooltip
				content={({ update }) => {
					updateTooltip.current = update;
					return message;
				}}
			>
				{(tooltipProps) => (
					<Button
						{...tooltipProps}
						onClick={() => setMessage(message === shortMessage ? longMessage : shortMessage)}
						onMouseDown={(e) => {
							tooltipProps.onMouseDown(e);
							handleOnMouseDown(e);
						}}
					>
						Activate to toggle tooltip
					</Button>
				)}
			</Tooltip>

			<p>Component in content</p>
			<Tooltip component={InlineDialog} content="This is a tooltip">
				{(tooltipProps) => (
					<Button appearance="primary" {...tooltipProps}>
						Hover over me
					</Button>
				)}
			</Tooltip>
		</Fragment>
	);
}
