/** @jsx jsx */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import { bind } from 'bind-event-listener';

import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';

import { key } from '../pm-plugins/main';
import type { BlockControlsPlugin, BlockControlsSharedState } from '../types';
import { getTopPosition } from '../utils/drag-handle-positions';

import { DRAG_HANDLE_ZINDEX } from './consts';

const basicStyles = css({
	position: 'absolute',
	width: '100%',
	left: '0',
	display: 'block',
	zIndex: -1,
});

const mouseMoveWrapperStyles = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	zIndex: DRAG_HANDLE_ZINDEX,
});

export const MouseMoveWrapper = ({
	view,
	api,
	anchorName,
	nodeType,
	getPos,
}: {
	view: EditorView;
	api: ExtractInjectionAPI<BlockControlsPlugin> | undefined;
	anchorName: string;
	nodeType: string;
	getPos: () => number | undefined;
}) => {
	// Using a ref for isDragging reduce re-renders
	const isDragging = useRef(false);
	const [hideWrapper, setHideWrapper] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const [pos, setPos] = useState<{ top: string; height: string }>();

	useEffect(() => {
		// Adding this event listener to fix issue where wrapper isn't hidden if user navigates to node before page finishes loading
		// This will be removed when we refactor to remove this component
		let unbind: () => void;
		if (ref.current) {
			unbind = bind(ref.current, {
				type: 'mousemove',
				listener: () => {
					setHideWrapper(true);
					unbind();
				},
			});
		}
		return () => unbind?.();
	}, []);

	const onMouseEnter = useCallback(() => {
		if (!isDragging.current) {
			setHideWrapper(true);
		}
		const pos = getPos();
		if (pos === undefined) {
			return;
		}

		if (api && api.blockControls && !isDragging.current) {
			api?.core?.actions.execute(
				api.blockControls.commands.showDragHandleAt(pos, anchorName, nodeType),
			);
		}
	}, [getPos, isDragging, api, anchorName, nodeType]);

	//THIS IS TRIGGERED A LOT!
	const onSharedStateChange = useCallback(
		({ nextSharedState }: { nextSharedState: BlockControlsSharedState }) => {
			if (nextSharedState?.activeNode?.anchorName !== anchorName && !isDragging.current) {
				setHideWrapper(false);
			}

			if (nextSharedState?.isDragging && !isDragging.current) {
				isDragging.current = true;
				setHideWrapper(true);
			}
			if (nextSharedState?.isDragging === false && isDragging.current) {
				isDragging.current = false;
				setHideWrapper(false);
			}
		},
		[anchorName],
	);

	useEffect(() => {
		const unbind = api?.blockControls?.sharedState.onChange(onSharedStateChange);
		return () => {
			unbind?.();
		};
	}, [onSharedStateChange, api]);

	useLayoutEffect(() => {
		const supportsAnchor =
			CSS.supports('height', `anchor-size(${anchorName} height)`) &&
			CSS.supports('top', `anchor(${anchorName} start)`);

		if (supportsAnchor) {
			setPos({
				height: `anchor-size(${anchorName} height)`,
				top: `anchor(${anchorName} start)`,
			});
			return;
		}

		const calcPos = requestAnimationFrame(() => {
			const dom: HTMLElement | null = view.dom.querySelector(
				`[data-drag-handler-anchor-name="${anchorName}"]`,
			);

			if (!dom) {
				return;
			}

			setPos({
				height: `${dom.offsetHeight}px`,
				top: getTopPosition(dom),
			});
		});

		return () => cancelAnimationFrame(calcPos);
	}, [view, anchorName]);

	return (
		<div
			ref={ref}
			onMouseEnter={() => {
				// Once onDragEnter handler is processed, wrapper for drop target is hidden
				// This means wrapper for draggable is shown, triggering onMouseEnter and showing draggable's drag handle again
				// hence we want to ignore it while we still dragging
				if (!key.getState(view.state)?.isPMDragging) {
					onMouseEnter();
				}
			}}
			css={[basicStyles, !hideWrapper && mouseMoveWrapperStyles]}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
			style={pos}
			// we want achieve the same result as onMouseEnter: make wrapper inactive and display drag handle next to drop target
			// eslint-disable-next-line @atlaskit/design-system/no-direct-use-of-web-platform-drag-and-drop
			onDragEnter={onMouseEnter}
		></div>
	);
};
