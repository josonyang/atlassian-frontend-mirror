import React, { useCallback, useState } from 'react';

import Lorem from 'react-lorem-component';

import Button from '@atlaskit/button/new';
import { cssMap } from '@atlaskit/css';
import Heading from '@atlaskit/heading';
import ModalDialog, {
	CloseButton,
	ModalBody,
	ModalFooter,
	ModalTransition,
} from '@atlaskit/modal-dialog';
import { Box, Flex, Inline } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

const styles = cssMap({
	header: {
		backgroundImage: `linear-gradient(${token('color.background.accent.blue.subtler')}, ${token('color.background.accent.purple.subtler')})`,
		paddingBlockStart: token('space.1000'),
		position: 'relative',
	},
	title: {
		insetBlockStart: token('space.500'),
		position: 'absolute',
		paddingBlockStart: token('space.025'),
		paddingInlineEnd: token('space.300'),
		paddingBlockEnd: token('space.025'),
		paddingInlineStart: token('space.300'),
	},
	customClose: {
		position: 'absolute',
		insetInlineEnd: token('space.050'),
		insetBlockStart: token('space.050'),
	},
});

export default function CompoundTitleModal(): React.JSX.Element {
	const [isOpen, setOpen] = useState(false);

	const open = useCallback(() => setOpen(true), []);
	const close = useCallback(() => setOpen(false), []);

	const secondaryAction = useCallback(({ target }: any) => console.log(target.innerText), []);

	return (
		<>
			<Button aria-haspopup="dialog" appearance="primary" onClick={open}>
				Open Modal
			</Button>

			<ModalTransition>
				{isOpen && (
					<ModalDialog onClose={close}>
						<Flex alignItems="center" justifyContent="space-between" xcss={styles.header}>
							<Inline xcss={styles.customClose}>
								<CloseButton onClick={close} />
							</Inline>
							<Box xcss={styles.title}>
								<Heading size="large" as="h1">
									A customised header
								</Heading>
							</Box>
						</Flex>
						<ModalBody>
							<Lorem count={2} />
						</ModalBody>
						<ModalFooter>
							<Button onClick={secondaryAction} appearance="subtle">
								Secondary Action
							</Button>
							<Button onClick={close} appearance="primary">
								Close
							</Button>
						</ModalFooter>
					</ModalDialog>
				)}
			</ModalTransition>
		</>
	);
}
