/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import type { WrappedComponentProps, MessageDescriptor } from 'react-intl-next';
import { FormattedMessage, defineMessages } from 'react-intl-next';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import TextStyleIcon from '@atlaskit/icon/glyph/editor/text-style';
import { wrapperStyle } from '@atlaskit/editor-common/styles';
import { ToolbarButton } from '@atlaskit/editor-common/ui-menu';

import { NORMAL_TEXT } from '../../types';

import {
  buttonContentStyle,
  buttonContentReducedSpacingStyle,
  wrapperSmallStyle,
  expandIconWrapperStyle,
} from './styled';

export interface BlockTypeButtonProps {
  isSmall?: boolean;
  isReducedSpacing?: boolean;
  'aria-expanded': React.AriaAttributes['aria-expanded'];
  selected: boolean;
  disabled: boolean;
  title: MessageDescriptor;
  onClick(e: React.MouseEvent): void;
  onKeyDown(e: React.KeyboardEvent): void;
  formatMessage: WrappedComponentProps['intl']['formatMessage'];
}

export const messages = defineMessages({
  textStyles: {
    id: 'fabric.editor.textStyles',
    defaultMessage: 'Text styles',
    description:
      'Menu provides access to various heading styles or normal text',
  },
});

export const BlockTypeButton: React.StatelessComponent<BlockTypeButtonProps> = (
  props,
) => {
  const labelTextStyles = props.formatMessage(messages.textStyles);
  return (
    <ToolbarButton
      spacing={props.isReducedSpacing ? 'none' : 'default'}
      selected={props.selected}
      className="block-type-btn"
      disabled={props.disabled}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
      title={labelTextStyles}
      aria-label={labelTextStyles}
      aria-haspopup
      aria-expanded={props['aria-expanded']}
      iconAfter={
        <span
          css={[wrapperStyle, props.isSmall && wrapperSmallStyle]}
          data-testid="toolbar-block-type-text-styles-icon"
        >
          {props.isSmall && <TextStyleIcon label={labelTextStyles} />}
          <span css={expandIconWrapperStyle}>
            <ExpandIcon label="" />
          </span>
        </span>
      }
    >
      {!props.isSmall && (
        <span
          css={[
            buttonContentStyle,
            props.isReducedSpacing && buttonContentReducedSpacingStyle,
          ]}
        >
          <FormattedMessage {...(props.title || NORMAL_TEXT.title)} />
        </span>
      )}
    </ToolbarButton>
  );
};
