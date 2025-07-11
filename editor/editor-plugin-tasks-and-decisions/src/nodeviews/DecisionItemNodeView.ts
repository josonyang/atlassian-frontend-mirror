import { type IntlShape } from 'react-intl-next';

import { DOMSerializer, type Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { type NodeView } from '@atlaskit/editor-prosemirror/view';

import { decisionItemToDOM } from './decisionItemNodeSpec';

/**
 * NodeView for the DecisionItem node.
 * It renders the decision item with its content and exposes the contentDOM to prosemirror.
 */
export class DecisionItemNodeView implements NodeView {
	dom: Node;
	public contentDOM?: HTMLElement;
	private hasChildren: boolean | undefined = undefined;

	/**
	 * Updates the hasChildren state based on the node's child count by setting the `data-empty` attribute on the contentDOM.
	 * @param node - The ProseMirror node to check for children.
	 * @private
	 */
	private updateHasChildren(node: PMNode): boolean {
		const currentlyHasChildren = node.childCount > 0;
		if (currentlyHasChildren !== this.hasChildren) {
			this.hasChildren = currentlyHasChildren;
			this.contentDOM?.toggleAttribute('data-empty', !currentlyHasChildren);
		}
		return this.hasChildren;
	}

	/**
	 * Creates a new DecisionItemNodeView.
	 * @import type {PMNode} from '@atlaskit/editor-prosemirror/model';
	 * @import type {IntlShape} from 'react-intl-next';
	 * @param {PMNode} node - The ProseMirror node representing the decision item.
	 * @param {IntlShape} intl - The IntlShape for internationalization, used to format the placeholder text.
	 * @example
	 * const decisionItemNodeView = new DecisionItemNodeView(node, getIntl());
	 */
	constructor(node: PMNode, intl: IntlShape) {
		const spec = decisionItemToDOM(node, intl);
		const { dom, contentDOM } = DOMSerializer.renderSpec(document, spec);
		this.dom = dom;
		this.contentDOM = contentDOM;
	}

	/**
	 * Updates the node view when the ProseMirror node changes.
	 * @import type {PMNode} from '@atlaskit/editor-prosemirror/model';
	 * @param {PMNode} node - The ProseMirror node to update the view with.
	 * @example
	 * decisionItemNodeView.update(node);
	 * @returns {boolean} - Returns true if the view was updated successfully.
	 */
	public update(node: PMNode): boolean {
		this.updateHasChildren(node);
		return true;
	}
}
