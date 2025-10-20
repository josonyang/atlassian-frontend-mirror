import type { ExperienceCheck, ExperienceCheckCallback } from './ExperienceCheck';

/**
 * Composite check that combines multiple checks.
 *
 * Starts and stops all contained checks.
 */
export class ExperienceCheckComposite implements ExperienceCheck {
	private checks: ExperienceCheck[];

	constructor(checks: ExperienceCheck[]) {
		this.checks = checks;
	}

	start(callback: ExperienceCheckCallback) {
		this.checks.forEach((check) => check.start(callback));
	}

	stop() {
		this.checks.forEach((check) => check.stop());
	}
}
