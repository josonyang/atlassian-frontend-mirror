import React, { useCallback, useEffect, useState } from 'react';

import { defineMessages, FormattedMessage } from 'react-intl-next';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button/new';
import ModalTransition from '@atlaskit/modal-dialog/modal-transition';
import { fg } from '@atlaskit/platform-feature-flags';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Grid, Inline, Stack } from '@atlaskit/primitives';
import {
	hasProductPermission,
	useProductPermissions,
} from '@atlaskit/teams-app-internal-product-permissions';
import { N0, N90 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { type ContainerTypes, type TeamContainer } from '../../common/types';
import { AnalyticsAction, usePeopleAndTeamAnalytics } from '../../common/utils/analytics';
import { hasProductPermission as hasProductPermissionOld } from '../../controllers';
import { useProductPermissions as useProductPermissionsOld } from '../../controllers/hooks/use-product-permission';
import {
	useTeamContainers,
	useTeamContainersHook,
} from '../../controllers/hooks/use-team-containers';
import { useTeamLinksAndContainers } from '../../controllers/hooks/use-team-links-and-containers';

import { AddContainerCard } from './add-container-card';
import { DisconnectDialogLazy } from './disconnect-dialog/async';
import { LinkedContainerCard } from './linked-container-card';
import { NoProductAccessState } from './no-product-access-empty-state';
import { TeamContainersSkeleton } from './team-containers-skeleton';
import { TeamLinkCard } from './team-link-card';
import { type TeamContainerProps } from './types';

export const ICON_BACKGROUND = token('color.icon.inverse', N0);
export const ICON_COLOR = token('color.icon.subtle', N90);
export const MAX_NUMBER_OF_CONTAINERS_TO_SHOW = 4;

interface SelectedContainerDetails {
	containerId: string;
	containerType: ContainerTypes;
	containerName: string;
}

export const TeamContainers = ({
	teamId,
	onAddAContainerClick,
	onEditContainerClick,
	components,
	userId,
	cloudId,
	filterContainerId,
	isDisplayedOnProfileCard,
	maxNumberOfContainersToShow = MAX_NUMBER_OF_CONTAINERS_TO_SHOW,
}: TeamContainerProps) => {
	const { createAnalyticsEvent } = useAnalyticsEvents();
	const { teamContainers, loading, unlinkError } = useTeamContainers(teamId);
	const { teamLinks, removeTeamLink, iconsLoading, iconHasLoaded } = useTeamLinksAndContainers(
		teamId,
		true,
	);
	const [_, actions] = useTeamContainersHook();
	const [showMore, setShowMore] = useState(false);
	const [isDisconnectDialogOpen, setIsDisconnectDialogOpen] = useState(false);
	const [selectedContainerDetails, setSelectedContainerDetails] = useState<
		SelectedContainerDetails | undefined
	>();
	const [filteredTeamContainers, setFilteredTeamContainers] = useState(teamContainers);
	const [filteredTeamLinks, setFilteredTeamLinks] = useState(teamLinks);

	const [showAddContainer, setShowAddContainer] = useState({
		Jira: false,
		Confluence: false,
		Loom: false,
		WebLink: false,
	});

	const { fireOperationalEvent, fireTrackEvent } = usePeopleAndTeamAnalytics();

	const { data: productPermissions, loading: productPermissionIsLoading } = useProductPermissions({
		userId,
		cloudId,
		options: {
			enabled: fg('migrate-product-permissions'),
		},
	});

	const { data: productPermissionsOld, loading: productPermissionIsLoadingOld } =
		useProductPermissionsOld(
			{
				userId,
				cloudId,
			},
			{ enabled: !fg('migrate-product-permissions') },
		);

	useEffect(() => {
		if (fg('enable_web_links_in_team_containers')) {
			if (isDisplayedOnProfileCard && filterContainerId) {
				setFilteredTeamLinks(teamLinks.filter((container) => container.id !== filterContainerId));
			} else {
				setFilteredTeamLinks(teamLinks);
			}
		} else {
			if (isDisplayedOnProfileCard && filterContainerId) {
				setFilteredTeamContainers(
					teamContainers.filter((container) => container.id !== filterContainerId),
				);
			} else {
				setFilteredTeamContainers(teamContainers);
			}
		}
	}, [teamLinks, teamContainers, isDisplayedOnProfileCard, filterContainerId]);

	useEffect(() => {
		const containersToCheck = fg('enable_web_links_in_team_containers')
			? filteredTeamLinks
			: filteredTeamContainers;
		if (containersToCheck.length > maxNumberOfContainersToShow || isDisplayedOnProfileCard) {
			setShowAddContainer({ Jira: false, Confluence: false, Loom: false, WebLink: false });
		} else {
			const hasJiraProject = containersToCheck.some(
				(container) => container.type === 'JiraProject',
			);
			const hasConfluenceSpace = containersToCheck.some(
				(container) => container.type === 'ConfluenceSpace',
			);
			const hasLoomSpace = containersToCheck.some((container) => container.type === 'LoomSpace');
			const hasWebLink = containersToCheck.some((container) => container.type === 'WebLink');

			setShowAddContainer(
				fg('migrate-product-permissions')
					? {
							Jira:
								!hasJiraProject &&
								!!productPermissions &&
								!!hasProductPermission(productPermissions, 'jira'),
							Confluence:
								!hasConfluenceSpace &&
								!!productPermissions &&
								!!hasProductPermission(productPermissions, 'confluence'),
							Loom:
								!hasLoomSpace &&
								!!productPermissions &&
								!!hasProductPermission(productPermissions, 'loom'),
							WebLink: !hasWebLink,
						}
					: {
							Jira:
								!hasJiraProject &&
								!!productPermissionsOld &&
								!!hasProductPermissionOld(productPermissionsOld, 'jira'),
							Confluence:
								!hasConfluenceSpace &&
								!!productPermissionsOld &&
								!!hasProductPermissionOld(productPermissionsOld, 'confluence'),
							Loom:
								!hasLoomSpace &&
								!!productPermissionsOld &&
								!!hasProductPermissionOld(productPermissionsOld, 'loom'),
							WebLink: !hasWebLink,
						},
			);
		}
	}, [
		isDisplayedOnProfileCard,
		productPermissions,
		productPermissionsOld,
		filteredTeamContainers,
		filteredTeamLinks,
		maxNumberOfContainersToShow,
	]);

	const handleShowMore = () => {
		setShowMore(!showMore);
	};

	const handleOpenDisconnectDialog = useCallback(
		(containerDetails: SelectedContainerDetails) => {
			setSelectedContainerDetails(containerDetails);
			setIsDisconnectDialogOpen(true);

			fireTrackEvent(createAnalyticsEvent, {
				action: AnalyticsAction.OPENED,
				actionSubject: 'unlinkContainerDialog',
				attributes: { teamId },
			});
		},
		[createAnalyticsEvent, fireTrackEvent, teamId],
	);

	const handleEditContainerClick = useCallback(
		(container: TeamContainer) => {
			if (container.type === 'WebLink' && onEditContainerClick) {
				onEditContainerClick(container.id, container.link || '', container.name);
			}
		},
		[onEditContainerClick],
	);

	const LinkedContainerCardComponent =
		components?.ContainerCard ||
		(fg('enable_web_links_in_team_containers') ? TeamLinkCard : LinkedContainerCard);

	const handleDisconnect = useCallback(
		async (containerId: string) => {
			const removedContainer = fg('enable_web_links_in_team_containers')
				? filteredTeamLinks.find((container) => container.id === containerId)
				: filteredTeamContainers.find((container) => container.id === containerId);

			if (removedContainer && fg('enable_web_links_in_team_containers')) {
				await removeTeamLink(removedContainer);
			} else {
				await actions.unlinkTeamContainers(teamId, containerId);
			}

			setIsDisconnectDialogOpen(false);
			if (unlinkError) {
				fireOperationalEvent(createAnalyticsEvent, {
					action: AnalyticsAction.FAILED,
					actionSubject: 'teamContainerUnlinked',
				});
			} else {
				fireOperationalEvent(createAnalyticsEvent, {
					action: AnalyticsAction.SUCCEEDED,
					actionSubject: 'teamContainerUnlinked',
					attributes: {
						containerRemoved: {
							containerId: removedContainer?.id,
							container: removedContainer?.type,
						},
						teamId,
					},
				});
			}
		},
		[
			actions,
			createAnalyticsEvent,
			fireOperationalEvent,
			filteredTeamContainers,
			filteredTeamLinks,
			removeTeamLink,
			teamId,
			unlinkError,
		],
	);

	const TeamContainersSkeletonComponent =
		components?.TeamContainersSkeleton || TeamContainersSkeleton;

	if (
		loading ||
		(fg('migrate-product-permissions') ? productPermissionIsLoading : productPermissionIsLoadingOld)
	) {
		return <TeamContainersSkeletonComponent numberOfContainers={maxNumberOfContainersToShow} />;
	}

	const hasAnyProductPermission =
		(productPermissions &&
			(hasProductPermission(productPermissions, 'jira') ||
				hasProductPermission(productPermissions, 'confluence') ||
				hasProductPermission(productPermissions, 'loom')) &&
			fg('migrate-product-permissions')) ||
		(productPermissionsOld &&
			(hasProductPermissionOld(productPermissionsOld, 'jira') ||
				hasProductPermissionOld(productPermissionsOld, 'confluence') ||
				hasProductPermissionOld(productPermissionsOld, 'loom')) &&
			!fg('migrate-product-permissions'));

	if (
		(fg('enable_web_links_in_team_containers')
			? filteredTeamLinks.length === 0
			: filteredTeamContainers.length === 0) &&
		!isDisplayedOnProfileCard &&
		!hasAnyProductPermission
	) {
		return <NoProductAccessState />;
	}

	return (
		<>
			<Stack space="space.200">
				<Grid
					templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
					gap={isDisplayedOnProfileCard ? 'space.0' : 'space.100'}
				>
					{fg('enable_web_links_in_team_containers')
						? filteredTeamLinks.slice(0, maxNumberOfContainersToShow).map((container) => {
								return (
									<LinkedContainerCardComponent
										key={container.id}
										containerType={container.type}
										containerTypeProperties={container.containerTypeProperties}
										title={container.name}
										containerIcon={container.icon || undefined}
										link={container.link || undefined}
										containerId={container.id}
										iconsLoading={iconsLoading}
										iconHasLoaded={iconHasLoaded}
										onDisconnectButtonClick={() =>
											handleOpenDisconnectDialog({
												containerId: container.id,
												containerType: container.type,
												containerName: container.name,
											})
										}
										onEditLinkClick={() => handleEditContainerClick(container)}
									/>
								);
							})
						: filteredTeamContainers.slice(0, maxNumberOfContainersToShow).map((container) => {
								return (
									<LinkedContainerCardComponent
										key={container.id}
										containerType={container.type}
										containerTypeProperties={container.containerTypeProperties}
										title={container.name}
										containerIcon={container.icon || undefined}
										link={container.link || undefined}
										containerId={container.id}
										onDisconnectButtonClick={() =>
											handleOpenDisconnectDialog({
												containerId: container.id,
												containerType: container.type,
												containerName: container.name,
											})
										}
									/>
								);
							})}
					{showAddContainer.Jira && (
						<AddContainerCard
							onAddAContainerClick={(e) => onAddAContainerClick(e, 'Jira')}
							containerType="JiraProject"
						/>
					)}
					{showAddContainer.Confluence && (
						<AddContainerCard
							onAddAContainerClick={(e) => onAddAContainerClick(e, 'Confluence')}
							containerType="ConfluenceSpace"
						/>
					)}
					{showAddContainer.Loom && fg('loom_tab_in_container_linker_team_profile_page') && (
						<AddContainerCard
							onAddAContainerClick={(e) => onAddAContainerClick(e, 'Loom')}
							containerType="LoomSpace"
						/>
					)}
					{showAddContainer.WebLink && fg('enable_web_links_in_team_containers') && (
						<AddContainerCard
							onAddAContainerClick={(e) => onAddAContainerClick(e, 'WebLink')}
							containerType="WebLink"
						/>
					)}
					{showMore && fg('enable_web_links_in_team_containers')
						? filteredTeamLinks.slice(maxNumberOfContainersToShow).map((container) => {
								return (
									<LinkedContainerCardComponent
										key={container.id}
										containerType={container.type}
										containerTypeProperties={container.containerTypeProperties}
										title={container.name}
										containerId={container.id}
										containerIcon={container.icon || undefined}
										link={container.link || undefined}
										iconsLoading={iconsLoading}
										iconHasLoaded={iconHasLoaded}
										onDisconnectButtonClick={() =>
											handleOpenDisconnectDialog({
												containerId: container.id,
												containerType: container.type,
												containerName: container.name,
											})
										}
										onEditLinkClick={() => handleEditContainerClick(container)}
									/>
								);
							})
						: showMore &&
							filteredTeamContainers.slice(maxNumberOfContainersToShow).map((container) => {
								return (
									<LinkedContainerCardComponent
										key={container.id}
										containerType={container.type}
										containerTypeProperties={container.containerTypeProperties}
										title={container.name}
										containerId={container.id}
										containerIcon={container.icon || undefined}
										link={container.link || undefined}
										onDisconnectButtonClick={() =>
											handleOpenDisconnectDialog({
												containerId: container.id,
												containerType: container.type,
												containerName: container.name,
											})
										}
									/>
								);
							})}
				</Grid>
				{(fg('enable_web_links_in_team_containers')
					? filteredTeamLinks.length
					: filteredTeamContainers.length) > maxNumberOfContainersToShow && (
					<Inline>
						<Button appearance="subtle" onClick={handleShowMore}>
							{showMore ? (
								<FormattedMessage {...messages.showLess} />
							) : (
								<FormattedMessage {...messages.showMore} />
							)}
						</Button>
					</Inline>
				)}
			</Stack>
			<ModalTransition>
				{isDisconnectDialogOpen && selectedContainerDetails && (
					<DisconnectDialogLazy
						containerName={selectedContainerDetails.containerName}
						containerType={selectedContainerDetails.containerType}
						onClose={() => setIsDisconnectDialogOpen(false)}
						onDisconnect={() => handleDisconnect(selectedContainerDetails.containerId)}
					/>
				)}
			</ModalTransition>
		</>
	);
};

const messages = defineMessages({
	showMore: {
		id: 'ptc-directory.team-profile-page.team-containers.show-more',
		defaultMessage: 'Show more',
		description: 'Button to show more containers',
	},
	showLess: {
		id: 'ptc-directory.team-profile-page.team-containers.show-less',
		defaultMessage: 'Show less',
		description: 'Button to show less containers',
	},
});
