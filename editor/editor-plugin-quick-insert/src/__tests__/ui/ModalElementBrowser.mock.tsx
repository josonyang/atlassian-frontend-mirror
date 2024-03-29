/** Extracted into its own file so the mock variables can be instantiated before other imports in the test file that would otherwise be hoisted before it */
export const mockSearch = jest.fn();
const mockCommand = (nestedMock?: jest.Mock) => {
  return jest.fn().mockImplementation(() => nestedMock || jest.fn());
};

jest.doMock('../../commands', () => {
  return {
    closeElementBrowserModal: mockCommand(),
    insertItem: mockCommand(),
    openElementBrowserModal: mockCommand(),
  };
});
