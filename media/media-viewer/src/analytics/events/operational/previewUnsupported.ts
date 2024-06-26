import { type FileState } from '@atlaskit/media-client';
import { type WithFileAttributes } from '@atlaskit/media-common';
import { type MediaFileEventPayload } from './_mediaFile';
import { getFileAttributes } from '../..';

export type PreviewUnsupportedAttributes = WithFileAttributes;

export type PreviewUnsupportedEventPayload = MediaFileEventPayload<
	PreviewUnsupportedAttributes,
	'previewUnsupported'
>;

export const createPreviewUnsupportedEvent = (
	fileState: FileState,
): PreviewUnsupportedEventPayload => {
	const { fileId, fileMediatype, fileMimetype, fileSize } = getFileAttributes(fileState);
	return {
		eventType: 'operational',
		actionSubject: 'mediaFile',
		action: 'previewUnsupported',
		attributes: {
			fileAttributes: {
				fileId,
				fileMediatype,
				fileMimetype,
				fileSize,
			},
		},
	};
};
