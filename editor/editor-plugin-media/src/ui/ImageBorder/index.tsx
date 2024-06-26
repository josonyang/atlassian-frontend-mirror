/** @jsx jsx */
import { useRef, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import type { IntlShape } from 'react-intl-next';

import type { BorderMarkAttributes } from '@atlaskit/adf-schema';
import { BorderIcon } from '@atlaskit/editor-common/icons';
import { imageBorderMessages as messages } from '@atlaskit/editor-common/media';
import { DropdownMenuSharedCssClassName } from '@atlaskit/editor-common/styles';
import { Popup } from '@atlaskit/editor-common/ui';
import {
	borderColorPalette,
	borderPaletteTooltipMessages,
	ColorPalette,
} from '@atlaskit/editor-common/ui-color';
import type { MenuItem } from '@atlaskit/editor-common/ui-menu';
import {
	ArrowKeyNavigationType,
	DropdownMenu,
	ToolbarButton,
} from '@atlaskit/editor-common/ui-menu';
import { hexToEditorBorderPaletteColor } from '@atlaskit/editor-palette';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import Tooltip from '@atlaskit/tooltip';

import {
	buttonStyle,
	buttonWrapperStyle,
	contextualMenuArrow,
	contextualMenuColorIcon,
	contextualSubMenu,
	itemSpacing,
	line,
	menuItemDimensions,
	toolbarButtonWrapper,
} from './styles';

export interface ImageBorderProps {
	intl: IntlShape;
	toggleBorder: () => void;
	borderMark?: BorderMarkAttributes;
	setBorder: (attrs: Partial<BorderMarkAttributes>) => void;
}

const ImageBorder = ({
	intl: { formatMessage },
	toggleBorder,
	borderMark,
	setBorder,
}: ImageBorderProps) => {
	const popupTarget = useRef<HTMLDivElement>(null);
	const enabled = !!borderMark;
	const color = borderMark?.color;
	const size = borderMark?.size;
	const [isOpen, setIsOpen] = useState(false);
	const [isColorSubmenuOpen, setIsColorSubmenuOpen] = useState(false);
	const [isSizeSubmenuOpen, setIsSizeSubmenuOpen] = useState(false);

	const handleSubMenuRef = (ref: HTMLDivElement | null) => {
		if (!ref) {
			return;
		}
		const rect = ref.getBoundingClientRect();
		if (rect.left + rect.width > window.innerWidth) {
			ref.style.left = `-${rect.width}px`;
		}
	};

	const borderSizeOptions: { name: string; value: number }[] = [
		{
			name: formatMessage(messages.borderSizeSubtle),
			value: 1,
		},
		{
			name: formatMessage(messages.borderSizeMedium),
			value: 2,
		},
		{
			name: formatMessage(messages.borderSizeBold),
			value: 3,
		},
	];

	const items: MenuItem[] = [
		{
			content: formatMessage(messages.borderColor),
			value: { name: 'color' },
			elemAfter: (
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
				<div className={DropdownMenuSharedCssClassName.SUBMENU}>
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
					<div css={contextualMenuColorIcon(color && hexToEditorBorderPaletteColor(color))} />
					{isColorSubmenuOpen && (
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
						<div css={contextualSubMenu(0)} ref={handleSubMenuRef}>
							<ColorPalette
								onClick={(color: string) => {
									setBorder({ color });
									setIsOpen(!isOpen);
								}}
								selectedColor={color ?? null}
								paletteOptions={{
									palette: borderColorPalette,
									paletteColorTooltipMessages: borderPaletteTooltipMessages,
									hexToPaletteColor: hexToEditorBorderPaletteColor,
								}}
							/>
						</div>
					)}
				</div>
			),
		},
		{
			content: formatMessage(messages.borderSize),
			value: { name: 'size' },
			elemAfter: (
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
				<div className={DropdownMenuSharedCssClassName.SUBMENU}>
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
					<div css={contextualMenuArrow} />
					{isSizeSubmenuOpen && (
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
						<div css={contextualSubMenu(1)} ref={handleSubMenuRef}>
							{borderSizeOptions.map(({ name, value }, idx) => (
								<Tooltip key={idx} content={name}>
									{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
									<span css={buttonWrapperStyle}>
										<button
											type="button"
											// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
											css={buttonStyle(value === size)}
											aria-label={name}
											role="radio"
											aria-checked={value === size}
											onClick={() => {
												setBorder({ size: value });
												setIsOpen(false);
											}}
											onMouseDown={(e) => {
												e.preventDefault();
											}}
										>
											{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
											<div css={line(value, value === size)} role="presentation" />
										</button>
									</span>
								</Tooltip>
							))}
						</div>
					)}
				</div>
			),
		},
	];

	/**
	 * We want to change direction of our dropdowns a bit early,
	 * not exactly when it hits the boundary.
	 */
	const fitTolerance = 10;
	const fitWidth = menuItemDimensions.width;
	const fitHeight = items.length * (menuItemDimensions.height + itemSpacing);

	return (
		<div>
			<div
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
				css={toolbarButtonWrapper({
					enabled,
					isOpen,
				})}
			>
				<ToolbarButton
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
					className="image-border-toolbar-btn"
					selected={enabled}
					onClick={toggleBorder}
					spacing="compact"
					aria-label={
						enabled ? formatMessage(messages.removeBorder) : formatMessage(messages.addBorder)
					}
					iconBefore={<BorderIcon label="" />}
					title={enabled ? formatMessage(messages.removeBorder) : formatMessage(messages.addBorder)}
				/>
				<div ref={popupTarget}>
					<ToolbarButton
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
						className="image-border-toolbar-dropdown"
						selected={enabled || isOpen}
						aria-label={formatMessage(messages.borderOptions)}
						title={formatMessage(messages.borderOptions)}
						spacing="compact"
						iconBefore={<ExpandIcon label="" />}
						onClick={() => {
							setIsOpen(!isOpen);
						}}
					/>
				</div>
			</div>
			<Popup
				target={popupTarget.current ? popupTarget.current : undefined}
				fitWidth={fitWidth + fitTolerance}
				fitHeight={fitHeight + fitTolerance}
				forcePlacement={true}
				stick={true}
			>
				<div
					onMouseLeave={() => {
						setIsColorSubmenuOpen(false);
						setIsSizeSubmenuOpen(false);
					}}
				>
					<DropdownMenu
						//This needs be removed when the a11y is completely handled
						//Disabling key navigation now as it works only partially
						//Same with packages/editor/editor-plugin-table/src/plugins/table/ui/FloatingContextualMenu/ContextualMenu.tsx
						arrowKeyNavigationProviderOptions={{
							type: ArrowKeyNavigationType.MENU,
							disableArrowKeyNavigation: true,
						}}
						items={[{ items }]}
						isOpen={isOpen}
						onOpenChange={() => {
							setIsOpen(false);
							setIsColorSubmenuOpen(false);
							setIsSizeSubmenuOpen(false);
						}}
						onItemActivated={({ item }) => {
							if (item.value.name === 'color') {
								setIsColorSubmenuOpen(!isColorSubmenuOpen);
							}
							if (item.value.name === 'size') {
								setIsSizeSubmenuOpen(!isSizeSubmenuOpen);
							}
						}}
						onMouseEnter={({ item }) => {
							if (item.value.name === 'color') {
								setIsColorSubmenuOpen(true);
							}
							if (item.value.name === 'size') {
								setIsSizeSubmenuOpen(true);
							}
						}}
						onMouseLeave={({ item }) => {
							if (item.value.name === 'color') {
								setIsColorSubmenuOpen(false);
							}
							if (item.value.name === 'size') {
								setIsSizeSubmenuOpen(false);
							}
						}}
						fitWidth={fitWidth + fitTolerance}
						fitHeight={fitHeight + fitTolerance}
					/>
				</div>
			</Popup>
		</div>
	);
};

export default ImageBorder;
