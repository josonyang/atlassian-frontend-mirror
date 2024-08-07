import { type ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { type EditorView } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';

import { type BlockControlsPlugin } from '../types';

export const handleMouseOver = (
	view: EditorView,
	event: Event,
	api: ExtractInjectionAPI<BlockControlsPlugin> | undefined,
) => {
	const { isDragging, activeNode } = api?.blockControls?.sharedState.currentState() || {};
	// Most mouseover events don't fire during drag but some can slip through
	// when the drag begins. This prevents those.
	if (isDragging) {
		return false;
	}
	const target = event.target as HTMLElement;
	if (target.classList.contains('ProseMirror')) {
		return false;
	}
	const rootElement = target?.closest('[data-drag-handler-anchor-name]');
	if (rootElement) {
		const anchorName = rootElement.getAttribute('data-drag-handler-anchor-name')!;
		if (activeNode?.anchorName === anchorName) {
			return false;
		}

		if (
			['wrap-right', 'wrap-left'].includes(rootElement.getAttribute('layout') || '') &&
			fg('platform_editor_element_drag_and_drop_ed_24227')
		) {
			return false;
		}

		const pos = view.posAtDOM(rootElement, 0, 0);

		let rootPos;
		if (fg('platform_editor_elements_dnd_nested')) {
			const $rootPos = view.state.doc.resolve(pos);
			const depth = $rootPos.depth;
			rootPos = depth ? $rootPos.before() : $rootPos.pos;
		} else {
			rootPos = view.state.doc.resolve(pos).start(1) - 1;
		}
		const nodeType = rootElement.getAttribute('data-drag-handler-node-type')!;

		if (nodeType) {
			api?.core?.actions.execute(
				api?.blockControls?.commands.showDragHandleAt(rootPos, anchorName, nodeType),
			);
		}
	}
};
