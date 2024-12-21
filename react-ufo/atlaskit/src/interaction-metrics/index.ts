import { v4 as createUUID } from 'uuid';

import coinflip from '../coinflip';
import type {
	AbortReasonType,
	ApdexType,
	BM3Event,
	CustomData,
	CustomTiming,
	InteractionError,
	InteractionMetrics,
	InteractionType,
	LifecycleMarkType,
	LoadProfilerEventInfo,
	Mark,
	MarkType,
	PostInteractionLogOutput,
	ReactProfilerTiming,
	RequestInfo,
	SegmentInfo,
	Span,
	SpanType,
} from '../common';
import { getAwaitBM3TTIList, getCapabilityRate, getConfig } from '../config';
import { clearActiveTrace, type TraceIdContext } from '../experience-trace-id-context';
import {
	allFeatureFlagsAccessed,
	currentFeatureFlagsAccessed,
	type FeatureFlagValue,
} from '../feature-flags-accessed';
import type { LabelStack, SegmentLabel } from '../interaction-context';
import { getInteractionId } from '../interaction-id-context';
import { getVCObserver } from '../vc';

import interactions from './common/constants';
import PostInteractionLog from './post-interaction-log';

export type {
	InteractionMetrics,
	LifecycleMarkType,
	Span,
	Mark,
	MarkType,
	InteractionType,
	AbortReasonType,
	ReactProfilerTiming,
	RequestInfo,
	ApdexType,
	CustomData,
	CustomTiming,
	InteractionError,
};

const PreviousInteractionLog = {
	name: undefined as string | undefined,
	isAborted: undefined as boolean | undefined,
};

export const postInteractionLog = new PostInteractionLog();

const interactionQueue: { id: string; data: InteractionMetrics }[] = [];
const segmentCache = new Map<string, SegmentInfo>();
const CLEANUP_TIMEOUT = 60 * 1000;
const CLEANUP_TIMEOUT_AFTER_APDEX = 15 * 1000;

interface SegmentObserver {
	onAdd: (segment: SegmentInfo) => void;
	onRemove: (segment: SegmentInfo) => void;
}
const segmentObservers: SegmentObserver[] = [];

export function getActiveInteraction() {
	const interactionId = getInteractionId();
	if (!interactionId.current) {
		return;
	}
	return interactions.get(interactionId.current);
}

function isPerformanceTracingEnabled() {
	return (
		getConfig()?.enableAdditionalPerformanceMarks ||
		window.__REACT_UFO_ENABLE_PERF_TRACING ||
		process.env.NODE_ENV !== 'production'
	);
}

function labelStackToString(labelStack: LabelStack | null | undefined, name?: string) {
	const stack = [...(labelStack ?? [])];
	if (name) {
		stack.push({ name });
	}
	return stack.map((l) => l.name)?.join('/');
}
function labelStackToIdString(labelStack: LabelStack | null | undefined) {
	return labelStack
		?.map((l) => ('segmentId' in l ? `${l.name}:${l.segmentId}` : `${l.name}`))
		?.join('/');
}
function addSegmentObserver(observer: SegmentObserver) {
	segmentObservers.push(observer);

	for (const segmentInfo of segmentCache.values()) {
		observer.onAdd(segmentInfo);
	}
}
function removeSegmentObserver(observer: SegmentObserver) {
	const index = segmentObservers.findIndex((obs) => obs === observer);

	if (index !== -1) {
		segmentObservers.splice(index, 1);
	}
}

export function remove(interactionId: string) {
	interactions.delete(interactionId);
}

export function updatePageLoadInteractionName(
	ufoName: string,
	routeName: string | null | undefined = ufoName,
) {
	const interaction = getActiveInteraction();
	if (!interaction || (interaction.type !== 'page_load' && interaction.type !== 'transition')) {
		return;
	}
	interaction.ufoName = ufoName;
	interaction.routeName = routeName;
}

export function addMetadata(interactionId: string, data: Record<string, unknown>) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		Object.keys(data).forEach((key) => {
			interaction.metaData[key] = data[key];
		});
	}
}

export function addCustomData(interactionId: string, labelStack: LabelStack, data: CustomData) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		Object.keys(data).forEach((i) => {
			interaction.customData.push({ labelStack, data: { [i]: data[i] } });
		});
	}
}

export function addCustomTiming(interactionId: string, labelStack: LabelStack, data: CustomTiming) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		interaction.customTimings.push({ labelStack, data });
		if (isPerformanceTracingEnabled()) {
			for (const [key, timingData] of Object.entries(data)) {
				const { startTime, endTime } = timingData;
				try {
					// for Firefox 102 and older
					performance.measure(`🛸 ${labelStackToString(labelStack, key)} [custom_timing]`, {
						start: startTime,
						end: endTime,
					});
				} catch (e) {
					// do nothing
				}
			}
		}
	}
}

export function addMark(
	interactionId: string,
	type: MarkType,
	name: string,
	labelStack: LabelStack | null,
	time: number = performance.now(),
) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		interaction.marks.push({ type, name, labelStack, time });
	}
	if (isPerformanceTracingEnabled()) {
		performance.mark(`🛸 ${labelStackToString(labelStack, name)} [${type}]`, {
			startTime: time,
		});
	}
}

export function addMarkToAll(
	type: MarkType,
	name: string,
	labelStack: LabelStack | null,
	time: number = performance.now(),
) {
	interactions.forEach((interaction) => {
		interaction.marks.push({ type, name, labelStack, time });
	});
	if (isPerformanceTracingEnabled()) {
		performance.mark(`🛸 ${labelStackToString(labelStack, name)} [${type}]`, {
			startTime: time,
		});
	}
}

export function addSpan(
	interactionId: string,
	type: SpanType,
	name: string,
	labelStack: LabelStack | null,
	start: number,
	end: number = performance.now(),
	size?: number,
) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		interaction.spans.push({ type, name, labelStack, start, end, size });
		if (isPerformanceTracingEnabled()) {
			try {
				// for Firefox 102 and older
				performance.measure(`🛸 ${labelStackToString(labelStack, name)} [${type}]`, {
					start,
					end,
				});
			} catch (e) {
				// do nothing
			}
		}
	}
}

export function addSpanToAll(
	type: SpanType,
	name: string,
	labelStack: LabelStack | null,
	start: number,
	end: number = performance.now(),
	size = 0,
) {
	interactions.forEach((interaction) => {
		interaction.spans.push({ type, name, labelStack, start, end, size });
	});
	if (isPerformanceTracingEnabled()) {
		try {
			// for Firefox 102 and older
			performance.measure(`🛸 ${labelStackToString(labelStack, name)} [${type}]`, {
				start,
				end,
			});
		} catch (e) {
			// do nothing
		}
	}
}

export function addPreload(moduleId: string, timestamp: number) {
	addMarkToAll('bundle_preload', moduleId, null, timestamp);
}
export function addLoad(identifier: string, start: number, end: number) {
	addSpanToAll('bundle_load', identifier, null, start, end - start);
}

const moduleLoadingRequests: Record<
	string,
	{
		start: number;
		timeoutId: ReturnType<typeof setTimeout> | number | undefined;
	}
> = {};

export function extractModuleName(input: string): string {
	let result = input ?? '';

	result = result.replace(/^\.\/src\/packages\//, '');
	result = result.replace(/^\.\/node_modules\//, '');
	result = result.replace(/(\/src)?\/(index|main)\.(tsx|ts|js|jsx)$/, '');

	return result;
}

function addHoldCriterion(id: string, labelStack: LabelStack, name: string, startTime: number) {
	if (!window.__CRITERION__?.addUFOHold) {
		return;
	}
	window.__CRITERION__.addUFOHold(id, labelStackToString(labelStack), name, startTime);
}

function removeHoldCriterion(id: string) {
	if (!window.__CRITERION__?.removeUFOHold) {
		return;
	}
	window.__CRITERION__.removeUFOHold(id);
}

export function addHold(interactionId: string, labelStack: LabelStack, name: string) {
	const interaction = interactions.get(interactionId);
	const id = createUUID();
	if (interaction != null) {
		const start = performance.now();
		interaction.holdActive.set(id, { labelStack, name, start });
		addHoldCriterion(id, labelStack, name, start);
		return () => {
			const end = performance.now();
			if (isPerformanceTracingEnabled()) {
				try {
					// for Firefox 102 and older
					performance.measure(`🛸 ${labelStackToString(labelStack, name)} [hold]`, {
						start,
						end,
					});
				} catch (e) {
					// do nothing
				}
			}
			removeHoldCriterion(id);
			const currentInteraction = interactions.get(interactionId);
			const currentHold = interaction.holdActive.get(id);
			if (currentInteraction != null && currentHold != null) {
				currentInteraction.holdInfo.push({ ...currentHold, end });
				interaction.holdActive.delete(id);
			}
		};
	}
	return () => {};
}

export function addHoldByID(
	interactionId: string,
	labelStack: LabelStack,
	name: string,
	id: string,
	ignoreOnSubmit?: boolean,
) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		const start = performance.now();
		interaction.holdActive.set(id, { labelStack, name, start, ignoreOnSubmit });
		addHoldCriterion(id, labelStack, name, start);
	}
	return () => {};
}

export function removeHoldByID(interactionId: string, id: string) {
	const interaction = interactions.get(interactionId);

	if (interaction != null) {
		const end = performance.now();
		const currentInteraction = interactions.get(interactionId);
		const currentHold = interaction.holdActive.get(id);
		if (currentInteraction != null && currentHold != null) {
			currentInteraction.holdInfo.push({ ...currentHold, end });
			interaction.holdActive.delete(id);
			removeHoldCriterion(id);
		}
	}
}

export function getCurrentInteractionType(interactionId: string) {
	const interaction = interactions.get(interactionId);
	if (interaction) {
		return interaction.type;
	}
	return null;
}

export const ModuleLoadingProfiler = {
	onPreload(moduleId: string, _priority?: number) {
		addPreload(extractModuleName(moduleId), performance.now());
	},
	onLoadStart(info: LoadProfilerEventInfo): void {
		const timeoutId = setTimeout(() => {
			delete moduleLoadingRequests[info.identifier];
		}, 30000);
		const request = {
			start: performance.now(),
			timeoutId,
		};
		moduleLoadingRequests[info.identifier] = request;
	},
	onLoadComplete(info: LoadProfilerEventInfo): void {
		const request = moduleLoadingRequests[info.identifier];
		if (request) {
			clearTimeout(request.timeoutId);
			delete moduleLoadingRequests[info.identifier];
			addLoad(extractModuleName(info.identifier), request.start, performance.now());
		}
	},
	placeholderFallBackMounted(id: string, moduleId: string): void {
		const interactionId = getInteractionId();
		const currentInteractionId = interactionId.current;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addHoldByID(currentInteractionId!, [], moduleId, id);
	},
	placeholderFallBackUnmounted(id: string): void {
		const interactionId = getInteractionId();
		const currentInteractionId = interactionId.current;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		removeHoldByID(currentInteractionId!, id);
	},
};

export function addError(
	interactionId: string,
	name: string,
	labelStack: LabelStack | null,
	errorType: string,
	errorMessage: string,
	errorStack?: string,
	forcedError?: boolean,
) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		interaction.errors.push({
			name,
			labelStack,
			errorType,
			errorMessage,
			errorStack,
			forcedError,
		});
	}
}

export function addErrorToAll(
	name: string,
	labelStack: LabelStack | null,
	errorType: string,
	errorMessage: string,
	errorStack?: string,
) {
	interactions.forEach((interaction) => {
		interaction.errors.push({
			name,
			labelStack,
			errorType,
			errorMessage,
			errorStack,
		});
	});
}

export const addProfilerTimings = (
	interactionId: string,
	labelStack: LabelStack,
	type: 'mount' | 'update' | 'nested-update',
	actualDuration: number,
	baseDuration: number,
	startTime: number,
	commitTime: number,
) => {
	if (isPerformanceTracingEnabled()) {
		try {
			// for Firefox 102 and older
			performance.measure(`🛸 ${labelStackToString(labelStack)} [react-profiler] ${type}`, {
				start: startTime,
				duration: actualDuration,
			});
		} catch (e) {
			// do nothing
		}
	}
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		interaction.reactProfilerTimings.push({
			labelStack,
			type,
			actualDuration,
			baseDuration,
			startTime,
			commitTime,
		});
	} else if (getConfig()?.postInteractionLog?.enabled) {
		postInteractionLog.addProfilerTimings(
			labelStack,
			type,
			actualDuration,
			baseDuration,
			startTime,
			commitTime,
		);
	}
};

const pushToQueue = (id: string, data: InteractionMetrics) => {
	interactionQueue.push({ id, data });
};

let handleInteraction = pushToQueue;

function callCleanUpCallbacks(interaction: InteractionMetrics) {
	interaction.cleanupCallbacks.reverse().forEach((cleanUpCallback) => {
		cleanUpCallback();
	});
}

const finishInteraction = (
	id: string,
	data: InteractionMetrics,
	endTime: number = performance.now(),
) => {
	// eslint-disable-next-line no-param-reassign
	data.end = endTime;
	try {
		// for Firefox 102 and older
		performance.measure(`🛸 [${data.type}] ${data.ufoName} [ttai]`, {
			start: data.start,
			end: data.end,
		});
	} catch (e) {
		// do nothing
	}
	if (data.featureFlags) {
		// eslint-disable-next-line no-param-reassign
		data.featureFlags.during = Object.fromEntries(currentFeatureFlagsAccessed);
	}
	clearActiveTrace();
	callCleanUpCallbacks(data);
	if (getConfig()?.vc?.stopVCAtInteractionFinish) {
		data.vc = getVCObserver().getVCRawData();
	}
	remove(id);
	PreviousInteractionLog.name = data.ufoName || 'unknown';
	PreviousInteractionLog.isAborted = data.abortReason != null;
	if (data.ufoName) {
		handleInteraction(id, data);
	}

	if (isPerformanceTracingEnabled()) {
		const profilerTimingMap = new Map<
			string,
			{ labelStack: LabelStack; start?: number; end?: number }
		>();
		data.reactProfilerTimings.forEach((profilerTiming) => {
			const labelStackId = labelStackToIdString(profilerTiming.labelStack);
			if (labelStackId) {
				const timing = profilerTimingMap.get(labelStackId) ?? {
					labelStack: profilerTiming.labelStack,
				};
				timing.start =
					profilerTiming.startTime < (timing.start ?? Number.MAX_SAFE_INTEGER)
						? profilerTiming.startTime
						: timing.start;
				timing.end =
					profilerTiming.commitTime > (timing.end ?? Number.MIN_SAFE_INTEGER)
						? profilerTiming.commitTime
						: timing.end;
				profilerTimingMap.set(labelStackId, timing);
			}
		});
		try {
			// for Firefox 102 and older
			for (const [, { labelStack, start, end }] of profilerTimingMap.entries()) {
				performance.measure(`🛸 ${labelStackToString(labelStack)} [segment_ttai]`, {
					start,
					end,
				});
			}
		} catch (e) {
			// do nothing
		}
	}

	try {
		// dispatch a global window event to notify the measure is completed
		window.dispatchEvent(
			new CustomEvent<InteractionMetrics>('UFO_FINISH_INTERACTION', { detail: data }),
		);
	} catch (error) {
		// do nothing
	}
};

export const sinkInteractionHandler = (sinkFn: (id: string, data: InteractionMetrics) => void) => {
	if (handleInteraction === pushToQueue) {
		handleInteraction = sinkFn;
		interactionQueue.forEach((interaction) => {
			sinkFn(interaction.id, interaction.data);
		});
		interactionQueue.length = 0;
	}
};

export const sinkPostInteractionLogHandler = (
	sinkFn: (output: PostInteractionLogOutput) => void | Promise<void>,
) => {
	postInteractionLog.sinkHandler(sinkFn);
};

export function tryComplete(interactionId: string, endTime?: number) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		const noMoreHolds = interaction.holdActive.size === 0;
		if (noMoreHolds) {
			finishInteraction(interactionId, interaction, endTime);

			if (getConfig()?.postInteractionLog?.enabled) {
				postInteractionLog.onInteractionComplete(interaction);
			}
		}
	}
}

function callCancelCallbacks(interaction: InteractionMetrics) {
	interaction.cancelCallbacks.reverse().forEach((cancelCallback) => {
		cancelCallback();
	});
}

export function abort(interactionId: string, abortReason: AbortReasonType) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		callCancelCallbacks(interaction);
		interaction.abortReason = abortReason;
		finishInteraction(interactionId, interaction);
	}
}

export function abortByNewInteraction(interactionId: string, interactionName: string) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		callCancelCallbacks(interaction);
		interaction.abortReason = 'new_interaction';
		interaction.abortedByInteractionName = interactionName;
		finishInteraction(interactionId, interaction);
	}
}

export function abortAll(abortReason: AbortReasonType, abortedByInteractionName?: string) {
	interactions.forEach((interaction, interactionId) => {
		const noMoreHolds = interaction.holdActive.size === 0;
		if (!noMoreHolds) {
			callCancelCallbacks(interaction);
			// eslint-disable-next-line no-param-reassign
			interaction.abortReason = abortReason;
			if (abortedByInteractionName != null) {
				// eslint-disable-next-line no-param-reassign
				interaction.abortedByInteractionName = abortedByInteractionName;
			}
		}

		finishInteraction(interactionId, interaction);
	});
}

export function addOnCancelCallback(id: string, cancelCallback: () => void) {
	const interaction = interactions.get(id);

	interaction?.cancelCallbacks.push(cancelCallback);
}

export function addNewInteraction(
	interactionId: string,
	ufoName: string,
	type: InteractionType,
	startTime: number,
	rate: number,
	labelStack: LabelStack | null,
	routeName?: string | null,
	trace: TraceIdContext | null = null,
) {
	if (getConfig()?.postInteractionLog?.enabled) {
		postInteractionLog.reset();
	}

	let previousTime = startTime;
	let timeoutTime = CLEANUP_TIMEOUT;
	const timerID: ReturnType<typeof setTimeout> | undefined = setTimeout(() => {
		abort(interactionId, 'timeout');
	}, CLEANUP_TIMEOUT);

	function changeTimeout(this: InteractionMetrics, newTime: number) {
		// we compare if the time left is lower than the new time to no
		// extend the timeout beyond the initial waiting time
		const currentTime = performance.now();
		const timeLeft = timeoutTime - (currentTime - previousTime);
		if (timeLeft < newTime) {
			return;
		}
		clearTimeout(this.timerID);
		const newTimerID: ReturnType<typeof setTimeout> | undefined = setTimeout(() => {
			abort(interactionId, 'timeout');
		}, newTime);
		timeoutTime = newTime;
		previousTime = currentTime;
		this.timerID = newTimerID;
	}

	const addFeatureFlagsToInteraction = coinflip(getCapabilityRate('feature_flag_access'));

	const metrics: InteractionMetrics = {
		id: interactionId,
		start: startTime,
		end: 0,
		ufoName,
		type,
		previousInteractionName: PreviousInteractionLog.name,
		isPreviousInteractionAborted: PreviousInteractionLog.isAborted === true,
		marks: [],
		customData: [],
		customTimings: [],
		spans: [],
		requestInfo: [],
		reactProfilerTimings: [],
		holdInfo: [],
		holdActive: new Map(),
		// measure when we execute this code
		// from this we can measure the input delay -
		// how long the browser took to hand execution back to JS)
		measureStart: performance.now(),
		rate,
		cancelCallbacks: [],
		metaData: {},
		errors: [],
		apdex: [],
		labelStack,
		routeName: routeName ?? ufoName,
		featureFlags: addFeatureFlagsToInteraction
			? {
					prior: Object.fromEntries(allFeatureFlagsAccessed),
					during: {},
				}
			: undefined,
		knownSegments: [],
		cleanupCallbacks: [],
		awaitReactProfilerCount: 0,
		redirects: [],
		timerID,
		changeTimeout,
		trace,
	};
	if (addFeatureFlagsToInteraction) {
		currentFeatureFlagsAccessed.clear();
	}
	interactions.set(interactionId, metrics);

	const segmentObserver: SegmentObserver = {
		onAdd(segment) {
			metrics.knownSegments.push(segment);
		},
		onRemove() {},
	};
	addSegmentObserver(segmentObserver);
	metrics.cleanupCallbacks.push(() => {
		removeSegmentObserver(segmentObserver);
	});
	metrics.cleanupCallbacks.push(() => {
		clearTimeout(metrics.timerID);
	});
	const awaitBM3TTIList = getAwaitBM3TTIList();
	if (awaitBM3TTIList.includes(ufoName)) {
		addHoldByID(interactionId, [], ufoName, ufoName, true);
	}
	if (type === 'transition') {
		getVCObserver().start({ startTime });
		postInteractionLog.startVCObserver({ startTime });
	}
}

export function addBrowserMetricEvent(event: BM3Event) {
	const interaction = getActiveInteraction();
	if (interaction) {
		interaction.legacyMetrics = interaction.legacyMetrics || [];
		interaction.legacyMetrics.push(event);

		if (
			(interaction.type === 'page_load' || interaction.type === 'transition') &&
			event.config?.type === 'PAGE_LOAD'
		) {
			interaction.changeTimeout(CLEANUP_TIMEOUT_AFTER_APDEX);
			removeHoldByID(interaction.id, interaction.ufoName);
		}
	}
}

export function addApdexToAll(apdex: ApdexType) {
	interactions.forEach((interaction, key) => {
		interaction.apdex.push(apdex);
		try {
			// for Firefox 102 and older
			performance.measure(`🛸 ${apdex.key} [bm3_tti]`, {
				start: apdex.startTime ?? interaction.start,
				end: apdex.stopTime,
			});
		} catch (e) {
			// do nothing
		}
		if (interaction.type === 'page_load' || interaction.type === 'transition') {
			interaction.changeTimeout(CLEANUP_TIMEOUT_AFTER_APDEX);
			removeHoldByID(key, interaction.ufoName);
		}
	});
}

export function addApdex(
	interactionId: string,
	apdexInfo: {
		key: string;
		stopTime: number;
		startTime?: number;
		labelStack?: LabelStack;
	},
) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		interaction.apdex.push(apdexInfo);
		try {
			// for Firefox 102 and older
			performance.measure(`🛸 ${apdexInfo.key} [bm3_tti]`, {
				start: apdexInfo.startTime ?? interaction.start,
				end: apdexInfo.stopTime,
			});
		} catch (e) {
			// do nothing
		}
		if (interaction.type === 'page_load' || interaction.type === 'transition') {
			interaction.changeTimeout(CLEANUP_TIMEOUT_AFTER_APDEX);
			removeHoldByID(interactionId, interaction.ufoName);
		}
	}
}

export function addRequestInfo(
	interactionId: string,
	labelStack: LabelStack,
	requestInfo: RequestInfo,
) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		interaction.requestInfo.push({
			labelStack,
			...requestInfo,
		});
	}
}

function isSegmentLabel(obj: any): obj is SegmentLabel {
	return obj && typeof obj.name === 'string' && typeof obj.segmentId === 'string';
}

function getSegmentCacheKey(labelStack: LabelStack) {
	return labelStack
		.map((l) => {
			if (isSegmentLabel(l)) {
				return `${l.name}_${l.segmentId}`;
			}
			return l.name;
		})
		.join('|');
}

export function addSegment(labelStack: LabelStack) {
	const key = getSegmentCacheKey(labelStack);
	const existingSegment = segmentCache.get(key);
	if (!existingSegment) {
		const segmentInfo: SegmentInfo = { labelStack };
		segmentCache.set(key, segmentInfo);
		segmentObservers.forEach((observer) => {
			observer.onAdd(segmentInfo);
		});
	}
}

export function removeSegment(labelStack: LabelStack) {
	const key = getSegmentCacheKey(labelStack);
	const segmentInfo = segmentCache.get(key);

	if (segmentInfo) {
		segmentCache.delete(JSON.stringify(labelStack));

		segmentObservers.forEach((observer) => {
			observer.onRemove(segmentInfo);
		});
	}
}

export function addRedirect(
	interactionId: string,
	fromUfoName: string,
	nextUfoName: string,
	nextRouteName: string,
	time: number,
) {
	const interaction = interactions.get(interactionId);
	if (interaction != null) {
		interaction.ufoName = nextUfoName;
		interaction.routeName = nextRouteName;
		interaction.redirects.push({ fromInteractionName: fromUfoName, time });

		if (isPerformanceTracingEnabled()) {
			const prevRedirect = interaction.redirects.at(-2);
			try {
				// for Firefox 102 and older
				performance.measure(`🛸 ${nextUfoName} [redirect]`, {
					start: prevRedirect?.time ?? interaction.start,
					end: time,
				});
			} catch (e) {
				// do nothing
			}
		}
	}
}
declare global {
	interface Window {
		__REACT_UFO_ENABLE_PERF_TRACING?: boolean;
		__UFO_COMPACT_PAYLOAD__?: boolean;
		__CRITERION__?: {
			addFeatureFlagAccessed?: (flagName: string, flagValue: FeatureFlagValue) => void;
			addUFOHold?: (id: string, name: string, labelStack: string, startTime: number) => void;
			removeUFOHold?: (id: string) => void;
			getFeatureFlagOverride?: (flagName: string) => boolean | undefined;
			getExperimentValueOverride?: <T>(experimentName: string, parameterName: string) => T;
		};
	}
}

export const interactionSpans: Span[] = [];

const defaultLabelStack = [{ name: 'custom' }];

export function addCustomSpans(
	name: string,
	start: number,
	end: number = performance.now(),
	size = 0,
	labelStack: LabelStack = defaultLabelStack,
) {
	const customSpan: Span = {
		type: 'custom',
		name,
		start,
		end,
		labelStack,
		size,
	};

	interactionSpans.push(customSpan);
}
