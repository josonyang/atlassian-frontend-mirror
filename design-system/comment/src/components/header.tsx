/** @jsx jsx */
import { FC, ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

import Text from '@atlaskit/ds-explorations/text';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import Lozenge from '@atlaskit/lozenge';
import Inline from '@atlaskit/primitives/inline';
import { token } from '@atlaskit/tokens';

interface HeaderProps {
  author?: ReactNode;
  restrictedTo?: ReactNode;
  isSaving?: boolean;
  savingText?: string;
  time?: ReactNode;
  type?: string;
  testId?: string;
  edited?: ReactNode;
  isError?: boolean;
  headingLevel?: string;
}

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const headingStyles = css({
  fontSize: token('font.size.100', '14px'),
  fontWeight: 'normal',
  letterSpacing: '0',
  lineHeight: token('font.lineHeight.200', '20px'),
  textTransform: 'none',
});

/**
 * __Header items__
 *
 * Comment header items.
 *
 * @internal
 */
const Header: FC<HeaderProps> = ({
  author,
  edited,
  isError,
  isSaving,
  restrictedTo,
  savingText,
  time,
  testId,
  type,
  headingLevel = '3',
}) => {
  const Heading = `h${
    Number(headingLevel) < 1 || Number(headingLevel) > 6 ? '3' : headingLevel
  }` as HeadingLevel;
  const shouldRender =
    author ||
    time ||
    restrictedTo ||
    (isSaving && savingText) ||
    edited ||
    type;
  return shouldRender ? (
    <Heading css={headingStyles}>
      <Inline alignBlock="center" testId={testId} space="space.100" as="span">
        {author}
        {type && <Lozenge testId={testId && `${testId}-type`}>{type}</Lozenge>}
        {time && !isSaving && !isError && time}
        {edited || null}
        {isSaving ? savingText : null}
        {restrictedTo && (
          <Text as="span" color="subtlest">
            <Inline alignBlock="center" space="space.050">
              &bull;
              <LockFilledIcon label="" size="small" />
              {restrictedTo}
            </Inline>
          </Text>
        )}
      </Inline>
    </Heading>
  ) : null;
};

Header.displayName = 'CommentHeader';

export default Header;
