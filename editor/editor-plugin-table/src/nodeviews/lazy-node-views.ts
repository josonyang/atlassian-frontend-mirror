import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import type { EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import { withLazyLoading } from '@atlaskit/editor-common/lazy-node-view';
import type { PortalProviderAPI } from '@atlaskit/editor-common/portal';
import type { GetEditorContainerWidth, GetEditorFeatureFlags } from '@atlaskit/editor-common/types';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { Decoration, EditorView } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import type { PluginInjectionAPI } from '../types';

// TODO: ED-23976 - Clean up
import { createTableView } from './table';
import TableCell from './TableCell';
import TableRow from './TableRow';

type TableViewOptions = {
	portalProviderAPI: PortalProviderAPI;
	eventDispatcher: EventDispatcher;
	getEditorContainerWidth: GetEditorContainerWidth;
	getEditorFeatureFlags: GetEditorFeatureFlags;
	dispatchAnalyticsEvent: DispatchAnalyticsEvent;
	pluginInjectionApi?: PluginInjectionAPI;
	isCommentEditor?: boolean;
	isChromelessEditor?: boolean;
};

export const lazyTableView = (options: TableViewOptions) => {
	// LNV tables are broken in concurrent mode - temporarily disable to unblock concurrent mode
	if (
		editorExperiment('platform_editor_exp_lazy_node_views', false) ||
		fg('platform_editor_disable_table_lnv')
	) {
		return (node: PMNode, view: EditorView, getPos: () => number | undefined) => {
			return createTableView(
				node,
				view,
				getPos,
				options.portalProviderAPI,
				options.eventDispatcher,
				options.getEditorContainerWidth,
				options.getEditorFeatureFlags,
				options.dispatchAnalyticsEvent,
				options.pluginInjectionApi,
				options.isCommentEditor,
				options.isChromelessEditor,
			);
		};
	}

	const loader = () => {
		const result = import(
			/* webpackChunkName: "@atlaskit-internal_editor-plugin-table_nodeview" */
			'./table'
		).then(({ createTableView }) => {
			return (
				node: PMNode,
				view: EditorView,
				getPos: () => number | undefined,
				decorations: readonly Decoration[],
				getNodeViewOptions: () => TableViewOptions,
			) => {
				const {
					portalProviderAPI,
					eventDispatcher,
					getEditorContainerWidth,
					getEditorFeatureFlags,
					dispatchAnalyticsEvent,
					pluginInjectionApi,
					isCommentEditor,
					isChromelessEditor,
				} = getNodeViewOptions();

				return createTableView(
					node,
					view,
					getPos,
					portalProviderAPI,
					eventDispatcher,
					getEditorContainerWidth,
					getEditorFeatureFlags,
					dispatchAnalyticsEvent,
					pluginInjectionApi,
					isCommentEditor,
					isChromelessEditor,
				);
			};
		});

		return result;
	};
	return withLazyLoading({
		nodeName: 'table',
		getNodeViewOptions: () => options,
		loader,
	});
};

type TableCellViewOptions = {
	eventDispatcher: EventDispatcher;
	pluginInjectionApi?: PluginInjectionAPI;
};
export const lazyTableCellView = (options: TableCellViewOptions) => {
	// LNV tables are broken in concurrent mode - temporarily disable to unblock concurrent mode
	if (
		editorExperiment('platform_editor_exp_lazy_node_views', false) ||
		fg('platform_editor_disable_table_lnv')
	) {
		return (node: PMNode, view: EditorView, getPos: () => number | undefined) => {
			return new TableCell(
				node,
				view,
				getPos,
				options.eventDispatcher,
				options.pluginInjectionApi?.analytics?.actions,
			);
		};
	}

	const loader = () => {
		const result = import(
			/* webpackChunkName: "@atlaskit-internal_editor-plugin-table_nodeview" */
			'./TableCell'
		).then(({ default: TableCell }) => {
			return (
				node: PMNode,
				view: EditorView,
				getPos: () => number | undefined,
				decorations: readonly Decoration[],
				getNodeViewOptions: () => TableCellViewOptions,
			) => {
				const { eventDispatcher, pluginInjectionApi } = getNodeViewOptions();

				return new TableCell(
					node,
					view,
					getPos,
					eventDispatcher,
					pluginInjectionApi?.analytics?.actions,
				);
			};
		});

		return result;
	};

	return withLazyLoading({
		nodeName: 'tableCell',
		getNodeViewOptions: () => options,
		loader,
	});
};

export const lazyTableHeaderView = (options: TableCellViewOptions) => {
	// LNV tables are broken in concurrent mode - temporarily disable to unblock concurrent mode
	if (
		editorExperiment('platform_editor_exp_lazy_node_views', false) ||
		fg('platform_editor_disable_table_lnv')
	) {
		return (node: PMNode, view: EditorView, getPos: () => number | undefined) => {
			return new TableCell(
				node,
				view,
				getPos,
				options.eventDispatcher,
				options.pluginInjectionApi?.analytics?.actions,
			);
		};
	}

	const loader = () => {
		const result = import(
			/* webpackChunkName: "@atlaskit-internal_editor-plugin-table-cell_nodeview" */
			'./TableCell'
		).then(({ default: TableCell }) => {
			return (
				node: PMNode,
				view: EditorView,
				getPos: () => number | undefined,
				decorations: readonly Decoration[],
				getNodeViewOptions: () => TableCellViewOptions,
			) => {
				const { eventDispatcher, pluginInjectionApi } = getNodeViewOptions();

				return new TableCell(
					node,
					view,
					getPos,
					eventDispatcher,
					pluginInjectionApi?.analytics?.actions,
				);
			};
		});

		return result;
	};

	return withLazyLoading({
		nodeName: 'tableHeader',
		getNodeViewOptions: () => options,
		loader,
	});
};

export const lazyTableRowView = (options: TableCellViewOptions) => {
	// LNV tables are broken in concurrent mode - temporarily disable to unblock concurrent mode
	if (
		editorExperiment('platform_editor_exp_lazy_node_views', false) ||
		fg('platform_editor_disable_table_lnv')
	) {
		return (node: PMNode, view: EditorView, getPos: () => number | undefined) => {
			return new TableRow(node, view, getPos, options.eventDispatcher);
		};
	}

	const loader = () => {
		const result = import(
			/* webpackChunkName: "@atlaskit-internal_editor-plugin-table-row_nodeview" */
			'./TableRow'
		).then(({ default: TableRow }) => {
			return (
				node: PMNode,
				view: EditorView,
				getPos: () => number | undefined,
				decorations: readonly Decoration[],
				getNodeViewOptions: () => TableCellViewOptions,
			) => {
				const { eventDispatcher } = getNodeViewOptions();

				return new TableRow(node, view, getPos, eventDispatcher);
			};
		});

		return result;
	};
	return withLazyLoading({
		nodeName: 'tableRow',
		getNodeViewOptions: () => options,
		loader,
	});
};
