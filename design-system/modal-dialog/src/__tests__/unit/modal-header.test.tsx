import React, { type MouseEventHandler } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import noop from '@atlaskit/ds-lib/noop';

import { useModal } from '../../hooks';
import ModalHeader from '../../modal-header';
import ModalDialog from '../../modal-wrapper';

jest.mock('raf-schd', () => (fn: Function) => fn);
jest.mock('@atlaskit/ds-lib/warn-once');

describe('<ModalHeader />', () => {
	it('should render default header', () => {
		render(
			<ModalDialog onClose={noop} testId="modal">
				<ModalHeader>My header</ModalHeader>
			</ModalDialog>,
		);

		expect(screen.getByTestId('modal--header')).toBeInTheDocument();
	});

	it('should be accessible using a user-defined test id', () => {
		render(
			<ModalDialog onClose={noop} testId="modal">
				<ModalHeader testId="my-header">My header</ModalHeader>
			</ModalDialog>,
		);

		expect(screen.queryByTestId('modal--header')).not.toBeInTheDocument();
		expect(screen.getByTestId('my-header')).toBeInTheDocument();
	});

	it('should render custom header', () => {
		render(
			<ModalDialog onClose={noop}>
				<span data-testid="custom-header">My header</span>
			</ModalDialog>,
		);

		expect(screen.getByTestId('custom-header')).toBeInTheDocument();
	});

	it('should invoke onClose callback on custom header', () => {
		const callback = jest.fn();
		const CustomHeader = () => {
			const { onClose } = useModal();
			return (
				<ModalHeader>
					<button
						data-testid="custom-close"
						onClick={onClose as MouseEventHandler<HTMLButtonElement>}
						type="button"
					>
						Custom close
					</button>
				</ModalHeader>
			);
		};

		render(
			<ModalDialog onClose={callback}>
				<CustomHeader />
			</ModalDialog>,
		);

		fireEvent.click(screen.getByTestId('custom-close'));
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should throw an error if modal context not available', () => {
		/* eslint-disable no-console */
		const err = console.error;
		console.error = jest.fn();
		/* eslint-enable no-console */

		try {
			render(<ModalHeader>Lone header</ModalHeader>);
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
