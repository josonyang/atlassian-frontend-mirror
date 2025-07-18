import React from 'react';

import Archive24Icon from '@atlaskit/icon-file-type/glyph/archive/24';
import Blog24Icon from '@atlaskit/icon-object/glyph/blog/24';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
import PresenceActiveIcon from '@atlaskit/icon/glyph/presence-active';
import StarIcon from '@atlaskit/icon/glyph/star';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import {
	ButtonItem,
	LinkItem,
	MenuGroup,
	PopupMenuGroup,
	Section,
	SkeletonHeadingItem,
	SkeletonItem,
} from '@atlaskit/menu';
import { token } from '@atlaskit/tokens';

export default () => {
	return (
		<div
			style={{
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				display: 'flex',
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				flexDirection: 'row',
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				justifyContent: 'space-around',
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				padding: '1rem',
			}}
		>
			<div
				style={{
					border: `1px solid ${token('color.border')}`,
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					borderRadius: '4px',
				}}
			>
				<MenuGroup testId="with-adjacent-sections" maxWidth={600} maxHeight={1000}>
					<Section title="Actions">
						<LinkItem iconBefore={<EditorSearchIcon label="" />} href="#search">
							Search your items
						</LinkItem>
						<LinkItem iconBefore={<EditFilledIcon label="" />} href="#add-new-item" isDisabled>
							Add new item (disabled)
						</LinkItem>
						<LinkItem
							iconBefore={<StarFilledIcon label="" />}
							iconAfter={<ArrowRightIcon label="" />}
							description="You have 24 starred items."
							href="#starred"
						>
							Starred items
						</LinkItem>
						<LinkItem
							iconAfter={<ArrowRightIcon label="" />}
							iconBefore={<Archive24Icon label="" />}
							description="You have 16 archived items."
							href="#archived"
						>
							Archived items
						</LinkItem>
					</Section>
					<Section title="More actions">
						<LinkItem iconBefore={<EditorSearchIcon label="" />} href="#edit">
							Edit your items
						</LinkItem>
						<LinkItem iconBefore={<TrashIcon label="" />} href="#delete" isDisabled>
							Delete item (disabled)
						</LinkItem>
						<LinkItem
							iconBefore={<StarIcon label="" />}
							iconAfter={<ArrowRightIcon label="" />}
							description="You have 24 unstarred items."
							href="#unstarred"
						>
							Unstarred items
						</LinkItem>
						<LinkItem
							iconAfter={<ArrowRightIcon label="" />}
							iconBefore={<PresenceActiveIcon label="" />}
							description="You have 16 archived items."
							href="#archive"
						>
							Active items
						</LinkItem>
						<LinkItem
							isDisabled={true}
							iconAfter={<ArrowRightIcon label="" />}
							iconBefore={<PresenceActiveIcon label="" />}
							description="You have 4 archived items."
							href="#active"
						>
							Active items (disabled)
						</LinkItem>
					</Section>
					<Section title="Favourite articles" hasSeparator isScrollable>
						<ButtonItem iconBefore={<Blog24Icon label="" />}>Untitled</ButtonItem>
						<ButtonItem iconBefore={<Blog24Icon label="" />} description="It's short and sweet.">
							Short stories of Albany
						</ButtonItem>
						<ButtonItem
							iconBefore={<Blog24Icon label="" />}
							description="Success often comes with a shadow side and hidden costs. In this article, we examine the shadow side of Pablo Picasso's genius."
						>
							The Shadow Side of Greatness
						</ButtonItem>
						<ButtonItem
							iconBefore={<Blog24Icon label="" />}
							description="Self-awareness is critical for success in all fields. Read this article to learn how biologist Louis Agassiz taught self-awareness through observation."
						>
							Famous Biologist Louis Agassiz on the Usefulness of Learning Through Observation
						</ButtonItem>
						<ButtonItem
							iconBefore={<Blog24Icon label="" />}
							description="Famous poet Joseph Brodsky was exiled from his home in Russia and forced to leave the love of his life behind, never to be seen again. In 1988, Brodsky shared a beautiful strategy and method for dealing with the critics, detractors, and negative influences in your life."
						>
							Joseph Brodsky Explains Perfectly How to Deal With Critics and Detractors in Your
							Life:
						</ButtonItem>
						<ButtonItem
							iconBefore={<Blog24Icon label="" />}
							description="Martha Graham, perhaps the most influential dance choreographer of the 20th century, explains why it is not your job to judge your own work"
						>
							Martha Graham on the Hidden Danger of Comparing Yourself to Others
						</ButtonItem>
						<ButtonItem
							testId="favourite-articles-button-item"
							iconBefore={<Blog24Icon label="" />}
							description="Actress Nichelle Nichols helped shape the Civil Rights Movement without realizing it. Read this article to learn how you can live a meaningful life."
						>
							Lessons on Living a Meaningful Life from Nichelle Nichols
						</ButtonItem>
					</Section>
					<Section hasSeparator>
						<SkeletonHeadingItem />
						<SkeletonItem hasAvatar />
						<SkeletonItem hasAvatar />
						<SkeletonItem hasIcon width="100%" />
						<SkeletonItem hasIcon width="100%" />
						<SkeletonItem hasIcon />
						<SkeletonItem hasIcon />
					</Section>
				</MenuGroup>
			</div>
			<div
				style={{
					border: `1px solid ${token('color.border')}`,
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					height: 'max-content',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					borderRadius: '4px',
				}}
			>
				<PopupMenuGroup testId="mock-starred-menu" maxHeight={500}>
					<Section isScrollable>
						<Section title="Scrollable Starred">
							<ButtonItem
								description="Software Project"
								iconBefore={<Blog24Icon label="" />}
								iconAfter={<StarFilledIcon label="" primaryColor={token('color.icon.warning')} />}
							>
								Endeavour (JSPA)
							</ButtonItem>
							<ButtonItem
								description="Software Project"
								iconBefore={<Blog24Icon label="" />}
								iconAfter={<StarFilledIcon label="" primaryColor={token('color.icon.warning')} />}
							>
								Navigation v3 (JNAV)
							</ButtonItem>
						</Section>
						<Section title="Recent">
							<ButtonItem iconBefore={<Blog24Icon label="" />} description="Software Project">
								Emanada (EM)
							</ButtonItem>
							<ButtonItem iconBefore={<Blog24Icon label="" />} description="Software Project">
								Jira Frontend Performance Initiative (PEAR)
							</ButtonItem>
							<ButtonItem iconBefore={<Blog24Icon label="" />} description="Software Project">
								Fabric Editor
							</ButtonItem>
							<ButtonItem
								iconBefore={<Blog24Icon label="" />}
								description="Next-gen software project"
							>
								Content Services
							</ButtonItem>
							<ButtonItem
								iconBefore={<Blog24Icon label="" />}
								description="Classic business project"
							>
								Trinity Mobile
							</ButtonItem>
							<ButtonItem iconBefore={<Blog24Icon label="" />} description="Classic service desk">
								SPA Performance (SPAPERF)
							</ButtonItem>
							<ButtonItem iconBefore={<Blog24Icon label="" />} description="Software Project">
								Moneyball Design (EXM)
							</ButtonItem>
							<ButtonItem iconBefore={<Blog24Icon label="" />} description="Software Project">
								3Sia (CZAM)
							</ButtonItem>
						</Section>
					</Section>
					<Section hasSeparator>
						<LinkItem href="#view-all">View all projects</LinkItem>
						<ButtonItem onClick={() => {}}>Create project</ButtonItem>
					</Section>
				</PopupMenuGroup>
			</div>
		</div>
	);
};
