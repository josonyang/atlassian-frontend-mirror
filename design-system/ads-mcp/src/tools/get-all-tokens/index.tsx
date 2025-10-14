import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { tokens } from '@atlaskit/tokens/token-metadata';

const inputSchema = z.object({});

export const listGetAllTokensTool = {
	name: 'ads_get_all_tokens',
	description:
		"Fetch all Atlassian Design System tokens. Only use when `ads_search_tokens` does not return what you're looking for.",
	annotations: {
		title: 'Get all ADS tokens',
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: true,
	},
	inputSchema: zodToJsonSchema(inputSchema),
};

export const getAllTokensTool = async () => ({
	content: tokens.map((token) => ({
		// NOTE: Ideally one day the MCP would support structured content…
		// eg. `type: 'object', data: token`
		type: 'text',
		text: JSON.stringify(
			{
				name: token.name,
				exampleValue: token.exampleValue,
			},
			null,
			2,
		),
	})),
});
