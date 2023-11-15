import __noop from '@atlaskit/ds-lib/noop';
import { cleanup, hydrateWithAct, ssr } from '@atlaskit/ssr/emotion';

jest.spyOn(global.console, 'error').mockImplementation(__noop);

afterEach(() => {
  // Check cleanup
  cleanup();
  // reset mocks
  jest.resetAllMocks();
});

const examplePath = require.resolve('../../../examples/0-basic.tsx');

test('should ssr then hydrate badge correctly', async () => {
  const elem = document.createElement('div');
  const { html, styles } = await ssr(examplePath);

  elem.innerHTML = html;
  await hydrateWithAct(examplePath, elem, styles);

  // No other errors from e.g. hydrate
  // eslint-disable-next-line no-console
  const mockCalls = (console.error as jest.Mock).mock.calls;
  expect(mockCalls.length).toBe(0);
});
