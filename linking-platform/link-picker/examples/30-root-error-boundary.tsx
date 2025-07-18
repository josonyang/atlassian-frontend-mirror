import React, { useState } from 'react';

import Button from '@atlaskit/button/new';
import { fg } from '@atlaskit/platform-feature-flags';
import Popup from '@atlaskit/popup';

import { PageHeader, PageWrapper } from '../example-helpers/common';
import { LinkPicker } from '../src';

export default function RootErrorBoundary() {
	const [isOpen, setIsOpen] = useState(true);

	const handleToggle = () => setIsOpen(!isOpen);

	return (
		<PageWrapper>
			<PageHeader>
				<p>
					<b>Root Error boundary</b>, displayed when the component throws internally.
				</p>
			</PageHeader>
			<Popup
				isOpen={isOpen}
				autoFocus={false}
				onClose={handleToggle}
				content={({ update }) => (
					<LinkPicker
						// commit a crime to reap our punishment
						url={new URL('https://atlassian.com') as any}
						onSubmit={() => {}}
						onCancel={() => {}}
						onContentResize={update}
					/>
				)}
				placement="bottom-start"
				trigger={({ ref, ...triggerProps }) => (
					<Button
						{...triggerProps}
						ref={ref}
						appearance="primary"
						isSelected={isOpen}
						onClick={handleToggle}
					>
						Toggle
					</Button>
				)}
				shouldRenderToParent={fg('should-render-to-parent-should-be-true-linking-pla')}
			/>
		</PageWrapper>
	);
}
