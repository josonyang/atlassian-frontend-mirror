/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type ReactNode, useState } from 'react';

import { css, jsx } from '@compiled/react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import { cssMap } from '@atlaskit/css';
import { ConfluenceIcon, JiraServiceManagementIcon } from '@atlaskit/logo';
import { ExitingPersistence, Motion } from '@atlaskit/motion';
import { token } from '@atlaskit/tokens';

import { Block, Centered, RetryContainer } from '../utils';

const styles = cssMap({
	entering: {
		animationDuration: token('motion.duration.xlong'),
		animationTimingFunction: token('motion.easing.out.practical'),
		animationName: `${token('motion.keyframe.scale.in.medium')}, ${token('motion.keyframe.fade.in')}`,
	},
	exiting: {
		animationDuration: token('motion.duration.long'),
		animationTimingFunction: token('motion.easing.in.practical'),
		animationName: `${token('motion.keyframe.scale.out.medium')}, ${token('motion.keyframe.fade.out')}`,
	},
});

const MotionFadeBetweenElements = (): JSX.Element => {
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
							<div key={index}>{elements[index]}</div>
						</ExitingPersistence>
					</div>
				</Centered>
			</div>
		</RetryContainer>
	);
};

const EnteringBlock = ({ children }: { children: ReactNode }) => (
	<Motion enteringAnimationXcss={styles.entering} exitingAnimationXcss={styles.exiting}>
		<Block css={blockStyles}>{children}</Block>
	</Motion>
);

const elements = [
	<EnteringBlock>
		<ConfluenceIcon size="xlarge" />
	</EnteringBlock>,
	<EnteringBlock>
		<JiraServiceManagementIcon size="xlarge" />
	</EnteringBlock>,
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
