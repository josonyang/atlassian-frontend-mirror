import { useEffect } from 'react';

import createFocusTrap, { type FocusTrap } from 'focus-trap';

import noop from '@atlaskit/ds-lib/noop';

import { type FocusManagerHook } from './types';

export const useFocusManager = ({
	initialFocusRef,
	popupRef,
	shouldCloseOnTab,
}: FocusManagerHook): void => {
	useEffect(() => {
		if (!popupRef || shouldCloseOnTab) {
			return noop;
		}

		const trapConfig = {
			clickOutsideDeactivates: true,
			escapeDeactivates: true,
			initialFocus: initialFocusRef || popupRef,
			fallbackFocus: popupRef,
			returnFocusOnDeactivate: true,
		};

		const focusTrap: FocusTrap = createFocusTrap(popupRef, trapConfig);

		let frameId: number | null = null;

		// wait for the popup to reposition itself before we focus
		frameId = requestAnimationFrame(() => {
			frameId = null;
			focusTrap.activate();
		});

		return () => {
			if (frameId != null) {
				cancelAnimationFrame(frameId);
				frameId = null;
			}
			focusTrap.deactivate();
		};
	}, [popupRef, initialFocusRef, shouldCloseOnTab]);
};
