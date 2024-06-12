import React, { useState } from 'react';

import { cssMap, cx } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

import { Box, Inline } from '../src';

const styles = cssMap({
	root: {
		color: 'var(--ds-text-accent-lime)',
	},
	bg: {
		backgroundColor: 'var(--ds-background-accent-lime-subtle)',
	},
	bgAlt: {
		backgroundColor: 'var(--ds-background-neutral-subtle)',
	},
	interactive: {
		cursor: 'pointer',
		border: `1px solid ${token('color.border')}`,
	},
	focused: {
		color: 'var(--ds-text-selected)',
		backgroundColor: 'var(--ds-background-selected)',
		border: `1px solid ${token('color.border.selected')}`,
	},
	dashedBorder: {
		borderStyle: 'dashed',
		borderColor: 'var(--ds-border)',
		borderWidth: 'var(--ds-border-width)',
	},
});

export default function Example() {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<>
			<Inline grow="hug" space="space.100" xcss={styles.dashedBorder} alignInline="center">
				<Box xcss={styles.root}>Static</Box>
				<Box xcss={cx(styles.root, styles.bg)}>Composed</Box>
				<Box
					onClick={() => setIsFocused((prev) => !prev)}
					xcss={cx(styles.root, styles.bg, styles.interactive, isFocused && styles.focused)}
				>
					Conditionally composed
				</Box>
			</Inline>
		</>
	);
}
