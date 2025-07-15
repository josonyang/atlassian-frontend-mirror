import { fg } from '@atlaskit/platform-feature-flags';

import { teamIdToAri } from '../../common/utils/team-id-to-ari';
import { toUserId } from '../../common/utils/user-ari';
import { type ClientConfig } from '../base-client';
import { DEFAULT_CONFIG } from '../constants';
import { BaseGraphQlClient } from '../graphql-client';
import type { TeamContainers, TeamMember, TeamWithMemberships } from '../types';

import {
	UnlinkContainerMutation,
	type UnlinkContainerMutationResponse,
	type UnlinkContainerMutationVariables,
} from './utils/mutations/unlink-container-mutation';
import {
	NumberOfTeamConnectedToContainerQuery,
	type NumberOfTeamConnectedToContainerQueryResponse,
	type NumberOfTeamConnectedToContainerQueryVariables,
} from './utils/queries/number-of-team-connected-to-container-query';
import {
	TeamConnectedToContainerQuery,
	type TeamConnectedToContainerQueryResponse,
	type TeamConnectedToContainerQueryVariables,
} from './utils/queries/team-connected-to-container-query';
import {
	TeamContainersQuery,
	type TeamContainersQueryResponse,
	TeamContainersQueryV2,
	type TeamContainersQueryV2Response,
	type TeamContainersQueryV2Variables,
	type TeamContainersQueryVariables,
} from './utils/queries/team-containers-query';

export class AGGClient extends BaseGraphQlClient {
	constructor(baseUrl: string, config: ClientConfig) {
		super(`${baseUrl}/graphql`, config);
	}
	setBaseUrl(baseUrl: string) {
		this.setServiceUrl(`${baseUrl}/graphql`);
	}

	async getTeamContainers(teamId: string) {
		const teamAri = teamIdToAri(teamId);
		const cypherQuery = `MATCH (team:IdentityTeam {ari: '${teamAri}'})-[:team_connected_to_container]->(container) RETURN container`;

		if (fg('teams_containers_cypher_query_v2_migration')) {
			const response = await this.makeGraphQLRequest<
				'graphStore',
				TeamContainersQueryV2Response,
				TeamContainersQueryV2Variables
			>(
				{
					query: TeamContainersQueryV2,
					variables: {
						cypherQuery,
						params: {
							id: teamAri,
						},
					},
				},
				{
					operationName: 'TeamContainersQueryV2',
				},
			);

			return this.processV2Response(response);
		} else {
			const response = await this.makeGraphQLRequest<
				'graphStore',
				TeamContainersQueryResponse,
				TeamContainersQueryVariables
			>(
				{
					query: TeamContainersQuery,
					variables: {
						cypherQuery,
					},
				},
				{
					operationName: 'TeamContainersQuery',
				},
			);

			return this.processV1Response(response);
		}
	}

	private processV2Response(response: { graphStore: TeamContainersQueryV2Response }) {
		const containersResult = response.graphStore.cypherQueryV2.edges.reduce<TeamContainers>(
			(containers, edge) => {
				edge.node.columns.forEach((column) => {
					const containerData = column.value?.data;

					if (!containerData && fg('enable_team_containers_null_check')) {
						return;
					}

					if (containerData?.__typename === 'ConfluenceSpace') {
						containers.push({
							id: containerData.id,
							type: containerData.__typename,
							name: containerData.confluenceSpaceName || '',
							icon: `${containerData.links.base}${containerData.icon.path}`,
							createdDate: new Date(containerData.createdDate),
							link: `${containerData.links.base}${containerData.links.webUi}`,
							containerTypeProperties: {
								subType: undefined,
								name: undefined,
							},
						});
					} else if (containerData?.__typename === 'JiraProject') {
						containers.push({
							id: containerData.id,
							type: containerData.__typename,
							name: containerData.jiraProjectName,
							icon: containerData.avatar.medium,
							createdDate: new Date(containerData.created),
							link: containerData.webUrl,
							containerTypeProperties: {
								subType: containerData.projectType || '',
								name: containerData.projectTypeName || '',
							},
						});
					} else if (containerData?.__typename === 'LoomSpace') {
						containers.push({
							id: containerData.id,
							type: containerData.__typename,
							name: containerData.loomSpaceName,
							icon: '',
							link: containerData.url,
						});
					}
				});
				return containers;
			},
			[],
		);

		return containersResult;
	}

	private processV1Response(response: { graphStore: TeamContainersQueryResponse }) {
		const containersResult = response.graphStore.cypherQuery.edges.reduce<TeamContainers>(
			(containers, edge) => {
				if (!edge.node.to.data && fg('enable_team_containers_null_check')) {
					return containers;
				}

				if (edge.node.to.data.__typename === 'ConfluenceSpace') {
					containers.push({
						id: edge.node.to.id,
						type: edge.node.to.data.__typename,
						name: edge.node.to.data.confluenceSpaceName || '',
						icon: `${edge.node.to.data.links.base}${edge.node.to.data.icon.path}`,
						createdDate: new Date(edge.node.to.data.createdDate),
						link: `${edge.node.to.data.links.base}${edge.node.to.data.links.webUi}`,
						containerTypeProperties: {
							subType: undefined,
							name: undefined,
						},
					});
				} else if (edge.node.to.data.__typename === 'JiraProject') {
					containers.push({
						id: edge.node.to.id,
						type: edge.node.to.data.__typename,
						name: edge.node.to.data.jiraProjectName,
						icon: edge.node.to.data.avatar.medium,
						createdDate: new Date(edge.node.to.data.created),
						link: edge.node.to.data.webUrl,
						containerTypeProperties: {
							subType: edge.node.to.data.projectType || '',
							name: edge.node.to.data.projectTypeName || '',
						},
					});
				} else if (edge.node.to.data.__typename === 'LoomSpace') {
					containers.push({
						id: edge.node.to.id,
						type: edge.node.to.data.__typename,
						name: edge.node.to.data.loomSpaceName,
						icon: '',
						link: edge.node.to.data.url,
					});
				}
				return containers;
			},
			[],
		);

		return containersResult;
	}

	async unlinkTeamContainer(teamId: string, containerId: string) {
		const teamAri = teamIdToAri(teamId);

		const response = await this.makeGraphQLRequest<
			'graphStore',
			UnlinkContainerMutationResponse,
			UnlinkContainerMutationVariables
		>(
			{
				query: UnlinkContainerMutation,
				variables: {
					containerId,
					teamId: teamAri,
				},
			},
			{
				operationName: 'UnlinkContainerMutation',
			},
		);

		return response.graphStore;
	}

	async queryNumberOfTeamConnectedToContainer(containerId: string): Promise<number> {
		const response = await this.makeGraphQLRequest<
			'graphStore',
			NumberOfTeamConnectedToContainerQueryResponse,
			NumberOfTeamConnectedToContainerQueryVariables
		>(
			{
				query: NumberOfTeamConnectedToContainerQuery,
				variables: {
					containerId,
				},
			},
			{
				operationName: 'NumberOfTeamConnectedToContainerQuery',
			},
		);
		return response?.graphStore?.teamConnectedToContainerInverse?.edges?.length;
	}

	async queryTeamsConnectedToContainer(containerId: string): Promise<TeamWithMemberships[]> {
		const response = await this.makeGraphQLRequest<
			'graphStore',
			TeamConnectedToContainerQueryResponse,
			TeamConnectedToContainerQueryVariables
		>(
			{
				query: TeamConnectedToContainerQuery,
				variables: {
					containerId,
				},
			},
			{
				operationName: 'TeamConnectedToContainerQuery',
			},
		);
		return response?.graphStore?.teamConnectedToContainerInverse?.edges?.map<TeamWithMemberships>(
			({ node }) => ({
				id: node.id,
				displayName: node.displayName,
				description: node.description,
				state: node.state,
				membershipSettings: node.membershipSettings,
				organizationId: node.organizationId,
				creatorId: node.creator?.id,
				isVerified: node.isVerified,
				members:
					node.members?.nodes.map<TeamMember>(({ member }) => ({
						id: member?.id ? toUserId(member?.id) : '',
						fullName: member?.name ?? '',
						avatarUrl: member?.picture,
						status: member?.accountStatus,
					})) ?? [],
				includesYou: false, // to-do - this needs to be computed - https://product-fabric.atlassian.net/browse/CCECO-4368
				memberCount: node.members?.nodes.length ?? 0,
				largeAvatarImageUrl: node.largeAvatarImageUrl,
				smallAvatarImageUrl: node.smallAvatarImageUrl,
				largeHeaderImageUrl: node.largeHeaderImageUrl,
				smallHeaderImageUrl: node.smallHeaderImageUrl,
				restriction: 'ORG_MEMBERS', // to-do - figure out if this should be optional (it's deprecated) - https://product-fabric.atlassian.net/browse/CCECO-4368
			}),
		);
	}
}

export const aggClient = new AGGClient(DEFAULT_CONFIG.stargateRoot, {
	logException: () => {},
});
