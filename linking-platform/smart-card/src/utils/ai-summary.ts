import { getBooleanFF } from '@atlaskit/platform-feature-flags';
import type { JsonLd } from 'json-ld-types';
import type { MessageDescriptor } from 'react-intl-next';
import { CONTENT_URL_ACCEPTABLE_USE_POLICY, CONTENT_URL_AI_TROUBLESHOOTING } from '../constants';
import { messages } from '../messages';
import type { ErrorMessage } from '../state/hooks/use-ai-summary/ai-summary-service/types';

export const getIsAISummaryEnabled = (
	isAdminHubAIEnabled: boolean = false,
	response?: JsonLd.Response,
) =>
	Boolean(
		getBooleanFF('platform.linking-platform.smart-card.hover-card-ai-summaries') &&
			isAdminHubAIEnabled &&
			response?.meta?.supportedFeature?.includes('AISummary'),
	);

export const getAISummaryErrorMessage = (
	error?: ErrorMessage,
): { message: MessageDescriptor; url?: string } => {
	switch (error) {
		case 'ACCEPTABLE_USE_VIOLATIONS':
			return {
				message: messages.ai_summary_error_acceptable_use_violation,
				url: CONTENT_URL_ACCEPTABLE_USE_POLICY,
			};
		case 'HIPAA_CONTENT_DETECTED':
			return {
				message: messages.ai_summary_error_hipaa_content_detected,
			};
		case 'EXCEEDING_CONTEXT_LENGTH_ERROR':
			return {
				message: messages.ai_summary_error_exceeding_context_length_error,
			};
		default:
			return {
				message: messages.ai_summary_error_generic,
				url: CONTENT_URL_AI_TROUBLESHOOTING,
			};
	}
};
