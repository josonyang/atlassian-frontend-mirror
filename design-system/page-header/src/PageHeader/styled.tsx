// TODO: Remove this eslint-disable when prop names have been renamed.
// This rule is here as prop name changes are a major as they are used
// by our consumers. The prop name concerned here is truncateTitle.
// This can be done in the next lite-mode conversion.
/* eslint-disable @repo/internal/react/boolean-prop-naming-convention */
/** @jsx jsx */

import React, { ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

import { h700 } from '@atlaskit/theme/typography';
import { token } from '@atlaskit/tokens';

const truncateStyles = css({
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const outerStyles = css({
  margin: `${token('space.300', '24px')} 0 ${token('space.200', '16px')} 0`,
});

const styledTitleStyles = css({
  marginTop: 0,
  lineHeight: token('font.lineHeight.500', '32px'),
  outline: 'none',
});

const titleWrapperStyles = css({
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
});

const titleWrapperTruncateStyles = css({
  flexWrap: 'nowrap',
});

const titleContainerStyles = css({
  minWidth: 0,
  maxWidth: '100%',
  marginBottom: token('space.100', '8px'),
  flex: '1 0 auto',
  flexShrink: undefined,
});

const actionStyles = css({
  maxWidth: '100%',
  marginBottom: token('space.100', '8px'),
  marginLeft: 'auto',
  paddingLeft: token('space.400', '32px'),
  flex: '0 0 auto',
  whiteSpace: 'nowrap',
  // eslint-disable-next-line @atlaskit/design-system/no-nested-styles
  '>': {
    textAlign: 'right',
  },
});

const titleContainerTruncateStyles = css({
  flexShrink: 1,
});

const bottomBarStyles = css({
  marginTop: token('space.200', '16px'),
});

/**
 * __Outer wrapper__
 *
 * An outer wrapper that is the outermost component of the PageHeader component. It wraps around the PageHeader, its Actions,
 * the BottomBar and its Breadcrumbs.
 *
 */
export const OuterWrapper = ({ children }: { children: ReactNode }) => {
  return <div css={outerStyles}>{children}</div>;
};

// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
const h700Styles = css(h700());

interface StyledTitleWrapperProps {
  children?: React.ReactNode;
  id?: string;
  truncateTitle?: boolean;
}

/**
 * __Styled title wrapper__
 *
 * A styled title wrapper is a wrapper around the title that controls its the styles exclusively.
 *
 */
export const StyledTitleWrapper = React.forwardRef<
  HTMLHeadingElement,
  StyledTitleWrapperProps
>(({ children, id, truncateTitle }, ref) => {
  return (
    <h1
      css={[h700Styles, styledTitleStyles, truncateTitle && truncateStyles]}
      ref={ref}
      tabIndex={-1}
      id={id}
    >
      {children}
    </h1>
  );
});

interface TitleProps {
  truncateTitle?: boolean;
  children?: ReactNode;
}

/**
 * __Title wrapper__
 *
 * A title wrapper is a wrapper around the title and the actions.
 *
 */
export const TitleWrapper = ({ children, truncateTitle }: TitleProps) => {
  return (
    <div
      css={[titleWrapperStyles, truncateTitle && titleWrapperTruncateStyles]}
    >
      {children}
    </div>
  );
};

/**
 * Title container
 *
 * A title container is a container that wraps around the title and its styles (if applied).
 *
 */
export const TitleContainer = ({ children, truncateTitle }: TitleProps) => {
  return (
    <div
      css={[
        titleContainerStyles,
        truncateTitle && titleContainerTruncateStyles,
      ]}
    >
      {children}
    </div>
  );
};

/**
 * __Actions wrapper__
 *
 * An actions wrapper is a wrapper for the actions, which appear on the top right of the PageHeader component.
 *
 */
export const ActionsWrapper = ({ children }: { children: ReactNode }) => {
  return <div css={actionStyles}>{children}</div>;
};

/**
 * __Bottom bar wrapper__
 *
 * A bottom bar wrapper is a wrapper for the bottom bar, which appears at the bottom of the PageHeader component.
 *
 */
export const BottomBarWrapper = ({ children }: { children: ReactNode }) => {
  return <div css={bottomBarStyles}>{children}</div>;
};
