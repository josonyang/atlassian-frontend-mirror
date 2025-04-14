/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import type { WrappedComponentProps } from 'react-intl-next';
import { injectIntl } from 'react-intl-next';

import { clearFormatting, findKeymapByDescription, tooltip } from '@atlaskit/editor-common/keymaps';
import { toolbarMessages } from '@atlaskit/editor-common/messages';
import { separatorStyles, wrapperStyle } from '@atlaskit/editor-common/styles';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type { MenuItem } from '@atlaskit/editor-common/ui-menu';
import { DropdownMenuWithKeyboardNavigation as DropdownMenu } from '@atlaskit/editor-common/ui-menu';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { akEditorMenuZIndex } from '@atlaskit/editor-shared-styles';
import TextIcon from '@atlaskit/icon/core/text';
import { fg } from '@atlaskit/platform-feature-flags';
import { Box, xcss } from '@atlaskit/primitives';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';
import { ThemeMutationObserver } from '@atlaskit/tokens';

import type { BlockTypePlugin } from '../../../blockTypePluginType';
import type { TextBlockTypes } from '../../block-types';
import { NORMAL_TEXT } from '../../block-types';
import type { BlockTypeState } from '../../main';
import type { BlockType } from '../../types';

import { BlockTypeButton } from './blocktype-button';
import { Text } from './icons';
import {
	blockTypeMenuItemStyle,
	floatingToolbarWrapperStyle,
	keyboardShortcut,
	keyboardShortcutSelect,
} from './styled';

export type DropdownItem = MenuItem & {
	value: BlockType;
};

const buttonWrapperStyles = xcss({
	flexShrink: 0,
});

export interface Props {
	isDisabled?: boolean;
	isSmall?: boolean;
	isReducedSpacing?: boolean;
	pluginState: BlockTypeState;
	popupsMountPoint?: HTMLElement;
	popupsBoundariesElement?: HTMLElement;
	popupsScrollableElement?: HTMLElement;
	editorView?: EditorView;
	setTextLevel: (type: TextBlockTypes, fromBlockQuote?: boolean) => void;
	wrapBlockQuote: (type: TextBlockTypes) => void;
	clearFormatting: () => void;
	shouldUseDefaultRole?: boolean;
	api: ExtractInjectionAPI<BlockTypePlugin> | undefined;
}

export interface State {
	active: boolean;
	isOpenedByKeyboard: boolean;
	typographyTheme:
		| 'typography'
		| 'typography-adg3'
		| 'typography-modernized'
		| 'typography-refreshed'
		| undefined;
	observer: ThemeMutationObserver | null;
}

// eslint-disable-next-line @repo/internal/react/no-class-components
class ToolbarBlockType extends React.PureComponent<Props & WrappedComponentProps, State> {
	state = {
		active: false,
		isOpenedByKeyboard: false,
		typographyTheme: undefined,
		observer: null as ThemeMutationObserver | null,
	};

	componentDidMount() {
		const observer = new ThemeMutationObserver(({ typography }) => {
			if (typography !== this.state.typographyTheme) {
				this.setState({
					typographyTheme: typography,
				});
			}
		});

		this.setState({
			observer,
		});

		observer.observe();
	}

	componentWillUnmount() {
		this.state.observer?.disconnect();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private onOpenChange = (attrs: any) => {
		this.setState({
			...this.state,
			active: attrs.isOpen,
			isOpenedByKeyboard: attrs.isOpenedByKeyboard,
		});
	};

	render() {
		const { active, isOpenedByKeyboard } = this.state;
		const {
			popupsMountPoint,
			popupsBoundariesElement,
			popupsScrollableElement,
			isSmall,
			isReducedSpacing,
			pluginState: {
				currentBlockType,
				blockTypesDisabled,
				availableBlockTypes,
				availableBlockTypesInDropdown,
			},
			shouldUseDefaultRole,
			intl: { formatMessage },
			api,
		} = this.props;

		const isHeadingDisabled = !availableBlockTypes.some(
			(blockType) => blockType.nodeName === 'heading',
		);

		if (isHeadingDisabled) {
			return null;
		}

		const blockTypeTitles = availableBlockTypesInDropdown
			.filter((blockType) => blockType.name === currentBlockType.name)
			.map((blockType) => blockType.title);

		const defaultIcon = fg('platform_editor_controls_patch_4') ? <TextIcon label="" /> : <Text />;
		const currentIcon = fg('platform_editor_controls_patch_4')
			? currentBlockType?.icon
			: currentBlockType?.LEGACY_icon;

		if (!this.props.isDisabled && !blockTypesDisabled) {
			const items = this.createItems();

			const button = (
				<BlockTypeButton
					isSmall={isSmall}
					isReducedSpacing={isReducedSpacing}
					selected={active}
					disabled={false}
					title={blockTypeTitles[0]}
					onClick={this.handleTriggerClick}
					onKeyDown={this.handleTriggerByKeyboard}
					formatMessage={formatMessage}
					aria-expanded={active}
					blockTypeName={currentBlockType.name}
					blockTypeIcon={currentIcon || defaultIcon}
				/>
			);

			return (
				<span
					css={
						editorExperiment('platform_editor_blockquote_in_text_formatting_menu', true)
							? // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
								[wrapperStyle, floatingToolbarWrapperStyle]
							: // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
								wrapperStyle
					}
				>
					<DropdownMenu
						items={items}
						onOpenChange={this.onOpenChange}
						onItemActivated={this.handleSelectBlockType}
						isOpen={active}
						mountTo={popupsMountPoint}
						boundariesElement={popupsBoundariesElement}
						scrollableElement={popupsScrollableElement}
						zIndex={akEditorMenuZIndex}
						fitHeight={360}
						fitWidth={106}
						section={{ hasSeparator: true }}
						shouldUseDefaultRole={shouldUseDefaultRole}
						// hasSeparator={true}
						shouldFocusFirstItem={() => {
							if (isOpenedByKeyboard) {
								// eslint-disable-next-line @repo/internal/react/no-set-state-inside-render
								this.setState({ ...this.state, isOpenedByKeyboard: false });
							}
							return isOpenedByKeyboard;
						}}
					>
						{fg('platform_editor_comments_toolbar_responsiveness') ? (
							// extra wrapper added to prevent flex shrinking of the button
							<Box xcss={buttonWrapperStyles}>{button}</Box>
						) : (
							button
						)}
					</DropdownMenu>
					{!api?.primaryToolbar && (
						<span
							// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
							css={separatorStyles}
						/>
					)}
				</span>
			);
		}

		return (
			// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
			<span css={wrapperStyle}>
				<BlockTypeButton
					isSmall={isSmall}
					isReducedSpacing={isReducedSpacing}
					selected={active}
					disabled={true}
					title={blockTypeTitles[0]}
					onClick={this.handleTriggerClick}
					onKeyDown={this.handleTriggerByKeyboard}
					formatMessage={formatMessage}
					aria-expanded={active}
					blockTypeName={currentBlockType.name}
				/>

				{!api?.primaryToolbar && (
					<span
						// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
						css={separatorStyles}
					/>
				)}
			</span>
		);
	}

	private handleTriggerClick = () => {
		this.onOpenChange({
			isOpen: !this.state.active,
			isOpenedByKeyboard: false,
		});
	};

	private handleTriggerByKeyboard = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			this.onOpenChange({
				isOpen: !this.state.active,
				isOpenedByKeyboard: true,
			});
		}
	};

	private createItems = () => {
		const {
			intl: { formatMessage },
		} = this.props;
		const { currentBlockType, availableBlockTypesInDropdown, formattingIsPresent } =
			this.props.pluginState;

		const items: MenuItem[] = availableBlockTypesInDropdown.map((blockType, index) => {
			const isActive = currentBlockType === blockType;
			const tagName = blockType.tagName || 'p';
			const Tag = tagName as keyof React.ReactHTML;
			const keyMap = findKeymapByDescription(blockType.title.defaultMessage as string);
			const icon = fg('platform_editor_controls_patch_4') ? blockType?.icon : blockType.LEGACY_icon;

			const item: MenuItem = {
				content: (
					// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
					<div css={blockTypeMenuItemStyle(tagName, isActive, this.state.typographyTheme)}>
						<Tag>{formatMessage(blockType.title)}</Tag>
					</div>
				),
				value: blockType,
				'aria-label': tooltip(keyMap, formatMessage(blockType.title)),
				key: `${blockType.name}-${index}`,
				elemBefore: editorExperiment('platform_editor_controls', 'variant1') ? icon : undefined,
				elemAfter: (
					// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
					<div css={[keyboardShortcut, isActive && keyboardShortcutSelect]}>{tooltip(keyMap)}</div>
				),
				isActive,
			};

			return item;
		});

		if (
			availableBlockTypesInDropdown.map((blockType) => blockType.name).includes('blockquote') &&
			editorExperiment('platform_editor_controls', 'control')
		) {
			const clearFormattingItem: MenuItem = {
				content: (
					<div>
						{/* eslint-disable-next-line @atlaskit/design-system/use-primitives-text */}
						<p>{toolbarMessages.clearFormatting.defaultMessage}</p>
					</div>
				),
				value: {
					name: 'clearFormatting',
				},
				'aria-label': tooltip(clearFormatting, toolbarMessages.clearFormatting.defaultMessage),
				key: 'clear-formatting',
				elemAfter: (
					// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
					<div css={[keyboardShortcut]}>{tooltip(clearFormatting)}</div>
				),
				isActive: false,
				isDisabled: currentBlockType === NORMAL_TEXT && !formattingIsPresent,
			};
			return [
				{
					items,
				},
				{
					items: [clearFormattingItem],
				},
			];
		}

		return [
			{
				items,
			},
		];
	};

	private handleSelectBlockType = ({
		item,
		shouldCloseMenu = true,
	}: {
		item: DropdownItem;
		shouldCloseMenu: boolean;
	}) => {
		const blockType = item.value;
		if (blockType.name === 'blockquote') {
			this.props.wrapBlockQuote(blockType.name as TextBlockTypes);
		} else {
			if (blockType.name === 'clearFormatting') {
				this.props.clearFormatting();
			} else {
				const fromBlockQuote = this.props.pluginState.currentBlockType.name === 'blockquote';
				this.props.setTextLevel(blockType.name as TextBlockTypes, fromBlockQuote);
			}
		}
		if (shouldCloseMenu) {
			this.setState({ ...this.state, active: false });
		}
	};
}

export default injectIntl(ToolbarBlockType);
