import type { BreakoutMarkAttrs } from '@atlaskit/adf-schema';
import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import type { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import type { ReplaceRawValue, Transformer } from '@atlaskit/editor-common/types';
import { processRawValue } from '@atlaskit/editor-common/utils';
import type { Node, Schema } from '@atlaskit/editor-prosemirror/model';
import { Fragment } from '@atlaskit/editor-prosemirror/model';

import { getBreakoutMode } from './node-width';

export function processRawFragmentValue(
	schema: Schema,
	value?: ReplaceRawValue[],
	providerFactory?: ProviderFactory,
	sanitizePrivateContent?: boolean,
	contentTransformer?: Transformer<string>,
	dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
): Fragment | undefined {
	if (!value) {
		return;
	}

	const adfEntities = value
		.map((item) =>
			processRawValue(
				schema,
				item,
				providerFactory,
				sanitizePrivateContent,
				contentTransformer,
				dispatchAnalyticsEvent,
			),
		)
		.filter((item) => Boolean(item)) as Node[];

	if (adfEntities.length === 0) {
		return;
	}

	return Fragment.from(adfEntities);
}

export function getNodesCount(node: Node): Record<string, number> {
	let count: Record<string, number> = {};

	node.nodesBetween(0, node.nodeSize - 2, (node) => {
		count[node.type.name] = (count[node.type.name] || 0) + 1;
	});

	return count;
}

/**
 * Returns a set of active child breakout modes
 */
export function getChildBreakoutModes(
	doc: Node,
	schema: Schema,
	filter: BreakoutMarkAttrs['mode'][] = ['wide', 'full-width'],
): BreakoutMarkAttrs['mode'][] {
	const breakoutModes = new Set<string>();

	if (doc.type.name === 'doc' && doc.childCount) {
		for (let i = 0; i < doc.childCount; ++i) {
			if (breakoutModes.size === filter.length) {
				break;
			}

			const breakoutMode = getBreakoutMode(doc.child(i), schema.marks.breakout);
			if (breakoutMode && filter.includes(breakoutMode)) {
				breakoutModes.add(breakoutMode);
			}
		}
	}
	return [...breakoutModes] as BreakoutMarkAttrs['mode'][];
}
