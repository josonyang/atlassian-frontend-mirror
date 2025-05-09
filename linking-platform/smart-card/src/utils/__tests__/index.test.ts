import { type ActiveThemeState } from '@atlaskit/tokens/src/theme-config';

import { getPreviewUrlWithTheme, importWithRetry, isProfileType, openUrl } from '../index';
import * as utils from '../index';

export class ChunkLoadError extends Error {
	name = 'ChunkLoadError';

	constructor(chunkId: string = 'test-chunk') {
		super();
		this.message = `Loading chunk ${chunkId} failed`;
	}
}

describe('importWithRetry', () => {
	// Jest has trouble handling async timeouts with fake timers
	jest.spyOn(utils, 'sleep').mockImplementation(() => Promise.resolve());

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should not retry if promise resolves', async () => {
		const importFunction = jest.fn();
		importFunction.mockImplementation(() => Promise.resolve('it is your birthday.'));

		const result = await importWithRetry(importFunction);

		expect(importFunction).toHaveBeenCalledTimes(1);
		expect(result).toBe('it is your birthday.');
	});

	it('should not retry if promise rejects and retries is 0', async () => {
		const importFunction = jest.fn();
		importFunction.mockImplementation(() => Promise.reject(new ChunkLoadError()));

		await expect(importWithRetry(importFunction, 0)).rejects.toThrow(new ChunkLoadError());
		expect(importFunction).toHaveBeenCalledTimes(1);
	});

	it('should not retry if the promise rejects for something other than a ChunkLoadError', async () => {
		const importFunction = jest.fn();
		importFunction.mockImplementationOnce(() => {
			throw new Error('random error');
		});

		await expect(importWithRetry(importFunction)).rejects.toThrow(new Error('random error'));
		expect(importFunction).toHaveBeenCalledTimes(1);
	});

	it('should retry if promise rejects and reject with the most recent error', async () => {
		const importFunction = jest.fn();
		importFunction
			.mockImplementationOnce(() => Promise.reject(new ChunkLoadError('fail-chunk-1')))
			.mockImplementationOnce(() => Promise.reject(new ChunkLoadError('fail-chunk-2')))
			.mockImplementationOnce(() => Promise.reject(new ChunkLoadError('fail-chunk-3')));

		await expect(importWithRetry(importFunction)).rejects.toThrow(
			new ChunkLoadError('fail-chunk-3'),
		);

		expect(importFunction).toHaveBeenCalledTimes(3);
	});
});

describe('getPreviewUrlWithTheme', () => {
	const theme: Partial<ActiveThemeState> = {
		colorMode: 'dark',
	};

	it('returns the url with themeState at the end of the query params for dark mode', () => {
		expect(getPreviewUrlWithTheme('http://some-preview-url.com?spaceKey=something', theme)).toEqual(
			'http://some-preview-url.com/?spaceKey=something&themeState=colorMode%3Adark',
		);
	});

	it('returns the url with themeState before the # for dark mode', () => {
		expect(
			getPreviewUrlWithTheme('http://some-preview-url.com?spaceKey=something#link-url', theme),
		).toEqual(
			'http://some-preview-url.com/?spaceKey=something&themeState=colorMode%3Adark#link-url',
		);
	});
});

describe('openUrl', () => {
	const url = 'some-url';
	let openSpy: jest.SpyInstance;

	beforeEach(() => {
		openSpy = jest.spyOn(window, 'open');
	});

	afterEach(() => {
		openSpy.mockRestore();
	});

	it('opens url in a new tab', async () => {
		await openUrl(url);
		expect(openSpy).toHaveBeenCalledTimes(1);
		expect(openSpy).toHaveBeenCalledWith(url, '_blank', 'noopener=yes');
	});

	it('does not open url', async () => {
		await openUrl();
		expect(openSpy).not.toHaveBeenCalled();
	});
});

describe('isProfileType', () => {
	it('should return false when type is not defined', () => {
		expect(isProfileType(undefined)).toBe(false);
	});

	it('should return false when type does not contain Profile', () => {
		expect(isProfileType(['Document', 'Object'])).toBe(false);
	});

	it('should return true when type does contain Profile', () => {
		expect(isProfileType(['Document', 'Object', 'Profile'])).toBe(true);
	});
});
