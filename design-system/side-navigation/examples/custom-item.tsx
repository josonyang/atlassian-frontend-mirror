import React, { forwardRef, type MouseEvent } from 'react';

import AddItemIcon from '@atlaskit/icon/glyph/add-item';
import EmojiAtlassianIcon from '@atlaskit/icon/glyph/emoji/atlassian';
import { Box } from '@atlaskit/primitives/compiled';
import { CustomItem, type CustomItemComponentProps } from '@atlaskit/side-navigation';

type CustomProps = CustomItemComponentProps & { href: string };

const CustomLink: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<CustomProps> & React.RefAttributes<HTMLAnchorElement>
> = forwardRef<HTMLAnchorElement, CustomProps>((props: CustomProps, ref) => {
	const { children, href, ...rest } = props;
	return (
		// eslint-disable-next-line @atlaskit/design-system/no-html-anchor
		<a href={href || '/spa-link'} ref={ref} {...rest}>
			{children}
		</a>
	);
});

const Example = () => (
	// eslint-disable-next-line @atlassian/a11y/interactive-element-not-keyboard-focusable
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
			iconAfter={<EmojiAtlassianIcon label="" />}
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
			iconAfter={<EmojiAtlassianIcon label="" />}
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
			iconAfter={<EmojiAtlassianIcon label="" />}
		>
			Custom create article
		</CustomItem>
	</Box>
);

export default Example;
