import type { INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import type { QuickInsertItem } from '@atlaskit/editor-common/provider-factory';
import type {
	Command,
	QuickInsertSharedState as CommonQuickInsertSharedState,
	EditorCommand,
	NextEditorPlugin,
	OptionalPlugin,
	QuickInsertHandler,
	QuickInsertPluginOptions as CommonQuickInsertPluginOptions,
	QuickInsertSearchOptions,
	TypeAheadHandler,
} from '@atlaskit/editor-common/types';
import { type ConnectivityPlugin } from '@atlaskit/editor-plugin-connectivity';
import { type MetricsPlugin } from '@atlaskit/editor-plugin-metrics';
import type { TypeAheadInputMethod, TypeAheadPlugin } from '@atlaskit/editor-plugin-type-ahead';

export type QuickInsertSharedState = CommonQuickInsertSharedState & {
	typeAheadHandler: TypeAheadHandler;
};

export type QuickInsertPluginOptions = CommonQuickInsertPluginOptions;

export type QuickInsertPlugin = NextEditorPlugin<
	'quickInsert',
	{
		actions: {
			getSuggestions: (searchOptions: QuickInsertSearchOptions) => QuickInsertItem[];
			insertItem: (
				item: QuickInsertItem,
				source?: INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.TOOLBAR,
			) => Command;
			openTypeAhead: (
				inputMethod: TypeAheadInputMethod,
				removePrefixTriggerOnCancel?: boolean,
			) => boolean;
		};
		commands: {
			addQuickInsertItem: (item: QuickInsertHandler) => EditorCommand;
			openElementBrowserModal: EditorCommand;
		};
		dependencies: [
			TypeAheadPlugin,
			OptionalPlugin<ConnectivityPlugin>,
			OptionalPlugin<MetricsPlugin>,
		];
		pluginConfiguration: QuickInsertPluginOptions | undefined;
		sharedState: QuickInsertSharedState | null;
	}
>;
