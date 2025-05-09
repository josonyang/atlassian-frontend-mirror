import type { RevisionPayloadVCDetails } from '../../../../common/vc/types';

import calcUsingCanvas from './canvas-heatmap';
import calcUsingOldHeatmap from './heatmap';
import calcUsingRectSweepingLine from './rect-sweeping-line';
import type { CalcTTVCPercentilesArg } from './types';

type AvailableAlgo = 'canvas_heatmap' | 'old_heatmap' | 'rect_sweeping';
async function calculateTTVCPercentiles(
	arg: CalcTTVCPercentilesArg,
): Promise<RevisionPayloadVCDetails | null> {
	const algo: AvailableAlgo = 'canvas_heatmap';

	if (algo === 'canvas_heatmap') {
		const vcDetails = await calcUsingCanvas(arg);
		return vcDetails;
	}

	if (algo === 'rect_sweeping') {
		const vcDetails = await calcUsingRectSweepingLine(arg);
		return vcDetails;
	}

	if (algo === 'old_heatmap') {
		const vcDetails = await calcUsingOldHeatmap(arg);
		return vcDetails;
	}
	throw new Error('unexpected Error algo not chosen correctly');
}

export default calculateTTVCPercentiles;
