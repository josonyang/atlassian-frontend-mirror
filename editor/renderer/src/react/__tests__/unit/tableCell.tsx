import React from 'react';
import { render } from '@testing-library/react';
import { TableCell } from '../../nodes/tableCell';

import { setGlobalTheme } from '@atlaskit/tokens';
import { ffTest } from '@atlassian/feature-flags-test-utils';

describe('custom table cell background colors inversion in dark mode', () => {
  it('inverts in dark mode', async () => {
    await setGlobalTheme({ colorMode: 'dark' });
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell background="#ff00cc">test</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const td = container.querySelector('td')!;
    expect(td!).toHaveStyle('background-color: #00FF33');
  });

  it('does not invert in light mode', async () => {
    await setGlobalTheme({ colorMode: 'light' });
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell background="#ff00cc">test</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const td = container.querySelector('td')!;
    expect(td!).toHaveStyle('background-color: #ff00cc');
  });
});

describe('feature flag uses LCH color inversion in dark mode', () => {
  ffTest(
    'platform.editor.use-lch-for-color-inversion_1qv8ol',
    async () => {
      await setGlobalTheme({ colorMode: 'dark' });
      const { container } = render(
        <table>
          <tbody>
            <tr>
              <TableCell background="#ff00cc">test</TableCell>
            </tr>
          </tbody>
        </table>,
      );

      const td = container.querySelector('td')!;
      expect(td!).toHaveStyle('background-color: #CE00A1');
    },
    async () => {
      await setGlobalTheme({ colorMode: 'dark' });
      const { container } = render(
        <table>
          <tbody>
            <tr>
              <TableCell background="#ff00cc">test</TableCell>
            </tr>
          </tbody>
        </table>,
      );

      const td = container.querySelector('td')!;
      expect(td!).toHaveStyle('background-color: #00FF33');
    },
  );
});
