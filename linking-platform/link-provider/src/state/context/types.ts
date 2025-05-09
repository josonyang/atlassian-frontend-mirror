import { type Store } from 'redux';
import {
	type CardAppearance,
	type CardStore,
	type LinkingPlatformFeatureFlags,
	type ProductType,
} from '@atlaskit/linking-common';
import { type LinkPreview, type CardPlatform } from '@atlaskit/link-extractors';
import type CardClient from '../../client';
import { type CardConnections } from '../store/types';

// TODO: Remove once mobile team move to using authentication
// flow https://product-fabric.atlassian.net/browse/SL-347.
export interface CardAuthFlowOpts {
	/**
	 * Enable and disable authentication flow.
	 * If disabled, Smart Links will not offer Connect option when the link returns forbidden nor unauthorized status.
	 */
	authFlow?: 'oauth2' | 'disabled';
}

export interface CardContext {
	store: Store<CardStore>;
	prefetchStore: Record<string, boolean>;
	connections: CardConnections;
	config: CardProviderCacheOpts & CardAuthFlowOpts;
	extractors: {
		getPreview: (url: string, platform?: CardPlatform) => LinkPreview | undefined;
	};
	renderers?: CardProviderRenderers;
	featureFlags?: LinkingPlatformFeatureFlags;
	isAdminHubAIEnabled?: boolean;
	product?: ProductType;
	shouldControlDataExport?: boolean;
}

/** @deprecated Feature removed (EDM-2205) */
export interface CardProviderCacheOpts {
	maxAge?: number;
	maxLoadingDelay?: number;
}

export interface CardProviderStoreOpts {
	initialState: CardStore;
}

export interface CardProviderRenderers {
	adf?: (adf: string) => React.ReactNode;
	emoji?: (emoji?: string, parentComponent?: CardAppearance) => React.ReactNode;
}

export type CardProviderProps = {
	/**
	 * A client that make request to Object Resolver Service to resolve url for linking components.
	 * See `CardClient` for more details.
	 */
	client?: CardClient;
	/**
	 * @deprecated Feature removed (EDM-2205)
	 */
	cacheOptions?: CardProviderCacheOpts;
	/**
	 * The options for redux store that contains linking data.
	 * `initialState` can be used to set linking data and prevent card client to make a request to resolve the url.
	 */
	storeOptions?: CardProviderStoreOpts;
	/**
	 * Any React components contains linking components.
	 */
	children: React.ReactNode;
	/**
	 * A render function returning React component.
	 * `emoji` is used to render Smart Link icon for Confluence emoji.
	 */
	renderers?: CardProviderRenderers;
	/**
	 * Specify feature flag value to linking components.
	 * The use of this prop is not recommended.
	 * Please use `@atlaskit/platform-feature-flags` instead.
	 */
	featureFlags?: LinkingPlatformFeatureFlags & { [flag: string]: unknown };
	/**
	 * Flag indicated whether AI feature is enabled in AdminHub.
	 * This is required for AI summary in Smart Links.
	 */
	isAdminHubAIEnabled?: boolean;
	/**
	 * The product that linking components are rendered in.
	 * Required for features such as AI summary in Smart Links, Loom embed Smart Links, etc.
	 */
	product?: ProductType;
	/**
	 * Flag indicated by compliance to determine whether the content of this link should be controlled for data export.
	 * This controls whether or not the link data should be blocked for data export during certain features, such as PDF export in Confluence.
	 */
	shouldControlDataExport?: boolean;
} & CardAuthFlowOpts;
