import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { flushSync } from 'react-dom';

import type { MediaProvider } from '@atlaskit/editor-common/provider-factory';
import { ErrorReporter } from '@atlaskit/editor-common/utils';
import type { MediaClientConfig } from '@atlaskit/media-core';
import type { BrowserConfig, ClipboardConfig, DropzoneConfig } from '@atlaskit/media-picker/types';
import { fg } from '@atlaskit/platform-feature-flags';

import PickerFacade from '../../picker-facade';
import type { MediaPluginState } from '../../pm-plugins/types';
import type { CustomMediaPicker } from '../../types';

export interface ChildrenProps {
	config: ClipboardConfig | BrowserConfig | DropzoneConfig;
	mediaClientConfig: MediaClientConfig;
	pickerFacadeInstance: PickerFacade;
}

export type Props = {
	mediaState: MediaPluginState;
	analyticsName: string;
	children: (props: ChildrenProps) => React.ReactElement | null;
};

type State = {
	config?: ClipboardConfig | BrowserConfig | DropzoneConfig;
	mediaClientConfig?: MediaClientConfig;
	pickerFacadeInstance?: PickerFacade;
};

const dummyMediaPickerObject: CustomMediaPicker = {
	on: () => {},
	removeAllListeners: () => {},
	emit: () => {},
	destroy: () => {},
	setUploadParams: () => {},
};

function PickerFacadeProviderNew({ mediaState, analyticsName, children }: Props) {
	const [state, setState] = useState<State>({
		pickerFacadeInstance: undefined,
		config: undefined,
		mediaClientConfig: undefined,
	});

	const mediaProvider = useMemo(() => mediaState?.mediaProvider, [mediaState?.mediaProvider]);

	const handleMediaProvider = useCallback(
		async (_name: string, provider: Promise<MediaProvider> | undefined) => {
			const mediaProvider = await provider;
			if (!mediaProvider || !mediaProvider.uploadParams) {
				return;
			}
			const resolvedMediaClientConfig =
				(await mediaProvider.uploadMediaClientConfig) ||
				(await mediaProvider.viewMediaClientConfig);
			if (!resolvedMediaClientConfig) {
				return;
			}
			const pickerFacadeConfig = {
				mediaClientConfig: resolvedMediaClientConfig,
				errorReporter: mediaState.options.errorReporter || new ErrorReporter(),
				featureFlags: mediaState.mediaOptions && mediaState.mediaOptions.featureFlags,
			};

			const pickerFacadeInstance = await new PickerFacade(
				'customMediaPicker',
				pickerFacadeConfig,
				dummyMediaPickerObject,
				analyticsName,
			).init();
			pickerFacadeInstance.onNewMedia(mediaState.insertFile);
			pickerFacadeInstance.setUploadParams(mediaProvider.uploadParams);
			const config = {
				uploadParams: mediaProvider.uploadParams,
			};
			flushSync(() => {
				setState({
					pickerFacadeInstance,
					config,
					mediaClientConfig: resolvedMediaClientConfig,
				});
			});
		},
		[
			analyticsName,
			mediaState.insertFile,
			mediaState.mediaOptions,
			mediaState.options.errorReporter,
		],
	);

	useEffect(() => {
		if (mediaProvider) {
			handleMediaProvider('mediaProvider', Promise.resolve(mediaProvider));
		}
	}, [mediaProvider, handleMediaProvider]);

	const { mediaClientConfig, config, pickerFacadeInstance } = state;

	if (!mediaClientConfig || !config || !pickerFacadeInstance) {
		return null;
	}

	return children({
		mediaClientConfig,
		config,
		pickerFacadeInstance,
	});
}

// eslint-disable-next-line @repo/internal/react/no-class-components
class PickerFacadeProviderOld extends React.Component<Props, State> {
	state: State = {};

	private handleMediaProvider = async (_name: string, provider?: Promise<MediaProvider>) => {
		const { mediaState, analyticsName } = this.props;
		const mediaProvider = await provider;

		if (!mediaProvider || !mediaProvider.uploadParams) {
			return;
		}

		const resolvedMediaClientConfig =
			(await mediaProvider.uploadMediaClientConfig) || (await mediaProvider.viewMediaClientConfig);

		if (!resolvedMediaClientConfig) {
			return;
		}

		const pickerFacadeConfig = {
			mediaClientConfig: resolvedMediaClientConfig,
			errorReporter: mediaState.options.errorReporter || new ErrorReporter(),
			featureFlags: mediaState.mediaOptions && mediaState.mediaOptions.featureFlags,
		};

		/**
		 * As the first MediaPicker component to be migrated to React, we want to scope the amount of changes logic changed/moved on Editor side.
		 * To achieve this we agreed on using `PickerFacade` 'customMediaPicker' type, since we only need this instance to reuse the logic when we subscribe
		 * for all the different events in MediaPicker (onPreviewUpdate, onError, onProcessing, etc).
		 * The `dummyMediaPickerObject` provided here serves as a workaround for the old picker api that `PickerFacade` will try to use.
		 * But we don't want this to do anything since it's all part of the new React component (`Clipboard` component in this case).
		 * Eventually PickerFacade will be removed and replaced with a new abstraction explained here https://product-fabric.atlassian.net/browse/MS-1937
		 */
		const pickerFacadeInstance = await new PickerFacade(
			'customMediaPicker',
			pickerFacadeConfig,
			dummyMediaPickerObject,
			analyticsName,
		).init();

		/**
		 * Based on the `initPickers` method in `MediaPluginState` we need these 2 `onNewMedia` subscriptions.
		 * First one in order to trigger the entire process of uploading a file for when `onPreviewUpdate` is called
		 * Second one in order to track all analytics as before.
		 */
		pickerFacadeInstance.onNewMedia(mediaState.insertFile);
		pickerFacadeInstance.setUploadParams(mediaProvider.uploadParams);

		const config = {
			uploadParams: mediaProvider.uploadParams,
		};

		flushSync(() =>
			this.setState({
				pickerFacadeInstance,
				config,
				mediaClientConfig: resolvedMediaClientConfig,
			}),
		);
	};

	componentDidMount() {
		const { mediaProvider } = this.props.mediaState;
		if (mediaProvider && fg('platform_editor_media_provider_from_plugin_config')) {
			this.handleMediaProvider('mediaProvider', Promise.resolve(mediaProvider));
		} else {
			this.props.mediaState.options.providerFactory.subscribe(
				'mediaProvider',
				this.handleMediaProvider,
			);
		}
	}

	componentWillUnmount() {
		this.props.mediaState.options.providerFactory.unsubscribe(
			'mediaProvider',
			this.handleMediaProvider,
		);
	}

	render() {
		const { mediaClientConfig, config, pickerFacadeInstance } = this.state;

		if (!mediaClientConfig || !config || !pickerFacadeInstance) {
			return null;
		}

		return this.props.children({
			mediaClientConfig,
			config,
			pickerFacadeInstance,
		});
	}
}

export default function PickerFacadeProvider(props: Props) {
	return fg('platform_editor_media_provider_from_plugin_config') ? (
		<PickerFacadeProviderNew {...props} />
	) : (
		<PickerFacadeProviderOld {...props} />
	);
}
