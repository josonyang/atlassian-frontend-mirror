/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@compiled/react';

import Button from '@atlaskit/button/new';
import { ExitingPersistence, FadeIn } from '@atlaskit/motion';

import { Block, Centered, RetryContainer } from '../utils';

const MotionFadeOutSingleElementExample = () => {
	const directions = [
		undefined,
		'top' as const,
		'right' as const,
		'bottom' as const,
		'left' as const,
	];
	const [direction, setDirection] = useState(0);

	return (
		<RetryContainer>
			<div css={containerStyles}>
				<Button
					onClick={() => {
						setDirection((direction + 1) % directions.length);
					}}
				>
					{directions[direction] !== undefined
						? `Enter from ${directions[direction]}`
						: 'No Motion'}
				</Button>

				<Centered css={centeredStyles}>
					<ExitingPersistence appear>
						<FadeIn entranceDirection={directions[direction]}>
							{(props) => (
								<Block
									ref={props.ref}
									// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop
									className={props.className}
								/>
							)}
						</FadeIn>
					</ExitingPersistence>
				</Centered>
			</div>
		</RetryContainer>
	);
};

const containerStyles = css({ textAlign: 'center' });

const centeredStyles = css({ height: '182px' });

export default MotionFadeOutSingleElementExample;
