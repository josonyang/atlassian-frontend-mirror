import { type Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { type NodeEncoder } from '..';
import { unknown } from './unknown';

export const embedCard: NodeEncoder = (node: PMNode): string => {
	if (!node.attrs.url) {
		return unknown(node);
	}

	return `[${node.attrs.url}|${node.attrs.url}|smart-embed]`;
};
