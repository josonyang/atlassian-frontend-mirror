import React from 'react';
import { screen } from '@atlassian/testing-library/screen';

import { getSchemaBasedOnStage } from '@atlaskit/adf-schema/schema-default';
import { p, table, td, th, tr } from '@atlaskit/adf-utils/builders';
import { renderWithIntl } from '@atlaskit/editor-test-helpers/rtl';
import { setupEditorExperiments } from '@atlaskit/tmp-editor-statsig/setup';

import { TableCell, TableHeader } from '../../../../react/nodes/tableCell';
import { TableProcessorWithContainerStyles } from '../../../../react/nodes/tableNew';
import TableRow from '../../../../react/nodes/tableRow';

const schema = getSchemaBasedOnStage('stage0');

const RowRenderer = ({ children }: React.PropsWithChildren): React.JSX.Element => <>{children}</>;

describe('table cell edge props', () => {
	beforeEach(() => {
		setupEditorExperiments('test', {
			platform_editor_table_q4_loveability: true,
			platform_editor_table_q4_patch_5: true,
		});
	});

	afterEach(() => {
		setupEditorExperiments('test', {}, {}, { disableTestOverrides: true });
	});

	it('adds edge attributes to cells nested inside a row renderer', () => {
		const tableNode = schema.nodeFromJSON(
			table(
				tr([th()(p('Header 1')), th()(p('Header 2'))]),
				tr([td()(p('Body 1')), td()(p('Body 2'))]),
			),
		);
		renderWithIntl(
			<TableProcessorWithContainerStyles
				isNumberColumnEnabled={false}
				layout="default"
				rendererAppearance="full-page"
				renderWidth={760}
				smartCardStorage={new Map()}
				tableNode={tableNode}
			>
				<TableRow>
					<TableHeader />
					<TableHeader />
				</TableRow>
				<RowRenderer>
					<TableRow>
						<TableCell />
						<TableCell />
					</TableRow>
				</RowRenderer>
			</TableProcessorWithContainerStyles>,
		);

		const [topLeftCell] = screen.getAllByRole('columnheader');
		const [bottomLeftCell, bottomRightCell] = screen.getAllByRole('cell');

		expect(topLeftCell).toHaveAttribute('data-reaches-left', 'true');
		expect(topLeftCell).toHaveAttribute('data-reaches-top', 'true');
		expect(bottomLeftCell).toHaveAttribute('data-reaches-bottom', 'true');
		expect(bottomLeftCell).toHaveAttribute('data-reaches-left', 'true');
		expect(bottomRightCell).toHaveAttribute('data-reaches-bottom', 'true');
		expect(bottomRightCell).toHaveAttribute('data-reaches-right', 'true');
	});

	it('preserves direct-cell traversal when the wrapper experiment is disabled', () => {
		setupEditorExperiments('test', {
			platform_editor_table_q4_loveability: true,
			platform_editor_table_q4_patch_5: false,
		});
		const tableNode = schema.nodeFromJSON(
			table(
				tr([th()(p('Header 1')), th()(p('Header 2'))]),
				tr([td()(p('Body 1')), td()(p('Body 2'))]),
			),
		);
		renderWithIntl(
			<TableProcessorWithContainerStyles
				isNumberColumnEnabled={false}
				layout="default"
				rendererAppearance="full-page"
				renderWidth={760}
				smartCardStorage={new Map()}
				tableNode={tableNode}
			>
				<TableRow>
					<TableHeader />
					<TableHeader />
				</TableRow>
				<RowRenderer>
					<TableRow>
						<TableCell />
						<TableCell />
					</TableRow>
				</RowRenderer>
			</TableProcessorWithContainerStyles>,
		);

		const [topLeftCell] = screen.getAllByRole('columnheader');
		const [bottomLeftCell, bottomRightCell] = screen.getAllByRole('cell');

		expect(topLeftCell).toHaveAttribute('data-reaches-left', 'true');
		expect(topLeftCell).toHaveAttribute('data-reaches-top', 'true');
		expect(bottomLeftCell).not.toHaveAttribute('data-reaches-bottom');
		expect(bottomLeftCell).not.toHaveAttribute('data-reaches-left');
		expect(bottomRightCell).not.toHaveAttribute('data-reaches-bottom');
		expect(bottomRightCell).not.toHaveAttribute('data-reaches-right');
	});

	it('preserves merged-cell edge geometry for wrapped rows', () => {
		const tableNode = schema.nodeFromJSON(
			table(
				tr([th({ colspan: 2 })(p('Header'))]),
				tr([td({ rowspan: 2 })(p('Left')), td()(p('Top right'))]),
				tr([td()(p('Bottom right'))]),
			),
		);
		renderWithIntl(
			<TableProcessorWithContainerStyles
				isNumberColumnEnabled={false}
				layout="default"
				rendererAppearance="full-page"
				renderWidth={760}
				smartCardStorage={new Map()}
				tableNode={tableNode}
			>
				<TableRow>
					<TableHeader colspan={2} />
				</TableRow>
				<RowRenderer>
					<TableRow>
						<TableCell rowspan={2} />
						<TableCell />
					</TableRow>
				</RowRenderer>
				<RowRenderer>
					<TableRow>
						<TableCell />
					</TableRow>
				</RowRenderer>
			</TableProcessorWithContainerStyles>,
		);

		const headerCell = screen.getByRole('columnheader');
		const [leftCell, , bottomRightCell] = screen.getAllByRole('cell');

		expect(headerCell).toHaveAttribute('data-reaches-left', 'true');
		expect(headerCell).toHaveAttribute('data-reaches-right', 'true');
		expect(leftCell).toHaveAttribute('data-reaches-bottom', 'true');
		expect(leftCell).toHaveAttribute('data-reaches-left', 'true');
		expect(bottomRightCell).toHaveAttribute('data-reaches-bottom', 'true');
		expect(bottomRightCell).toHaveAttribute('data-reaches-right', 'true');
		expect(bottomRightCell).not.toHaveAttribute('data-reaches-left');
	});
});
