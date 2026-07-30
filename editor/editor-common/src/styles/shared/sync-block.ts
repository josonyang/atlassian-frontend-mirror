const prefix = 'ak-editor-sync-block';
export const SyncBlockSharedCssClassName: {
	error: string;
	loading: string;
	prefix: string;
	renderer: string;
} = {
	prefix,
	renderer: `${prefix}__renderer`,
	error: `${prefix}__error_state`,
	loading: `${prefix}__loading_state`,
};

// eslint-disable-next-line @atlaskit/volt-strict-mode/no-multiple-exports
export const SyncBlockRendererDataAttributeName = 'data-sync-block-renderer';

const bodiedPrefix = 'ak-editor-bodied-sync-block';
// eslint-disable-next-line @atlaskit/volt-strict-mode/no-multiple-exports
export const BodiedSyncBlockSharedCssClassName: {
	content: string;
	empty: string;
	prefix: string;
	renderer: string;
	selectionInside: string;
} = {
	prefix: bodiedPrefix,
	renderer: `${bodiedPrefix}__renderer`,
	content: `${bodiedPrefix}__content`,
	selectionInside: `${bodiedPrefix}__selection_inside`,
	// Applied by the node view when the block holds nothing but a single empty paragraph.
	// Emptiness is derived from the ProseMirror document rather than the rendered DOM, because
	// decorations (for example the selection marker's cursor widget) and ProseMirror's own
	// separator/trailing-break hack nodes are injected as children of that paragraph and make
	// DOM-shape heuristics unreliable. See EDITOR-8327.
	empty: `${bodiedPrefix}__empty`,
};

// Constant labelClassName value here has been inlined in css from EditorContentContainer, if you need to make
// update here, please also update packages/editor/editor-core/src/ui/EditorContentContainer/EditorContentContainer-compiled.tsx
const labelClassName = 'ak-editor-sync-block__label';
// eslint-disable-next-line @atlaskit/volt-strict-mode/no-multiple-exports
export const SyncBlockLabelSharedCssClassName: {
	labelClassName: string;
} = {
	labelClassName,
};

// eslint-disable-next-line @atlaskit/volt-strict-mode/no-multiple-exports
export const disabledClassName = 'disabled';
// eslint-disable-next-line @atlaskit/volt-strict-mode/no-multiple-exports
export const viewModeClassName = 'view-mode';
// eslint-disable-next-line @atlaskit/volt-strict-mode/no-multiple-exports
export const creationLoadingClassName = 'creation-loading';
// eslint-disable-next-line @atlaskit/volt-strict-mode/no-multiple-exports
export const draggingClassName = 'user-is-dragging';
// eslint-disable-next-line @atlaskit/volt-strict-mode/no-multiple-exports
export const SyncBlockStateCssClassName: {
	creationLoadingClassName: string;
	disabledClassName: string;
	draggingClassName: string;
	viewModeClassName: string;
} = {
	disabledClassName,
	viewModeClassName,
	creationLoadingClassName,
	draggingClassName,
};
