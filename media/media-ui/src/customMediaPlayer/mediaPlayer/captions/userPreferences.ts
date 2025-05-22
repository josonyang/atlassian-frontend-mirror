import { type MediaUserPreferences } from '@atlaskit/media-client-react';

export const getUserCaptionsLocale = (mediaUserPreferences: MediaUserPreferences) =>
	mediaUserPreferences.get('videoCaptionsPreferredLocale');

export const setUserCaptionsLocale = (
	mediaUserPreferences: MediaUserPreferences,
	locale: string,
) => {
	mediaUserPreferences.set('videoCaptionsPreferredLocale', locale);
};

export const setUserCaptionsEnabled = (
	mediaUserPreferences: MediaUserPreferences,
	areCaptionsEnabled: boolean,
) => {
	mediaUserPreferences.set('videoCaptionsEnabled', areCaptionsEnabled);
};

export const getUserCaptionsEnabled = (mediaUserPreferences: MediaUserPreferences) =>
	!!mediaUserPreferences.get('videoCaptionsEnabled');
