import { type UnbindFn } from 'bind-event-listener';

import type {
	ComponentsLogType,
	RevisionPayload,
	VCAbortReason,
	VCAbortReasonType,
	VCEntryType,
	VCIgnoreReason,
	VCRatioType,
	VCRawDataType,
	VCResult,
} from '../../common/vc/types';
import { isVCRevisionEnabled } from '../../config';
import { getActiveInteraction } from '../../interaction-metrics';
import type { GetVCResultType, VCObserverInterface, VCObserverOptions } from '../types';

import { attachAbortListeners } from './attachAbortListeners';
import {
	getVCRevisionDebugDetails,
	type VCRevisionDebugDetails,
} from './getVCRevisionDebugDetails';
import { getVCRevisionsData } from './getVCRevisionsData';
import { getViewportHeight, getViewportWidth } from './getViewport';
import { type ObservedMutationType, Observers } from './observers';

type PixelsToMap = { l: number; t: number; r: number; b: number };

type AbortReasonEnum = { [key: string]: VCAbortReason };

const abortReason: AbortReasonEnum = {
	scroll: 'scroll',
	keypress: 'keypress',
	resize: 'resize',
	error: 'error',
};

const UNUSED_SECTOR = 0;

function filterComponentsLog(log: ComponentsLogType) {
	return Object.fromEntries(
		Object.entries(log).map(([timestamp, entries]) => [
			Number(timestamp),
			entries.map((entry) => {
				const { __debug__element, ...rest } = entry;
				return rest;
			}),
		]),
	);
}

declare global {
	interface Window {
		__ufo_devtool_onVCRevisionReady__?: (debugInfo: VCRevisionDebugDetails) => void;
		__on_ufo_vc_debug_data_ready?: (debugInfo: VCRevisionDebugDetails) => void;
	}
}

export class VCObserver implements VCObserverInterface {
	/* abort logic */
	abortReason: VCAbortReasonType = {
		reason: null,
		info: '',
		timestamp: -1,
		blocking: false,
	};

	outOfBoundaryInfo = '';

	/** config * */
	static VCParts = ['25', '50', '75', '80', '85', '90', '95', '98', '99'] as const;

	viewport = {
		w: 0,
		h: 0,
	};

	/* heatmap */
	arraySize = 0;

	heatmap: number[][];

	heatmapNext: number[][];

	componentsLog: ComponentsLogType = {};

	vcRatios: VCRatioType = {};

	active = false;

	totalTime = 0;

	startTime = 0;

	observers: Observers;

	private _startMeasureTimestamp = -1;

	ssr = {
		reactRendered: -1,
	};

	devToolsEnabled: boolean;

	oldDomUpdatesEnabled: boolean;

	unbind: UnbindFn[] = [];

	isPostInteraction?: boolean;

	constructor(options: VCObserverOptions) {
		this.arraySize = options.heatmapSize || 200;
		this.devToolsEnabled = options.devToolsEnabled || false;
		this.oldDomUpdatesEnabled = options.oldDomUpdates || false;

		const { ssrEnablePageLayoutPlaceholder, disableSizeAndPositionCheck, ssrPlaceholderHandler } =
			options;

		this.observers = new Observers({
			selectorConfig: options.selectorConfig || {
				id: false,
				testId: false,
				role: false,
				className: true,
				dataVC: true,
			},
			SSRConfig: {
				enablePageLayoutPlaceholder: ssrEnablePageLayoutPlaceholder || false,
				disableSizeAndPositionCheck: disableSizeAndPositionCheck,
			},
			ssrPlaceholderHandler: ssrPlaceholderHandler,
		});

		this.heatmap = !isVCRevisionEnabled('fy25.01') ? [] : this.getCleanHeatmap();

		this.heatmapNext = this.getCleanHeatmap();
		this.isPostInteraction = options.isPostInteraction || false;
	}

	start({ startTime }: { startTime: number }) {
		this.active = true;
		if (this.observers.isBrowserSupported()) {
			this.setViewportSize();
			this.resetState();
			this.startTime = startTime;
			this.attachAbortListeners();
			this.observers.subscribeResults(this.handleUpdate);
			this.observers.observe();
		} else {
			this.setAbortReason('not-supported', startTime);
		}
	}

	stop() {
		this.observers.disconnect();
		this.detachAbortListeners();
	}

	getAbortReasonInfo = () => {
		if (this.abortReason.reason === null) {
			return null;
		}

		const info = this.abortReason.info !== '' ? ` ${this.abortReason.info}` : '';
		return `${this.abortReason.reason}${info}`;
	};

	getVCRawData = (): VCRawDataType | null => {
		this.measureStart();

		if (!this.active) {
			this.measureStop();
			return null;
		}
		this.stop();

		const abortReasonInfo = this.getAbortReasonInfo();
		this.measureStop();

		return {
			abortReasonInfo,
			abortReason: { ...this.abortReason },
			heatmap: this.heatmap,
			heatmapNext: this.heatmapNext,
			outOfBoundaryInfo: this.outOfBoundaryInfo,
			totalTime: Math.round(this.totalTime + this.observers.getTotalTime()),
			componentsLog: { ...this.componentsLog },
			viewport: { ...this.viewport },
			oldDomUpdatesEnabled: this.oldDomUpdatesEnabled,
			devToolsEnabled: this.devToolsEnabled,
			ratios: this.vcRatios,
		};
	};

	getIgnoredElements(componentsLog: ComponentsLogType) {
		return Object.values(componentsLog)
			.flat()
			.filter(({ ignoreReason }) => Boolean(ignoreReason))
			.map(({ targetName, ignoreReason }) => ({ targetName, ignoreReason }));
	}

	static getSSRRatio(entries: VCEntryType[], ssr?: number) {
		if (ssr === undefined || entries.length === 0) {
			return undefined;
		}

		const maybeSSR = entries[0];

		if (maybeSSR.elements[0] === 'SSR') {
			return maybeSSR.vc;
		}

		return 0;
	}

	getVCResult = async ({
		start,
		stop,
		tti,
		prefix,
		ssr,
		vc,
		isEventAborted,
		experienceKey,
		interactionId,
		includeSSRRatio,
	}: GetVCResultType): Promise<VCResult> => {
		const startTime = performance.now();
		// add local measurement
		const fullPrefix = prefix !== undefined && prefix !== '' ? `${prefix}:` : '';

		const rawData = vc !== undefined ? vc : this.getVCRawData();
		if (rawData === null) {
			return {};
		}

		const {
			abortReason,
			abortReasonInfo,
			heatmap,
			heatmapNext,
			outOfBoundaryInfo,
			totalTime,
			componentsLog,
			viewport,
			devToolsEnabled,
			ratios,
		} = rawData;

		const isTTVCv1Disabled = !isVCRevisionEnabled('fy25.01', experienceKey);

		if (abortReasonInfo !== null) {
			// exposing data to devtools
			try {
				if (devToolsEnabled && !this.isPostInteraction) {
					window.__vcNotAvailableReason = abortReasonInfo;
				}
			} catch (e) {}

			const vcAbortedResultWithRevisions = {
				[`${fullPrefix}vc:state`]: false,
				[`${fullPrefix}vc:abort:reason`]: abortReason.reason,
				[`${fullPrefix}vc:abort:timestamp`]: abortReason.timestamp,
				[`${fullPrefix}vc:rev`]: [
					{
						revision: 'fy25.02',
						clean: false,
						'metric:vc90': null,
						abortReason: abortReason.reason,
					},
				] as RevisionPayload,
			};

			if (!isTTVCv1Disabled) {
				(vcAbortedResultWithRevisions[`${fullPrefix}vc:rev`] as RevisionPayload).push({
					revision: 'fy25.01',
					clean: false,
					'metric:vc90': null,
					abortReason: abortReason.reason,
				});
			}

			return vcAbortedResultWithRevisions;
		}

		const ttvcV1Result = isTTVCv1Disabled
			? {
					VC: {},
					VCBox: {},
					VCEntries: {
						abs: [],
						rel: [],
						speedIndex: -1,
					},
					totalPainted: -1,
				}
			: VCObserver.calculateVC({
					heatmap,
					ssr,
					componentsLog: { ...componentsLog },
					viewport,
					fixSSRAttribution: includeSSRRatio,
				});

		const { VC, VCBox, VCEntries, totalPainted } = ttvcV1Result;

		const _componentsLog: ComponentsLogType = {};
		Object.entries(this.componentsLog).forEach(([_timestamp, value]) => {
			const timestamp = Number(_timestamp);
			if (stop > timestamp) {
				_componentsLog[timestamp] = value;
			}
		});

		const vcNext = VCObserver.calculateVC({
			heatmap: heatmapNext,
			ssr,
			componentsLog: _componentsLog,
			viewport,
			fixSSRAttribution: includeSSRRatio,
		});

		try {
			if (!this.isPostInteraction) {
				VCObserver.VCParts.forEach((key) => {
					if (isTTVCv1Disabled) {
						const duration = vcNext.VC[key];
						if (duration !== null && duration !== undefined) {
							performance.measure(`VC${key}`, { start, duration });
							performance.measure(`VC_Next${key}`, { start, duration });
						}
					} else {
						const ttvcV1duration = VC[key];
						if (ttvcV1duration !== null && ttvcV1duration !== undefined) {
							performance.measure(`VC${key}`, { start, duration: ttvcV1duration });
						}

						const ttvcV2duration = vcNext.VC[key];
						if (ttvcV2duration !== null && ttvcV2duration !== undefined) {
							performance.measure(`VC_Next${key}`, { start, duration: ttvcV2duration });
						}
					}
				});
			}
		} catch (e) {
			/* empty */
		}

		const outOfBoundary = outOfBoundaryInfo ? { [`${fullPrefix}vc:oob`]: outOfBoundaryInfo } : {};
		//const oldDomUpdates = oldDomUpdatesEnabled ? { [`${fullPrefix}vc:old:dom`]: vcNext.VCBox } : {};

		const stopTime = performance.now();

		// exposing data to devtools
		try {
			if (!this.isPostInteraction && devToolsEnabled) {
				const ttvcV1DevToolInfo = isTTVCv1Disabled
					? undefined
					: {
							entries: VCEntries.rel,
							log: componentsLog,
							metrics: {
								'75': VC['75'],
								'80': VC['80'],
								'85': VC['85'],
								'90': VC['90'],
								'95': VC['95'],
								'98': VC['98'],
								'99': VC['99'],
								tti,
								ttai: stop - start,
							},
							start,
							stop,
							heatmap,
							ratios,
						};

				const ttvcV2DevToolInfo = {
					entries: vcNext.VCEntries.rel,
					log: componentsLog,
					metrics: {
						'75': vcNext.VC['75'],
						'80': vcNext.VC['80'],
						'85': vcNext.VC['85'],
						'90': vcNext.VC['90'],
						'95': vcNext.VC['95'],
						'98': vcNext.VC['98'],
						'99': vcNext.VC['99'],
						tti,
						ttai: stop - start,
					},
					start,
					stop,
					heatmap: heatmapNext,
					ratios,
				};

				if (isTTVCv1Disabled) {
					window.__vc = ttvcV2DevToolInfo;
					window.__vcNext = ttvcV2DevToolInfo;
				} else {
					window.__vc = ttvcV1DevToolInfo;
					window.__vcNext = ttvcV2DevToolInfo;
				}

				// Emitting a custom event to make it available in the Chrome extension
				window.dispatchEvent(
					new CustomEvent('vcReady', {
						detail: {
							log: filterComponentsLog(componentsLog),
							entries: isTTVCv1Disabled ? vcNext.VCEntries.rel : VCEntries.rel,
						},
					}),
				);
			}
			if (!this.isPostInteraction) {
				// Only create revision debug details if callbacks exist
				const shouldCreateDebugDetails =
					typeof window.__ufo_devtool_onVCRevisionReady__ === 'function' ||
					typeof window.__on_ufo_vc_debug_data_ready === 'function';

				if (shouldCreateDebugDetails) {
					const v1RevisionDebugDetails = getVCRevisionDebugDetails({
						revision: 'fy25.01',
						isClean: !abortReasonInfo,
						abortReason: abortReason.reason,
						VCEntries: VCEntries.rel,
						componentsLog,
						interactionId,
					});

					const v2RevisionDebugDetails = getVCRevisionDebugDetails({
						revision: 'fy25.02',
						isClean: !abortReasonInfo,
						abortReason: abortReason.reason,
						VCEntries: vcNext.VCEntries.rel,
						componentsLog,
						interactionId,
					});

					// Add devtool callback for both v1 and v2
					if (typeof window.__ufo_devtool_onVCRevisionReady__ === 'function') {
						// Handle v1 if not disabled
						if (!isTTVCv1Disabled) {
							window.__ufo_devtool_onVCRevisionReady__?.(v1RevisionDebugDetails);
						}

						// Handle v2
						window.__ufo_devtool_onVCRevisionReady__?.(v2RevisionDebugDetails);
					}

					if (typeof window.__on_ufo_vc_debug_data_ready === 'function') {
						if (!isTTVCv1Disabled) {
							window.__on_ufo_vc_debug_data_ready?.(v1RevisionDebugDetails);
						}

						window.__on_ufo_vc_debug_data_ready?.(v2RevisionDebugDetails);
					}
				}
			}
		} catch (e) {
			/*  do nothing */
		}

		const isVCClean = !abortReasonInfo;

		const revisionsData = getVCRevisionsData({
			fullPrefix,
			interaction: {
				start,
				end: stop,
			},
			isVCClean,
			calculatedVC: { VC, VCBox },
			calculatedVCNext: { VC: vcNext.VC, VCBox: vcNext.VCBox },
			isEventAborted,
			experienceKey,
			ratios,
		});

		const speedIndex = {
			[`ufo:speedIndex`]: isTTVCv1Disabled ? vcNext.VCEntries.speedIndex : VCEntries.speedIndex,
			[`ufo:next:speedIndex`]: vcNext.VCEntries.speedIndex,
		};

		const SSRRatio = VCObserver.getSSRRatio(VCEntries.rel, ssr);
		const SSRRatioNext = VCObserver.getSSRRatio(vcNext.VCEntries.rel, ssr);

		const SSRRatioPayload = includeSSRRatio
			? {
					[`${fullPrefix}vc:ssrRatio`]: isTTVCv1Disabled ? SSRRatioNext : SSRRatio,
					[`${fullPrefix}vc:next:ssrRatio`]: SSRRatioNext,
				}
			: {};

		if (isTTVCv1Disabled) {
			return {
				[`${fullPrefix}vc:size`]: viewport,
				[`${fullPrefix}vc:time`]: Math.round(totalTime + (stopTime - startTime)),
				[`${fullPrefix}vc:ratios`]: ratios,
				...outOfBoundary,
				[`${fullPrefix}vc:ignored`]: this.getIgnoredElements(componentsLog),
				...SSRRatioPayload,
				[`${fullPrefix}vc:ssrRatio`]: SSRRatioNext,
				...revisionsData,
				...speedIndex,
			};
		}

		const isTTVCv3Enabled = isVCRevisionEnabled('fy25.03', experienceKey);

		return {
			'metrics:vc': VC,
			[`${fullPrefix}vc:state`]: true,
			[`${fullPrefix}vc:clean`]: isVCClean,
			[`${fullPrefix}vc:dom`]: VCBox,
			[`${fullPrefix}vc:updates`]: isTTVCv3Enabled ? undefined : VCEntries.rel.slice(0, 50), // max 50
			[`${fullPrefix}vc:size`]: viewport,
			[`${fullPrefix}vc:time`]: Math.round(totalTime + (stopTime - startTime)),
			[`${fullPrefix}vc:total`]: totalPainted,
			[`${fullPrefix}vc:ratios`]: ratios,
			[`${fullPrefix}vc:ssrRatio`]: SSRRatio,
			...outOfBoundary,
			[`${fullPrefix}vc:next`]: vcNext.VC,
			[`${fullPrefix}vc:next:updates`]: isTTVCv3Enabled
				? undefined
				: vcNext.VCEntries.rel.slice(0, 50), // max 50
			[`${fullPrefix}vc:next:dom`]: vcNext.VCBox,
			...SSRRatioPayload,
			[`${fullPrefix}vc:ignored`]: this.getIgnoredElements(componentsLog),
			...revisionsData,
			...speedIndex,
		};
	};

	static calculateVC({
		heatmap,
		ssr = UNUSED_SECTOR,
		componentsLog,
		viewport,
		fixSSRAttribution,
	}: {
		heatmap: number[][];
		ssr?: number;
		componentsLog: ComponentsLogType;
		viewport: { w: number; h: number };
		fixSSRAttribution?: boolean;
	}) {
		const lastUpdate: { [key: string]: number } = {};
		let totalPainted = 0;

		const ssrTime = fixSSRAttribution ? Math.floor(ssr) : ssr;

		if (ssrTime !== UNUSED_SECTOR) {
			const element = {
				__debug__element: new WeakRef<HTMLElement>(window.document?.body),
				intersectionRect: {
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					x: 0,
					y: 0,
					width: viewport.w,
					height: viewport.h,
					toJSON() {
						return {};
					},
				},
				targetName: 'SSR',
			};

			if (!componentsLog[ssrTime]) {
				componentsLog[ssrTime] = [];
			}
			componentsLog[ssrTime].push(element);
		}

		heatmap.forEach((line) => {
			line.forEach((entry) => {
				const rounded = Math.floor(
					entry === UNUSED_SECTOR && ssrTime !== UNUSED_SECTOR ? ssrTime : entry,
				);
				totalPainted += rounded !== UNUSED_SECTOR ? 1 : 0;
				if (rounded !== UNUSED_SECTOR) {
					lastUpdate[rounded] = lastUpdate[rounded] ? lastUpdate[rounded] + 1 : 1;
				}
			});
		});

		const entries: number[][] = Object.entries(lastUpdate)
			.map((a) => [parseInt(a[0], 10), a[1]])
			.sort((a, b) => (a[0] > b[0] ? 1 : -1));

		const VC: { [key: string]: number | null } = VCObserver.makeVCReturnObj<number>();
		const VCBox: { [key: string]: string[] | null } = VCObserver.makeVCReturnObj<string[]>();

		entries.reduce((acc = 0, v) => {
			const currRatio = v[1] / totalPainted;
			let VCRatio = currRatio + acc;

			const preciseCurrRatio = Math.round(100 * (v[1] / totalPainted));
			const preciseAccRatio = Math.round(acc * 100);
			VCRatio = (preciseCurrRatio + preciseAccRatio) / 100;

			const time = v[0];
			VCObserver.VCParts.forEach((key) => {
				const value = parseInt(key, 10);
				if ((VC[key] === null || VC[key] === undefined) && VCRatio >= value / 100) {
					VC[key] = time;
					VCBox[key] = [
						...new Set(
							componentsLog[time]?.filter((v) => !v.ignoreReason).map((v) => v.targetName),
						),
					];
				}
			});
			return VCRatio;
		}, 0);

		const VCEntries = entries.reduce(
			(
				acc: { abs: number[][]; rel: VCEntryType[]; speedIndex: number },
				[timestamp, entryPainted],
				i,
			) => {
				const currentlyPainted = entryPainted + (acc.abs[i - 1]?.[1] || 0);
				const currentlyPaintedRatio = Math.round((currentlyPainted / totalPainted) * 1000) / 10;
				const logEntry = [
					...new Set(
						componentsLog[timestamp]?.filter((v) => !v.ignoreReason).map((v) => v.targetName),
					),
				];

				const ratioDelta = (currentlyPaintedRatio - (acc.rel[i - 1]?.vc ?? 0)) / 100;

				const speedIndex = timestamp * ratioDelta;
				acc.speedIndex += speedIndex;

				acc.abs.push([timestamp, currentlyPainted]);
				acc.rel.push({
					time: timestamp,
					vc: currentlyPaintedRatio,
					elements: logEntry,
				});
				return acc;
			},
			{ abs: [], rel: [], speedIndex: 0 },
		);

		VCEntries.speedIndex = Math.round(VCEntries.speedIndex);

		return { VC, VCBox, VCEntries, totalPainted };
	}

	setSSRElement(element: HTMLElement) {
		this.observers.setReactRootElement(element);
	}

	setReactRootRenderStart(startTime = performance.now()) {
		this.observers.setReactRootRenderStart(startTime);
	}

	setReactRootRenderStop(stopTime = performance.now()) {
		this.observers.setReactRootRenderStop(stopTime);
	}

	collectSSRPlaceholders() {
		// This is handled by the shared SSRPlaceholderHandlers in VCObserverWrapper
		// Individual observers don't need to implement this
	}

	private handleUpdate = (
		rawTime: number,
		intersectionRect: DOMRectReadOnly,
		targetName: string,
		element: HTMLElement,
		type: ObservedMutationType,
		ignoreReason?: VCIgnoreReason,
		attributeName?: string | null,
		oldValue?: string | null,
		newValue?: string | null,
	) => {
		if (this.abortReason.reason === null || this.abortReason.blocking === false) {
			const time = Math.round(rawTime - this.startTime);
			const mappedValues = this.mapPixelsToHeatmap(
				intersectionRect.left,
				intersectionRect.top,
				intersectionRect.width,
				intersectionRect.height,
			);
			this.vcRatios[targetName] = this.getElementRatio(mappedValues);

			if (!ignoreReason) {
				this.applyChangesToHeatMap(mappedValues, time, this.heatmapNext);
			}

			const interaction = getActiveInteraction();
			const isTTVCv1Disabled = !isVCRevisionEnabled('fy25.01', interaction?.ufoName);

			if (
				!isTTVCv1Disabled &&
				(!ignoreReason || ignoreReason === 'not-visible') &&
				type !== 'attr'
			) {
				this.applyChangesToHeatMap(mappedValues, time, this.heatmap);
			}

			if (!this.componentsLog[time]) {
				this.componentsLog[time] = [];
			}

			this.componentsLog[time].push({
				__debug__element: this.devToolsEnabled ? new WeakRef<HTMLElement>(element) : null,
				type,
				intersectionRect,
				targetName,
				ignoreReason,
				attributeName,
				oldValue,
				newValue,
			});
		}
	};

	private setAbortReason(abort: VCAbortReason, timestamp: number, info = '') {
		if (this.abortReason.reason === null || this.abortReason.blocking === false) {
			this.abortReason.reason = abort;
			this.abortReason.info = info;
			this.abortReason.timestamp = timestamp;
			this.abortReason.blocking = abort !== abortReason.scroll;
			if (this.abortReason.blocking) {
				this.detachAbortListeners();
			}
		}
	}

	private resetState() {
		this.abortReason = {
			reason: null,
			info: '',
			timestamp: -1,
			blocking: false,
		};
		this.detachAbortListeners();
		this.heatmap = !isVCRevisionEnabled('fy25.01') ? [] : this.getCleanHeatmap();
		this.heatmapNext = this.getCleanHeatmap();
		this.totalTime = 0;
		this.componentsLog = {};
		this.vcRatios = {};
	}

	private getCleanHeatmap() {
		return Array(this.arraySize)
			.fill('')
			.map(() => Array(this.arraySize).fill(UNUSED_SECTOR));
	}

	private setViewportSize() {
		this.viewport.w = getViewportWidth();
		this.viewport.h = getViewportHeight();
	}

	private mapPixelsToHeatmap = (
		left: number,
		top: number,
		width: number,
		height: number,
	): PixelsToMap => {
		const { w, h } = this.viewport;

		const l = Math.floor((left / w) * this.arraySize);
		const t = Math.floor((top / h) * this.arraySize);
		const r = Math.ceil(((left + width) / w) * this.arraySize);
		const b = Math.ceil(((top + height) / h) * this.arraySize);

		// that info is temporary to get info why it goes over boundary
		if (this.outOfBoundaryInfo === '') {
			let outOfBoundaryInfo = '';

			if (r > this.arraySize) {
				outOfBoundaryInfo += ` r ${r} ! ${left} ${width}`;
			}

			if (b > this.arraySize) {
				outOfBoundaryInfo += ` r ${r} ! ${top} ${height}`;
			}

			this.outOfBoundaryInfo = outOfBoundaryInfo;
		}

		// correct values to min - 0, max - arraySize
		const result = {
			l: Math.max(0, l),
			t: Math.max(0, t),
			r: Math.min(this.arraySize, r),
			b: Math.min(this.arraySize, b),
		};

		return result;
	};

	private getElementRatio = (mappedValues: PixelsToMap): number => {
		const { r, l, b, t } = mappedValues;
		return ((r - l) * (b - t)) / (this.arraySize * this.arraySize);
	};

	private applyChangesToHeatMap(a: PixelsToMap, time: number, heatmap: number[][]) {
		const { l, t, r, b } = a;
		const localHeatmap = heatmap;
		for (let row = t; row < b; row++) {
			for (let col = l; col < r; col++) {
				if (localHeatmap[row] === undefined) {
					try {
						this.setAbortReason(abortReason.error, time, `index - ${row}`);
					} catch (e) {
						this.setAbortReason(abortReason.error, time, 'row error');
					}
					return;
				} else {
					localHeatmap[row][col] = time;
				}
			}
		}
	}

	static makeVCReturnObj<T>() {
		const vc: { [key: string]: null | T } = {};
		VCObserver.VCParts.forEach((v) => {
			vc[v] = null;
		});
		return vc;
	}

	private abortReasonCallback = (key: string, time: number) => {
		switch (key) {
			case 'wheel':
				this.setAbortReason(abortReason.scroll, time);
				break;
			case 'keydown':
				this.setAbortReason(abortReason.keypress, time);
				break;
			case 'resize':
				this.setAbortReason(abortReason.resize, time);
				break;
		}
	};

	private attachAbortListeners = () => {
		this.detachAbortListeners();
		let unbinds = attachAbortListeners(window, this.viewport, this.abortReasonCallback);
		if (window?.__SSR_ABORT_LISTENERS__) {
			Object.entries(window.__SSR_ABORT_LISTENERS__.aborts).forEach(([key, time]) => {
				if (time) {
					this.abortReasonCallback(key, time);
				}
			});
		}
		this.unbind = unbinds;
	};

	private detachAbortListeners() {
		if (this.unbind) {
			const { unbind } = this;
			for (let i = 0; i < unbind.length; i++) {
				unbind[i]();
			}
			this.unbind.length = 0;
		}
	}

	private measureStart() {
		this._startMeasureTimestamp = performance.now();
	}

	private measureStop() {
		if (this._startMeasureTimestamp === -1) {
			return;
		}
		this.totalTime += performance.now() - this._startMeasureTimestamp;
		this._startMeasureTimestamp = -1;
	}
}
