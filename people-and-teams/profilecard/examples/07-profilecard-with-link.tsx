import React from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from '@emotion/styled';

import { token } from '@atlaskit/tokens';

import { ProfileCard } from '../src';
import { profiles } from '../src/mocks';

import ExampleWrapper from './helper/example-wrapper';

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const MainStage = styled.div({
	margin: token('space.200', '16px'),
});

const avatarImage = profiles[4].User.avatarUrl;

export default function Example() {
	return (
		<ExampleWrapper>
			<>
				<MainStage>
					<ProfileCard
						avatarUrl={avatarImage}
						fullName="Link card"
						meta="With callback"
						actions={[
							{
								label: 'View website',
								id: 'view-website',
								callback: () => {
									alert('Click action performed');
								},
								link: 'https://www.atlassian.com',
							},
						]}
					/>
				</MainStage>
				<MainStage>
					<ProfileCard
						avatarUrl={avatarImage}
						fullName="Link card"
						meta="Without callback"
						actions={[
							{
								label: 'View website',
								id: 'view-website',
								link: 'https://www.atlassian.com',
							},
						]}
					/>
				</MainStage>
			</>
		</ExampleWrapper>
	);
}
