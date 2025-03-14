import { ErrorReporter } from '@atlaskit/editor-common/error-reporter';
import type { ErrorReportingHandler } from '@atlaskit/editor-common/error-reporter';
import { sortByOrder } from '@atlaskit/editor-common/legacy-rank-plugins';
import { type SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { EditorPlugin, PluginsOptions } from '@atlaskit/editor-common/types';
import type { MarkSpec } from '@atlaskit/editor-prosemirror/model';

import type { EditorConfig, PMPluginCreateConfig } from '../types';

import { createEditorStateNotificationPlugin } from './editorStateNotificationPlugin';

export function sortByRank(a: { rank: number }, b: { rank: number }): number {
	return a.rank - b.rank;
}

export function fixExcludes(marks: { [key: string]: MarkSpec }): {
	[key: string]: MarkSpec;
} {
	const markKeys = Object.keys(marks);
	const markGroups = new Set(markKeys.map((mark) => marks[mark].group));

	markKeys.forEach((markKey) => {
		const mark = marks[markKey];
		if (mark.excludes) {
			mark.excludes = mark.excludes
				.split(' ')
				.filter((group) => markGroups.has(group))
				.join(' ');
		}
	});
	return marks;
}

export function processPluginsList(plugins: EditorPlugin[]): EditorConfig {
	/**
	 * First pass to collect pluginsOptions
	 */
	const pluginsOptions = plugins.reduce<PluginsOptions>((acc, plugin) => {
		if (plugin.pluginsOptions) {
			Object.keys(plugin.pluginsOptions).forEach((pluginName) => {
				if (!acc[pluginName]) {
					acc[pluginName] = [];
				}
				// Ignored via go/ees005
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				acc[pluginName].push(plugin.pluginsOptions![pluginName]);
			});
		}

		return acc;
	}, {});

	/**
	 * Process plugins
	 */
	return plugins.reduce<EditorConfig>(
		(acc, plugin) => {
			if (plugin.pmPlugins) {
				acc.pmPlugins.push(
					...plugin.pmPlugins(plugin.name ? pluginsOptions[plugin.name] : undefined),
				);
			}

			if (plugin.nodes) {
				acc.nodes.push(...plugin.nodes());
			}

			if (plugin.marks) {
				acc.marks.push(...plugin.marks());
			}

			if (plugin.contentComponent) {
				acc.contentComponents.push(plugin.contentComponent);
			}

			if (plugin.usePluginHook) {
				acc.pluginHooks.push(plugin.usePluginHook);
			}

			if (plugin.primaryToolbarComponent) {
				acc.primaryToolbarComponents.push(plugin.primaryToolbarComponent);
			}

			if (plugin.secondaryToolbarComponent) {
				acc.secondaryToolbarComponents.push(plugin.secondaryToolbarComponent);
			}

			if (plugin.onEditorViewStateUpdated) {
				acc.onEditorViewStateUpdatedCallbacks.push({
					pluginName: plugin.name,
					callback: plugin.onEditorViewStateUpdated,
				});
			}

			return acc;
		},
		{
			nodes: [],
			marks: [],
			pmPlugins: [],
			contentComponents: [],
			pluginHooks: [],
			primaryToolbarComponents: [],
			secondaryToolbarComponents: [],
			onEditorViewStateUpdatedCallbacks: [],
		},
	);
}

export function createPMPlugins(config: PMPluginCreateConfig): SafePlugin[] {
	const { editorConfig } = config;

	const pmPlugins = editorConfig.pmPlugins
		.sort(sortByOrder('plugins'))
		.map(({ plugin }) =>
			plugin({
				schema: config.schema,
				dispatch: config.dispatch,
				eventDispatcher: config.eventDispatcher,
				providerFactory: config.providerFactory,
				errorReporter: config.errorReporter,
				portalProviderAPI: config.portalProviderAPI,
				nodeViewPortalProviderAPI: config.nodeViewPortalProviderAPI,
				dispatchAnalyticsEvent: config.dispatchAnalyticsEvent,
				featureFlags: config.featureFlags || {},
				getIntl: config.getIntl,
			}),
		)
		.filter((plugin): plugin is SafePlugin => typeof plugin !== 'undefined');
	if (config.onEditorStateUpdated !== undefined) {
		return [
			createEditorStateNotificationPlugin(
				config.onEditorStateUpdated,
				config.editorConfig.onEditorViewStateUpdatedCallbacks,
			),
			...pmPlugins,
		];
	}
	return pmPlugins;
}

export function createErrorReporter(errorReporterHandler?: ErrorReportingHandler) {
	const errorReporter = new ErrorReporter();
	if (errorReporterHandler) {
		errorReporter.handler = errorReporterHandler;
	}
	return errorReporter;
}
