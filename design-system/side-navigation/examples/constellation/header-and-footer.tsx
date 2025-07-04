import React from 'react';

import Icon from '@atlaskit/icon';
import Link from '@atlaskit/link';
import {
	Footer,
	Header,
	NavigationContent,
	NavigationFooter,
	NavigationHeader,
	SideNavigation,
} from '@atlaskit/side-navigation';

import AppFrame from '../common/app-frame';
import SampleIcon from '../common/next-gen-project-icon';
import RocketIcon from '../common/sample-logo';

const Example = () => {
	return (
		<AppFrame shouldHideAppBar>
			<SideNavigation label="project" testId="side-navigation">
				<NavigationHeader>
					<Header
						component={({ children, ...props }) => (
							<>
								{/* eslint-disable-next-line @atlaskit/design-system/no-html-anchor */}
								<a href="https://atlassian.design/" {...props}>
									{children}
								</a>
							</>
						)}
						iconBefore={<RocketIcon />}
						description="Next-gen software"
					>
						Concise Systems
					</Header>
				</NavigationHeader>
				<NavigationContent> </NavigationContent>
				<NavigationFooter>
					<Footer
						useDeprecatedApi={false}
						iconBefore={<Icon label="" glyph={SampleIcon} />}
						description={
							<div>
								<Link href="https://www.atlassian.design">Give feedback</Link> {' ∙ '}
								<Link href="https://www.atlassian.design">About this project</Link>
							</div>
						}
					>
						You're in a next gen-project
					</Footer>
				</NavigationFooter>
			</SideNavigation>
		</AppFrame>
	);
};

export default Example;
