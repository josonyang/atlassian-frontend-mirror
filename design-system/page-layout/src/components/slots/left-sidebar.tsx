/* eslint-disable @repo/internal/dom-events/no-unsafe-event-listeners */
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import {
	Fragment,
	type MouseEvent as ReactMouseEvent,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import useCloseOnEscapePress from '@atlaskit/ds-lib/use-close-on-escape-press';
import { easeOut } from '@atlaskit/motion';
import { UNSAFE_useMediaQuery as useMediaQuery } from '@atlaskit/primitives/responsive';
import { N100A } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import {
	COLLAPSED_LEFT_SIDEBAR_WIDTH,
	DEFAULT_LEFT_SIDEBAR_WIDTH,
	FLYOUT_DELAY,
	MOBILE_COLLAPSED_LEFT_SIDEBAR_WIDTH,
	RESIZE_BUTTON_SELECTOR,
	TRANSITION_DURATION,
	VAR_LEFT_SIDEBAR_FLYOUT,
	VAR_LEFT_SIDEBAR_WIDTH,
} from '../../common/constants';
import { type LeftSidebarProps } from '../../common/types';
import {
	getGridStateFromStorage,
	mergeGridStateIntoStorage,
	resolveDimension,
} from '../../common/utils';
import { publishGridState, SidebarResizeContext, useSkipLink } from '../../controllers';
import ResizeControl from '../resize-control';

import LeftSidebarInner from './internal/left-sidebar-inner';
import LeftSidebarOuter from './internal/left-sidebar-outer';
import ResizableChildrenWrapper from './internal/resizable-children-wrapper';
import SlotDimensions from './slot-dimensions';

const openBackdropStyles = css({
	width: '100%',
	height: '100%',
	position: 'absolute',
	background: token('color.blanket', N100A),
	opacity: 1,
});

const hiddenBackdropStyles = css({
	opacity: 0,
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	transition: `opacity ${TRANSITION_DURATION}ms ${easeOut} 0s`,
});

/**
 * __Left sidebar__
 *
 * Provides a slot for a left sidebar within the PageLayout.
 *
 * On smaller viewports, the left sidebar can no longer be expanded.  Instead, expanding it will
 * put it into our "flyout mode" to lay overtop (which in desktop is explicitly a hover state).
 * This ensures the contents behind do not reflow oddly and allows for a better experience
 * resizing between mobile and desktop.
 *
 * - [Examples](https://atlassian.design/components/page-layout/examples)
 * - [Code](https://atlassian.design/components/page-layout/code)
 */
const LeftSidebar = (props: LeftSidebarProps) => {
	const {
		children,
		width,
		isFixed = true,
		valueTextLabel,
		resizeButtonLabel,
		resizeGrabAreaLabel,
		overrides,
		onResizeStart,
		onResizeEnd,
		onFlyoutExpand,
		onFlyoutCollapse,
		testId,
		id,
		skipLinkTitle,
		collapsedState,
	} = props;

	const flyoutTimerRef = useRef<ReturnType<typeof setTimeout>>();
	const mouseOverEventRef = useRef<(event: MouseEvent) => void | null>();
	const leftSideBarRef = useRef<HTMLDivElement>(null);

	const { leftSidebarState, setLeftSidebarState } = useContext(SidebarResizeContext);
	const {
		isFlyoutOpen,
		isResizing,
		flyoutLockCount,
		isLeftSidebarCollapsed,
		leftSidebarWidth,
		lastLeftSidebarWidth,
		hasInit,
	} = leftSidebarState;

	const isLocked = flyoutLockCount > 0;
	const isLockedRef = useRef(isLocked);
	const mouseXRef = useRef<number>(0);
	const handlerRef = useRef<((event: MouseEvent) => void) | null>(null);

	useEffect(() => {
		isLockedRef.current = isLocked;

		// I tried a one-time `mousemove` handler that gets attached
		// when the lock releases. This is not robust because
		// the mouse can stay still after release (e.g. using keyboard)
		// and the sidebar will erroneously stay open.
		//
		// The following solution is likely less performant but more robust.

		if (isLocked && !handlerRef.current) {
			handlerRef.current = (event: MouseEvent) => {
				mouseXRef.current = event.clientX;
			};

			document.addEventListener('mousemove', handlerRef.current);
		}

		if (!isLocked && handlerRef.current) {
			if (mouseXRef.current >= lastLeftSidebarWidth) {
				setLeftSidebarState((current) => ({ ...current, isFlyoutOpen: false }));
			}
			document.removeEventListener('mousemove', handlerRef.current);
			handlerRef.current = null;
		}

		return () => {
			if (handlerRef.current) {
				document.removeEventListener('mousemove', handlerRef.current);
			}
		};
	}, [isLocked, lastLeftSidebarWidth, setLeftSidebarState]);

	const _width = Math.max(width || 0, DEFAULT_LEFT_SIDEBAR_WIDTH);

	const collapsedStateOverrideOpen = collapsedState === 'expanded';

	let leftSidebarWidthOnMount: number;
	if (collapsedStateOverrideOpen) {
		leftSidebarWidthOnMount = resolveDimension(VAR_LEFT_SIDEBAR_FLYOUT, _width, !width);
	} else if (isLeftSidebarCollapsed || collapsedState === 'collapsed') {
		leftSidebarWidthOnMount = COLLAPSED_LEFT_SIDEBAR_WIDTH;
	} else {
		leftSidebarWidthOnMount = resolveDimension(
			VAR_LEFT_SIDEBAR_WIDTH,
			_width,
			!width || (!collapsedStateOverrideOpen && getGridStateFromStorage('isLeftSidebarCollapsed')),
		);
	}

	// Update state from cache on mount
	useEffect(() => {
		const cachedCollapsedState =
			!collapsedStateOverrideOpen &&
			(collapsedState === 'collapsed' ||
				getGridStateFromStorage('isLeftSidebarCollapsed') ||
				false);

		const cachedGridState = getGridStateFromStorage('gridState') || {};

		let leftSidebarWidth =
			!width && cachedGridState[VAR_LEFT_SIDEBAR_FLYOUT]
				? Math.max(cachedGridState[VAR_LEFT_SIDEBAR_FLYOUT], DEFAULT_LEFT_SIDEBAR_WIDTH)
				: _width;

		const lastLeftSidebarWidth =
			!width && cachedGridState[VAR_LEFT_SIDEBAR_FLYOUT]
				? Math.max(cachedGridState[VAR_LEFT_SIDEBAR_FLYOUT], DEFAULT_LEFT_SIDEBAR_WIDTH)
				: _width;

		if (cachedCollapsedState) {
			leftSidebarWidth = COLLAPSED_LEFT_SIDEBAR_WIDTH;
		}

		setLeftSidebarState({
			isFlyoutOpen: false,
			isResizing,
			isLeftSidebarCollapsed: cachedCollapsedState,
			leftSidebarWidth,
			lastLeftSidebarWidth,
			flyoutLockCount: 0,
			isFixed,
			hasInit: true,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Every time other than mount,
	// update the local storage and css variables.
	const notFirstRun = useRef(false);
	useEffect(() => {
		if (notFirstRun.current) {
			publishGridState({
				[VAR_LEFT_SIDEBAR_WIDTH]: leftSidebarWidth || leftSidebarWidthOnMount,
				[VAR_LEFT_SIDEBAR_FLYOUT]: lastLeftSidebarWidth,
			});

			mergeGridStateIntoStorage('isLeftSidebarCollapsed', isLeftSidebarCollapsed);
		}

		if (!notFirstRun.current) {
			notFirstRun.current = true;
		}

		return () => {
			removeMouseOverListener();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLeftSidebarCollapsed, leftSidebarWidth, id]);

	const onMouseOver = (event: ReactMouseEvent) => {
		const isMouseOnResizeButton =
			(event.target as Element).matches(`[${RESIZE_BUTTON_SELECTOR}]`) ||
			(event.target as Element).matches(`[${RESIZE_BUTTON_SELECTOR}] *`);

		if (isFlyoutOpen || isMouseOnResizeButton || !isLeftSidebarCollapsed) {
			return;
		}

		event.persist();
		flyoutTimerRef.current && clearTimeout(flyoutTimerRef.current);

		if (!mouseOverEventRef.current) {
			mouseOverEventRef.current = (event: MouseEvent) => {
				const leftSidebar: HTMLElement | null = leftSideBarRef.current;

				if (leftSidebar === null || isLockedRef.current) {
					return;
				}

				if (!(leftSidebar as HTMLElement).contains(event.target as HTMLElement)) {
					flyoutTimerRef.current && clearTimeout(flyoutTimerRef.current);

					onFlyoutCollapse && onFlyoutCollapse();
					setLeftSidebarState((current) => ({
						...current,
						isFlyoutOpen: false,
					}));

					removeMouseOverListener();
				}
			};
		}

		document.addEventListener(
			'mouseover',
			mouseOverEventRef.current as EventListener,
			{
				capture: true,
				passive: true,
			} as EventListenerOptions,
		);

		flyoutTimerRef.current = setTimeout(() => {
			setLeftSidebarState((current) => ({
				...current,
				isFlyoutOpen: true,
			}));
			onFlyoutExpand && onFlyoutExpand();
		}, FLYOUT_DELAY);
	};

	const removeMouseOverListener = () => {
		mouseOverEventRef.current &&
			document.removeEventListener(
				'mouseover',
				mouseOverEventRef.current as EventListener,
				{
					capture: true,
					passive: true,
				} as EventListenerOptions,
			);
	};

	useSkipLink(id, skipLinkTitle);

	const onMouseLeave = (event: ReactMouseEvent) => {
		const isMouseOnResizeButton =
			(event.target as Element).matches(`[${RESIZE_BUTTON_SELECTOR}]`) ||
			(event.target as Element).matches(`[${RESIZE_BUTTON_SELECTOR}] *`);

		if (isMouseOnResizeButton || !isLeftSidebarCollapsed || flyoutLockCount > 0) {
			return;
		}
		onFlyoutCollapse && onFlyoutCollapse();
		setTimeout(() => {
			setLeftSidebarState((current) => ({
				...current,
				isFlyoutOpen: false,
			}));
		}, FLYOUT_DELAY);
	};

	const mobileMediaQuery = useMediaQuery('below.sm');

	const openMobileFlyout = useCallback(() => {
		if (!mobileMediaQuery?.matches) {
			return;
		}

		setLeftSidebarState((current) => {
			if (current.isFlyoutOpen) {
				return current;
			}

			return { ...current, isFlyoutOpen: true };
		});
	}, [setLeftSidebarState, mobileMediaQuery]);

	const closeMobileFlyout = useCallback(() => {
		if (!mobileMediaQuery?.matches) {
			return;
		}

		setLeftSidebarState((current) => {
			if (!current.isFlyoutOpen) {
				return current;
			}

			return { ...current, isFlyoutOpen: false };
		});
	}, [setLeftSidebarState, mobileMediaQuery]);

	useMediaQuery('below.sm', (event) => {
		setLeftSidebarState((current) => {
			if (event.matches && !current.isLeftSidebarCollapsed) {
				// Sidebar was previously open when resizing downwards, convert the sidebar being open to a flyout being open
				return {
					...current,
					isResizing: false,
					isLeftSidebarCollapsed: true,
					leftSidebarWidth: COLLAPSED_LEFT_SIDEBAR_WIDTH,
					lastLeftSidebarWidth: current.leftSidebarWidth,
					isFlyoutOpen: true,
				};
			} else if (!event.matches && current.isFlyoutOpen) {
				// The user is resizing "upwards", eg. going from mobile to desktop.
				// Flyout was previously open, let's keep it open by moving to the un-collapsed sidebar instead

				return {
					...current,
					isResizing: false,
					isLeftSidebarCollapsed: false,
					leftSidebarWidth: Math.max(current.lastLeftSidebarWidth, DEFAULT_LEFT_SIDEBAR_WIDTH),
					isFlyoutOpen: false,
				};
			}

			return current;
		});
	});

	// Close the flyout when the "escape" key is pressed.
	useCloseOnEscapePress({
		onClose: closeMobileFlyout,
		isDisabled: !isFlyoutOpen,
	});

	/**
	 * We use both the state and our effect-based ref to protect animation until initialized fully
	 */
	const isReady = hasInit && notFirstRun.current;

	return (
		<Fragment>
			{mobileMediaQuery?.matches && (
				/**
				 * On desktop, the `onClick` handlers controls the temporary flyout behavior.
				 * This is an intentionally mouse-only experience, it may even be disruptive with keyboard navigation.
				 *
				 * On mobile, the `onClick` handler controls the toggled flyout behaviour.
				 * This is not intended to be how you use this with a keyboard, there is a ResizeButton for this intentionally instead.
				 */
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
				<div
					css={[hiddenBackdropStyles, isFlyoutOpen && openBackdropStyles]}
					onClick={closeMobileFlyout}
				/>
			)}
			{/* These are strictly mouse events for mouse optimzation of features not relevant to keyboard users. */}
			<LeftSidebarOuter
				ref={leftSideBarRef}
				testId={testId}
				onMouseOver={!mobileMediaQuery?.matches ? onMouseOver : undefined}
				onMouseLeave={!mobileMediaQuery?.matches ? onMouseLeave : undefined}
				onClick={mobileMediaQuery?.matches ? openMobileFlyout : undefined}
				id={id}
				isFixed={isFixed}
			>
				<SlotDimensions
					variableName={VAR_LEFT_SIDEBAR_WIDTH}
					value={isReady ? leftSidebarWidth : leftSidebarWidthOnMount}
					mobileValue={MOBILE_COLLAPSED_LEFT_SIDEBAR_WIDTH}
				/>
				<LeftSidebarInner isFixed={isFixed} isFlyoutOpen={isFlyoutOpen}>
					<ResizableChildrenWrapper
						isFlyoutOpen={isFlyoutOpen}
						isLeftSidebarCollapsed={isLeftSidebarCollapsed}
						hasCollapsedState={!isReady && collapsedState === 'collapsed'}
						testId={testId && `${testId}-resize-children-wrapper`}
					>
						{children}
					</ResizableChildrenWrapper>
					<ResizeControl
						testId={testId}
						valueTextLabel={valueTextLabel}
						resizeGrabAreaLabel={resizeGrabAreaLabel}
						resizeButtonLabel={resizeButtonLabel}
						// eslint-disable-next-line @repo/internal/react/no-unsafe-overrides
						overrides={overrides}
						onResizeStart={onResizeStart}
						onResizeEnd={onResizeEnd}
					/>
				</LeftSidebarInner>
			</LeftSidebarOuter>
		</Fragment>
	);
};

export default LeftSidebar;
