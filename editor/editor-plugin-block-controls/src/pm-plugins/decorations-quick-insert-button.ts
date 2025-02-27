import { createElement } from 'react';

import { type IntlShape } from 'react-intl-next';
import uuid from 'uuid';

import type { PortalProviderAPI } from '@atlaskit/editor-common/portal';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { Decoration, type DecorationSet } from '@atlaskit/editor-prosemirror/view';

import type { BlockControlsPlugin } from '../blockControlsPluginType';
import { TypeAheadControl } from '../ui/quick-insert-button';

const TYPE_QUICK_INSERT = 'INSERT_BUTTON';

export const findQuickInsertInsertButtonDecoration = (
	decorations: DecorationSet,
	from?: number,
	to?: number,
) => {
	return decorations.find(from, to, (spec) => spec.type === TYPE_QUICK_INSERT);
};

export const quickInsertButtonDecoration = (
	api: ExtractInjectionAPI<BlockControlsPlugin>,
	formatMessage: IntlShape['formatMessage'],
	rootPos: number,
	anchorName: string,
	nodeType: string,
	nodeViewPortalProviderAPI: PortalProviderAPI,
	rootAnchorName?: string,
	rootNodeType?: string,
) => {
	const key = uuid();

	return Decoration.widget(
		rootPos,
		(view, getPos) => {
			const element = document.createElement('span');
			element.contentEditable = 'false';

			nodeViewPortalProviderAPI.render(
				() =>
					createElement(TypeAheadControl, {
						api,
						getPos,
						formatMessage,
						view,
						nodeType,
						anchorName,
						rootAnchorName,
						rootNodeType: rootNodeType ?? nodeType,
					}),
				element,
				key,
			);

			return element;
		},
		{
			side: -1,
			type: TYPE_QUICK_INSERT,
		},
	);
};
