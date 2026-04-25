/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useState } from 'react';

import Button from '@atlaskit/button/new';
import { cssMap, jsx } from '@atlaskit/css';
import {
	BitbucketIcon,
	ConfluenceIcon,
	JiraSoftwareIcon,
	OpsgenieIcon,
	StatuspageIcon,
} from '@atlaskit/logo';
import { Motion } from '@atlaskit/motion';
import { useResizing } from '@atlaskit/motion/resizing';
import { token } from '@atlaskit/tokens';

import { Centered } from '../utils';

const styles = cssMap({
	buttonContainer: {
		marginBlockEnd: token('space.300'),
		textAlign: 'center',
	},
	// Outer container: owned by useResizing — do not put layout styles here that
	// rely on inline style, as useResizing writes to element.style during animation.
	container: {
		display: 'inline-block',
		borderRadius: token('radius.small', '3px'),
		boxShadow: token('elevation.shadow.overlay'),
		overflow: 'hidden',
		paddingBlockEnd: token('space.200'),
		paddingBlockStart: token('space.200'),
		paddingInlineEnd: token('space.200'),
		paddingInlineStart: token('space.200'),
	},
	// Inner grid container: isolated from useResizing so gridTemplateColumns is preserved.
	gridInner: {
		display: 'inline-grid',
		gap: token('space.100'),
	},
	item: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		fontWeight: token('font.weight.medium'),
		paddingBlockEnd: token('space.100'),
		paddingBlockStart: token('space.100'),
		paddingInlineEnd: token('space.200'),
		paddingInlineStart: token('space.200'),
	},
	entering: {
		animationDuration: token('motion.duration.short'),
		animationTimingFunction: token('motion.easing.out.practical'),
		animationName: token('motion.keyframe.fade.in'),
	},
});

const logos = [
	[<BitbucketIcon size="small" />, 'Bitbucket'],
	[<ConfluenceIcon size="small" />, 'Confluence'],
	[<JiraSoftwareIcon size="small" />, 'Jira'],
	[<OpsgenieIcon size="small" />, 'Opsgenie'],
	[<StatuspageIcon size="small" />, 'Statuspage'],
];

const MotionResizingBoth = (): JSX.Element => {
	const [num, setNum] = useState(1);

	const resizingProps = useResizing({
		dimension: 'both',
		duration: token('motion.duration.short'),
		easing: token('motion.easing.out.practical'),
	});

	return (
		<div>
			<div css={styles.buttonContainer}>
				{[1, 2, 3, 4, 5].map((number) => (
					<Button
						testId={`both-button--${number}`}
						key={number}
						isSelected={num === number}
						onClick={() => setNum(number)}
					>
						{number}
					</Button>
				))}
			</div>
			<Centered>
				<div data-testid="menu-both" {...resizingProps} css={styles.container}>
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop */}
					<div css={styles.gridInner} style={{ gridTemplateColumns: `repeat(${num}, auto)` }}>
						{Array(num * num)
							.fill(undefined)
							.map((_, index) => (
								<Motion key={index} xcss={styles.item} enteringAnimationXcss={styles.entering}>
									{logos[index % logos.length][0]}
									<span>{logos[index % logos.length][1]}</span>
								</Motion>
							))}
					</div>
				</div>
			</Centered>
		</div>
	);
};

export default MotionResizingBoth;
