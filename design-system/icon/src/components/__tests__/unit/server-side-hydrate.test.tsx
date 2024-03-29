import __noop from '@atlaskit/ds-lib/noop';
import React from 'react';
import ReactDOM from 'react-dom';

import { getExamplesFor, ssr } from '@atlaskit/ssr';
import waitForExpect from 'wait-for-expect';

type File = {
  filePath: string;
};

jest.spyOn(global.console, 'error').mockImplementation(__noop);

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

test('should ssr then hydrate icon correctly', async () => {
  const examples: File[] = await getExamplesFor('@atlaskit/icon');
  const example = examples.find(({ filePath }) =>
    filePath.includes('size-example'),
  )!;
  const Example = require(example.filePath).default;
  const elem = document.createElement('div');
  elem.innerHTML = await ssr(example.filePath);
  ReactDOM.hydrate(<Example />, elem);
  await waitForExpect(() => {
    // eslint-disable-next-line no-console
    const mockCalls = (console.error as jest.Mock).mock.calls.filter(
      ([f, s]) =>
        !(
          f ===
            'Warning: Did not expect server HTML to contain a <%s> in <%s>.%s' &&
          s === 'style'
        ),
    );
    expect(mockCalls.length).toBe(0);
  });
});
