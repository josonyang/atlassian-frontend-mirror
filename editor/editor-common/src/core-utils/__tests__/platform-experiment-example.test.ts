import { expVal } from '@atlaskit/platform-feature-experiments/exp-val';
import { mockExp } from '@atlassian/experiment-test-utils/mock-exp';

function isPlatformExperimentExampleEnabled(): boolean {
	return expVal('platform_editor_experiment_test_validation', 'isEnabled', false);
}

function isExcludedPlatformExperimentExampleEnabled(): boolean {
	return expVal('platform_editor_experiment_test_validation_excluded', 'isEnabled', false);
}

describe('platform-feature-experiments default-to-true in editor unit tests', () => {
	it('returns true by default (no mock) because tests inside packages/editor enable all boolean experiments', () => {
		// No mockExp call — the infrastructure should default isEnabled to true.
		expect(isPlatformExperimentExampleEnabled()).toBe(true);
	});

	it('returns false when the experiment is explicitly disabled via mockExp', () => {
		mockExp('platform_editor_experiment_test_validation', { isEnabled: false });

		expect(isPlatformExperimentExampleEnabled()).toBe(false);
	});

	it('returns false when the experiment is excluded by unitPlatformExperimentOverrides in the editor Jest setup', () => {
		expect(isExcludedPlatformExperimentExampleEnabled()).toBe(false);
	});
});
