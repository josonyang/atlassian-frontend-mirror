import React from 'react';

import { AppHome, CustomProductHome, ProductHome } from '@atlaskit/atlassian-navigation';
import {
	BitbucketIcon,
	BitbucketLogo,
	CompassIcon,
	CompassLogo,
	ConfluenceIcon,
	ConfluenceLogo,
	JiraIcon,
	JiraLogo,
	JiraServiceManagementIcon,
	JiraServiceManagementLogo,
} from '@atlaskit/logo';

import atlassianIconUrl from './assets/atlassian-icon.png';
import atlassianLogoUrl from './assets/atlassian-logo.png';

export const BitbucketAppHome = () => (
	<AppHome
		onClick={console.log}
		siteTitle="Extranet"
		icon={BitbucketIcon}
		name="Bitbucket"
		testId="bitbucket-app-home"
	/>
);

export const BitbucketProductHome = () => (
	<ProductHome
		onClick={console.log}
		siteTitle="Extranet"
		icon={BitbucketIcon}
		logo={BitbucketLogo}
		testId="bitbucket-product-home"
	/>
);

export const ConfluenceAppHome = () => (
	<AppHome
		siteTitle="Extranet"
		icon={ConfluenceIcon}
		name="Confluence"
		href="#"
		testId="confluence-app-home"
	/>
);

export const ConfluenceProductHome = () => (
	<ProductHome
		siteTitle="Extranet"
		icon={ConfluenceIcon}
		logo={ConfluenceLogo}
		href="#"
		testId="confluence-product-home"
	/>
);

export const JiraAppHome = () => (
	<AppHome name="Jira" icon={JiraIcon} siteTitle="Extranet" testId="jira-app-home" />
);

// Using new logos inside ProductHome, as this is also supported
export const JiraProductHome = () => (
	<ProductHome
		onClick={console.log}
		siteTitle="Extranet"
		aria-label={'Jira'}
		icon={JiraIcon}
		logo={JiraLogo}
		testId="jira-product-home"
	/>
);

export const JiraServiceManagementProductHome = () => (
	<ProductHome
		siteTitle="Extranet"
		icon={JiraServiceManagementIcon}
		logo={JiraServiceManagementLogo}
		href="#"
		testId="jsm-product-home"
	/>
);

export const JiraServiceManagementAppHome = () => (
	<AppHome
		name="Jira Service Management"
		icon={JiraServiceManagementIcon}
		siteTitle="Extranet"
		href="#"
		testId="jsm-app-home"
	/>
);

export const CompassAppHome = () => (
	<AppHome name="Compass" icon={CompassIcon} siteTitle="Extranet" testId="compass-app-home" />
);

export const CompassProductHome = () => (
	<ProductHome
		siteTitle="Extranet"
		icon={CompassIcon}
		logo={CompassLogo}
		testId="compass-product-home"
	/>
);

export const DefaultProductHome = JiraProductHome;
export const DefaultAppHome = JiraAppHome;

export const DefaultCustomProductHome = () => (
	<CustomProductHome
		href="#"
		siteTitle="Extranet"
		iconAlt="Custom icon"
		iconUrl={atlassianIconUrl}
		logoAlt="Custom logo"
		logoUrl={atlassianLogoUrl}
		testId="custom-product-home"
	/>
);
