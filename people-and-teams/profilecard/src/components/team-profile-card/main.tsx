/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { useCallback, useMemo } from 'react';

import { FormattedMessage } from 'react-intl-next';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import AvatarGroup, { type AvatarProps } from '@atlaskit/avatar-group';
import { cssMap, jsx } from '@atlaskit/css';
import Heading from '@atlaskit/heading';
import { VerifiedTeamIcon } from '@atlaskit/people-teams-ui-public/verified-team-icon';
import { Box, Inline, Pressable, Stack, Text } from '@atlaskit/primitives/compiled';
import TeamAvatar from '@atlaskit/teams-avatar';
import { type TeamContainer, TeamContainers, useTeamContainers } from '@atlaskit/teams-public';
import { token } from '@atlaskit/tokens';

import { fireEvent } from '../../util/analytics';

import { TeamConnections } from './team-connections/main';
import { TeamContainersSkeleton } from './team-containers-skeleton';

const noop = () => {};

const styles = cssMap({
	wrapperStyles: {
		display: 'flex',
		flexDirection: 'column',
		borderRadius: token('border.radius.200'),
		width: '360px',
		minWidth: '340px',
		height: 'auto',
		transition: 'box-shadow 0.25s ease-in-out',
		overflow: 'hidden',
	},
	containerStyles: {
		marginBottom: token('space.200'),
	},
	avatarImageStyles: {
		position: 'absolute',
		marginLeft: token('space.300'),
	},
	headerImageStyles: {
		objectFit: 'cover',
		verticalAlign: 'top',
		height: '100px',
		width: '100%',
	},
	teamInformationStyles: {
		marginLeft: token('space.300'),
		marginTop: token('space.100'),
		marginRight: token('space.300'),
	},
	teamConnectionHeaderStyles: {
		marginLeft: token('space.100'),
		marginRight: token('space.100'),
		maxHeight: '265px',
		overflowY: 'auto',
	},
	teamConnectionContainerStyles: {
		marginLeft: token('space.300'),
		marginRight: token('space.300'),
	},
	connectionTitleStyles: {
		marginLeft: token('space.200'),
		marginTop: token('space.200'),
		marginRight: token('space.200'),
		marginBottom: token('space.075'),
		color: token('color.text.subtle'),
		font: token('font.heading.xxsmall'),
	},
	viewProfileContainerStyles: {
		alignItems: 'center',
		borderTopWidth: token('border.width'),
		borderTopStyle: 'solid',
		borderTopColor: token('color.border'),
		paddingLeft: token('space.300'),
		paddingRight: token('space.300'),
	},
	viewProfileButtonStyles: {
		borderRadius: token('border.radius.100'),
		backgroundColor: token('color.background.neutral.subtle'),
		color: token('color.text.subtle'),
		borderWidth: token('border.width'),
		borderStyle: 'solid',
		borderColor: token('color.border'),
		width: '100%',
		height: '30px',
		marginTop: token('space.200'),
	},
});

const TeamCardWrapper = ({ id, children }: { id: string; children: React.ReactNode }) => (
	<Box xcss={styles.wrapperStyles} testId={`team-card-${id}`}>
		{children}
	</Box>
);

const HeaderImage = ({ srcUrl }: { srcUrl: string }) => (
	<Box
		as="img"
		src={srcUrl}
		xcss={styles.headerImageStyles}
		testId="profile-header-image"
		alt="team-header-image"
	/>
);

interface TeamProfileCardProps {
	containerId: string;
	teamId: string;
	displayName: string;
	description: string;
	avatarImageUrl: string;
	headerImageUrl: string;
	memberAvatars: AvatarProps[];
	memberCount: number;
	cloudId: string;
	userId: string;
	isVerified?: boolean;
	teamProfileUrl?: string;
}

export const TeamProfileCard = ({
	containerId,
	teamId,
	displayName,
	description,
	avatarImageUrl,
	headerImageUrl,
	memberAvatars,
	memberCount,
	cloudId,
	userId,
	isVerified,
	teamProfileUrl,
}: TeamProfileCardProps) => {
	const { teamContainers, loading } = useTeamContainers(teamId);
	const { createAnalyticsEvent } = useAnalyticsEvents();
	// Ensure that the current container is not the only connection for this team before showing the "Where we work" section
	const hasOtherTeamConnections = useMemo(
		() =>
			teamContainers.filter((tc: TeamContainer) => tc.id === containerId).length <
			teamContainers.length,
		[containerId, teamContainers],
	);

	const onClick = useCallback(() => {
		if (createAnalyticsEvent) {
			fireEvent(createAnalyticsEvent, {
				action: 'clicked',
				actionSubject: 'button',
				actionSubjectId: 'viewTeamProfileButton',
				attributes: {},
			});
		}
		window.open(teamProfileUrl, '_blank');
	}, [createAnalyticsEvent, teamProfileUrl]);

	return (
		<TeamCardWrapper id={teamId}>
			<HeaderImage srcUrl={headerImageUrl} />
			<Stack space="space.200" xcss={styles.containerStyles}>
				<Inline spread="space-between" alignBlock="center">
					<Box xcss={styles.avatarImageStyles}>
						<TeamAvatar size="medium" src={avatarImageUrl} />
					</Box>
				</Inline>

				<Stack xcss={styles.teamInformationStyles} space="space.200">
					<Stack space="space.050">
						<Inline alignBlock="center">
							<Heading size="medium">{displayName}</Heading>
							{isVerified && <VerifiedTeamIcon showTooltip />}
						</Inline>
						<Text color="color.text.subtlest">
							<FormattedMessage
								defaultMessage="Contributing team &bull; {count, plural, one {# member} other {# members}}"
								values={{ count: memberCount }}
								id="people-and-teams.team-profile-card.member-count"
							/>
						</Text>
					</Stack>
					<Inline>
						<AvatarGroup appearance="stack" data={memberAvatars} />
					</Inline>
					{description && (
						<Text color="color.text" maxLines={3}>
							{description}
						</Text>
					)}
				</Stack>
				{(loading || hasOtherTeamConnections) && (
					<Box
						xcss={
							hasOtherTeamConnections
								? styles.teamConnectionHeaderStyles
								: styles.teamConnectionContainerStyles
						}
					>
						{hasOtherTeamConnections && (
							<Box xcss={styles.connectionTitleStyles}>
								<FormattedMessage
									defaultMessage="Where we work"
									id="people-and-teams.team-profile-card.team-connections"
								/>
							</Box>
						)}
						<TeamContainers
							teamId={teamId}
							onAddAContainerClick={noop}
							userId={userId}
							cloudId={cloudId}
							components={{
								ContainerCard: TeamConnections,
								TeamContainersSkeleton: TeamContainersSkeleton,
							}}
							filterContainerId={containerId}
							isDisplayedOnProfileCard
						/>
					</Box>
				)}
				{teamProfileUrl && (
					<Stack xcss={styles.viewProfileContainerStyles}>
						<Pressable
							onClick={onClick}
							xcss={styles.viewProfileButtonStyles}
							testId="view-profile-button"
						>
							<FormattedMessage
								defaultMessage="View profile"
								id="people-and-teams.team-profile-card.view-profile"
							/>
						</Pressable>
					</Stack>
				)}
			</Stack>
		</TeamCardWrapper>
	);
};
