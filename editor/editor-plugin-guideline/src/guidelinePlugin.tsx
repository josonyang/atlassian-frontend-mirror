/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import type {
	DisplayGuideline,
	GuidelineContainerRect,
	GuidelinePluginOptions,
	GuidelinePluginState,
} from '@atlaskit/editor-common/guideline';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { PluginKey } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { akEditorGridLineZIndex } from '@atlaskit/editor-shared-styles';

import type { GuidelinePlugin } from './guidelinePluginType';
import { GuidelineContainer } from './ui/guidelineContainer';

const guidelineStyles = css({
	position: 'absolute',
	width: '100%',
	left: 0,
	right: 0,
	transform: `scale(1)`,
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	zIndex: `${akEditorGridLineZIndex};`,
	display: 'flex',
	justifyContent: 'center',
});

const key = new PluginKey<GuidelinePluginState>('guidelinePlugin');

const displayGuideline: DisplayGuideline = (view) => (props) => {
	const { dispatch, state } = view;
	const tr = state.tr.setMeta(key, props);
	dispatch(tr);
	return true;
};

export const EMPTY_STATE: GuidelinePluginState = {
	guidelines: [],
};

const guidelinePMPlugin = new SafePlugin<GuidelinePluginState>({
	key,
	state: {
		init() {
			return EMPTY_STATE;
		},
		apply(tr, currentPluginState) {
			const nextPluginState = tr.getMeta(key);
			if (nextPluginState) {
				return {
					...currentPluginState,
					...nextPluginState,
				} as GuidelinePluginState;
			}

			return currentPluginState;
		},
	},
});

const ContentComponent = ({
	api,
	editorView,
	options,
}: {
	api: ExtractInjectionAPI<typeof guidelinePlugin> | undefined;
	editorView: EditorView;
	options: GuidelinePluginOptions | undefined;
}) => {
	const { widthState, guidelineState } = useSharedPluginState(api, ['width', 'guideline']);

	if (
		!widthState ||
		!widthState.width ||
		!widthState.lineLength ||
		!guidelineState ||
		!guidelineState.guidelines ||
		guidelineState.guidelines.length === 0
	) {
		return null;
	}

	const updateRect = ({ top, left }: GuidelineContainerRect) => {
		const { dispatch, state } = editorView;

		const { top: prevTop, left: prevLeft } = guidelineState.rect || {};

		if (prevTop !== top || prevLeft !== left) {
			const tr = state.tr.setMeta(key, {
				rect: { top, left },
			});
			dispatch(tr);
			return true;
		}
	};

	return (
		<div css={guidelineStyles}>
			<GuidelineContainer
				guidelines={guidelineState.guidelines}
				height={(editorView.dom as HTMLElement).scrollHeight}
				width={widthState.width}
				editorWidth={widthState.lineLength}
				updateRect={updateRect}
			/>
		</div>
	);
};

/**
 * Guideline plugin to be added to an `EditorPresetBuilder` and used with `ComposableEditor`
 * from `@atlaskit/editor-core`.
 */
export const guidelinePlugin: GuidelinePlugin = ({ config: options, api }) => ({
	name: 'guideline',
	getSharedState(editorState) {
		if (!editorState) {
			return null;
		}
		return key.getState(editorState) || null;
	},
	actions: {
		displayGuideline: displayGuideline,
	},

	pmPlugins() {
		return [
			{
				name: 'guideline',
				plugin: () => guidelinePMPlugin,
			},
		];
	},

	contentComponent: ({ editorView }) => (
		<ContentComponent editorView={editorView} options={options} api={api} />
	),
});
