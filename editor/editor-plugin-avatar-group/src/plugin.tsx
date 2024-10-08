import React from 'react';

import type { CollabEditOptions, CollabInviteToEditProps } from '@atlaskit/editor-common/collab';
import type {
	NextEditorPlugin,
	OptionalPlugin,
	ToolbarUIComponentFactory,
} from '@atlaskit/editor-common/types';
import type { AnalyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import type { CollabEditPlugin } from '@atlaskit/editor-plugin-collab-edit';
import type { FeatureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';
import type { PrimaryToolbarPlugin } from '@atlaskit/editor-plugin-primary-toolbar';

import AvatarGroupPluginWrapper from './ui/AvatarGroupPluginWrapper';
import AvatarsWithPluginState from './ui/avatars-with-plugin-state';

type Config = {
	collabEdit?: CollabEditOptions;
	takeFullWidth: boolean;
	showAvatarGroup?: boolean;
};

export type AvatarGroupPlugin = NextEditorPlugin<
	'avatarGroup',
	{
		pluginConfiguration: Config;
		dependencies: [
			OptionalPlugin<FeatureFlagsPlugin>,
			OptionalPlugin<AnalyticsPlugin>,
			OptionalPlugin<CollabEditPlugin>,
			OptionalPlugin<PrimaryToolbarPlugin>,
		];
		actions: {
			getToolbarItem: ({
				inviteToEditHandler,
				isInviteToEditButtonSelected,
				inviteToEditComponent,
			}: CollabInviteToEditProps) => JSX.Element | null;
		};
	}
>;

export const avatarGroupPlugin: AvatarGroupPlugin = ({ config: props, api }) => {
	const featureFlags = api?.featureFlags?.sharedState.currentState() || {};
	const primaryToolbarComponent: ToolbarUIComponentFactory = ({
		editorView,
		eventDispatcher,
		dispatchAnalyticsEvent,
	}) => {
		return (
			<AvatarGroupPluginWrapper
				dispatchAnalyticsEvent={dispatchAnalyticsEvent}
				editorView={editorView}
				eventDispatcher={eventDispatcher}
				collabEdit={props?.collabEdit}
				takeFullWidth={props?.takeFullWidth}
				featureFlags={featureFlags}
				editorAnalyticsAPI={api?.analytics?.actions}
				editorAPI={api}
			/>
		);
	};
	if (props.showAvatarGroup) {
		api?.primaryToolbar?.actions.registerComponent({
			name: 'avatarGroup',
			component: primaryToolbarComponent,
		});
	}

	return {
		name: 'avatarGroup',

		primaryToolbarComponent:
			!api?.primaryToolbar && props.showAvatarGroup ? primaryToolbarComponent : undefined,

		actions: {
			getToolbarItem: ({
				inviteToEditHandler,
				isInviteToEditButtonSelected,
				inviteToEditComponent,
			}) => {
				return (
					<AvatarsWithPluginState
						featureFlags={api?.featureFlags?.sharedState.currentState() ?? {}}
						editorAnalyticsAPI={api?.analytics?.actions}
						editorAPI={api}
						inviteToEditHandler={inviteToEditHandler}
						isInviteToEditButtonSelected={isInviteToEditButtonSelected}
						inviteToEditComponent={inviteToEditComponent}
					/>
				);
			},
		},
	};
};
