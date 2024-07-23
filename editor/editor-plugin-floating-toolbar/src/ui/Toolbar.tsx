/* eslint-disable @atlaskit/design-system/no-css-tagged-template-expression -- needs manual remediation */
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { Component } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import { injectIntl } from 'react-intl-next';
import type { WrappedComponentProps } from 'react-intl-next';

import ButtonGroup from '@atlaskit/button/button-group';
import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import type { ExtensionProvider } from '@atlaskit/editor-common/extensions';
import type { Item } from '@atlaskit/editor-common/floating-toolbar';
import { areSameItems, messages } from '@atlaskit/editor-common/floating-toolbar';
import type { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { Announcer, FloatingToolbarButton as Button } from '@atlaskit/editor-common/ui';
import { backgroundPaletteTooltipMessages } from '@atlaskit/editor-common/ui-color';
import type { PaletteColor } from '@atlaskit/editor-common/ui-color';
import {
	ColorPickerButton,
	ToolbarArrowKeyNavigationProvider,
} from '@atlaskit/editor-common/ui-menu';
import { hexToEditorBackgroundPaletteColor } from '@atlaskit/editor-palette';
import { clearHoverSelection } from '@atlaskit/editor-plugin-table/commands';
import type { Node } from '@atlaskit/editor-prosemirror/model';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { token } from '@atlaskit/tokens';

import { checkShouldForceFocusAndApply, forceFocusSelector } from '../pm-plugins/force-focus';
import { showConfirmDialog } from '../pm-plugins/toolbar-data/commands';
import type { FloatingToolbarPlugin } from '../types';

import Dropdown from './Dropdown';
import { EmojiPickerButton } from './EmojiPickerButton';
import { ExtensionsPlaceholder } from './ExtensionsPlaceholder';
import Input from './Input';
import { ScrollButtons } from './ScrollButtons';
import type { SelectOption } from './Select';
import Select from './Select';
import Separator from './Separator';

export type { Item };

export interface Props {
	items: Array<Item>;
	dispatchCommand: (command?: Function) => void;
	popupsMountPoint?: HTMLElement;
	popupsBoundariesElement?: HTMLElement;
	popupsScrollableElement?: HTMLElement;
	providerFactory?: ProviderFactory;
	className?: string;
	groupLabel?: string;
	focusEditor?: () => void;
	editorView?: EditorView;
	dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
	target?: HTMLElement;
	node: Node;
	extensionsProvider?: Promise<ExtensionProvider>;
	scrollable?: boolean;
	api: ExtractInjectionAPI<FloatingToolbarPlugin> | undefined;
	mediaAssistiveMessage?: string;
}

type GroupedItems = (Item | Item[])[];

export function groupItems(items: Item[]): GroupedItems {
	const groupItems = items.reduce(
		(
			accumulator: {
				buttonGroup: Item[];
				finalOutput: GroupedItems;
			},
			item,
			i,
		) => {
			let { finalOutput, buttonGroup } = accumulator;

			if (item.type === 'button') {
				const notLastItem = i < items.length - 1;
				const nextItemIsButton = items[i + 1] && items[i + 1].type === 'button';
				const wasPreviousButton = items[i - 1] && items[i - 1].type === 'button';

				const isRadioButton = (notLastItem && nextItemIsButton) || wasPreviousButton;

				if (isRadioButton) {
					item.isRadioButton = true;
					buttonGroup.push(item);

					if (!nextItemIsButton && wasPreviousButton) {
						finalOutput.push(buttonGroup);
						accumulator.buttonGroup = [];
					}
				} else {
					finalOutput.push(item);
				}
			} else {
				finalOutput.push(item);
			}

			return accumulator;
		},
		{
			buttonGroup: [],
			finalOutput: [],
		},
	);

	return groupItems.finalOutput;
}

const ToolbarItems = React.memo(
	({
		items,
		groupLabel,
		dispatchCommand,
		popupsMountPoint,
		popupsBoundariesElement,
		editorView,
		dispatchAnalyticsEvent,
		popupsScrollableElement,
		scrollable,
		providerFactory,
		extensionsProvider,
		node,
		setDisableScroll,
		mountRef,
		api,
	}: Props & {
		setDisableScroll?: (disable: boolean) => void;
		mountRef: React.RefObject<HTMLDivElement>;
		mounted: boolean;
	}) => {
		const emojiAndColourPickerMountPoint = scrollable
			? popupsMountPoint ||
				editorView?.dom.closest('.fabric-editor-popup-scroll-parent') ||
				editorView?.dom.closest('.ak-editor-content-area') ||
				undefined
			: popupsMountPoint;

		const renderItem = (item: Item, idx: number) => {
			switch (item.type) {
				case 'button':
					const ButtonIcon = item.icon as React.ComponentClass<any>;

					const onClickHandler = () => {
						if (item.confirmDialog) {
							dispatchCommand(showConfirmDialog(idx));
						} else {
							dispatchCommand(item.onClick);
							if (item.focusEditoronEnter && !editorView?.hasFocus()) {
								editorView?.focus();
							}
						}
					};

					return (
						<Button
							// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
							className={item.className}
							key={idx}
							title={item.title}
							href={item.href}
							icon={item.icon ? <ButtonIcon label={item.title} /> : undefined}
							appearance={item.appearance}
							target={item.target}
							onClick={onClickHandler}
							onMouseEnter={() => dispatchCommand(item.onMouseEnter)}
							onMouseLeave={() => dispatchCommand(item.onMouseLeave)}
							onFocus={() => dispatchCommand(item.onFocus)}
							onBlur={() => dispatchCommand(item.onBlur)}
							selected={item.selected}
							disabled={item.disabled}
							tooltipContent={item.tooltipContent}
							testId={item.testId}
							hideTooltipOnClick={item.hideTooltipOnClick}
							ariaHasPopup={item.ariaHasPopup}
							tabIndex={item.tabIndex}
							isRadioButton={item.isRadioButton}
						>
							{item.showTitle && item.title}
						</Button>
					);

				case 'input':
					return (
						<Input
							key={idx}
							mountPoint={popupsMountPoint}
							boundariesElement={popupsBoundariesElement}
							defaultValue={item.defaultValue}
							placeholder={item.placeholder}
							onSubmit={(value) => dispatchCommand(item.onSubmit(value))}
							onBlur={(value) => dispatchCommand(item.onBlur(value))}
						/>
					);

				case 'custom': {
					return item.render(editorView, idx, dispatchAnalyticsEvent);
				}

				case 'dropdown':
					const DropdownIcon = item.icon;
					return (
						<Dropdown
							key={idx}
							title={item.title}
							icon={DropdownIcon && <DropdownIcon label={item.title} />}
							dispatchCommand={dispatchCommand}
							options={item.options}
							disabled={item.disabled}
							tooltip={item.tooltip}
							hideExpandIcon={item.hideExpandIcon}
							mountPoint={popupsMountPoint}
							boundariesElement={popupsBoundariesElement}
							scrollableElement={popupsScrollableElement}
							dropdownWidth={item.dropdownWidth}
							showSelected={item.showSelected}
							buttonTestId={item.testId}
							editorView={editorView}
							setDisableParentScroll={scrollable ? setDisableScroll : undefined}
							dropdownListId={item?.id && `${item.id}-dropdownList`}
							alignDropdownWithToolbar={items.length === 1}
							onToggle={item.onToggle}
						/>
					);

				case 'select':
					if (item.selectType === 'list') {
						const ariaLabel = item.title || item.placeholder;
						return (
							<Select
								key={idx}
								dispatchCommand={dispatchCommand}
								options={item.options}
								hideExpandIcon={item.hideExpandIcon}
								mountPoint={scrollable ? mountRef.current! : undefined}
								boundariesElement={popupsBoundariesElement}
								scrollableElement={popupsScrollableElement}
								defaultValue={item.defaultValue}
								placeholder={item.placeholder}
								onChange={(selected) => dispatchCommand(item.onChange(selected as SelectOption))}
								ariaLabel={ariaLabel}
								filterOption={item.filterOption}
								setDisableParentScroll={scrollable ? setDisableScroll : undefined}
								classNamePrefix={'floating-toolbar-select'}
							/>
						);
					}
					if (item.selectType === 'color') {
						return (
							<ColorPickerButton
								skipFocusButtonAfterPick
								key={idx}
								isAriaExpanded={item.isAriaExpanded}
								title={item.title}
								onChange={(selected) => {
									dispatchCommand(item.onChange(selected));
								}}
								colorPalette={item.options as PaletteColor[]}
								currentColor={item.defaultValue ? item.defaultValue.value : undefined}
								placement="Panels"
								mountPoint={emojiAndColourPickerMountPoint}
								setDisableParentScroll={scrollable ? setDisableScroll : undefined}
								// Currently in floating toolbar, color picker is only
								//  used in panel and table cell background color.
								// Both uses same color palette.
								// That's why hard-coding hexToEditorBackgroundPaletteColor
								//  and paletteColorTooltipMessages.
								// When we need to support different color palette
								//  in floating toolbar, we need to set hexToPaletteColor
								//  and paletteColorTooltipMessages in item options.
								hexToPaletteColor={hexToEditorBackgroundPaletteColor}
								paletteColorTooltipMessages={backgroundPaletteTooltipMessages}
								returnEscToButton={item.returnEscToButton}
							/>
						);
					}
					if (item.selectType === 'emoji') {
						return (
							<EmojiPickerButton
								key={idx}
								editorView={editorView}
								title={item.title}
								providerFactory={providerFactory}
								isSelected={item.selected}
								onChange={(selected) => dispatchCommand(item.onChange(selected))}
								mountPoint={emojiAndColourPickerMountPoint}
								setDisableParentScroll={scrollable ? setDisableScroll : undefined}
							/>
						);
					}
					return null;

				case 'extensions-placeholder':
					if (!editorView || !extensionsProvider) {
						return null;
					}

					return (
						<ExtensionsPlaceholder
							key={idx}
							node={node}
							editorView={editorView}
							extensionProvider={extensionsProvider}
							separator={item.separator}
							applyChangeToContextPanel={api?.contextPanel?.actions.applyChange}
							extensionApi={api?.extension?.actions.api()}
						/>
					);
				case 'separator':
					return <Separator key={idx} />;
			}
		};

		const groupedItems = groupItems(items.filter((item) => !item.hidden));

		return (
			<ButtonGroup>
				{groupedItems.map((element, index) => {
					const isGroup = Array.isArray(element);

					if (isGroup) {
						return (
							<div
								key={index}
								css={buttonGroupStyles}
								role="radiogroup"
								aria-label={groupLabel ?? undefined}
							>
								{element.map((element) => {
									const indexInAllItems = items.findIndex((item) => item === element);
									return renderItem(element, indexInAllItems);
								})}
							</div>
						);
					} else {
						const indexInAllItems = items.findIndex((item) => item === element);
						return renderItem(element, indexInAllItems);
					}
				})}
			</ButtonGroup>
		);
	},
	(prevProps, nextProps) => {
		if (!nextProps.node) {
			return false;
		}
		// only rerender toolbar items if the node is different
		// otherwise it causes an issue where multiple popups stays open
		return !(
			prevProps.node.type !== nextProps.node.type ||
			prevProps.node.attrs.localId !== nextProps.node.attrs.localId ||
			!areSameItems(prevProps.items, nextProps.items) ||
			!prevProps.mounted !== !nextProps.mounted
		);
	},
);

const buttonGroupStyles = css({
	display: 'flex',
	gap: token('space.050', '4px'),
});

// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
const toolbarContainer = (
	scrollable?: boolean,
	hasSelect?: boolean,
	firstElementIsSelect?: boolean,
) =>
	css(
		{
			backgroundColor: token('elevation.surface.overlay', 'white'),
			borderRadius: token('border.radius', '3px'),
			boxShadow: token(
				'elevation.shadow.overlay',
				`0 0 1px rgba(9, 30, 66, 0.31), 0 4px 8px -2px rgba(9, 30, 66, 0.25)`,
			),
			display: 'flex',
			lineHeight: 1,
			boxSizing: 'border-box',
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
			'& > div > div': {
				alignItems: 'center',
			},
		},
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		scrollable
			? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				css(
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
					hasSelect
						? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
							css({
								height: '40px',
							})
						: // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
							css({
								height: '32px',
							}),
					{
						overflow: 'hidden',
					},
				)
			: // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				css(
					{
						padding: `${token('space.050', '4px')} ${token('space.100', '8px')}`,
					},
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
					firstElementIsSelect &&
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
						css({
							paddingLeft: token('space.050', '4px'),
						}),
				),
	);

// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
const toolbarOverflow = (
	scrollable?: boolean,
	scrollDisabled?: boolean,
	firstElementIsSelect?: boolean,
) =>
	css(
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		scrollable
			? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				css(
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
					scrollDisabled
						? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
							css({
								overflow: 'hidden',
							})
						: // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
							css({
								overflowX: 'auto',
								overflowY: 'hidden',
							}),
					{
						WebkitOverflowScrolling: 'touch',
						padding: `${token('space.050', '4px')} 0 ${token('space.600', '48px')}`,
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
						'> div': {
							// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
							'> div:first-child': firstElementIsSelect
								? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
									css({
										marginLeft: token('space.050', '4px'),
									})
								: // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
									css({
										marginLeft: token('space.100', '8px'),
									}),
							// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
							'> div:last-child': {
								marginRight: token('space.100', '8px'),
							},
						},
					},
				)
			: // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				css({ display: 'flex' }),
	);

export interface State {
	scrollDisabled: boolean;
	mounted: boolean;
}

// eslint-disable-next-line @repo/internal/react/no-class-components
class Toolbar extends Component<Props & WrappedComponentProps, State> {
	private scrollContainerRef: React.RefObject<HTMLDivElement>;
	private mountRef: React.RefObject<HTMLDivElement>;
	private toolbarContainerRef: React.RefObject<HTMLDivElement>;

	constructor(props: Props & WrappedComponentProps) {
		super(props);
		this.scrollContainerRef = React.createRef<HTMLDivElement>();
		this.mountRef = React.createRef<HTMLDivElement>();
		this.toolbarContainerRef = React.createRef<HTMLDivElement>();
		this.state = {
			scrollDisabled: false,
			mounted: false,
		};
	}
	// remove any decorations added by toolbar buttons i.e danger and selected styling
	// this prevents https://product-fabric.atlassian.net/browse/ED-10207
	private resetStyling({ table }: { table: boolean }) {
		if (this.props.editorView) {
			const { state, dispatch } = this.props.editorView;
			if (table) {
				return clearHoverSelection()(state, dispatch);
			}
			this.props.api?.decorations?.actions.removeDecoration(state, dispatch);
		}
	}

	private setDisableScroll(disabled: boolean) {
		// wait before setting disabled state incase users jumping from one popup to another
		if (disabled) {
			requestAnimationFrame(() => {
				this.setState({ scrollDisabled: disabled });
			});
		} else {
			this.setState({ scrollDisabled: disabled });
		}
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}

	componentDidUpdate(prevProps: Props) {
		checkShouldForceFocusAndApply(this.props?.editorView);

		if (this.props.node !== prevProps.node) {
			this.resetStyling({
				table: prevProps?.node.type.name === 'table',
			});
		}
	}

	componentWillUnmount() {
		const { editorView } = this.props;
		if (editorView) {
			const {
				state: { tr },
				dispatch,
			} = editorView;
			dispatch(forceFocusSelector(null)(tr));
		}

		this.resetStyling({
			table: this.props.node.type.name === 'table',
		});
	}

	private shouldHandleArrowKeys = (): boolean => {
		//To prevent the keydown handling of arrow keys for custom toolbar items with 'disableArrowNavigation' prop enabled,
		//Usually the button which has menus or popups
		return !this.props.items?.find((item) => item.type === 'custom' && item.disableArrowNavigation);
	};

	private handleEscape = (event: KeyboardEvent): void => {
		// If any menu is open inside the floating toolbar 'Esc' key should not
		// focus the editorview.
		// Event can't be stopped as they are not childnodes of floating toolbar

		const isDropdownOpen = !!document.querySelector('[data-role="droplistContent"]');
		const isSelectMenuOpen = !!document.querySelector('.floating-toolbar-select__menu');

		if (isDropdownOpen || isSelectMenuOpen) {
			return;
		}

		this.props.editorView?.focus();
		event.preventDefault();
		event.stopPropagation();
	};

	render() {
		const { items, className, node, intl, scrollable, mediaAssistiveMessage } = this.props;

		if (!items || !items.length) {
			return null;
		}

		// Select has left padding of 4px to the border, everything else 8px
		const firstElementIsSelect = items[0].type === 'select';
		const hasSelect = items.find((item) => item.type === 'select' && item.selectType === 'list');
		const isShortcutToFocusToolbar = (event: KeyboardEvent) => {
			//Alt + F10 to reach first element in this floating toolbar
			return event.altKey && (event.key === 'F10' || event.keyCode === 121);
		};

		return (
			<React.Fragment>
				<ToolbarArrowKeyNavigationProvider
					editorView={this.props.editorView}
					handleEscape={this.handleEscape}
					disableArrowKeyNavigation={!this.shouldHandleArrowKeys()}
					childComponentSelector={"[data-testid='editor-floating-toolbar']"}
					isShortcutToFocusToolbar={isShortcutToFocusToolbar}
					intl={intl}
				>
					<div
						ref={this.toolbarContainerRef}
						css={() => [
							toolbarContainer(scrollable, hasSelect !== undefined, firstElementIsSelect),
						]}
						aria-label={intl.formatMessage(messages.floatingToolbarAriaLabel)}
						role="toolbar"
						data-testid="editor-floating-toolbar"
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
						className={className}
					>
						<Announcer
							text={
								mediaAssistiveMessage
									? `${mediaAssistiveMessage}, ${intl.formatMessage(
											messages.floatingToolbarAnnouncer,
										)}`
									: intl.formatMessage(messages.floatingToolbarAnnouncer)
							}
							delay={250}
						/>
						<div
							data-testid="floating-toolbar-items"
							ref={this.scrollContainerRef}
							// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
							css={toolbarOverflow(scrollable, this.state.scrollDisabled, firstElementIsSelect)}
						>
							<ToolbarItems
								{...this.props}
								setDisableScroll={this.setDisableScroll.bind(this)}
								mountRef={this.mountRef}
								mounted={this.state.mounted}
							/>
						</div>
						{scrollable && (
							<ScrollButtons
								intl={intl}
								scrollContainerRef={this.scrollContainerRef}
								node={node}
								disabled={this.state.scrollDisabled}
							/>
						)}
					</div>
					<div ref={this.mountRef}></div>
				</ToolbarArrowKeyNavigationProvider>
			</React.Fragment>
		);
	}
}

export default injectIntl(Toolbar);
