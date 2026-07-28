/**
 * Dynamic-import indirection used to load an ADS MCP tool handler by subpath.
 */

import type { ToolHandler } from '../types';

/**
 * Every ADS MCP tool that the CLI can dispatch to.
 *
 * Literal import paths let bundlers discover and embed every tool while preserving lazy loading
 * for the npm CLI. An unconstrained `import(importPath)` cannot produce a self-contained Atlas
 * executable.
 */
const toolImporters = {
	'@atlaskit/ads-mcp/tools/get-a11y-guidelines': () =>
		import(
			/* webpackChunkName: "@atlaskit-internal_ads-cli-tool-get-a11y-guidelines" */
			'@atlaskit/ads-mcp/tools/get-a11y-guidelines'
		),
	'@atlaskit/ads-mcp/tools/get-all-components': () =>
		import(
			/* webpackChunkName: "@atlaskit-internal_ads-cli-tool-get-all-components" */
			'@atlaskit/ads-mcp/tools/get-all-components'
		),
	'@atlaskit/ads-mcp/tools/get-all-icons': () =>
		import(
			/* webpackChunkName: "@atlaskit-internal_ads-cli-tool-get-all-icons" */
			'@atlaskit/ads-mcp/tools/get-all-icons'
		),
	'@atlaskit/ads-mcp/tools/get-all-tokens': () =>
		import(
			/* webpackChunkName: "@atlaskit-internal_ads-cli-tool-get-all-tokens" */
			'@atlaskit/ads-mcp/tools/get-all-tokens'
		),
	'@atlaskit/ads-mcp/tools/get-guidelines': () =>
		import(
			/* webpackChunkName: "@atlaskit-internal_ads-cli-tool-get-guidelines" */
			'@atlaskit/ads-mcp/tools/get-guidelines'
		),
	'@atlaskit/ads-mcp/tools/get-lint-rules': () =>
		import(
			/* webpackChunkName: "@atlaskit-internal_ads-cli-tool-get-lint-rules" */
			'@atlaskit/ads-mcp/tools/get-lint-rules'
		),
	'@atlaskit/ads-mcp/tools/migration-guides': () =>
		import(
			/* webpackChunkName: "@atlaskit-internal_ads-cli-tool-migration-guides" */
			'@atlaskit/ads-mcp/tools/migration-guides'
		),
	'@atlaskit/ads-mcp/tools/search-components': () =>
		import(
			/* webpackChunkName: "@atlaskit-internal_ads-cli-tool-search-components" */
			'@atlaskit/ads-mcp/tools/search-components'
		),
	'@atlaskit/ads-mcp/tools/search-icons': () =>
		import(
			/* webpackChunkName: "@atlaskit-internal_ads-cli-tool-search-icons" */
			'@atlaskit/ads-mcp/tools/search-icons'
		),
	'@atlaskit/ads-mcp/tools/search-tokens': () =>
		import(
			/* webpackChunkName: "@atlaskit-internal_ads-cli-tool-search-tokens" */
			'@atlaskit/ads-mcp/tools/search-tokens'
		),
} as const;

type ToolImportPath = keyof typeof toolImporters;

const isToolImportPath = (importPath: string): importPath is ToolImportPath =>
	importPath in toolImporters;

/**
 * Load an ADS MCP tool handler by subpath.
 *
 * Exposed as a single function so tests can mock it and assert which tool a command
 * dispatched to, and so the dynamic `import()` lives in exactly one place.
 */
export const importToolHandler = async ({
	importPath,
	handlerName,
}: {
	importPath: string;
	handlerName: string;
}): Promise<ToolHandler> => {
	if (!isToolImportPath(importPath)) {
		throw new Error(`Unknown ADS MCP tool import path "${importPath}".`);
	}

	const mod: Record<string, unknown> = await toolImporters[importPath]();
	const handler = mod[handlerName];
	if (typeof handler !== 'function') {
		throw new Error(`Tool handler "${handlerName}" not found in "${importPath}".`);
	}
	return handler as ToolHandler;
};
