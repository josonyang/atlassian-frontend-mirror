/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react';

import { TextProps } from './types';
import { getFormattedMessage, getTruncateStyles } from '../../utils';
import { token } from '@atlaskit/tokens';

const getStyles = (maxLines: number) =>
  css(
    {
      color: token('color.text.subtlest', '#626F86'),
      fontSize: '0.75rem',
      lineHeight: '1rem',
      whiteSpace: 'normal',
    },
    getTruncateStyles(maxLines),
  );

/**
 * A base element that displays some Text.
 * @internal
 * @param {TextProps} TextProps - The props necessary for the Text element.
 * @see Title
 */
const Text: React.FC<TextProps> = ({
  content,
  maxLines = 1,
  message,
  name,
  overrideCss,
  testId = 'smart-element-text',
}) => {
  if (!message && !content) {
    return null;
  }

  return (
    <span
      css={[getStyles(maxLines), overrideCss]}
      data-separator
      data-smart-element={name}
      data-smart-element-text
      data-testid={testId}
    >
      {getFormattedMessage(message) || content}
    </span>
  );
};

export default Text;
