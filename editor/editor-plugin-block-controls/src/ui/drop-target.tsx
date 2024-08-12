/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import { type IntlShape } from 'react-intl-next';

import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { layers } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';

import type { BlockControlsPlugin } from '../types';
import { isBlocksDragTargetDebug } from '../utils/drag-target-debug';

import { nodeMargins, spaceLookupMap } from './consts';

const DEFAULT_DROP_INDICATOR_WIDTH = 760;

const styleDropTarget = css({
	height: token('space.100', '8px'),
	marginTop: token('space.negative.100', '-8px'),
	position: 'absolute',
	width: '100%',
	left: '0',
	display: 'block',
	zIndex: layers.card(),
});

const nestedDropIndicatorStyle = css({
	position: 'relative',
});

const marginLookupMap = Object.fromEntries(
	Object.entries(spaceLookupMap).map(([key, value], i) => [
		key,
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values
		css({ marginTop: value }),
	]),
);

const BASE_LINE_MARGIN = -8;

const getNodeMargins = (node?: PMNode) => {
	if (!node) {
		return nodeMargins['default'];
	}
	const nodeTypeName = node.type.name;
	if (nodeTypeName === 'heading') {
		return nodeMargins[`heading${node.attrs.level}`] || nodeMargins['default'];
	}

	return nodeMargins[nodeTypeName] || nodeMargins['default'];
};

const getDropTargetPositionStyle = (prevNode?: PMNode, nextNode?: PMNode) => {
	if (!prevNode || !nextNode) {
		return null;
	}

	const space =
		BASE_LINE_MARGIN -
		Math.round((getNodeMargins(prevNode).bottom - getNodeMargins(nextNode).top) / 2);

	if (space < -24) {
		return marginLookupMap[-24];
	} else if (space > 24) {
		return marginLookupMap[24];
	} else {
		return marginLookupMap[space];
	}
};

const EDITOR_BLOCK_CONTROLS_DROP_INDICATOR_WIDTH = '--editor-block-controls-drop-indicator-width';

const styleDropIndicator = css({
	height: '100%',
	margin: '0 auto',
	position: 'relative',
	width: `var(${EDITOR_BLOCK_CONTROLS_DROP_INDICATOR_WIDTH}, 100%)`,
});

export type DropTargetProps = {
	api: ExtractInjectionAPI<BlockControlsPlugin> | undefined;
	id: number;
	prevNode?: PMNode;
	nextNode?: PMNode;
	parentNode?: PMNode;
	formatMessage?: IntlShape['formatMessage'];
};

export const DropTarget = ({
	api,
	id,
	prevNode,
	nextNode,
	parentNode,
	formatMessage,
}: DropTargetProps) => {
	const ref = useRef(null);
	const [isDraggedOver, setIsDraggedOver] = useState(false);

	const { widthState } = useSharedPluginState(api, ['width']);

	const isNestedDropTarget = parentNode?.type.name !== 'doc';

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		return dropTargetForElements({
			element,
			getIsSticky: () => true,
			onDragEnter: () => {
				setIsDraggedOver(true);
			},
			onDragLeave: () => {
				setIsDraggedOver(false);
			},
			onDrop: () => {
				const { activeNode, decorationState } =
					api?.blockControls?.sharedState.currentState() || {};
				if (!activeNode || !decorationState) {
					return;
				}
				const { pos } = decorationState.find((dec) => dec.id === id) || {};

				if (activeNode && pos !== undefined) {
					const { pos: start } = activeNode;
					api?.core?.actions.execute(
						api?.blockControls?.commands?.moveNode(start, pos, undefined, formatMessage),
					);
				}
			},
		});
	}, [id, api, formatMessage]);

	const topTargetMarginStyle = useMemo(() => {
		/**
		 * First child of a nested node.
		 * Disable the position adjustment for the nested node temporarily
		 */
		if (parentNode === prevNode || isNestedDropTarget) {
			return null;
		}
		return getDropTargetPositionStyle(prevNode, nextNode);
	}, [prevNode, nextNode, parentNode, isNestedDropTarget]);

	const widthStyle = {
		[EDITOR_BLOCK_CONTROLS_DROP_INDICATOR_WIDTH]: isNestedDropTarget
			? '100%'
			: `${widthState?.lineLength || DEFAULT_DROP_INDICATOR_WIDTH}px`,
	} as CSSProperties;

	return (
		// Note: Firefox has trouble with using a button element as the handle for drag and drop
		<div
			// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
			css={[styleDropTarget, topTargetMarginStyle, isNestedDropTarget && nestedDropIndicatorStyle]}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop
			style={widthStyle}
			ref={ref}
			data-testid="block-ctrl-drop-target"
		>
			{
				// 4px gap to clear expand node border
				(isDraggedOver || isBlocksDragTargetDebug()) && (
					<div css={styleDropIndicator} data-testid="block-ctrl-drop-indicator">
						<DropIndicator edge="bottom" gap="4px" />
					</div>
				)
			}
		</div>
	);
};
