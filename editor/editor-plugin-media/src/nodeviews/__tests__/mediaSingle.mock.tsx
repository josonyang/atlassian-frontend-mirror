/** Extracted into its own file so the mock variables can be instantiated before other imports in the test file that would otherwise be hoisted before it */
export const mockHandleExternalMedia = jest.fn();
export const mockHasDifferentContextId = jest.fn();
export const mockCopyNode = jest.fn();
export const mockInsertCaptionAtPos = jest.fn(() => () => () => {});
export const mockSetProps = jest.fn();

jest.mock('../mediaNodeView/media', () => () => null);
jest.mock('../mediaNodeUpdater', () => ({
  ...jest.requireActual('../mediaNodeUpdater'),
  MediaNodeUpdater: jest.fn(() => ({
    updateMediaSingleFileAttrs: jest.fn(),
    getNodeContextId: jest.fn(),
    updateContextId: jest.fn(),
    getRemoteDimensions: jest.fn(),
    getCurrentContextId: jest.fn(),
    isNodeFromDifferentCollection: jest.fn(),
    hasDifferentContextId: mockHasDifferentContextId,
    copyNode: mockCopyNode,
    handleExternalMedia: mockHandleExternalMedia,
    setProps: mockSetProps,
  })),
}));
jest.mock('../../commands/captions', () => ({
  insertAndSelectCaptionFromMediaSinglePos: mockInsertCaptionAtPos,
}));
