import { type WithFileAttributes } from '@atlaskit/media-common';
import { type FileStatus, type FileState } from '@atlaskit/media-client';
import { getFileAttributes } from '../..';
import { type ButtonClickEventPayload } from './_clickedButton';
import {
	type PrimaryErrorReason,
	getPrimaryErrorReason,
	type MediaViewerError,
} from '../../../errors';

export type FailedPreviewDownloadButtonClickedAttributes = WithFileAttributes & {
	fileProcessingStatus: FileStatus;
	failReason: PrimaryErrorReason;
};

export type FailedPreviewDownloadButtonClickedEventPayload =
	ButtonClickEventPayload<FailedPreviewDownloadButtonClickedAttributes>;

export const createFailedPreviewDownloadButtonClickedEvent = (
	fileState: FileState,
	error: MediaViewerError,
): FailedPreviewDownloadButtonClickedEventPayload => {
	const { fileId, fileMediatype, fileMimetype, fileSize } = getFileAttributes(fileState);
	return {
		eventType: 'ui',
		action: 'clicked',
		actionSubject: 'button',
		actionSubjectId: 'failedPreviewDownloadButton',
		attributes: {
			failReason: getPrimaryErrorReason(error),
			fileAttributes: {
				fileId,
				fileMediatype,
				fileMimetype,
				fileSize,
			},
			fileProcessingStatus: fileState.status,
		},
	};
};
