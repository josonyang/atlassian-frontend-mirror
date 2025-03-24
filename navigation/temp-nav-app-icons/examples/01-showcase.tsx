/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { Fragment, useState } from 'react';

import { cssMap, jsx } from '@atlaskit/css';
import Select from '@atlaskit/select';
import Table, { Cell, HeadCell, Row, TBody, THead } from '@atlaskit/table';

import { rows } from './utils/all-components';
import { appOrder, selectOptions } from './utils/constants';

const wrapperStyles = cssMap({
	root: {
		width: '600px',
		position: 'relative',
		zIndex: 0,
	},
});

export default function ShowcaseExample({
	apps = rows,
	appearance: providedAppearance = 'brand',
	iconColor,
	textColor,
}: {
	apps?: typeof rows;
	appearance?: 'brand' | 'legacy';
	iconColor?: string;
	textColor?: string;
}) {
	const [appearance, setAppearance] = useState<'brand' | 'legacy'>(providedAppearance);

	const customisedProps = { appearance: appearance, iconColor: iconColor } as any;
	const customisedPropsLogo = { textColor: textColor } as any;

	return (
		<Fragment>
			<label htmlFor="appearance">Appearance</label>
			<Select<(typeof selectOptions)[number]>
				inputId="appearance"
				options={selectOptions}
				defaultOption={selectOptions[0]}
				onChange={(newValue) => setAppearance(newValue?.value ?? 'brand')}
			/>

			<div css={wrapperStyles.root}>
				<Table>
					<THead>
						<HeadCell>App</HeadCell>
						<HeadCell>20x20</HeadCell>
						<HeadCell>24x24</HeadCell>
						<HeadCell>32x32</HeadCell>
						<HeadCell>Wordmark</HeadCell>
					</THead>
					<TBody>
						{/* Order rows based on appOrder */}
						{apps
							.sort(
								(a: (typeof rows)[0], b: (typeof rows)[0]) =>
									appOrder.indexOf(a.name) - appOrder.indexOf(b.name),
							)
							.map(({ name, Icon20, Icon24, Icon32, Logo }) => {
								return (
									<Row key={name}>
										<Cell>{name}</Cell>
										<Cell>{<Icon20 {...customisedProps} />}</Cell>
										<Cell>{<Icon24 {...customisedProps} />}</Cell>
										<Cell>{<Icon32 {...customisedProps} />}</Cell>
										<Cell>
											{Logo === null ? (
												'N/A'
											) : (
												<Logo {...customisedProps} {...customisedPropsLogo} />
											)}
										</Cell>
									</Row>
								);
							})}
					</TBody>
				</Table>
			</div>
		</Fragment>
	);
}
