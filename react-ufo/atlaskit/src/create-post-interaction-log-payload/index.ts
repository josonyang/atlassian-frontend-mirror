import coinflip from '../coinflip';
import { type PostInteractionLogOutput, type ReactProfilerTiming } from '../common';
import type { LateMutation } from '../common/react-ufo-payload-schema';
import { type RevisionPayload } from '../common/vc/types';
import {
	DEFAULT_TTVC_REVISION,
	getConfig,
	getMostRecentVCRevision,
	getPostInteractionRate,
} from '../config';
import { isSegmentLabel, sanitizeUfoName } from '../create-payload/common/utils';
import { getReactUFOPayloadVersion } from '../create-payload/utils/get-react-ufo-payload-version';
import { getPageVisibilityState } from '../hidden-timing';
import { type LabelStack } from '../interaction-context';

import getLateMutations from './get-late-mutations';

function getParentStack(labelStack: LabelStack | null | undefined) {
	if (!labelStack || labelStack.length <= 1) {
		return null;
	}
	return labelStack.slice(0, labelStack.length - 1);
}

function getSegmentId(labelStack: LabelStack | null | undefined) {
	if (!labelStack) {
		return null;
	}
	const leafLabelStack = labelStack[labelStack.length - 1];
	if (isSegmentLabel(leafLabelStack)) {
		return leafLabelStack.segmentId;
	}
	const parentStack = getParentStack(labelStack);
	if (!parentStack) {
		return null;
	}
	return getSegmentId(parentStack);
}

function getParentSegmentId(labelStack: LabelStack) {
	return getSegmentId(getParentStack(labelStack));
}

/**
 * Whenever a render happen, all parent segment have timing reported
 * This method tries to reduce that noise
 */
function removeCascadingParentTimingReport(reactProfilerTimings: ReactProfilerTiming[]) {
	const timingIndex = new Map<string, ReactProfilerTiming[]>();
	reactProfilerTimings.forEach((timing) => {
		const segmentId = getSegmentId(timing.labelStack);
		if (segmentId) {
			const timingArray = timingIndex.get(segmentId) ?? [];
			timingIndex.set(segmentId, timingArray);
			timingArray.push(timing);
		}
	});

	reactProfilerTimings.forEach((timing) => {
		const parentSegmentId = getParentSegmentId(timing.labelStack);

		if (parentSegmentId) {
			const parentTimings = timingIndex.get(parentSegmentId);

			const filteredParentTimings = parentTimings?.filter((parentTiming) => {
				return !(
					parentTiming.startTime === timing.startTime &&
					parentTiming.actualDuration === timing.actualDuration
				);
			});
			if (filteredParentTimings) {
				timingIndex.set(parentSegmentId, filteredParentTimings);
			} else {
				timingIndex.delete(parentSegmentId);
			}
		}
	});

	return [...timingIndex.values()].flatMap((v) => v);
}

function transformReactProfilerTimings(
	reactProfilerTimings: ReactProfilerTiming[] | null | undefined,
) {
	const filtered = removeCascadingParentTimingReport(reactProfilerTimings ?? []);

	const reactProfilerTimingsMap = filtered.reduce(
		(result, { labelStack, startTime, commitTime, actualDuration, type }) => {
			if (labelStack && type !== 'nested-update') {
				const label = labelStack.map((ls) => ls.name).join('/');
				const start = Math.round(startTime);
				const end = Math.round(commitTime);

				const timing = result.get(label) || {
					labelStack: label,
					startTime: start,
					endTime: end,
					mountCount: 0,
					rerenderCount: 1,
					renderDuration: 0,
				};

				if (start < timing.startTime) {
					timing.startTime = Math.round(start);
				}
				if (end > timing.endTime) {
					timing.endTime = Math.round(end);
				}
				if (type === 'mount') {
					timing.mountCount += 1;
				}
				if (type === 'update') {
					timing.rerenderCount += 1;
				}
				timing.renderDuration += Math.round(actualDuration);

				result.set(label, timing);
			}

			return result;
		},
		new Map(),
	);

	return [...reactProfilerTimingsMap.values()];
}

function createPostInteractionLogPayload({
	lastInteractionFinish,
	reactProfilerTimings,
	lastInteractionFinishVCResult,
	postInteractionFinishVCResult,
}: PostInteractionLogOutput) {
	const config = getConfig();

	if (!config) {
		throw Error('UFO Configuration not provided');
	}

	if (!lastInteractionFinish) {
		return null;
	}

	const ufoName = sanitizeUfoName(lastInteractionFinish.ufoName);
	const rate = getPostInteractionRate(ufoName, lastInteractionFinish.type);

	if (!coinflip(rate)) {
		return null;
	}

	const pageVisibilityState = getPageVisibilityState(
		lastInteractionFinish.start,
		lastInteractionFinish.end,
	);

	if (pageVisibilityState !== 'visible') {
		return null;
	}

	// Align post-interaction-logs closer to UFO event behaviour,
	// e.g. also check for aborted or failed events

	if (lastInteractionFinish.abortReason) {
		return null;
	}

	if (lastInteractionFinish.errors.length > 0) {
		return null;
	}

	const maxEndTimeFromProfiler = reactProfilerTimings
		? Math.max(...reactProfilerTimings.map((t) => t.commitTime))
		: lastInteractionFinish.end;

	const revisedEndTime = Math.round(maxEndTimeFromProfiler);
	const revisedTtai = Math.round(maxEndTimeFromProfiler - lastInteractionFinish.start);

	const lastInteractionFinishStart = Math.round(lastInteractionFinish.start);
	const lastInteractionFinishEnd = Math.round(lastInteractionFinish.end);
	const lastInteractionFinishTTAI = Math.round(
		lastInteractionFinish.end - lastInteractionFinish.start,
	);

	const mostRecentVCRevision =
		getMostRecentVCRevision(lastInteractionFinish.ufoName) ?? DEFAULT_TTVC_REVISION;

	let lastInteractionFinishVC90: number | null = null;
	let lastInteractionFinishVCClean: boolean = false;

	const lastInteractionFinishVCRev = lastInteractionFinishVCResult?.[
		'ufo:vc:rev'
	] as RevisionPayload;
	const lastInteractionFinishRevision = lastInteractionFinishVCRev?.find(
		({ revision }) => revision === mostRecentVCRevision,
	);
	if (lastInteractionFinishRevision?.clean) {
		lastInteractionFinishVCClean = true;
		lastInteractionFinishVC90 = lastInteractionFinishRevision['metric:vc90'] ?? null;
	}

	let postInteractionFinishVCRatios: Record<string, number> | undefined = {};
	let postInteractionFinishVCClean: boolean = false;
	let revisedVC90: number | null = null;
	let lateMutations: LateMutation[] = [];

	const postInteractionFinishVCRev = postInteractionFinishVCResult?.[
		'ufo:vc:rev'
	] as RevisionPayload;
	const postInteractionFinishRevision = postInteractionFinishVCRev?.find(
		({ revision }) => revision === mostRecentVCRevision,
	);

	if (postInteractionFinishRevision?.clean) {
		postInteractionFinishVCClean = true;
		postInteractionFinishVCRatios = postInteractionFinishRevision.ratios;

		if (typeof lastInteractionFinishVC90 === 'number') {
			revisedVC90 = postInteractionFinishRevision['metric:vc90'] ?? null;
		}

		const vcDetails = postInteractionFinishRevision.vcDetails;
		if (vcDetails) {
			lateMutations = getLateMutations(
				vcDetails,
				lastInteractionFinish,
				postInteractionFinishVCRatios,
			);
		}
	}

	return {
		actionSubject: 'experience',
		action: 'measured',
		eventType: 'operational',
		source: 'measured',
		tags: ['observability'],
		attributes: {
			properties: {
				// basic
				'event:hostname': window.location?.hostname || 'unknown',
				'event:product': config.product,
				'event:schema': '1.0.0',
				'event:source': {
					name: 'react-ufo/web',
					version: getReactUFOPayloadVersion(lastInteractionFinish.type, true), // always 1.0.1 as `reactProfileTimings` has `labelStack` as an array
				},
				'event:region': config.region || 'unknown',
				'experience:key': 'custom.post-interaction-logs',
				postInteractionLog: {
					lastInteractionFinish: {
						...lastInteractionFinish,
						ufoName,
						start: lastInteractionFinishStart,
						end: lastInteractionFinishEnd,
						ttai: lastInteractionFinishTTAI,
						vc90: lastInteractionFinishVC90,
						vcClean: lastInteractionFinishVCClean,
					},
					revisedEndTime,
					revisedTtai,
					revisedVC90,
					vcClean: postInteractionFinishVCClean,
					lateMutations,
					reactProfilerTimings: transformReactProfilerTimings(reactProfilerTimings),
				},
			},
		},
	};
}

export default createPostInteractionLogPayload;
