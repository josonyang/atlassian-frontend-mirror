import noop from '@atlaskit/ds-lib/noop';
import { cleanup, hydrate, ssr } from '@atlaskit/ssr/emotion';

test('should ssr then hydrate tabs correctly', async () => {
  const examplePath = require.resolve('../../../examples/00-default-tabs.tsx');
  const consoleMock = jest.spyOn(console, 'error').mockImplementation(noop);
  const elem = document.createElement('div');
  const { html, styles } = await ssr(examplePath);
  elem.innerHTML = html;
  hydrate(examplePath, elem, styles);

  // eslint-disable-next-line no-console
  const mockCalls = (console.error as jest.Mock).mock.calls;
  expect(mockCalls.length).toBe(0);

  cleanup();
  consoleMock.mockRestore();
});
