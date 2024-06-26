import type { BreakoutMarkAttrs } from '@atlaskit/adf-schema';
import type { MarkType, Node as PMNode } from '@atlaskit/editor-prosemirror/model';
export { getParentNodeWidth } from '@atlaskit/editor-common/node-width';

/**
 * Returns the breakout mode of a given node
 */
export const getBreakoutMode = (
	node: PMNode,
	breakout: MarkType,
): BreakoutMarkAttrs['mode'] | undefined => {
	const breakoutMark = breakout && breakout.isInSet(node.marks);
	return breakoutMark ? breakoutMark.attrs.mode : node.attrs.layout;
};
