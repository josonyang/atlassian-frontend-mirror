import React from 'react';
import ModalSpinner from '../viewers/modalSpinner';
import type { WithMediaClientConfigProps } from '@atlaskit/media-client-react';
import type { MediaViewerProps } from './types';
import type { MediaViewerAnalyticsErrorBoundaryProps } from './media-viewer-analytics-error-boundary';

export type MediaViewerWithMediaClientConfigProps = WithMediaClientConfigProps<MediaViewerProps>;

type MediaViewerWithMediaClientConfigComponent =
	React.ComponentType<MediaViewerWithMediaClientConfigProps>;

type MediaViewerErrorBoundaryComponent =
	React.ComponentType<MediaViewerAnalyticsErrorBoundaryProps>;

export interface AsyncMediaViewerState {
	MediaViewer?: MediaViewerWithMediaClientConfigComponent;
	MediaViewerErrorBoundary?: MediaViewerErrorBoundaryComponent;
}

export class AsyncMediaViewer extends React.PureComponent<
	MediaViewerWithMediaClientConfigProps,
	AsyncMediaViewerState
> {
	static displayName = 'AsyncMediaViewer';
	static MediaViewer?: MediaViewerWithMediaClientConfigComponent;
	static MediaViewerErrorBoundary?: MediaViewerErrorBoundaryComponent;

	mounted = false;

	state: AsyncMediaViewerState = {
		// Set state value to equal to current static value of this class.
		MediaViewer: AsyncMediaViewer.MediaViewer,
		MediaViewerErrorBoundary: AsyncMediaViewer.MediaViewerErrorBoundary,
	};

	async UNSAFE_componentWillMount() {
		if (!this.state.MediaViewer || !this.state.MediaViewerErrorBoundary) {
			try {
				const [mediaClient, mediaViewerModule, mediaViewerErrorBoundaryModule] = await Promise.all([
					import(
						/* webpackChunkName: "@atlaskit-internal_media-client-react" */ '@atlaskit/media-client-react'
					),
					import(/* webpackChunkName: "@atlaskit-internal_media-viewer" */ './media-viewer'),
					import(
						/* webpackChunkName: "@atlaskit-internal_media-picker-error-boundary" */ './media-viewer-analytics-error-boundary'
					),
				]);

				const MediaViewerWithClient = mediaClient.withMediaClient(mediaViewerModule.MediaViewer);
				AsyncMediaViewer.MediaViewer = MediaViewerWithClient;
				AsyncMediaViewer.MediaViewerErrorBoundary = mediaViewerErrorBoundaryModule.default;

				if (this.mounted) {
					this.setState({
						MediaViewer: MediaViewerWithClient,
						MediaViewerErrorBoundary: AsyncMediaViewer.MediaViewerErrorBoundary,
					});
				}
			} catch (error) {
				// TODO [MS-2277]: Add operational error to catch async import error
			}
		}
	}

	componentDidMount() {
		this.mounted = true;
	}

	componentWillUnmount() {
		this.mounted = false;
	}
	render() {
		const { MediaViewer, MediaViewerErrorBoundary } = this.state;
		if (!MediaViewer || !MediaViewerErrorBoundary) {
			return <ModalSpinner />;
		}

		return (
			<MediaViewerErrorBoundary>
				<MediaViewer {...this.props} />
			</MediaViewerErrorBoundary>
		);
	}
}

export default AsyncMediaViewer;
