import React, { type ReactNode } from 'react';

import { cssMap } from '@atlaskit/css';
import { Grid } from '@atlaskit/primitives/compiled';

interface WeekDayGridProps extends React.HTMLAttributes<HTMLElement> {
	testId?: string;
	children: ReactNode;
	isHidden?: boolean;
}

const styles = cssMap({
	templateColumns: {
		gridTemplateColumns: 'repeat(7, minmax(max-content, 1fr))',
	},
});

/**
 * __Week day grid__
 *
 * A week day grid aligns elements in a 7 wide grid layout.
 *
 */
const WeekDayGrid = ({ testId, children, isHidden }: WeekDayGridProps) => {
	const row = (
		<Grid testId={testId} xcss={styles.templateColumns} role="row">
			{children}
		</Grid>
	);

	return isHidden ? <div aria-hidden="true">{row}</div> : row;
};

export default WeekDayGrid;
