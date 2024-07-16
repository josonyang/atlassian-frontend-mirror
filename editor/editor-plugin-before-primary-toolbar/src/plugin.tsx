import React from 'react';

import type {
	NextEditorPlugin,
	OptionalPlugin,
	ToolbarUIComponentFactory,
} from '@atlaskit/editor-common/types';
import type { PrimaryToolbarPlugin } from '@atlaskit/editor-plugin-primary-toolbar';

import type { ReactComponents } from './types';
import { BeforePrimaryToolbarWrapper } from './ui/BeforePrimaryToolbarWrapper';

type Config = {
	beforePrimaryToolbarComponents?: ReactComponents;
};

export type BeforePrimaryToolbarPlugin = NextEditorPlugin<
	'beforePrimaryToolbar',
	{
		pluginConfiguration: Config;
		dependencies: [OptionalPlugin<PrimaryToolbarPlugin>];
	}
>;

export const beforePrimaryToolbarPlugin: BeforePrimaryToolbarPlugin = ({ api, config: props }) => {
	const primaryToolbarComponent: ToolbarUIComponentFactory = () => {
		return (
			<BeforePrimaryToolbarWrapper
				beforePrimaryToolbarComponents={props?.beforePrimaryToolbarComponents}
			/>
		);
	};

	return {
		name: 'beforePrimaryToolbar',

		usePluginHook: () => {
			api?.core?.actions.execute(
				api?.primaryToolbar?.commands.registerComponent({
					name: 'beforePrimaryToolbar',
					component: primaryToolbarComponent,
				}),
			);
		},

		primaryToolbarComponent: !api?.primaryToolbar ? primaryToolbarComponent : undefined,
	};
};
