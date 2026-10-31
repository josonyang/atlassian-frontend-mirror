import type { RefObject } from 'react';

import { getInitialFocusTarget } from './internal/get-initial-focus-target';

export function applyInitialFocus({
	container,
	initialFocusRef,
	role,
}: {
	container: HTMLElement;
	initialFocusRef?: RefObject<HTMLElement | null>;
	role: string | undefined;
}): { applied: boolean; target: HTMLElement | null } {
	const target = getInitialFocusTarget({ container, initialFocusRef, role });
	if (!target) {
		return { applied: false, target: null };
	}

	target.focus();

	return { applied: true, target };
}
