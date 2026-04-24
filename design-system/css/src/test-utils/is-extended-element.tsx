import { type HTMLElementExtended } from './types';

export function isExtendedElement(node?: Node): node is HTMLElementExtended {
	return (
		!!node &&
		node.nodeType === node.ELEMENT_NODE &&
		typeof (node as any).textContentOriginal === 'string'
	);
}
