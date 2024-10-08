import type { Node as PMNode, Schema } from '@atlaskit/editor-prosemirror/model';
import { Fragment, Slice } from '@atlaskit/editor-prosemirror/model';
import type { EditorState, Selection } from '@atlaskit/editor-prosemirror/state';
import {
	type ContentNodeWithPos,
	findParentNodeOfType,
	findSelectedNodeOfType,
} from '@atlaskit/editor-prosemirror/utils';

import { mapChildren } from '../utils/slice';

export const findExpand = (
	state: EditorState,
	selection?: Selection | null,
): ContentNodeWithPos | undefined => {
	const { expand, nestedExpand } = state.schema.nodes;
	return (
		findSelectedNodeOfType([expand, nestedExpand])(selection || state.selection) ||
		findParentNodeOfType([expand, nestedExpand])(selection || state.selection)
	);
};

// If the top level is a single expand, and the expand is not
// a part of copied content, then return unwrap contents.
// This is needed for handling content copied from expand.
// https://product-fabric.atlassian.net/browse/ED-9146
export const transformSliceToRemoveOpenExpand = (slice: Slice, schema: Schema): Slice => {
	if (
		slice.openStart > 1 &&
		slice.openEnd > 1 &&
		slice.content.childCount === 1 &&
		slice.content.firstChild &&
		slice.content.firstChild.type === schema.nodes.expand
	) {
		return new Slice(slice.content.firstChild.content, slice.openStart - 1, slice.openEnd - 1);
	}
	return slice;
};

export const transformSliceToRemoveOpenNestedExpand = (slice: Slice, schema: Schema): Slice => {
	if (
		slice.openStart > 1 &&
		slice.openEnd > 1 &&
		slice.content.childCount === 1 &&
		slice.content.firstChild &&
		slice.content.firstChild.type === schema.nodes.nestedExpand
	) {
		return new Slice(slice.content.firstChild.content, slice.openStart - 1, slice.openEnd - 1);
	}
	return slice;
};

export const transformSliceNestedExpandToExpand = (slice: Slice, schema: Schema): Slice => {
	const { expand, nestedExpand } = schema.nodes;
	const children = [] as PMNode[];

	mapChildren(slice.content, (node: PMNode) => {
		if (node.type === nestedExpand) {
			children.push(expand.createChecked(node.attrs, node.content, node.marks));
		} else {
			children.push(node);
		}
	});

	return new Slice(Fragment.fromArray(children), slice.openStart, slice.openEnd);
};

export const transformSliceExpandToNestedExpand = (slice: Slice): Slice | null => {
	const children = [] as PMNode[];

	try {
		mapChildren(slice.content, (currentNode: PMNode) => {
			const { expand, nestedExpand } = currentNode.type.schema.nodes;
			if (currentNode.type === expand) {
				const nestedExpandNode = nestedExpand.createChecked(
					currentNode.attrs,
					currentNode.content,
					currentNode.marks,
				);

				if (nestedExpandNode) {
					children.push(nestedExpandNode);
				}
			} else {
				children.push(currentNode);
			}
		});
	} catch (e) {
		// Will throw error if unable to convert expand to nested expand.
		// Example: expand containing a table being converted to nested expand containing table.
		return null;
	}

	return new Slice(Fragment.fromArray(children), slice.openStart, slice.openEnd);
};
