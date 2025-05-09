import React from 'react';

import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { useSharedPluginStateSelector } from '@atlaskit/editor-common/use-shared-plugin-state-selector';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import type { TablePlugin } from '../../tablePluginType';

import { CornerControls } from './CornerControls/ClassicCornerControls';
import { RowControls } from './RowControls/ClassicControls';

type FloatingControlsWithSelectionProps = {
	editorView: EditorView;
	tableRef: HTMLTableElement;
	isInDanger?: boolean;
	isResizing?: boolean;
	isHeaderRowEnabled?: boolean;
	isHeaderColumnEnabled?: boolean;
	hoveredRows?: number[];
	stickyTop?: number;
	hoverRows: (rows: number[]) => void;
	selectRow: (row: number, expand: boolean) => void;
	tableActive: boolean;
	api?: ExtractInjectionAPI<TablePlugin>;
};

export const FloatingControlsWithSelection = ({
	editorView,
	tableRef,
	isInDanger,
	isResizing,
	isHeaderRowEnabled,
	isHeaderColumnEnabled,
	hoveredRows,
	stickyTop,
	hoverRows,
	selectRow,
	tableActive,
	api,
}: FloatingControlsWithSelectionProps) => {
	// selection
	const { selectionState } = useSharedPluginState(api, ['selection'], {
		disabled: editorExperiment('platform_editor_usesharedpluginstateselector', true),
	});
	const selectionsSelector = useSharedPluginStateSelector(api, 'selection.selection', {
		disabled: editorExperiment('platform_editor_usesharedpluginstateselector', false),
	});
	const selection = editorExperiment('platform_editor_usesharedpluginstateselector', true)
		? selectionsSelector
		: selectionState?.selection;

	return (
		<>
			<CornerControls
				editorView={editorView}
				tableRef={tableRef}
				isInDanger={isInDanger}
				isResizing={isResizing}
				isHeaderRowEnabled={isHeaderRowEnabled}
				isHeaderColumnEnabled={isHeaderColumnEnabled}
				hoveredRows={hoveredRows}
				stickyTop={tableActive ? stickyTop : undefined}
			/>
			<RowControls
				selection={selection}
				editorView={editorView}
				tableRef={tableRef}
				hoverRows={hoverRows}
				hoveredRows={hoveredRows}
				isInDanger={isInDanger}
				isResizing={isResizing}
				selectRow={selectRow}
				stickyTop={tableActive ? stickyTop : undefined}
			/>
		</>
	);
};
