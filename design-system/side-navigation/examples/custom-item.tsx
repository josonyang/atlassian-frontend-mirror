/** @jsx jsx */
import { forwardRef, MouseEvent } from 'react';

import { jsx } from '@emotion/react';

import AddItemIcon from '@atlaskit/icon/glyph/add-item';
import OpenIcon from '@atlaskit/icon/glyph/open';
import { Box } from '@atlaskit/primitives';

import { CustomItem, CustomItemComponentProps } from '../src';

type CustomProps = CustomItemComponentProps & { href: string };

const CustomLink = forwardRef<HTMLAnchorElement, CustomProps>(
  (props: CustomProps, ref) => {
    const { children, href, ...rest } = props;
    return (
      <a href={href || '/spa-link'} ref={ref} {...rest}>
        {children}
      </a>
    );
  },
);

const Example = () => (
  <Box onClick={(e: MouseEvent) => e.preventDefault()}>
    <CustomItem href="/create-article-1" component={CustomLink}>
      Custom create article
    </CustomItem>
    <CustomItem href="/create-article-2" component={CustomLink} isSelected>
      Custom create article
    </CustomItem>
    <CustomItem href="/create-article-3" component={CustomLink} isDisabled>
      Custom create article
    </CustomItem>
    <CustomItem
      href="/create-article-4"
      component={CustomLink}
      iconAfter={<OpenIcon label="" />}
    >
      Custom create article
    </CustomItem>
    <CustomItem
      href="/create-article-5"
      component={CustomLink}
      description="Will create an article"
    >
      Custom create article
    </CustomItem>
    <CustomItem
      href="/create-article-6"
      component={CustomLink}
      iconBefore={<AddItemIcon label="" />}
    >
      Custom create article
    </CustomItem>
    <CustomItem
      href="/create-article-7"
      component={CustomLink}
      iconBefore={<AddItemIcon label="" />}
      iconAfter={<OpenIcon label="" />}
    >
      Custom create article
    </CustomItem>

    <CustomItem
      href="/create-article-8"
      component={CustomLink}
      description="Will create an article"
      iconBefore={<AddItemIcon label="" />}
    >
      Custom create article
    </CustomItem>
    <CustomItem
      href="/create-article-9"
      component={CustomLink}
      description="Will create an article"
      iconBefore={<AddItemIcon label="" />}
      iconAfter={<OpenIcon label="" />}
    >
      Custom create article
    </CustomItem>
  </Box>
);

export default Example;
