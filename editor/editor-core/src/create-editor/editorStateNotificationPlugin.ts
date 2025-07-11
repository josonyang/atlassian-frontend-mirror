import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import {
	PluginKey,
	type ReadonlyTransaction,
	type Transaction,
	type EditorState,
} from '@atlaskit/editor-prosemirror/state';
import { fg } from '@atlaskit/platform-feature-flags';

import { type EditorViewStateUpdatedCallbackProps } from '../types/editor-config';

const key = new PluginKey<EditorStateNotificationPluginState>('editorStateNotificationPlugin');

export type EditorStateNotificationPluginState = {
	latestTransaction: ReadonlyTransaction | undefined;
};

export const createEditorStateNotificationPlugin = (
	onEditorStateUpdated: (props: {
		oldEditorState: EditorState;
		newEditorState: EditorState;
	}) => void,
	onEditorViewStateUpdatedCallbacks: Array<{
		pluginName: string;
		callback: (props: EditorViewStateUpdatedCallbackProps) => void;
	}>,
) => {
	let transactions: ReadonlyTransaction[] = [];
	return new SafePlugin<EditorStateNotificationPluginState>({
		key: key,
		state: {
			init() {
				return {
					latestTransaction: undefined,
				};
			},
			apply(tr) {
				transactions.push(tr);
				return {
					latestTransaction: tr,
				};
			},
		},
		view: () => {
			return {
				update: (view, oldEditorState) => {
					const originalTransaction = key.getState(view.state)
						?.latestTransaction as unknown as Readonly<Transaction>;

					if (originalTransaction && fg('platform_editor_migrate_state_updates')) {
						onEditorViewStateUpdatedCallbacks.forEach((entry) => {
							entry.callback({
								originalTransaction,
								transactions: transactions as unknown as readonly Transaction[],
								oldEditorState,
								newEditorState: view.state,
							});
						});
						transactions = [];
					}
					onEditorStateUpdated({ oldEditorState, newEditorState: view.state });
				},
			};
		},
	});
};
