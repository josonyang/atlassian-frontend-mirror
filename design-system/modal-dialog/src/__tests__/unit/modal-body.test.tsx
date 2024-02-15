import React from 'react';

import { cleanup, render } from '@testing-library/react';

import noop from '@atlaskit/ds-lib/noop';

import ModalBody from '../../modal-body';
import ModalDialog from '../../modal-wrapper';

jest.mock('raf-schd', () => (fn: Function) => fn);
jest.mock('@atlaskit/ds-lib/warn-once');

describe('<ModalBody />', () => {
  afterEach(cleanup);

  it('should render default body', () => {
    const { queryByTestId } = render(
      <ModalDialog onClose={noop} testId="modal">
        <ModalBody>My body</ModalBody>
      </ModalDialog>,
    );

    expect(queryByTestId('modal--body')).toBeInTheDocument();
  });

  it('should be accessible using a user-defined test id', () => {
    const { queryByTestId } = render(
      <ModalDialog onClose={noop} testId="modal">
        <ModalBody testId="my-body">My body</ModalBody>
      </ModalDialog>,
    );

    expect(queryByTestId('modal--body')).not.toBeInTheDocument();
    expect(queryByTestId('my-body')).toBeInTheDocument();
  });

  it('should render custom body', () => {
    const { queryByTestId } = render(
      <ModalDialog onClose={noop}>
        <span data-testid="custom-body">My body</span>
      </ModalDialog>,
    );

    expect(queryByTestId('custom-body')).toBeInTheDocument();
  });

  it('should throw an error if modal context not available', () => {
    /* eslint-disable no-console */
    const err = console.error;
    console.error = jest.fn();
    /* eslint-enable no-console */

    try {
      render(<ModalBody>Lone body</ModalBody>);
    } catch (e) {
      expect((e as Error).message).toBe(
        '@atlaskit/modal-dialog: Modal context unavailable – this component needs to be a child of ModalDialog.',
      );
    }

    // Restore writing to stderr.
    /* eslint-disable-next-line no-console */
    console.error = err;
  });
});
