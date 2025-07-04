/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';
import {
	Component,
	type ReactElement,
	type ReactNode,
	type SyntheticEvent,
	type RefObject,
	type MediaHTMLAttributes,
} from 'react';
import { type VideoTextTracks, type VideoTextTrackKind, getVideoTextTrackId } from './text';
import { requestFullScreen } from './utils';
import { TextTracks } from './track';
import { jsx } from '@atlaskit/css';

export type VideoStatus = 'playing' | 'paused' | 'errored';
export type VideoError = MediaError | null;

export interface VideoState {
	status: VideoStatus;
	currentTime: number;
	currentActiveCues: (
		kind: VideoTextTrackKind,
		lang: string,
	) => TextTrackCueList | null | undefined;
	volume: number;
	duration: number;
	buffered: number;
	isMuted: boolean;
	isLoading: boolean;
	error?: VideoError;
}

export type NavigateFunction = (time: number) => void;
export type SetVolumeFunction = (volume: number) => void;
export type SetPlaybackSpeed = (speed: number) => void;

export interface VideoActions {
	play: () => void;
	pause: () => void;
	navigate: NavigateFunction;
	setVolume: SetVolumeFunction;
	setPlaybackSpeed: SetPlaybackSpeed;
	requestFullscreen: () => void;
	mute: () => void;
	unmute: () => void;
	toggleMute: () => void;
}

export type RenderCallback = (
	reactElement: ReactElement<SourceElement>,
	state: VideoState,
	actions: VideoActions,
	ref: RefObject<SourceElement>,
) => ReactNode;

export interface VideoProps {
	src: string;
	children: RenderCallback;
	/**
	 * `defaultTime` is a getter function to ensure we're always
	 * getting the latest value from TimeSaver even if a render hasn't
	 * occurred to provide the latest value from the parent component.
	 */
	defaultTime: () => number;
	sourceType: 'video' | 'audio';
	controls: boolean;
	autoPlay: boolean;
	preload: string;
	poster?: string;
	crossOrigin?: MediaHTMLAttributes<HTMLVideoElement & HTMLAudioElement>['crossOrigin'];
	textTracks?: VideoTextTracks;
	textTracksPosition?: number;
	onTextTrackLoaded?: () => void;
	onTextTrackError?: (artifactName: string, lang: string, label: string) => void;
	onCanPlay?: (event: SyntheticEvent<SourceElement>) => void;
	onError?: (event: SyntheticEvent<SourceElement>) => void;
	onTimeChange?: (time: number, duration: number) => void;
}

export interface VideoComponentState {
	currentTime: number;
	volume: number;
	status: VideoStatus;
	duration: number;
	buffered: number;
	isMuted: boolean;
	isLoading: boolean;
	error?: VideoError;
}

const getVolumeFromVideo = (video: SourceElement): { volume: number; isMuted: boolean } => {
	const volume = video.volume;
	const isMuted = volume === 0;

	return {
		volume,
		isMuted,
	};
};

export type SourceElement = HTMLVideoElement | HTMLAudioElement;
const isSafari =
	typeof navigator !== 'undefined'
		? /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
		: false;

export class Video extends Component<VideoProps, VideoComponentState> {
	previousVolume: number = 1;
	previousTime: number = -1;
	videoRef: RefObject<HTMLVideoElement> = React.createRef();
	audioRef: RefObject<HTMLAudioElement> = React.createRef();
	hasCanPlayTriggered: boolean = false;

	state: VideoComponentState = {
		isLoading: true,
		buffered: 0,
		currentTime: 0,
		volume: 1,
		status: 'paused',
		duration: 0,
		isMuted: false,
	};

	static defaultProps = {
		defaultTime: () => 0,
		sourceType: 'video',
		autoPlay: false,
		controls: false,
		preload: isSafari ? 'auto' : 'metadata',
	};

	onLoadedData = () => {
		const { defaultTime } = this.props;
		if (this.currentElement) {
			this.currentElement.currentTime = defaultTime();
		}
	};

	componentDidUpdate(prevProps: VideoProps) {
		const { src } = this.props;
		const { currentTime, status } = this.state;
		const hasSrcChanged = prevProps.src !== src;

		if (hasSrcChanged) {
			this.hasCanPlayTriggered = false;
			// TODO: add test to cover this case
			if (status === 'playing') {
				this.play();
			}

			this.navigate(currentTime);
		}
	}

	private onVolumeChange = (event: SyntheticEvent<SourceElement>) => {
		const video = event.target as SourceElement;
		const { volume, isMuted } = getVolumeFromVideo(video);
		this.setState({
			volume,
			isMuted,
		});
	};

	private onTimeUpdate = (event: SyntheticEvent<SourceElement>) => {
		const video = event.target as SourceElement;
		const { onTimeChange } = this.props;
		const { duration } = this.state;

		const flooredTime = Math.floor(video.currentTime);
		if (onTimeChange && flooredTime !== this.previousTime) {
			onTimeChange(flooredTime, duration);
			this.previousTime = flooredTime;
		}

		this.setState({
			currentTime: video.currentTime,
		});

		if (video.buffered.length) {
			const buffered = video.buffered.end(video.buffered.length - 1);

			this.setState({ buffered });
		}
	};

	private onCanPlay = (event: SyntheticEvent<SourceElement>) => {
		const { onCanPlay } = this.props;
		const video = event.target as SourceElement;
		const { volume, isMuted } = getVolumeFromVideo(video);

		this.setState({
			volume,
			isMuted,
			isLoading: false,
			currentTime: video.currentTime,
			duration: video.duration,
		});

		if (!this.hasCanPlayTriggered) {
			// protect against browser firing this event multiple times
			this.hasCanPlayTriggered = true;
			onCanPlay && onCanPlay(event);
		}
	};

	private onPlay = () => {
		this.setState({
			status: 'playing',
		});
	};

	private onPause = () => {
		this.setState({
			status: 'paused',
		});
	};

	private get videoState(): VideoState {
		const { currentTime, volume, status, duration, buffered, isMuted, isLoading, error } =
			this.state;

		return {
			currentTime,
			currentActiveCues: (kind: VideoTextTrackKind, lang: string) =>
				this.videoRef.current?.textTracks.getTrackById(getVideoTextTrackId(kind, lang))?.activeCues,
			volume,
			status,
			duration,
			buffered,
			isMuted,
			isLoading,
			error,
		};
	}

	private play = () => {
		this.currentElement && this.currentElement.play();
	};

	private pause = () => {
		this.currentElement && this.currentElement.pause();
	};

	private navigate = (time: number) => {
		this.setState({ currentTime: time });
		this.currentElement && (this.currentElement.currentTime = time);
	};

	private setVolume = (volume: number) => {
		this.setState({ volume });
		this.currentElement && (this.currentElement.volume = volume);
	};

	private setPlaybackSpeed = (playbackSpeed: number) => {
		this.currentElement && (this.currentElement.playbackRate = playbackSpeed);
	};

	private get currentElement(): SourceElement | undefined {
		const { sourceType } = this.props;
		if (sourceType === 'video' && this.videoRef.current) {
			return this.videoRef.current;
		} else if (sourceType === 'audio' && this.audioRef.current) {
			return this.audioRef.current;
		} else {
			return undefined;
		}
	}

	private requestFullscreen = () => {
		const { sourceType } = this.props;
		if (sourceType === 'video') {
			requestFullScreen(this.currentElement as HTMLVideoElement);
		}
	};

	private mute = () => {
		const { volume } = this.state;

		this.previousVolume = volume;
		this.setVolume(0);
	};

	private unmute = () => {
		this.setVolume(this.previousVolume);
	};

	private toggleMute = () => {
		const { volume } = this.videoState;

		if (volume > 0) {
			this.mute();
		} else {
			this.unmute();
		}
	};

	private get actions(): VideoActions {
		const {
			play,
			pause,
			navigate,
			setVolume,
			setPlaybackSpeed,
			requestFullscreen,
			mute,
			unmute,
			toggleMute,
		} = this;

		return {
			play,
			pause,
			navigate,
			setVolume,
			setPlaybackSpeed,
			requestFullscreen,
			mute,
			unmute,
			toggleMute,
		};
	}

	private onDurationChange = (event: SyntheticEvent<SourceElement>) => {
		const video = event.target as SourceElement;

		this.setState({
			duration: video.duration,
		});
	};

	private onError = (event: SyntheticEvent<SourceElement>) => {
		const { onError } = this.props;
		const video = event.target as SourceElement;

		this.setState({
			isLoading: false,
			status: 'errored',
			error: video.error,
		});

		onError && onError(event);
	};

	private onWaiting = () => {
		this.setState({ isLoading: true });
	};

	render() {
		const { videoState, actions } = this;
		const {
			sourceType,
			poster,
			src,
			children,
			autoPlay,
			controls,
			preload,
			crossOrigin,
			textTracks,
			textTracksPosition,
			onTextTrackLoaded,
			onTextTrackError,
		} = this.props;

		const props: Partial<MediaHTMLAttributes<HTMLVideoElement & HTMLAudioElement>> = {
			src,
			preload,
			controls,
			autoPlay,
			onLoadedData: this.onLoadedData,
			onPlay: this.onPlay,
			onPause: this.onPause,
			onVolumeChange: this.onVolumeChange,
			onTimeUpdate: this.onTimeUpdate,
			onCanPlay: this.onCanPlay,
			onDurationChange: this.onDurationChange,
			onError: this.onError,
			onWaiting: this.onWaiting,
			crossOrigin,
		};

		if (sourceType === 'video') {
			return children(
				// eslint-disable-next-line jsx-a11y/media-has-caption
				<video data-testid="media-video-element" ref={this.videoRef} poster={poster} {...props}>
					{textTracks && (
						<TextTracks
							videoTextTracks={textTracks}
							textTracksPosition={textTracksPosition}
							onLoad={onTextTrackLoaded}
							onError={onTextTrackError}
						/>
					)}
				</video>,
				videoState,
				actions,
				this.videoRef,
			);
		} else {
			// eslint-disable-next-line jsx-a11y/media-has-caption
			return children(<audio ref={this.audioRef} {...props} />, videoState, actions, this.audioRef);
		}
	}
}
