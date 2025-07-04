import React from 'react';

import { type IntlShape } from 'react-intl-next';

import { pixelEntryMessages as messages } from '@atlaskit/editor-common/media';
import {
	type FloatingToolbarConfig,
	type FloatingToolbarOverflowDropdownOptions,
	type Command,
} from '@atlaskit/editor-common/types';
import { type NodeType } from '@atlaskit/editor-prosemirror/model';
import { type EditorState } from '@atlaskit/editor-prosemirror/state';
import { hasParentNodeOfType } from '@atlaskit/editor-prosemirror/utils';
import ImageFullscreenIcon from '@atlaskit/icon/core/image-fullscreen';

import { openPixelEditor } from '../../pm-plugins/pixel-resizing/commands';
import { type Props, PixelEntry } from '../../pm-plugins/pixel-resizing/ui';
import { PIXEL_RESIZING_TOOLBAR_WIDTH } from '../../pm-plugins/pixel-resizing/ui/constants';
import type { MediaOptions, MediaToolbarBaseConfig } from '../../types';

import { getSelectedMediaSingle } from './utils';

export const getPixelResizingToolbar = (
	toolbarBaseConfig: MediaToolbarBaseConfig,
	{
		pluginInjectionApi,
		intl,
		pluginState,
		hoverDecoration,
		isEditorFullWidthEnabled,
		triggerButtonSelector,
	}: Omit<Props, 'editorView' | 'selectedMediaSingleNode'>,
): FloatingToolbarConfig => ({
	...toolbarBaseConfig,
	width: PIXEL_RESIZING_TOOLBAR_WIDTH,
	scrollable: true,
	items: [
		{
			type: 'custom',
			fallback: [],
			render: (editorView) => {
				if (!editorView) {
					return null;
				}
				const selectedMediaSingleNode = getSelectedMediaSingle(editorView.state);
				if (!editorView || !selectedMediaSingleNode) {
					return null;
				}
				return (
					<PixelEntry
						editorView={editorView}
						intl={intl}
						selectedMediaSingleNode={selectedMediaSingleNode}
						pluginInjectionApi={pluginInjectionApi}
						pluginState={pluginState}
						hoverDecoration={hoverDecoration}
						isEditorFullWidthEnabled={isEditorFullWidthEnabled}
						triggerButtonSelector={triggerButtonSelector}
					/>
				);
			},
		},
	],
});

export const getResizeDropdownOption = (
	mediaOptions: MediaOptions,
	state: EditorState,
	formatMessage: IntlShape['formatMessage'],
	selectedNodeType?: NodeType,
): FloatingToolbarOverflowDropdownOptions<Command> => {
	if (selectedNodeType?.name !== 'mediaSingle') {
		return [];
	}

	const { allowResizing, allowResizingInTables, allowAdvancedToolBarOptions, allowPixelResizing } =
		mediaOptions;

	const isWithinTable = hasParentNodeOfType(state.schema.nodes.table)(state.selection);
	if (
		allowAdvancedToolBarOptions &&
		allowResizing &&
		(!isWithinTable || allowResizingInTables === true) &&
		allowPixelResizing
	) {
		return [
			{
				title: formatMessage(messages.resizeOption),
				onClick: openPixelEditor(),
				icon: <ImageFullscreenIcon label="" />,
				testId: 'media-pixel-resizing-dropdown-option',
			},
		];
	}

	return [];
};
