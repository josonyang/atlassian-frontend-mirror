/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
// eslint-disable-next-line @atlaskit/design-system/no-deprecated-imports
import type { IntlShape } from 'react-intl-next';

import type { Node } from '@atlaskit/editor-prosemirror/model';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import EditorDoneIcon from '@atlaskit/icon/core/migration/check-mark--editor-done';
import type { ButtonItemProps } from '@atlaskit/menu';
import { ButtonItem } from '@atlaskit/menu';
import { token } from '@atlaskit/tokens';
import Tooltip from '@atlaskit/tooltip';

import type { ExtensionAPI, ExtensionProvider } from '../extensions';
import { messages } from '../floating-toolbar';
import type { DropdownOptionT, FloatingToolbarOverflowDropdownOptions } from '../types';

export const menuItemDimensions = {
	width: 175,
	height: 32,
};

const labelStyles = css({
	display: 'inline-block',
	width: '100%',
});

const spacerStyles = css({
	display: 'flex',
	flex: 1,
	padding: token('space.100', '8px'),
});

export interface Props {
	hide: Function;
	dispatchCommand: Function;
	items: Array<DropdownOptionT<Function>> | FloatingToolbarOverflowDropdownOptions<Function>;
	showSelected?: boolean;
	editorView?: EditorView;
	extensions?: ExtensionProps;
}
export type ExtensionProps = {
	node: Node;
	extensionApi?: ExtensionAPI;
	extensionsProvider?: Promise<ExtensionProvider>;
};
// Extend the ButtonItem component type to allow mouse events to be accepted from the Typescript check
export interface DropdownButtonItemProps extends ButtonItemProps {
	onMouseEnter?: (event: React.MouseEvent | React.KeyboardEvent) => void;
	onMouseOver?: (event: React.MouseEvent | React.KeyboardEvent) => void;
	onMouseLeave?: (event: React.MouseEvent | React.KeyboardEvent) => void;
	onMouseOut?: (event: React.MouseEvent | React.KeyboardEvent) => void;
	onFocus?: (event: React.MouseEvent | React.KeyboardEvent) => void;
	onBlur?: (event: React.MouseEvent | React.KeyboardEvent) => void;
}
const DropdownButtonItem: React.MemoExoticComponent<
	React.ForwardRefExoticComponent<DropdownButtonItemProps & React.RefAttributes<HTMLElement>>
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = ButtonItem as any;

type SelectedIconBeforeProps = {
	itemSelected?: boolean;
	showSelected: boolean;
	intl: IntlShape;
};
const SelectedIconBefore = ({ itemSelected, intl, showSelected }: SelectedIconBeforeProps) => {
	if (showSelected && itemSelected) {
		return (
			<span aria-hidden="true">
				<EditorDoneIcon
					LEGACY_primaryColor={token('color.icon.selected')}
					LEGACY_size="small"
					label={intl.formatMessage(messages.confirmModalOK)}
					spacing="none"
				/>
			</span>
		);
	}

	return <span css={spacerStyles} />;
};

export type DropdownMenuItemProps = {
	item: DropdownOptionT<Function>;
	hide: Function;
	dispatchCommand: Function;
	editorView?: EditorView;
	intl: IntlShape;
	showSelected: boolean;
	itemSelected?: boolean;
};
export const DropdownMenuItem = (props: DropdownMenuItemProps) => {
	const { item, hide, dispatchCommand, editorView, showSelected, intl } = props;
	const itemSelected = item.selected;

	const iconBefore = useMemo(() => {
		if (item.icon) {
			return item.icon;
		} else {
			return (
				<SelectedIconBefore itemSelected={itemSelected} showSelected={showSelected} intl={intl} />
			);
		}
	}, [itemSelected, showSelected, intl, item.icon]);

	const [tooltipContent, setTooltipContent] = useState<string>(item.tooltip || '');

	const handleItemMouseOut = useCallback(() => {
		setTooltipContent('');
		if (item.onMouseOut) {
			dispatchCommand(item.onMouseOut);
		}
	}, [item.onMouseOut, dispatchCommand]);

	const handleItemMouseDown = useCallback(
		(e: React.MouseEvent<Element>) => {
			e.preventDefault(); // ED-16204 - This is needed for safari to get handleItemClick() to work
			if (item.onMouseDown) {
				dispatchCommand(item.onMouseDown);
			}
		},
		[item.onMouseDown, dispatchCommand],
	);

	const handleItemMouseOver = useCallback(() => {
		setTooltipContent(item.tooltip || '');
		if (item.onMouseOver) {
			dispatchCommand(item.onMouseOver);
		}
	}, [item.tooltip, item.onMouseOver, dispatchCommand]);

	const handleItemMouseEnter = useCallback(
		(e: React.MouseEvent | React.KeyboardEvent) => {
			if (item.onMouseEnter) {
				e.preventDefault();
				dispatchCommand(item.onMouseEnter);
			}
		},
		[item.onMouseEnter, dispatchCommand],
	);

	const handleItemMouseLeave = useCallback(
		(e: React.MouseEvent | React.KeyboardEvent) => {
			if (item.onMouseLeave) {
				e.preventDefault();
				dispatchCommand(item.onMouseLeave);
			}
		},
		[item.onMouseLeave, dispatchCommand],
	);

	const handleItemOnFocus = useCallback(
		(e: React.MouseEvent | React.KeyboardEvent) => {
			if (item.onFocus) {
				e.preventDefault();
				dispatchCommand(item.onFocus);
			}
		},
		[item.onFocus, dispatchCommand],
	);

	const handleItemOnBlur = useCallback(
		(e: React.MouseEvent | React.KeyboardEvent) => {
			if (item.onBlur) {
				e.preventDefault();
				dispatchCommand(item.onBlur);
			}
		},
		[item.onBlur, dispatchCommand],
	);

	const handleItemClick = useCallback(() => {
		/**
		 * The order of dispatching the event and hide() is important, because
		 * the ClickAreaBlock will be relying on the element to calculate the
		 * click coordinate.
		 * For more details, please visit the comment in this PR https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5328/edm-1321-set-selection-near-smart-link?link_source=email#chg-packages/editor/editor-core/src/plugins/floating-toolbar/ui/DropdownMenu.tsx
		 */
		dispatchCommand(item.onClick);
		hide();
		if (!editorView?.hasFocus()) {
			editorView?.focus();
		}
	}, [dispatchCommand, item.onClick, hide, editorView]);

	/* ED-16704 - Native mouse event handler to overcome firefox issue on disabled <button> - https://github.com/whatwg/html/issues/5886 */
	const labelRef = useRef<HTMLDivElement>(null);
	const handleTitleWrapperMouseEvent = useCallback(
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(e: any) => {
			if (item.disabled) {
				e.stopPropagation();
				e.preventDefault();
			}
		},
		[item.disabled],
	);

	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const isAriaChecked = (item: DropdownOptionT<any>) => {
		const { selected, domItemOptions } = item;

		return domItemOptions?.type === 'item-checkbox' ? selected : undefined;
	};

	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const hasRole = (item: DropdownOptionT<any>) => {
		return item.domItemOptions?.type === 'item-checkbox' ? 'menuitemcheckbox' : undefined;
	};

	useEffect(() => {
		const labelRefCurrent = labelRef.current;
		// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
		labelRefCurrent?.addEventListener('click', handleTitleWrapperMouseEvent);
		// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
		labelRefCurrent?.addEventListener('mousedown', handleTitleWrapperMouseEvent);
		return () => {
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			labelRefCurrent?.removeEventListener('click', handleTitleWrapperMouseEvent);
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			labelRefCurrent?.removeEventListener('mousedown', handleTitleWrapperMouseEvent);
		};
	});

	const itemContent = (
		<DropdownButtonItem
			isSelected={itemSelected}
			iconBefore={iconBefore}
			iconAfter={item.elemAfter}
			onClick={handleItemClick}
			data-testid={item.testId}
			isDisabled={item.disabled}
			onMouseDown={handleItemMouseDown}
			onMouseOver={handleItemMouseOver}
			onMouseEnter={handleItemMouseEnter}
			onMouseLeave={handleItemMouseLeave}
			onMouseOut={handleItemMouseOut}
			onFocus={handleItemOnFocus}
			onBlur={handleItemOnBlur}
			role={hasRole(item)}
			aria-checked={isAriaChecked(item)}
		>
			<span ref={labelRef} css={labelStyles}>
				{item.title}
			</span>
		</DropdownButtonItem>
	);

	if (tooltipContent) {
		return <Tooltip content={tooltipContent}>{itemContent}</Tooltip>;
	}

	return itemContent;
};
