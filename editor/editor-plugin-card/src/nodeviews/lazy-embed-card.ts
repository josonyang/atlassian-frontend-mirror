import { withLazyLoading, type NodeViewConstructor } from '@atlaskit/editor-common/lazy-node-view';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import { embedCardNodeView, type EmbedCardNodeViewProperties } from './embedCard';

export const lazyEmbedCardView: (props: EmbedCardNodeViewProperties) => NodeViewConstructor = (
	props: EmbedCardNodeViewProperties,
) => {
	if (
		editorExperiment('platform_editor_exp_lazy_node_views', false) ||
		editorExperiment('platform_editor_exp_disable_lnv', true, { exposure: true })
	) {
		return embedCardNodeView(props);
	}

	return withLazyLoading({
		nodeName: 'embedCard',
		getNodeViewOptions: () => {},
		loader: () => {
			const result = import(
				/* webpackChunkName: "@atlaskit-internal_editor-plugin-embed-card-item-nodeview" */
				'./embedCard'
			).then(({ embedCardNodeView }) => {
				return embedCardNodeView(props);
			});
			return result;
		},
	});
};
