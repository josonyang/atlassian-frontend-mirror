jest.mock('@atlaskit/editor-common/ui', () => {
  return {
    ...jest.requireActual<Object>('@atlaskit/editor-common/ui'),
    findOverflowScrollParent: jest.fn(),
  };
});

jest.mock('@atlaskit/editor-common/hooks', () => {
  const fakeUseSharedPluginState = jest.fn().mockReturnValue({
    focusState: {
      hasFocus: true,
    },
  });

  return {
    ...jest.requireActual<Object>('@atlaskit/editor-common/hooks'),
    useSharedPluginState: fakeUseSharedPluginState,
  };
});

jest.mock('../../../ui/MediaPicker/PickerFacadeProvider.tsx', () => {
  const {
    getDefaultMediaClientConfig,
  } = require('@atlaskit/media-test-helpers');
  const picker: any = {
    on: jest.fn(),
    onClose: jest.fn(),
    onNewMedia: jest.fn(),
    onMediaEvent: jest.fn(),
    onDrag: jest.fn(),
    hide: jest.fn(),
    setUploadParams: jest.fn(),
    show: jest.fn(),
    deactivate: jest.fn(),
    activate: jest.fn(),
    destroy: jest.fn(),
    type: 'popup',
  };
  picker.init = jest.fn().mockReturnValue(picker);
  return ({ children }: Props) =>
    children({
      mediaClientConfig: getDefaultMediaClientConfig(),
      config: {
        uploadParams: {},
      },
      pickerFacadeInstance: picker,
    });
});

import React from 'react';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { render } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { findOverflowScrollParent } from '@atlaskit/editor-common/ui';
import {
  Browser as BrowserComponent,
  Clipboard as ClipboardComponent,
  Dropzone as DropzoneComponent,
} from '@atlaskit/media-picker';
import { asMock } from '@atlaskit/media-test-helpers';

import type { MediaPluginState } from '../../../pm-plugins/types';
import { MediaPickerComponents } from '../../../ui/MediaPicker';
import { BrowserWrapper } from '../../../ui/MediaPicker/BrowserWrapper';
import { ClipboardWrapper } from '../../../ui/MediaPicker/ClipboardWrapper';
import { DropzoneWrapper } from '../../../ui/MediaPicker/DropzoneWrapper';
import type { Props } from '../../../ui/MediaPicker/PickerFacadeProvider';

describe('MediaPickerComponents', () => {
  let pluginState: MediaPluginState;
  let wrapper: ReactWrapper<MediaPickerComponents>;
  const customDropzoneContainer = document.createElement('div');
  const editorDomElement = document.createElement('div');
  editorDomElement.setAttribute('id', 'editor-element');

  beforeEach(() => {
    pluginState = {} as MediaPluginState;
    pluginState.handleDrag = jest.fn();
    pluginState.options = {
      providerFactory: {} as any,
      nodeViews: {},
      allowResizing: false,
      customDropzoneContainer,
    };
    pluginState.onPopupToggle = jest.fn();
    pluginState.setBrowseFn = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    asMock(findOverflowScrollParent).mockReset();
  });

  it('should subscribe to mediaState.onPopupToggle on mount', () => {
    render(
      <MediaPickerComponents
        editorDomElement={editorDomElement}
        mediaState={pluginState}
        appearance="full-page"
        api={undefined}
      />,
    );
    expect(pluginState.onPopupToggle).toBeCalled();
  });

  it('should change state when mediaState.onPopupToggle is called', () => {
    let callback: (isOpen: boolean) => void = () => {};
    pluginState.onPopupToggle = cb => (callback = cb);
    wrapper = mount(
      <MediaPickerComponents
        editorDomElement={editorDomElement}
        mediaState={pluginState}
        appearance="full-page"
        api={undefined}
      />,
    );
    act(() => {
      callback(true);
    });
    expect(wrapper.state()).toHaveProperty('isPopupOpened', true);
    act(() => {
      callback(false);
    });
    expect(wrapper.state()).toHaveProperty('isPopupOpened', false);
  });

  it('should render <ClipboardWrapper /> component when editor is focused', () => {
    wrapper = mount(
      <MediaPickerComponents
        editorDomElement={editorDomElement}
        mediaState={pluginState}
        appearance="full-page"
        api={undefined}
      />,
    );
    expect(wrapper.find(ClipboardWrapper)).toHaveLength(1);
    expect(wrapper.find(ClipboardWrapper).prop('mediaState')).toBe(pluginState);
    expect(wrapper.find(ClipboardComponent)).toHaveLength(1);
  });

  describe('<BrowserWrapper />', () => {
    it('should render <BrowserWrapper /> component', () => {
      wrapper = mount(
        <MediaPickerComponents
          editorDomElement={editorDomElement}
          mediaState={pluginState}
          appearance="full-page"
          api={undefined}
        />,
      );
      expect(wrapper.find(BrowserWrapper)).toHaveLength(1);
      expect(wrapper.find(BrowserWrapper).prop('mediaState')).toBe(pluginState);
      expect(wrapper.find(BrowserComponent)).toHaveLength(1);
      expect(pluginState.setBrowseFn).toBeCalled();
    });

    it('should render <Browser /> with multiple: true (allows for multiple select of files) as a prop', () => {
      wrapper = mount(
        <MediaPickerComponents
          editorDomElement={editorDomElement}
          mediaState={pluginState}
          appearance="full-page"
          api={undefined}
        />,
      );
      const browser = wrapper.find(BrowserComponent);

      expect(browser.prop('config')).toEqual({
        multiple: true,
        uploadParams: {},
      });
    });
  });

  describe('<DropzoneWrapper />', () => {
    it('should render <DropzoneWrapper /> component', () => {
      wrapper = mount(
        <MediaPickerComponents
          editorDomElement={editorDomElement}
          mediaState={pluginState}
          appearance="full-page"
          api={undefined}
        />,
      );
      expect(wrapper.find(DropzoneWrapper)).toHaveLength(1);
    });

    it('should set prop isActive=true to DropzoneWrapper when state.isPopupOpened=false', () => {
      wrapper = mount(
        <MediaPickerComponents
          editorDomElement={editorDomElement}
          mediaState={pluginState}
          appearance="full-page"
          api={undefined}
        />,
      );
      act(() => {
        wrapper.setState({
          isPopupOpened: true,
        });
        wrapper.setState({
          isPopupOpened: false,
        });
      });
      expect(wrapper.find(DropzoneWrapper).prop('isActive')).toBeTruthy();
      expect(
        wrapper.find(DropzoneWrapper).find(DropzoneComponent),
      ).toHaveLength(1);
    });

    it('should set prop isActive=false to DropzoneWrapper when state.isPopupOpened=true', () => {
      wrapper = mount(
        <MediaPickerComponents
          editorDomElement={editorDomElement}
          mediaState={pluginState}
          appearance="full-page"
          api={undefined}
        />,
      );
      act(() => {
        wrapper.setState({
          isPopupOpened: true,
        });
      });
      expect(wrapper.find(DropzoneWrapper).prop('isActive')).toBeFalsy();
      expect(
        wrapper.find(DropzoneWrapper).find(DropzoneComponent),
      ).toHaveLength(0);
    });

    it('should use customDropzoneContainer when available', () => {
      wrapper = mount(
        <MediaPickerComponents
          editorDomElement={editorDomElement}
          mediaState={pluginState}
          appearance="full-page"
          api={undefined}
        />,
      );
      expect(wrapper.find(DropzoneComponent)).toHaveLength(1);
      expect(wrapper.find(DropzoneComponent).prop('config')).toEqual({
        container: customDropzoneContainer,
        uploadParams: {},
      });
    });

    it('should use scroll container for full page editor', () => {
      const scrollContainer = document.createElement('div');
      asMock(findOverflowScrollParent).mockRejectedValue(scrollContainer);
      wrapper = mount(
        <MediaPickerComponents
          editorDomElement={editorDomElement}
          mediaState={pluginState}
          appearance="full-page"
          api={undefined}
        />,
      );
      expect(wrapper.find(DropzoneComponent)).toHaveLength(1);
      expect(wrapper.find(DropzoneComponent).prop('config')).toEqual({
        container: scrollContainer,
        uploadParams: {},
      });
    });

    it('should default to editor dom element if customDropzoneContainer is not defined', () => {
      pluginState.options.customDropzoneContainer = undefined;
      wrapper = mount(
        <MediaPickerComponents
          editorDomElement={editorDomElement}
          mediaState={pluginState}
          appearance="full-page"
          api={undefined}
        />,
      );
      expect(wrapper.find(DropzoneComponent)).toHaveLength(1);
      expect(wrapper.find(DropzoneComponent).prop('config')).toEqual({
        container: editorDomElement,
        uploadParams: {},
      });
    });
  });
});
