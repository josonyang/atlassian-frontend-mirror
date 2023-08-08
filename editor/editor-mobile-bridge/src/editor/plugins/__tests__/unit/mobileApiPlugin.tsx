import React from 'react';
import { act, render } from '@testing-library/react';
import { EditorView } from '@atlaskit/editor-prosemirror/view';

import { hyperlinkPlugin } from '@atlaskit/editor-plugin-hyperlink';
import featureFlagsPlugin from '@atlaskit/editor-plugin-feature-flags';
import {
  createProsemirrorEditorFactory,
  LightEditorPlugin,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';

import { toNativeBridge } from '../../../web-to-native';

const mockCall = jest.spyOn(toNativeBridge, 'call');

import { mobileApiPlugin } from '../../mobileApiPlugin';

function MountHook({ usePluginHook, editorView }: any) {
  usePluginHook({ editorView });
  return null;
}

describe('mobileApiPluign', () => {
  const createEditor = createProsemirrorEditorFactory();
  let editorView: EditorView;
  let editorConfig: any;
  const mockSetPluginInjectionApi = jest.fn();

  const mockBridge = {
    setPluginInjectionApi: mockSetPluginInjectionApi,
  };

  beforeEach(() => {
    const preset = new Preset<LightEditorPlugin>()
      .add([featureFlagsPlugin, {}])
      .add(hyperlinkPlugin)
      // @ts-ignore
      .add([mobileApiPlugin, { bridge: mockBridge }]);

    ({ editorView, editorConfig } = createEditor({
      preset,
    }));

    mockSetPluginInjectionApi.mockClear();
  });

  it('should set the plugin injection API on mount', async () => {
    render(
      <MountHook
        usePluginHook={editorConfig.pluginHooks[0]}
        editorView={editorView}
      />,
    );
    expect(mockSetPluginInjectionApi).toHaveBeenCalledTimes(1);
    expect(mockCall).toHaveBeenCalledTimes(0);
  });

  it('should call the hyperlink listener if the state updates', async () => {
    render(
      <MountHook
        usePluginHook={editorConfig.pluginHooks[0]}
        editorView={editorView}
      />,
    );

    act(() => {
      const {
        state: { tr },
        dispatch,
      } = editorView;
      tr.setMeta('hyperlinkPlugin$', {
        type: 'SHOW_INSERT_TOOLBAR',
        inputMethod: 'toolbar',
      });
      dispatch(tr);
    });

    expect(mockSetPluginInjectionApi).toHaveBeenCalledTimes(1);
    expect(mockCall).toHaveBeenCalledTimes(1);
    expect(mockCall).toHaveBeenCalledWith('linkBridge', 'currentSelection', {
      bottom: -1,
      left: -1,
      right: -1,
      text: '',
      top: -1,
      url: '',
    });
  });
});