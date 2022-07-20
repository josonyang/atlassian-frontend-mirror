/** @jsx jsx */
import React, { useCallback, useMemo, useRef, useLayoutEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { DN600, N200, N800 } from '@atlaskit/theme/colors';
import { themed } from '@atlaskit/theme/components';
import { borderRadius } from '@atlaskit/theme/constants';
import { ThemeProps } from '@atlaskit/theme/types';
import { ButtonItem } from '@atlaskit/menu';
import { relativeFontSizeToBase16 } from '@atlaskit/editor-shared-styles';

import IconFallback from '../../quick-insert/assets/fallback';
import { shortcutStyle } from '../../../ui/styles';
import type { TypeAheadItem, OnSelectItem } from '../types';
import { SelectItemMode } from '@atlaskit/editor-common/type-ahead';
import { token } from '@atlaskit/tokens';

export const ICON_HEIGHT = 40;
export const ICON_WIDTH = 40;
export const ITEM_PADDING = 12;

export const itemIcon = css`
  width: ${ICON_WIDTH}px;
  height: ${ICON_HEIGHT}px;
  overflow: hidden;
  border: 1px solid ${token('color.border', 'rgba(223, 225, 229, 0.5)')}; /* N60 at 50% */
  border-radius: ${borderRadius()}px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: ${ICON_WIDTH}px;
    height: ${ICON_HEIGHT}px;
  }
`;

const itemBody = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  line-height: 1.4;
`;

const itemText = (theme: ThemeProps) => css`
  white-space: initial;
  color: ${themed({
    light: token('color.text', N800),
    dark: token('color.text', DN600),
  })(theme)};
  .item-description {
    font-size: ${relativeFontSizeToBase16(11.67)};
    color: ${token('color.text.subtlest', N200)};
    margin-top: 4px;
  }
`;

const itemAfter = css`
  flex: 0 0 auto;
`;

const hidden = { overflow: 'hidden' };
const FallbackIcon: React.FC<Record<'label', string>> = React.memo(
  ({ label }) => {
    return <IconFallback />;
  },
);

const noop = () => {};

type TypeAheadListItemProps = {
  item: TypeAheadItem;
  itemIndex: number;
  selectedIndex: number;
  onItemHover: OnSelectItem;
  onItemClick: (mode: SelectItemMode, index: number) => void;
};
export const TypeAheadListItem: React.FC<TypeAheadListItemProps> = ({
  item,
  selectedIndex,
  onItemHover,
  onItemClick,
  itemIndex,
}) => {
  const isSelected = itemIndex === selectedIndex;

  // It's possible for onMouseMove to be called multiple times in quick
  // succession because the mousemove event can fire very rapidly. This
  // provides an additional safety net to prevent that.
  const mouseMoveCalled = useRef(false);

  const onMouseMove = useCallback(() => {
    if (isSelected || mouseMoveCalled.current) {
      return;
    }
    mouseMoveCalled.current = true;
    onItemHover({
      item,
      index: itemIndex,
    });
  }, [item, itemIndex, onItemHover, isSelected]);

  useLayoutEffect(() => {
    if (!isSelected) {
      mouseMoveCalled.current = false;
    }
  }, [isSelected]);

  const { icon, title, render: customRenderItem } = item;
  const elementIcon = useMemo(() => {
    return (
      <div css={itemIcon}>{icon ? icon() : <FallbackIcon label={title} />}</div>
    );
  }, [icon, title]);

  const insertSelectedItem = useCallback(() => {
    onItemClick(SelectItemMode.SELECTED, itemIndex);
  }, [onItemClick, itemIndex]);

  const customItem = useMemo(() => {
    if (!customRenderItem) {
      return null;
    }

    const Comp = customRenderItem;
    return (
      <div
        aria-selected={isSelected}
        aria-label={title}
        role="option"
        tabIndex={0}
        style={hidden}
        onMouseMove={onMouseMove}
      >
        <Comp
          onClick={insertSelectedItem}
          isSelected={isSelected}
          onHover={noop}
        />
      </div>
    );
  }, [customRenderItem, insertSelectedItem, onMouseMove, isSelected, title]);

  if (customItem) {
    return customItem;
  }

  return (
    <span onMouseMove={onMouseMove}>
      <ButtonItem
        onClick={insertSelectedItem}
        iconBefore={elementIcon}
        isSelected={isSelected}
        aria-selected={isSelected}
        aria-label={item.title}
        role="option"
        description={item.description}
      >
        <div css={itemBody}>
          <div css={itemText}>
            <div className="item-title">{item.title}</div>
          </div>
          <div css={itemAfter}>
            {item.keyshortcut && (
              <div css={shortcutStyle}>{item.keyshortcut}</div>
            )}
          </div>
        </div>
      </ButtonItem>
    </span>
  );
};
