/* eslint-disable @atlaskit/ui-styling-standard/no-nested-selectors */
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useState } from 'react';

import { css, jsx } from '@compiled/react';

import Button from '@atlaskit/button/new';
import { cssMap } from '@atlaskit/css';
import {
	BitbucketIcon,
	ConfluenceIcon,
	JiraIcon,
	JiraServiceManagementIcon,
	StatuspageIcon,
	TrelloIcon,
} from '@atlaskit/logo';
import { ExitingPersistence, Motion, StaggeredEntrance } from '@atlaskit/motion';
import { token } from '@atlaskit/tokens';

import { Block } from '../utils';

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

const MotionFadeInListOfElementsExample = (): JSX.Element => {
	const [items, setItems] = useState(logos);

	return (
		<div css={retryContainerStyles}>
			<Button onClick={() => setItems((list) => randRemove(list))}>Random remove</Button>
			<Button onClick={() => setItems(logos)}>Reset</Button>
			<ul css={listStyles}>
				<StaggeredEntrance>
					<ExitingPersistence>
					{items.map((logo) => (
						// Gotcha #1 set propery keys YO
						<Motion
							enteringAnimationXcss={styles.entering}
							exitingAnimationXcss={styles.exiting}
							key={logo[1] as string}
						>
							<li
								css={listItemStyles}
							>
								<Block css={blockStyles}>
									<div css={logoContainerStyles}>
										{logo[0]}
										<h3 css={headerStyles}>{logo[1]}</h3>
									</div>
								</Block>
							</li>
						</Motion>
					))}
					</ExitingPersistence>
				</StaggeredEntrance>
			</ul>
		</div>
	);
};

const logos = [
	[<BitbucketIcon size="small" />, 'Bitbucket'],
	[<ConfluenceIcon size="small" />, 'Confluence'],
	[<JiraServiceManagementIcon size="small" />, 'Jira Service Management'],
	[<JiraIcon size="small" />, 'Jira'],
	[<TrelloIcon size="small" />, 'Trello'],
	[<StatuspageIcon size="small" />, 'Statuspage'],
];

const randRemove = <T extends Array<TItem>, TItem>(arr: T) => {
	const newArr = arr.concat([]);
	newArr.splice(Date.now() % newArr.length, 1);
	return newArr;
};

const retryContainerStyles = css({
	textAlign: 'center',
	'> *': {
		marginInlineEnd: token('space.050'),
	},
});

const listStyles = css({
	maxWidth: '474px',
	height: '328px',
	marginBlockEnd: token('space.200'),
	marginBlockStart: token('space.200'),
	marginInlineEnd: token('space.200'),
	marginInlineStart: token('space.200'),
	paddingBlockEnd: token('space.0'),
	paddingBlockStart: token('space.0'),
	paddingInlineEnd: token('space.0'),
	paddingInlineStart: token('space.0'),
	div: {
		marginBlockEnd: token('space.0'),
		marginBlockStart: token('space.0'),
		marginInlineEnd: token('space.0'),
		marginInlineStart: token('space.0'),
	},
});

const listItemStyles = css({
	display: 'block',
	marginBlockEnd: token('space.100'),
	marginBlockStart: token('space.100'),
	marginInlineEnd: token('space.100'),
	marginInlineStart: token('space.100'),
	paddingBlockEnd: token('space.0'),
	paddingBlockStart: token('space.0'),
	paddingInlineEnd: token('space.0'),
	paddingInlineStart: token('space.0'),
});

const blockStyles = css({
	width: '100%',
	height: '48px',
	borderRadius: token('radius.small', '3px'),
});

const logoContainerStyles = css({
	display: 'flex',
	width: '100%',
	alignItems: 'center',
	paddingInlineStart: token('space.100'),
});

const headerStyles = css({
	fontWeight: 300,
	marginBlockEnd: token('space.0'),
	marginBlockStart: token('space.0'),
	marginInlineEnd: token('space.0'),
	marginInlineStart: token('space.100'),
});

export default MotionFadeInListOfElementsExample;
