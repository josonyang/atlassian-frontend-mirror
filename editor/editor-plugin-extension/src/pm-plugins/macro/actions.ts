import assert from 'assert';

import type {
	EditorAnalyticsAPI,
	ExtensionType,
	SelectionJson,
} from '@atlaskit/editor-common/analytics';
import {
	ACTION,
	ACTION_SUBJECT,
	EVENT_TYPE,
	INPUT_METHOD,
	TARGET_SELECTION_SOURCE,
} from '@atlaskit/editor-common/analytics';
import { normaliseNestedLayout } from '@atlaskit/editor-common/insert';
import type {
	MacroAttributes,
	MacroProvider,
	Providers,
} from '@atlaskit/editor-common/provider-factory';
import { getValidNode } from '@atlaskit/editor-common/validator';
import type { Node as PmNode, Schema } from '@atlaskit/editor-prosemirror/model';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { NodeSelection, Selection, TextSelection } from '@atlaskit/editor-prosemirror/state';
import {
	findSelectedNodeOfType,
	replaceParentNodeOfType,
	replaceSelectedNode,
	safeInsert,
} from '@atlaskit/editor-prosemirror/utils';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';

import { getPluginState as getExtensionPluginState } from '../plugin-factory';

import { pluginKey } from './plugin-key';

export const insertMacroFromMacroBrowser =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(macroProvider: MacroProvider, macroNode?: PmNode, isEditing?: boolean) =>
	async (view: EditorView): Promise<boolean> => {
		if (!macroProvider) {
			return false;
		}

		// opens MacroBrowser for editing "macroNode" if passed in
		const newMacro: MacroAttributes = await macroProvider.openMacroBrowser(macroNode);
		if (newMacro && macroNode) {
			const { state, dispatch } = view;
			const currentLayout = (macroNode && macroNode.attrs.layout) || 'default';
			const node = resolveMacro(newMacro, state, { layout: currentLayout });

			if (!node) {
				return false;
			}

			const { selection, schema } = state;
			const { extension, inlineExtension, bodiedExtension, multiBodiedExtension } = schema.nodes;

			const updateSelectionsByNodeType = (nodeType: Schema['nodes'][string]) => {
				// `isEditing` is `false` when we are inserting from insert-block toolbar
				tr = isEditing ? replaceParentNodeOfType(nodeType, node)(tr) : safeInsert(node)(tr);
				// Replacing selected node doesn't update the selection. `selection.node` still returns the old node
				tr.setSelection(TextSelection.create(tr.doc, state.selection.anchor));
			};
			const extensionState = getExtensionPluginState(state);
			let targetSelectionSource: TARGET_SELECTION_SOURCE =
				TARGET_SELECTION_SOURCE.CURRENT_SELECTION;
			let { tr } = state;

			const isBodiedExtensionSelected = !!findSelectedNodeOfType([bodiedExtension])(selection);
			const isMultiBodiedExtensionSelected = !!findSelectedNodeOfType([multiBodiedExtension])(
				selection,
			);

			// When it's a bodiedExtension but not selected
			if (macroNode.type === bodiedExtension && !isBodiedExtensionSelected) {
				updateSelectionsByNodeType(state.schema.nodes.bodiedExtension);
			}
			// When it's a multiBodiedExtension but not selected
			else if (macroNode.type === multiBodiedExtension && !isMultiBodiedExtensionSelected) {
				updateSelectionsByNodeType(state.schema.nodes.multiBodiedExtension);
			}
			// If any extension is currently selected
			else if (
				findSelectedNodeOfType([extension, bodiedExtension, inlineExtension, multiBodiedExtension])(
					selection,
				)
			) {
				tr = replaceSelectedNode(node)(tr);
				// Replacing selected node doesn't update the selection. `selection.node` still returns the old node
				tr.setSelection(NodeSelection.create(tr.doc, tr.mapping.map(state.selection.anchor)));
			}
			// When we loose the selection. This usually happens when Synchrony resets or changes
			// the selection when user is in the middle of updating an extension.
			else if (extensionState.element) {
				const pos = view.posAtDOM(extensionState.element, -1);
				if (pos > -1) {
					tr = tr.replaceWith(pos, pos + macroNode.nodeSize, node);
					tr.setSelection(Selection.near(tr.doc.resolve(pos)));
					targetSelectionSource = TARGET_SELECTION_SOURCE.HTML_ELEMENT;
				}
			}

			// Only scroll if we have anything to update, best to avoid surprise scroll
			if (dispatch && tr.docChanged) {
				const { extensionType, extensionKey, layout, localId } = macroNode.attrs;
				editorAnalyticsAPI?.attachAnalyticsEvent({
					action: ACTION.UPDATED,
					actionSubject: ACTION_SUBJECT.EXTENSION,
					actionSubjectId: macroNode.type.name as ExtensionType,
					eventType: EVENT_TYPE.TRACK,
					attributes: {
						// @ts-expect-error - Type is not assignable to parameter of type 'AnalyticsEventPayload'
						// This error was introduced after upgrading to TypeScript 5
						inputMethod: isEditing ? INPUT_METHOD.MACRO_BROWSER : INPUT_METHOD.TOOLBAR,
						extensionType,
						extensionKey,
						layout,
						localId,
						selection: tr.selection.toJSON() as SelectionJson,
						targetSelectionSource,
					},
				})(tr);
				dispatch(tr.scrollIntoView());
			}
			return true;
		}

		return false;
	};

export const resolveMacro = (
	macro?: MacroAttributes,
	state?: EditorState,
	optionalAttrs?: object,
): PmNode | null => {
	if (!macro || !state) {
		return null;
	}

	const { schema } = state;
	const { type, attrs } = getValidNode(macro, schema);
	let node = null;

	if (type === 'extension') {
		node = schema.nodes.extension.create({ ...attrs, ...optionalAttrs });
	} else if (type === 'bodiedExtension') {
		node = schema.nodes.bodiedExtension.create(
			{ ...attrs, ...optionalAttrs },
			schema.nodeFromJSON(macro).content,
		);
	} else if (type === 'inlineExtension') {
		node = schema.nodes.inlineExtension.create(attrs);
	} else if (type === 'multiBodiedExtension') {
		node = schema.nodes.multiBodiedExtension.create(
			{ ...attrs, ...optionalAttrs },
			schema.nodeFromJSON(macro).content,
		);
	}

	return node && normaliseNestedLayout(state, node);
};

// gets the macroProvider from the state and tries to autoConvert a given text
export const runMacroAutoConvert = (state: EditorState, text: string): PmNode | null => {
	const macroPluginState = pluginKey.getState(state);

	const macroProvider = macroPluginState && macroPluginState.macroProvider;
	if (!macroProvider || !macroProvider.autoConvert) {
		return null;
	}

	const macroAttributes = macroProvider.autoConvert(text);
	if (!macroAttributes) {
		return null;
	}

	// decides which kind of macro to render (inline|bodied|bodyless)
	return resolveMacro(macroAttributes, state);
};

export const setMacroProvider =
	(provider: Providers['macroProvider']) =>
	async (view: EditorView): Promise<boolean> => {
		let resolvedProvider: MacroProvider | undefined | null;
		try {
			resolvedProvider = await provider;
			assert(
				resolvedProvider && resolvedProvider.openMacroBrowser,
				`MacroProvider promise did not resolve to a valid instance of MacroProvider - ${resolvedProvider}`,
			);
		} catch (err) {
			resolvedProvider = null;
		}
		view.dispatch(view.state.tr.setMeta(pluginKey, { macroProvider: resolvedProvider }));
		return true;
	};
