import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import type { MacroProvider } from '@atlaskit/editor-common/provider-factory';
import type {
	Command,
	EditorActionsOptions as EditorActions,
	EditorAppearance,
	ExtractInjectionAPI,
	ImageUploadPluginReferenceEvent,
} from '@atlaskit/editor-common/types';
import type { MenuItem } from '@atlaskit/editor-common/ui-menu';
import type { BlockType } from '@atlaskit/editor-plugin-block-type';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import type { EmojiProvider } from '@atlaskit/emoji';

import type { InsertBlockPlugin } from '../../index';

import type { BlockMenuItem } from './create-items';

export interface Props {
	buttons: number;
	showElementBrowser: boolean;
	isReducedSpacing: boolean;
	isDisabled?: boolean;
	isTypeAheadAllowed?: boolean;
	editorView: EditorView;
	editorActions?: EditorActions;
	tableSupported?: boolean;
	tableSelectorSupported?: boolean;
	actionSupported?: boolean;
	decisionSupported?: boolean;
	mentionsSupported?: boolean;
	mediaUploadsEnabled?: boolean;
	mediaSupported?: boolean;
	isEditorOffline?: boolean;
	imageUploadSupported?: boolean;
	imageUploadEnabled?: boolean;
	handleImageUpload?: (event?: ImageUploadPluginReferenceEvent) => Command;
	dateEnabled?: boolean;
	horizontalRuleEnabled?: boolean;
	placeholderTextEnabled?: boolean;
	layoutSectionEnabled?: boolean;
	expandEnabled?: boolean;
	emojiProvider?: Promise<EmojiProvider>;
	availableWrapperBlockTypes?: BlockType[];
	linkSupported?: boolean;
	linkDisabled?: boolean;
	emojiDisabled?: boolean;
	nativeStatusSupported?: boolean;
	popupsMountPoint?: HTMLElement;
	popupsBoundariesElement?: HTMLElement;
	popupsScrollableElement?: HTMLElement;
	insertMenuItems?: MenuItem[];
	showElementBrowserLink?: boolean;
	showSeparator?: boolean;
	onShowMediaPicker?: (mountInfo?: { ref: HTMLElement; mountPoint: HTMLElement }) => void;
	onInsertBlockType?: (name: string) => Command;
	onInsertMacroFromMacroBrowser?: (
		macroProvider: MacroProvider,
		node?: PMNode,
		isEditing?: boolean,
	) => (view: EditorView) => void;
	dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
	pluginInjectionApi: ExtractInjectionAPI<InsertBlockPlugin> | undefined;
	mentionsDisabled?: boolean;
	editorAppearance?: EditorAppearance;
}

export interface State {
	isPlusMenuOpen: boolean;
	emojiPickerOpen: boolean;
	buttons: BlockMenuItem[];
	dropdownItems: BlockMenuItem[];
	isOpenedByKeyboard: boolean;
	isTableSelectorOpen: boolean;
	isTableSelectorOpenedByKeyboard: boolean;
}
