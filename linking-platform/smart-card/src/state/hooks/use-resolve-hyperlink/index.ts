import { useEffect, useState } from 'react';

import uuid from 'uuid';

import { useAnalyticsEvents } from '../../../common/analytics/generated/use-analytics-events';
import * as measure from '../../../utils/performance';
import { useSmartCardActions } from '../../actions';
import { getDefinitionId, getExtensionKey, getResourceType } from '../../helpers';
import { useSmartCardState } from '../../store';

import { useScheduledRegister } from './useScheduledRegister';

const useResolveHyperlink = ({ href }: { href: string }) => {
	const [id] = useState(() => uuid() satisfies string);
	const state = useSmartCardState(href);
	const definitionId = getDefinitionId(state.details);
	const extensionKey = getExtensionKey(state.details);
	const resourceType = getResourceType(state.details);

	const actions = useSmartCardActions(id, href);
	const scheduledRegister = useScheduledRegister(href, actions.register);

	const { fireEvent } = useAnalyticsEvents();

	useEffect(() => {
		scheduledRegister().catch((error) => {
			throw error;
		});
	}, [scheduledRegister]);

	useEffect(() => {
		measure.mark(id, state.status);
		if (state.status !== 'pending' && state.status !== 'resolving') {
			measure.create(id, state.status);

			if (state.status === 'resolved') {
				fireEvent('operational.hyperlink.resolved', {
					definitionId: definitionId ?? null,
					extensionKey: extensionKey ?? null,
					resourceType: resourceType ?? null,
					duration: measure.getMeasure(id, state.status)?.duration ?? null,
				});
			} else if (
				state.error?.type !== 'ResolveUnsupportedError' &&
				state.error?.type !== 'UnsupportedError'
			) {
				fireEvent('operational.hyperlink.unresolved', {
					definitionId: definitionId ?? null,
					extensionKey: extensionKey ?? null,
					resourceType: resourceType ?? null,
					reason: state.status,
					error:
						state.error === undefined
							? null
							: {
									name: state.error.name,
									kind: state.error.kind,
									type: state.error.type,
								},
				});
			}
		}
	}, [id, state.status, state.error, definitionId, extensionKey, resourceType, fireEvent]);

	return { state, actions };
};

export default useResolveHyperlink;
