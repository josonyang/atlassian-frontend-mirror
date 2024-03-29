import type { Dispatch } from '@atlaskit/editor-common/event-dispatcher';
import type {
  ContextIdentifierProvider,
  ProviderFactory,
} from '@atlaskit/editor-common/provider-factory';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { PluginKey } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';

export const stateKey = new PluginKey('contextIdentiferPlugin');

export interface PluginState {
  contextIdentifierProvider?: ContextIdentifierProvider;
}

export const getContextIdentifier = (state?: EditorState) => {
  if (state) {
    return (stateKey.getState(state) as PluginState)?.contextIdentifierProvider;
  }
};

export default (dispatch: Dispatch, providerFactory?: ProviderFactory) =>
  new SafePlugin({
    key: stateKey,
    state: {
      init: () => ({}),
      apply: (tr, pluginState) => {
        if (tr.getMeta(stateKey)) {
          return tr.getMeta(stateKey);
        }

        return pluginState;
      },
    },
    view: (view: EditorView) => {
      const providerPromiseHandler = (
        name: string,
        providerPromise?: Promise<ContextIdentifierProvider>,
      ) => {
        if (providerPromise && name === 'contextIdentifierProvider') {
          providerPromise.then((provider: ContextIdentifierProvider) => {
            const tr = view.state.tr.setMeta(stateKey, {
              contextIdentifierProvider: { ...provider },
            } as PluginState);

            view.dispatch(tr);
          });
        }
      };

      if (providerFactory) {
        providerFactory.subscribe(
          'contextIdentifierProvider',
          providerPromiseHandler,
        );
      }

      return {
        destroy: () => {
          providerFactory &&
            providerFactory.unsubscribe(
              'contextIdentifierProvider',
              providerPromiseHandler,
            );
        },
      };
    },
  });
