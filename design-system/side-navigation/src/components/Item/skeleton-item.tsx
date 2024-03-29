import React from 'react';

import { SkeletonItemProps, SkeletonItem as SkelItem } from '@atlaskit/menu';
import { token } from '@atlaskit/tokens';

import { sectionHeaderSpacingStyles } from '../../common/styles';
import { useShouldNestedElementRender } from '../NestableNavigationContent/context';

export type { SkeletonItemProps } from '@atlaskit/menu';

/**
 * __Skeleton item__
 *
 * A skeleton item can be used to reduce the perceived loading time.
 *
 * - [Examples](https://atlassian.design/components/side-navigation/examples#loading)
 * - [Code](https://atlassian.design/components/side-navigation/code)
 */
const SkeletonItem = (props: SkeletonItemProps) => {
  const { shouldRender } = useShouldNestedElementRender();
  if (!shouldRender) {
    return null;
  }

  return (
    <SkelItem
      // eslint-disable-next-line @atlaskit/design-system/no-deprecated-apis, @repo/internal/react/no-unsafe-overrides
      cssFn={() => ({
        ...sectionHeaderSpacingStyles(),
        // This doubles up & to get a higher specificity as well as to not overwite the base styles.
        '&&::before': {
          height: token('space.300', '24px'),
          marginRight: token('space.200', '16px'),
          width: token('space.300', '24px'),
        },
      })}
      // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
      {...props}
    />
  );
};

export default SkeletonItem;
