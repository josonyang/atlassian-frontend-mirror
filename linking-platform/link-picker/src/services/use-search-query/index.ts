import { useRef } from 'react';

import { isSafeUrl } from '@atlaskit/linking-common/url';

import { type LinkPickerState, type PickerState } from '../../common/types';

export function useSearchQuery(state: PickerState) {
	const queryState = useRef<LinkPickerState | null>(null);

	/*
	 * When state contains a valid url AND is NOT selected from results, and the url was updated
	 * from the textbox, queryState should be null to clear the items in plugin state.
	 *
	 * Checking `lastEditedBy` prevents the items being cleared when the tab is changed.
	 */
	if (isSafeUrl(state.url) && state.selectedIndex === -1 && !state.preventHidingRecents) {
		queryState.current = null;
	}

	/*
	 * When state contains a search term e.g. Not a valid url return a query
	 */
	if (queryState.current?.query !== state.url && !isSafeUrl(state.url)) {
		queryState.current = { query: state.url };
	}

	/*
	 * When state contains a valid url and is selected from the list
	 * return current state to prevent triger a new plugin search
	 */
	return queryState.current;
}
