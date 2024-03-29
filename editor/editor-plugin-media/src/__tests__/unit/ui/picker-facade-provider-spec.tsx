import React from 'react';

import { render } from '@testing-library/react';

import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import type { ProviderHandler } from '@atlaskit/editor-common/src/provider-factory/types';
import { getDefaultMediaClientConfig } from '@atlaskit/media-test-helpers';

import type { MediaProvider } from '../../../pm-plugins/main';
import type { MediaPluginState } from '../../../pm-plugins/types';
import PickerFacadeProvider from '../../../ui/MediaPicker/PickerFacadeProvider';

import * as mocks from './picker-facade-provider-spec.mock';

describe('PickerFacadeProvider', () => {
  let pluginState: MediaPluginState;
  let provider: MediaProvider;
  const dummyMediaClientConfig = getDefaultMediaClientConfig();

  beforeEach(() => {
    pluginState = {} as MediaPluginState;
    provider = {} as MediaProvider;
    provider.uploadParams = {};
    provider.uploadMediaClientConfig = dummyMediaClientConfig;

    const providerFactory = new ProviderFactory();
    jest
      .spyOn(providerFactory, 'subscribe')
      .mockImplementation((_name: string, cb: ProviderHandler) => {
        cb(_name, Promise.resolve(provider));
      });

    providerFactory.unsubscribe = jest.fn();

    pluginState.insertFile = jest.fn();
    pluginState.options = {
      providerFactory,
      nodeViews: {},
      allowResizing: false,
    };
    jest.spyOn(global.console, 'warn');
    jest.spyOn(global.console, 'error');
  });

  afterEach(() => {
    (global.console.warn as jest.Mock).mockRestore();
    (global.console.error as jest.Mock).mockRestore();
    jest.clearAllMocks();
  });

  it('should initialize PickerFacade properly', async () => {
    render(
      <PickerFacadeProvider
        mediaState={pluginState}
        analyticsName="analyticsNameTest"
      >
        {({ mediaClientConfig, config, pickerFacadeInstance }) => {
          expect(pickerFacadeInstance).toBe(mocks.picker);
          expect(mediaClientConfig).toBe(dummyMediaClientConfig);
          expect(config).toEqual({
            uploadParams: provider.uploadParams,
          });

          expect(mocks.mockMediaPickerFacade).toBeCalled();
          expect(mocks.mockMediaPickerFacade.mock.calls[0][0]).toBe(
            'customMediaPicker',
          );
          expect(mocks.picker.init).toBeCalled();

          expect(mocks.picker.onNewMedia).toBeCalledWith(
            pluginState.insertFile,
          );
          expect(mocks.picker.setUploadParams).toBeCalledWith(
            provider.uploadParams,
          );
          expect.assertions(8);
          return null;
        }}
      </PickerFacadeProvider>,
    );
  });

  it('should call pluginState.options.providerFactory.unsubscribe when component is unmounted', () => {
    const { unmount } = render(
      <PickerFacadeProvider
        mediaState={pluginState}
        analyticsName="analyticsNameTest"
      >
        {() => null}
      </PickerFacadeProvider>,
    );
    unmount();
    expect(pluginState.options.providerFactory.unsubscribe).toBeCalled();
  });

  it('should not render children if mediaClientConfig is not defined', () => {
    provider.uploadMediaClientConfig = Promise.resolve() as any;
    const { container: wrapper } = render(
      <PickerFacadeProvider
        mediaState={pluginState}
        analyticsName="analyticsNameTest"
      >
        {() => {
          throw new Error();
        }}
      </PickerFacadeProvider>,
    );
    expect(wrapper).toBeDefined();
    /* eslint-disable no-console */
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    /* eslint-enable no-console */
  });

  it('should not render children if config is not defined', () => {
    provider.uploadParams = undefined;
    const { container: wrapper } = render(
      <PickerFacadeProvider
        mediaState={pluginState}
        analyticsName="analyticsNameTest"
      >
        {() => {
          throw new Error();
        }}
      </PickerFacadeProvider>,
    );
    expect(wrapper).toBeDefined();
    /* eslint-disable no-console */
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    /* eslint-enable no-console */
  });
});
