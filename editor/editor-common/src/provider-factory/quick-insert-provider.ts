import type { Node } from '@atlaskit/editor-prosemirror/model';
import type { EditorState, Transaction } from '@atlaskit/editor-prosemirror/state';

import type { INPUT_METHOD } from '../analytics/types/enums';
import type { TypeAheadItem } from '../types/type-ahead';

export type QuickInsertActionInsert = (
	node?: Node | Record<string, any> | string,
	opts?: { selectInlineNode?: boolean },
) => Transaction;

export type QuickInsertItemId =
	| 'hyperlink'
	| 'table'
	| 'helpdialog'
	| 'date'
	| 'media'
	| 'blockquote'
	| 'heading1'
	| 'heading2'
	| 'heading3'
	| 'heading4'
	| 'heading5'
	| 'heading6'
	| 'codeblock'
	| 'unorderedList'
	| 'feedbackdialog'
	| 'orderedList'
	| 'rule'
	| 'status'
	| 'mention'
	| 'emoji'
	| 'action'
	| 'decision'
	| 'infopanel'
	| 'notepanel'
	| 'successpanel'
	| 'warningpanel'
	| 'errorpanel'
	| 'custompanel'
	| 'layout'
	| 'expand'
	| 'placeholderText'
	| 'datasource'
	| 'loom';

export type QuickInsertItem = TypeAheadItem & {
	/** other names used to find the item */
	keywords?: Array<string>;
	/** categories where to find the item */
	categories?: Array<string>;
	/** optional sorting priority */
	priority?: number;
	/** optional identifier */
	id?: QuickInsertItemId;
	/** indicates if the item will be highlighted where appropriate (plus menu for now) */
	featured?: boolean;
	/**
	 * What to do on insert
	 *
	 * @note This logic is only called if the item is accessed without a search
	 * If a search occurs -- then a separate insert action is called
	 * @see packages/editor/editor-core/src/plugins/insert-block/ui/ToolbarInsertBlock/index.tsx for details
	 */
	action: (
		insert: QuickInsertActionInsert,
		state: EditorState,
		source?: INPUT_METHOD.TOOLBAR | INPUT_METHOD.QUICK_INSERT,
	) => Transaction | false;
};

export type QuickInsertProvider = {
	getItems: () => Promise<Array<QuickInsertItem>>;
};
