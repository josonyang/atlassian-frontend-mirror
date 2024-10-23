import { type AnalyticsEventPayload } from '@atlaskit/analytics-next';
import { getATLContextUrl, isFedRamp } from '@atlaskit/atlassian-context';
import { fg } from '@atlaskit/platform-feature-flags';

import {
	type AgentIdType,
	type ClientOverrides,
	type ProfileClient,
	type ProfileClientOptions,
	type TeamCentralReportingLinesData,
} from '../types';

import RovoAgentCardClient from './RovoAgentCardClient';
import TeamCentralCardClient, { type TeamCentralCardClientOptions } from './TeamCentralCardClient';
import TeamProfileCardClient from './TeamProfileCardClient';
import UserProfileCardClient from './UserProfileCardClient';

const defaultConfig = {
	gatewayGraphqlUrl: '/gateway/api/graphql',
};

export type TeamCentralScopes = { withOrgContext: true; withSiteContext: boolean };

class ProfileCardClient implements ProfileClient {
	userClient: UserProfileCardClient;
	teamClient: TeamProfileCardClient;
	tcClient?: TeamCentralCardClient;
	rovoAgentClient: RovoAgentCardClient;

	constructor(config: ProfileClientOptions, clients?: ClientOverrides) {
		//This default can be removed once all the clients are updated to pass the gatewayGraphqlUrl
		const withDefaultConfig = {
			...defaultConfig,
			...config,
			...{ gatewayGraphqlUrl: config.gatewayGraphqlUrl ?? defaultConfig.gatewayGraphqlUrl },
		};
		this.userClient = clients?.userClient || new UserProfileCardClient(withDefaultConfig);
		this.teamClient = clients?.teamClient || new TeamProfileCardClient(withDefaultConfig);
		this.rovoAgentClient = clients?.rovoAgentClient || new RovoAgentCardClient(withDefaultConfig);
		this.tcClient = maybeCreateTeamCentralClient(withDefaultConfig, clients);
	}

	flushCache() {
		this.userClient.flushCache();
		this.teamClient.flushCache();
		this.tcClient?.flushCache();
		this.rovoAgentClient?.flushCache();
	}

	getProfile(
		cloudId: string,
		userId: string,
		analytics?: (event: AnalyticsEventPayload) => void,
	): Promise<any> {
		return this.userClient.getProfile(cloudId, userId, analytics);
	}

	getTeamProfile(
		teamId: string,
		orgId?: string,
		analytics?: (event: AnalyticsEventPayload) => void,
	) {
		return this.teamClient.getProfile(teamId, orgId, analytics);
	}

	getReportingLines(userId: string): Promise<TeamCentralReportingLinesData> {
		return (
			this.tcClient?.getReportingLines(userId) || Promise.resolve({ managers: [], reports: [] })
		);
	}

	async getTeamCentralBaseUrl(teamCentralScopes?: TeamCentralScopes) {
		if (!fg('enable_ptc_sharded_townsquare_calls')) {
			return Promise.resolve(this.tcClient?.options.teamCentralBaseUrl);
		}

		if (this.tcClient === undefined) {
			return Promise.resolve(undefined);
		}

		const isGlobalExperienceWorkspace = await this.tcClient.getIsGlobalExperienceWorkspace();

		if (!isGlobalExperienceWorkspace) {
			return Promise.resolve(getATLContextUrl('team'));
		}

		let suffix = '';
		if (teamCentralScopes !== undefined) {
			const orgId = await this.tcClient.getOrgId();
			if (orgId === null) {
				return Promise.resolve(undefined);
			}

			suffix += `/o/${orgId}`;

			if (teamCentralScopes.withSiteContext) {
				suffix += `/s/${this.tcClient.options.cloudId}`;
			}
		}

		return Promise.resolve(`${getATLContextUrl('home')}${suffix}`);
	}

	async shouldShowGiveKudos(): Promise<boolean> {
		if (!this.tcClient || !(await this.getTeamCentralBaseUrl())) {
			return Promise.resolve(false);
		}
		return this.tcClient.checkWorkspaceExists();
	}

	getRovoAgentProfile(id: AgentIdType, analytics?: (event: AnalyticsEventPayload) => void) {
		return this.rovoAgentClient?.getProfile(id, analytics);
	}
	deleteAgent(id: string, analytics?: (event: AnalyticsEventPayload) => void) {
		return this.rovoAgentClient?.deleteAgent(id, analytics);
	}

	setFavouriteAgent(
		id: string,
		isFavourite: boolean,
		analytics?: (event: AnalyticsEventPayload) => void,
	) {
		return this.rovoAgentClient?.setFavouriteAgent(id, isFavourite, analytics);
	}
}

function maybeCreateTeamCentralClient(
	config: TeamCentralCardClientOptions,
	clients?: ClientOverrides,
) {
	if (isFedRamp()) {
		return undefined;
	}

	if (clients?.teamCentralClient) {
		return clients.teamCentralClient;
	}
	const teamCentralEnabled = fg('enable_ptc_sharded_townsquare_calls')
		? config.teamCentralDisabled !== true
		: config.teamCentralUrl;
	return teamCentralEnabled ? new TeamCentralCardClient({ ...config }) : undefined;
}

export default ProfileCardClient;
