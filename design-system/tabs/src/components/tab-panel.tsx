import React, { Fragment } from 'react';

import FocusRing from '@atlaskit/focus-ring';

import { useTabPanel } from '../hooks';
import { type TabPanelAttributesType, type TabPanelProps } from '../types';

// Note this is not being memoized as children is an unstable reference
/**
 * __TabPanel__
 *
 * A TabPanel houses the contents of a Tab.
 *
 * - [Examples](https://atlassian.design/components/tabs/examples)
 * - [Code](https://atlassian.design/components/tabs/code)
 * - [Usage](https://atlassian.design/components/tabs/usage)
 */
const TabPanel = ({ children, testId }: TabPanelProps) => {
	const {
		role,
		id,
		hidden,
		'aria-labelledby': ariaLabelledBy,
		tabIndex,
	}: TabPanelAttributesType = useTabPanel();
	return (
		<FocusRing isInset>
			<div
				data-testid={testId}
				role={role}
				id={id}
				hidden={hidden}
				aria-labelledby={ariaLabelledBy}
				tabIndex={tabIndex}
			>
				{/* Fragment is a workaround as Box types don't allow ReactNode children */}
				<Fragment>{children}</Fragment>
			</div>
		</FocusRing>
	);
};

export default TabPanel;
