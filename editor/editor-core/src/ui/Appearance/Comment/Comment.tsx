/** @jsx jsx */
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import classnames from 'classnames';
import type { WrappedComponentProps } from 'react-intl-next';
import { injectIntl } from 'react-intl-next';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import { GRID_GUTTER } from '@atlaskit/editor-common/styles';
import type { OptionalPlugin } from '@atlaskit/editor-common/types';
import { WidthConsumer } from '@atlaskit/editor-common/ui';
import { ToolbarArrowKeyNavigationProvider } from '@atlaskit/editor-common/ui-menu';
import type {
	MaxContentSizePlugin,
	MaxContentSizePluginState,
} from '@atlaskit/editor-plugins/max-content-size';
import type { MediaPlugin } from '@atlaskit/editor-plugins/media';
import type { MediaPluginState } from '@atlaskit/editor-plugins/media/types';
import type {
	PrimaryToolbarPlugin,
	PrimaryToolbarPluginState,
} from '@atlaskit/editor-plugins/primary-toolbar';
import { tableCommentEditorStyles } from '@atlaskit/editor-plugins/table/ui/common-styles';
import { akEditorMobileBreakoutPoint } from '@atlaskit/editor-shared-styles';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';
import { N100 } from '@atlaskit/theme/colors';
import { borderRadius } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';

import messages from '../../../messages';
import { usePresetContext } from '../../../presets/context';
import type { EditorAppearance, EditorAppearanceComponentProps } from '../../../types';
import { ClickAreaBlock } from '../../Addon';
import { createEditorContentStyle } from '../../ContentStyles';
import PluginSlot from '../../PluginSlot';
import Toolbar from '../../Toolbar';
import WithFlash from '../../WithFlash';

import { MainToolbar, mainToolbarCustomComponentsSlotStyle } from './Toolbar';

const CommentEditorMargin = 14;

const commentEditorStyles = css({
	display: 'flex',
	flexDirection: 'column',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'.less-margin .ProseMirror': {
		margin: `${token('space.150', '12px')} ${token('space.100', '8px')} ${token(
			'space.100',
			'8px',
		)}`,
	},
	minWidth: '272px',
	height: 'auto',
	backgroundColor: token('color.background.input', 'white'),
	border: `1px solid ${token('color.border.input', N100)}`,
	boxSizing: 'border-box',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	borderRadius: `${borderRadius()}px`,
	maxWidth: 'inherit',
	wordWrap: 'break-word',
});

const ContentArea = createEditorContentStyle(
	css(
		{
			flexGrow: 1,
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
			overflowX: getBooleanFF('platform.editor.table-sticky-scrollbar') ? 'clip' : 'hidden',
			lineHeight: '24px',
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
			'.ProseMirror': {
				margin: token('space.150', '12px'),
			},
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
			'.gridParent': {
				marginLeft: token('space.025', '2px'),
				marginRight: token('space.025', '2px'),
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
				width: `calc(100% + ${CommentEditorMargin - GRID_GUTTER}px)`,
			},
			padding: token('space.250', '20px'),
		},
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		tableCommentEditorStyles,
	),
);
ContentArea.displayName = 'ContentArea';

const secondaryToolbarStyles = css({
	boxSizing: 'border-box',
	justifyContent: 'flex-end',
	alignItems: 'center',
	display: 'flex',
	padding: `${token('space.150', '12px')} ${token('space.025', '2px')}`,
});
interface EditorAppearanceComponentState {}

const appearance: EditorAppearance = 'comment';

class Editor extends React.Component<
	EditorAppearanceComponentProps & WrappedComponentProps,
	EditorAppearanceComponentState
> {
	static displayName = 'CommentEditorAppearance';

	private appearance: EditorAppearance = 'comment';
	private containerElement: HTMLElement | null = null;

	// Wrapper container for toolbar and content area
	private wrapperElementRef = React.createRef<HTMLDivElement>();

	constructor(props: any) {
		super(props);
		if (props.innerRef) {
			this.wrapperElementRef = props.innerRef;
		}
	}

	private handleSave = () => {
		if (this.props.editorView && this.props.onSave) {
			this.props.onSave(this.props.editorView);
		}
	};

	private handleCancel = () => {
		if (this.props.editorView && this.props.onCancel) {
			this.props.onCancel(this.props.editorView);
		}
	};

	private renderChrome = ({ maxContentSize, mediaState, primaryToolbarState }: PluginStates) => {
		const {
			editorDOMElement,
			editorView,
			editorActions,
			eventDispatcher,
			providerFactory,
			contentComponents,
			customContentComponents,
			customPrimaryToolbarComponents,
			primaryToolbarComponents: primaryToolbarComponentsProp,
			customSecondaryToolbarComponents,
			popupsMountPoint,
			popupsBoundariesElement,
			popupsScrollableElement,
			maxHeight,
			minHeight = 150,
			onSave,
			onCancel,
			disabled,
			dispatchAnalyticsEvent,
			intl,
			useStickyToolbar,
			pluginHooks,
			featureFlags,
		} = this.props;
		const maxContentSizeReached = Boolean(maxContentSize?.maxContentSizeReached);
		const showSecondaryToolbar = !!onSave || !!onCancel || !!customSecondaryToolbarComponents;

		const isShortcutToFocusToolbar = (event: KeyboardEvent) => {
			//Alt + F9 to reach first element in this main toolbar
			return event.altKey && (event.key === 'F9' || event.keyCode === 120);
		};

		const isTwoLineToolbarEnabled =
			!!customPrimaryToolbarComponents && !!featureFlags?.twoLineEditorToolbar;

		const handleEscape = (event: KeyboardEvent) => {
			if (!editorView?.hasFocus()) {
				editorView?.focus();
			}
			event.preventDefault();
			event.stopPropagation();
		};

		let primaryToolbarComponents = primaryToolbarComponentsProp;
		if (Array.isArray(primaryToolbarState?.components) && Array.isArray(primaryToolbarComponents)) {
			primaryToolbarComponents = primaryToolbarState.components.concat(primaryToolbarComponents);
		}

		return (
			<WithFlash animate={maxContentSizeReached}>
				<div
					css={[
						commentEditorStyles,
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
						css({
							// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
							minHeight: `${minHeight}px`,
						}),
					]}
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
					className="akEditor"
					ref={this.wrapperElementRef}
				>
					<MainToolbar
						useStickyToolbar={useStickyToolbar}
						twoLineEditorToolbar={isTwoLineToolbarEnabled}
					>
						<ToolbarArrowKeyNavigationProvider
							editorView={editorView}
							childComponentSelector={"[data-testid='ak-editor-main-toolbar']"}
							isShortcutToFocusToolbar={isShortcutToFocusToolbar}
							handleEscape={handleEscape}
							editorAppearance={this.appearance}
							useStickyToolbar={useStickyToolbar}
							intl={intl}
						>
							<Toolbar
								editorView={editorView!}
								editorActions={editorActions}
								eventDispatcher={eventDispatcher!}
								providerFactory={providerFactory!}
								appearance={this.appearance}
								items={primaryToolbarComponents}
								popupsMountPoint={popupsMountPoint}
								popupsBoundariesElement={popupsBoundariesElement}
								popupsScrollableElement={popupsScrollableElement}
								disabled={!!disabled}
								dispatchAnalyticsEvent={dispatchAnalyticsEvent}
								containerElement={this.containerElement}
								twoLineEditorToolbar={isTwoLineToolbarEnabled}
							/>
							{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
							<div css={mainToolbarCustomComponentsSlotStyle(isTwoLineToolbarEnabled)}>
								{customPrimaryToolbarComponents as React.ReactNode}
							</div>
						</ToolbarArrowKeyNavigationProvider>
					</MainToolbar>
					<ClickAreaBlock editorView={editorView} editorDisabled={disabled}>
						<WidthConsumer>
							{({ width }) => {
								return (
									<ContentArea
										ref={(ref) => (this.containerElement = ref)}
										css={
											maxHeight
												? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
													css({
														// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
														maxHeight: `${maxHeight}px`,
													})
												: null
										}
										// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
										className={classnames('ak-editor-content-area', {
											'less-margin': width < akEditorMobileBreakoutPoint,
										})}
										featureFlags={featureFlags}
									>
										{customContentComponents && 'before' in customContentComponents
											? customContentComponents.before
											: customContentComponents}
										<PluginSlot
											editorView={editorView}
											editorActions={editorActions}
											eventDispatcher={eventDispatcher}
											dispatchAnalyticsEvent={dispatchAnalyticsEvent}
											providerFactory={providerFactory}
											appearance={this.appearance}
											items={contentComponents}
											popupsMountPoint={popupsMountPoint}
											popupsBoundariesElement={popupsBoundariesElement}
											popupsScrollableElement={popupsScrollableElement}
											containerElement={this.containerElement}
											disabled={!!disabled}
											wrapperElement={this.wrapperElementRef.current}
											pluginHooks={pluginHooks}
										/>
										{editorDOMElement}
										{customContentComponents && 'after' in customContentComponents
											? customContentComponents.after
											: null}
									</ContentArea>
								);
							}}
						</WidthConsumer>
					</ClickAreaBlock>
				</div>
				{showSecondaryToolbar && (
					<div css={secondaryToolbarStyles} data-testid="ak-editor-secondary-toolbar">
						<ButtonGroup>
							{!!onSave && (
								<Button
									appearance="primary"
									onClick={this.handleSave}
									testId="comment-save-button"
									isDisabled={disabled || (mediaState && !mediaState.allUploadsFinished)}
								>
									{intl.formatMessage(messages.saveButton)}
								</Button>
							)}
							{!!onCancel && (
								<Button appearance="subtle" onClick={this.handleCancel} isDisabled={disabled}>
									{intl.formatMessage(messages.cancelButton)}
								</Button>
							)}
						</ButtonGroup>
						{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
						<span style={{ flexGrow: 1 }} />
						{customSecondaryToolbarComponents}
					</div>
				)}
			</WithFlash>
		);
	};

	render() {
		return <RenderWithPluginState renderChrome={this.renderChrome} />;
	}
}

interface PluginStates {
	maxContentSize?: MaxContentSizePluginState;
	mediaState?: MediaPluginState;
	primaryToolbarState?: PrimaryToolbarPluginState;
}

interface RenderChromeProps {
	renderChrome: (props: PluginStates) => React.ReactNode;
}

function RenderWithPluginState({ renderChrome }: RenderChromeProps) {
	const api =
		usePresetContext<
			[
				OptionalPlugin<MediaPlugin>,
				OptionalPlugin<MaxContentSizePlugin>,
				OptionalPlugin<PrimaryToolbarPlugin>,
			]
		>();
	const { mediaState, maxContentSizeState, primaryToolbarState } = useSharedPluginState(api, [
		'media',
		'maxContentSize',
		'primaryToolbar',
	]);

	return (
		<Fragment>
			{renderChrome({
				maxContentSize: maxContentSizeState,
				mediaState: mediaState ?? undefined,
				primaryToolbarState,
			})}
		</Fragment>
	);
}

const EditorNext = (props: EditorAppearanceComponentProps & WrappedComponentProps) => {
	const api =
		usePresetContext<
			[
				OptionalPlugin<MediaPlugin>,
				OptionalPlugin<MaxContentSizePlugin>,
				OptionalPlugin<PrimaryToolbarPlugin>,
			]
		>();
	const { mediaState, maxContentSizeState, primaryToolbarState } = useSharedPluginState(api, [
		'media',
		'maxContentSize',
		'primaryToolbar',
	]);
	const {
		editorDOMElement,
		editorView,
		editorActions,
		eventDispatcher,
		providerFactory,
		contentComponents,
		customContentComponents,
		customPrimaryToolbarComponents,
		primaryToolbarComponents: primaryToolbarComponentsProp,
		customSecondaryToolbarComponents,
		popupsMountPoint,
		popupsBoundariesElement,
		popupsScrollableElement,
		maxHeight,
		minHeight = 150,
		onSave,
		onCancel,
		disabled,
		dispatchAnalyticsEvent,
		intl,
		useStickyToolbar,
		pluginHooks,
		featureFlags,
		innerRef,
	} = props;
	const maxContentSizeReached = Boolean(maxContentSizeState?.maxContentSizeReached);
	const showSecondaryToolbar = !!onSave || !!onCancel || !!customSecondaryToolbarComponents;
	const containerElement = React.useRef<HTMLDivElement>(null);

	// Wrapper container for toolbar and content area
	const wrapperElementRef = useMemo(
		() => innerRef || React.createRef<HTMLDivElement>(),
		[innerRef],
	);

	const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

	useEffect(() => {
		if (mediaState) {
			mediaState.subscribeToUploadInProgressState(setSaveButtonDisabled);
		}
		return () => mediaState?.unsubscribeFromUploadInProgressState(setSaveButtonDisabled);
	}, [mediaState]);

	const handleSave = useCallback(() => {
		if (editorView && onSave) {
			onSave(editorView);
		}
	}, [editorView, onSave]);

	const handleCancel = useCallback(() => {
		if (editorView && onCancel) {
			onCancel(editorView);
		}
	}, [editorView, onCancel]);

	const isShortcutToFocusToolbar = useCallback((event: KeyboardEvent) => {
		//Alt + F9 to reach first element in this main toolbar
		return event.altKey && (event.key === 'F9' || event.keyCode === 120);
	}, []);

	const isTwoLineToolbarEnabled =
		!!customPrimaryToolbarComponents && !!featureFlags?.twoLineEditorToolbar;

	const handleEscape = useCallback(
		(event: KeyboardEvent) => {
			if (!editorView?.hasFocus()) {
				editorView?.focus();
			}
			event.preventDefault();
			event.stopPropagation();
		},
		[editorView],
	);

	let primaryToolbarComponents = primaryToolbarComponentsProp;
	if (Array.isArray(primaryToolbarState?.components) && Array.isArray(primaryToolbarComponents)) {
		primaryToolbarComponents = primaryToolbarState.components.concat(primaryToolbarComponents);
	}

	return (
		<WithFlash animate={maxContentSizeReached}>
			<div
				css={[
					commentEditorStyles,
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
					css({
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
						minHeight: `${minHeight}px`,
					}),
				]}
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
				className="akEditor"
				ref={wrapperElementRef}
			>
				<MainToolbar
					useStickyToolbar={useStickyToolbar}
					twoLineEditorToolbar={isTwoLineToolbarEnabled}
				>
					<ToolbarArrowKeyNavigationProvider
						editorView={editorView}
						childComponentSelector={"[data-testid='ak-editor-main-toolbar']"}
						isShortcutToFocusToolbar={isShortcutToFocusToolbar}
						handleEscape={handleEscape}
						editorAppearance={appearance}
						useStickyToolbar={useStickyToolbar}
						intl={intl}
					>
						<Toolbar
							editorView={editorView!}
							editorActions={editorActions}
							eventDispatcher={eventDispatcher!}
							providerFactory={providerFactory!}
							appearance={appearance}
							items={primaryToolbarComponents}
							popupsMountPoint={popupsMountPoint}
							popupsBoundariesElement={popupsBoundariesElement}
							popupsScrollableElement={popupsScrollableElement}
							disabled={!!disabled}
							dispatchAnalyticsEvent={dispatchAnalyticsEvent}
							containerElement={containerElement.current}
							twoLineEditorToolbar={isTwoLineToolbarEnabled}
						/>
						{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
						<div css={mainToolbarCustomComponentsSlotStyle(isTwoLineToolbarEnabled)}>
							{customPrimaryToolbarComponents as React.ReactNode}
						</div>
					</ToolbarArrowKeyNavigationProvider>
				</MainToolbar>
				<ClickAreaBlock editorView={editorView} editorDisabled={disabled}>
					<WidthConsumer>
						{({ width }) => {
							return (
								<ContentArea
									ref={containerElement}
									css={
										maxHeight
											? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
												css({
													// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
													maxHeight: `${maxHeight}px`,
												})
											: null
									}
									// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
									className={classnames('ak-editor-content-area', {
										'less-margin': width < akEditorMobileBreakoutPoint,
									})}
									featureFlags={featureFlags}
								>
									{customContentComponents && 'before' in customContentComponents
										? customContentComponents.before
										: customContentComponents}
									<PluginSlot
										editorView={editorView}
										editorActions={editorActions}
										eventDispatcher={eventDispatcher}
										dispatchAnalyticsEvent={dispatchAnalyticsEvent}
										providerFactory={providerFactory}
										appearance={appearance}
										items={contentComponents}
										popupsMountPoint={popupsMountPoint}
										popupsBoundariesElement={popupsBoundariesElement}
										popupsScrollableElement={popupsScrollableElement}
										containerElement={containerElement.current}
										disabled={!!disabled}
										wrapperElement={wrapperElementRef.current}
										pluginHooks={pluginHooks}
									/>
									{editorDOMElement}
									{customContentComponents && 'after' in customContentComponents
										? customContentComponents.after
										: null}
								</ContentArea>
							);
						}}
					</WidthConsumer>
				</ClickAreaBlock>
			</div>
			{showSecondaryToolbar && (
				<div css={secondaryToolbarStyles} data-testid="ak-editor-secondary-toolbar">
					<ButtonGroup>
						{!!onSave && (
							<Button
								appearance="primary"
								onClick={handleSave}
								testId="comment-save-button"
								isDisabled={disabled || saveButtonDisabled}
							>
								{intl.formatMessage(messages.saveButton)}
							</Button>
						)}
						{!!onCancel && (
							<Button appearance="subtle" onClick={handleCancel} isDisabled={disabled}>
								{intl.formatMessage(messages.cancelButton)}
							</Button>
						)}
					</ButtonGroup>
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
					<span style={{ flexGrow: 1 }} />
					{customSecondaryToolbarComponents}
				</div>
			)}
		</WithFlash>
	);
};

EditorNext.displayName = 'CommentEditorAppearance';

const CommentEditorNextWithIntl = injectIntl(EditorNext);
const CommentEditorOldWithIntl = injectIntl(Editor);

const ExportComp = getBooleanFF('platform.editor.media.alluploadsfinished-dispatch-update_ivtow')
	? CommentEditorNextWithIntl
	: CommentEditorOldWithIntl;

export const CommentEditorWithIntl = ExportComp;
