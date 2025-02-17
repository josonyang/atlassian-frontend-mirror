/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from '@emotion/styled';

import { N40 } from '@atlaskit/theme/colors';
import { fontFallback } from '@atlaskit/theme/typography';
import { token } from '@atlaskit/tokens';

import { TableHeading } from './styled';

const maxWidth = '200px';
const firstLastChildOverride = `
  &:first-of-type, &:last-of-type {
    padding-left: ${token('space.100', '8px')};
    padding-right: ${token('space.100', '8px')};
  }
`;
// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled -- To migrate as part of go/ui-styling-standard
const TablePreviewHeading = styled(TableHeading)(
	{
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		background: token('color.background.disabled', '#091E4224'),
		maxWidth: maxWidth,
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	firstLastChildOverride,
);

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled -- To migrate as part of go/ui-styling-standard
const TablePreviewCell = styled.td(
	{
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		maxWidth: maxWidth,
		padding: `${token('space.050', '4px')} ${token('space.100', '8px')}`,
		boxSizing: 'border-box',
		borderBottom: `0.5px solid ${token('color.border', N40)}`,
		height: '30px',
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	firstLastChildOverride,
);

const tableStyles = css({
	background: token('elevation.surface', '#FFF'),
	borderCollapse: 'separate',
	borderSpacing: 0,
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
	font: token('font.body', fontFallback.body.medium),
	maxWidth,
});

export const DragColumnPreviewOld = ({
	title,
	rows,
}: {
	title: React.ReactNode;
	rows: React.ReactNode[];
}) => {
	return (
		<table css={tableStyles}>
			<thead>
				<tr>
					<TablePreviewHeading>{title}</TablePreviewHeading>
				</tr>
			</thead>
			<tbody>
				{rows.map((data, i) => (
					<tr key={i}>
						<TablePreviewCell>{data}</TablePreviewCell>
					</tr>
				))}
				<tr>
					<TablePreviewCell>...</TablePreviewCell>
				</tr>
			</tbody>
		</table>
	);
};
