import { GuidelineConfig } from '@atlaskit/editor-common/guideline';
import { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { Mark, Node } from '@atlaskit/editor-prosemirror/model';
import { EditorView } from '@atlaskit/editor-prosemirror/view';
import {
	akEditorGutterPaddingDynamic,
	akEditorGutterPadding,
} from '@atlaskit/editor-shared-styles';
import {
	BaseEventPayload,
	DragLocationHistory,
	ElementDragType,
} from '@atlaskit/pragmatic-drag-and-drop/types';

import { BreakoutPlugin } from '../breakoutPluginType';
import { setBreakoutWidth } from '../editor-commands/set-breakout-width';

import { getGuidelines } from './get-guidelines';
import { LOCAL_RESIZE_PROPERTY } from './resizing-mark-view';

const RESIZE_RATIO = 2;
export const WIDTHS = {
	MIN: 760,
	MAX: 1800,
};

function getProposedWidth({
	initialWidth,
	location,
	api,
}: {
	initialWidth: number;
	location: DragLocationHistory;
	api: ExtractInjectionAPI<BreakoutPlugin> | undefined;
}): number {
	const diffX = (location.current.input.clientX - location.initial.input.clientX) * RESIZE_RATIO;
	const proposedWidth = initialWidth + diffX;

	// TODO: ED-28024 - add snapping logic

	const containerWidth =
		(api?.width.sharedState?.currentState()?.width || 0) -
		2 * akEditorGutterPaddingDynamic() -
		akEditorGutterPadding;
	return Math.min(Math.max(WIDTHS.MIN, Math.min(proposedWidth, containerWidth)), WIDTHS.MAX);
}

export function createResizerCallbacks({
	dom,
	contentDOM,
	view,
	mark,
	api,
}: {
	dom: HTMLElement;
	contentDOM: HTMLElement;
	view: EditorView;
	mark: Mark;
	api: ExtractInjectionAPI<BreakoutPlugin> | undefined;
}): {
	onDragStart: () => void;
	onDrag: (args: BaseEventPayload<ElementDragType>) => void;
	onDrop: (args: BaseEventPayload<ElementDragType>) => void;
} {
	let node: Node | null = null;
	const getEditorWidth = () => {
		return api?.width?.sharedState.currentState();
	};
	return {
		onDragStart: () => {
			api?.core.actions.execute(api.userIntent?.commands.setCurrentUserIntent('dragging'));
			view.dispatch(view.state.tr.setMeta('is-resizer-resizing', true));
			const pos = view.posAtDOM(dom, 0);
			node = view.state.doc.nodeAt(pos);
		},
		onDrag: ({ location }) => {
			const initialWidth = mark.attrs.width;
			const newWidth = getProposedWidth({ initialWidth, location, api });

			const guidelines: GuidelineConfig[] = getGuidelines(
				true,
				newWidth,
				getEditorWidth,
				node?.type,
			);
			api?.guideline?.actions?.displayGuideline(view)({ guidelines });

			contentDOM.style.setProperty(LOCAL_RESIZE_PROPERTY, `${newWidth}px`);
		},
		onDrop({ location }) {
			const guidelines: GuidelineConfig[] = getGuidelines(false, 0, getEditorWidth);
			api?.guideline?.actions?.displayGuideline(view)({ guidelines });

			const pos = view.posAtDOM(dom, 0);
			const mode = mark.attrs.mode;
			const initialWidth = mark.attrs.width;
			const newWidth = getProposedWidth({ initialWidth, location, api });
			setBreakoutWidth(newWidth, mode, pos)(view.state, view.dispatch);

			contentDOM.style.removeProperty(LOCAL_RESIZE_PROPERTY);
			view.dispatch(
				view.state.tr.setMeta('is-resizer-resizing', false).setMeta('scrollIntoView', false),
			);
			api?.core.actions.execute(api.userIntent?.commands.setCurrentUserIntent('default'));
		},
	};
}
