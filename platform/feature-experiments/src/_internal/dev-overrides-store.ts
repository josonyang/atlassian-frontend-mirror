export const devOverrides: Map<string, Record<string, unknown>> = new Map();

/**
 * When `true`, any boolean `isEnabled` experiment NOT in `devOverrides` defaults to `true`
 * instead of the caller's `defaultValue`. Used by VR / integration / unit test harnesses.
 */
export let defaultBooleanExperimentsToTrue: boolean = false;

export function setDefaultBooleanExperimentsToTrue(value: boolean): void {
	defaultBooleanExperimentsToTrue = value;
}
