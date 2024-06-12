import React, { type FC, useState } from 'react';

import { token } from '@atlaskit/tokens';

import Tooltip, { type PositionType } from '../src';

import { type Color, Target } from './styled';

const VALID_POSITIONS: PositionType[] = ['mouse', 'top', 'right', 'bottom', 'left'];

interface Props {
	color: Color;
}

const PositionExample: FC<Props> = ({ color = 'blue' }) => {
	const [position, setPosition] = useState(0);

	const changeDirection = () => {
		setPosition((position + 1) % VALID_POSITIONS.length);
	};

	const positionText = VALID_POSITIONS[position];

	return (
		<div
			style={{
				padding: `${token('space.500', '40px')} ${token('space.500', '40px')}`,
			}}
			data-testid="position"
		>
			<Tooltip content={positionText} position={positionText} testId="position">
				{({ onClick, ...tooltipProps }) => (
					<Target color={color} tabIndex={0} onClick={changeDirection} {...tooltipProps}>
						Target
					</Target>
				)}
			</Tooltip>
		</div>
	);
};

export default PositionExample;
