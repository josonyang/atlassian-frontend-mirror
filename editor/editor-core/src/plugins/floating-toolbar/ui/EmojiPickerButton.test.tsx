import React from 'react';
import { mountWithIntl } from '../../../__tests__/__helpers/enzyme';
/* eslint-disable import/no-extraneous-dependencies -- Removed from package.json to fix  circular depdencies */
import type { LightEditorPlugin } from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import {
  createProsemirrorEditorFactory,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import { doc, p, panel } from '@atlaskit/editor-test-helpers/doc-builder';
/* eslint-disable import/no-extraneous-dependencies -- Removed from package.json to fix  circular depdencies */

import { EmojiPickerButton } from './EmojiPickerButton';
import type { ReactWrapper } from 'enzyme';
import panelPlugin from '../../panel';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { getTestEmojiResource } from '@atlaskit/util-data-test/get-test-emoji-resource';
import { act } from 'react-dom/test-utils';
import { decorationsPlugin } from '@atlaskit/editor-plugin-decorations';

describe('emoji-picker-button', () => {
  const createEditor = createProsemirrorEditorFactory();
  let wrapper: ReactWrapper;
  let onChangeMock: jest.Mock<any, any>;

  const providerFactory = new ProviderFactory();

  const panelPreset = new Preset<LightEditorPlugin>()
    .add(decorationsPlugin)
    .add([
      panelPlugin,
      {
        allowCustomPanel: true,
      },
    ]);

  beforeEach(() => {
    const { editorView } = createEditor({
      doc: doc(panel({ panelType: 'info' })(p('{<>}'))),
      preset: panelPreset,
      providerFactory,
    });
    providerFactory.setProvider(
      'emojiProvider',
      Promise.resolve(getTestEmojiResource()),
    );
    onChangeMock = jest.fn();
    wrapper = mountWithIntl(
      <EmojiPickerButton
        editorView={editorView}
        providerFactory={providerFactory}
        onChange={onChangeMock}
      />,
    );
  });

  afterEach(() => {
    providerFactory.removeProvider('emojiProvider');
    wrapper && wrapper.unmount();
  });

  it('should render a button', () => {
    expect(wrapper.find('button')).toHaveLength(1);
    // ensure no popup is rendered
    expect(wrapper.find('Popup')).toHaveLength(0);
  });

  it('should show a EmojiPicker popup after clicking button', () => {
    // popup still not shown before the click
    wrapper.find('button').simulate('click');

    // show the popup
    expect(wrapper.find('Popup')).toHaveLength(1);
  });

  it('should hide popup and call onChange after selecting an emoji', () => {
    // click the button
    wrapper.find('button').simulate('click');

    // make sure the popup and picker are shown
    expect(wrapper.find('Popup')).toHaveLength(1);

    const emojiPicker = wrapper.find('EmojiPickerInternal').instance();
    // calling mock callback
    act(() => {
      (emojiPicker.props as any).onSelection({
        shortName: ':smiley:',
      });
    });
    // make sure the on change callback is called
    expect(onChangeMock).toBeCalledWith({
      shortName: ':smiley:',
    });

    wrapper.update();
    // make sure popup is hidden
    expect(wrapper.find('Popup')).toHaveLength(0);
  });
});
