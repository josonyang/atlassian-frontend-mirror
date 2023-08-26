import React, { type MouseEvent, useState } from 'react';

import { Box } from '@atlaskit/primitives';

import { LinkItem, LinkItemProps } from '../../src';
import koala from '../icons/koala.png';

const ImgIcon = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} height={24} width={24} alt={alt} style={{ borderRadius: 3 }} />
);

const useLinkItemComputedProps = (initialSelectedHref?: string) => {
  const [currentHref, setCurrentHref] = useState<string | undefined>(
    initialSelectedHref,
  );

  const getComputedProps = ({ href, ...restProps }: LinkItemProps) => ({
    href,
    ...restProps,
    isSelected: currentHref === href,
    onClick: () => setCurrentHref(href),
  });

  return getComputedProps;
};

export default () => {
  const getComputedProps = useLinkItemComputedProps('#link-item2');

  return (
    /**
     * It is not normally acceptable to add click handlers to non-interactive elements
     * as this is an accessibility anti-pattern. However, because this instance is
     * for performance reasons (to avoid multiple click handlers) and not creating an
     * inaccessible custom element, we can add role="presentation" so that there is
     * no negative impacts to assistive technologies.
     */
    <Box onClick={(e: MouseEvent) => e.preventDefault()} role="presentation">
      <LinkItem {...getComputedProps({ href: '#link-item1' })}>
        Customer Feedback
      </LinkItem>
      <LinkItem {...getComputedProps({ href: '#link-item2' })}>
        Customer Feedback
      </LinkItem>
      <LinkItem {...getComputedProps({ href: '#link-item3' })} isDisabled>
        Customer Feedback
      </LinkItem>
      <LinkItem
        {...getComputedProps({ href: '#link-item4' })}
        description="Classic service desk"
      >
        Customer Feedback
      </LinkItem>
      <LinkItem
        {...getComputedProps({ href: '#link-item5' })}
        iconBefore={<ImgIcon src={koala} alt={'A koala'} />}
        description="Classic service desk"
      >
        Customer Feedback
      </LinkItem>
      <LinkItem
        {...getComputedProps({ href: 'https://atlassian.design' })}
        testId="link-item"
      >
        Atlassian Design
      </LinkItem>
    </Box>
  );
};
