import React from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from '@emotion/styled';

import { cssMap, cx } from '@atlaskit/css';
import { Box, Inline, Stack } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

import TeamProfileCard from '../src/components/Team/TeamProfileCard';
import teamData from '../src/mocks/team-data';
import type { TeamProfilecardProps } from '../src/types';

import ExampleWrapper from './helper/example-wrapper';

const css = cssMap({
	wrapper: {
		boxShadow: token('elevation.shadow.raised'),
		borderRadius: token('border.radius'),
		width: '320px',
	},
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const MainStage = styled.div({
	margin: token('space.200', '16px'),
});

const actions = [
	{
		label: 'Secondary',
		callback: () => {},
		link: 'about:blank',
	},
	{
		label: 'Option with callback',
		callback: () => alert('First option clicked'),
	},
	{
		label: 'Option with link',
		link: 'about:blank',
	},
	{
		label: 'Option with both',
		callback: () => alert('Third option clicked'),
		link: 'about:blank',
	},
];
function analytics(gen: (duration: number) => Record<string, any>) {
	const payload = gen(1000);
	console.log(
		payload.action,
		payload.actionSubject,
		payload.actionSubjectId || '',
		payload.attributes,
	);
}

const teams = [
	teamData({
		members: 12,
	}),
	teamData({
		members: 12,
		isVerified: true,
		headerImage: 'Picture',
		description: 'Overlong',
	}),
];

const defaultProps = {
	analytics,
	generateUserLink: () => 'about:blank',
	onUserClick: (userId: string) => {
		console.log(`User with id: (${userId}) has been clicked.`);
	},
	hasError: false,
	errorType: undefined,
	isLoading: false,
	team: teams[0],
	actions,
	clientFetchProfile: () => {
		console.log('Trying to refetch');
	},
	viewingUserId: undefined,
	viewProfileLink: 'about:blank',
	viewProfileOnClick: () => alert('Viewing profile.'),
};

export default function Example() {
	return (
		<ExampleWrapper>
			<MainStage>
				<Stack space="space.200">
					<Cards />
					<Cards hasError={true} />
					<Cards isLoading={true} />
					<Cards actions={[]} />
					<Cards team={teams[1]} />
					<Cards hasError={true} errorType={{ reason: 'TEAMS_FORBIDDEN' }} />
				</Stack>
			</MainStage>
		</ExampleWrapper>
	);
}

const Cards = (props: Partial<TeamProfilecardProps>) => {
	return (
		<Inline space="space.300">
			<Card {...props} />
			<Card {...props} />
		</Inline>
	);
};

const Card = ({ ...props }: Partial<TeamProfilecardProps>) => {
	return (
		<Box xcss={cx(css.wrapper)}>
			<TeamProfileCard {...defaultProps} {...props} />
		</Box>
	);
};
