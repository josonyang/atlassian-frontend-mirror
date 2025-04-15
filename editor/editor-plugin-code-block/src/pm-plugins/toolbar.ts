import { isCodeBlockWordWrapEnabled } from '@atlaskit/editor-common/code-block';
import commonMessages, { codeBlockButtonMessages } from '@atlaskit/editor-common/messages';
import type {
	Command,
	ExtractInjectionAPI,
	FloatingToolbarButton,
	FloatingToolbarHandler,
	FloatingToolbarListPicker,
	FloatingToolbarSeparator,
	SelectOption,
} from '@atlaskit/editor-common/types';
import { findDomRefAtPos } from '@atlaskit/editor-prosemirror/utils';
import DeleteIcon from '@atlaskit/icon/core/delete';
import CopyIcon from '@atlaskit/icon/core/migration/copy';
import RemoveIcon from '@atlaskit/icon/core/migration/delete--editor-remove';
import TextWrapIcon from '@atlaskit/icon/core/text-wrap';
import { fg } from '@atlaskit/platform-feature-flags';

import {
	changeLanguage,
	copyContentToClipboard,
	removeCodeBlock,
	resetCopiedState,
	toggleWordWrapStateForCodeBlockNode,
} from '../editor-commands';
import type { CodeBlockPlugin } from '../index';
import { WrapIcon } from '../ui/icons/WrapIcon';

import {
	provideVisualFeedbackForCopyButton,
	removeVisualFeedbackForCopyButton,
} from './codeBlockCopySelectionPlugin';
import {
	createLanguageList,
	DEFAULT_LANGUAGES,
	getLanguageIdentifier,
	Language,
} from './language-list';
import type { CodeBlockState } from './main-state';
import { pluginKey } from './plugin-key';

export const getToolbarConfig =
	(
		allowCopyToClipboard: boolean = false,
		api: ExtractInjectionAPI<CodeBlockPlugin> | undefined,
		overrideLanguageName: ((name: Language['name']) => string) | undefined = undefined,
	): FloatingToolbarHandler =>
	(state, { formatMessage }) => {
		const { hoverDecoration } = api?.decorations?.actions ?? {};
		const editorAnalyticsAPI = api?.analytics?.actions;

		const codeBlockState: CodeBlockState | undefined = pluginKey.getState(state);
		const pos = codeBlockState?.pos ?? null;

		if (!codeBlockState || pos === null) {
			return;
		}

		const node = state.doc.nodeAt(pos);
		const nodeType = state.schema.nodes.codeBlock;

		if (node?.type !== nodeType) {
			return;
		}
		const isWrapped = isCodeBlockWordWrapEnabled(node);
		const language = node?.attrs?.language;

		const languageList = createLanguageList(
			overrideLanguageName
				? DEFAULT_LANGUAGES.map(
						(language) =>
							({
								...language,
								name: overrideLanguageName(language.name),
							}) as Language,
					)
				: DEFAULT_LANGUAGES,
		);

		const options = languageList.map((lang) => ({
			label: lang.name,
			value: getLanguageIdentifier(lang),
			alias: lang.alias,
		}));

		// If language is not undefined search for it in the value and then search in the aliases
		const defaultValue = language
			? options.find((option) => option.value === language) ||
				options.find((option) => option.alias.includes(language as never))
			: null;

		const languageSelect: FloatingToolbarListPicker<Command> = {
			id: 'editor.codeBlock.languageOptions',
			type: 'select',
			selectType: 'list',
			onChange: (option) => changeLanguage(editorAnalyticsAPI)(option.value),
			defaultValue,
			placeholder: formatMessage(codeBlockButtonMessages.selectLanguage),
			options,
			filterOption: languageListFilter,
		};

		const separator: FloatingToolbarSeparator = {
			type: 'separator',
		};

		const copyToClipboardItems = !allowCopyToClipboard
			? []
			: ([
					{
						id: 'editor.codeBlock.copy',
						type: 'button',
						supportsViewMode: true,
						appearance: 'subtle',
						icon: CopyIcon,
						// note: copyContentToClipboard contains logic that also removes the
						// visual feedback for the copy button
						onClick: copyContentToClipboard,
						title: formatMessage(
							codeBlockState.contentCopied
								? codeBlockButtonMessages.copiedCodeToClipboard
								: codeBlockButtonMessages.copyCodeToClipboard,
						),
						onMouseEnter: provideVisualFeedbackForCopyButton,
						// note: resetCopiedState contains logic that also removes the
						// visual feedback for the copy button
						onMouseLeave: resetCopiedState,
						onFocus: provideVisualFeedbackForCopyButton,
						onBlur: removeVisualFeedbackForCopyButton,
						hideTooltipOnClick: false,
						disabled: codeBlockState.isNodeSelected,
						tabIndex: null,
					},
					separator,
				] as const);

		const deleteButton: FloatingToolbarButton<Command> = {
			id: 'editor.codeBlock.delete',
			type: 'button',
			appearance: 'danger',
			icon: DeleteIcon,
			iconFallback: RemoveIcon,
			onMouseEnter: hoverDecoration?.(nodeType, true),
			onMouseLeave: hoverDecoration?.(nodeType, false),
			onFocus: hoverDecoration?.(nodeType, true),
			onBlur: hoverDecoration?.(nodeType, false),
			onClick: removeCodeBlock,
			title: formatMessage(commonMessages.remove),
			tabIndex: null,
		};

		const codeBlockWrapButton: FloatingToolbarButton<Command> = {
			id: 'editor.codeBlock.wrap',
			type: 'button',
			supportsViewMode: true,
			icon: TextWrapIcon,
			iconFallback: WrapIcon,
			onClick: toggleWordWrapStateForCodeBlockNode(editorAnalyticsAPI),
			title: fg('editor_a11y_remove_unwrap_button')
				? formatMessage(codeBlockButtonMessages.wrapCode)
				: isWrapped
					? formatMessage(codeBlockButtonMessages.unwrapCode)
					: formatMessage(codeBlockButtonMessages.wrapCode),
			tabIndex: null,
			selected: isWrapped,
		};

		return {
			title: 'CodeBlock floating controls',
			// Ignored via go/ees005
			// eslint-disable-next-line @atlaskit/editor/no-as-casting
			getDomRef: (view) => findDomRefAtPos(pos, view.domAtPos.bind(view)) as HTMLElement,
			nodeType,
			items: [
				languageSelect,
				separator,
				codeBlockWrapButton,
				separator,
				...copyToClipboardItems,
				deleteButton,
			],
			scrollable: true,
		};
	};

/**
 * Filters language list based on both name and alias properties.
 */
export const languageListFilter = (option: SelectOption, rawInput: string) => {
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { data } = option as any;
	const searchString = rawInput.toLowerCase();
	return (
		data.label.toLowerCase().includes(searchString) ||
		data.alias.some((alias: string) => alias.toLowerCase() === searchString)
	);
};
