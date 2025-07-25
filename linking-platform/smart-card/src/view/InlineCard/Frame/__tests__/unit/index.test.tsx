import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { Frame } from '../../index';

describe('Frame', () => {
	it('should not render interactive props when the frame is not clickable', async () => {
		render(<Frame testId="frame" />);
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
		expect(screen.getByTestId('frame')).not.toHaveAttribute('tabindex', '0');
	});

	it('should render interactive props when the frame is clickable', async () => {
		render(
			<Frame
				onClick={() => {
					/* noop */
				}}
				testId="frame"
			>
				Dummy link
			</Frame>,
		);
		expect(await screen.findByRole('button')).toBeInTheDocument();
		expect(screen.getByTestId('frame')).toHaveAttribute('tabindex', '0');
	});

	it('should call onClick when the card is clicked', () => {
		const onClick = jest.fn();
		render(<Frame onClick={onClick}>Dummy link</Frame>);
		fireEvent.click(screen.getByRole('button'));
		expect(onClick).toHaveBeenCalled();
	});

	it('should call onClick when the space key is pressed', () => {
		const onClick = jest.fn();
		render(<Frame onClick={onClick}>Dummy link</Frame>);

		screen.getByRole('button').focus();

		fireEvent.keyPress(screen.getByRole('button'), {
			key: ' ',
			charCode: 32, // note: hacky — for unknown reasons the space event listener is not triggered without charCode
		});
		expect(onClick).toHaveBeenCalled();
	});

	it('should call onClick when the enter key is pressed', () => {
		const onClick = jest.fn();
		render(<Frame onClick={onClick}>Dummy link</Frame>);
		fireEvent.keyPress(screen.getByRole('button'), {
			keyCode: '13',
		});
		expect(onClick).toHaveBeenCalled();
	});

	describe('a11y', () => {
		it('should be accessible with url', async () => {
			const { container } = render(<Frame link="www.link-url">Dummy link</Frame>);
			await expect(container).toBeAccessible();
		});

		it('should be accessible with onClick', async () => {
			const { container } = render(<Frame onClick={() => {}}>Dummy link</Frame>);
			await expect(container).toBeAccessible();
		});

		it('should be accessible with url and onClick', async () => {
			const { container } = render(
				<Frame link="www.link-url" onClick={() => {}}>
					Dummy link
				</Frame>,
			);
			await expect(container).toBeAccessible();
		});

		it('should be accessible with children', async () => {
			const { container } = render(<Frame link="www.link-url">This is my link</Frame>);
			await expect(container).toBeAccessible();
		});

		it('should be accessible with span', async () => {
			const { container } = render(<Frame />);
			await expect(container).toBeAccessible();
		});
	});
});
