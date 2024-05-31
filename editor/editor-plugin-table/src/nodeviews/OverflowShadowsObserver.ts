import rafSchedule from 'raf-schd';

import { TableCssClassName as ClassName, ShadowEvent } from '../types';

import { updateShadowListForStickyStyles } from './update-overflow-shadows';

export class OverflowShadowsObserver {
	private tableIntersectionObserver?: IntersectionObserver;
	private updateShadowState: (shadowKey: ShadowEvent, value: boolean) => void;
	private table: HTMLElement;
	private wrapper: HTMLDivElement;

	private leftShadowSentinel: HTMLElement | null = null;
	private rightShadowSentinel: HTMLElement | null = null;
	private shadowsObserved: boolean = false;

	private isSticky = false;
	private stickyRowHeight = 0;

	// updateShadowState is a method to update shadow key
	constructor(
		updateShadowState: (shadowKey: ShadowEvent, value: boolean) => void,
		table: HTMLElement,
		wrapper: HTMLDivElement,
	) {
		this.updateShadowState = updateShadowState;
		this.table = table;
		this.wrapper = wrapper;

		this.init();
	}

	private init = () => {
		const table = this.table;

		if (!this.wrapper || !table) {
			return;
		}

		if (!this.tableIntersectionObserver) {
			const intersectonOnbserverCallback = (entry: IntersectionObserverEntry) => {
				if (entry.target !== this.leftShadowSentinel && entry.target !== this.rightShadowSentinel) {
					return;
				}

				this.updateStickyShadowsHeightIfChanged();
				this.updateShadowState(
					this.leftShadowSentinel === entry.target
						? ShadowEvent.SHOW_BEFORE_SHADOW
						: ShadowEvent.SHOW_AFTER_SHADOW,
					entry.intersectionRatio !== 1,
				);
			};

			this.tableIntersectionObserver = new IntersectionObserver(
				(entries: IntersectionObserverEntry[], _: IntersectionObserver) => {
					entries.forEach((entry) => intersectonOnbserverCallback(entry));
				},
				{
					threshold: [0, 1],
					root: this.wrapper,
					rootMargin: '0px',
				},
			);
			return;
		}
	};

	private updateStickyShadowsHeightIfChanged() {
		if (!this.isSticky) {
			return;
		}
		const stickyCell = this.getStickyCell();
		if (!stickyCell) {
			return;
		}

		this.updateStickyShadows();
	}

	private getStickyCell() {
		const stickyRow = this.wrapper?.querySelector('tr.sticky');
		const stickyCell = stickyRow && stickyRow.firstElementChild;
		return stickyCell;
	}

	observeShadowSentinels = (isSticky?: boolean) => {
		if (this.isSticky === isSticky) {
			return;
		}

		this.isSticky = !!isSticky;

		// reset height
		this.stickyRowHeight = 0;
		// update sticky shadows
		this.updateStickyShadowsHeightIfChanged();

		this.leftShadowSentinel = this.table?.querySelector(`.${ClassName.TABLE_SHADOW_SENTINEL_LEFT}`);
		this.rightShadowSentinel = this.table?.querySelector(
			`.${ClassName.TABLE_SHADOW_SENTINEL_RIGHT}`,
		);

		if (
			this.tableIntersectionObserver &&
			this.leftShadowSentinel &&
			this.rightShadowSentinel &&
			!this.shadowsObserved
		) {
			this.tableIntersectionObserver.disconnect();
			this.tableIntersectionObserver.observe(this.leftShadowSentinel);
			this.tableIntersectionObserver.observe(this.rightShadowSentinel);
			this.shadowsObserved = true;
		}
	};

	/**
	 * Takes a heightStyle if it can be computed in a less expensive manner,
	 * e.g. bounds on an IntersectionObserverEntry, otherwise proceed with
	 * reading it from sticky cell
	 */
	updateStickyShadows = rafSchedule((stickyRowHeight?: number) => {
		if (!this.isSticky) {
			return;
		}
		const stickyCell = this.getStickyCell();
		if (!stickyCell || !this.wrapper?.parentElement) {
			return;
		}

		// Reflow Warning! - stickyCell.clientHeight
		const newStickyRowHeight = stickyRowHeight || stickyCell.clientHeight + 1;

		if (newStickyRowHeight !== this.stickyRowHeight) {
			this.stickyRowHeight = newStickyRowHeight;
			const heightStyleOrCompute = `${newStickyRowHeight}px`;
			// Use getElementsByClassName here for a live node list to capture
			// sticky shadows
			const liveRightShadows = this.wrapper?.parentElement?.getElementsByClassName(
				`${ClassName.TABLE_RIGHT_SHADOW}`,
			);
			const liveLeftShadows = this.wrapper?.parentElement?.getElementsByClassName(
				`${ClassName.TABLE_LEFT_SHADOW}`,
			);
			updateShadowListForStickyStyles(heightStyleOrCompute, liveLeftShadows);
			updateShadowListForStickyStyles(heightStyleOrCompute, liveRightShadows);
		}
	});

	dispose() {
		if (this.tableIntersectionObserver) {
			this.tableIntersectionObserver.disconnect();
			this.tableIntersectionObserver = undefined;
		}
	}
}
