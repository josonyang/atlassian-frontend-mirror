import type { InputMethodInsertMedia } from '@atlaskit/editor-common/analytics';
import type { Providers } from '@atlaskit/editor-common/provider-factory';
import type {
	NextEditorPlugin,
	OptionalPlugin,
	UiComponentFactoryParams,
} from '@atlaskit/editor-common/types';
import { type ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type { AnalyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import type { MediaPlugin } from '@atlaskit/editor-plugin-media';
import { type MediaState } from '@atlaskit/editor-plugin-media/types';

export type MediaInsertPluginState = {
	isOpen?: boolean;
};

export type InsertMediaSingle = (props: {
	mediaState: MediaState;
	inputMethod: InputMethodInsertMedia;
}) => boolean;

export type MediaInsertPlugin = NextEditorPlugin<
	'mediaInsert',
	{
		dependencies: [OptionalPlugin<AnalyticsPlugin>, MediaPlugin];
		sharedState: MediaInsertPluginState;
	}
>;

export type InsertExternalMediaSingle = (props: {
	url: string;
	alt: string;
	inputMethod: InputMethodInsertMedia;
}) => boolean;

export type MediaInsertPickerProps = Pick<
	UiComponentFactoryParams,
	| 'editorView'
	| 'dispatchAnalyticsEvent'
	| 'popupsMountPoint'
	| 'popupsBoundariesElement'
	| 'popupsScrollableElement'
> & {
	api?: ExtractInjectionAPI<MediaInsertPlugin>;
	closeMediaInsertPicker: () => void;
	mediaProvider?: Providers['mediaProvider'];
	insertMediaSingle: InsertMediaSingle;
	insertExternalMediaSingle: InsertExternalMediaSingle;
};
