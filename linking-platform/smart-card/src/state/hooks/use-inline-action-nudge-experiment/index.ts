import { useMemo } from 'react';

import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';

import { getIsRovoChatEnabled } from '../../../utils/rovo';
import type { CardActionOptions } from '../../../view/Card/types';
import { getExtensionKey } from '../../helpers';
import { useSmartCardState } from '../../store';
import useRovoConfig from '../use-rovo-config';

export interface InlineActionNudgeExperiment {
	/**
	 * True when the user is in the treatment cohort and should see the
	 * inline action nudge UI. All treatment surfaces should gate on this.
	 */
	isEnabled: boolean;
}

const EXCLUDED_EXTENSION_KEYS = new Set(['figma-object-provider', 'google-object-provider']);

const NOT_ENABLED_RESULT: InlineActionNudgeExperiment = {
	isEnabled: false,
};

/**
 * Returns whether the rovogrowth-640-inline-action-nudge-exp experiment
 * is enabled for the current user and link context.
 *
 * All eligibility criteria are consolidated here:
 * 1. Rovo chat must be enabled for the tenant.
 * 2. The consumer must have opted in via actionOptions.rovoChatAction.optIn.
 * 3. The link must support the RovoActions feature.
 * 4. The extension key must not be excluded (Figma and Google links are excluded).
 * 5. The experiment value must be true (via tmp-editor-statsig).
 *
 * The extension key is derived from the card store via the resolved URL,
 * so callers don't need to thread it as a prop.
 */
const useInlineActionNudgeExperiment = (
	url?: string,
	showHoverPreview?: boolean,
	actionOptions?: CardActionOptions,
): InlineActionNudgeExperiment => {
	const rovoConfig = useRovoConfig();
	const isRovoChatEnabled = getIsRovoChatEnabled(rovoConfig);
	const cardState = useSmartCardState(url ?? '');
	const supportsRovoActions =
		cardState?.details?.meta?.supportedFeature?.includes('RovoActions') ?? false;
	const extensionKey = getExtensionKey(cardState.details);
	const isRovoChatActionOptedIn = actionOptions?.rovoChatAction?.optIn ?? false;

	return useMemo(() => {
		if (
			!isRovoChatEnabled ||
			!showHoverPreview ||
			!supportsRovoActions ||
			!url ||
			!isRovoChatActionOptedIn
		) {
			return NOT_ENABLED_RESULT;
		}

		if (extensionKey && EXCLUDED_EXTENSION_KEYS.has(extensionKey)) {
			return NOT_ENABLED_RESULT;
		}

		const isEnabled = expValEquals('rovogrowth-640-inline-action-nudge-exp', 'isEnabled', true);

		return { isEnabled };
	}, [
		isRovoChatEnabled,
		extensionKey,
		showHoverPreview,
		supportsRovoActions,
		url,
		isRovoChatActionOptedIn,
	]);
};

export default useInlineActionNudgeExperiment;
