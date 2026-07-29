import { type NavigationActionCommon } from '../../types';

export function isTeamsAppEnabled(
	_config?: Pick<NavigationActionCommon, 'userHasNav4Enabled' | 'hostProduct'>,
): boolean {
	return true;
}
