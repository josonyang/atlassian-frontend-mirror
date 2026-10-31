import { type RefObject, useRef } from 'react';

import { useLayoutEffect } from '@atlaskit/ds-lib/use-layout-effect';

import { applyInitialFocus } from '../apply-initial-focus';
import type { TPhase } from './use-animated-visibility';

export function useInitialFocus({
	elementRef,
	isEnabled,
	initialFocusRef,
	phase,
	role,
}: {
	elementRef: RefObject<HTMLElement | null>;
	isEnabled: boolean;
	initialFocusRef?: RefObject<HTMLElement | null>;
	phase: TPhase;
	role: string | undefined;
}): void {
	const prevPhaseRef = useRef<TPhase>('closed');
	useLayoutEffect(() => {
		const prevPhase = prevPhaseRef.current;
		prevPhaseRef.current = phase;
		if (!isEnabled || phase === 'closed' || (prevPhase !== 'closed' && prevPhase !== 'exiting')) {
			return;
		}
		const element = elementRef.current;
		if (element) {
			applyInitialFocus({ container: element, initialFocusRef, role });
		}
	}, [elementRef, initialFocusRef, isEnabled, phase, role]);
}
