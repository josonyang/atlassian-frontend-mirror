import { expValEqualsInternal } from './exp-val-equals-internal';

import { type EditorExperimentsConfig } from './experiments-config';

/**
 * Check the value if an editor experiment and fire exposure.
 *
 * !!! Note: This method always fires exposure. !!!
 *
 * IMPORTANT: If experiment is not defined default value will be null, unless provided otherwise.
 *
 * @example Boolean experiment
 * if (expValEquals('example-boolean', 'isEnabled', true)) {
 *   // Run code for on variant
 * } else {
 *   // Run code for off variant
 * }
 *
 * @example Multivariate experiment
 * if (expValEquals('example-multivariate', 'cohort', 'one')) {
 *   // Run code for 'one' variant
 * } else {
 *   // Run code for control
 * }
 *
 * @param experimentName - experiment key
 * @param experimentParam - the name of the parameter to fetch from the experiment config
 * @param experimentExpectedValue - expected value to compare with
 * @param experimentDefaultValue - default value to use if the experiment is not defined.
 *
 * @returns boolean
 */
export function expValEquals<ExperimentName extends keyof EditorExperimentsConfig>(
	experimentName: ExperimentName,
	experimentParam: EditorExperimentsConfig[ExperimentName]['param'],
	experimentExpectedValue: EditorExperimentsConfig[ExperimentName]['defaultValue'],
	experimentDefaultValue: EditorExperimentsConfig[ExperimentName]['defaultValue'] | null = null,
): boolean {
	return expValEqualsInternal(
		experimentName,
		experimentParam,
		experimentExpectedValue,
		experimentDefaultValue,
		true,
	);
}
