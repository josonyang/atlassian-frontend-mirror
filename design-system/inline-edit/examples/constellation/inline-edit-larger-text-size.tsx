/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import InlineEdit from '@atlaskit/inline-edit';
import { Box, xcss } from '@atlaskit/primitives';
import Textfield from '@atlaskit/textfield';
import { token } from '@atlaskit/tokens';

const readViewContainerStyles = xcss({
	font: 'font.heading.large',
	paddingBlock: 'space.100',
	paddingInline: 'space.075',
	wordBreak: 'break-word',
});

const textFieldStyles = css({
	// eslint-disable-next-line @atlaskit/design-system/no-nested-styles, @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'& > [data-ds--text-field--input]': {
		font: token('font.heading.large'),
	},
});

const InlineEditExample = () => {
	const initialValue = 'Enter text';
	const [editValue, setEditValue] = useState('Default value');

	return (
		<Box padding="space.100">
			<InlineEdit
				defaultValue={editValue}
				editButtonLabel={editValue || initialValue}
				editView={({ errorMessage, ...fieldProps }) => (
					// eslint-disable-next-line @atlaskit/design-system/no-unsafe-style-overrides
					<Textfield {...fieldProps} autoFocus css={textFieldStyles} />
				)}
				readView={() => (
					<Box xcss={readViewContainerStyles} testId="read-view">
						{editValue || initialValue}
					</Box>
				)}
				onConfirm={(value) => {
					setEditValue(value);
				}}
			/>
		</Box>
	);
};

export default InlineEditExample;
