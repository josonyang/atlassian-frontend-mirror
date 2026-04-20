

const GRAPHQL_ENDPOINT = '/gateway/api/graphql';

/**
 * Fetches version capability for a site via raw GraphQL fetch.
 * Returns true only if versioning migration has completed.
 *
 * TODO remove after versioning rollout complete
 * See: https://product-fabric.atlassian.net/browse/RAGE-2822
 */
export const fetchHasVersionCapability = async (cloudId: string): Promise<boolean> => {
	try {
		const response = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `query profilecardHasVersionCapabilityQuery($cloudId: String!) {
					agentStudio_hasVersionCapability(cloudId: $cloudId) @optIn(to: "AgentStudio") {
						__typename
						... on AgentStudioHasVersionCapability {
							hasVersionCapability
						}
					}
				}`,
				variables: { cloudId },
			}),
		});
		const json = await response.json();
		const result = json?.data?.agentStudio_hasVersionCapability;
		return result?.__typename === 'AgentStudioHasVersionCapability'
			? Boolean(result.hasVersionCapability)
			: false;
	} catch {
		return false;
	}
}

/**
 * Fetches the Rovo activation ID for a given cloud ID.
 * Used to construct the agent ARI when not available.
 */
export const fetchActivationId = async (cloudId: string): Promise<string | null> => {
	try {
		const response = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `query profilecardActivationQuery($cloudId: ID!, $product: String!) {
					tenantContexts(cloudIds: [$cloudId]) {
						activationIdByProduct(product: $product) {
							active
						}
					}
				}`,
				variables: { cloudId, product: 'rovo' },
			}),
		});
		const json = await response.json();
		return json?.data?.tenantContexts?.[0]?.activationIdByProduct?.active ?? null;
	} catch {
		return null;
	}
}

/**
 * Calls the agentStudio_duplicateAgent mutation via raw GraphQL fetch.
 *
 * TODO: Add SLO tracking and Sentry error reporting.
 * See: https://product-fabric.atlassian.net/browse/RAGE-2822
 */
export const fetchDuplicateAgentMutation = async (
	agentAri: string,
): Promise<{ success: boolean; newAgentAri?: string; errorMessage?: string }> => {
	try {
		const response = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `mutation profilecardDuplicateAgentMutation($agentId: ID!) {
					agentStudio_duplicateAgent(id: $agentId) @optIn(to: "AgentStudio") {
						agent { id }
						success
						errors { message }
					}
				}`,
				variables: { agentId: agentAri },
			}),
		});
		const json = await response.json();
		const result = json?.data?.agentStudio_duplicateAgent;
		if (result?.success && result?.agent?.id) {
			return { success: true, newAgentAri: result.agent.id };
		}
		return {
			success: false,
			errorMessage: result?.errors?.[0]?.message ?? 'Duplicate agent mutation failed',
		};
	} catch (error) {
		return {
			success: false,
			errorMessage: error instanceof Error ? error.message : 'Network error during duplication',
		};
	}
}
