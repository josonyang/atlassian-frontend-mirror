import React from 'react';

import capitalize from 'lodash/capitalize';

import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box, Stack } from '@atlaskit/primitives';

// eslint-disable-next-line @atlaskit/platform/use-entrypoints-in-examples
import variants from '../src/utils/variants';

/**
 * Tests alignment of Button with inline text
 */
export default function AlignmentExample() {
	return (
		<Stack space="space.300">
			{variants.map(({ name, Component, spacing }) => (
				<Stack key={name} space="space.150">
					<h2>{name}</h2>
					{spacing.map((space) => (
						<Stack key={space} space="space.100">
							<h3>{capitalize(space)} spacing</h3>
							<Stack key={space} space="space.100">
								<Box>
									<Box as="span">Text before</Box>
									<Component
										// @ts-ignore
										spacing={space}
									>
										Button
									</Component>
									<Box as="span">Text after</Box>
								</Box>
								<Box>
									<Box as="span">Text before with icon</Box>
									<Component
										iconBefore={ChevronDownIcon}
										// @ts-ignore
										spacing={space}
									>
										Button
									</Component>
									<Box as="span">Text after with icon</Box>
								</Box>
								<Box>
									<Box as="span">Text before with icon</Box>
									<Component
										iconAfter={ChevronDownIcon}
										// @ts-ignore
										spacing={space}
									>
										Button
									</Component>
									<Box as="span">Text after with icon</Box>
								</Box>
							</Stack>
						</Stack>
					))}
				</Stack>
			))}
		</Stack>
	);
}
