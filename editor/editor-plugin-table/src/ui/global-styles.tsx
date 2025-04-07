/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/no-global-styles, @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { Global, jsx } from '@emotion/react';

import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import type { FeatureFlags } from '@atlaskit/editor-common/types';

import type { PluginInjectionAPI } from '../types';

import { tableStyles } from './common-styles';

export const GlobalStylesWrapper = ({
	featureFlags,
	isDragAndDropEnabledOption,
	api,
}: {
	featureFlags: FeatureFlags | undefined;
	isDragAndDropEnabledOption?: boolean;
	api?: PluginInjectionAPI;
}) => {
	const { editorViewModeState } = useSharedPluginState(api, ['editorViewMode']);
	const isLivePageViewMode = editorViewModeState?.mode === 'view';
	return (
		<Global
			styles={tableStyles({
				featureFlags,
				isDragAndDropEnabled: isDragAndDropEnabledOption && !isLivePageViewMode,
			})}
		/>
	);
};
