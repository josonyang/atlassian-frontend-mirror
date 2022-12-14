import {
  SuccessAttributes,
  WithFileAttributes,
  FileAttributes,
  MediaTraceContext,
  WithTraceContext,
} from '@atlaskit/media-common';
import { MediaFileEventPayload } from './_mediaFile';

export type LoadSucceededAttributes = SuccessAttributes &
  WithFileAttributes &
  WithTraceContext;

export type LoadSucceededEventPayload = MediaFileEventPayload<
  LoadSucceededAttributes,
  'loadSucceeded'
>;

export const createLoadSucceededEvent = (
  { fileId, fileMediatype, fileMimetype, fileSize }: FileAttributes,
  traceContext?: MediaTraceContext,
): LoadSucceededEventPayload => {
  return {
    eventType: 'operational',
    actionSubject: 'mediaFile',
    action: 'loadSucceeded',
    attributes: {
      status: 'success',
      fileMediatype,
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
