/**
 * The path to the MCP config file that is being used to run the MCP server
 * e.g. 'mcp.json', 'jira/.cursor/mcp.json', 'platform/.vscode/mcp.json' or 'unknown'
 * This could be anything, do not rely on it!
 * @default `'unknown'`
 */
export const configPath: string = process.env.ADSMCP_CONFIG_PATH || 'unknown';
