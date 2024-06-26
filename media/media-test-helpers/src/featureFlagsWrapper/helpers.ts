import {
	type MediaFeatureFlags,
	defaultMediaFeatureFlags,
	getMediaFeatureFlag,
} from '@atlaskit/media-common';

const mediaFeatureFlagsKeys = Object.keys(defaultMediaFeatureFlags) as Array<
	keyof MediaFeatureFlags
>;

export const setLocalFeatureFlag = (
	key: keyof MediaFeatureFlags,
	value: number | boolean | string | Object,
) => {
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {}
};

export const clearLocalFeatureFlag = (key: keyof MediaFeatureFlags) => {
	try {
		delete window.localStorage[key];
	} catch (e) {}
};

export const clearAllLocalFeatureFlags = () => {
	mediaFeatureFlagsKeys.forEach(clearLocalFeatureFlag);
};

export const getMediaFeatureFlags = (): MediaFeatureFlags =>
	mediaFeatureFlagsKeys.reduce(
		(result, flagName) => ({
			...result,
			[flagName]: getMediaFeatureFlag(flagName),
		}),
		{},
	);
