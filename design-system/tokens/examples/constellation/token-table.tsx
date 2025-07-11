/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { useEffect, useState } from 'react';

import { cssMap, jsx } from '@compiled/react';

import Avatar from '@atlaskit/avatar';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import DynamicTable from '@atlaskit/dynamic-table';
import { Box } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

const TokenTableCodeBlock = `
import { N50A, N60A } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

// left and right shadow styles
boxShadow: token(
  'elevation.shadow.overflow',
  \`2px 0px 8px \${N50A}, 1px 0px 0px \${N60A}\`,
),
`;

const createHead = (withWidth: boolean) => {
	return {
		cells: [
			{
				key: 'name',
				content: 'Name',
				isSortable: true,
				width: withWidth ? 25 : undefined,
			},
			{
				key: 'party',
				content: 'Party',
				shouldTruncate: true,
				isSortable: true,
				width: withWidth ? 15 : undefined,
			},
			{
				key: 'term',
				content: 'Term',
				shouldTruncate: true,
				isSortable: true,
				width: withWidth ? 10 : undefined,
			},
			{
				key: 'content',
				content: 'ID',
				shouldTruncate: true,
			},
			{
				key: 'more',
				shouldTruncate: true,
			},
		],
	};
};

const head = createHead(true);

const presidents = [
	{
		id: 1,
		name: 'George Washington',
		party: 'None, Federalist',
		term: '1789-1797',
	},
	{
		id: 2,
		name: 'John Adams',
		party: 'Federalist',
		term: '1797-1801',
	},
];

const styles = cssMap({
	nameWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	avatarWrapper: {
		marginInlineEnd: token('space.100'),
	},
	wrapper: {
		position: 'relative',
		overflow: 'hidden',
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
		table: {
			width: '1000px',
		},
	},
	overflow: {
		overflowX: 'auto',
	},
	shadow: {
		width: '10px',
		position: 'absolute',
		boxShadow: token('elevation.shadow.overflow'),
		insetBlockEnd: '-10px',
		insetBlockStart: '-10px',
	},
	rightShadow: {
		insetInlineEnd: ' -10px',
	},
	leftShadow: {
		insetInlineStart: ' -10px',
	},
});

interface President {
	id: number;
	name: string;
	party: string;
	term: string;
}

const rows = presidents.map((president: President, index: number) => ({
	key: `row-${index}-${president.name}`,
	isHighlighted: false,
	cells: [
		{
			key: president.name,
			content: (
				<span css={styles.nameWrapper}>
					<Box xcss={styles.avatarWrapper}>
						<Avatar name={president.name} size="medium" />
					</Box>
					{president.name}
				</span>
			),
		},
		{
			key: president.party,
			content: president.party,
		},
		{
			key: president.id,
			content: president.term,
		},
		{
			key: 'Lorem',
			content: president.id,
		},
		{
			key: 'MoreDropdown',
			content: (
				<DropdownMenu shouldRenderToParent trigger="More">
					<DropdownItemGroup>
						<DropdownItem>{president.name}</DropdownItem>
					</DropdownItemGroup>
				</DropdownMenu>
			),
		},
	],
}));

const TokenTable = () => {
	const [shadowLeft, setShadowLeft] = useState(false);
	const [shadowRight, setShadowRight] = useState(false);

	const ref: any = React.createRef();

	const checkShadow = () => {
		if (!ref.current) {
			return;
		}
		if (ref.current.scrollLeft > 0) {
			setShadowLeft(true);
		} else {
			setShadowLeft(false);
		}

		if (
			ref.current.scrollLeft >=
			Math.floor(ref.current.scrollWidth - ref.current.getBoundingClientRect().width)
		) {
			setShadowRight(false);
		} else {
			setShadowRight(true);
		}
	};

	useEffect(() => {
		checkShadow();
	});

	return (
		<div css={styles.wrapper}>
			<div css={styles.overflow} onScroll={checkShadow} ref={ref}>
				<DynamicTable head={head} rows={rows} />
				{shadowLeft && <div css={[styles.shadow, styles.leftShadow]}></div>}
				{shadowRight && <div css={[styles.shadow, styles.rightShadow]}></div>}
			</div>
		</div>
	);
};

export default { example: TokenTable, code: TokenTableCodeBlock };
