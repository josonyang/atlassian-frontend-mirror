import React, { useState } from 'react';

import Button from '@atlaskit/button/new';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Heading from '@atlaskit/heading';
import ModalDialog, {
	ModalBody,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from '@atlaskit/modal-dialog';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box } from '@atlaskit/primitives';
import Stack from '@atlaskit/primitives/stack';

export default () => {
	const [isModalOpen, setModalOpen] = useState(false);

	return (
		<Stack space="space.250">
			<Heading size="large">
				Click dropdown button and try to open the modal using your keyboard.
			</Heading>

			<Box>
				<DropdownMenu
					trigger="Open dropdown"
					testId="dropdown"
					onOpenChange={(e) => console.log('dropdown opened', e)}
					shouldRenderToParent
				>
					<DropdownItemGroup>
						<DropdownItem
							onClick={(e: React.MouseEvent | React.KeyboardEvent) => {
								e.preventDefault();

								setModalOpen(true);
							}}
						>
							Open modal
						</DropdownItem>
					</DropdownItemGroup>
				</DropdownMenu>
			</Box>

			<ModalTransition>
				{isModalOpen && (
					<ModalDialog testId="dialogBox" onClose={() => setModalOpen(false)}>
						<ModalHeader hasCloseButton>
							<ModalTitle>Hi there</ModalTitle>
						</ModalHeader>

						<ModalBody>
							<Box paddingBlock="space.250">
								<Button onClick={() => setModalOpen(false)}>Close modal</Button>
								<DropdownMenu
									trigger="Open dropdown"
									testId="dropdown"
									onOpenChange={(e) => console.log('dropdown opened', e)}
									shouldRenderToParent
								>
									<DropdownItemGroup>
										<DropdownItem
											onClick={(e: React.MouseEvent | React.KeyboardEvent) => {
												e.preventDefault();

												setModalOpen(true);
											}}
										>
											Open modal
										</DropdownItem>
									</DropdownItemGroup>
								</DropdownMenu>
							</Box>
						</ModalBody>
					</ModalDialog>
				)}
			</ModalTransition>
		</Stack>
	);
};
