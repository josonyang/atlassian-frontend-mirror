import { onboardingJiraSpotlight, onboardingMultiStep, onboardingSingleStep, onboardingWithMotion } from './migrations/onboarding-to-spotlight';
import type { MigrationRegistry } from './types';

export const migrationRegistry: MigrationRegistry = {
	[onboardingJiraSpotlight.id]: onboardingJiraSpotlight,
	[onboardingSingleStep.id]: onboardingSingleStep,
	[onboardingMultiStep.id]: onboardingMultiStep,
	[onboardingWithMotion.id]: onboardingWithMotion,
};
