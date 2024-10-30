import React from 'react';

import { Anchor, Stack } from '../src/compiled';

export default function AnchorNewWindow() {
	return (
		<Stack>
			<table>
				<thead>
					<tr>
						<th>Labelled by</th>
						<th>Anchor</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<code>aria-labelledby</code>
						</td>
						<td>
							<Anchor
								testId="labelled-by"
								href="https://www.atlassian.com"
								target="_blank"
								aria-labelledby="some-id"
							>
								I am NOT the accessible name with the highest precedence
							</Anchor>
							<div id="some-id">I am the accessible name with the highest precedence</div>
						</td>
					</tr>
					<tr>
						<td>
							<code>aria-label</code>
						</td>
						<td>
							<Anchor
								testId="label"
								href="https://www.atlassian.com"
								target="_blank"
								aria-label="I am the accessible name with the highest precedence"
							>
								I am NOT the accessible name with the highest precedence
							</Anchor>
						</td>
					</tr>
					<tr>
						<td>
							<code>children</code>
						</td>
						<td>
							<Anchor testId="children" href="https://www.atlassian.com" target="_blank">
								I am the accessible name with the highest precedence
							</Anchor>
						</td>
					</tr>
				</tbody>
			</table>
		</Stack>
	);
}
