import {
	type FlagWrapper,
	type Reason,
	type ErrorKind,
	type FlagValue,
	type CustomAttributes,
	type FlagShape,
} from './types';

export const MISSING_FLAG_EXPLANATION = {
	kind: 'ERROR' as Reason,
	errorKind: 'FLAG_NOT_FOUND' as ErrorKind,
};

/**
 * This class handles the evaluations for flags that do not exist in the collection given to the client.
 */
export default class MissingFlag implements FlagWrapper {
	// Unused but required for type
	evaluationCount = -1;

	private evaluate<T = FlagValue>(defaultValue: T) {
		return defaultValue;
	}

	getBooleanValue(options: {
		default: boolean;
		shouldTrackExposureEvent?: boolean;
		exposureData?: CustomAttributes;
	}): boolean {
		return this.evaluate(options.default);
	}

	getVariantValue(options: {
		default: string;
		oneOf: string[];
		shouldTrackExposureEvent?: boolean;
		exposureData?: CustomAttributes;
	}): string {
		return this.evaluate(options.default);
	}

	getJSONValue(): object {
		return this.evaluate({});
	}

	getRawValue(options: {
		default: FlagValue;
		shouldTrackExposureEvent?: boolean;
		exposureData?: CustomAttributes;
	}): FlagValue {
		return this.evaluate(options.default);
	}

	getFlagEvaluation<T = FlagValue>(options: {
		default: T;
		shouldTrackExposureEvent?: boolean | undefined;
		exposureData?: CustomAttributes | undefined;
	}): FlagShape<T> {
		const value: T = this.evaluate<T>(options.default);
		return {
			value,
			explanation: MISSING_FLAG_EXPLANATION,
		} as FlagShape<T>;
	}
}
