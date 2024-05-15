/** @jsx jsx */
import { useEffect, useRef, useState } from 'react';

import { css, jsx } from '@emotion/react';

import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import DragHandlerIcon from '@atlaskit/icon/glyph/drag-handler';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { token } from '@atlaskit/tokens';

import { key } from '../pm-plugins/main';
import type { BlockControlsPlugin } from '../types';

import {
  DRAG_HANDLE_BORDER_RADIUS,
  DRAG_HANDLE_HEIGHT,
  DRAG_HANDLE_WIDTH,
} from './consts';
import { dragPreview } from './drag-preview';

const dragHandleButtonStyles = css({
  position: 'relative',
  // TODO - we have ticket ED-23209 to correctly position the drag handle for each node
  //https://product-fabric.atlassian.net/browse/ED-23209
  top: 12,
  left: -18,

  padding: `${token('space.025', '2px')} 0`,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: DRAG_HANDLE_HEIGHT,
  width: DRAG_HANDLE_WIDTH,
  border: 'none',
  background: 'transparent',
  borderRadius: DRAG_HANDLE_BORDER_RADIUS,
  color: token('color.icon', '#44546F'),
  cursor: 'grab',

  ':hover': {
    backgroundColor: token(
      'color.background.neutral.subtle.hovered',
      '#091E420F',
    ),
  },

  ':active': {
    backgroundColor: token(
      'color.background.neutral.subtle.pressed',
      '#091E4224',
    ),
  },
});

const selectedStyles = css({
  backgroundColor: token('color.background.selected', '#E9F2FF'),
  color: token('color.icon.selected', '#0C66E4'),
});

export const DragHandle = ({
  dom,
  api,
  start,
}: {
  dom: HTMLElement;
  api: ExtractInjectionAPI<BlockControlsPlugin> | undefined;
  start: number;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const domRef = useRef<HTMLElement>(dom);
  const [dragHandleSelected, setDragHandleSelected] = useState(false);

  useEffect(() => {
    const element = buttonRef.current;
    if (!element) {
      return;
    }

    return draggable({
      element,

      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        setCustomNativeDragPreview({
          getOffset: () => {
            const rect = domRef.current.getBoundingClientRect();
            // Offset the drag preview to the center of the element
            return { x: 0, y: rect.height / 2 };
          },
          render: ({ container }) => {
            return dragPreview(container, domRef);
          },
          nativeSetDragImage,
        });
      },
      onDragStart() {
        api?.core?.actions.execute(({ tr }) =>
          tr.setMeta(key, {
            isDragging: true,
            start,
          }),
        );
      },
      onDrop() {
        api?.core?.actions.execute(({ tr }) =>
          tr.setMeta(key, {
            isDragging: false,
          }),
        );
      },
    });
  }, [api, start]);

  return (
    <button
      type="button"
      css={[dragHandleButtonStyles, dragHandleSelected && selectedStyles]}
      ref={buttonRef}
      onClick={() => {
        setDragHandleSelected(!dragHandleSelected);

        // TODO - add drag menu
        // api?.core?.actions.execute(({ tr }) =>
        //   tr.setMeta(key, {
        //     toggleMenu: true,
        //   }),
        // );
      }}
    >
      <DragHandlerIcon label="" size="medium" />
    </button>
  );
};
