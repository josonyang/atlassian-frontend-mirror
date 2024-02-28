/** @jsx jsx */
import { useEffect, useState } from 'react';

import { jsx } from '@emotion/react';
import Lorem from 'react-lorem-component';

import Button from '@atlaskit/button/new';
import { Box, xcss } from '@atlaskit/primitives';

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '../src';

const containerStyles = xcss({
  height: '100%',
  padding: 'space.200',
});

export default function Parent() {
  const [, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => setCount((x) => x + 1), 20);
  }, []);

  return <Child />;
}

function Child() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <Box xcss={containerStyles}>
      <p>
        This shows a use case where the parent of modal dialog rapidly
        re-renders, which is not always in sync with the duration of modal
        dialog's enter/exit animation.
      </p>
      <p>
        This replicates{' '}
        <a href="https://product-fabric.atlassian.net/browse/DSP-640">
          DSP-640
        </a>
        , except now that the bug is fixed, modal dialog's exit animation should
        be followed through even when its parent's render cycle is quicker than
        its own.
      </p>
      <br />
      <Button appearance="primary" onClick={open} testId="modal-trigger">
        Open Modal
      </Button>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={close} testId="modal">
            <ModalHeader>
              <ModalTitle>Modal Title</ModalTitle>
            </ModalHeader>

            <ModalBody>
              <Lorem count={2} />
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" testId="subtle">
                Secondary action
              </Button>
              <Button onClick={close} appearance="primary" testId="primary">
                Close
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </Box>
  );
}
