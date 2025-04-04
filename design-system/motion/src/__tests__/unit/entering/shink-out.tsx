import React from 'react';

import { act, render, screen, within } from '@testing-library/react';
import { replaceRaf } from 'raf-stub';

import ExitingPersistence from '../../../entering/exiting-persistence';
import ShrinkOut from '../../../entering/shrink-out';
import { easeIn } from '../../../utils/curves';
import { durations } from '../../../utils/durations';
import { ComponentStub } from '../../__utils__/component-stub';

jest.mock('../../../utils/accessibility');

replaceRaf();
const raf = window.requestAnimationFrame as any;

describe('<ShrinkOut />', () => {
	beforeEach(() => {
		jest.useRealTimers();
	});

	it('should do nothing on initial mount', () => {
		render(
			<ExitingPersistence>
				<ShrinkOut>
					{(props) => (
						<ComponentStub
							testId="target"
							box={{ offsetHeight: 25, offsetWidth: 100 }}
							{...props}
						/>
					)}
				</ShrinkOut>
			</ExitingPersistence>,
		);

		expect(screen.getByTestId('target')).not.toHaveAttribute('style');
	});

	it('should fix exiting elements size ready for the next frame', () => {
		const { rerender } = render(
			<ExitingPersistence>
				<ShrinkOut>
					{(props) => (
						<ComponentStub
							testId="target"
							box={{ offsetHeight: 25, offsetWidth: 100 }}
							{...props}
						/>
					)}
				</ShrinkOut>
			</ExitingPersistence>,
		);

		rerender(<ExitingPersistence>{false}</ExitingPersistence>);

		expect(screen.getByTestId('target')).toHaveStyle({ height: '25px' });
		expect(screen.getByTestId('target')).toHaveStyle({ width: '100px' });
	});

	it('should apply border box when exiting to prevent sizing changing', () => {
		const { rerender } = render(
			<ExitingPersistence>
				<ShrinkOut>
					{(props) => (
						<ComponentStub
							testId="target"
							box={{ offsetHeight: 25, offsetWidth: 100 }}
							{...props}
						/>
					)}
				</ShrinkOut>
			</ExitingPersistence>,
		);

		rerender(<ExitingPersistence>{false}</ExitingPersistence>);

		expect(screen.getByTestId('target')).toHaveStyle({ boxSizing: 'border-box' });
	});

	it('should mark width and margin as styles that will change when exiting', () => {
		const { rerender } = render(
			<ExitingPersistence>
				<ShrinkOut>
					{(props) => (
						<ComponentStub
							testId="target"
							box={{ offsetHeight: 25, offsetWidth: 100 }}
							{...props}
						/>
					)}
				</ShrinkOut>
			</ExitingPersistence>,
		);

		rerender(<ExitingPersistence>{false}</ExitingPersistence>);

		expect(screen.getByTestId('target')).toHaveStyle({ willChange: 'width,margin' });
	});

	it('should transition down to take no horizontal space after two frames', () => {
		const { rerender } = render(
			<ExitingPersistence>
				<ShrinkOut>
					{(props) => (
						<ComponentStub
							testId="target"
							box={{ offsetHeight: 25, offsetWidth: 100 }}
							{...props}
						/>
					)}
				</ShrinkOut>
			</ExitingPersistence>,
		);
		rerender(<ExitingPersistence>{false}</ExitingPersistence>);

		raf.step();
		raf.step();

		expect(screen.getByTestId('target')).toHaveStyle({
			transitionProperty: 'width,margin',
		});
		expect(screen.getByTestId('target')).toHaveStyle({ width: '0px' });
		expect(screen.getByTestId('target')).toHaveStyle({ margin: '0px' });
	});

	it('should take small duration to complete exiting', () => {
		const { rerender } = render(
			<ExitingPersistence>
				<ShrinkOut>
					{(props) => (
						<ComponentStub
							testId="target"
							box={{ offsetHeight: 25, offsetWidth: 100 }}
							{...props}
						/>
					)}
				</ShrinkOut>
			</ExitingPersistence>,
		);
		rerender(<ExitingPersistence>{false}</ExitingPersistence>);

		raf.step();
		raf.step();

		expect(screen.getByTestId('target')).toHaveStyle({
			transitionDuration: `${durations.small}ms`,
		});
	});

	it('should ease in to exiting', () => {
		const { rerender } = render(
			<ExitingPersistence>
				<ShrinkOut>
					{(props) => (
						<ComponentStub
							testId="target"
							box={{ offsetHeight: 25, offsetWidth: 100 }}
							{...props}
						/>
					)}
				</ShrinkOut>
			</ExitingPersistence>,
		);
		rerender(<ExitingPersistence>{false}</ExitingPersistence>);

		raf.step();
		raf.step();

		expect(screen.getByTestId('target').style.transitionTimingFunction).toEqual(easeIn);
	});

	it('should callback when finished exiting', () => {
		jest.useFakeTimers();
		const callback = jest.fn();
		const { rerender } = render(
			<ExitingPersistence>
				<ShrinkOut onFinish={callback}>
					{(props) => (
						<ComponentStub
							testId="target"
							box={{ offsetHeight: 25, offsetWidth: 100 }}
							{...props}
						/>
					)}
				</ShrinkOut>
			</ExitingPersistence>,
		);
		rerender(<ExitingPersistence>{false}</ExitingPersistence>);

		raf.step();
		raf.step();
		act(() => {
			// jest.advanceTimersByTime(smallDurationMs);
			jest.runAllTimers();
		});

		expect(callback).toHaveBeenCalledWith('exiting');
		jest.useRealTimers();
	});

	it('should be removed from the DOM when finished exiting', () => {
		jest.useFakeTimers();
		const callback = jest.fn();
		const { rerender, baseElement } = render(
			<ExitingPersistence>
				<ShrinkOut onFinish={callback}>
					{(props) => (
						<ComponentStub
							testId="target"
							box={{ offsetHeight: 25, offsetWidth: 100 }}
							{...props}
						/>
					)}
				</ShrinkOut>
			</ExitingPersistence>,
		);
		rerender(<ExitingPersistence>{false}</ExitingPersistence>);

		raf.step();
		raf.step();
		act(() => {
			// jest.advanceTimersByTime(100);
			jest.runAllTimers();
		});
		expect(within(baseElement).queryByTestId('target')).not.toBeInTheDocument();
		jest.useRealTimers();
	});
});
