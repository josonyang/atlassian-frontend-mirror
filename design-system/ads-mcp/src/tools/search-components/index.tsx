import type { CallToolResult } from '@modelcontextprotocol/sdk/types';
import Fuse from 'fuse.js';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { cleanQuery } from '../../helpers';
import { components } from '../get-components/components';
import { type Component } from '../get-components/types';

const inputSchema = z.object({
	terms: z
		.array(z.string())
		.describe(
			'An array of search terms to find components by name, package name, description, or example, eg. `["button", "input", "select"]`',
		),
	limit: z
		.number()
		.optional()
		.default(1)
		.describe('Maximum number of results per search term in the array (default: 1)'),
	exactName: z
		.boolean()
		.optional()
		.default(false)
		.describe(
			'Enable to explicitly search components by the exact name match (when you know the name, but need more details)',
		),
});

export const listSearchComponentsTool = {
	name: 'ads_search_components',
	description: 'Search for Atlassian Design System components.',
	annotations: {
		title: 'Search ADS components',
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: true,
	},
	inputSchema: zodToJsonSchema(inputSchema),
};

// Clean component result to only return name, package name, example, and props
const cleanComponentResult = (result: Component) => {
	return {
		name: result.name,
		package: result.package,
		examples: result.examples,
		props: result.props,
	};
};

export const searchComponentsTool = async (
	params: z.infer<typeof inputSchema>,
): Promise<CallToolResult> => {
	const { terms, limit = 1, exactName = false } = params;
	const searchTerms = terms.filter(Boolean).map(cleanQuery);

	if (!searchTerms.length) {
		return {
			isError: true,
			content: [
				{
					type: 'text',
					text: `Error: Required parameter 'terms' is missing or empty`,
				},
			],
		};
	}

	if (exactName) {
		// for each search term, search for the exact match
		const exactNameMatches = searchTerms
			.map((term) => {
				return components.find((component) => component.name.toLowerCase() === term.toLowerCase());
			})
			.filter(Boolean) as Component[];

		if (exactNameMatches.length > 0) {
			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(exactNameMatches.map(cleanComponentResult)),
					},
				],
			};
		}
	}

	// use Fuse.js to fuzzy-search through the components
	const fuse = new Fuse(components, {
		keys: [
			{
				name: 'name',
				weight: 3,
			},
			{
				name: 'package',
				weight: 3,
			},
			{
				name: 'category',
				weight: 2,
			},
			{
				name: 'description',
				weight: 2,
			},
			{
				name: 'examples',
				weight: 1,
			},
		],
		threshold: 0.4,
	});

	// every search term, search for the results
	const results = searchTerms
		.map((term) => {
			// always search exact match from the components first
			const exactNameMatch = components.find(
				(component) => component.name.toLowerCase() === term.toLowerCase(),
			);
			if (exactNameMatch) {
				return [
					{
						item: exactNameMatch,
					},
				];
			}

			return fuse.search(term).slice(0, limit);
		})
		.flat();

	if (!results.length) {
		return {
			isError: true,
			content: [
				{
					type: 'text',
					text: `Error: No components found for '${terms.join(', ')}'. Available components: ${components.map((c) => c.name).join(', ')}`,
				},
			],
		};
	}

	// Remove duplicates based on component name
	const uniqueResults = results.filter((result, index, arr) => {
		return arr.findIndex((r) => r.item.name === result.item.name) === index;
	});

	return {
		content: [
			{
				type: 'text',
				text: JSON.stringify(uniqueResults.map((result) => result.item).map(cleanComponentResult)),
			},
		],
	};
};
