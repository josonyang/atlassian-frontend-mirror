import type { NextEditorPlugin, OptionalPlugin } from '@atlaskit/editor-common/types';
import type { EditorDisabledPlugin } from '@atlaskit/editor-plugin-editor-disabled';
import type { FocusPlugin } from '@atlaskit/editor-plugin-focus';
import type { TypeAheadPlugin } from '@atlaskit/editor-plugin-type-ahead';

export type ReleaseHiddenDecoration = () => boolean | undefined;

type SetCleanup = (cb: ReleaseHiddenDecoration | undefined) => void;
type CancelQueue = (() => void) | undefined;

export type SelectionMarkerPluginOptions = { hideCursorOnInit?: boolean };

/**
 * @private
 * @deprecated Use {@link SelectionMarkerPluginOptions} instead.
 * @see https://product-fabric.atlassian.net/browse/ED-27496
 */
export type SelectionMarkerPluginConfiguration = SelectionMarkerPluginOptions;

export type SelectionMarkerPlugin = NextEditorPlugin<
	'selectionMarker',
	{
		dependencies: [
			FocusPlugin,
			OptionalPlugin<TypeAheadPlugin>,
			OptionalPlugin<EditorDisabledPlugin>,
		];
		pluginConfiguration?: SelectionMarkerPluginOptions;
		sharedState: { isForcedHidden: boolean; isMarkerActive: boolean } | undefined;
		actions: {
			hideDecoration: () => ReleaseHiddenDecoration | undefined;
			queueHideDecoration: (setCleanup: SetCleanup) => CancelQueue;
		};
	}
>;
