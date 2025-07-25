import React from 'react';

import { render, screen } from '@testing-library/react';

import noop from '@atlaskit/ds-lib/noop';

import ModalBody from '../../modal-body';
import ModalDialog from '../../modal-dialog';

jest.mock('raf-schd', () => (fn: Function) => fn);
jest.mock('@atlaskit/ds-lib/warn-once');

describe('<ModalBody />', () => {
	it('should render default body', () => {
		render(
			<ModalDialog onClose={noop} testId="modal">
				<ModalBody>My body</ModalBody>
			</ModalDialog>,
		);

		expect(screen.getByTestId('modal--body')).toBeInTheDocument();
	});

	it('should be accessible using a user-defined test id', () => {
		render(
			<ModalDialog onClose={noop} testId="modal">
				<ModalBody testId="my-body">My body</ModalBody>
			</ModalDialog>,
		);

		expect(screen.queryByTestId('modal--body')).not.toBeInTheDocument();
		expect(screen.getByTestId('my-body')).toBeInTheDocument();
	});

	it('should render custom body', () => {
		render(
			<ModalDialog onClose={noop}>
				<span data-testid="custom-body">My body</span>
			</ModalDialog>,
		);

		expect(screen.getByTestId('custom-body')).toBeInTheDocument();
	});

	it('should throw an error if modal context not available', () => {
		const err = console.error;
		console.error = jest.fn();

		try {
			render(<ModalBody>Lone body</ModalBody>);
		} catch (e) {
			expect((e as Error).message).toBe(
				'@atlaskit/modal-dialog: Modal context unavailable – this component needs to be a child of ModalDialog.',
			);
		}

		// Restore writing to stderr.
		console.error = err;
	});
});
