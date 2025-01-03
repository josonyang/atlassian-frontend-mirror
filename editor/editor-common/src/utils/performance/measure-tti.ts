import { SEVERITY } from '../analytics';

import { isPerformanceObserverLongTaskAvailable } from './is-performance-api-available';
import { getDistortedDurationMonitor } from './measure-render';

// Ignored via go/ees005
// eslint-disable-next-line @typescript-eslint/max-params
export function measureTTI(
	onMeasureComplete: (
		tti: number,
		ttiFromInvocation: number,
		canceled: boolean,
		distortedDuration: boolean,
	) => void,
	idleThreshold: number = 1000,
	cancelAfter: number = 60,

	// Dependency Injection for easier testing
	PerfObserver?: typeof window.PerformanceObserver,
) {
	if (!isPerformanceObserverLongTaskAvailable()) {
		return;
	}

	const start = performance.now();
	// Keeping track of users moving away from the tab, which distorts the TTI measurement
	const distortedDurationMonitor = getDistortedDurationMonitor();

	let prevLongTask: Pick<PerformanceEntry, 'startTime' | 'duration'> | undefined;
	let lastLongTask: Pick<PerformanceEntry, 'startTime' | 'duration'> = {
		startTime: start,
		duration: 0,
	};
	const cancelAfterMs = cancelAfter * 1000;
	const observer = new (PerfObserver || PerformanceObserver)((list) => {
		const entries = list.getEntries();
		if (entries.length) {
			prevLongTask = lastLongTask;
			lastLongTask = entries[entries.length - 1];
		}
	});

	observer.observe({ entryTypes: ['longtask'] });

	const checkIdle = (): void | NodeJS.Timer => {
		// 1. There hasn't been any long task in `idleThreshold` time: Interactive from the start.
		// 2. Only 1 long task: Interactive from the end of the only long task.
		// 3. Several long tasks:
		//    3.1 Interactive from the end of prevLongTask if `lastLongTask.start - prevLongTask.end >= idleThreshold`
		//    3.2 Interactive from the end of lastLongTask if `lastLongTask.start - prevLongTask.end < idleThreshold`

		const now = performance.now();
		const lastEnd = lastLongTask.startTime + lastLongTask.duration;
		const prevEnd = prevLongTask ? prevLongTask.startTime + prevLongTask.duration : lastEnd;
		const elapsedTimeMs = now - start;
		const canceled = elapsedTimeMs > cancelAfterMs;

		if (!prevLongTask) {
			observer.disconnect();
			distortedDurationMonitor.cleanup();
			return onMeasureComplete(prevEnd, 0, false, distortedDurationMonitor.distortedDuration);
		} else if (lastLongTask.startTime - prevEnd >= idleThreshold) {
			observer.disconnect();
			distortedDurationMonitor.cleanup();
			return onMeasureComplete(
				prevEnd,
				prevEnd - start,
				canceled,
				distortedDurationMonitor.distortedDuration,
			);
		} else if (now - lastEnd >= idleThreshold || canceled) {
			observer.disconnect();
			distortedDurationMonitor.cleanup();
			return onMeasureComplete(
				lastEnd,
				lastEnd - start,
				canceled,
				distortedDurationMonitor.distortedDuration,
			);
		}

		return setTimeout(checkIdle, idleThreshold);
	};

	setTimeout(checkIdle, idleThreshold);
}

export const TTI_SEVERITY_THRESHOLD_DEFAULTS = {
	NORMAL: 40000,
	DEGRADED: 60000,
};

export const TTI_FROM_INVOCATION_SEVERITY_THRESHOLD_DEFAULTS = {
	NORMAL: 5000,
	DEGRADED: 8000,
};

// Ignored via go/ees005
// eslint-disable-next-line @typescript-eslint/max-params
export function getTTISeverity(
	tti: number,
	ttiFromInvocation: number,
	ttiSeverityNormalThreshold?: number,
	ttiSeverityDegradedThreshold?: number,
	ttiFromInvocationSeverityNormalThreshold?: number,
	ttiFromInvocationSeverityDegradedThreshold?: number,
): { ttiSeverity: SEVERITY; ttiFromInvocationSeverity: SEVERITY } {
	const ttiNormalThreshold = ttiSeverityNormalThreshold || TTI_SEVERITY_THRESHOLD_DEFAULTS.NORMAL;
	const ttiDegradedThreshold =
		ttiSeverityDegradedThreshold || TTI_SEVERITY_THRESHOLD_DEFAULTS.DEGRADED;
	let ttiSeverity: SEVERITY;
	if (tti >= ttiNormalThreshold && tti < ttiDegradedThreshold) {
		ttiSeverity = SEVERITY.DEGRADED;
	} else if (tti >= ttiDegradedThreshold) {
		ttiSeverity = SEVERITY.BLOCKING;
	} else {
		ttiSeverity = SEVERITY.NORMAL;
	}

	const ttiFromInvocationNormalThreshold =
		ttiFromInvocationSeverityNormalThreshold ||
		TTI_FROM_INVOCATION_SEVERITY_THRESHOLD_DEFAULTS.NORMAL;
	const ttiFromInvocationDegradedThreshold =
		ttiFromInvocationSeverityDegradedThreshold ||
		TTI_FROM_INVOCATION_SEVERITY_THRESHOLD_DEFAULTS.DEGRADED;
	let ttiFromInvocationSeverity: SEVERITY;
	if (
		ttiFromInvocation >= ttiFromInvocationNormalThreshold &&
		ttiFromInvocation < ttiFromInvocationDegradedThreshold
	) {
		ttiFromInvocationSeverity = SEVERITY.DEGRADED;
	} else if (ttiFromInvocation >= ttiFromInvocationDegradedThreshold) {
		ttiFromInvocationSeverity = SEVERITY.BLOCKING;
	} else {
		ttiFromInvocationSeverity = SEVERITY.NORMAL;
	}

	return { ttiSeverity, ttiFromInvocationSeverity };
}
