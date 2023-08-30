export { StoryBookAuthProvider } from './authProvider';
export {
  createStorybookMediaClient,
  createStorybookMediaClientConfig,
  createUploadMediaClient,
  createUploadMediaClientConfig,
  defaultBaseUrl,
  defaultParams,
} from './mediaClientProvider';
export {
  collectionNames,
  defaultCollectionName,
  defaultMediaPickerCollectionName,
  fileCollectionName,
  onlyAnimatedGifsCollectionName,
} from './collectionNames';
export {
  animatedFileId,
  archiveFileId,
  atlassianLogoUrl,
  audioFileDetails,
  audioFileId,
  audioNoCoverFileId,
  bigDocFileId,
  docFileDetails,
  docFileId,
  emptyImageFileId,
  errorFileId,
  externalImageIdentifier,
  externalSmallImageIdentifier,
  externaBrokenlIdentifier,
  genericDataURI,
  genericFileDetails,
  genericFileId,
  gifFileId,
  imageFileDetails,
  imageFileId,
  largeImageFileId,
  largePdfFileId,
  noMetadataFileId,
  passwordProtectedPdfFileId,
  smallImageFileId,
  unknownFileDetails,
  unknownFileId,
  verticalImageFileId,
  videoFileDetails,
  videoFileId,
  videoHorizontalFileId,
  videoLargeFileId,
  videoProcessingFailedId,
  videoSquareFileId,
  wideImageFileId,
  zipFileId,
  zipFileWithNestedFolderId,
  zipItemLargeInnerFileId,
  zipItemMultipleFoldersAtRootId,
  zipJiraArchiveFileId,
  zipEncryptedFileId,
  codeFileId,
  emailFileId,
  emailUnsupportedFileId,
  vrVideoDetails,
} from './exampleMediaItems';
export const authProviderBaseURL = 'https://media.dev.atl-paas.net';
export {
  mediaPickerAuthProvider,
  defaultMediaPickerAuthProvider,
} from './mediaPickerAuthProvider';
export { fakeMediaClient } from './fakeMediaClient';
