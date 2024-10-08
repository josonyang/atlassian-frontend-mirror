import type EditorActions from '../../actions';

export type RenderOnClickHandler = (
	editorActions: EditorActions,
	closePopup: () => void,
) => React.ReactElement;

export interface AddonActions {
	actionOnClick?: (editorActions: EditorActions) => void;
	renderOnClick?: RenderOnClickHandler;
}

export interface AddonCommonProps extends AddonActions {
	icon: React.ReactElement;
}

export interface AddonProps extends AddonCommonProps {
	onClick?: (actions: AddonActions) => void;
	children?: React.ReactElement[];
}

export interface AddonConfiguration extends AddonCommonProps {
	text: string;
}
