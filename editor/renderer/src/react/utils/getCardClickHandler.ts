import type { EventHandlers } from '@atlaskit/editor-common/ui';

import { getEventHandler } from '../../utils';

export const getCardClickHandler = (
	eventHandlers?: EventHandlers,
	url?: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): ((e: React.MouseEvent<HTMLElement>) => any) | undefined => {
	const handler = getEventHandler(eventHandlers, 'smartCard');

	return handler ? (e: React.MouseEvent<HTMLElement>) => handler(e, url) : undefined;
};
