// eslint-disable-next-line import/no-extraneous-dependencies
import type { NextEditorPlugin } from '@atlaskit/editor-common/types';

import { EditorPluginInjectionAPI, EditorPresetBuilder } from '../../preset';

describe('Editor EditorPresetBuilder - build', () => {
  describe('when plugin is create', () => {
    it('should send the pluginInjectionAPI.api() result as parameter', () => {
      const fakeAPI = {};
      const pluginInjectionAPIFake = {
        api: jest.fn().mockReturnValue(fakeAPI),
        onEditorPluginInitialized: jest.fn(),
      } as any;

      const plugin1: NextEditorPlugin<'one'> = jest.fn(({ api }) => {
        return {
          name: 'one',
        };
      });

      new EditorPresetBuilder().add(plugin1).build({
        pluginInjectionAPI: pluginInjectionAPIFake,
      });

      expect(plugin1).toHaveBeenCalledWith({ config: undefined, api: fakeAPI });
    });

    it('should call onEditorPluginInitialized', () => {
      const pluginInjectionAPIFake = {
        api: jest.fn().mockReturnValue({}),
        onEditorPluginInitialized: jest.fn(),
      } as any;
      const one = {
        name: 'one',
      };
      // @ts-ignore
      const plugin1: NextEditorPlugin<'one'> = ({ api }) => {
        return one;
      };
      const two = {
        name: 'two',
      };
      // @ts-ignore
      const plugin2: NextEditorPlugin<'two'> = ({ api }) => {
        return two;
      };
      new EditorPresetBuilder().add(plugin1).add(plugin2).build({
        pluginInjectionAPI: pluginInjectionAPIFake,
      });

      expect(
        pluginInjectionAPIFake.onEditorPluginInitialized,
      ).toHaveBeenNthCalledWith(2, two);
      expect(
        pluginInjectionAPIFake.onEditorPluginInitialized,
      ).toHaveBeenNthCalledWith(1, one);
    });

    describe('when is specified on excludePlugins', () => {
      it('should not call onEditorPluginInitialized', () => {
        const pluginInjectionAPIFake = {
          api: jest.fn().mockReturnValue({}),
          onEditorPluginInitialized: jest.fn(),
        } as any;
        const one = {
          name: 'one',
        };
        // @ts-ignore
        const plugin1: NextEditorPlugin<'one'> = ({ api }) => {
          return one;
        };
        const two = {
          name: 'two',
        };
        // @ts-ignore
        const plugin2: NextEditorPlugin<'two'> = ({ api }) => {
          return two;
        };
        const three = {
          name: 'three',
        };
        // @ts-ignore
        const plugin3: NextEditorPlugin<'three'> = ({ api }) => {
          return three;
        };
        new EditorPresetBuilder()
          .add(plugin1)
          .add(plugin2)
          .add(plugin3)
          .build({
            pluginInjectionAPI: pluginInjectionAPIFake,
            excludePlugins: new Set(['two']),
          });

        expect(
          pluginInjectionAPIFake.onEditorPluginInitialized,
        ).toHaveBeenNthCalledWith(1, one);
        expect(
          pluginInjectionAPIFake.onEditorPluginInitialized,
        ).toHaveBeenNthCalledWith(2, three);
      });
    });
  });

  describe('when using a real PluginInjectionAPI', () => {
    it('should enable external plugins to be called in the initialisation function', () => {
      const fakefn = jest.fn();
      const plugin1: NextEditorPlugin<'one', { sharedState: number }> = ({
        api,
      }) => {
        return {
          name: 'one',
          getSharedState: (editorState) => {
            fakefn();
            return 12;
          },
        };
      };
      const plugin2: NextEditorPlugin<
        'two',
        { dependencies: [typeof plugin1] }
      > = ({ api }) => {
        api?.one.sharedState.currentState();
        return {
          name: 'two',
        };
      };

      const pluginInjectionAPI = new EditorPluginInjectionAPI({
        // We don't care about the editor state
        // @ts-ignore
        getEditorState: () => {
          return 1;
        },
      });
      new EditorPresetBuilder().add(plugin1).add(plugin2).build({
        pluginInjectionAPI,
      });

      expect(fakefn).toHaveBeenCalled();
    });

    it('should not allow another core plugin to be added', () => {
      const fakefn = jest.fn();
      const plugin1: NextEditorPlugin<'core', { sharedState: number }> = ({
        api,
      }) => {
        return {
          name: 'core',
          getSharedState: (editorState) => {
            fakefn();
            return 12;
          },
        };
      };

      const pluginInjectionAPI = new EditorPluginInjectionAPI({
        // We don't care about the editor state
        // @ts-ignore
        getEditorState: () => {
          return 1;
        },
      });
      expect(() => {
        new EditorPresetBuilder().add(plugin1).build({
          pluginInjectionAPI,
        });
      }).toThrowError(
        'Plugin core has already been initialised in the Editor API!',
      );
    });
  });
});
