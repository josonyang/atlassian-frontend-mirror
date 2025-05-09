export interface AvailableSite {
	avatarUrl: string;
	cloudId: string;
	displayName: string;
	isVertigo: boolean;
	products: AvailableSitesProductType[];
	url: string;
}

export type ProductName = 'jira' | 'confluence';

export interface Site {
	name: string;
	url: URL;
	products: ProductName[];
	cloudId: string;
	iconUrl: URL | null;
}

export type AvailableSitesRequest = {
	products: AvailableSitesProductType[];
	/**
	 * Set the base url for network requests to the API gateway
	 */
	gatewayBaseUrl?: string;
};

export interface AvailableSitesResponse {
	sites: AvailableSite[];
}

export enum AvailableSitesProductType {
	WHITEBOARD = 'atlassian-whiteboard',
	BEACON = 'beacon',
	COMPASS = 'compass',
	CONFLUENCE = 'confluence.ondemand',
	JIRA_BUSINESS = 'jira-core.ondemand',
	JIRA_INCIDENT_MANAGER = 'jira-incident-manager.ondemand',
	JIRA_PRODUCT_DISCOVERY = 'jira-product-discovery',
	JIRA_SERVICE_DESK = 'jira-servicedesk.ondemand',
	JIRA_SOFTWARE = 'jira-software.ondemand',
	MERCURY = 'mercury',
	OPSGENIE = 'opsgenie',
	STATUS_PAGE = 'statuspage',
	ATLAS = 'townsquare',
	LOOM = 'loom',
}
