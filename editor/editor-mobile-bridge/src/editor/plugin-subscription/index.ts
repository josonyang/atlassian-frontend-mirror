import type { PluginKey } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import rafSchedule from 'raf-schd';
import type {
  EventDispatcher,
  HistoryPluginState,
  SelectionDataState,
  TextColorPluginState,
} from '@atlaskit/editor-core';
import {
  textColorPluginKey,
  historyPluginKey,
  selectionPluginKey,
} from '@atlaskit/editor-core';
import type WebBridgeImpl from '../native-to-web';
import { toNativeBridge } from '../web-to-native';
import { createPromise } from '../../cross-platform-promise';
import { getSelectionObserverEnabled } from '../../query-param-reader';
import EditorConfiguration from '../editor-configuration';

interface BridgePluginListener<T> {
  bridge: string;
  pluginKey: PluginKey;
  updateAfterDom?: boolean;
  updater: (
    pluginState: T,
    view?: EditorView,
    initialPass?: boolean,
    bridge?: WebBridgeImpl,
  ) => void;
  sendInitialState?: boolean;
}

interface SerialisedTextColor {
  color: string | null;
  disabled?: boolean | undefined;
  borderColorPalette?: {
    [color: string]: string; // Hex
  };
  palette?: {
    [color: string]: string; // Hex
  };
}

const createListenerConfig = <T>(config: BridgePluginListener<T>) => config;

export const configFactory = (
  editorConfiguration: EditorConfiguration,
): Array<BridgePluginListener<any>> => {
  const configs: Array<BridgePluginListener<any>> = [
    createListenerConfig<TextColorPluginState>({
      bridge: 'textFormatBridge',
      pluginKey: textColorPluginKey,
      updater: (pluginState, _view, initialPass) => {
        let color = pluginState.color || null;
        let serialisedState: SerialisedTextColor = {
          color,
          disabled: pluginState.disabled,
        };

        if (initialPass) {
          let palette = Object.create(null);
          let borderColorPalette = Object.create(null);

          for (let { value, label, border } of pluginState.palette) {
            borderColorPalette[label.toLowerCase().replace(' ', '-')] = border;
            palette[label] = value;
          }

          serialisedState = {
            ...pluginState,
            color,
            borderColorPalette,
            palette,
          };
        }

        toNativeBridge.call('textFormatBridge', 'updateTextColor', {
          states: JSON.stringify(serialisedState),
        });
      },
      sendInitialState: true,
    }),
    createListenerConfig<HistoryPluginState>({
      bridge: 'undoRedoBridge',
      pluginKey: historyPluginKey,
      updater: (pluginState, view) => {
        toNativeBridge.call('undoRedoBridge', 'stateChanged', {
          canUndo: pluginState.canUndo,
          canRedo: pluginState.canRedo,
        });
      },
    }),
  ];

  if (getSelectionObserverEnabled()) {
    configs.push(
      createListenerConfig<SelectionDataState>({
        bridge: 'selectionBridge',
        pluginKey: selectionPluginKey,
        updater: (pluginState, view) => {
          createPromise('onSelection', pluginState).submit();
        },
      }),
    );
  }

  return configs;
};

function initPluginListenersFactory(configs: Array<BridgePluginListener<any>>) {
  return function initPluginListeners(
    eventDispatcher: EventDispatcher,
    bridge: WebBridgeImpl,
    view: EditorView,
  ) {
    configs.forEach((config) => {
      const { updater, pluginKey } = config;
      const pluginState = pluginKey.getState(view.state);

      (bridge as any)[`${config.bridge}State`] = {
        ...(bridge as any)[`${config.bridge}State`],
        ...pluginState,
      };

      (bridge as any)[`${config.bridge}Listener`] = (
        pluginState: any,
        initialPass: boolean,
      ) => {
        if (config.updateAfterDom) {
          rafSchedule(() => updater(pluginState, view, initialPass, bridge))();
        } else {
          updater(pluginState, view, initialPass, bridge);
        }
      };

      if (config.sendInitialState && pluginState) {
        (bridge as any)[`${config.bridge}Listener`](pluginState, true);
      }

      eventDispatcher.on(
        (pluginKey as any).key,
        (bridge as any)[`${config.bridge}Listener`],
      );
    });

    return () => {
      const destroyPluginListeners = destroyPluginListenersFactory(configs);
      destroyPluginListeners(eventDispatcher, bridge);
    };
  };
}

function destroyPluginListenersFactory(
  configs: Array<BridgePluginListener<any>>,
) {
  return function destroyPluginListeners(
    eventDispatcher: EventDispatcher | undefined,
    bridge: WebBridgeImpl,
  ) {
    if (!eventDispatcher) {
      return;
    }

    configs.forEach((config) => {
      (bridge as any)[`${config.bridge}State`] = undefined;
      eventDispatcher.off(
        (config.pluginKey as any).key,
        (bridge as any)[`${config.bridge}Listener`],
      );
      (bridge as any)[`${config.bridge}Listener`] = undefined;
    });
  };
}

const defaultConfigs = configFactory(new EditorConfiguration());

export const destroyPluginListeners = (
  configs?: Array<BridgePluginListener<any>>,
) => {
  return destroyPluginListenersFactory(configs || defaultConfigs);
};

export const initPluginListeners = (
  configs?: Array<BridgePluginListener<any>>,
) => {
  return initPluginListenersFactory(configs || defaultConfigs);
};
