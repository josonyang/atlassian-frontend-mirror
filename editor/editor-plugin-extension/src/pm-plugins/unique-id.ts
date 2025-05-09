import { uuid } from '@atlaskit/adf-schema';
import { SetAttrsStep } from '@atlaskit/adf-schema/steps';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { stepAddsOneOf } from '@atlaskit/editor-common/utils';
import { PluginKey } from '@atlaskit/editor-prosemirror/state';
import { fg } from '@atlaskit/platform-feature-flags';

const pluginKey = new PluginKey('extensionUniqueIdPlugin');

const createPlugin = () =>
	new SafePlugin({
		appendTransaction: (transactions, _oldState, newState) => {
			const tr = newState.tr;
			const selectionBookmark = tr.selection.getBookmark();
			let modified = false;
			const { extension, bodiedExtension, inlineExtension, multiBodiedExtension } =
				newState.schema.nodes;

			const extensionTypes = new Set([
				extension,
				bodiedExtension,
				inlineExtension,
				multiBodiedExtension,
			]);
			const idsObserved = new Set<string>();

			transactions.forEach((transaction) => {
				if (!transaction.docChanged) {
					return;
				}

				const isAddingExtension = transaction.steps.some(
					(step) =>
						stepAddsOneOf(step, extensionTypes) ||
						// There are instances where the localId will be reset to null on publish due to extension
						// not existing in the Storage format (eg. Legacy Content Extensions) or not having a localId
						// eslint-disable-next-line @atlaskit/platform/no-preconditioning
						(fg('platform_editor_update_extension_local_id_on_reset') &&
							step instanceof SetAttrsStep &&
							// @ts-expect-error Bad ProseMirror step types
							step.attrs?.localId === null),
				);
				if (isAddingExtension) {
					// Can't simply look at changed nodes, as we could be adding an extension
					newState.doc.descendants((node, pos) => {
						const localId = node.attrs.localId;

						// Dealing with an extension - make sure it's a unique ID
						if (!!node.type && extensionTypes.has(node.type)) {
							if (localId && !idsObserved.has(localId)) {
								idsObserved.add(localId);
								// Also add a localId if it happens to not have one,
							} else if (!localId || idsObserved.has(localId)) {
								modified = true;
								tr.setNodeMarkup(pos, undefined, {
									...node.attrs,
									localId: uuid.generate(),
								});
							}
							/**
							 * If it's a multiBodiedExtension or bodiedExtension, we'll need to keep digging;
							 * since we can have more extension nodes within the contents of that
							 */
							if ([multiBodiedExtension, bodiedExtension].includes(node.type)) {
								return true;
							}
							return false;
						}

						/**
						 * Otherwise continue traversing, we can encounter extensions nested in
						 * expands/bodiedExtensions
						 */
						return true;
					});
				}
			});

			if (modified) {
				// We want to restore to the original selection but w/o applying the mapping
				// @see https://github.com/ProseMirror/prosemirror/issues/645
				return tr.setSelection(selectionBookmark.resolve(tr.doc));
			}
			return;
		},
		key: pluginKey,
	});

export { createPlugin };
