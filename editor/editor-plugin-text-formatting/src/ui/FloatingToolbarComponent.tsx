/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { useMemo } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import type { WrappedComponentProps } from 'react-intl-next';
import { injectIntl } from 'react-intl-next';

import { type EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import { ToolbarSize, type ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import type { TextFormattingPlugin } from '../textFormattingPluginType';

import { DefaultFloatingToolbarButtonsNext } from './Toolbar/constants';
import { FormattingTextDropdownMenu } from './Toolbar/dropdown-menu';
import { useClearIcon } from './Toolbar/hooks/clear-formatting-icon';
import { useFormattingIcons } from './Toolbar/hooks/formatting-icons';
import { useIconList } from './Toolbar/hooks/use-icon-list';
import { SingleToolbarButtons } from './Toolbar/single-toolbar-buttons';
import type { MenuIconItem } from './Toolbar/types';
import { ToolbarType } from './Toolbar/types';

type FloatingToolbarComponentProps = {
	editorView: EditorView;
	api: ExtractInjectionAPI<TextFormattingPlugin> | undefined;
	editorAnalyticsAPI?: EditorAnalyticsAPI;
} & WrappedComponentProps;

const FloatingToolbarSettings = {
	disabled: false,
	isReducedSpacing: true,
	shouldUseResponsiveToolbar: false,
	toolbarSize: ToolbarSize.S,
	hasMoreButton: false,
	moreButtonLabel: '',
	toolbarType: ToolbarType.FLOATING,
};

const FloatingToolbarTextFormat = ({
	api,
	editorAnalyticsAPI,
	editorView,
	intl,
}: FloatingToolbarComponentProps) => {
	const { textFormattingState } = useSharedPluginState(api, ['textFormatting']);

	const defaultIcons = useFormattingIcons({
		schema: editorView.state.schema,
		intl,
		isToolbarDisabled: FloatingToolbarSettings.disabled,
		editorAnalyticsAPI,
		textFormattingState,
		toolbarType: FloatingToolbarSettings.toolbarType,
	});

	const { dropdownItems, singleItems } = useIconList({
		icons: defaultIcons,
		iconTypeList: DefaultFloatingToolbarButtonsNext,
	});

	const clearIcon = useClearIcon({
		textFormattingState,
		intl,
		editorAnalyticsAPI,
		toolbarType: FloatingToolbarSettings.toolbarType,
	});

	const items = useMemo(() => {
		if (!clearIcon) {
			return [{ items: dropdownItems }];
		}

		return [{ items: dropdownItems }, { items: [clearIcon] }];
	}, [clearIcon, dropdownItems]);

	return (
		<React.Fragment>
			<SingleToolbarButtons items={singleItems} editorView={editorView} isReducedSpacing={false} />
			<FormattingTextDropdownMenu
				editorView={editorView}
				items={
					items as {
						items: MenuIconItem[];
					}[]
				}
				isReducedSpacing={
					editorExperiment('platform_editor_controls', 'variant1')
						? false
						: FloatingToolbarSettings.isReducedSpacing
				}
				moreButtonLabel={FloatingToolbarSettings.moreButtonLabel}
				hasFormattingActive={FloatingToolbarSettings.hasMoreButton}
				hasMoreButton={FloatingToolbarSettings.hasMoreButton}
				intl={intl}
				toolbarType={FloatingToolbarSettings.toolbarType}
			/>
		</React.Fragment>
	);
};

export const FloatingToolbarTextFormalWithIntl = injectIntl(FloatingToolbarTextFormat);
