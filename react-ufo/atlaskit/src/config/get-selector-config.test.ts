import { isFedrampModerate } from '@atlaskit/atlassian-context';
import { fg } from '@atlaskit/platform-feature-flags';

import {
	__resetFedrampOverrideCacheForTests,
	type Config,
	getSelectorConfig,
	setUFOConfig,
} from './index';

jest.mock('@atlaskit/platform-feature-flags');
jest.mock('@atlaskit/atlassian-context', () => ({
	isFedrampModerate: jest.fn(),
}));

const mockedFg = fg as jest.Mock;
const mockedIsFedrampModerate = isFedrampModerate as jest.Mock;

const CONFIGURED_SELECTOR_CONFIG = {
	id: true,
	testId: true,
	role: true,
	className: true,
	dataVC: true,
} as const;

const FORCED_OFF_SELECTOR_CONFIG = {
	id: false,
	testId: false,
	role: false,
	className: false,
	dataVC: false,
} as const;

type SelectorConfigInput = {
	id: boolean;
	testId: boolean;
	role: boolean;
	className: boolean;
	dataVC?: boolean;
};

const buildConfig = (selectorConfig: SelectorConfigInput | undefined): Config =>
	({
		product: 'testProduct',
		region: 'testRegion',
		vc: {
			enabled: true,
			selectorConfig,
		},
	}) as unknown as Config;

describe('getSelectorConfig (FedRAMP override)', () => {
	beforeEach(() => {
		// Reset configuration and any cached perimeter detection result so each
		// test runs with a fresh state.
		// @ts-expect-error - intentionally reset to undefined for tests
		setUFOConfig(undefined);
		__resetFedrampOverrideCacheForTests();
		mockedFg.mockReset();
		mockedIsFedrampModerate.mockReset();
		mockedFg.mockReturnValue(false);
		mockedIsFedrampModerate.mockReturnValue(false);
	});

	it('returns the configured selectorConfig when neither the gate nor FedRAMP is active', () => {
		mockedFg.mockReturnValue(false);
		mockedIsFedrampModerate.mockReturnValue(false);
		setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

		expect(getSelectorConfig()).toEqual(CONFIGURED_SELECTOR_CONFIG);
	});

	it('returns the configured selectorConfig when the gate is on but environment is not FedRAMP', () => {
		mockedFg.mockImplementation((name: string) => name === 'platform_ufo_fedramp_overrides');
		mockedIsFedrampModerate.mockReturnValue(false);
		setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

		expect(getSelectorConfig()).toEqual(CONFIGURED_SELECTOR_CONFIG);
	});

	it('returns the configured selectorConfig when in FedRAMP but the gate is off', () => {
		mockedFg.mockReturnValue(false);
		mockedIsFedrampModerate.mockReturnValue(true);
		setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

		expect(getSelectorConfig()).toEqual(CONFIGURED_SELECTOR_CONFIG);
	});

	it('returns the all-false override when the gate is on AND environment is FedRAMP', () => {
		mockedFg.mockImplementation((name: string) => name === 'platform_ufo_fedramp_overrides');
		mockedIsFedrampModerate.mockReturnValue(true);
		setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

		expect(getSelectorConfig()).toEqual(FORCED_OFF_SELECTOR_CONFIG);
	});

	it('forces all fields to false even when only some were explicitly enabled', () => {
		mockedFg.mockImplementation((name: string) => name === 'platform_ufo_fedramp_overrides');
		mockedIsFedrampModerate.mockReturnValue(true);
		setUFOConfig(
			buildConfig({
				id: true,
				testId: false,
				role: true,
				className: false,
			}),
		);

		expect(getSelectorConfig()).toEqual(FORCED_OFF_SELECTOR_CONFIG);
	});

	it('returns the all-false override even when no selectorConfig was configured', () => {
		mockedFg.mockImplementation((name: string) => name === 'platform_ufo_fedramp_overrides');
		mockedIsFedrampModerate.mockReturnValue(true);
		setUFOConfig(buildConfig(undefined));

		expect(getSelectorConfig()).toEqual(FORCED_OFF_SELECTOR_CONFIG);
	});

	it('returns undefined when no selectorConfig was configured and override is inactive', () => {
		mockedFg.mockReturnValue(false);
		mockedIsFedrampModerate.mockReturnValue(false);
		setUFOConfig(buildConfig(undefined));

		expect(getSelectorConfig()).toBeUndefined();
	});

	it('treats perimeter detection failures as non-FedRAMP (safe default)', () => {
		mockedFg.mockImplementation((name: string) => name === 'platform_ufo_fedramp_overrides');
		mockedIsFedrampModerate.mockImplementation(() => {
			throw new Error('cookie parse failure');
		});
		setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

		expect(getSelectorConfig()).toEqual(CONFIGURED_SELECTOR_CONFIG);
	});

	it('memoises the perimeter detection (only calls isFedrampModerate once)', () => {
		mockedFg.mockImplementation((name: string) => name === 'platform_ufo_fedramp_overrides');
		mockedIsFedrampModerate.mockReturnValue(true);
		setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

		getSelectorConfig();
		getSelectorConfig();
		getSelectorConfig();

		expect(mockedIsFedrampModerate).toHaveBeenCalledTimes(1);
	});

	it('returns a frozen all-false override (callers cannot mutate it)', () => {
		mockedFg.mockImplementation((name: string) => name === 'platform_ufo_fedramp_overrides');
		mockedIsFedrampModerate.mockReturnValue(true);
		setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

		const result = getSelectorConfig();
		expect(result).toEqual(FORCED_OFF_SELECTOR_CONFIG);
		// The override constant is frozen so a misbehaving caller can't flip a
		// field back to true at runtime.
		expect(Object.isFrozen(result)).toBe(true);
	});

	describe('centralised resolver (callerOverride, defaultConfig)', () => {
		const CALLER_OVERRIDE = {
			id: true,
			testId: false,
			role: false,
			className: false,
			dataVC: false,
		} as const;
		const CALLER_DEFAULT = {
			id: false,
			testId: false,
			role: false,
			className: true,
			dataVC: true,
		} as const;

		describe('when the gate is OFF', () => {
			beforeEach(() => {
				mockedFg.mockReturnValue(false);
			});

			it('ignores the FedRAMP override even when in FedRAMP', () => {
				mockedIsFedrampModerate.mockReturnValue(true);
				setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

				expect(getSelectorConfig(CALLER_OVERRIDE, CALLER_DEFAULT)).toEqual(CALLER_OVERRIDE);
			});

			it('returns caller-override > configured (mirroring pre-FedRAMP behaviour, ignoring caller default)', () => {
				setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

				expect(getSelectorConfig(CALLER_OVERRIDE, CALLER_DEFAULT)).toEqual(CALLER_OVERRIDE);
			});

			it('returns configured when caller-override is undefined', () => {
				setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

				expect(getSelectorConfig(undefined, CALLER_DEFAULT)).toEqual(CONFIGURED_SELECTOR_CONFIG);
			});

			it('returns undefined when neither caller-override nor configured is set (caller default is NOT consulted gate-off)', () => {
				setUFOConfig(buildConfig(undefined));

				expect(getSelectorConfig(undefined, CALLER_DEFAULT)).toBeUndefined();
			});
		});

		describe('when the gate is ON', () => {
			beforeEach(() => {
				mockedFg.mockImplementation((name: string) => name === 'platform_ufo_fedramp_overrides');
			});

			it('FedRAMP override beats caller-override', () => {
				mockedIsFedrampModerate.mockReturnValue(true);
				expect(getSelectorConfig(CALLER_OVERRIDE, CALLER_DEFAULT)).toEqual(
					FORCED_OFF_SELECTOR_CONFIG,
				);
			});

			it('caller-override beats configured when not in FedRAMP', () => {
				mockedIsFedrampModerate.mockReturnValue(false);
				setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

				expect(getSelectorConfig(CALLER_OVERRIDE, CALLER_DEFAULT)).toEqual(CALLER_OVERRIDE);
			});

			it('configured beats caller default when not in FedRAMP and no caller-override', () => {
				mockedIsFedrampModerate.mockReturnValue(false);
				setUFOConfig(buildConfig({ ...CONFIGURED_SELECTOR_CONFIG }));

				expect(getSelectorConfig(undefined, CALLER_DEFAULT)).toEqual(CONFIGURED_SELECTOR_CONFIG);
			});

			it('falls back to caller default when nothing else is set and not in FedRAMP', () => {
				mockedIsFedrampModerate.mockReturnValue(false);
				setUFOConfig(buildConfig(undefined));

				expect(getSelectorConfig(undefined, CALLER_DEFAULT)).toEqual(CALLER_DEFAULT);
			});
		});
	});
});
