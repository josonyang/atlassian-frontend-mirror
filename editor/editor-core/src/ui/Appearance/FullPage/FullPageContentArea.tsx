/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import type { ReactElement } from 'react';
import React, { useImperativeHandle, useRef } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx, type Theme, useTheme } from '@emotion/react';
import type { WrappedComponentProps } from 'react-intl-next';
import { injectIntl } from 'react-intl-next';

import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import type { EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import { fullPageMessages as messages } from '@atlaskit/editor-common/messages';
import type { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import type {
	EditorAppearance,
	FeatureFlags,
	OptionalPlugin,
	PublicPluginAPI,
	ReactHookFactory,
	UIComponentFactory,
} from '@atlaskit/editor-common/types';
import { type ContextPanelPlugin } from '@atlaskit/editor-plugins/context-panel';
import { type ViewMode } from '@atlaskit/editor-plugins/editor-viewmode';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';

import type EditorActions from '../../../actions';
import type { ContentComponents, ReactComponents } from '../../../types';
import ClickAreaBlock from '../../Addon/ClickAreaBlock';
import { ContextPanel } from '../../ContextPanel';
import PluginSlot from '../../PluginSlot';

import {
	contentArea,
	contentAreaHeightNoToolbar,
	contentAreaWrapper,
	contentAreaWrapperNoStyles,
	editorContentAreaStyle,
	editorContentGutterStyle,
	ScrollContainer,
	sidebarArea,
} from './StyledComponents';
import { type ScrollContainerRefs } from './types';

interface FullPageEditorContentAreaProps {
	editorAPI: PublicPluginAPI<[OptionalPlugin<ContextPanelPlugin>]> | undefined;
	appearance: EditorAppearance | undefined;
	contentComponents: UIComponentFactory[] | undefined;
	pluginHooks: ReactHookFactory[] | undefined;
	contextPanel: ReactComponents | undefined;
	customContentComponents: ContentComponents | undefined;
	disabled: boolean | undefined;
	dispatchAnalyticsEvent: DispatchAnalyticsEvent | undefined;
	editorActions: EditorActions | undefined;
	editorDOMElement: ReactElement;
	editorView: EditorView;
	eventDispatcher: EventDispatcher | undefined;
	popupsMountPoint: HTMLElement | undefined;
	popupsBoundariesElement: HTMLElement | undefined;
	popupsScrollableElement: HTMLElement | undefined;
	providerFactory: ProviderFactory;
	wrapperElement: HTMLElement | null;
	featureFlags?: FeatureFlags;
	viewMode: ViewMode | undefined;
	isEditorToolbarHidden?: boolean;
}

export const CONTENT_AREA_TEST_ID = 'ak-editor-fp-content-area';
export const EDITOR_CONTAINER = 'ak-editor-container';

const Content = React.forwardRef<
	ScrollContainerRefs,
	FullPageEditorContentAreaProps & WrappedComponentProps
>((props, ref) => {
	const theme: Theme = useTheme();
	const fullWidthMode = props.appearance === 'full-width';
	const scrollContainerRef = useRef(null);
	const contentAreaRef = useRef(null);
	const containerRef = useRef(null);

	useImperativeHandle(
		ref,
		() => ({
			get scrollContainer() {
				return scrollContainerRef.current;
			},
			get contentArea() {
				return contentAreaRef.current;
			},
			get containerArea() {
				return containerRef.current;
			},
		}),
		[],
	);

	return (
		<div
			css={[
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
				contentArea,
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
				props.isEditorToolbarHidden && contentAreaHeightNoToolbar,
			]}
			data-testid={CONTENT_AREA_TEST_ID}
			ref={containerRef}
		>
			<div
				css={
					// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values
					fg('platform_editor_breakout_use_css') ? contentAreaWrapper : contentAreaWrapperNoStyles
				}
				data-testid={EDITOR_CONTAINER}
				data-editor-container={fg('platform_editor_breakout_use_css') ? 'true' : 'false'}
			>
				<ScrollContainer
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
					className="fabric-editor-popup-scroll-parent"
					featureFlags={props.featureFlags}
					ref={scrollContainerRef}
					viewMode={props?.viewMode}
				>
					<ClickAreaBlock editorView={props.editorView} editorDisabled={props.disabled}>
						<div
							// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
							css={editorContentAreaStyle({
								fullWidthMode,
								layoutMaxWidth: theme.layoutMaxWidth,
							})}
							role="region"
							aria-label={props.intl.formatMessage(messages.editableContentLabel)}
							ref={contentAreaRef}
						>
							<div
								// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
								css={editorContentGutterStyle()}
								// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
								className={[
									'ak-editor-content-area',
									'appearance-full-page',
									fullWidthMode ? 'fabric-editor--full-width-mode' : '',
								].join(' ')}
								ref={contentAreaRef}
							>
								{!!props.customContentComponents && 'before' in props.customContentComponents
									? props.customContentComponents.before
									: props.customContentComponents}
								<PluginSlot
									editorView={props.editorView}
									editorActions={props.editorActions}
									eventDispatcher={props.eventDispatcher}
									providerFactory={props.providerFactory}
									appearance={props.appearance}
									items={props.contentComponents}
									pluginHooks={props.pluginHooks}
									contentArea={contentAreaRef.current ?? undefined}
									popupsMountPoint={props.popupsMountPoint}
									popupsBoundariesElement={props.popupsBoundariesElement}
									popupsScrollableElement={props.popupsScrollableElement}
									disabled={!!props.disabled}
									containerElement={scrollContainerRef.current}
									dispatchAnalyticsEvent={props.dispatchAnalyticsEvent}
									wrapperElement={props.wrapperElement}
								/>
								{props.editorDOMElement}
								{!!props.customContentComponents && 'after' in props.customContentComponents
									? props.customContentComponents.after
									: null}
							</div>
						</div>
					</ClickAreaBlock>
				</ScrollContainer>
			</div>
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
			<div css={sidebarArea}>
				{props.contextPanel || <ContextPanel editorAPI={props.editorAPI} visible={false} />}
			</div>
		</div>
	);
});

export const FullPageContentArea = injectIntl(Content, { forwardRef: true });
