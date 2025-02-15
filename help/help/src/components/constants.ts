export const MIN_CHARACTERS_FOR_SEARCH = 3;
export const LOADING_TIMEOUT = 1000;
export const NUMBER_OF_WHATS_NEW_ITEMS_PER_PAGE = 10;

export enum VIEW {
	DEFAULT_CONTENT = 'DEFAULT_CONTENT',
	SEARCH = 'SEARCH',
	ARTICLE = 'ARTICLE',
	WHATS_NEW = 'WHATS_NEW',
	WHATS_NEW_ARTICLE = 'WHATS_NEW_ARTICLE',
}

// Animation related consts
export const SLIDEIN_OVERLAY_TRANSITION_DURATION_MS = 300;
export const FADEIN_OVERLAY_TRANSITION_DURATION_MS = 440;
export const HIDE_CONTENT_DELAY = FADEIN_OVERLAY_TRANSITION_DURATION_MS + 200;

export type TransitionStatus = 'unmounted' | 'exiting' | 'entering' | 'entered' | 'exited';

// Animation related consts
export const TRANSITION_DURATION_MS = 220;
