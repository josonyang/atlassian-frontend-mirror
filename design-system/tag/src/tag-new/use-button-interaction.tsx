import { type MouseEvent as ReactMouseEvent, useMemo, useRef, useState } from 'react';

/**
 * Hook for tracking link/button hover/focus state (replaces CSS :has() selectors in this component)
 */
export function useButtonInteraction(): {
	isLinkHovered: boolean;
	isOverButton: boolean;
	isButtonFocused: boolean;
	isLinkFocused: boolean;
	buttonHandlers: {
		onMouseEnter: () => void;
		onMouseLeave: () => void;
		onMouseDown: () => void;
		onFocus: () => void;
		onBlur: () => void;
	};
	linkHandlers: {
		onMouseEnter: () => void;
		onMouseLeave: () => void;
		onMouseDown: () => void;
		onFocus: () => void;
		onBlur: () => void;
	};
} {
	const [isLinkHovered, setIsLinkHovered] = useState(false);
	const [isOverButton, setIsOverButton] = useState(false);
	const [isButtonFocused, setIsButtonFocused] = useState(false);
	const [isLinkFocused, setIsLinkFocused] = useState(false);
	// Track if last interaction was via mouse (to determine keyboard vs mouse focus)
	const hadMouseDownRef = useRef(false);

	// Button handlers
	const buttonHandlers = useMemo(
		() => ({
			onMouseEnter: (): void => setIsOverButton(true),
			onMouseLeave: (): void => setIsOverButton(false),
			onMouseDown: (e?: ReactMouseEvent<HTMLButtonElement>): void => {
				// Prevent the browser from moving focus to the remove button on mousedown.
				// Without this, parent composite widgets (e.g. Select) lose input focus when
				// the user clicks remove, triggering unwanted blur side-effects.
				e?.preventDefault();
				hadMouseDownRef.current = true;
			},
			onFocus: (): void => {
				// Only track keyboard focus for focus ring styles
				// If mousedown happened just before focus, it's mouse focus (not keyboard)
				if (!hadMouseDownRef.current) {
					setIsButtonFocused(true);
				}
				hadMouseDownRef.current = false;
			},
			onBlur: (): void => setIsButtonFocused(false),
		}),
		[],
	);

	// Link handlers - includes hover tracking
	const linkHandlers = useMemo(
		() => ({
			onMouseEnter: (): void => setIsLinkHovered(true),
			onMouseLeave: (): void => setIsLinkHovered(false),
			onMouseDown: (): void => {
				hadMouseDownRef.current = true;
			},
			onFocus: (): void => {
				// Only track keyboard focus for focus ring styles
				// If mousedown happened just before focus, it's mouse focus (not keyboard)
				if (!hadMouseDownRef.current) {
					setIsLinkFocused(true);
				}
				hadMouseDownRef.current = false;
			},
			onBlur: (): void => setIsLinkFocused(false),
		}),
		[],
	);

	return {
		isLinkHovered,
		isOverButton,
		isButtonFocused,
		isLinkFocused,
		buttonHandlers,
		linkHandlers,
	};
}
