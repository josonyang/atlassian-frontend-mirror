import React from 'react';

import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import type { ExtractInjectionAPI, ToolbarSize } from '@atlaskit/editor-common/types';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';

import type { TextFormattingPlugin } from '../textFormattingPluginType';

import Toolbar from './Toolbar';
import { ToolbarType } from './Toolbar/types';

interface PrimaryToolbarComponentProps {
	api: ExtractInjectionAPI<TextFormattingPlugin> | undefined;
	editorView: EditorView;
	popupsMountPoint?: HTMLElement;
	popupsScrollableElement?: HTMLElement;
	toolbarSize: ToolbarSize;
	disabled: boolean;
	isReducedSpacing: boolean;
	shouldUseResponsiveToolbar: boolean;
}
export function PrimaryToolbarComponent({
	api,
	popupsMountPoint,
	popupsScrollableElement,
	toolbarSize,
	editorView,
	disabled,
	isReducedSpacing,
	shouldUseResponsiveToolbar,
}: PrimaryToolbarComponentProps) {
	const { textFormattingState } = useSharedPluginState(api, ['textFormatting']);
	return (
		<Toolbar
			textFormattingState={textFormattingState}
			popupsMountPoint={popupsMountPoint}
			popupsScrollableElement={popupsScrollableElement}
			toolbarSize={toolbarSize}
			isReducedSpacing={isReducedSpacing}
			editorView={editorView}
			isToolbarDisabled={disabled}
			shouldUseResponsiveToolbar={shouldUseResponsiveToolbar}
			editorAnalyticsAPI={api?.analytics?.actions}
			api={api}
			toolbarType={ToolbarType.PRIMARY}
		/>
	);
}
