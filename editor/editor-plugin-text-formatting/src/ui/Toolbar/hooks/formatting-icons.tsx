/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type JSXElementConstructor, type ReactElement, useMemo } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import type { MessageDescriptor, WrappedComponentProps } from 'react-intl-next';

import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import { TOOLBAR_ACTION_SUBJECT_ID } from '@atlaskit/editor-common/analytics';
import type { Keymap } from '@atlaskit/editor-common/keymaps';
import {
	getAriaKeyshortcuts,
	toggleBold,
	toggleCode,
	toggleItalic,
	toggleStrikethrough,
	toggleSubscript,
	toggleSuperscript,
	toggleUnderline,
	tooltip,
	ToolTipContent,
} from '@atlaskit/editor-common/keymaps';
import { toolbarMessages } from '@atlaskit/editor-common/messages';
import { editorCommandToPMCommand } from '@atlaskit/editor-common/preset';
import type {
	Command,
	EditorCommand,
	InputMethodToolbar,
	TextFormattingState,
} from '@atlaskit/editor-common/types';
import type { Schema } from '@atlaskit/editor-prosemirror/model';
import { shortcutStyle } from '@atlaskit/editor-shared-styles/shortcut';
import AngleBracketsIcon from '@atlaskit/icon/core/migration/angle-brackets--editor-code';
import BoldIcon from '@atlaskit/icon/core/migration/text-bold--editor-bold';
import ItalicIcon from '@atlaskit/icon/core/migration/text-italic--editor-italic';
import TextStrikethroughIcon from '@atlaskit/icon/core/text-strikethrough';
import UnderlineIcon from '@atlaskit/icon/core/text-underline';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import {
	toggleCodeWithAnalytics,
	toggleEmWithAnalytics,
	toggleStrikeWithAnalytics,
	toggleStrongWithAnalytics,
	toggleSubscriptWithAnalytics,
	toggleSuperscriptWithAnalytics,
	toggleUnderlineWithAnalytics,
} from '../../../pm-plugins/commands';
import { Subscript, Superscript } from '../icons';
import { getInputMethod } from '../input-method-utils';
import type { IconHookProps, MenuIconItem, MenuIconState } from '../types';
import { IconTypes, type ToolbarType } from '../types';

const withInputMethod = (
	toolbarType: ToolbarType,
	func: (inputMethod: InputMethodToolbar) => EditorCommand,
): Command => editorCommandToPMCommand(func(getInputMethod(toolbarType)));

type BuildIconProps = {
	isToolbarDisabled: boolean;
	textFormattingState: TextFormattingState | undefined;
	schema: Schema;
} & WrappedComponentProps;

type IconButtonType = {
	buttonId?: TOOLBAR_ACTION_SUBJECT_ID;
	message: MessageDescriptor;
	command: Command;
	tooltipKeymap?: Keymap;
	component?: () => ReactElement;
};

const IconButtons = (
	editorAnalyticsAPI: EditorAnalyticsAPI | undefined,
	toolbarType: ToolbarType,
): Record<IconTypes, IconButtonType> => ({
	strong: {
		buttonId: TOOLBAR_ACTION_SUBJECT_ID.TEXT_FORMATTING_STRONG,
		command: withInputMethod(toolbarType, toggleStrongWithAnalytics(editorAnalyticsAPI)),
		message: toolbarMessages.bold,
		tooltipKeymap: toggleBold,
		component: () => <BoldIcon color="currentColor" spacing="spacious" label="" />,
	},
	em: {
		buttonId: TOOLBAR_ACTION_SUBJECT_ID.TEXT_FORMATTING_ITALIC,
		command: withInputMethod(toolbarType, toggleEmWithAnalytics(editorAnalyticsAPI)),
		message: toolbarMessages.italic,
		tooltipKeymap: toggleItalic,
		component: () => <ItalicIcon color="currentColor" spacing="spacious" label="" />,
	},
	underline: {
		buttonId: TOOLBAR_ACTION_SUBJECT_ID.TEXT_FORMATTING_UNDERLINE,
		command: withInputMethod(toolbarType, toggleUnderlineWithAnalytics(editorAnalyticsAPI)),
		message: toolbarMessages.underline,
		tooltipKeymap: toggleUnderline,
		component: () => <UnderlineIcon color="currentColor" spacing="spacious" label="" />,
	},
	strike: {
		command: withInputMethod(toolbarType, toggleStrikeWithAnalytics(editorAnalyticsAPI)),
		message: toolbarMessages.strike,
		tooltipKeymap: toggleStrikethrough,
	},
	code: {
		command: withInputMethod(toolbarType, toggleCodeWithAnalytics(editorAnalyticsAPI)),
		message: toolbarMessages.code,
		tooltipKeymap: toggleCode,
	},
	subscript: {
		command: withInputMethod(toolbarType, toggleSubscriptWithAnalytics(editorAnalyticsAPI)),
		message: toolbarMessages.subscript,
		tooltipKeymap: toggleSubscript,
	},
	superscript: {
		command: withInputMethod(toolbarType, toggleSuperscriptWithAnalytics(editorAnalyticsAPI)),
		message: toolbarMessages.superscript,
		tooltipKeymap: toggleSuperscript,
	},
});

type IconBefore = {
	icon: ReactElement<unknown, string | JSXElementConstructor<unknown>> | undefined;
};

const IconBefore: Record<IconTypes, IconBefore> = {
	strong: {
		icon: <BoldIcon color="currentColor" spacing="spacious" label="" />,
	},
	em: {
		icon: <ItalicIcon color="currentColor" spacing="spacious" label="" />,
	},
	underline: {
		icon: <UnderlineIcon color="currentColor" spacing="spacious" label="" />,
	},
	strike: {
		icon: <TextStrikethroughIcon label="" />,
	},
	code: {
		icon: <AngleBracketsIcon color="currentColor" spacing="spacious" label="" />,
	},
	subscript: {
		icon: <Subscript />,
	},
	superscript: {
		icon: <Superscript />,
	},
};

type GetIconProps = {
	iconType: IconTypes;
	isDisabled: boolean;
	isActive: boolean;
	editorAnalyticsAPI: EditorAnalyticsAPI | undefined;
	toolbarType: ToolbarType;
} & WrappedComponentProps;
const getIcon = ({
	iconType,
	isDisabled,
	isActive,
	intl,
	editorAnalyticsAPI,
	toolbarType,
}: GetIconProps): MenuIconItem => {
	const icon = IconButtons(editorAnalyticsAPI, toolbarType)[iconType];
	const iconBefore = IconBefore[iconType].icon;
	const content = intl.formatMessage(icon.message);
	const { tooltipKeymap } = icon;

	return {
		content,
		buttonId: icon.buttonId,
		iconMark: iconType,
		key: iconType,
		command: icon.command,
		iconElement: icon.component ? icon.component() : undefined,
		tooltipElement: tooltipKeymap ? (
			<ToolTipContent description={content} keymap={tooltipKeymap} />
		) : undefined,
		elemBefore: editorExperiment('platform_editor_controls', 'variant1') ? iconBefore : undefined,
		elemAfter: tooltipKeymap ? (
			// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
			<div css={shortcutStyle}>{tooltip(tooltipKeymap)}</div>
		) : undefined,
		value: {
			name: iconType,
		},
		isActive,
		isDisabled,
		'aria-label': tooltipKeymap ? tooltip(tooltipKeymap, String(content)) : String(content),
		'aria-keyshortcuts': getAriaKeyshortcuts(tooltipKeymap),
	};
};

const IconsMarkSchema: Record<IconTypes, string> = {
	[IconTypes.strong]: 'strong',
	[IconTypes.em]: 'em',
	[IconTypes.strike]: 'strike',
	[IconTypes.code]: 'code',
	[IconTypes.underline]: 'underline',
	[IconTypes.superscript]: 'subsup',
	[IconTypes.subscript]: 'subsup',
};

const buildMenuIconState =
	(
		iconMark: IconTypes,
		hasMultiplePartsWithFormattingSelected?: boolean,
		commonActiveMarks?: string[],
	) =>
	({
		schema,
		textFormattingState,
	}: Pick<BuildIconProps, 'schema' | 'textFormattingState'>): MenuIconState => {
		const hasPluginState = Boolean(textFormattingState?.isInitialised);
		const markSchema = IconsMarkSchema[iconMark];
		const hasSchemaMark = Boolean(schema.marks[markSchema]);

		if (!hasPluginState) {
			return {
				isActive: false,
				isDisabled: true,
				isHidden: false,
				hasSchemaMark,
			};
		}

		const isActive =
			hasMultiplePartsWithFormattingSelected &&
			!commonActiveMarks?.includes(iconMark) &&
			editorExperiment('platform_editor_controls', 'variant1')
				? false
				: textFormattingState?.[`${iconMark}Active` as keyof TextFormattingState];

		const isDisabled = textFormattingState?.[`${iconMark}Disabled` as keyof TextFormattingState];
		const isHidden = textFormattingState?.[`${iconMark}Hidden` as keyof TextFormattingState];

		return {
			isActive: Boolean(isActive),
			isDisabled: Boolean(isDisabled),
			isHidden: Boolean(isHidden),
			hasSchemaMark,
		};
	};

const buildIcon = (
	iconMark: IconTypes,
	editorAnalyticsAPI: EditorAnalyticsAPI | undefined,
	toolbarType: ToolbarType,
	hasMultiplePartsWithFormattingSelected?: boolean,
	commonActiveMarks?: string[],
) => {
	const getState = buildMenuIconState(
		iconMark,
		hasMultiplePartsWithFormattingSelected,
		commonActiveMarks,
	);

	return ({
		schema,
		textFormattingState,
		intl,
		isToolbarDisabled,
	}: BuildIconProps): MenuIconItem | null => {
		const iconState = getState({
			schema,
			textFormattingState,
		});

		const { isActive, isDisabled, isHidden, hasSchemaMark } = iconState;
		const iconComponent = useMemo(
			() =>
				getIcon({
					iconType: IconTypes[iconMark],
					isDisabled: isToolbarDisabled || isDisabled,
					isActive,
					intl,
					editorAnalyticsAPI,
					toolbarType,
				}),
			[isToolbarDisabled, isDisabled, isActive, intl],
		);
		const shouldRenderIcon = hasSchemaMark && !isHidden;

		return useMemo(
			() => (shouldRenderIcon ? iconComponent : null),
			[shouldRenderIcon, iconComponent],
		);
	};
};

interface FormattingIconHookProps extends IconHookProps {
	editorAnalyticsAPI: EditorAnalyticsAPI | undefined;
	textFormattingState: TextFormattingState | undefined;
	schema: Schema;
	toolbarType: ToolbarType;
	hasMultiplePartsWithFormattingSelected?: boolean;
	commonActiveMarks?: string[];
}

export const useFormattingIcons = ({
	isToolbarDisabled,
	textFormattingState,
	schema,
	intl,
	editorAnalyticsAPI,
	toolbarType,
	hasMultiplePartsWithFormattingSelected,
	commonActiveMarks,
}: FormattingIconHookProps): Array<MenuIconItem | null> => {
	const props = {
		schema,
		textFormattingState,
		intl,
		isToolbarDisabled: Boolean(isToolbarDisabled),
		toolbarType,
		hasMultiplePartsWithFormattingSelected,
		commonActiveMarks,
	};

	const buildStrongIcon = buildIcon(
		IconTypes.strong,
		editorAnalyticsAPI,
		toolbarType,
		hasMultiplePartsWithFormattingSelected,
		commonActiveMarks,
	);
	const buildEmIcon = buildIcon(
		IconTypes.em,
		editorAnalyticsAPI,
		toolbarType,
		hasMultiplePartsWithFormattingSelected,
		commonActiveMarks,
	);
	const buildUnderlineIcon = buildIcon(
		IconTypes.underline,
		editorAnalyticsAPI,
		toolbarType,
		hasMultiplePartsWithFormattingSelected,
		commonActiveMarks,
	);
	const buildStrikeIcon = buildIcon(
		IconTypes.strike,
		editorAnalyticsAPI,
		toolbarType,
		hasMultiplePartsWithFormattingSelected,
		commonActiveMarks,
	);
	const buildCodeIcon = buildIcon(
		IconTypes.code,
		editorAnalyticsAPI,
		toolbarType,
		hasMultiplePartsWithFormattingSelected,
		commonActiveMarks,
	);
	const buildSubscriptIcon = buildIcon(
		IconTypes.subscript,
		editorAnalyticsAPI,
		toolbarType,
		hasMultiplePartsWithFormattingSelected,
		commonActiveMarks,
	);
	const buildSuperscriptIcon = buildIcon(
		IconTypes.superscript,
		editorAnalyticsAPI,
		toolbarType,
		hasMultiplePartsWithFormattingSelected,
		commonActiveMarks,
	);

	const strongIcon = buildStrongIcon(props);
	const emIcon = buildEmIcon(props);
	const underlineIcon = buildUnderlineIcon(props);
	const strikeIcon = buildStrikeIcon(props);
	const codeIcon = buildCodeIcon(props);
	const subscriptIcon = buildSubscriptIcon(props);
	const superscriptIcon = buildSuperscriptIcon(props);

	const result = useMemo(
		() => [strongIcon, emIcon, underlineIcon, strikeIcon, codeIcon, subscriptIcon, superscriptIcon],
		[strongIcon, emIcon, underlineIcon, strikeIcon, codeIcon, subscriptIcon, superscriptIcon],
	);

	return result;
};

type Props = {
	textFormattingState: TextFormattingState | undefined;
	iconTypeList: IconTypes[];
};
export const useHasFormattingActived = ({ iconTypeList, textFormattingState }: Props) => {
	const hasActiveFormatting = useMemo(() => {
		if (!textFormattingState?.isInitialised) {
			return false;
		}

		return iconTypeList.some(
			(iconType) => textFormattingState[`${iconType}Active` as keyof TextFormattingState],
		);
	}, [textFormattingState, iconTypeList]);

	return hasActiveFormatting;
};
