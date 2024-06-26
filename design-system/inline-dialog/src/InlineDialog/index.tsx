/**
 * @jsxRuntime classic
 */
/** @jsx jsx */
import React, { type FC, memo, useCallback, useEffect, useRef } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import { bind } from 'bind-event-listener';
import NodeResolver from 'react-node-resolver';

import {
	createAndFireEvent,
	withAnalyticsContext,
	withAnalyticsEvents,
} from '@atlaskit/analytics-next';
import noop from '@atlaskit/ds-lib/noop';
import { UNSAFE_LAYERING, UNSAFE_useLayering } from '@atlaskit/layering';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';
import { Manager, Popper, Reference } from '@atlaskit/popper';

import type { InlineDialogProps } from '../types';

import { Container } from './styled/container';

const packageName = process.env._PACKAGE_NAME_ as string;
const packageVersion = process.env._PACKAGE_VERSION_ as string;

const checkIsChildOfPortal = (node: HTMLElement | null): boolean => {
	if (!node) {
		return false;
	}

	return (
		(node.classList && node.classList.contains('atlaskit-portal-container')) ||
		checkIsChildOfPortal(node.parentElement)
	);
};

const InlineDialogWithLayering: FC<InlineDialogProps> = ({
	isOpen,
	onContentBlur,
	onContentClick,
	onContentFocus,
	onClose,
	placement,
	strategy,
	testId,
	content,
	children,
}) => {
	return (
		<UNSAFE_LAYERING
			isDisabled={
				getBooleanFF('platform.design-system-team.inline-message-layering_wfp1p') ? !isOpen : true
			}
		>
			<InlineDialog
				isOpen={isOpen}
				onContentBlur={onContentBlur}
				onContentClick={onContentClick}
				onContentFocus={onContentFocus}
				onClose={onClose}
				placement={placement}
				strategy={strategy}
				testId={testId}
				content={content}
			>
				{children}
			</InlineDialog>
		</UNSAFE_LAYERING>
	);
};
const InlineDialog: FC<InlineDialogProps> = memo<InlineDialogProps>(function InlineDialog({
	isOpen = false,
	onContentBlur = noop,
	onContentClick = noop,
	onContentFocus = noop,
	onClose = noop,
	placement = 'bottom-start',
	strategy = 'fixed',
	testId,
	content,
	children,
}) {
	const containerRef = useRef<HTMLElement | null>(null);
	const triggerRef = useRef<HTMLElement | null>(null);
	// we put this into a ref to avoid handleCloseRequest having this as a dependency
	const onCloseRef = useRef<typeof onClose>(onClose);

	useEffect(() => {
		onCloseRef.current = onClose;
	});
	const { isLayerDisabled } = UNSAFE_useLayering();

	const handleCloseRequest = useCallback(
		(event: MouseEvent | KeyboardEvent) => {
			const { target } = event;

			// checks for when target is not HTMLElement
			if (!(target instanceof HTMLElement)) {
				return;
			}

			// TODO: This is to handle the case where the target is no longer in the DOM.
			// This happens with react-select in datetime picker. There might be other
			// edge cases for this.
			if (!document.body.contains(target)) {
				return;
			}

			if (getBooleanFF('platform.design-system-team.inline-message-layering_wfp1p')) {
				if (!isLayerDisabled()) {
					onCloseRef.current?.({ isOpen: false, event });
				}
			} else {
				// handles the case where inline dialog opens portalled elements such as modal
				if (checkIsChildOfPortal(target)) {
					return;
				}

				// call onClose if the click originated from outside the dialog
				if (containerRef.current && !containerRef.current.contains(target)) {
					onCloseRef.current?.({ isOpen: false, event });
				}
			}
		},
		[isLayerDisabled],
	);

	const handleClick = useCallback(
		(event: MouseEvent) => {
			// exit if we click outside but on the trigger — it can handle the clicks itself
			if (triggerRef.current && triggerRef.current.contains(event.target as Node)) {
				return;
			}

			// if feature flag is enabled we won't file the close event when clicking inside dialog
			if (
				getBooleanFF('platform.design-system-team.inline-message-layering_wfp1p') &&
				containerRef.current?.contains(event.target as Node)
			) {
				return;
			}

			handleCloseRequest(event);
		},
		[handleCloseRequest],
	);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const unbind = bind(window, {
			type: 'click',
			listener: handleClick,
			options: { capture: true },
		});

		return unbind;
	}, [isOpen, handleClick]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleCloseRequest(event);
			}
		},
		[handleCloseRequest],
	);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const unbind = bind(window, {
			type: 'keydown',
			listener: handleKeyDown,
			options: { capture: true },
		});

		return unbind;
	}, [isOpen, handleKeyDown]);

	const popper = isOpen ? (
		<Popper placement={placement} strategy={strategy}>
			{({ ref, style }) => (
				<Container
					onBlur={onContentBlur}
					onFocus={onContentFocus}
					onClick={onContentClick}
					ref={(node) => {
						if (node) {
							containerRef.current = node;
							if (typeof ref === 'function') {
								ref(node);
							} else {
								(ref as React.MutableRefObject<HTMLElement>).current = node;
							}
						}
					}}
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					style={style}
					testId={testId}
				>
					{content}
				</Container>
			)}
		</Popper>
	) : null;

	return (
		<Manager>
			<Reference>
				{({ ref }) => (
					<NodeResolver
						innerRef={(node: HTMLElement) => {
							triggerRef.current = node;
							if (typeof ref === 'function') {
								ref(node);
							} else {
								(ref as React.MutableRefObject<HTMLElement>).current = node;
							}
						}}
					>
						<React.Fragment>{children}</React.Fragment>
					</NodeResolver>
				)}
			</Reference>
			{popper}
		</Manager>
	);
});

InlineDialog.displayName = 'InlineDialog';

export { InlineDialog as InlineDialogWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
	componentName: 'inlineDialog',
	packageName,
	packageVersion,
})(
	withAnalyticsEvents({
		onClose: createAndFireEventOnAtlaskit({
			action: 'closed',
			actionSubject: 'inlineDialog',

			attributes: {
				componentName: 'inlineDialog',
				packageName,
				packageVersion,
			},
		}),
	})(InlineDialogWithLayering),
);
