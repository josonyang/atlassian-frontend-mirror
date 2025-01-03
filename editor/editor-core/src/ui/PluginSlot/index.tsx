/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import isEqual from 'lodash/isEqual';

import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import { ACTION_SUBJECT } from '@atlaskit/editor-common/analytics';
import type { EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import type { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import type {
	EditorAppearance,
	ReactHookFactory,
	UIComponentFactory,
} from '@atlaskit/editor-common/types';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';

import type EditorActions from '../../actions';
import type {} from '../../types';
import { whichTransitionEvent } from '../../utils/whichTransitionEvent';
import { ErrorBoundary } from '../ErrorBoundary';

import { MountPluginHooks } from './mount-plugin-hooks';

const pluginsComponentsWrapper = css({
	display: 'flex',
});

export interface Props {
	items?: UIComponentFactory[];
	pluginHooks?: ReactHookFactory[];
	editorView?: EditorView;
	editorActions?: EditorActions;
	eventDispatcher?: EventDispatcher;
	providerFactory: ProviderFactory;
	appearance?: EditorAppearance;
	popupsMountPoint?: HTMLElement;
	popupsBoundariesElement?: HTMLElement;
	popupsScrollableElement?: HTMLElement;
	containerElement: HTMLElement | null;
	disabled: boolean;
	dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
	contentArea?: HTMLElement;
	wrapperElement: HTMLElement | null;
}

// Ignored via go/ees005
// eslint-disable-next-line @repo/internal/react/no-class-components
class PluginSlotLegacy extends React.Component<Props> {
	static displayName = 'PluginSlot';

	transitionEvent = whichTransitionEvent<'transitionend'>();

	shouldComponentUpdate(nextProps: Props) {
		const {
			editorView,
			editorActions,
			items,
			providerFactory,
			eventDispatcher,
			popupsMountPoint,
			popupsBoundariesElement,
			popupsScrollableElement,
			containerElement,
			disabled,
			wrapperElement,
		} = this.props;

		return !(
			nextProps.editorView === editorView &&
			nextProps.editorActions === editorActions &&
			nextProps.items === items &&
			nextProps.providerFactory === providerFactory &&
			nextProps.eventDispatcher === eventDispatcher &&
			nextProps.popupsMountPoint === popupsMountPoint &&
			nextProps.popupsBoundariesElement === popupsBoundariesElement &&
			nextProps.popupsScrollableElement === popupsScrollableElement &&
			nextProps.containerElement === containerElement &&
			nextProps.disabled === disabled &&
			nextProps.wrapperElement === wrapperElement
		);
	}

	componentDidMount() {
		this.addModeChangeListener(this.props.contentArea);
	}

	UNSAFE_componentWillReceiveProps(nextProps: Props) {
		if (this.props.contentArea !== nextProps.contentArea) {
			this.removeModeChangeListener(this.props.contentArea);
			this.addModeChangeListener(nextProps.contentArea);
		}
	}

	componentWillUnmount() {
		this.removeModeChangeListener(this.props.contentArea);
	}

	forceComponentUpdate = (event: TransitionEvent): void => {
		// Only trigger an update if the transition is on a property containing `width`
		// This will cater for media and the content area itself currently.
		if (event.propertyName.includes('width')) {
			this.forceUpdate();
		}
	};

	removeModeChangeListener = (contentArea?: HTMLElement) => {
		if (contentArea && this.transitionEvent) {
			// Ignored via go/ees005
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			contentArea.removeEventListener(this.transitionEvent, this.forceComponentUpdate);
		}
	};

	addModeChangeListener = (contentArea?: HTMLElement) => {
		if (contentArea && this.transitionEvent) {
			/**
			 * Update the plugin components once the transition
			 * to full width / default mode completes
			 */
			// Ignored via go/ees005
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			contentArea.addEventListener(this.transitionEvent, this.forceComponentUpdate);
		}
	};

	render() {
		const {
			items,
			editorView,
			editorActions,
			eventDispatcher,
			providerFactory,
			appearance,
			popupsMountPoint,
			popupsBoundariesElement,
			popupsScrollableElement,
			containerElement,
			disabled,
			dispatchAnalyticsEvent,
			wrapperElement,
			pluginHooks,
		} = this.props;

		if ((!items && !pluginHooks) || !editorView) {
			return null;
		}

		return (
			<ErrorBoundary component={ACTION_SUBJECT.PLUGIN_SLOT} fallbackComponent={null}>
				<MountPluginHooks
					editorView={editorView}
					pluginHooks={pluginHooks}
					containerElement={containerElement}
				/>
				<div css={pluginsComponentsWrapper}>
					{items?.map((component, key) => {
						const props = { key };
						const element = component({
							editorView: editorView as EditorView,
							editorActions: editorActions as EditorActions,
							eventDispatcher: eventDispatcher as EventDispatcher,
							providerFactory,
							dispatchAnalyticsEvent,
							// Ignored via go/ees005
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							appearance: appearance!,
							popupsMountPoint,
							popupsBoundariesElement,
							popupsScrollableElement,
							containerElement,
							disabled,
							wrapperElement,
						});
						return element && React.cloneElement(element, props);
					})}
				</div>
			</ErrorBoundary>
		);
	}
}

const PluginSlot = ({
	items,
	editorView,
	editorActions,
	eventDispatcher,
	providerFactory,
	appearance,
	popupsMountPoint,
	popupsBoundariesElement,
	popupsScrollableElement,
	containerElement,
	disabled,
	dispatchAnalyticsEvent,
	wrapperElement,
	pluginHooks,
}: Props) => {
	if ((!items && !pluginHooks) || !editorView) {
		return null;
	}

	return (
		<ErrorBoundary component={ACTION_SUBJECT.PLUGIN_SLOT} fallbackComponent={null}>
			<MountPluginHooks
				editorView={editorView}
				pluginHooks={pluginHooks}
				containerElement={containerElement}
			/>
			<div css={pluginsComponentsWrapper}>
				{/**
				 * Why don't we do this as:
				 * ```tsx
				 * items?.map((Component, key) =>
				 *   <Component key={key} editorView={editorView} {...otherProps}
				 * )
				 * ```
				 *
				 * After a performance profile it seems that this is much more performant.
				 */}
				{items?.map((component, key) => {
					const props = { key };
					const element = component({
						editorView: editorView as EditorView,
						editorActions: editorActions as EditorActions,
						eventDispatcher: eventDispatcher as EventDispatcher,
						providerFactory,
						dispatchAnalyticsEvent,
						// Ignored via go/ees005
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						appearance: appearance!,
						popupsMountPoint,
						popupsBoundariesElement,
						popupsScrollableElement,
						containerElement,
						disabled,
						wrapperElement,
					});
					return element && React.cloneElement(element, props);
				})}
			</div>
		</ErrorBoundary>
	);
};

const PluginSlotNew = React.memo(PluginSlot, isEqual);

PluginSlotNew.displayName = 'PluginSlot';

export default function PluginSlotDefault({
	items,
	editorView,
	editorActions,
	eventDispatcher,
	providerFactory,
	appearance,
	popupsMountPoint,
	popupsBoundariesElement,
	popupsScrollableElement,
	containerElement,
	disabled,
	dispatchAnalyticsEvent,
	wrapperElement,
	pluginHooks,
	contentArea,
}: Props) {
	if (fg('platform_editor_react_18_plugin_slot')) {
		return (
			<PluginSlotNew
				items={items}
				editorView={editorView}
				editorActions={editorActions}
				eventDispatcher={eventDispatcher}
				providerFactory={providerFactory}
				appearance={appearance}
				popupsMountPoint={popupsMountPoint}
				popupsBoundariesElement={popupsBoundariesElement}
				popupsScrollableElement={popupsScrollableElement}
				containerElement={containerElement}
				disabled={disabled}
				dispatchAnalyticsEvent={dispatchAnalyticsEvent}
				wrapperElement={wrapperElement}
				pluginHooks={pluginHooks}
			/>
		);
	}
	return (
		<PluginSlotLegacy
			contentArea={contentArea}
			items={items}
			editorView={editorView}
			editorActions={editorActions}
			eventDispatcher={eventDispatcher}
			providerFactory={providerFactory}
			appearance={appearance}
			popupsMountPoint={popupsMountPoint}
			popupsBoundariesElement={popupsBoundariesElement}
			popupsScrollableElement={popupsScrollableElement}
			containerElement={containerElement}
			disabled={disabled}
			dispatchAnalyticsEvent={dispatchAnalyticsEvent}
			wrapperElement={wrapperElement}
			pluginHooks={pluginHooks}
		/>
	);
}
