import React from 'react';

import LinkUrl from '../../src/view/LinkUrl';

export default () => (
	<div>
		<h2>Link safety warning</h2>
		<ul>
			<li>
				Link description is a URL and it's different from a destination.
				<br />
				<LinkUrl href="https://www.google.com/">atlassian.com</LinkUrl>
			</li>
		</ul>
		<h2>No link safety warning</h2>
		<ul>
			<li>
				Link description is a plain text.
				<br />
				<LinkUrl href="https://www.google.com/">Here is a google link</LinkUrl>
			</li>
			<li>
				Link description is a URL identical to a destination.
				<br />
				<LinkUrl href="https://www.atlassian.com/solutions/devops">
					https://www.atlassian.com/solutions/devops
				</LinkUrl>
			</li>
			<li>
				Link is a multi-line URL.
				<br />
				<LinkUrl href="https://www.atlassian.com/solutions/devops">
					<p>Help</p>
					{/* eslint-disable-next-line @atlaskit/design-system/no-html-anchor, jsx-a11y/anchor-is-valid */}
					<a>https://www.atlassian.com/solutions/devops</a>
				</LinkUrl>
			</li>
			<li>
				Link is a multi-line URL.
				<br />
				<LinkUrl href="https://hello.atlassian.com/wiki">
					<div>Help</div>
					<span>https://hello.atlas...</span>
				</LinkUrl>
			</li>
		</ul>
	</div>
);
