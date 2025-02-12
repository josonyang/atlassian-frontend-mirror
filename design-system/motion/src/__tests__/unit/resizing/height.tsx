import React, { forwardRef } from 'react';

import { render, screen } from '@testing-library/react';
import replaceRaf from 'raf-stub';

import { useResizingHeight } from '../../../resizing/height';
import { isReducedMotion } from '../../../utils/accessibility';
import { easeInOut } from '../../../utils/curves';
import { durations } from '../../../utils/durations';

jest.mock('../../../utils/accessibility');

replaceRaf();
const raf = window.requestAnimationFrame as any;

const Container = forwardRef<HTMLElement, { id: string; height: number }>(
	({ id, height, ...props }, ref) => {
		const getBoundingClientRect = () => ({ height });

		return (
			<div
				ref={(element) => {
					const newRef: HTMLDivElement | null = element
						? Object.assign(element, { getBoundingClientRect })
						: null;

					if (typeof ref === 'function') {
						ref(newRef);
					} else {
						Object.assign(ref || {}, { current: newRef });
					}
				}}
				{...props}
				data-testid={id}
			/>
		);
	},
);

const TestComponent = (props: { height: number }) => (
	<Container {...useResizingHeight()} height={props.height} id="element" />
);

describe('<ResizingHeight />', () => {
	beforeEach(() => {
		(isReducedMotion as jest.Mock).mockReturnValue(false);
	});

	it('should do nothing if height did not change over an update', () => {
		render(<TestComponent height={100} />);

		expect(screen.getByTestId('element')).not.toHaveAttribute('style');
	});

	it('should do nothing if user has turned on reduced motion', () => {
		(isReducedMotion as jest.Mock).mockReturnValue(true);
		const { rerender } = render(<TestComponent height={100} />);

		rerender(<TestComponent height={500} />);

		expect(screen.getByTestId('element')).not.toHaveAttribute('style');
	});

	it('should begin the animation from the before height', () => {
		const { rerender } = render(<TestComponent height={100} />);

		rerender(<TestComponent height={500} />);

		expect(screen.getByTestId('element').style).toMatchObject({
			height: '100px',
		});
	});

	it('should prepare to animate between heights', () => {
		const { rerender } = render(<TestComponent height={100} />);

		rerender(<TestComponent height={500} />);

		expect(screen.getByTestId('element').style).toMatchObject({
			'will-change': 'height',
			'transition-property': 'height',
			'transition-duration': `${durations.medium}ms`,
			'transition-timing-function': easeInOut,
		});
	});

	it('should set box sizing when prepping the animation to ensure the height is the same after the animation ends', () => {
		const { rerender } = render(<TestComponent height={100} />);

		rerender(<TestComponent height={500} />);

		expect(screen.getByTestId('element').style).toMatchObject({
			'box-sizing': 'border-box',
		});
	});

	it('should set the new height after two frames so the DOM can flush changes', () => {
		const { rerender } = render(<TestComponent height={100} />);
		rerender(<TestComponent height={500} />);

		// Two ticks to start the motion.
		raf.step();
		raf.step();

		expect(screen.getByTestId('element').style).toMatchObject({
			height: '500px',
		});
	});

	// FIXME: Jest upgrade
	// Assertion failure
	it.skip('should clear the style from the element after the animation has finished', () => {
		jest.useFakeTimers();
		const { rerender } = render(<TestComponent height={100} />);
		rerender(<TestComponent height={500} />);

		// Two ticks to start the motion.
		raf.step();
		raf.step();
		// Run the timeout to cleanup the motion.
		jest.runOnlyPendingTimers();
		jest.useRealTimers();

		expect(screen.getByTestId('element')).toHaveStyle('');
	});

	it('should cleanup when unmounting and not explode', () => {
		jest.useFakeTimers();
		const { rerender, unmount } = render(<TestComponent height={100} />);
		rerender(<TestComponent height={500} />);
		// Two ticks to start the motion.
		raf.step();
		raf.step();

		unmount();

		expect(() => {
			// Two ticks to start the motion.
			raf.step();
			raf.step();
			// Run the timeout so we cleanup the motion.
			jest.runOnlyPendingTimers();
			jest.useRealTimers();
		}).not.toThrow();
	});
});
