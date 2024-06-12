import React, { useState } from 'react';

import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import Button from '@atlaskit/button/new';
import __noop from '@atlaskit/ds-lib/noop';
import { Box } from '@atlaskit/primitives';

import PageHeader from '../../src';

const breadcrumbs = (
	<Breadcrumbs onExpand={__noop}>
		<BreadcrumbsItem text="Project" key="Project" />
		<BreadcrumbsItem text="Design System" key="Design System" />
	</Breadcrumbs>
);

const PageHeaderFocusHeadingExample = () => {
	const [ref, setRef] = useState<HTMLElement>();

	const onClick = () => {
		if (ref) {
			ref.focus();
		}
	};

	const innerRef = (element: HTMLElement) => {
		setRef(element);
	};

	return (
		<Box>
			<Button onClick={onClick}>Focus on the heading</Button>
			<PageHeader breadcrumbs={breadcrumbs} innerRef={innerRef}>
				Task: Improve accessibility for the page header
			</PageHeader>
		</Box>
	);
};

export default PageHeaderFocusHeadingExample;
