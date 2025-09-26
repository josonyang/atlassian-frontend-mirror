import type { VCObserverEntry } from '../../types';
import VCCalculator_FY25_03 from '../fy25_03';

// NOTE: `next` to be renamed `fy26.04` once stable
const REVISION_NO = 'next';

const getConsideredEntryTypes = () => {
	return ['mutation:display-contents-children-element'];
};

const getExcludedEntryTypes = () => {
	return ['layout-shift:same-rect'];
};

// NOTE: `VCNext` to be renamed `FY26_04` once stable
export default class VCNextCalculator extends VCCalculator_FY25_03 {
	constructor() {
		super(REVISION_NO);
	}

	protected isEntryIncluded(entry: VCObserverEntry, include3p?: boolean): boolean {
		const isEntryIncludedInV3 = super.isEntryIncluded(entry, include3p);

		if (isEntryIncludedInV3 && !getExcludedEntryTypes().includes(entry.data.type)) {
			return true;
		}

		return getConsideredEntryTypes().includes(entry.data.type);
	}
}
