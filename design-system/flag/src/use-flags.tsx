import { useContext } from 'react';

import { FlagContext } from './flag-context';
import type { FlagAPI } from './flag-provider';

/**
 * useFlags is used to access the `showFlags` function which can be used to programmatically display flags.
 * - [Examples](https://atlassian.design/components/flag/flags-provider/examples#using-showflags)
 */
export function useFlags(): FlagAPI {
	const api: FlagAPI | null = useContext(FlagContext);
	if (api == null) {
		throw new Error('Unable to find FlagProviderContext');
	}

	return api;
}
