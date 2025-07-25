/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type KeyboardEvent, type MouseEvent, useCallback } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import { useIntl } from 'react-intl-next';

import withAnalyticsContext from '@atlaskit/analytics-next/withAnalyticsContext';
import DropdownMenu, {
	DropdownItem,
	DropdownItemGroup,
	type OnOpenChangeArgs,
} from '@atlaskit/dropdown-menu';
import { type EditorView } from '@atlaskit/editor-prosemirror/view';
import ChevronDownIcon from '@atlaskit/icon/core/migration/chevron-down';
import PreferencesIcon from '@atlaskit/icon/core/migration/customize--preferences';
import LinkExternalIcon from '@atlaskit/icon/core/migration/link-external--shortcut';

import { cardMessages as messages } from '../../messages';

import { StyledButton } from './StyledButton';
import { useLinkOverlayAnalyticsEvents } from './useLinkOverlayAnalyticsEvents';

const SMALL_LINK_TOOLBAR_ANALYTICS_SOURCE = 'smallLinkToolbar';

export type OnDropdownChange = (isOpen: boolean) => void;

export type DropdownProps = {
	/** Callback fired when the Configure dropdown item is clicked */
	onConfigureClick: () => void;
	/** Callback fired when the Open Link dropdown item is clicked */
	onOpenLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
	/** Callback fired when the dropdown is open or close */
	onDropdownChange?: OnDropdownChange;
	editorView: EditorView;
	testId: string;
};

const Dropdown = ({
	onConfigureClick: onConfigureClickCallback,
	onOpenLinkClick: onOpenLinkClickCallback,
	onDropdownChange,
	editorView,
	testId,
}: DropdownProps) => {
	const { formatMessage } = useIntl();
	const configureLinkLabel: string = formatMessage(messages.inlineConfigureLink);
	const goToLinkLabel: string = formatMessage(messages.inlineGoToLink);

	const { fireActionClickEvent, fireLinkClickEvent, fireToolbarViewEvent } =
		useLinkOverlayAnalyticsEvents();

	const focusEditor = useCallback(() => {
		// Fix dropdown giving focus back to the trigger async which is then unmounted and losing focus
		// this is happening deep within atlaskit dropdown as a result of this code: https://github.com/focus-trap/focus-trap/blob/master/index.js#L987
		// use setTimeout to run this async after that call
		setTimeout(() => editorView.focus(), 0);
	}, [editorView]);

	const onOpenChange: (args: OnOpenChangeArgs) => void = useCallback(
		({ isOpen, event }) => {
			onDropdownChange?.(isOpen);

			if (isOpen) {
				fireToolbarViewEvent();
			}
			if (!isOpen && event instanceof KeyboardEvent) {
				focusEditor();
			}
		},
		[fireToolbarViewEvent, focusEditor, onDropdownChange],
	);

	const onGoToLinkClick = useCallback(
		(event: MouseEvent<Element> | KeyboardEvent) => {
			fireActionClickEvent('goToLink');
			onOpenLinkClickCallback?.(event as MouseEvent<HTMLAnchorElement>);
			focusEditor();
		},
		[fireActionClickEvent, focusEditor, onOpenLinkClickCallback],
	);

	const onConfigureClick = useCallback(() => {
		fireActionClickEvent('configureLink');
		onConfigureClickCallback?.();
		focusEditor();
	}, [fireActionClickEvent, focusEditor, onConfigureClickCallback]);

	return (
		<DropdownMenu<HTMLButtonElement>
			trigger={({ onClick, triggerRef, ...props }) => (
				<StyledButton
					innerRef={triggerRef}
					// Ignored via go/ees005
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...props}
					iconBefore={
						<ChevronDownIcon label={configureLinkLabel} LEGACY_size="small" size="small" />
					}
					onClick={(e) => {
						onClick?.(e);
						fireLinkClickEvent();
					}}
				/>
			)}
			testId={`${testId}-dropdown`}
			onOpenChange={onOpenChange}
		>
			<DropdownItemGroup>
				<DropdownItem
					elemBefore={<LinkExternalIcon label={goToLinkLabel} LEGACY_size="medium" />}
					testId={`${testId}-dropdown-item-open-link`}
					onClick={onGoToLinkClick}
				>
					{goToLinkLabel}
				</DropdownItem>
				<DropdownItem
					elemBefore={<PreferencesIcon label={configureLinkLabel} LEGACY_size="medium" />}
					onClick={onConfigureClick}
					testId={`${testId}-dropdown-item-configure`}
				>
					{configureLinkLabel}
				</DropdownItem>
			</DropdownItemGroup>
		</DropdownMenu>
	);
};

export default withAnalyticsContext({ source: SMALL_LINK_TOOLBAR_ANALYTICS_SOURCE })(Dropdown);
