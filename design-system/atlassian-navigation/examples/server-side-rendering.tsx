/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import ReactDOMServer from 'react-dom/server';

// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Stack } from '@atlaskit/primitives';

import AuthenticatedExample from './10-authenticated-example';

export default function Component() {
	return (
		<Stack space="space.300">
			<Stack space="space.100">
				<h2>SSR</h2>
				<div
					dangerouslySetInnerHTML={{
						__html: ReactDOMServer.renderToString(<AuthenticatedExample />),
					}}
				/>
			</Stack>
			<Stack space="space.100">
				<h2>Hydrated</h2>
				<AuthenticatedExample />
			</Stack>
		</Stack>
	);
}
