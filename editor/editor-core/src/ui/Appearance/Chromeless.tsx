/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { Fragment } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import {
	sharedPluginStateHookMigratorFactory,
	useSharedPluginState,
	useSharedPluginStateWithSelector,
} from '@atlaskit/editor-common/hooks';
import type {
	EditorAppearance,
	OptionalPlugin,
	PublicPluginAPI,
} from '@atlaskit/editor-common/types';
import type { ViewMode, EditorViewModePlugin } from '@atlaskit/editor-plugins/editor-viewmode';
import type {
	MaxContentSizePlugin,
	MaxContentSizePluginState,
} from '@atlaskit/editor-plugins/max-content-size';
import { scrollbarStyles } from '@atlaskit/editor-shared-styles/scrollbar';
import { fg } from '@atlaskit/platform-feature-flags';
import { componentWithCondition } from '@atlaskit/platform-feature-flags-react';
import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';
import { token } from '@atlaskit/tokens';

import type { EditorAppearanceComponentProps } from '../../types';
import { createEditorContentStyle } from '../ContentStyles';
import EditorContentContainer from '../EditorContentContainer/EditorContentContainer';
import PluginSlot from '../PluginSlot';
import WithFlash from '../WithFlash';

const scrollbarStylesNew = css({
	'-ms-overflow-style': '-ms-autohiding-scrollbar',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors
	'&::-webkit-scrollbar-corner': {
		display: 'none',
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: token('color.background.neutral.subtle'),
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors
	'&:hover::-webkit-scrollbar-thumb': {
		backgroundColor: token('color.background.neutral.bold'),
		borderRadius: 8,
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors
	'&::-webkit-scrollbar-thumb:hover': {
		backgroundColor: token('color.background.neutral.bold.hovered'),
	},
});

const chromelessEditorStyles = css(
	{
		// eslint-disable-next-line @atlaskit/design-system/use-tokens-typography
		lineHeight: '20px',
		height: 'auto',
		overflowX: 'hidden',
		overflowY: 'auto',
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	scrollbarStyles,
	{
		maxWidth: 'inherit',
		boxSizing: 'border-box',
		wordWrap: 'break-word',
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
		'div > .ProseMirror': {
			outline: 'none',
			whiteSpace: 'pre-wrap',
			padding: 0,
			margin: 0,
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
			'& > :last-child': {
				paddingBottom: token('space.100', '0.5em'),
			},
		},
	},
);

const chromelessEditorStylesNew = css({
	// eslint-disable-next-line @atlaskit/design-system/use-tokens-typography
	lineHeight: '20px',
	height: 'auto',
	overflowX: 'hidden',
	overflowY: 'auto',
	maxWidth: 'inherit',
	boxSizing: 'border-box',
	wordWrap: 'break-word',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'div > .ProseMirror': {
		outline: 'none',
		whiteSpace: 'pre-wrap',
		padding: 0,
		margin: 0,
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
		'& > :last-child': {
			paddingBottom: token('space.100', '0.5em'),
		},
	},
});

const extraSpaceLastLineFix = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'.ProseMirror': {
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
		'& > p:last-of-type': {
			marginBottom: token('space.0'),
		},
	},
});

export const ContentArea = createEditorContentStyle();
ContentArea.displayName = 'ContentArea';

type AppearanceProps = EditorAppearanceComponentProps<
	[OptionalPlugin<MaxContentSizePlugin>, OptionalPlugin<EditorViewModePlugin>]
>;

const EditorContainer = componentWithCondition(
	() => editorExperiment('platform_editor_core_static_emotion', true, { exposure: true }),
	EditorContentContainer,
	ContentArea,
);

const useEditorViewModePluginState = sharedPluginStateHookMigratorFactory<
	ViewMode | undefined,
	PublicPluginAPI<OptionalPlugin<EditorViewModePlugin>> | undefined
>(
	(pluginInjectionApi) => {
		return useSharedPluginStateWithSelector(
			pluginInjectionApi,
			['editorViewMode'],
			(states) => states?.editorViewModeState?.mode,
		);
	},
	(pluginInjectionApi) => {
		const { editorViewModeState } = useSharedPluginState(pluginInjectionApi, ['editorViewMode']);
		return editorViewModeState?.mode;
	},
);

/**
 * Render the editor in a chromeless appearance.
 * Example use is the inline comment editor, which doesn't have editor toolbar
 */
// Ignored via go/ees005
// eslint-disable-next-line @repo/internal/react/no-class-components
export default class Editor extends React.Component<AppearanceProps> {
	static displayName = 'ChromelessEditorAppearance';

	private appearance: EditorAppearance = 'chromeless';
	private containerElement: HTMLElement | null = null;

	private renderChrome = ({ maxContentSize }: { maxContentSize?: MaxContentSizePluginState }) => {
		const {
			editorDOMElement,
			editorView,
			editorActions,
			eventDispatcher,
			providerFactory,
			contentComponents,
			customContentComponents,
			maxHeight,
			minHeight = 30,
			popupsMountPoint,
			popupsBoundariesElement,
			popupsScrollableElement,
			disabled,
			dispatchAnalyticsEvent,
			pluginHooks,
			featureFlags,
		} = this.props;
		const maxContentSizeReached = Boolean(maxContentSize?.maxContentSizeReached);

		const editorViewMode = useEditorViewModePluginState(this.props.editorAPI);

		return (
			<WithFlash animate={maxContentSizeReached}>
				<ChromelessEditorContainer
					maxHeight={maxHeight}
					minHeight={minHeight}
					containerRef={(ref: HTMLElement | null) => (this.containerElement = ref)}
				>
					<EditorContainer
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop
						className="ak-editor-content-area"
						featureFlags={featureFlags}
						viewMode={editorViewMode}
						appearance={this.appearance}
					>
						{customContentComponents && 'before' in customContentComponents
							? customContentComponents.before
							: customContentComponents}
						<PluginSlot
							editorView={editorView}
							editorActions={editorActions}
							eventDispatcher={eventDispatcher}
							providerFactory={providerFactory}
							appearance={this.appearance}
							items={contentComponents}
							popupsMountPoint={popupsMountPoint}
							popupsBoundariesElement={popupsBoundariesElement}
							popupsScrollableElement={popupsScrollableElement}
							containerElement={this.containerElement}
							disabled={!!disabled}
							dispatchAnalyticsEvent={dispatchAnalyticsEvent}
							wrapperElement={this.containerElement}
							pluginHooks={pluginHooks}
						/>
						{editorDOMElement}
						{customContentComponents && 'after' in customContentComponents
							? customContentComponents.after
							: null}
					</EditorContainer>
				</ChromelessEditorContainer>
			</WithFlash>
		);
	};

	render() {
		return (
			<RenderWithPluginState editorAPI={this.props.editorAPI} renderChrome={this.renderChrome} />
		);
	}
}

interface PluginStates {
	maxContentSize?: MaxContentSizePluginState;
}

interface RenderChromeProps extends Pick<AppearanceProps, 'editorAPI'> {
	renderChrome: (props: PluginStates) => React.ReactNode;
}

const useMaxContentSizePluginState = sharedPluginStateHookMigratorFactory<
	{ maxContentSizeState: MaxContentSizePluginState | undefined },
	PublicPluginAPI<OptionalPlugin<MaxContentSizePlugin>> | undefined
>(
	(pluginInjectionApi) => {
		const maxContentSizeReached = useSharedPluginStateWithSelector(
			pluginInjectionApi,
			['maxContentSize'],
			(states) => states?.maxContentSizeState?.maxContentSizeReached,
		);
		return {
			maxContentSizeState:
				maxContentSizeReached === undefined ? undefined : { maxContentSizeReached },
		};
	},
	(pluginInjectionApi) => {
		const { maxContentSizeState } = useSharedPluginState(pluginInjectionApi, ['maxContentSize']);
		return { maxContentSizeState };
	},
);

function RenderWithPluginState({ renderChrome, editorAPI }: RenderChromeProps) {
	const { maxContentSizeState } = useMaxContentSizePluginState(editorAPI);

	return <Fragment>{renderChrome({ maxContentSize: maxContentSizeState })}</Fragment>;
}

interface ChromelessEditorContainerProps {
	maxHeight?: number;
	minHeight: number;
	children: React.ReactNode;
	containerRef?: (ref: HTMLElement | null) => void;
}

function ChromelessEditorContainerNext({
	maxHeight,
	minHeight,
	children,
	containerRef,
}: ChromelessEditorContainerProps) {
	return (
		<div
			css={[
				chromelessEditorStylesNew,
				scrollbarStylesNew,
				fg('platform_fix_extra_space_last_line_comment_editor') && extraSpaceLastLineFix,
			]}
			style={{
				maxHeight: maxHeight ? `${maxHeight}px` : undefined,
				minHeight: `${minHeight}px`,
			}}
			data-testid="chromeless-editor"
			id="chromeless-editor"
			ref={containerRef}
		>
			{children}
		</div>
	);
}

function ChromelessEditorContainerOld({
	maxHeight,
	minHeight,
	children,
	containerRef,
}: ChromelessEditorContainerProps) {
	return (
		<div
			css={[
				chromelessEditorStyles,
				maxHeight &&
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
					css({
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
						maxHeight: `${maxHeight}px`,
					}),
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
				css({
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
					minHeight: `${minHeight}px`,
				}),
				fg('platform_fix_extra_space_last_line_comment_editor') && extraSpaceLastLineFix,
			]}
			data-testid="chromeless-editor"
			id="chromeless-editor"
			ref={containerRef}
		>
			{children}
		</div>
	);
}

export const ChromelessEditorContainer = componentWithCondition(
	() => expValEquals('platform_editor_core_static_emotion', 'isEnabled', true),
	ChromelessEditorContainerNext,
	ChromelessEditorContainerOld,
);
