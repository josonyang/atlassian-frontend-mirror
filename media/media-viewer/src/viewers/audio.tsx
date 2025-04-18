import React from 'react';
import {
	type ProcessedFileState,
	type MediaClient,
	type FileState,
	globalMediaEventEmitter,
} from '@atlaskit/media-client';
import AudioIcon from '@atlaskit/icon/core/migration/audio--media-services-audio';

import { Outcome } from '../domain';
import { MediaViewerError } from '../errors';
import {
	AudioPlayer,
	AudioCover,
	Audio,
	DefaultCoverWrapper,
	CustomAudioPlayerWrapper,
} from '../styleWrappers';
import { type BaseState, BaseViewer } from './base-viewer';
import { isIE } from '../utils/isIE';
import { CustomMediaPlayer, type WithShowControlMethodProp } from '@atlaskit/media-ui';
import { getObjectUrlFromFileState } from '../utils/getObjectUrlFromFileState';
import { type MediaTraceContext } from '@atlaskit/media-common';

export type Props = Readonly<
	{
		item: FileState;
		mediaClient: MediaClient;
		collectionName?: string;
		previewCount: number;
		onCanPlay: () => void;
		onError: (error: MediaViewerError) => void;
		traceContext: MediaTraceContext;
	} & WithShowControlMethodProp
>;

export type State = BaseState<string> & {
	coverUrl?: string;
};

const defaultCover = (
	<DefaultCoverWrapper>
		<AudioIcon
			label="cover"
			LEGACY_size="xlarge"
			color="currentColor"
			// eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
			LEGACY_primaryColor="#22272B"
			// eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
			LEGACY_secondaryColor="#9FADBC"
		/>
	</DefaultCoverWrapper>
);

const getCoverUrl = (
	item: ProcessedFileState,
	mediaClient: MediaClient,
	collectionName?: string,
): Promise<string> =>
	mediaClient.getImageUrl(item.id, {
		collection: collectionName,
	});

export class AudioViewer extends BaseViewer<string, Props, State> {
	protected get initialState() {
		return {
			content: Outcome.pending<string, MediaViewerError>(),
		};
	}

	private renderCover = () => {
		const { item } = this.props;
		const { coverUrl } = this.state;

		if (coverUrl && item.status !== 'error') {
			return <AudioCover src={coverUrl} alt={item.name} />;
		} else {
			return defaultCover;
		}
	};

	private saveAudioElement = (audioElement?: HTMLElement | null) => {
		if (!audioElement) {
			return;
		}

		audioElement.setAttribute('controlsList', 'nodownload');
	};

	private onFirstPlay = () => {
		const { item } = this.props;
		globalMediaEventEmitter.emit('media-viewed', {
			fileId: item.id,
			viewingLevel: 'full',
		});
	};

	private onError = () => {
		const { onError } = this.props;
		onError && onError(new MediaViewerError('audioviewer-playback'));
	};

	protected renderSuccessful(src: string) {
		const { item, showControls, previewCount, onCanPlay } = this.props;

		const useCustomAudioPlayer = !isIE();
		const isAutoPlay = previewCount === 0;
		return useCustomAudioPlayer ? (
			<AudioPlayer data-testid="media-viewer-audio-content">
				{this.renderCover()}
				<CustomAudioPlayerWrapper>
					<CustomMediaPlayer
						type="audio"
						isAutoPlay={isAutoPlay}
						src={src}
						fileId={item.id}
						isShortcutEnabled={true}
						showControls={showControls}
						onCanPlay={onCanPlay}
						onFirstPlay={this.onFirstPlay}
						onError={this.onError}
					/>
				</CustomAudioPlayerWrapper>
			</AudioPlayer>
		) : (
			<AudioPlayer>
				{this.renderCover()}
				<CustomAudioPlayerWrapper>
					<Audio
						autoPlay={isAutoPlay}
						controls
						ref={this.saveAudioElement}
						src={src}
						preload="metadata"
					/>
				</CustomAudioPlayerWrapper>
			</AudioPlayer>
		);
	}

	private loadCover = (coverUrl: string) => {
		return new Promise(async (resolve, reject) => {
			const img = new Image();

			img.src = coverUrl;
			img.onload = resolve;
			img.onerror = reject;
		});
	};

	private setCoverUrl = async () => {
		const { mediaClient, item, collectionName } = this.props;

		if (item.status !== 'processed') {
			return;
		}
		const coverUrl = await getCoverUrl(item, mediaClient, collectionName);

		try {
			await this.loadCover(coverUrl);
			this.safeSetState({ coverUrl });
		} catch (e) {}
	};

	protected async init() {
		const { mediaClient, item, collectionName } = this.props;

		try {
			let audioUrl: string | undefined;

			if (item.status === 'processed') {
				audioUrl = await mediaClient.file.getArtifactURL(
					item.artifacts,
					'audio.mp3',
					collectionName,
				);

				if (!audioUrl) {
					throw new MediaViewerError('audioviewer-missing-artefact');
				}
			} else {
				audioUrl = await getObjectUrlFromFileState(item);
				if (!audioUrl) {
					this.safeSetState({
						content: Outcome.pending(),
					});
					return;
				}
			}
			this.setCoverUrl();
			this.safeSetState({
				content: Outcome.successful(audioUrl),
			});
		} catch (error) {
			this.safeSetState({
				content: Outcome.failed(
					new MediaViewerError('audioviewer-fetch-url', error instanceof Error ? error : undefined),
				),
			});
		}
	}
	protected release() {
		const { content } = this.state;
		if (!content.data) {
			return;
		}

		URL.revokeObjectURL(content.data);
	}
}
