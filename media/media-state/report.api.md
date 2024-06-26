<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/media-state"

> Do not edit this file. This report is auto-generated using
> [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import { MediaTraceContext } from '@atlaskit/media-common';
import { MediaType } from '@atlaskit/media-common';
import { StoreApi } from 'zustand/vanilla';
import { WritableDraft } from 'immer/dist/internal';

// @public (undocumented)
type BaseFileState = {
	id: string;
	occurrenceKey?: string;
	metadataTraceContext?: MediaTraceContext;
};

// @public (undocumented)
export const createMediaStore: (initialStore?: Store) => Omit<
	Omit<StoreApi<Store>, 'subscribe'> & {
		subscribe: {
			(listener: (selectedState: Store, previousSelectedState: Store) => void): () => void;
			<U>(
				selector: (state: Store) => U,
				listener: (selectedState: U, previousSelectedState: U) => void,
				options?:
					| undefined
					| {
							equalityFn?: ((a: U, b: U) => boolean) | undefined;
							fireImmediately?: boolean | undefined;
					  },
			): () => void;
		};
	},
	'setState'
> & {
	setState(
		nextStateOrUpdater: ((state: WritableDraft<Store>) => void) | Partial<Store> | Store,
		shouldReplace?: boolean | undefined,
	): void;
};

// @public (undocumented)
export interface ErrorFileState extends BaseFileState {
	// (undocumented)
	details?: Record<string, any>;
	// (undocumented)
	id: string;
	// (undocumented)
	message?: string;
	// (undocumented)
	reason?: string;
	// (undocumented)
	status: 'error';
}

// @public (undocumented)
export interface FilePreview {
	// (undocumented)
	origin?: 'local' | 'remote';
	// (undocumented)
	originalDimensions?: {
		width: number;
		height: number;
	};
	// (undocumented)
	value: Blob | string;
}

// @public (undocumented)
export type FileState =
	| ErrorFileState
	| ProcessedFileState
	| ProcessingFailedState
	| ProcessingFileState
	| UploadingFileState;

// @public (undocumented)
export type MediaFileArtifact = {
	readonly url: string;
	readonly processingStatus: MediaFileProcessingStatus;
};

// @public (undocumented)
export interface MediaFileArtifacts {
	// (undocumented)
	'audio.mp3'?: MediaFileArtifact;
	// (undocumented)
	'document.pdf'?: MediaFileArtifact;
	// (undocumented)
	'document.txt'?: MediaFileArtifact;
	// (undocumented)
	'image.gif'?: MediaFileArtifact;
	// (undocumented)
	'image.jpg'?: MediaFileArtifact;
	// (undocumented)
	'image.png'?: MediaFileArtifact;
	// (undocumented)
	'poster.jpg'?: MediaFileArtifact;
	// (undocumented)
	'poster_1280.jpg'?: MediaFileArtifact;
	// (undocumented)
	'poster_640.jpg'?: MediaFileArtifact;
	// (undocumented)
	'poster_hd.jpg'?: MediaFileArtifact;
	// (undocumented)
	'thumb.jpg'?: MediaFileArtifact;
	// (undocumented)
	'thumb_120.jpg'?: MediaFileArtifact;
	// (undocumented)
	'thumb_320.jpg'?: MediaFileArtifact;
	// (undocumented)
	'thumb_large.jpg'?: MediaFileArtifact;
	// (undocumented)
	'video.mp4'?: MediaFileArtifact;
	// (undocumented)
	'video_1280.mp4'?: MediaFileArtifact;
	// (undocumented)
	'video_640.mp4'?: MediaFileArtifact;
	// (undocumented)
	'video_hd.mp4'?: MediaFileArtifact;
}

// @public (undocumented)
export type MediaFileProcessingStatus = 'failed' | 'pending' | 'succeeded';

// @public (undocumented)
export type MediaRepresentations = {
	image?: Object;
};

// @public (undocumented)
export type MediaStore = typeof mediaStoreWithoutDevtools;

// @public (undocumented)
export const mediaStore: Omit<
	Omit<StoreApi<Store>, 'subscribe'> & {
		subscribe: {
			(listener: (selectedState: Store, previousSelectedState: Store) => void): () => void;
			<U>(
				selector: (state: Store) => U,
				listener: (selectedState: U, previousSelectedState: U) => void,
				options?:
					| undefined
					| {
							equalityFn?: ((a: U, b: U) => boolean) | undefined;
							fireImmediately?: boolean | undefined;
					  },
			): () => void;
		};
	},
	'setState'
> & {
	setState(
		nextStateOrUpdater: ((state: WritableDraft<Store>) => void) | Partial<Store> | Store,
		shouldReplace?: boolean | undefined,
	): void;
};

// @public (undocumented)
const mediaStoreWithoutDevtools: Omit<
	Omit<StoreApi<Store>, 'subscribe'> & {
		subscribe: {
			(listener: (selectedState: Store, previousSelectedState: Store) => void): () => void;
			<U>(
				selector: (state: Store) => U,
				listener: (selectedState: U, previousSelectedState: U) => void,
				options?:
					| undefined
					| {
							equalityFn?: ((a: U, b: U) => boolean) | undefined;
							fireImmediately?: boolean | undefined;
					  },
			): () => void;
		};
	},
	'setState'
> & {
	setState(
		nextStateOrUpdater: ((state: WritableDraft<Store>) => void) | Partial<Store> | Store,
		shouldReplace?: boolean | undefined,
	): void;
};

// @public (undocumented)
type NonErrorBaseFileState = {
	name: string;
	size: number;
	mediaType: MediaType;
	mimeType: string;
	preview?: FilePreview | Promise<FilePreview>;
	createdAt?: number;
} & BaseFileState;

// @public (undocumented)
export interface ProcessedFileState extends NonErrorBaseFileState {
	// (undocumented)
	artifacts: MediaFileArtifacts;
	// (undocumented)
	representations?: MediaRepresentations;
	// (undocumented)
	status: 'processed';
}

// @public (undocumented)
export interface ProcessingFailedState extends NonErrorBaseFileState {
	// (undocumented)
	artifacts: Object;
	// (undocumented)
	representations?: MediaRepresentations;
	// (undocumented)
	status: 'failed-processing';
}

// @public (undocumented)
export interface ProcessingFileState extends NonErrorBaseFileState {
	// (undocumented)
	artifacts?: MediaFileArtifacts;
	// (undocumented)
	representations?: MediaRepresentations;
	// (undocumented)
	status: 'processing';
}

// @public (undocumented)
export interface Store {
	// (undocumented)
	files: Record<string, FileState>;
}

// @public (undocumented)
export interface UploadingFileState extends NonErrorBaseFileState {
	// (undocumented)
	progress: number;
	// (undocumented)
	status: 'uploading';
}

// (No @packageDocumentation comment for this package)
```

<!--SECTION END: Main Entry Types-->

### Peer Dependencies

<!--SECTION START: Peer Dependencies-->

```json
{}
```

<!--SECTION END: Peer Dependencies-->
