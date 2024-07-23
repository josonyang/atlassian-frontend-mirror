/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import { smallImage } from '@atlaskit/media-test-helpers';

import { BlockCardResolvedView } from '../../src/view/BlockCard';
import { VRTestCase } from '../utils/common';

export default () => (
	<VRTestCase title="Block card with preview">
		{() => (
			<BlockCardResolvedView
				icon={{ url: smallImage }}
				title="Smart Links - Designs"
				link="https://icatcare.org/app/uploads/2019/09/The-Kitten-Checklist-1.png"
				byline={'Updated 2 days ago. Created 3 days ago.'}
				thumbnail={smallImage}
				context={{ text: 'Dropbox', icon: smallImage }}
				actions={[
					{
						id: '',
						text: 'Open preview',
						promise: () => Promise.resolve(),
					},
				]}
			/>
		)}
	</VRTestCase>
);
