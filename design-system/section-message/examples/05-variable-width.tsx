import React, { useState } from 'react';

import CodeBlock from '@atlaskit/code/block';
import { Label } from '@atlaskit/form';
import { Box, Stack, Text } from '@atlaskit/primitives/compiled';
import Range from '@atlaskit/range';
import SectionMessage, { SectionMessageAction } from '@atlaskit/section-message';

const Example = () => {
	const [width, setWidth] = useState(800);

	return (
		<Stack space="space.0">
			<Text>SectionMessage expands to fill the space available to it.</Text>
			<Label htmlFor="resize-message">Resize message</Label>
			<Range id="resize-message" min={100} max={800} onChange={setWidth} step={1} value={width} />
			<Box style={{ maxWidth: `${width}px` }}>
				<SectionMessage
					title="The Modern Prometheus"
					actions={[
						<SectionMessageAction href="https://en.wikipedia.org/wiki/Mary_Shelley">
							Mary
						</SectionMessageAction>,
						<SectionMessageAction href="https://en.wikipedia.org/wiki/Villa_Diodati">
							Villa Diodatti
						</SectionMessageAction>,
					]}
				>
					<Text as="p">
						You will rejoice to hear that no disaster has accompanied the commencement of an
						enterprise which you have regarded with such evil forebodings. I arrived here yesterday,
						and my first task is to assure my dear sister of my welfare and increasing confidence in
						the success of my undertaking.
					</Text>
					<CodeBlock
						language="javascript"
						text="const CODE_BLOCK_FULL_PARENT_WIDTH = true;"
						showLineNumbers
					/>
				</SectionMessage>
			</Box>
		</Stack>
	);
};

export default Example;
