import { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { EditorState, NodeSelection } from '@atlaskit/editor-prosemirror/state';
import { findChildren } from '@atlaskit/editor-prosemirror/utils';

import { getMediaSinglePixelWidth } from '../media-single';

import { MEDIA_DYNAMIC_GUIDELINE_PREFIX } from './constants';

export const generateDynamicGuidelines = (
  state: EditorState,
  editorWidth: number,
) => {
  const selectedNode =
    state.selection instanceof NodeSelection &&
    (state.selection as NodeSelection).node;

  const mediaSingleNode = findChildren(
    state.tr.doc,
    (node: PMNode) => {
      return node.type === state.schema.nodes.mediaSingle;
    },
    false, // only top level
  );

  const offset = editorWidth / 2;

  return mediaSingleNode
    .map(({ node }, index) => {
      if (selectedNode === node) {
        return [];
      }

      const { layout, width, widthType } = node.attrs;

      const pixelWidth = getMediaSinglePixelWidth(
        width,
        editorWidth,
        widthType,
      );

      const commonStyles = {
        style: 'dashed',
        show: true,
      };

      const key = `${MEDIA_DYNAMIC_GUIDELINE_PREFIX}${index}`;

      switch (layout) {
        case 'align-start':
        case 'wrap-left':
          return {
            position: { x: pixelWidth - offset },
            key,
            ...commonStyles,
          };
        case 'align-end':
        case 'wrap-right':
          return {
            position: { x: editorWidth - pixelWidth - offset },
            key,
            ...commonStyles,
          };
        case 'center':
          return [
            {
              position: { x: pixelWidth / 2 },
              key: `${key}_right`,
              ...commonStyles,
            },
            {
              position: { x: -pixelWidth / 2 },
              key: `${key}_left`,
              ...commonStyles,
            },
          ];
        // we ignore full-width and wide
        default:
          return [];
      }
    })
    .flat();
};