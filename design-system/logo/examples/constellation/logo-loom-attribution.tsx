/**
 * @jsxRuntime classic
 * @jsx jsx
 */

import { css, jsx } from '@compiled/react';

import { LoomAttributionIcon, LoomAttributionLogo } from '@atlaskit/logo';

const tableStyle = css({
	width: '415px',
});

const LogoLoom = () => {
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
							<LoomAttributionLogo appearance="brand" />
						</td>
						<td>
							<LoomAttributionIcon appearance="brand" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default LogoLoom;
