import React, { useCallback, useMemo, useState } from 'react';

import type { WrappedComponentProps } from 'react-intl-next';

import { toolbarMessages } from '@atlaskit/editor-common/messages';
import { DropdownMenuWithKeyboardNavigation as DropdownMenu } from '@atlaskit/editor-common/ui-menu';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { akEditorMenuZIndex } from '@atlaskit/editor-shared-styles';

import { BoldToolbarButton } from './bold-button';
import { useMenuState } from './hooks/menu-state';
import { MoreButton } from './more-button';
import type { MenuIconItem } from './types';

type DropdownMenuProps = {
	editorView: EditorView;
	isReducedSpacing: boolean;
	items: Array<MenuIconItem>;
	moreButtonLabel: string;
	hasFormattingActive: boolean;
	popupsBoundariesElement?: HTMLElement;
	popupsMountPoint?: HTMLElement;
	popupsScrollableElement?: HTMLElement;
	hasMoreButton: boolean;
} & WrappedComponentProps;

export const FormattingTextDropdownMenu = React.memo(
	({
		editorView,
		moreButtonLabel,
		isReducedSpacing,
		items,
		hasFormattingActive,
		popupsBoundariesElement,
		popupsMountPoint,
		popupsScrollableElement,
		hasMoreButton,
		intl,
	}: DropdownMenuProps) => {
		const [isMenuOpen, toggleMenu, closeMenu] = useMenuState();
		const [isOpenedByKeyboard, setIsOpenedByKeyboard] = useState(false);
		const group = useMemo(
			() => [
				{
					items,
				},
			],
			[items],
		);
		const onItemActivated = useCallback(
			({ item, shouldCloseMenu = true }: { item: MenuIconItem; shouldCloseMenu: boolean }) => {
				if (item) {
					item.command(editorView.state, editorView.dispatch);
					if (shouldCloseMenu) {
						closeMenu();
					}
				}
			},
			[editorView.state, editorView.dispatch, closeMenu],
		);

		return (
			<DropdownMenu
				mountTo={popupsMountPoint}
				onOpenChange={closeMenu}
				boundariesElement={popupsBoundariesElement}
				scrollableElement={popupsScrollableElement}
				onItemActivated={onItemActivated}
				isOpen={isMenuOpen}
				items={group}
				zIndex={akEditorMenuZIndex}
				fitHeight={188}
				fitWidth={136}
				shouldUseDefaultRole
				shouldFocusFirstItem={() => {
					if (isOpenedByKeyboard) {
						setIsOpenedByKeyboard(false);
					}
					return isOpenedByKeyboard;
				}}
			>
				{hasMoreButton ? (
					<MoreButton
						isSelected={isMenuOpen || hasFormattingActive}
						label={moreButtonLabel}
						isReducedSpacing={isReducedSpacing}
						isDisabled={false}
						onClick={() => {
							toggleMenu();
							setIsOpenedByKeyboard(false);
						}}
						onKeyDown={(event: React.KeyboardEvent) => {
							if (event.key === 'Enter' || event.key === ' ') {
								event.preventDefault();
								toggleMenu();
								setIsOpenedByKeyboard(true);
							}
						}}
						aria-expanded={isMenuOpen}
					/>
				) : (
					<BoldToolbarButton
						isReducedSpacing={isReducedSpacing}
						isDisabled={false}
						isSelected={isMenuOpen}
						label={intl.formatMessage(toolbarMessages.textFormat)}
						aria-expanded={isMenuOpen}
						aria-haspopup
						onClick={() => {
							toggleMenu();
							setIsOpenedByKeyboard(false);
						}}
						onKeyDown={(event: React.KeyboardEvent) => {
							if (event.key === 'Enter' || event.key === ' ') {
								event.preventDefault();
								toggleMenu();
								setIsOpenedByKeyboard(true);
							}
						}}
					/>
				)}
			</DropdownMenu>
		);
	},
);
