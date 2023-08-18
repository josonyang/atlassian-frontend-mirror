/** @jsx jsx */
import { ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { token } from '@atlaskit/tokens';

import { useModal } from './hooks';
import { iconColor, titleIconMargin } from './internal/constants';
import { Appearance } from './types';

const fontSize = 20;
const lineHeight = 1;
const adjustedLineHeight = 1.2;

const titleStyles = css({
  display: 'flex',
  minWidth: 0,

  margin: token('space.0', '0px'),
  alignItems: 'center',

  fontSize: token('font.size.300', '20px'),
  fontStyle: 'inherit',
  fontWeight: token('font.weight.medium', '500'),
  letterSpacing: `-0.008em`,
  lineHeight: lineHeight,
});

const textStyles = css({
  minWidth: 0,

  /**
   * This ensures that the element fills the whole header space
   * and its content does not overflow (since flex items don't
   * shrink past its content size by default).
   */
  flex: '1 1 auto',
  wordWrap: 'break-word',
});

const iconStyles = css({
  // eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
  marginRight: `${titleIconMargin}px`,
  flex: '0 0 auto',
  alignSelf: 'start',
});

/**
 * When the title is truncated (not multi-line), we adjust the
 * line height to avoid cropping the descenders. This removes
 * the extra spacing that we get from that adjustment.
 */
const lineHeightOffset = fontSize - fontSize * adjustedLineHeight;

const truncatedTextStyles = css({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  // Use "clip" overflow to allow ellipses on x-axis without clipping descenders
  '@supports (overflow-x: clip)': {
    overflowX: 'clip',
  },
  '@supports not (overflow-x: clip)': {
    // eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
    marginTop: `${lineHeightOffset / 2}px`,
    // eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
    marginBottom: `${lineHeightOffset / 2}px`,
    lineHeight: adjustedLineHeight,
    overflow: 'hidden',
  },
});

const truncatedTextIconStyles = css({
  '@supports not (overflow-x: clip)': {
    // eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
    marginBottom: `${lineHeightOffset / 2}px`,
    lineHeight: 1.2,
  },
});

const TitleIcon = ({
  appearance,
  isMultiline,
}: Required<Pick<ModalTitleProps, 'appearance' | 'isMultiline'>>) => {
  const Icon = appearance === 'danger' ? ErrorIcon : WarningIcon;

  return (
    <span css={[iconStyles, !isMultiline && truncatedTextIconStyles]}>
      <Icon label={appearance} primaryColor={iconColor[appearance]} />
    </span>
  );
};

export interface ModalTitleProps {
  /**
   * Appearance of the modal that changes the color of the primary action and adds an icon to the title.
   */
  appearance?: Appearance;

  /**
   * Children of modal dialog header.
   */
  children?: ReactNode;

  /**
   * When `true` will allow the title to span multiple lines.
   * Defaults to `true`.
   */
  isMultiline?: boolean;

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;
}

/**
 * __Modal title__
 *
 * A modal title is used to display a title within a modal.
 *
 * - [Examples](https://atlassian.design/components/modal-dialog/examples)
 * - [Code](https://atlassian.design/components/modal-dialog/code)
 * - [Usage](https://atlassian.design/components/modal-dialog/usage)
 */
const ModalTitle = (props: ModalTitleProps) => {
  const {
    appearance,
    children,
    isMultiline = true,
    testId: userDefinedTestId,
  } = props;
  const { titleId, testId: modalTestId } = useModal();

  const testId = userDefinedTestId || (modalTestId && `${modalTestId}--title`);

  return (
    <h1 css={titleStyles} data-testid={testId}>
      {appearance && (
        <TitleIcon appearance={appearance} isMultiline={isMultiline} />
      )}
      <span
        id={titleId}
        css={[textStyles, !isMultiline && truncatedTextStyles]}
        data-testid={testId && `${testId}-text`}
      >
        {children}
      </span>
    </h1>
  );
};

export default ModalTitle;
