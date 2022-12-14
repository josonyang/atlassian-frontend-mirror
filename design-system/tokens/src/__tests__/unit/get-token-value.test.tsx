import React from 'react';

import { cleanup, render } from '@testing-library/react';

import warnOnce from '@atlaskit/ds-lib/warn-once';

import getTokenValue from '../../get-token-value';
import setGlobalTheme from '../../set-global-theme';

jest.mock('@atlaskit/ds-lib/warn-once');

(warnOnce as jest.Mock).mockImplementation(() => 42);

const name = process.env._PACKAGE_NAME_ as string;
const version = process.env._PACKAGE_VERSION_ as string;

describe('getTokenValue', () => {
  beforeEach(() => {
    render(
      <>
        <head>
          <style>
            {`
            html {
              --ds-text: #ff0000;
            }
            html[data-color-mode="light"] {
              --ds-text: #00ff00;
            }
            html[data-color-mode="dark"] {
              --ds-text: #0000ff;
            }
            `}
          </style>
        </head>
      </>,
      { container: document.documentElement },
    );
  });
  afterEach(cleanup);

  describe('on non-production environment', () => {
    it('should return the correct value for the current theme', () => {
      // eslint-disable-next-line @atlaskit/design-system/no-unsafe-design-token-usage
      expect(getTokenValue('color.text')).toEqual('#ff0000');
      expect(getTokenValue('color.text', '#000')).toEqual('#ff0000');

      setGlobalTheme('light');
      // eslint-disable-next-line @atlaskit/design-system/no-unsafe-design-token-usage
      expect(getTokenValue('color.text')).toEqual('#00ff00');
      expect(getTokenValue('color.text', '#000')).toEqual('#00ff00');

      setGlobalTheme('dark');
      // eslint-disable-next-line @atlaskit/design-system/no-unsafe-design-token-usage
      expect(getTokenValue('color.text')).toEqual('#0000ff');
      expect(getTokenValue('color.text', '#000')).toEqual('#0000ff');
    });

    it('should log error and return an empty value for non-existing token without fallback', () => {
      // @ts-expect-error
      // eslint-disable-next-line @atlaskit/design-system/no-unsafe-design-token-usage
      const result = getTokenValue('this-token-does-not-exist');

      expect(result).toEqual('');

      expect(warnOnce).toHaveBeenCalledWith(
        `Unknown token id at path: this-token-does-not-exist for ${name}@${version}`,
      );
    });

    it('should log error and use fallback for non-existing token with fallback', () => {
      // @ts-expect-error
      // eslint-disable-next-line @atlaskit/design-system/no-unsafe-design-token-usage
      const result = getTokenValue('this-token-does-not-exist', '#000');

      expect(result).toEqual('#000');

      expect(warnOnce).toHaveBeenCalledWith(
        `Unknown token id at path: this-token-does-not-exist for ${name}@${version}`,
      );
    });
  });

  describe('on production environment', () => {
    let nodeEnv: string | undefined = '';
    beforeEach(() => {
      nodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      process.env.NODE_ENV = nodeEnv;
    });

    it('should return an empty value for non-existing token without fallback', () => {
      // @ts-expect-error
      // eslint-disable-next-line @atlaskit/design-system/no-unsafe-design-token-usage
      const result = getTokenValue('this-token-does-not-exist');
      expect(result).toEqual('');
    });

    it('should return the fallback value for non-existing token with fallback', () => {
      // @ts-expect-error
      // eslint-disable-next-line @atlaskit/design-system/no-unsafe-design-token-usage
      const result = getTokenValue('this-token-does-not-exist', '#000');
      expect(result).toEqual('#000');
    });
  });
});
