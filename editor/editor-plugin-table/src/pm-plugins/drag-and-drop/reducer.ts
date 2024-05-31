import type { DragAndDropPluginAction } from './actions';
import { DragAndDropActionType } from './actions';
import { DropTargetType } from './consts';
import type { DragAndDropPluginState } from './types';

export default (
	pluginState: DragAndDropPluginState,
	action: DragAndDropPluginAction,
): DragAndDropPluginState => {
	switch (action.type) {
		case DragAndDropActionType.SET_DROP_TARGET:
			return {
				...pluginState,
				decorationSet: action.data.decorationSet,
				dropTargetType: action.data.type,
				dropTargetIndex: action.data.index,
				isDragging: true,
			};
		case DragAndDropActionType.CLEAR_DROP_TARGET:
			return {
				...pluginState,
				decorationSet: action.data.decorationSet,
				dropTargetType: DropTargetType.NONE,
				dropTargetIndex: 0,
				isDragging: false,
			};
		case DragAndDropActionType.TOGGLE_DRAG_MENU:
			return {
				...pluginState,
				isDragMenuOpen: action.data.isDragMenuOpen,
				dragMenuDirection: action.data.direction,
				dragMenuIndex: action.data.index,
				isKeyboardModeActive: action.data.isKeyboardModeActive,
			};
		default:
			return pluginState;
	}
};
