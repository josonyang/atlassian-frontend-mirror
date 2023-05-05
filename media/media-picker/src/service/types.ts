import { MediaFeatureFlags } from '@atlaskit/media-common';
import {
  UploadEndEventPayload,
  UploadErrorEventPayload,
  UploadPreviewUpdateEventPayload,
  UploadsStartEventPayload,
  UploadParams,
} from '../types';

export type UploadServiceEventPayloadTypes = {
  readonly 'files-added': UploadsStartEventPayload;
  readonly 'file-preview-update': UploadPreviewUpdateEventPayload;
  readonly 'file-converting': UploadEndEventPayload;
  readonly 'file-upload-error': UploadErrorEventPayload;
  readonly 'file-dropped': DragEvent;
};

export type UploadServiceEventListener<
  E extends keyof UploadServiceEventPayloadTypes,
> = (payload: UploadServiceEventPayloadTypes[E]) => void;

export const MAX_FILE_SIZE_FOR_PREVIEW = 10e6; // 10 MB

export interface UploadService {
  setUploadParams(uploadParams: UploadParams): void;
  addFile(
    file: File,
    replaceFileId?: string,
    featureFlags?: MediaFeatureFlags,
  ): void;
  addFiles(files: File[], featureFlags?: MediaFeatureFlags): void;
  addFilesWithSource(
    files: LocalFileWithSource[],
    featureFlags?: MediaFeatureFlags,
  ): Promise<void>;
  cancel(id?: string): void;
  on<E extends keyof UploadServiceEventPayloadTypes>(
    event: E,
    listener: UploadServiceEventListener<E>,
  ): void;
  off<E extends keyof UploadServiceEventPayloadTypes>(
    event: E,
    listener: UploadServiceEventListener<E>,
  ): void;
  onFileRejection(handler: (rejectionData: RejectionData) => void): void;
}

export type RejectionData = {
  reason: 'fileSizeLimitExceeded';
  file: File;
  limit: number;
};

export enum LocalFileSource {
  PastedFile = 'pastedFile',
  PastedScreenshot = 'pastedScreenshot',
  LocalUpload = 'localUpload',
}

export interface LocalFileWithSource {
  file: File;
  source: LocalFileSource;
  replaceFileId?: string;
}
