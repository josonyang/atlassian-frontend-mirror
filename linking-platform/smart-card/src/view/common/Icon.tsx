/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import ImageLoader from 'react-render-image';
import LinkIcon from '@atlaskit/icon/glyph/link';
import { gs } from './utils';

export interface IconProps {
  /* Url of the icon to be displayed. Note that this is only used if a JSX element is not provided */
  url?: string;
  /* Element to be displayed as an icon. We naively render this if it is provided. Allows us to pass in AK icons */
  icon?: React.ReactNode;
  /* Element to be displayed as an icon if icon not provided or icon url request return error. */
  defaultIcon?: React.ReactNode;
  /* A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests. */
  testId?: string;
  /* A prop to determine whether the icon is a Flexible UI rendered Icon, used internally by Flexible UI and Hover Preview */
  isFlexibleUi?: boolean;
}

/**
 * Class name for selecting non-flexible block card icon image
 *
 * @deprecated {@link https://hello.jira.atlassian.cloud/browse/ENGHEALTH-6878 Internal documentation for deprecation (no external access)}
 * Using this selctor is deprecated as once the flexible block card feature flag is removed, this class will no longer be used.
 */
export const blockCardIconImageClassName = 'block-card-icon-image';

const getImageStyles = (isFlexibleUi: boolean) => {
  if (isFlexibleUi) {
    return;
  }
  return css({
    height: gs(2),
    width: gs(2),
  });
};

const getSpanStyles = (isFlexibleUi: boolean) => {
  if (isFlexibleUi) {
    return;
  }
  return css({
    height: gs(2.5),
    width: gs(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });
};

export const Icon = ({
  url,
  icon,
  defaultIcon,
  testId = 'block-card-icon',
  isFlexibleUi = false,
}: IconProps) => {
  const placeholder = defaultIcon || (
    <LinkIcon label="link" size="small" testId={`${testId}-default`} />
  );

  const image = url && (
    <ImageLoader
      src={url}
      loaded={
        <img
          css={getImageStyles(isFlexibleUi)}
          src={url}
          data-testid={`${testId}-image`}
        />
      }
      errored={placeholder}
    />
  );

  return (
    <span
      css={getSpanStyles(isFlexibleUi)}
      data-testid={testId}
      className={blockCardIconImageClassName}
    >
      {icon || image || placeholder}
    </span>
  );
};
