/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useState } from 'react';

import { jsx } from '@compiled/react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import { ExitingPersistence, SlideIn } from '@atlaskit/motion';
import { type Direction, type Fade } from '@atlaskit/motion/src/entering/types';

import { Block, Centered, RetryContainer } from './utils';

const froms: Direction[] = ['top', 'right', 'bottom', 'left'];
const fades: Fade[] = ['none', 'in', 'out', 'inout'];

export default () => {
	const [isIn, setIsIn] = useState(true);
	const [fromIndex, setFromIndex] = useState(0);
	const [fadeIndex, setFadeIndex] = useState(0);

	return (
		<RetryContainer>
			{/* eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
			<div css={{ textAlign: 'center' }}>
				<ButtonGroup label="Motion options">
					<Button onClick={() => setIsIn((prev) => !prev)}>{isIn ? 'Exit' : 'Enter'}</Button>
					<Button onClick={() => setFromIndex((prev) => (prev + 1) % froms.length)}>
						From {froms[fromIndex]}
					</Button>
					<Button onClick={() => setFadeIndex((prev) => (prev + 1) % fades.length)}>
						Fade {fades[fadeIndex]}
					</Button>
				</ButtonGroup>

				<Centered
					css={{
						overflow: 'hidden',
						height: '300px',
						margin: '0 auto',
						position: 'relative',
					}}
				>
					<ExitingPersistence appear>
						{isIn && (
							<SlideIn enterFrom={froms[fromIndex]} fade={fades[fadeIndex]}>
								{(props) => (
									<Block
										ref={props.ref}
										// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop
										className={props.className}
										css={{
											height: '95%',
											width: '95%',
											margin: 'auto',
										}}
									/>
								)}
							</SlideIn>
						)}
					</ExitingPersistence>
				</Centered>
			</div>
		</RetryContainer>
	);
};
