import type { CardAppearance } from '@atlaskit/editor-common/provider-factory';
import type { Node, NodeType } from '@atlaskit/editor-prosemirror/model';
import { Fragment } from '@atlaskit/editor-prosemirror/model';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { NodeSelection } from '@atlaskit/editor-prosemirror/state';

import { pluginKey } from './pm-plugins/plugin-key';
import type { CardInfo, CardPluginState } from './types';

export const appearanceForNodeType = (
  spec: NodeType,
): CardAppearance | undefined => {
  if (spec.name === 'inlineCard') {
    return 'inline';
  } else if (spec.name === 'blockCard') {
    return 'block';
  } else if (spec.name === 'embedCard') {
    return 'embed';
  }
  return;
};

export const selectedCardAppearance = (state: EditorState) => {
  if (state.selection instanceof NodeSelection) {
    return appearanceForNodeType(state.selection.node.type);
  }
};

export type TitleUrlPair = { title?: string; url?: string };

export const titleUrlPairFromNode = (node: Node): TitleUrlPair => {
  const { attrs } = node;

  return {
    url: attrs.url || (attrs.data && attrs.data.url),
    title: attrs.data && attrs.data.title,
  };
};

/**
 * Merges the title and url from attributes and CardInfo from the resolved view, preferring the CardInfo.
 * @param titleUrlPair title and url information from the node attributes
 * @param info information stored in state from the resolved UI component view
 */
export const mergeCardInfo = (
  titleUrlPair: TitleUrlPair,
  info?: CardInfo,
): TitleUrlPair => {
  return {
    title: (info && info.title) || titleUrlPair.title,
    url: (info && info.url) || titleUrlPair.url,
  };
};

export const displayInfoForCard = (node: Node, info?: CardInfo) =>
  mergeCardInfo(titleUrlPairFromNode(node), info);

export const findCardInfo = (state: EditorState) => {
  const pluginState: CardPluginState | undefined = pluginKey.getState(state);
  if (!pluginState) {
    return undefined;
  }

  return pluginState.cards.find(
    cardInfo => cardInfo.pos === state.selection.from,
  );
};

const isAppearanceSupportedInParent = (
  currentNodePosition: number,
  editorState: EditorState,
  fragment: Fragment,
  currentAppearance?: CardAppearance,
): boolean => {
  const resolvedPosition = editorState.doc.resolve(currentNodePosition);
  const parent =
    currentAppearance === 'embed' || currentAppearance === 'block'
      ? resolvedPosition.node()
      : resolvedPosition.node(-1);
  return parent && parent.type.validContent(fragment);
};

export const isEmbedSupportedAtPosition = (
  currentNodePosition: number,
  editorState: EditorState,
  currentAppearance?: CardAppearance,
): boolean =>
  isAppearanceSupportedInParent(
    currentNodePosition,
    editorState,
    Fragment.from(editorState.schema.nodes.embedCard.createChecked({})),
    currentAppearance,
  );

export const isBlockSupportedAtPosition = (
  currentNodePosition: number,
  editorState: EditorState,
  currentAppearance?: CardAppearance,
): boolean =>
  isAppearanceSupportedInParent(
    currentNodePosition,
    editorState,
    Fragment.from(editorState.schema.nodes.blockCard.createChecked({})),
    currentAppearance,
  );
