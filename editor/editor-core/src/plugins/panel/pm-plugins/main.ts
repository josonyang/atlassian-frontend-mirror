import { EditorState, Plugin } from 'prosemirror-state';
import { findDomRefAtPos } from 'prosemirror-utils';
import { panelNodeView } from '../nodeviews/panel';
import { Command } from '../../../types';
import { pluginKey } from '../types';
import { findPanel } from '../utils';
import { EditorView } from 'prosemirror-view';
import { Dispatch } from '../../../event-dispatcher';
import { PanelPluginOptions } from '../types';

export type PanelState = {
  element?: HTMLElement;
  activePanelType?: string | undefined;
  toolbarVisible?: boolean | undefined;
};

export const getPluginState = (state: EditorState): PanelState => {
  return pluginKey.getState(state);
};

export const setPluginState = (stateProps: Object): Command => (
  state,
  dispatch,
) => {
  const pluginState = getPluginState(state);
  if (dispatch) {
    dispatch(
      state.tr.setMeta(pluginKey, {
        ...pluginState,
        ...stateProps,
      }),
    );
  }
  return true;
};

export type PanelStateSubscriber = (state: PanelState) => any;

export const createPlugin = (
  dispatch: Dispatch,
  options: PanelPluginOptions = {},
) =>
  new Plugin({
    state: {
      init() {
        return {
          element: null,
          activePanelType: undefined,
          toolbarVisible: false,
        };
      },
      apply(tr, pluginState: PanelState) {
        const maybeNextPluginState = tr.getMeta(pluginKey);
        if (maybeNextPluginState) {
          const nextPluginState = { ...pluginState, ...maybeNextPluginState };
          dispatch(pluginKey, nextPluginState);
          return nextPluginState;
        }
        return pluginState;
      },
    },
    key: pluginKey,
    view: (editorView: EditorView) => {
      const domAtPos = editorView.domAtPos.bind(editorView);
      return {
        update: view => {
          const pluginState = getPluginState(view.state);
          const panelNode = findPanel(view.state, view.state.selection);
          const panelRef = panelNode
            ? (findDomRefAtPos(panelNode.pos, domAtPos) as HTMLDivElement)
            : undefined;

          if (panelRef !== pluginState.element) {
            const newState: PanelState = {
              element: panelRef,
              activePanelType:
                panelRef && panelNode && panelNode.node.attrs['panelType'],
              toolbarVisible: !!panelRef,
            };
            setPluginState(newState)(view.state, view.dispatch);
            return true;
          }

          /** Plugin dispatch needed to reposition the toolbar */
          dispatch(pluginKey, {
            ...pluginState,
          });
          return;
        },
      };
    },
    props: {
      nodeViews: {
        panel: panelNodeView(options.allowSelection),
      },
      handleDOMEvents: {
        blur(view) {
          const pluginState = getPluginState(view.state);
          if (pluginState.toolbarVisible) {
            setPluginState({
              toolbarVisible: false,
              element: null,
              activePanelType: undefined,
            })(view.state, view.dispatch);
            return true;
          }
          return false;
        },
      },
    },
  });
