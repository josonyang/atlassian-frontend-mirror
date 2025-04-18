import React, { useCallback } from 'react';

import { INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import type { AlignmentPlugin } from '../alignmentPluginType';
import { changeAlignment } from '../editor-commands';
import type { AlignmentState } from '../pm-plugins/types';
import { ToolbarType } from '../pm-plugins/types';

import ToolbarAlignment from './ToolbarAlignment';

interface FloatingToolbarComponentProps {
	api: ExtractInjectionAPI<AlignmentPlugin> | undefined;
	editorView: EditorView;
}

const FloatingToolbarSettings = {
	disabled: false,
	isToolbarReducedSpacing: true,
};

export function FloatingToolbarComponent({ api, editorView }: FloatingToolbarComponentProps) {
	const { alignmentState } = useSharedPluginState(api, ['alignment']);

	const changeAlignmentCallback = useCallback(
		(align: AlignmentState) => {
			return changeAlignment(
				align,
				api,
				INPUT_METHOD.FLOATING_TB,
			)(editorView.state, editorView.dispatch);
		},
		[editorView, api],
	);

	return (
		<ToolbarAlignment
			pluginState={alignmentState}
			isReducedSpacing={
				editorExperiment('platform_editor_controls', 'variant1')
					? false
					: FloatingToolbarSettings.isToolbarReducedSpacing
			}
			changeAlignment={changeAlignmentCallback}
			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			disabled={FloatingToolbarSettings.disabled || !alignmentState!.isEnabled}
			toolbarType={ToolbarType.FLOATING}
			api={api}
		/>
	);
}
