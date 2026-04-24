/**
 * Contextual Typeahead Completions (CTC) debug logging utility.
 *
 * Logs are silent by default. To enable in any environment (dev, staging, prod):
 *
 *   localStorage.setItem('atl-ctc-dbg', '1')
 *
 * Then reload the page. To disable:
 *
 *   localStorage.removeItem('atl-ctc-dbg')
 */
export const isAutocompleteDebugEnabled = (): boolean => {
	try {
		return typeof localStorage !== 'undefined' && localStorage.getItem('atl-ctc-dbg') === '1';
	} catch {
		return false;
	}
};
