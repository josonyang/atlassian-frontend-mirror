import type { Mark as PMMark } from '@atlaskit/editor-prosemirror/model';
import { type Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { Plugin } from '@atlaskit/editor-prosemirror/state';
import type { PluginSpec, SafePluginSpec } from '@atlaskit/editor-prosemirror/state';
import type {
	Decoration,
	DecorationSource,
	EditorView,
	NodeView,
} from '@atlaskit/editor-prosemirror/view';

import { createProseMirrorMetadata } from '../prosemirror-dom-metadata';

type NodeViewConstructor = (
	node: Node,
	view: EditorView,
	getPos: () => number | undefined,
	decorations: readonly Decoration[],
	innerDecorations: DecorationSource,
) => NodeView;

/**
 * 🧱 Internal Helper Function: Editor FE Platform
 *
 * Attaches generic ProseMirror metadata attributes to a given DOM element based on the properties of a ProseMirror node.
 * This function is useful for annotating DOM elements with metadata that describes the type and characteristics of the ProseMirror node.
 *
 *
 * @param {Object} params - The parameters for the function.
 * @param {PMNode} params.node - The ProseMirror node from which to derive metadata.
 * @param {HTMLElement} params.dom - The DOM element to which the metadata attributes will be attached.
 */
export const attachGenericProseMirrorMetadata = ({
	nodeOrMark,
	dom,
}: {
	nodeOrMark: PMNode | PMMark;
	dom: HTMLElement;
}) => {
	const metadata = createProseMirrorMetadata(nodeOrMark);

	Object.entries(metadata).forEach(([name, value]) => {
		dom.setAttribute(name, value);
	});
};

// Wraper to avoid any exception during the get pos operation
// See this https://hello.atlassian.net/wiki/spaces/EDITOR/pages/2849713193/ED-19672+Extensions+Regression
// And this https://discuss.prosemirror.net/t/possible-bug-on-viewdesc-posbeforechild/5783
const wrapGetPosExceptions = <T extends SafePluginSpec>(spec: T): T => {
	if (!spec?.props?.nodeViews) {
		return spec;
	}

	const unsafeNodeViews = spec.props.nodeViews;
	const safeNodeViews = new Proxy(unsafeNodeViews, {
		get(target, prop, receiver) {
			const safeNodeView = new Proxy<NodeViewConstructor>(Reflect.get(target, prop, receiver), {
				apply(target, thisArg, argumentsList) {
					const [node, view, unsafeGetPos, ...more] = argumentsList;

					const safeGetPos = (() => {
						try {
							return unsafeGetPos();
						} catch (e) {
							return;
						}

						return;
						// eslint-disable-next-line no-extra-bind
					}).bind(thisArg);

					const result = Reflect.apply(target, thisArg, [node, view, safeGetPos, ...more]);

					if (result?.dom instanceof HTMLElement) {
						attachGenericProseMirrorMetadata({
							nodeOrMark: node,
							dom: result.dom,
						});
					}

					return result;
				},
			});

			return safeNodeView;
		},
	});

	spec.props.nodeViews = safeNodeViews;

	return spec;
};

// Ignored via go/ees005
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class SafePlugin<T = any> extends Plugin<T> {
	// This variable isn't (and shouldn't) be used anywhere. Its purpose is
	// to distinguish Plugin from SafePlugin, thus ensuring that an 'unsafe'
	// Plugin cannot be assigned as an item in EditorPlugin → pmPlugins.
	_isATypeSafePlugin!: never;

	constructor(spec: SafePluginSpec<T>) {
		super(wrapGetPosExceptions(spec) as PluginSpec<T>);
	}
}
