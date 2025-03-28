import React, { useCallback, useState } from 'react';

import Lorem from 'react-lorem-component';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import Checkbox from '@atlaskit/checkbox';
import { cssMap } from '@atlaskit/css';
import { Field } from '@atlaskit/form';
import ModalDialog, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from '@atlaskit/modal-dialog';
import { Box } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

const sizes = ['large', 'medium', 'small'];

const multipleContainerStyles = cssMap({
	root: {
		maxWidth: '400px',
		paddingInlineStart: token('space.200'),
		paddingInlineEnd: token('space.200'),
		paddingBlockStart: token('space.200'),
		paddingBlockEnd: token('space.200'),
	},
});

export default function NestedDemo() {
	const [shouldScrollInViewport, setShouldScrollInViewPort] = useState(false);
	const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});

	const open = useCallback(
		(name: string) => setOpenModals((prev) => ({ ...prev, [name]: true })),
		[],
	);
	const close = useCallback(
		(name: string) => setOpenModals((prev) => ({ ...prev, [name]: false })),
		[],
	);

	const handleStackChange = (idx: number, name: string) => {
		console.info(`"${name}" stack change`, idx);
		console.log(`"${name}" stack change ${idx}`);
	};

	const handleOpenComplete = (name: string) => {
		console.info(`The enter animation of modal #${name} has completed.`);
	};

	const handleCloseComplete = (name: string) => {
		console.info(`The exit animation of the "${name}" modal has completed.`);
	};

	return (
		<Box xcss={multipleContainerStyles.root} padding="space.200">
			<Field name="sb" label="Scrolling behavior">
				{() => (
					<Checkbox
						label="Should scroll within the viewport"
						name="scroll"
						testId="scroll"
						onChange={(e) => setShouldScrollInViewPort(e.target.checked)}
						isChecked={shouldScrollInViewport}
					/>
				)}
			</Field>

			<ButtonGroup label="Modal options">
				<Button
					aria-haspopup="dialog"
					appearance="primary"
					testId="large"
					onClick={() => open('large')}
				>
					Open
				</Button>
			</ButtonGroup>
			<p>
				For illustrative purposes three {'"stacked"'} modals can be opened in this demo, though ADG3
				recommends only two at any time.
			</p>
			<p>
				Check the storybook{"'"}s {'"action logger"'} (or your console) to see how you can make use
				of the <code>onStackChange</code> property.
			</p>

			{sizes.map((name, index) => {
				const nextModal = sizes[index + 1];

				return (
					<ModalTransition key={name}>
						{openModals[name] && (
							<ModalDialog
								shouldScrollInViewport={shouldScrollInViewport}
								onClose={() => close(name)}
								onCloseComplete={() => handleCloseComplete(name)}
								onOpenComplete={() => handleOpenComplete(name)}
								onStackChange={(id) => handleStackChange(id, name)}
								width={name}
								testId="modal"
							>
								<ModalHeader hasCloseButton>
									<ModalTitle>Modal: {name}</ModalTitle>
								</ModalHeader>
								<ModalBody>
									<Lorem count={2} />
								</ModalBody>
								<ModalFooter>
									<Button
										testId={`${name}-modal-close-button`}
										appearance="subtle"
										onClick={() => close(name)}
									>
										Close
									</Button>
									{nextModal && (
										<Button
											aria-haspopup="dialog"
											testId={`${name}-modal-trigger`}
											appearance="primary"
											onClick={() => open(nextModal)}
										>
											Open: {nextModal}
										</Button>
									)}
								</ModalFooter>
							</ModalDialog>
						)}
					</ModalTransition>
				);
			})}
		</Box>
	);
}
