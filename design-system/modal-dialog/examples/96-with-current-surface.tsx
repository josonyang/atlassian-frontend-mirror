import React, { useCallback, useState } from 'react';

import Lorem from 'react-lorem-component';

import Button from '@atlaskit/button/new';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from '@atlaskit/modal-dialog';
import { Box } from '@atlaskit/primitives';

import ModalTitleWithClose from './common/modal-title';

export default function DefaultModal() {
	const [isOpen, setIsOpen] = useState(true);
	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	return (
		<>
			<Button aria-haspopup="dialog" appearance="primary" onClick={open} testId="modal-trigger">
				Open Modal
			</Button>

			<ModalTransition>
				{isOpen && (
					<Modal onClose={close} testId="modal">
						<ModalHeader>
							<ModalTitleWithClose onClose={close}>
								<ModalTitle>Modal Title</ModalTitle>
							</ModalTitleWithClose>
						</ModalHeader>
						<ModalBody>
							<Box padding="space.250" backgroundColor="elevation.surface.sunken">
								<Box backgroundColor="utility.elevation.surface.current">
									<Lorem count={2} />
								</Box>
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button testId="secondary" appearance="subtle" onClick={close}>
								Secondary Action
							</Button>
							<Button testId="primary" appearance="primary" onClick={close}>
								Close
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</>
	);
}
