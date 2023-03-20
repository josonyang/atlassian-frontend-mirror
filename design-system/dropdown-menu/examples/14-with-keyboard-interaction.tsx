import React, { useState } from 'react';

import Button from '@atlaskit/button/standard-button';
import { UNSAFE_Box as Box } from '@atlaskit/ds-explorations';
import Heading from '@atlaskit/heading';
import ModalDialog, {
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import Stack from '@atlaskit/primitives/stack';

import DropdownMenu, { DropdownItem, DropdownItemGroup } from '../src';

export default () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Stack space="250">
      <Heading level="h700">
        Click dropdown button and try to open the modal using your keyboard.
      </Heading>

      <Box>
        <DropdownMenu
          trigger="Open dropdown"
          testId="dropdown"
          onOpenChange={(e) => console.log('dropdown opened', e)}
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
            <ModalHeader>
              <ModalTitle>Hi there</ModalTitle>
            </ModalHeader>

            <ModalBody>
              <Box paddingBlock="space.250">
                <Button onClick={() => setModalOpen(false)}>Close modal</Button>
                <DropdownMenu
                  trigger="Open dropdown"
                  testId="dropdown"
                  onOpenChange={(e) => console.log('dropdown opened', e)}
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
