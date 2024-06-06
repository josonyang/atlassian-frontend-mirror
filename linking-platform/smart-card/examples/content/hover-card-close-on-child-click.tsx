/** @jsx jsx */
import { jsx } from '@emotion/react';
import { token } from '@atlaskit/tokens';
import ExampleContainer from './example-container';

import { Provider, Client } from '../../src';
import { HoverCard } from '../../src/hoverCard';

export default () => (
	<ExampleContainer>
		<Provider client={new Client('staging')}>
			<HoverCard url="https://www.atlassian.com/" closeOnChildClick={true}>
				<div css={{ border: '1px solid', padding: token('space.250', '20px') }}>Hover over me!</div>
			</HoverCard>
		</Provider>
	</ExampleContainer>
);
