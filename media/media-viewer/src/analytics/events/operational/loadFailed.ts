import { FileState } from '@atlaskit/media-client';
import { MediaFileEventPayload } from './_mediaFile';
import { getFileAttributes, MediaViewerFailureAttributes } from '../..';
import {
  getPrimaryErrorReason,
  getSecondaryErrorReason,
  getErrorDetail,
  getRequestMetadata,
  MediaViewerError,
} from '../../../errors';
import { MediaTraceContext } from '@atlaskit/media-common';

export type LoadFailedEventPayload = MediaFileEventPayload<
  MediaViewerFailureAttributes,
  'loadFailed'
>;

export const createLoadFailedEvent = (
  fileId: string,
  error: MediaViewerError,
  fileState?: FileState,
  traceContext?: MediaTraceContext,
): LoadFailedEventPayload => {
  const { fileMediatype, fileMimetype, fileSize } =
    getFileAttributes(fileState);
  return {
    eventType: 'operational',
    actionSubject: 'mediaFile',
    action: 'loadFailed',
    attributes: {
      status: 'fail',
      failReason: getPrimaryErrorReason(error),
      error: getSecondaryErrorReason(error),
      errorDetail: getErrorDetail(error),
      request: getRequestMetadata(error),
      fileAttributes: {
        fileId,
        fileMediatype,
        fileMimetype,
        fileSize,
      },
      traceContext: fileMediatype === 'image' ? traceContext : undefined,
    },
  };
};
