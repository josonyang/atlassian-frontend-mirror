/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type ReactNode, useState } from 'react';

import { css, jsx } from '@compiled/react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import { ConfluenceIcon, JiraServiceManagementIcon } from '@atlaskit/logo';
import { ExitingPersistence, FadeIn } from '@atlaskit/motion';

import { Block, Centered, RetryContainer } from '../utils';

const MotionFadeBetweenElements = () => {
	const [index, setIndex] = useState(0);
	const [appear, setAppear] = useState(true);
	const [exitThenEnter, setExitThenEnter] = useState(false);

	return (
		<RetryContainer>
			<div css={containerStyles}>
				<ButtonGroup label="Choose motion options">
					<Button onClick={() => setIndex((prev) => (prev + 1) % elements.length)}>Switch</Button>

					<Button isSelected={appear} onClick={() => setAppear((appear) => !appear)}>
						{appear ? 'Appears on mount' : 'Immediately appear on mount'}
					</Button>

					<Button
						isSelected={exitThenEnter}
						onClick={() => {
							setExitThenEnter((prev) => !prev);
							setTimeout(() => setIndex((prev) => (prev + 1) % elements.length), 1);
						}}
					>
						{exitThenEnter ? 'Will exit first then enter' : 'Will exit and enter at the same time'}
					</Button>
				</ButtonGroup>

				<Centered>
					<div css={centeredPositionStyles}>
						<ExitingPersistence appear={appear} exitThenEnter={exitThenEnter}>
							<div key={index}>{elements[index](exitThenEnter)}</div>
						</ExitingPersistence>
					</div>
				</Centered>
			</div>
		</RetryContainer>
	);
};

const EnteringBlock = ({
	children,
	exitThenEnter,
}: {
	children: ReactNode;
	exitThenEnter?: boolean;
}) => (
	<FadeIn>
		{(props, state) => (
			<Block
				css={[
					blockStyles,
					{
						position: state === 'entering' || exitThenEnter ? 'static' : 'absolute',
					},
				]}
				ref={props.ref}
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop
				className={props.className}
			>
				{children}
			</Block>
		)}
	</FadeIn>
);

const elements = [
	(exitThenEnter: boolean) => (
		<EnteringBlock exitThenEnter={exitThenEnter}>
			<ConfluenceIcon size="xlarge" />
		</EnteringBlock>
	),
	(exitThenEnter: boolean) => (
		<EnteringBlock exitThenEnter={exitThenEnter}>
			<JiraServiceManagementIcon size="xlarge" />
		</EnteringBlock>
	),
];

const blockStyles = css({
	insetBlockStart: 0,
	insetInlineStart: 0,
});

const containerStyles = css({
	textAlign: 'center',
});

const centeredPositionStyles = css({
	textAlign: 'center',
});

export default MotionFadeBetweenElements;
