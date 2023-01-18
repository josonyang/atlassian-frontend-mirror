import { MarkSpec } from 'prosemirror-model';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { ErrorReporter } from '@atlaskit/editor-common/utils';
import type { ErrorReportingHandler } from '@atlaskit/editor-common/utils';
import {
  EditorConfig,
  EditorPlugin,
  PluginsOptions,
  PMPluginCreateConfig,
} from '../types';
import { sortByOrder } from './sort-by-order';
import { InstrumentedPlugin } from '../utils/performance/instrumented-plugin';

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
          ...plugin.pmPlugins(
            plugin.name ? pluginsOptions[plugin.name] : undefined,
          ),
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
      primaryToolbarComponents: [],
      secondaryToolbarComponents: [],
      onEditorViewStateUpdatedCallbacks: [],
    },
  );
}

const TRACKING_DEFAULT = { enabled: false };

export function createPMPlugins(config: PMPluginCreateConfig): SafePlugin[] {
  const {
    editorConfig,
    performanceTracking = {},
    transactionTracker,
    featureFlags,
    dispatchAnalyticsEvent,
  } = config;
  const {
    uiTracking = TRACKING_DEFAULT,
    transactionTracking = TRACKING_DEFAULT,
  } = performanceTracking;
  const saferDispatchedTransactions = featureFlags.saferDispatchedTransactions;
  const saferDispatchedTransactionsAnalyticsOnly =
    featureFlags.saferDispatchedTransactionsAnalyticsOnly;

  const useInstrumentedPlugin =
    uiTracking.enabled ||
    transactionTracking.enabled ||
    saferDispatchedTransactions ||
    saferDispatchedTransactionsAnalyticsOnly;

  if (
    process.env.NODE_ENV === 'development' &&
    transactionTracking.enabled &&
    !transactionTracker
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      'createPMPlugins(): tracking is turned on but transactionTracker not defined! Transaction tracking has been disabled',
    );
  }

  const instrumentPlugin = useInstrumentedPlugin
    ? (plugin: SafePlugin): SafePlugin =>
        InstrumentedPlugin.fromPlugin(
          plugin,
          {
            uiTracking,
            transactionTracking,
            saferDispatchedTransactions,
            saferDispatchedTransactionsAnalyticsOnly,
            dispatchAnalyticsEvent,
          },
          transactionTracker,
        )
    : (plugin: SafePlugin): SafePlugin => plugin;

  return editorConfig.pmPlugins
    .sort(sortByOrder('plugins'))
    .map(({ plugin }) =>
      plugin({
        schema: config.schema,
        dispatch: config.dispatch,
        eventDispatcher: config.eventDispatcher,
        providerFactory: config.providerFactory,
        errorReporter: config.errorReporter,
        portalProviderAPI: config.portalProviderAPI,
        reactContext: config.reactContext,
        dispatchAnalyticsEvent: config.dispatchAnalyticsEvent,
        featureFlags: config.featureFlags || {},
        getIntl: config.getIntl,
      }),
    )
    .filter((plugin): plugin is SafePlugin => typeof plugin !== 'undefined')
    .map(instrumentPlugin);
}

export function createErrorReporter(
  errorReporterHandler?: ErrorReportingHandler,
) {
  const errorReporter = new ErrorReporter();
  if (errorReporterHandler) {
    errorReporter.handler = errorReporterHandler;
  }
  return errorReporter;
}
