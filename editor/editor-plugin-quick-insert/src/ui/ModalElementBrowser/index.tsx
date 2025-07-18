import React, { useCallback } from 'react';

import type { INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import {
	useSharedPluginState,
	sharedPluginStateHookMigratorFactory,
	useSharedPluginStateWithSelector,
} from '@atlaskit/editor-common/hooks';
import type { QuickInsertItem } from '@atlaskit/editor-common/provider-factory';
import type {
	Command,
	ExtractInjectionAPI,
	QuickInsertSearchOptions,
	QuickInsertSharedState,
} from '@atlaskit/editor-common/types';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';

import { closeElementBrowserModal } from '../../pm-plugins/commands';
import type { QuickInsertPlugin } from '../../quickInsertPluginType';

import ModalElementBrowser from './ModalElementBrowser';

type Props = {
	editorView: EditorView;
	helpUrl: string | undefined;
	pluginInjectionAPI: ExtractInjectionAPI<QuickInsertPlugin> | undefined;
};

const Modal = ({
	quickInsertState,
	isOffline,
	editorView,
	helpUrl,
	insertItem,
	getSuggestions,
	api,
}: {
	editorView: EditorView;
	quickInsertState: {
		lazyDefaultItems?: QuickInsertSharedState['lazyDefaultItems'];
		providedItems?: QuickInsertSharedState['providedItems'];
		isElementBrowserModalOpen?: QuickInsertSharedState['isElementBrowserModalOpen'];
		emptyStateHandler?: QuickInsertSharedState['emptyStateHandler'];
	};
	isOffline: boolean;
	api: ExtractInjectionAPI<QuickInsertPlugin> | undefined;
	helpUrl?: string;
	insertItem?: (
		item: QuickInsertItem,
		source?: INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.TOOLBAR,
	) => Command;
	getSuggestions?: (searchOptions: QuickInsertSearchOptions) => QuickInsertItem[];
}) => {
	const getItems = useCallback(
		(query?: string, category?: string) =>
			getSuggestions?.({
				query,
				category,
			})?.map((item) => {
				return isOffline && item.isDisabledOffline ? { ...item, isDisabled: true } : item;
			}) ?? [],
		// See: https://stash.atlassian.com/projects/ATLASSIAN/repos/atlassian-frontend-monorepo/pull-requests/157796/overview?commentId=8559952
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[getSuggestions, quickInsertState.lazyDefaultItems, quickInsertState.providedItems, isOffline],
	);

	const focusInEditor = useCallback(() => {
		if (!editorView.hasFocus()) {
			editorView.focus();
		}
	}, [editorView]);

	// ED-19408 We not store the item ref in the state
	// Instead of adding the item immediately on insert item
	// We wait until modal close is complete, refocus the editor and then add the item
	const insertableItem = React.useRef<QuickInsertItem | null>(null);
	const onInsertItem = useCallback(
		(item: QuickInsertItem) => {
			closeElementBrowserModal()(editorView.state, editorView.dispatch);
			if (fg('platform_editor_ease_of_use_metrics')) {
				api?.core.actions.execute(api?.metrics?.commands.startActiveSessionTimer());
			}
			insertableItem.current = item;
		},
		[editorView, api],
	);

	const onClose = useCallback(() => {
		closeElementBrowserModal()(editorView.state, editorView.dispatch);
		if (fg('platform_editor_ease_of_use_metrics')) {
			api?.core.actions.execute(api?.metrics?.commands.startActiveSessionTimer());
		}
		focusInEditor();
	}, [editorView, focusInEditor, api]);

	const onCloseComplete = useCallback(() => {
		if (!insertableItem.current) {
			focusInEditor();
			return;
		}

		const item = insertableItem.current;
		insertableItem.current = null;

		focusInEditor();

		insertItem?.(item)(editorView.state, editorView.dispatch);
	}, [editorView, focusInEditor, insertItem]);

	return (
		<ModalElementBrowser
			getItems={getItems}
			onInsertItem={onInsertItem}
			helpUrl={helpUrl}
			isOpen={quickInsertState.isElementBrowserModalOpen || false}
			emptyStateHandler={quickInsertState.emptyStateHandler}
			onClose={onClose}
			onCloseComplete={onCloseComplete}
			shouldReturnFocus={false}
		/>
	);
};

const useSharedState = sharedPluginStateHookMigratorFactory(
	(api: ExtractInjectionAPI<QuickInsertPlugin> | undefined) => {
		const { lazyDefaultItems, providedItems, isElementBrowserModalOpen, emptyStateHandler, mode } =
			useSharedPluginStateWithSelector(api, ['quickInsert', 'connectivity'], (state) => ({
				lazyDefaultItems: state.quickInsertState?.lazyDefaultItems,
				providedItems: state.quickInsertState?.providedItems,
				isElementBrowserModalOpen: state.quickInsertState?.isElementBrowserModalOpen,
				emptyStateHandler: state.quickInsertState?.emptyStateHandler,
				mode: state.connectivityState?.mode,
			}));
		return {
			mode,
			lazyDefaultItems,
			providedItems,
			isElementBrowserModalOpen,
			emptyStateHandler,
		};
	},
	(api: ExtractInjectionAPI<QuickInsertPlugin> | undefined) => {
		const { quickInsertState, connectivityState } = useSharedPluginState(api, [
			'quickInsert',
			'connectivity',
		]);
		return {
			lazyDefaultItems: quickInsertState?.lazyDefaultItems,
			providedItems: quickInsertState?.providedItems,
			isElementBrowserModalOpen: quickInsertState?.isElementBrowserModalOpen,
			emptyStateHandler: quickInsertState?.emptyStateHandler,
			mode: connectivityState?.mode,
		};
	},
);

export default ({ editorView, helpUrl, pluginInjectionAPI }: Props) => {
	const { lazyDefaultItems, providedItems, isElementBrowserModalOpen, emptyStateHandler, mode } =
		useSharedState(pluginInjectionAPI);

	return (
		<Modal
			quickInsertState={{
				lazyDefaultItems,
				providedItems,
				isElementBrowserModalOpen,
				emptyStateHandler,
			}}
			editorView={editorView}
			helpUrl={helpUrl}
			isOffline={mode === 'offline'}
			insertItem={pluginInjectionAPI?.quickInsert?.actions?.insertItem}
			getSuggestions={pluginInjectionAPI?.quickInsert?.actions?.getSuggestions}
			api={pluginInjectionAPI}
		/>
	);
};
