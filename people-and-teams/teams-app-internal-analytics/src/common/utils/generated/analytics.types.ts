/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Generates Typescript types for analytics events from analytics.spec.yaml
 *
 * @codegen <<SignedSource::0d7940fbc9a2038bb629f21e1f22705f>>
 * @codegenCommand yarn workspace @atlassian/analytics-tooling run analytics:codegen teams-app-internal-analytics
 */
export type PackageMetaDataType = {
	packageName: string;
	packageVersion: string;
};

export type ButtonClickedAnalyticsExampleAttributesType = {
	testAttribute: string;
};
export type AutomationTriggeredAnalyticsExampleAttributesType = {
	testAttribute: string;
};
export type AutomationFiredAnalyticsExampleAttributesType = {
	testAttribute: string;
};
export type AnalyticsExampleScreenViewedAttributesType = {
	testAttribute: string;
};
export type AssignTeamToASiteMessageViewedAttributesType = {};
export type AssignThisTeamToASiteClickedAttributesType = {};
export type AssignTeamToASiteModalViewedAttributesType = {};
export type AssignTeamToASiteSiteSelectedSelectedAttributesType = {
	isSuggestedSite: boolean;
};
export type AssignTeamToASiteConfirmButtonClickedAttributesType = {
	success: boolean;
};
export type AssignTeamToASiteCancelButtonClickedAttributesType = {};
export type MemberPickerErrorAttributesType = {};
export type RequestedContainersRequestedAttributesType = {
	containers: Record<string, unknown>;
};
export type TeamCreateDialogViewedAttributesType = {
	proposedMembersLength: number;
};
export type MemberSuggestedAttributesType = {};
export type TeamCreateDialogSubmittedAttributesType = {
	canCreateTeam: boolean;
	numberOfMembers: number;
	numberOfSuggestedMembers: number;
};
export type TeamCreateDialogClickedTeamLinkSuccessFlagAttributesType = {
	teamId: string;
	numberOfMembers: number;
};
export type TeamCreateDialogSucceededAttributesType = {
	teamId: string;
	numberOfMembers: number;
	defaultTeamType: 'OPEN' | 'MEMBER_INVITE' | 'EXTERNAL' | null;
	chosenTeamType: 'OPEN' | 'MEMBER_INVITE' | 'EXTERNAL';
	teamTypeChoiceEnabled: boolean | null;
};
export type TeamCreateDialogFailedAttributesType = {
	numberOfMembers: number;
	errorMessage: string;
	errorStack: string | null;
	errorStatus: number;
	traceId: string | null;
};
export type TeamTypePickerClickedAttributesType = {
	defaultType: 'OPEN' | 'MEMBER_INVITE' | 'EXTERNAL' | null;
	chosenType: 'OPEN' | 'MEMBER_INVITE';
};
export type TeamCreateDialogClosedAttributesType = {};
export type InviteCapabilitiesServiceFailedAttributesType = {
	integration: string;
	products: unknown[];
};
export type AddToTeamServiceFailedAttributesType = {
	integration: string;
	message: string | null;
	errorsCount: number | null;
	errors: unknown[] | null;
};
export type InvitedTeamMembersAddedAttributesType = {
	numberOfMembers: number;
	members: unknown[];
	integration: string;
};
export type InviteToProductServiceFailedAttributesType = {
	integration: string;
	message: string | null;
	errorsCount: number | null;
	errors: unknown[] | null;
	result: unknown[] | null;
};
export type ContainerPermissionsSucceededAttributesType = {
	canCreateConfluenceContainer: boolean;
	canCreateJiraContainer: boolean;
	canCreateLoomContainer: boolean;
};
export type TeamWorkedOnRenderedAttributesType = {
	state: 'error' | 'empty' | 'data' | 'unknown';
};
export type TeamWorkedOnFailedAttributesType = {
	error: string | null;
	traceId: string | null;
	status: number | null;
	statusText: string | null;
};
export type TeamWorkedOnSucceededAttributesType = {
	error: string | null;
	traceId: string | null;
	status: number | null;
	statusText: string | null;
};
export type ViewAllIssuesClickedAttributesType = {
	isOpenNewTab: boolean;
	teamId: string;
};
export type TeamWorkedOnLinkClickedAttributesType = {
	isOpenNewTab: boolean;
};
export type NavigationMenuItemClickedAddPeopleNavigationMenuItemAttributesType = {
	product: string;
	integration: string;
};
export type CreateNewTeamLinkClickedAttributesType = {};
export type ViewAllPeopleDirectoryClickedAttributesType = {
	isLeftClick: boolean;
};
export type PeopleMenuLinkClickedAttributesType = {
	isLeftClick: boolean;
};
export type PeopleMenuViewedLoadingIndicatorAttributesType = {
	duration: number;
	startTime: number;
};
export type TeamMenuLinkClickedAttributesType = {
	isLeftClick: boolean;
};
export type PeopleMenuViewedAttributesType = {
	isCacheEmpty: boolean;
};
export type AddPeopleNavigationItemRenderedAttributesType = {};
export type PeopleMenuViewedNoBrowsePermissionAttributesType = {};
export type PeopleMenuSucceededAttributesType = {
	usersCount: number;
	teamsCount: number;
	duration: number;
	startTime: number;
};
export type HoverAndClickPeopleButtonMeasuredAttributesType = {
	duration: number;
	startTime: number;
};
export type PreFetchDataTriggeredAttributesType = {};
export type FetchingUsersTeamsDataMeasuredAttributesType = {
	duration: number;
	startTime: number;
};
export type PeopleMenuLinkSucceededAttributesType = {};
export type PeopleMenuLinkFailedAttributesType = {
	status: number | null;
	error: string;
};
export type TeamMenuLinkSucceededAttributesType = {};
export type TeamMenuLinkFailedAttributesType = {
	status: number | null;
	error: string;
};
export type ParentTeamLinkerOpenedAttributesType = {};
export type ParentTeamLinkerClosedAttributesType = {
	isCanceled: boolean;
	newParentTeamId: string;
};
export type AddParentTeamFailedAttributesType = {
	parentTeamId: string;
	error: string;
};
export type RemoveParentTeamFailedAttributesType = {
	error: string;
};
export type SubTeamLinkerOpenedAttributesType = {};
export type SubTeamListUpdatedAttributesType = {
	subTeamId: string;
	action: 'add' | 'remove';
};
export type AddSubTeamFailedAttributesType = {
	subTeamId: string;
	error: string;
};
export type RemoveSubTeamFailedAttributesType = {
	subTeamId: string;
	error: string;
};
export type FetchTeamContainersSucceededAttributesType = {
	teamId: string;
};
export type FetchTeamContainersFailedAttributesType = {
	teamId: string;
	error: Record<string, unknown>;
};
export type RefetchTeamContainersSucceededAttributesType = {
	teamId: string;
};
export type RefetchTeamContainersFailedAttributesType = {
	teamId: string;
	error: Record<string, unknown>;
};
export type FetchNumberOfConnectedTeamsSucceededAttributesType = {
	containerId: string;
	numberOfTeams: number | null;
};
export type FetchNumberOfConnectedTeamsFailedAttributesType = {
	containerId: string;
	numberOfTeams: number | null;
	error: Record<string, unknown>;
};
export type FetchConnectedTeamsSucceededAttributesType = {
	containerId: string;
	numberOfTeams: number | null;
};
export type FetchConnectedTeamsFailedAttributesType = {
	containerId: string;
	numberOfTeams: number | null;
	error: Record<string, unknown>;
};
export type ContainerClickedTeamContainerAttributesType = {
	containerSelected: Record<string, unknown>;
};
export type UnlinkContainerDialogOpenedAttributesType = {
	teamId: string;
};
export type TeamContainerUnlinkedFailedAttributesType = {};
export type TeamContainerUnlinkedSucceededAttributesType = {
	teamId: string;
	containerRemoved: Record<string, unknown>;
};
export type ButtonClickedContainerUnlinkButtonAttributesType = {
	containerSelected: Record<string, unknown> | null;
};
export type ButtonClickedContainerEditLinkButtonAttributesType = {
	containerSelected: Record<string, unknown>;
};
export type ButtonClickedContainerRemoveLinkButtonAttributesType = {
	containerSelected: Record<string, unknown>;
};
export type LinkClickedTeamMemberAttributesType = {};
export type TeamMemberClickedAttributesType = {};
export type TeamAgentClickedAttributesType = {};
export type ConnectedGroupClickedAttributesType = {};
export type TeamSettingsDialogViewedAttributesType = {};
export type DialogOpenedDeleteTeamAttributesType = {};
export type AgentProfileViewedAttributesType = {};
export type EditAgentClickedAttributesType = {};
export type DuplicateAgentClickedAttributesType = {};
export type CopyAgentClickedAttributesType = {};
export type DeleteAgentClickedAttributesType = {};
export type ChatWithAgentClickedAttributesType = {};
export type StartConversationWithAgentClickedAttributesType = {};
export type TeamMemberRemovedAttributesType = {
	teamSize: number;
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
};
export type TeamInvitationAcceptedAttributesType = {
	teamId: string;
};
export type TeamInvitationDeclinedAttributesType = {
	teamId: string;
};
export type TeamProfileNameEditedAttributesType = {
	teamId: string;
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
};
export type TeamProfileDescriptionEditedAttributesType = {
	teamId: string;
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
};
export type TeamMembershipControlEditedAttributesType = {
	teamType: 'OPEN' | 'MEMBER_INVITE' | 'EXTERNAL';
	currentTeamType: 'OPEN' | 'MEMBER_INVITE' | 'EXTERNAL';
	isTeamNameChanged: boolean;
	avatarColour: string;
};
export type TeamJoinedAttributesType = {
	actualTransition: 'join' | 'joinRequest';
	teamId: string;
};
export type JoinRequestCreatedAttributesType = {
	actualTransition: 'join' | 'joinRequest';
	teamId: string;
};
export type TeamRemovedAttributesType = {
	teamId: string;
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
	teamSize: number;
};
export type TeamLinkCategoryOpenedAttributesType = {};
export type TeamLinkCategoryClickedAttributesType = {
	linkType: string;
};
export type DialogClosedTeamDeletionAttributesType = {};
export type DialogOpenedTeamDeletionAttributesType = {};
export type ConfirmationCheckedTeamDeletionAttributesType = {
	checked: boolean;
};
export type TeamDeletionFailedAttributesType = {
	teamId: string;
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
	teamSize: number;
};
export type JoinRequestAcceptedAttributesType = {
	teamId: string;
	memberId: string;
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
};
export type JoinRequestClosedAttributesType = {
	teamId: string;
};
export type JoinRequestDeclinedAttributesType = {
	teamId: string;
	memberId: string;
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
};
export type JoinRequestCancelFailedAttributesType = {
	status: number;
};
export type TeamInvitationSentAttributesType = {
	teamId: string;
	numberOfMembers: number;
};
export type JoinRequestAcceptFailedAttributesType = {
	status: number;
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
};
export type JoinRequestDeclineFailedAttributesType = {
	status: number;
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
};
export type TeamInvitationSucceededAttributesType = {
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
};
export type TeamInvitationFailedAttributesType = {
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
};
export type TeamAboutTaskStartAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamAboutTaskSuccessAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamAboutTaskAbortAttributesType = {
	abortReason: string;
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamAboutTaskFailAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamNameTaskStartAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamNameTaskSuccessAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamNameTaskAbortAttributesType = {
	abortReason: string;
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamNameTaskFailAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamDescriptionTaskStartAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamDescriptionTaskSuccessAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamDescriptionTaskAbortAttributesType = {
	abortReason: string;
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamDescriptionTaskFailAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamPermissionsTaskStartAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamPermissionsTaskSuccessAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamPermissionsTaskAbortAttributesType = {
	abortReason: string;
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamPermissionsTaskFailAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type MembersTaskStartAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type MembersTaskSuccessAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type MembersTaskAbortAttributesType = {
	abortReason: string;
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type MembersTaskFailAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type SubmitTaskStartAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type SubmitTaskSuccessAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type SubmitTaskAbortAttributesType = {
	abortReason: string;
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type SubmitTaskFailAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type RemoveTeamMemberTaskStartAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type RemoveTeamMemberTaskSuccessAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type RemoveTeamMemberTaskAbortAttributesType = {
	abortReason: string;
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type RemoveTeamMemberTaskFailAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type OpenDialogTaskStartAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type OpenDialogTaskSuccessAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type OpenDialogTaskAbortAttributesType = {
	abortReason: string;
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type OpenDialogTaskFailAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type EditTeamNameOrDescriptionTaskStartAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type EditTeamNameOrDescriptionTaskSuccessAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type EditTeamNameOrDescriptionTaskAbortAttributesType = {
	abortReason: string;
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type EditTeamNameOrDescriptionTaskFailAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type RecommendedProductsTaskSuccessAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type RecommendedProductsTaskFailAttributesType = {
	sloSatisifed: boolean;
	taskDuration: number;
	latencySlo: number;
	isStandalone: boolean;
	hasBrowsUsersPermission: boolean;
};
export type TeamsPermissionsRequestFailedAttributesType = {
	message: string;
	status: string;
	path: string;
};
export type TeamsPermissionsRequestSucceededAttributesType = {
	canCreateTeams: boolean;
	canViewTeams: boolean;
	canAdminTeams: boolean;
};
export type TeamContainerLinkerOpenedAttributesType = {};
export type TeamContainerLinkedFailedAttributesType = {};
export type TeamContainerLinkedSuccessAttributesType = {};
export type TeamContainerLinkedViewedAttributesType = {};
export type TeamContainerLinkerViewedAttributesType = {
	screen: string;
};
export type TeamContainerLinkerResultsViewedAttributesType = {
	screen: string;
};
export type ConnectJiraProjectTabClickedAttributesType = {};
export type ConnectLoomSpaceTabClickedAttributesType = {};
export type ConnectConfluenceSpaceTabClickedAttributesType = {};
export type TeamProfileCardViewedAttributesType = {
	screen: string;
};
export type TeamButtonViewedAttributesType = {
	teamsCount: number;
	scope: string;
	version: string;
};
export type TeamButtonClickedAttributesType = {
	teamsCount: number;
	scope: string;
	version: string;
};
export type TeamProfileButtonClickedAttributesType = {};
export type ProfileRadarButtonClickedAttributesType = {};
export type AddTeamModalViewedAttributesType = {};
export type AddTeamModalConfirmButtonClickedAttributesType = {};
export type ManageTeamsModalViewedAttributesType = {};
export type DisconnectTeamModalViewedAttributesType = {};
export type RemoveTeamButtonClickedAttributesType = {
	screen: string;
};
export type ManageTeamsButtonClickedAttributesType = {};
export type TeamSelectorViewedAttributesType = {};
export type ManageTeamsSaveButtonClickedAttributesType = {};
export type TeamAgentAssociationSucceededAttributesType = {
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
};
export type TeamAgentAssociationFailedAttributesType = {
	orgAdminTriggered: boolean;
	memberOfTeam: boolean;
};
export type TeamAgentAssociationSucceddedAttributesType = {
	numberOfAgents: number;
	teamId: string;
};
export type TeamContainerCreatedAndLinkedSuccessAttributesType = {
	teamId: string;
	containerType: string;
};
export type TeamContainerCreatedAndLinkedFailedAttributesType = {
	teamId: string;
	containerType: string;
	failureReason: string;
};
export type CreateJiraContainerViewedAttributesType = {
	teamId: string;
};
export type CreateJiraContainerClickedAttributesType = {
	teamId: string;
};
export type CreateConfluenceContainerViewedAttributesType = {
	teamId: string;
};
export type CreateConfluenceContainerClickedAttributesType = {
	teamId: string;
};
export type CreateLoomContainerViewedAttributesType = {
	teamId: string;
};
export type CreateLoomContainerClickedAttributesType = {
	teamId: string;
};
export type CreateWebLinkContainerViewedAttributesType = {
	teamId: string;
};
export type CreateWebLinkContainerClickedAttributesType = {
	teamId: string;
};
export type CreateContainerFooterViewedAttributesType = {
	teamId: string;
	canCreateConfluenceContainer: boolean;
	canCreateJiraContainer: boolean;
	canCreateLoomContainer: boolean;
};
export type ShowMoreTeamActivitiesClickedAttributesType = {};
export type TeamActivityClickedAttributesType = {
	provider: string;
};
export type TeamProfileActivityTabViewedAttributesType = {
	teamId: string;
};
export type TeamProfileTabSelectedAttributesType = {
	tabId: string;
};
export type TeamConnectionItemClickedTeamProfileCardAttributesType = {
	container: 'ConfluenceSpace' | 'JiraProject' | 'LoomSpace' | 'WebLink';
};
export type ButtonClickedViewTeamProfileButtonAttributesType = {};
export type ProfilecardTriggeredAttributesType = {
	firedAt: number;
	method: 'hover' | 'click';
};
export type RovoAgentProfilecardTriggeredAttributesType = {
	firedAt: number;
	method: 'hover' | 'click';
};
export type TeamProfileCardTriggeredAttributesType = {
	firedAt: number;
	method: 'hover' | 'click';
	teamId: string;
};
export type UserTriggeredAttributesType = {
	firedAt: number;
	method: 'hover' | 'click';
};
export type ProfilecardRenderedSpinnerAttributesType = {
	firedAt: number;
};
export type TeamProfileCardRenderedSpinnerAttributesType = {
	firedAt: number;
};
export type RovoAgentProfilecardRenderedSpinnerAttributesType = {
	firedAt: number;
};
export type UserRenderedSpinnerAttributesType = {
	firedAt: number;
};
export type ProfilecardRenderedErrorAttributesType = {
	firedAt: number;
	hasRetry: boolean;
	errorType: 'default' | 'NotFound';
};
export type TeamProfileCardRenderedErrorAttributesType = {
	firedAt: number;
	duration: number;
};
export type ProfilecardClickedActionAttributesType = {
	firedAt: number;
	duration: number;
	hasHref: boolean;
	hasOnClick: boolean;
	index: number;
	actionId: string;
};
export type ProfilecardClickedReportingLinesAttributesType = {
	firedAt: number;
	duration: number;
	userType: 'manager' | 'direct-report';
};
export type ProfilecardRenderedContentAttributesType = {
	firedAt: number;
	duration: number;
	numActions: number;
};
export type RovoAgentProfilecardRenderedContentAttributesType = {
	firedAt: number;
};
export type TeamProfileCardRenderedContentAttributesType = {
	firedAt: number;
	duration: number;
	numActions: number;
	memberCount: number | null;
	includingYou: boolean | null;
	descriptionLength: number;
	titleLength: number;
};
export type ButtonClickedDeleteAgentButtonAttributesType = {
	agentId: string;
	source: string;
};
export type ButtonClickedEditAgentButtonAttributesType = {
	agentId: string;
	source: string;
};
export type ButtonClickedCopyAgentLinkButtonAttributesType = {
	agentId: string;
	source: string;
};
export type ButtonClickedDuplicateAgentButtonAttributesType = {
	agentId: string;
	source: string;
};
export type ButtonClickedViewAgentFullProfileButtonAttributesType = {
	agentId: string;
	source: string;
};
export type TeamProfileCardRenderedErrorBoundaryAttributesType = {
	firedAt: number;
	duration: number;
};
export type TeamProfileCardClickedErrorRetryAttributesType = {
	firedAt: number;
	duration: number;
};
export type ProfilecardSucceededRequestAttributesType = {
	firedAt: number;
	duration: number;
};
export type ProfilecardTriggeredRequestAttributesType = {
	firedAt: number;
};
export type ProfilecardFailedRequestAttributesType = {
	firedAt: number;
	duration: number;
	errorMessage: string;
	errorStatusCode: number | null;
	traceId: string | null;
	errorCategory: string | null;
	errorType: string | null;
	errorPath: string | null;
	errorNumber: number | null;
	isSLOFailure: boolean;
};
export type TeamProfileCardSucceededRequestAttributesType = {
	firedAt: number;
	duration: number;
	gateway: boolean;
};
export type TeamProfileCardTriggeredRequestAttributesType = {
	firedAt: number;
};
export type TeamProfileCardFailedRequestAttributesType = {
	firedAt: number;
	duration: number;
	errorMessage: string;
	errorStatusCode: number | null;
	traceId: string | null;
	errorCategory: string | null;
	errorType: string | null;
	errorPath: string | null;
	errorNumber: number | null;
	isSLOFailure: boolean;
	gateway: boolean;
};
export type RovoAgentProfilecardSucceededRequestAttributesType = {
	firedAt: number;
	duration: number;
	gateway: boolean;
};
export type RovoAgentProfilecardTriggeredRequestAttributesType = {
	firedAt: number;
};
export type RovoAgentProfilecardFailedRequestAttributesType = {
	firedAt: number;
	duration: number;
	errorMessage: string;
	errorStatusCode: number | null;
	traceId: string | null;
	errorCategory: string | null;
	errorType: string | null;
	errorPath: string | null;
	errorNumber: number | null;
	isSLOFailure: boolean;
	gateway: boolean;
};
export type RovoAgentProfilecardSucceededDeleteAgentAttributesType = {
	firedAt: number;
	duration: number;
	gateway: boolean;
};
export type RovoAgentProfilecardFailedDeleteAgentAttributesType = {
	firedAt: number;
	duration: number;
	errorMessage: string;
	errorStatusCode: number | null;
	traceId: string | null;
	errorCategory: string | null;
	errorType: string | null;
	errorPath: string | null;
	errorNumber: number | null;
	isSLOFailure: boolean;
	gateway: boolean;
};
export type RovoAgentProfilecardSucceededFavouriteAttributesType = {
	firedAt: number;
	duration: number;
	gateway: boolean;
};
export type RovoAgentProfilecardTriggeredFavouriteAttributesType = {
	firedAt: number;
};
export type RovoAgentProfilecardFailedFavouriteAttributesType = {
	firedAt: number;
	duration: number;
	errorMessage: string;
	errorStatusCode: number | null;
	traceId: string | null;
	errorCategory: string | null;
	errorType: string | null;
	errorPath: string | null;
	errorNumber: number | null;
	isSLOFailure: boolean;
	gateway: boolean;
};
export type RovoAgentProfilecardSucceededUnfavouriteAttributesType = {
	firedAt: number;
	duration: number;
	gateway: boolean;
};
export type RovoAgentProfilecardTriggeredUnfavouriteAttributesType = {
	firedAt: number;
};
export type RovoAgentProfilecardFailedUnfavouriteAttributesType = {
	firedAt: number;
	duration: number;
	errorMessage: string;
	errorStatusCode: number | null;
	traceId: string | null;
	errorCategory: string | null;
	errorType: string | null;
	errorPath: string | null;
	errorNumber: number | null;
	isSLOFailure: boolean;
	gateway: boolean;
};
export type RovoAgentProfilecardSucceededGetAgentPermissionsAttributesType = {
	firedAt: number;
	duration: number;
	gateway: boolean;
};
export type RovoAgentProfilecardFailedGetAgentPermissionsAttributesType = {
	firedAt: number;
	duration: number;
	errorMessage: string;
	errorStatusCode: number | null;
	traceId: string | null;
	errorCategory: string | null;
	errorType: string | null;
	errorPath: string | null;
	errorNumber: number | null;
	isSLOFailure: boolean;
	gateway: boolean;
};
export type ProfilecardClickedMoreActionsAttributesType = {
	firedAt: number;
	duration: number;
	numActions: number;
};
export type TeamProfileCardClickedMoreActionsAttributesType = {
	firedAt: number;
	duration: number;
	numActions: number;
};
export type TeamProfileCardClickedAvatarAttributesType = {
	firedAt: number;
	duration: number;
	hasHref: boolean;
	hasOnClick: boolean;
	index: number;
};
export type TeamProfileCardClickedActionAttributesType = {
	firedAt: number;
	duration: number;
	hasHref: boolean;
	hasOnClick: boolean;
	index: number;
	actionId: string;
};
export type TeamProfileCardClickedMoreMembersAttributesType = {
	firedAt: number;
	duration: number;
	memberCount: number;
};
export type ProfileProjectsAndGoalsTabClickedAttributesType = {
	tabName: string;
};
export type ProfileProjectsAndGoalsViewedAttributesType = {
	isEmpty: boolean;
	hasGoals: boolean;
	hasProjects: boolean;
	product: string;
	workspaceUuid: string | null;
};
export type ProfileProjectsLinkClickedAttributesType = {
	entryIndex: number;
};
export type ProfileGoalsLinkClickedAttributesType = {
	entryIndex: number;
};
export type ButtonClickedFollowTeamProjectsGoalsButtonAttributesType = undefined;
export type ButtonClickedUnfollowTeamProjectsGoalsButtonAttributesType = undefined;
export type ErrorBoundaryTriggeredAttributesType = {
	product: string;
	boundary: string;
	error: string;
};
export type ProfileKudosViewedAttributesType = {
	isEmpty: boolean;
};
export type ProfileKudosTabClickedAttributesType = {
	tabName: 'given' | 'received';
};
export type ProfileKudosClickedAttributesType = {
	kudosId: string;
	tabName: 'given' | 'received';
};
export type ReportingLinesChartCollapsedAttributesType = {
	product: string;
	workspaceUuid: string | null;
};
export type ReportingLinesChartExpandedAttributesType = {
	product: string;
	workspaceUuid: string | null;
};
export type ReportingLinesChartViewedAttributesType = {
	product: string;
	workspaceUuid: string | null;
};
export type UiViewedAttributesType = {
	product: string;
	workspaceUuid: string | null;
};
export type ReportingLinesUserCardClickedAttributesType = {
	product: string;
	workspaceUuid: string | null;
};
export type ReportingLinesEmptyStateViewedAttributesType = {
	product: string;
	workspaceUuid: string | null;
	isAdmin: boolean;
};
export type ButtonClickedAddPeopleButtonAttributesType = {
	isPrimary: boolean;
};
export type UserMenuItemClickedLinkProfileAttributesType = undefined;
export type UserMenuItemClickedLinkManageAccountAttributesType = undefined;
export type UserMenuItemClickedLinkLogoutAttributesType = undefined;
export type UserMenuOpenedAttributesType = undefined;
export type HeaderImageStartedUserHeaderImageAttributesType = {
	actionType: 'removeHeaderImage' | 'uploadHeaderImage';
};
export type HeaderImageFailedUserHeaderImageAttributesType = {
	actionType: 'removeHeaderImage' | 'uploadHeaderImage';
};
export type HeaderImageSucceededUserHeaderImageAttributesType = {
	actionType: 'removeHeaderImage' | 'uploadHeaderImage';
};
export type HeaderImageStartedTeamHeaderImageAttributesType = {
	actionType: 'removeHeaderImage' | 'uploadHeaderImage';
	memberOfTeam: boolean;
	orgAdminTriggered: boolean;
	isVerified: boolean | null;
};
export type HeaderImageFailedTeamHeaderImageAttributesType = {
	actionType: 'removeHeaderImage' | 'uploadHeaderImage';
	memberOfTeam: boolean;
	orgAdminTriggered: boolean;
	isVerified: boolean | null;
};
export type HeaderImageSucceededTeamHeaderImageAttributesType = {
	actionType: 'removeHeaderImage' | 'uploadHeaderImage';
	memberOfTeam: boolean;
	orgAdminTriggered: boolean;
	isVerified: boolean | null;
};
export type ButtonClickedProfileHeaderMediaPickerUploadAttributesType = undefined;
export type ButtonClickedProfileHeaderRemoveAttributesType = undefined;
export type SendFeedbackClickedAttributesType = undefined;

export type AnalyticsEventAttributes = {
	/**
	 * fired when the teams-app-internal-analytics example button is clicked */
	'ui.button.clicked.analyticsExample': ButtonClickedAnalyticsExampleAttributesType;
	/**
	 * fired when the teams-app-internal-analytics example button is clicked */
	'track.automation.triggered.analyticsExample': AutomationTriggeredAnalyticsExampleAttributesType;
	/**
	 * fired when the teams-app-internal-analytics example button is clicked */
	'operational.automation.fired.analyticsExample': AutomationFiredAnalyticsExampleAttributesType;
	/**
	 * fired when the teams-app-internal-analytics example is viewed */
	'screen.analyticsExampleScreen.viewed': AnalyticsExampleScreenViewedAttributesType;
	/**
	 * fired when the assign team to a site section message is viewed on the team profile page */
	'screen.assignTeamToASiteMessage.viewed': AssignTeamToASiteMessageViewedAttributesType;
	/**
	 * fired when the assign this team to a site action in the assign team to a site section message is clicked */
	'ui.assignThisTeamToASite.clicked': AssignThisTeamToASiteClickedAttributesType;
	/**
	 * fired when the assign team to a site modal is viewed */
	'screen.assignTeamToASiteModal.viewed': AssignTeamToASiteModalViewedAttributesType;
	/**
	 * fired when the site is selected in the assign team to a site modal */
	'track.assignTeamToASiteSiteSelected.selected': AssignTeamToASiteSiteSelectedSelectedAttributesType;
	/**
	 * fired when the confirm button is clicked in the assign team to a site modal */
	'ui.assignTeamToASiteConfirmButton.clicked': AssignTeamToASiteConfirmButtonClickedAttributesType;
	/**
	 * fired when the cancel button is clicked in the assign team to a site modal */
	'ui.assignTeamToASiteCancelButton.clicked': AssignTeamToASiteCancelButtonClickedAttributesType;
	/**
	 * fired when the member picker error is triggered */
	'track.memberPicker.error': MemberPickerErrorAttributesType;
	/**
	 * fired when the teams containers are requested */
	'track.requestedContainers.requested': RequestedContainersRequestedAttributesType;
	/**
	 * fired when the team create dialog is viewed */
	'screen.teamCreateDialog.viewed': TeamCreateDialogViewedAttributesType;
	/**
	 * fired when the member is suggested */
	'ui.member.suggested': MemberSuggestedAttributesType;
	/**
	 * fired when the team create dialog is submitted */
	'ui.teamCreateDialog.submitted': TeamCreateDialogSubmittedAttributesType;
	/**
	 * fired when the team create dialog clicked team link success flag */
	'ui.teamCreateDialog.clicked.teamLinkSuccessFlag': TeamCreateDialogClickedTeamLinkSuccessFlagAttributesType;
	/**
	 * fired when the team create dialog succeeded */
	'track.teamCreateDialog.succeeded': TeamCreateDialogSucceededAttributesType;
	/**
	 * fired when the team create dialog failed */
	'track.teamCreateDialog.failed': TeamCreateDialogFailedAttributesType;
	/**
	 * fired when the team type picker is clicked */
	'ui.teamTypePicker.clicked': TeamTypePickerClickedAttributesType;
	/**
	 * fired when the team create dialog is closed */
	'ui.teamCreateDialog.closed': TeamCreateDialogClosedAttributesType;
	/**
	 * fired when the invite capabilities service failed */
	'operational.inviteCapabilitiesService.failed': InviteCapabilitiesServiceFailedAttributesType;
	/**
	 * fired when the add to team service failed */
	'track.addToTeamService.failed': AddToTeamServiceFailedAttributesType;
	/**
	 * fired when the invited team members are added */
	'track.invitedTeamMembers.added': InvitedTeamMembersAddedAttributesType;
	/**
	 * fired when the invite to product service failed */
	'track.inviteToProductService.failed': InviteToProductServiceFailedAttributesType;
	/**
	 * fired when the container permissions are succeeded */
	'track.containerPermissions.succeeded': ContainerPermissionsSucceededAttributesType;
	/**
	 * fired when the team worked on is rendered */
	'ui.teamWorkedOn.rendered': TeamWorkedOnRenderedAttributesType;
	/**
	 * fired when the team worked on failed */
	'operational.teamWorkedOn.failed': TeamWorkedOnFailedAttributesType;
	/**
	 * fired when the team worked on failed */
	'operational.teamWorkedOn.succeeded': TeamWorkedOnSucceededAttributesType;
	/**
	 * fired when the view all issues is clicked */
	'ui.viewAllIssues.clicked': ViewAllIssuesClickedAttributesType;
	/**
	 * fired when the team worked on link is clicked */
	'ui.teamWorkedOnLink.clicked': TeamWorkedOnLinkClickedAttributesType;
	/**
	 * fired when the additional menu link is clicked */
	'ui.navigationMenuItem.clicked.addPeopleNavigationMenuItem': NavigationMenuItemClickedAddPeopleNavigationMenuItemAttributesType;
	/**
	 * fired when the create new team link is clicked */
	'ui.createNewTeamLink.clicked': CreateNewTeamLinkClickedAttributesType;
	/**
	 * fired when the view all people directory is clicked */
	'ui.viewAllPeopleDirectory.clicked': ViewAllPeopleDirectoryClickedAttributesType;
	/**
	 * fired when the people menu link is clicked */
	'ui.peopleMenuLink.clicked': PeopleMenuLinkClickedAttributesType;
	/**
	 * fired when the people menu is viewed and loading indicator is shown */
	'ui.peopleMenu.viewed.loadingIndicator': PeopleMenuViewedLoadingIndicatorAttributesType;
	/**
	 * fired when the team menu link is clicked */
	'ui.teamMenuLink.clicked': TeamMenuLinkClickedAttributesType;
	/**
	 * fired when the people menu is viewed and no browse permission is shown */
	'screen.peopleMenu.viewed': PeopleMenuViewedAttributesType;
	/**
	 * fired when the people menu is succeeded */
	'ui.addPeopleNavigationItem.rendered': AddPeopleNavigationItemRenderedAttributesType;
	/**
	 * fired when the people menu is viewed and no browse permission is shown */
	'ui.peopleMenu.viewed.noBrowsePermission': PeopleMenuViewedNoBrowsePermissionAttributesType;
	/**
	 * fired when the people menu is succeeded */
	'track.peopleMenu.succeeded': PeopleMenuSucceededAttributesType;
	/**
	 * fired when the hover and click people button is measured */
	'track.hoverAndClickPeopleButton.measured': HoverAndClickPeopleButtonMeasuredAttributesType;
	/**
	 * fired when the pre fetch data is triggered */
	'track.preFetchData.triggered': PreFetchDataTriggeredAttributesType;
	/**
	 * fired when the fetching users and teams data is measured */
	'track.fetchingUsersTeamsData.measured': FetchingUsersTeamsDataMeasuredAttributesType;
	/**
	 * fired when the people menu link is succeeded */
	'operational.peopleMenuLink.succeeded': PeopleMenuLinkSucceededAttributesType;
	/**
	 * fired when the people menu link is failed */
	'operational.peopleMenuLink.failed': PeopleMenuLinkFailedAttributesType;
	/**
	 * fired when the people menu link is succeeded */
	'operational.teamMenuLink.succeeded': TeamMenuLinkSucceededAttributesType;
	/**
	 * fired when the people menu link is failed */
	'operational.teamMenuLink.failed': TeamMenuLinkFailedAttributesType;
	/**
	 * fired when the parent team field is clicked */
	'ui.parentTeamLinker.opened': ParentTeamLinkerOpenedAttributesType;
	/**
	 * fired when the parent team linker is closed */
	'ui.parentTeamLinker.closed': ParentTeamLinkerClosedAttributesType;
	/**
	 * fired when the add parent team operation fails */
	'operational.addParentTeam.failed': AddParentTeamFailedAttributesType;
	/**
	 * fired when the remove parent team operation fails */
	'operational.removeParentTeam.failed': RemoveParentTeamFailedAttributesType;
	/**
	 * fired when the sub team linker is viewed */
	'ui.subTeamLinker.opened': SubTeamLinkerOpenedAttributesType;
	/**
	 * fired when the sub team linker is closed */
	'ui.subTeamList.updated': SubTeamListUpdatedAttributesType;
	/**
	 * fired when the add sub team operation fails */
	'operational.addSubTeam.failed': AddSubTeamFailedAttributesType;
	/**
	 * fired when the remove sub team operation fails */
	'operational.removeSubTeam.failed': RemoveSubTeamFailedAttributesType;
	/**
	 * fired when the fetchTeamContainers succeeded */
	'operational.fetchTeamContainers.succeeded': FetchTeamContainersSucceededAttributesType;
	/**
	 * fired when the fetchTeamContainers failed */
	'operational.fetchTeamContainers.failed': FetchTeamContainersFailedAttributesType;
	/**
	 * fired when the fetchTeamContainers succeeded */
	'operational.refetchTeamContainers.succeeded': RefetchTeamContainersSucceededAttributesType;
	/**
	 * fired when the fetchTeamContainers failed */
	'operational.refetchTeamContainers.failed': RefetchTeamContainersFailedAttributesType;
	/**
	 * fired when the fetchNumberOfConnectedTeams succeeded */
	'operational.fetchNumberOfConnectedTeams.succeeded': FetchNumberOfConnectedTeamsSucceededAttributesType;
	/**
	 * fired when the fetchNumberOfConnectedTeams failed */
	'operational.fetchNumberOfConnectedTeams.failed': FetchNumberOfConnectedTeamsFailedAttributesType;
	/**
	 * fired when the fetchConnectedTeams succeeded */
	'operational.fetchConnectedTeams.succeeded': FetchConnectedTeamsSucceededAttributesType;
	/**
	 * fired when the fetchConnectedTeams failed */
	'operational.fetchConnectedTeams.failed': FetchConnectedTeamsFailedAttributesType;
	/**
	 * fired when the team container is clicked */
	'ui.container.clicked.teamContainer': ContainerClickedTeamContainerAttributesType;
	/**
	 * fired when the unlink container dialog is opened */
	'track.unlinkContainerDialog.opened': UnlinkContainerDialogOpenedAttributesType;
	/**
	 * fired when the team container unlink failed */
	'track.teamContainerUnlinked.failed': TeamContainerUnlinkedFailedAttributesType;
	/**
	 * fired when the team container unlink succeeded */
	'track.teamContainerUnlinked.succeeded': TeamContainerUnlinkedSucceededAttributesType;
	/**
	 * fired when the container unlink button is clicked */
	'ui.button.clicked.containerUnlinkButton': ButtonClickedContainerUnlinkButtonAttributesType;
	/**
	 * fired when the container edit link button is clicked */
	'ui.button.clicked.containerEditLinkButton': ButtonClickedContainerEditLinkButtonAttributesType;
	/**
	 * fired when the container remove link button is clicked */
	'ui.button.clicked.containerRemoveLinkButton': ButtonClickedContainerRemoveLinkButtonAttributesType;
	/**
	 * fired when the link picker is successfully submitted */
	'ui.link.clicked.teamMember': LinkClickedTeamMemberAttributesType;
	/**
	 * fired when the link picker is successfully submitted */
	'ui.teamMember.clicked': TeamMemberClickedAttributesType;
	/**
	 * fired when the link picker is successfully submitted */
	'ui.teamAgent.clicked': TeamAgentClickedAttributesType;
	/**
	 * fired when connected group name is clicked */
	'ui.connectedGroup.clicked': ConnectedGroupClickedAttributesType;
	/**
	 * teamSettingsDialog */
	'screen.teamSettingsDialog.viewed': TeamSettingsDialogViewedAttributesType;
	/**
	 * fired when the delete team dialog is opened */
	'ui.dialog.opened.deleteTeam': DialogOpenedDeleteTeamAttributesType;
	/**
	 * fired when agent profile viewed */
	'screen.agentProfile.viewed': AgentProfileViewedAttributesType;
	/**
	 * fired when the edit agent menuItem is clicked */
	'ui.editAgent.clicked': EditAgentClickedAttributesType;
	/**
	 * fired when the duplicate agent menuItem is clicked */
	'ui.duplicateAgent.clicked': DuplicateAgentClickedAttributesType;
	/**
	 * fired when the copy agent menuItem is clicked */
	'ui.copyAgent.clicked': CopyAgentClickedAttributesType;
	/**
	 * fired when the delete agent menuItem is clicked */
	'ui.deleteAgent.clicked': DeleteAgentClickedAttributesType;
	/**
	 * fired when the chat button is clicked */
	'ui.chatWithAgent.clicked': ChatWithAgentClickedAttributesType;
	/**
	 * fired when the agent conversation starter is clicked */
	'ui.startConversationWithAgent.clicked': StartConversationWithAgentClickedAttributesType;
	/**
	 * teamMember removed */
	'track.teamMember.removed': TeamMemberRemovedAttributesType;
	/**
	 * teamInvitation accepted */
	'track.teamInvitation.accepted': TeamInvitationAcceptedAttributesType;
	/**
	 * teamInvitation declined */
	'track.teamInvitation.declined': TeamInvitationDeclinedAttributesType;
	/**
	 * teamProfileName edited */
	'track.teamProfileName.edited': TeamProfileNameEditedAttributesType;
	/**
	 * teamProfileDescription edited */
	'track.teamProfileDescription.edited': TeamProfileDescriptionEditedAttributesType;
	/**
	 * teamMembershipControl edited */
	'track.teamMembershipControl.edited': TeamMembershipControlEditedAttributesType;
	/**
	 * team joined */
	'track.team.joined': TeamJoinedAttributesType;
	/**
	 * joinRequest created */
	'track.joinRequest.created': JoinRequestCreatedAttributesType;
	/**
	 * team removed */
	'track.team.removed': TeamRemovedAttributesType;
	/**
	 * fired when the team link is opened */
	'ui.teamLinkCategory.opened': TeamLinkCategoryOpenedAttributesType;
	/**
	 * fired when the team link is clicked */
	'ui.teamLinkCategory.clicked': TeamLinkCategoryClickedAttributesType;
	/**
	 * fired when the delete team dialog is closed */
	'ui.dialog.closed.teamDeletion': DialogClosedTeamDeletionAttributesType;
	/**
	 * fired when the delete team dialog is opened */
	'ui.dialog.opened.teamDeletion': DialogOpenedTeamDeletionAttributesType;
	/**
	 * fired when the delete team dialog is successfully submitted */
	'ui.confirmation.checked.teamDeletion': ConfirmationCheckedTeamDeletionAttributesType;
	/**
	 * team removed */
	'track.teamDeletion.failed': TeamDeletionFailedAttributesType;
	/**
	 * joinRequest accepted */
	'track.joinRequest.accepted': JoinRequestAcceptedAttributesType;
	/**
	 * joinRequest closed */
	'track.joinRequest.closed': JoinRequestClosedAttributesType;
	/**
	 * joinRequest declined */
	'track.joinRequest.declined': JoinRequestDeclinedAttributesType;
	/**
	 * joinRequestCancel failed */
	'operational.joinRequestCancel.failed': JoinRequestCancelFailedAttributesType;
	/**
	 * teamInvitation sent */
	'track.teamInvitation.sent': TeamInvitationSentAttributesType;
	/**
	 * joinRequestAccept failed */
	'operational.joinRequestAccept.failed': JoinRequestAcceptFailedAttributesType;
	/**
	 * joinRequestDecline failed */
	'operational.joinRequestDecline.failed': JoinRequestDeclineFailedAttributesType;
	/**
	 * teamInvitation succeeded */
	'operational.teamInvitation.succeeded': TeamInvitationSucceededAttributesType;
	/**
	 * teamInvitation failed */
	'operational.teamInvitation.failed': TeamInvitationFailedAttributesType;
	/** */
	'operational.teamAbout.taskStart': TeamAboutTaskStartAttributesType;
	/** */
	'operational.teamAbout.taskSuccess': TeamAboutTaskSuccessAttributesType;
	/** */
	'operational.teamAbout.taskAbort': TeamAboutTaskAbortAttributesType;
	/** */
	'operational.teamAbout.taskFail': TeamAboutTaskFailAttributesType;
	/** */
	'operational.teamName.taskStart': TeamNameTaskStartAttributesType;
	/** */
	'operational.teamName.taskSuccess': TeamNameTaskSuccessAttributesType;
	/** */
	'operational.teamName.taskAbort': TeamNameTaskAbortAttributesType;
	/** */
	'operational.teamName.taskFail': TeamNameTaskFailAttributesType;
	/** */
	'operational.teamDescription.taskStart': TeamDescriptionTaskStartAttributesType;
	/** */
	'operational.teamDescription.taskSuccess': TeamDescriptionTaskSuccessAttributesType;
	/** */
	'operational.teamDescription.taskAbort': TeamDescriptionTaskAbortAttributesType;
	/** */
	'operational.teamDescription.taskFail': TeamDescriptionTaskFailAttributesType;
	/** */
	'operational.teamPermissions.taskStart': TeamPermissionsTaskStartAttributesType;
	/** */
	'operational.teamPermissions.taskSuccess': TeamPermissionsTaskSuccessAttributesType;
	/** */
	'operational.teamPermissions.taskAbort': TeamPermissionsTaskAbortAttributesType;
	/** */
	'operational.teamPermissions.taskFail': TeamPermissionsTaskFailAttributesType;
	/** */
	'operational.members.taskStart': MembersTaskStartAttributesType;
	/** */
	'operational.members.taskSuccess': MembersTaskSuccessAttributesType;
	/** */
	'operational.members.taskAbort': MembersTaskAbortAttributesType;
	/** */
	'operational.members.taskFail': MembersTaskFailAttributesType;
	/** */
	'operational.submit.taskStart': SubmitTaskStartAttributesType;
	/** */
	'operational.submit.taskSuccess': SubmitTaskSuccessAttributesType;
	/** */
	'operational.submit.taskAbort': SubmitTaskAbortAttributesType;
	/** */
	'operational.submit.taskFail': SubmitTaskFailAttributesType;
	/** */
	'operational.removeTeamMember.taskStart': RemoveTeamMemberTaskStartAttributesType;
	/** */
	'operational.removeTeamMember.taskSuccess': RemoveTeamMemberTaskSuccessAttributesType;
	/** */
	'operational.removeTeamMember.taskAbort': RemoveTeamMemberTaskAbortAttributesType;
	/** */
	'operational.removeTeamMember.taskFail': RemoveTeamMemberTaskFailAttributesType;
	/** */
	'operational.openDialog.taskStart': OpenDialogTaskStartAttributesType;
	/** */
	'operational.openDialog.taskSuccess': OpenDialogTaskSuccessAttributesType;
	/** */
	'operational.openDialog.taskAbort': OpenDialogTaskAbortAttributesType;
	/** */
	'operational.openDialog.taskFail': OpenDialogTaskFailAttributesType;
	/** */
	'operational.editTeamNameOrDescription.taskStart': EditTeamNameOrDescriptionTaskStartAttributesType;
	/** */
	'operational.editTeamNameOrDescription.taskSuccess': EditTeamNameOrDescriptionTaskSuccessAttributesType;
	/** */
	'operational.editTeamNameOrDescription.taskAbort': EditTeamNameOrDescriptionTaskAbortAttributesType;
	/** */
	'operational.editTeamNameOrDescription.taskFail': EditTeamNameOrDescriptionTaskFailAttributesType;
	/** */
	'operational.recommendedProducts.taskSuccess': RecommendedProductsTaskSuccessAttributesType;
	/** */
	'operational.recommendedProducts.taskFail': RecommendedProductsTaskFailAttributesType;
	/** */
	'operational.teamsPermissionsRequest.failed': TeamsPermissionsRequestFailedAttributesType;
	/** */
	'operational.teamsPermissionsRequest.succeeded': TeamsPermissionsRequestSucceededAttributesType;
	/**
	 * fired when the team container linker is opened */
	'ui.teamContainerLinker.opened': TeamContainerLinkerOpenedAttributesType;
	/** */
	'track.teamContainerLinked.failed': TeamContainerLinkedFailedAttributesType;
	/** */
	'ui.teamContainerLinked.success': TeamContainerLinkedSuccessAttributesType;
	/** */
	'ui.teamContainerLinked.viewed': TeamContainerLinkedViewedAttributesType;
	/** */
	'ui.teamContainerLinker.viewed': TeamContainerLinkerViewedAttributesType;
	/** */
	'ui.teamContainerLinkerResults.viewed': TeamContainerLinkerResultsViewedAttributesType;
	/** */
	'ui.connectJiraProjectTab.clicked': ConnectJiraProjectTabClickedAttributesType;
	/** */
	'ui.connectLoomSpaceTab.clicked': ConnectLoomSpaceTabClickedAttributesType;
	/** */
	'ui.connectConfluenceSpaceTab.clicked': ConnectConfluenceSpaceTabClickedAttributesType;
	/** */
	'ui.teamProfileCard.viewed': TeamProfileCardViewedAttributesType;
	/**
	 * fired when the team button is viewed */
	'ui.teamButton.viewed': TeamButtonViewedAttributesType;
	/**
	 * fired when the team button is clicked */
	'ui.teamButton.clicked': TeamButtonClickedAttributesType;
	/**
	 * fired when the team profile button is clicked */
	'ui.teamProfileButton.clicked': TeamProfileButtonClickedAttributesType;
	/**
	 * fired when the profile radar button is clicked */
	'ui.profileRadarButton.clicked': ProfileRadarButtonClickedAttributesType;
	/**
	 * fired when the add team modal is viewed */
	'screen.addTeamModal.viewed': AddTeamModalViewedAttributesType;
	/**
	 * fired when the add team modal confirm button is clicked */
	'ui.addTeamModalConfirmButton.clicked': AddTeamModalConfirmButtonClickedAttributesType;
	/**
	 * fired when the manage teams modal is viewed */
	'screen.manageTeamsModal.viewed': ManageTeamsModalViewedAttributesType;
	/**
	 * fired when the disconnect team confirmation modal is viewed */
	'screen.disconnectTeamModal.viewed': DisconnectTeamModalViewedAttributesType;
	/**
	 * fired when the remove (unlink) team button is clicked */
	'ui.removeTeamButton.clicked': RemoveTeamButtonClickedAttributesType;
	/**
	 * fired when the manage teams button is clicked */
	'ui.manageTeamsButton.clicked': ManageTeamsButtonClickedAttributesType;
	/**
	 * fired when the team selector popup is viewed */
	'screen.teamSelector.viewed': TeamSelectorViewedAttributesType;
	/**
	 * fired when the save button from the manage teams modal is clicked */
	'ui.manageTeamsSaveButton.clicked': ManageTeamsSaveButtonClickedAttributesType;
	/**
	 * add agent to team succeeded */
	'operational.teamAgentAssociation.succeeded': TeamAgentAssociationSucceededAttributesType;
	/**
	 * add agent to team failed */
	'operational.teamAgentAssociation.failed': TeamAgentAssociationFailedAttributesType;
	/**
	 * add agent to team succeeded */
	'track.teamAgentAssociation.succedded': TeamAgentAssociationSucceddedAttributesType;
	/**
	 * container is created and linked to a team */
	'track.teamContainerCreatedAndLinked.success': TeamContainerCreatedAndLinkedSuccessAttributesType;
	/**
	 * container is created and linked to a team */
	'track.teamContainerCreatedAndLinked.failed': TeamContainerCreatedAndLinkedFailedAttributesType;
	/**
	 * the "create jira project" button is viewed */
	'ui.createJiraContainer.viewed': CreateJiraContainerViewedAttributesType;
	/**
	 * the "create jira space" button is clicked */
	'ui.createJiraContainer.clicked': CreateJiraContainerClickedAttributesType;
	/**
	 * the "create confluence space" button is viewed */
	'ui.createConfluenceContainer.viewed': CreateConfluenceContainerViewedAttributesType;
	/**
	 * the "create confluence space" button is clicked */
	'ui.createConfluenceContainer.clicked': CreateConfluenceContainerClickedAttributesType;
	/**
	 * the "create loom space" button is viewed */
	'ui.createLoomContainer.viewed': CreateLoomContainerViewedAttributesType;
	/**
	 * the "create loom space" button is clicked */
	'ui.createLoomContainer.clicked': CreateLoomContainerClickedAttributesType;
	/**
	 * the "create web link" button is viewed */
	'ui.createWebLinkContainer.viewed': CreateWebLinkContainerViewedAttributesType;
	/**
	 * the "create web link" button is clicked */
	'ui.createWebLinkContainer.clicked': CreateWebLinkContainerClickedAttributesType;
	/**
	 * the create container component is viewed */
	'ui.createContainerFooter.viewed': CreateContainerFooterViewedAttributesType;
	/**
	 * fired when the Show more button is clicked in the Team activities tab */
	'ui.showMoreTeamActivities.clicked': ShowMoreTeamActivitiesClickedAttributesType;
	/**
	 * fired when the team activity is clicked in the Team activities tab */
	'ui.teamActivity.clicked': TeamActivityClickedAttributesType;
	/**
	 * fired when the team profile activity tab is successfully viewed */
	'screen.teamProfileActivityTab.viewed': TeamProfileActivityTabViewedAttributesType;
	/**
	 * fired when a tab profile tab is selected */
	'track.teamProfileTab.selected': TeamProfileTabSelectedAttributesType;
	/**
	 * fired when the team connection item is clicked */
	'ui.teamConnectionItem.clicked.teamProfileCard': TeamConnectionItemClickedTeamProfileCardAttributesType;
	/**
	 * fired when the view team profile button is clicked */
	'ui.button.clicked.viewTeamProfileButton': ButtonClickedViewTeamProfileButtonAttributesType;
	/**
	 * fired when the profilecard is triggered */
	'ui.profilecard.triggered': ProfilecardTriggeredAttributesType;
	/**
	 * fired when the rovo agent profilecard is triggered */
	'ui.rovoAgentProfilecard.triggered': RovoAgentProfilecardTriggeredAttributesType;
	/**
	 * fired when the team profilecard is triggered */
	'ui.teamProfileCard.triggered': TeamProfileCardTriggeredAttributesType;
	/**
	 * fired when an unknown profilecard is triggered */
	'ui.user.triggered': UserTriggeredAttributesType;
	/**
	 * fired when the profilecard is rendered and is loading */
	'ui.profilecard.rendered.spinner': ProfilecardRenderedSpinnerAttributesType;
	/**
	 * fired when the team profilecard is rendered and is loading */
	'ui.teamProfileCard.rendered.spinner': TeamProfileCardRenderedSpinnerAttributesType;
	/**
	 * fired when the rovo agent profilecard is rendered and is loading */
	'ui.rovoAgentProfilecard.rendered.spinner': RovoAgentProfilecardRenderedSpinnerAttributesType;
	/**
	 * fired when an unknown profilecard is rendered and is loading */
	'ui.user.rendered.spinner': UserRenderedSpinnerAttributesType;
	/**
	 * fired when the profilecard is rendered and is error */
	'ui.profilecard.rendered.error': ProfilecardRenderedErrorAttributesType;
	/**
	 * fired when the team profilecard is rendered and is error */
	'ui.teamProfileCard.rendered.error': TeamProfileCardRenderedErrorAttributesType;
	/**
	 * fired when the profilecard is clicked */
	'ui.profilecard.clicked.action': ProfilecardClickedActionAttributesType;
	/**
	 * fired when the profilecard is clicked */
	'ui.profilecard.clicked.reportingLines': ProfilecardClickedReportingLinesAttributesType;
	/**
	 * fired when the profilecard is rendered and has content */
	'ui.profilecard.rendered.content': ProfilecardRenderedContentAttributesType;
	/**
	 * fired when the profilecard is rendered and has content */
	'ui.rovoAgentProfilecard.rendered.content': RovoAgentProfilecardRenderedContentAttributesType;
	/**
	 * fired when the team profilecard is rendered and has content */
	'ui.teamProfileCard.rendered.content': TeamProfileCardRenderedContentAttributesType;
	/**
	 * fired when the delete agent button is clicked */
	'ui.button.clicked.deleteAgentButton': ButtonClickedDeleteAgentButtonAttributesType;
	/**
	 * fired when the edit agent button is clicked */
	'ui.button.clicked.editAgentButton': ButtonClickedEditAgentButtonAttributesType;
	/**
	 * fired when the copy agent link button is clicked */
	'ui.button.clicked.copyAgentLinkButton': ButtonClickedCopyAgentLinkButtonAttributesType;
	/**
	 * fired when the duplicate agent button is clicked */
	'ui.button.clicked.duplicateAgentButton': ButtonClickedDuplicateAgentButtonAttributesType;
	/**
	 * fired when the edit agent button is clicked */
	'ui.button.clicked.viewAgentFullProfileButton': ButtonClickedViewAgentFullProfileButtonAttributesType;
	/**
	 * fired when the team profilecard is rendered and is error boundary */
	'ui.teamProfileCard.rendered.errorBoundary': TeamProfileCardRenderedErrorBoundaryAttributesType;
	/**
	 * fired when the team profilecard is rendered and is error boundary */
	'ui.teamProfileCard.clicked.errorRetry': TeamProfileCardClickedErrorRetryAttributesType;
	/**
	 * fired when the profilecard request is succeeded */
	'operational.profilecard.succeeded.request': ProfilecardSucceededRequestAttributesType;
	/**
	 * fired when the profilecard request is triggered */
	'operational.profilecard.triggered.request': ProfilecardTriggeredRequestAttributesType;
	/**
	 * fired when the profilecard request is failed */
	'operational.profilecard.failed.request': ProfilecardFailedRequestAttributesType;
	/**
	 * fired when the team profilecard request is succeeded */
	'operational.teamProfileCard.succeeded.request': TeamProfileCardSucceededRequestAttributesType;
	/**
	 * fired when the team profilecard request is triggered */
	'operational.teamProfileCard.triggered.request': TeamProfileCardTriggeredRequestAttributesType;
	/**
	 * fired when the team profilecard request is failed */
	'operational.teamProfileCard.failed.request': TeamProfileCardFailedRequestAttributesType;
	/**
	 * fired when the rovo agent profilecard request is succeeded */
	'operational.rovoAgentProfilecard.succeeded.request': RovoAgentProfilecardSucceededRequestAttributesType;
	/**
	 * fired when the rovo agent profilecard request is triggered */
	'operational.rovoAgentProfilecard.triggered.request': RovoAgentProfilecardTriggeredRequestAttributesType;
	/**
	 * fired when the rovo agent profilecard request is failed */
	'operational.rovoAgentProfilecard.failed.request': RovoAgentProfilecardFailedRequestAttributesType;
	/**
	 * fired when the rovo agent profilecard deleteAgent is succeeded */
	'operational.rovoAgentProfilecard.succeeded.deleteAgent': RovoAgentProfilecardSucceededDeleteAgentAttributesType;
	/**
	 * fired when the rovo agent profilecard deleteAgent is failed */
	'operational.rovoAgentProfilecard.failed.deleteAgent': RovoAgentProfilecardFailedDeleteAgentAttributesType;
	/**
	 * fired when the rovo agent profilecard favourite is succeeded */
	'operational.rovoAgentProfilecard.succeeded.favourite': RovoAgentProfilecardSucceededFavouriteAttributesType;
	/**
	 * fired when the rovo agent profilecard favourite is triggered */
	'operational.rovoAgentProfilecard.triggered.favourite': RovoAgentProfilecardTriggeredFavouriteAttributesType;
	/**
	 * fired when the rovo agent profilecard favourite is failed */
	'operational.rovoAgentProfilecard.failed.favourite': RovoAgentProfilecardFailedFavouriteAttributesType;
	/**
	 * fired when the rovo agent profilecard unfavourite is succeeded */
	'operational.rovoAgentProfilecard.succeeded.unfavourite': RovoAgentProfilecardSucceededUnfavouriteAttributesType;
	/**
	 * fired when the rovo agent profilecard unfavourite is triggered */
	'operational.rovoAgentProfilecard.triggered.unfavourite': RovoAgentProfilecardTriggeredUnfavouriteAttributesType;
	/**
	 * fired when the rovo agent profilecard unfavourite is failed */
	'operational.rovoAgentProfilecard.failed.unfavourite': RovoAgentProfilecardFailedUnfavouriteAttributesType;
	/**
	 * fired when the rovo agent profilecard getAgentPermissions is succeeded */
	'operational.rovoAgentProfilecard.succeeded.getAgentPermissions': RovoAgentProfilecardSucceededGetAgentPermissionsAttributesType;
	/**
	 * fired when the rovo agent profilecard getAgentPermissions is failed */
	'operational.rovoAgentProfilecard.failed.getAgentPermissions': RovoAgentProfilecardFailedGetAgentPermissionsAttributesType;
	/**
	 * fired when the more actions is clicked */
	'ui.profilecard.clicked.moreActions': ProfilecardClickedMoreActionsAttributesType;
	/**
	 * fired when the more actions is clicked */
	'ui.teamProfileCard.clicked.moreActions': TeamProfileCardClickedMoreActionsAttributesType;
	/**
	 * fired when the avatar is clicked */
	'ui.teamProfileCard.clicked.avatar': TeamProfileCardClickedAvatarAttributesType;
	/**
	 * fired when the action is clicked */
	'ui.teamProfileCard.clicked.action': TeamProfileCardClickedActionAttributesType;
	/**
	 * fired when the more members is clicked */
	'ui.teamProfileCard.clicked.moreMembers': TeamProfileCardClickedMoreMembersAttributesType;
	/**
	 * fired when the profile projects and goals tab is clicked */
	'ui.ProfileProjectsAndGoalsTab.clicked': ProfileProjectsAndGoalsTabClickedAttributesType;
	/**
	 * fired when the profile projects and goals is viewed */
	'ui.ProfileProjectsAndGoals.viewed': ProfileProjectsAndGoalsViewedAttributesType;
	/**
	 * fired when the profile projects link is clicked */
	'ui.ProfileProjectsLink.clicked': ProfileProjectsLinkClickedAttributesType;
	/**
	 * fired when the profile goals link is clicked */
	'ui.ProfileGoalsLink.clicked': ProfileGoalsLinkClickedAttributesType;
	/**
	 * fired when the follow team projects and goals button is clicked */
	'ui.button.clicked.followTeamProjectsGoalsButton': ButtonClickedFollowTeamProjectsGoalsButtonAttributesType;
	/**
	 * fired when the unfollow team projects and goals button is clicked */
	'ui.button.clicked.unfollowTeamProjectsGoalsButton': ButtonClickedUnfollowTeamProjectsGoalsButtonAttributesType;
	/**
	 * fired when an error boundary is triggered */
	'operational.errorBoundary.triggered': ErrorBoundaryTriggeredAttributesType;
	/**
	 * fired when the profile kudos is viewed */
	'ui.ProfileKudos.viewed': ProfileKudosViewedAttributesType;
	/**
	 * fired when the profile kudos tab is clicked */
	'ui.ProfileKudosTab.clicked': ProfileKudosTabClickedAttributesType;
	/**
	 * fired when a kudos item is clicked */
	'ui.ProfileKudos.clicked': ProfileKudosClickedAttributesType;
	/**
	 * fired when the reporting lines chart is collapsed */
	'ui.ReportingLinesChart.collapsed': ReportingLinesChartCollapsedAttributesType;
	/**
	 * fired when the reporting lines chart is expanded */
	'ui.ReportingLinesChart.expanded': ReportingLinesChartExpandedAttributesType;
	/**
	 * fired when the reporting lines chart is viewed */
	'ui.ReportingLinesChart.viewed': ReportingLinesChartViewedAttributesType;
	/**
	 * fired when the reporting lines chart is viewed - used for Atlas MAU */
	'ui.ui.viewed': UiViewedAttributesType;
	/**
	 * fired when the reporting lines user card is clicked */
	'ui.ReportingLinesUserCard.clicked': ReportingLinesUserCardClickedAttributesType;
	/**
	 * fired when the reporting lines empty state is viewed */
	'ui.ReportingLinesEmptyState.viewed': ReportingLinesEmptyStateViewedAttributesType;
	/**
	 * fired when the add people button is clicked */
	'ui.button.clicked.addPeopleButton': ButtonClickedAddPeopleButtonAttributesType;
	/**
	 * fired when the link profile button is clicked */
	'ui.userMenuItem.clicked.linkProfile': UserMenuItemClickedLinkProfileAttributesType;
	/**
	 * fired when the link manage account button is clicked */
	'ui.userMenuItem.clicked.linkManageAccount': UserMenuItemClickedLinkManageAccountAttributesType;
	/**
	 * fired when the link logout button is clicked */
	'ui.userMenuItem.clicked.linkLogout': UserMenuItemClickedLinkLogoutAttributesType;
	/**
	 * fired when the user menu is opened */
	'track.userMenu.opened': UserMenuOpenedAttributesType;
	/**
	 * fired when the header image action is triggered */
	'operational.headerImage.started.userHeaderImage': HeaderImageStartedUserHeaderImageAttributesType;
	/**
	 * fired when the header image action is failed */
	'operational.headerImage.failed.userHeaderImage': HeaderImageFailedUserHeaderImageAttributesType;
	/**
	 * fired when the header image action is succeeded */
	'operational.headerImage.succeeded.userHeaderImage': HeaderImageSucceededUserHeaderImageAttributesType;
	/**
	 * fired when the header image action is triggered */
	'operational.headerImage.started.teamHeaderImage': HeaderImageStartedTeamHeaderImageAttributesType;
	/**
	 * fired when the header image action is failed */
	'operational.headerImage.failed.teamHeaderImage': HeaderImageFailedTeamHeaderImageAttributesType;
	/**
	 * fired when the header image action is succeeded */
	'operational.headerImage.succeeded.teamHeaderImage': HeaderImageSucceededTeamHeaderImageAttributesType;
	/**
	 * fired when the media picker upload button is clicked */
	'ui.button.clicked.profileHeaderMediaPickerUpload': ButtonClickedProfileHeaderMediaPickerUploadAttributesType;
	/**
	 * fired when the remove header image button is clicked */
	'ui.button.clicked.profileHeaderRemove': ButtonClickedProfileHeaderRemoveAttributesType;
	/**
	 * fired when the send feedback button is clicked */
	'ui.sendFeedback.clicked': SendFeedbackClickedAttributesType;
};

export type EventKey = keyof AnalyticsEventAttributes;
