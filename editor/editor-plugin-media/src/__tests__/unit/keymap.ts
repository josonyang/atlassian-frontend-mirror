import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, p } from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import sendKeyToPm from '@atlaskit/editor-test-helpers/send-key-to-pm';

import { mediaEditor, temporaryMediaGroup } from './_utils';

describe('media - keymaps', () => {
  const providerFactory = new ProviderFactory();

  afterEach(() => {
    providerFactory.destroy();
  });

  describe('Mod-z keypress', () => {
    it('does not detect links', () => {
      const { editorView, pluginState } = mediaEditor(doc(p('{<>}')));

      sendKeyToPm(editorView, 'Mod-z');

      expect(pluginState.ignoreLinks).toBe(true);
    });
  });

  describe('Enter keypress', () => {
    it('splits media group', () => {
      const { editorView, pluginState } = mediaEditor(doc(p('{<>}')));
      const splitMediaGroupSpy = jest.spyOn(pluginState, 'splitMediaGroup');

      sendKeyToPm(editorView, 'Enter');

      expect(splitMediaGroupSpy).toHaveBeenCalled();
    });
  });

  describe('Shift-Enter keypress', () => {
    it('splits media group', () => {
      const { editorView, pluginState } = mediaEditor(doc(temporaryMediaGroup));

      const splitMediaGroupSpy = jest.spyOn(pluginState, 'splitMediaGroup');

      sendKeyToPm(editorView, 'Shift-Enter');
      expect(splitMediaGroupSpy).toHaveBeenCalled();
    });
  });
});
