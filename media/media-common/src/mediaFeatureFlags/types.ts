// Media feature flags - type and defaults defined here in one source of truth
export interface MediaFeatureFlags {
	mediaInline?: boolean;
}

export interface WithMediaFeatureFlags {
	featureFlags?: MediaFeatureFlags;
}

// With this type we ensure the object will contain all the flags
export type RequiredMediaFeatureFlags = Record<keyof Required<MediaFeatureFlags>, boolean>;

export type MediaFeatureFlagsMap = Record<keyof Required<MediaFeatureFlags>, string>;

export const supportedProducts = ['confluence', 'jira'] as const;
export type SupportedProduct = (typeof supportedProducts)[number];

export type ProductKeys = Record<SupportedProduct, MediaFeatureFlagsMap>;
