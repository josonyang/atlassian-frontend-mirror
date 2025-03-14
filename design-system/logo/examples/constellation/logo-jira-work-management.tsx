/**
 * @jsxRuntime classic
 * @jsx jsx
 */

import { css, jsx } from '@compiled/react';

import { JiraWorkManagementIcon, JiraWorkManagementLogo } from '@atlaskit/logo';

const tableStyle = css({
	width: '415px',
});

const LogoJiraWorkManagement = () => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Logo</th>
						<th>Icon</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td css={tableStyle}>
							<JiraWorkManagementLogo appearance="brand" />
						</td>
						<td>
							<JiraWorkManagementIcon appearance="brand" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default LogoJiraWorkManagement;
