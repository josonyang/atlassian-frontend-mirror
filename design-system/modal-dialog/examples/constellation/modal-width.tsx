import React, { useCallback, useState } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import Modal, {
	CloseButton,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from '@atlaskit/modal-dialog';
import { Flex, Grid, xcss } from '@atlaskit/primitives';

const gridStyles = xcss({
	width: '100%',
});

const closeContainerStyles = xcss({
	gridArea: 'close',
});

const titleContainerStyles = xcss({
	gridArea: 'title',
});

export default function Example() {
	const [isOpen, setIsOpen] = useState(false);
	const [width, setWidth] = useState('medium');

	const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
	const setWidthAndOpen = useCallback(
		(newWidth: string) => {
			setWidth(newWidth);
			requestAnimationFrame(() => setIsOpen(true));
		},
		[setWidth, setIsOpen],
	);

	return (
		<>
			<ButtonGroup label="Choose modal width">
				<Button
					aria-haspopup="dialog"
					appearance="primary"
					onClick={() => setWidthAndOpen('small')}
				>
					small
				</Button>
				<Button
					aria-haspopup="dialog"
					appearance="primary"
					onClick={() => setWidthAndOpen('medium')}
				>
					medium
				</Button>
				<Button
					aria-haspopup="dialog"
					appearance="primary"
					onClick={() => setWidthAndOpen('large')}
				>
					large
				</Button>
				<Button
					aria-haspopup="dialog"
					appearance="primary"
					onClick={() => setWidthAndOpen('x-large')}
				>
					x-large
				</Button>
			</ButtonGroup>

			<ModalTransition>
				{isOpen && (
					<Modal onClose={closeModal} width={width}>
						<ModalHeader>
							<Grid gap="space.200" templateAreas={['title close']} xcss={gridStyles}>
								<Flex xcss={titleContainerStyles} justifyContent="start">
									<ModalTitle>Set up your own projects</ModalTitle>
								</Flex>
								<Flex xcss={closeContainerStyles} justifyContent="end">
									<CloseButton onClick={closeModal} />
								</Flex>
							</Grid>
						</ModalHeader>
						<ModalBody>
							We simplified the way you set up issue types, workflows, fields, and screens. Check
							out the new, independent project experience to see it in action.
						</ModalBody>
						<ModalFooter>
							<Button appearance="subtle">Skip</Button>
							<Button appearance="primary" onClick={closeModal}>
								Get started
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</>
	);
}
