/**
 * @jsxRuntime classic
 */
/** @jsx jsx */
import { useCallback, useRef, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import Lorem from 'react-lorem-component';

import Button from '@atlaskit/button/new';
import { token } from '@atlaskit/tokens';

import Modal, { ModalFooter, ModalHeader, ModalTitle, ModalTransition } from '../src';

const modalBodyStyles = css({
	display: 'flex',
	height: '100%',
	padding: `${token('space.0', '0px')} ${token('space.300', '24px')}`,
	flexDirection: 'column',
	overflowY: 'auto',
});

const columnNonFlexWrapperStyles = css({
	height: 'calc(100% - 80px)',
});

const columnContainerStyles = css({
	display: 'flex',
	height: '100%',
	flexGrow: 1,
	background: token('color.background.neutral'),
});

const columnStyles = css({
	flex: '1 0 50%',
	overflowY: 'auto',
});

export default function Example() {
	const [isOpen, setIsOpen] = useState(false);
	const [contentLength, setContentLength] = useState(10);
	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);
	const toggleContentLength = useCallback(
		() => setContentLength(contentLength === 10 ? 1 : 10),
		[contentLength],
	);

	const bottomRef = useRef<HTMLDivElement>(null);
	const scrollToBottom = useCallback(() => bottomRef.current?.scrollIntoView(true), []);

	return (
		<div>
			<Button appearance="primary" onClick={openModal} testId="modal-trigger">
				Open modal
			</Button>

			<ModalTransition>
				{isOpen && (
					<Modal onClose={closeModal} testId="modal">
						<ModalHeader>
							<ModalTitle>Two-column layout</ModalTitle>
						</ModalHeader>
						<div css={modalBodyStyles}>
							<p>These columns should scroll independently</p>
							<Button onClick={toggleContentLength}>Toggle short/long content</Button>
							<div css={columnNonFlexWrapperStyles}>
								<div css={columnContainerStyles}>
									<div
										css={columnStyles}
										style={{
											// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
											background: token('color.background.accent.yellow.subtler'),
										}}
									>
										<h2> Column 1 </h2>
										<Button testId="scrollDown" onClick={scrollToBottom}>
											Scroll to bottom
										</Button>
										<Lorem count={2 * contentLength} />
										<h2> Bottom of column 1 </h2>
										<div ref={bottomRef} />
									</div>

									<div
										css={columnStyles}
										style={{
											// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
											background: token('color.background.accent.teal.subtler'),
										}}
									>
										<h2> Column 2 </h2>
										<Lorem count={contentLength} />
										<h2> Bottom of column 2 </h2>
									</div>
								</div>
							</div>
						</div>
						<ModalFooter>
							<Button appearance="subtle" onClick={closeModal}>
								Cancel
							</Button>
							<Button appearance="primary" onClick={closeModal}>
								Done
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</div>
	);
}
