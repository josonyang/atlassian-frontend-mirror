import React, { Fragment, useCallback, useState } from 'react';

import Button from '@atlaskit/button/new';
import { cssMap } from '@atlaskit/css';
import Heading from '@atlaskit/heading';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from '@atlaskit/modal-dialog';
import { Box } from '@atlaskit/primitives/compiled';

const styles = cssMap({
	container: {
		position: 'relative',
	},
	sticky: {
		position: 'sticky',
	},
});

function SurfaceAwareBox() {
	return (
		<Box padding="space.250" backgroundColor="utility.elevation.surface.current">
			A surface aware box. The background color depends on the surface it's placed on.
		</Box>
	);
}

export default function Example() {
	const [isOpen, setIsOpen] = useState(false);
	const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

	return (
		<Fragment>
			<Button aria-haspopup="dialog" appearance="primary" onClick={() => setIsOpen(true)}>
				Open modal
			</Button>
			<SurfaceAwareBox />
			<ModalTransition>
				{isOpen && (
					<Modal onClose={closeModal} height={600}>
						<ModalHeader hasCloseButton>
							<ModalTitle>Our voice and tone</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<Box xcss={styles.container}>
								<Box xcss={styles.sticky} paddingBlockStart="space.0" paddingBlockEnd="space.0">
									<SurfaceAwareBox />
								</Box>
								<Heading as="h3" size="medium">
									Be bold
								</Heading>
								<p>
									Motivate teams to do their best work. Offer best practices to get users going in
									the right direction. Be bold and offer just enough help to get the work started,
									and then get out of the way. Give accurate information so users can make educated
									decisions. Know your user's struggles and desired outcomes and give just enough
									information to let them get where they need to go.
								</p>

								<Heading as="h3" size="medium">
									Be optimistic
								</Heading>

								<p>
									Focusing on the details gives people confidence in our products. Weave a
									consistent story across our fabric and be diligent about vocabulary across all
									messaging by being brand conscious across products to create a seamless flow
									across all the things. Let people know that they can jump in and start working
									expecting to find a dependable experience across all the things. Keep teams in the
									loop about what is happening by informing them of relevant features, products and
									opportunities for success. Be on the journey with them and highlight the key
									points that will help them the most - right now. Be in the moment by focusing
									attention on the important bits first.
								</p>

								<Heading as="h3" size="medium">
									Be practical, with a wink
								</Heading>

								<p>
									Keep our own story short and give teams just enough to get moving. Get to the
									point and be direct. Be concise - we tell the story of how we can help, but we do
									it directly and with purpose. Be on the lookout for opportunities and be quick to
									offer a helping hand. At the same time realize that nobody likes a nosy neighbor.
									Give the user just enough to know that something awesome is around the corner and
									then get out of the way. Write clear, accurate, and concise text that makes
									interfaces more usable and consistent - and builds trust. We strive to write text
									that is understandable by anyone, anywhere, regardless of their culture or
									language so that everyone feels they are part of the team.
								</p>
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button appearance="primary" onClick={closeModal}>
								Close
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</Fragment>
	);
}
