import React, { useCallback, useEffect, useState } from 'react';

import { defineMessages, FormattedMessage } from 'react-intl-next';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button/new';
import ModalTransition from '@atlaskit/modal-dialog/modal-transition';
import { Grid, Inline, Stack } from '@atlaskit/primitives';
import { N0, N90 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { type ContainerTypes } from '../../common/types';
import { AnalyticsAction, usePeopleAndTeamAnalytics } from '../../common/utils/analytics';
import { hasProductPermission } from '../../controllers';
import { useProductPermissions } from '../../controllers/hooks/use-product-permission';
import {
	useTeamContainers,
	useTeamContainersHook,
} from '../../controllers/hooks/use-team-containers';

import { AddContainerCard } from './add-container-card';
import { DisconnectDialogLazy } from './disconnect-dialog/async';
import { LinkedContainerCard } from './linked-container-card';
import { NoProductAccessState } from './no-product-access-empty-state';
import { TeamContainersSkeleton } from './team-containers-skeleton';
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
	components,
	userId,
	cloudId,
	filterContainerId,
	isDisplayedOnProfileCard,
}: TeamContainerProps) => {
	const { createAnalyticsEvent } = useAnalyticsEvents();
	const { teamContainers, loading, unlinkError } = useTeamContainers(teamId);
	const [_, actions] = useTeamContainersHook();
	const [showAddJiraContainer, setShowAddJiraContainer] = useState(false);
	const [showAddConfluenceContainer, setShowAddConfluenceContainer] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const [isDisconnectDialogOpen, setIsDisconnectDialogOpen] = useState(false);
	const [selectedContainerDetails, setSelectedContainerDetails] = useState<
		SelectedContainerDetails | undefined
	>();
	const [filteredTeamContainers, setFilteredTeamContainers] = useState(teamContainers);

	const { fireOperationalEvent, fireTrackEvent } = usePeopleAndTeamAnalytics();

	const { data: productPermissions, loading: productPermissionIsLoading } = useProductPermissions({
		userId,
		cloudId,
	});

	useEffect(() => {
		if (isDisplayedOnProfileCard && filterContainerId) {
			setFilteredTeamContainers(
				teamContainers.filter((container) => container.id !== filterContainerId),
			);
		} else {
			setFilteredTeamContainers(teamContainers);
		}
	}, [isDisplayedOnProfileCard, filterContainerId, teamContainers]);

	useEffect(() => {
		if (
			filteredTeamContainers.length > MAX_NUMBER_OF_CONTAINERS_TO_SHOW ||
			isDisplayedOnProfileCard
		) {
			setShowAddJiraContainer(false);
			setShowAddConfluenceContainer(false);
		} else {
			const hasJiraProject = filteredTeamContainers.some(
				(container) => container.type === 'JiraProject',
			);
			const hasConfluenceSpace = filteredTeamContainers.some(
				(container) => container.type === 'ConfluenceSpace',
			);
			setShowAddJiraContainer(
				!hasJiraProject &&
					!!productPermissions &&
					!!hasProductPermission(productPermissions, 'jira'),
			);
			setShowAddConfluenceContainer(
				!hasConfluenceSpace &&
					!!productPermissions &&
					!!hasProductPermission(productPermissions, 'confluence'),
			);
		}
	}, [isDisplayedOnProfileCard, productPermissions, filteredTeamContainers]);

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

	const LinkedContainerCardComponent = components?.ContainerCard || LinkedContainerCard;

	const handleDisconnect = useCallback(
		async (containerId: string) => {
			const removedContainer = filteredTeamContainers.find(
				(container) => container.id === containerId,
			);
			await actions.unlinkTeamContainers(teamId, containerId);
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
			teamId,
			unlinkError,
		],
	);

	if (loading || productPermissionIsLoading) {
		return <TeamContainersSkeleton numberOfContainers={MAX_NUMBER_OF_CONTAINERS_TO_SHOW} />;
	}

	if (
		filteredTeamContainers.length === 0 &&
		(!productPermissions ||
			!(
				productPermissions &&
				(hasProductPermission(productPermissions, 'jira') ||
					hasProductPermission(productPermissions, 'confluence'))
			))
	) {
		return <NoProductAccessState />;
	}

	return (
		<>
			<Stack space="space.200">
				<Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="space.100">
					{filteredTeamContainers.slice(0, MAX_NUMBER_OF_CONTAINERS_TO_SHOW).map((container) => {
						return (
							<LinkedContainerCardComponent
								key={container.id}
								containerType={container.type}
								title={container.name}
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
					{showAddJiraContainer && (
						<AddContainerCard
							onAddAContainerClick={(e) => onAddAContainerClick(e, 'Jira')}
							containerType="JiraProject"
						/>
					)}
					{showAddConfluenceContainer && (
						<AddContainerCard
							onAddAContainerClick={(e) => onAddAContainerClick(e, 'Confluence')}
							containerType="ConfluenceSpace"
						/>
					)}
					{showMore &&
						filteredTeamContainers.slice(MAX_NUMBER_OF_CONTAINERS_TO_SHOW).map((container) => {
							return (
								<LinkedContainerCardComponent
									key={container.id}
									containerType={container.type}
									title={container.name}
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
				{filteredTeamContainers.length > MAX_NUMBER_OF_CONTAINERS_TO_SHOW && (
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
		id: 'ptc-directory.team-profile-page.team-containers.show-more.non-final',
		defaultMessage: 'Show more',
		description: 'Button to show more containers',
	},
	showLess: {
		id: 'ptc-directory.team-profile-page.team-containers.show-less.non-final',
		defaultMessage: 'Show less',
		description: 'Button to show less containers',
	},
});
