import kebabCase from 'lodash/kebabCase';

import { table, tableWithNestedTable } from '@atlaskit/adf-schema';
import { convertToInlineCss } from '@atlaskit/editor-common/lazy-node-view';
import type { GetEditorContainerWidth } from '@atlaskit/editor-common/types';
import type { DOMOutputSpec, NodeSpec, Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { akEditorGutterPaddingDynamic } from '@atlaskit/editor-shared-styles';

import { generateColgroup, getResizerMinWidth } from '../pm-plugins/table-resizing/utils/colgroup';
import { TABLE_MAX_WIDTH } from '../pm-plugins/table-resizing/utils/consts';

import { getAlignmentStyle } from './table-container-styles';

type Config = {
	allowColumnResizing: boolean;
	tableResizingEnabled: boolean;
	getEditorContainerWidth: GetEditorContainerWidth;
	isNestingSupported?: boolean;
};
export const tableNodeSpecWithFixedToDOM = (
	config: Config,
): NodeSpec & { toDOM: (node: PMNode) => DOMOutputSpec } => {
	const tableNode = config.isNestingSupported ? tableWithNestedTable : table;

	return {
		...tableNode,
		toDOM: (node: PMNode): DOMOutputSpec => {
			const gutterPadding = akEditorGutterPaddingDynamic() * 2;

			const alignmentStyle = Object.entries(getAlignmentStyle(node.attrs.layout))
				.map(([k, v]) => `${kebabCase(k)}: ${kebabCase(v)}`)
				.join(';');

			const tableMinWidth = getResizerMinWidth(node);

			const attrs = {
				'data-number-column': node.attrs.isNumberColumnEnabled,
				'data-layout': node.attrs.layout,
				'data-autosize': node.attrs.__autoSize,
				'data-table-local-id': node.attrs.localId,
				'data-table-width': node.attrs.width,
			};

			let colgroup: DOMOutputSpec = '';

			if (config.allowColumnResizing) {
				colgroup = ['colgroup', {}, ...generateColgroup(node)];
			}

			const tableContainerDiv = [
				'div',
				{
					class: 'pm-table-container',
					'data-number-column': node.attrs.isNumberColumnEnabled,
					'data-layout': node.attrs.layout,
					'data-testid': 'table-container',
				},
				[
					'div',
					{
						class: 'pm-table-sticky-sentinel-top',
						'data-testid': 'sticky-sentinel-top',
					},
				],
				[
					'div',
					{
						class: 'pm-table-row-controls-wrapper',
					},
					['div'],
				],
				[
					'div',
					{
						class: 'pm-table-with-left-shadow',
						style: 'visibility: hidden',
					},
				],
				[
					'div',
					{
						class: 'pm-table-wrapper',
					},
					[
						'table',
						attrs,
						['span', { class: 'pm-table-shadow-sentinel-right' }],
						['span', { class: 'pm-table-shadow-sentinel-left' }],
						colgroup,
						['tbody', 0],
					],
				],
				[
					'div',
					{
						class: 'pm-table-with-right-shadow',
						style: 'visibility: hidden',
					},
				],
				[
					'div',
					{
						class: 'pm-table-sticky-sentinel-bottom',
						'data-testid': 'sticky-sentinel-bottom',
					},
				],
			];

			if (!config.tableResizingEnabled) {
				return [
					'div',
					{
						class: 'tableView-content-wrap',
						'data-prosemirror-initial-toDOM-render': 'true',
					},
					tableContainerDiv,
				];
			}

			const tableWidthAttribute = node.attrs.width ? `${node.attrs.width}px` : `100%`;

			const tableResizingDiv = [
				'div',
				{
					'data-testid': 'table-alignment-container',
					style: alignmentStyle,
				},
				[
					'div',
					{
						class: 'pm-table-resizer-container',
						style: `width: min(calc(100cqw - ${gutterPadding}px), ${tableWidthAttribute});`,
					},
					[
						'div',
						{
							class: 'resizer-item display-handle',
							style: convertToInlineCss({
								position: 'relative',
								userSelect: 'auto',
								boxSizing: 'border-box',
								'--ak-editor-table-gutter-padding': `${gutterPadding}px`,
								'--ak-editor-table-max-width': `${TABLE_MAX_WIDTH}px`,
								'--ak-editor-table-min-width': `${tableMinWidth}px`,
								minWidth: 'var(--ak-editor-table-min-width)',
								maxWidth: `min(calc(100cqw - var(--ak-editor-table-gutter-padding)), var(--ak-editor-table-max-width))`,
								width: `min(calc(100cqw - var(--ak-editor-table-gutter-padding)), ${tableWidthAttribute})`,
							}),
						},
						[
							'span',
							{
								class: 'resizer-hover-zone',
							},
							tableContainerDiv,
						],
					],
				],
			];

			return [
				'div',
				{
					class: 'tableView-content-wrap',
					'data-prosemirror-initial-toDOM-render': 'true',
				},
				tableResizingDiv,
			];
		},
	};
};
