import React, { useContext, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { SideNavState, SideNavTrigger } from '../../side-nav/types';
import { useToggleSideNav } from '../../side-nav/use-toggle-side-nav';
import {
	SetSideNavVisibilityState,
	SideNavVisibilityState,
} from '../../side-nav/visibility-context';

import { resetMatchMedia, setMediaQuery } from './_test-utils';

describe('useToggleSideNav', () => {
	beforeEach(() => {
		resetMatchMedia();
	});

	/**
	 * These unit tests are not using `renderHook`, but are instead using a test component to assert that the returned function
	 * is updating the side nav state correctly.
	 *
	 * This is because the hook calls the state updater function (SetSideNavVisibilityState) by passing a function to it, so it
	 * can access the current state when updating the value. This means we can't simply mock the function and assert with
	 * `toHaveBeenCalledWith` - as it is called with a function, not a value.
	 */
	function TestComponent({
		trigger,
	}: {
		trigger?: SideNavTrigger;
	} = {}) {
		const sideNavState = useContext(SideNavVisibilityState);
		const toggleSideNav = useToggleSideNav({ trigger });

		return (
			<div>
				{sideNavState ? (
					<>
						<p>Mobile state: {sideNavState.mobile}</p>
						<p>Desktop state: {sideNavState.desktop}</p>
						<p>Flyout state: {sideNavState.flyout}</p>
						<p>Last trigger: {sideNavState?.lastTrigger || 'null'}</p>
					</>
				) : (
					<p>State not initialised</p>
				)}
				<button type="button" onClick={toggleSideNav}>
					Toggle side nav
				</button>
			</div>
		);
	}

	// We are using a mock provider instead of `SideNavVisibilityProvider` so we can set an initial value.
	// The actual provider component does not set a default value, so it can be set after SSR based on the props provided to SideNav.
	function MockProvider({
		children,
		initialState,
	}: {
		children: React.ReactNode;
		initialState: SideNavState | null;
	}) {
		// Defaults to null so we can determine if the value has been set yet (for SSR)
		const [sideNavState, setSideNavState] = useState<SideNavState | null>(initialState);

		return (
			<SideNavVisibilityState.Provider value={sideNavState}>
				<SetSideNavVisibilityState.Provider value={setSideNavState}>
					{children}
				</SetSideNavVisibilityState.Provider>
			</SideNavVisibilityState.Provider>
		);
	}

	describe('when screen size is desktop', () => {
		beforeEach(() => {
			setMediaQuery('(min-width: 64rem)', { initial: true });
		});

		it('should update the side nav visibility correctly when collapsed on desktop', async () => {
			const user = userEvent.setup();

			render(
				<MockProvider
					initialState={{
						mobile: 'collapsed',
						desktop: 'collapsed',
						flyout: 'closed',
						lastTrigger: null,
					}}
				>
					<TestComponent />
				</MockProvider>,
			);

			// Verify state before expanding
			expect(screen.getByText('Mobile state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Desktop state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();

			await user.click(screen.getByRole('button', { name: 'Toggle side nav' }));

			// Only the desktop state should change and should now be expanded
			expect(screen.getByText('Mobile state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Desktop state: expanded')).toBeInTheDocument();
			expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();
		});

		it('should update the side nav visibility correctly when expanded on desktop', async () => {
			const user = userEvent.setup();

			render(
				<MockProvider
					initialState={{
						mobile: 'collapsed',
						desktop: 'expanded',
						flyout: 'closed',
						lastTrigger: null,
					}}
				>
					<TestComponent />
				</MockProvider>,
			);

			// Verify state before expanding
			expect(screen.getByText('Mobile state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Desktop state: expanded')).toBeInTheDocument();
			expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();

			await user.click(screen.getByRole('button', { name: 'Toggle side nav' }));

			// Only the desktop state should change and should now be collapsed
			expect(screen.getByText('Mobile state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Desktop state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();
		});

		it('should not throw an error when clicked if the side nav state is not initialised', async () => {
			const user = userEvent.setup();

			render(
				<MockProvider initialState={null}>
					<TestComponent />
				</MockProvider>,
			);

			expect(screen.getByText('State not initialised')).toBeInTheDocument();

			await expect(
				user.click(screen.getByRole('button', { name: 'Toggle side nav' })),
			).resolves.not.toThrow();

			// Should be no change
			expect(screen.getByText('State not initialised')).toBeInTheDocument();
		});
	});

	describe('when screen size is mobile', () => {
		it('should update the side nav visibility correctly when collapsed on mobile', async () => {
			const user = userEvent.setup();

			render(
				<MockProvider
					initialState={{
						mobile: 'collapsed',
						desktop: 'collapsed',
						flyout: 'closed',
						lastTrigger: null,
					}}
				>
					<TestComponent />
				</MockProvider>,
			);

			// Verify state before expanding
			expect(screen.getByText('Mobile state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Desktop state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();

			await user.click(screen.getByRole('button', { name: 'Toggle side nav' }));

			// Only the mobile state should change and should now be expanded
			expect(screen.getByText('Mobile state: expanded')).toBeInTheDocument();
			expect(screen.getByText('Desktop state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();
		});

		it('should update the side nav visibility correctly when expanded on mobile', async () => {
			const user = userEvent.setup();

			render(
				<MockProvider
					initialState={{
						mobile: 'expanded',
						desktop: 'collapsed',
						flyout: 'closed',
						lastTrigger: null,
					}}
				>
					<TestComponent />
				</MockProvider>,
			);

			// Verify state before expanding
			expect(screen.getByText('Mobile state: expanded')).toBeInTheDocument();
			expect(screen.getByText('Desktop state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();

			await user.click(screen.getByRole('button', { name: 'Toggle side nav' }));

			// Only the mobile state should change and should now be collapsed
			expect(screen.getByText('Mobile state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Desktop state: collapsed')).toBeInTheDocument();
			expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();
		});

		it('should not throw an error when clicked if the side nav state is not initialised', async () => {
			const user = userEvent.setup();

			render(
				<MockProvider initialState={null}>
					<TestComponent />
				</MockProvider>,
			);

			expect(screen.getByText('State not initialised')).toBeInTheDocument();

			await expect(
				user.click(screen.getByRole('button', { name: 'Toggle side nav' })),
			).resolves.not.toThrow();

			// Should be no change
			expect(screen.getByText('State not initialised')).toBeInTheDocument();
		});
	});

	it('should toggle the side nav visibility correctly when changing screen sizes', async () => {
		const matches = setMediaQuery('(min-width: 64rem)', { initial: true });
		const user = userEvent.setup();

		render(
			<MockProvider
				initialState={{
					mobile: 'collapsed',
					desktop: 'collapsed',
					flyout: 'closed',
					lastTrigger: null,
				}}
			>
				<TestComponent />
			</MockProvider>,
		);

		// Verify state before expanding
		expect(screen.getByText('Mobile state: collapsed')).toBeInTheDocument();
		expect(screen.getByText('Desktop state: collapsed')).toBeInTheDocument();
		expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Toggle side nav' }));

		// Only the desktop state should change and should now be expanded
		expect(screen.getByText('Mobile state: collapsed')).toBeInTheDocument();
		expect(screen.getByText('Desktop state: expanded')).toBeInTheDocument();
		expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();

		// Simulate changing to mobile screen
		matches(false);

		await user.click(screen.getByRole('button', { name: 'Toggle side nav' }));

		// Only the desktop state should change and should now be expanded
		expect(screen.getByText('Mobile state: expanded')).toBeInTheDocument();
		expect(screen.getByText('Desktop state: expanded')).toBeInTheDocument();
		expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();

		// Simulate changing back to desktop screen
		matches(true);

		await user.click(screen.getByRole('button', { name: 'Toggle side nav' }));

		// Only the desktop state should change and should now be collapsed
		expect(screen.getByText('Mobile state: expanded')).toBeInTheDocument();
		expect(screen.getByText('Desktop state: collapsed')).toBeInTheDocument();
		expect(screen.getByText('Flyout state: closed')).toBeInTheDocument();
	});

	it('should set the trigger correctly when provided', async () => {
		setMediaQuery('(min-width: 64rem)', { initial: true });
		const user = userEvent.setup();

		render(
			<MockProvider
				initialState={{
					mobile: 'collapsed',
					desktop: 'collapsed',
					flyout: 'closed',
					lastTrigger: null,
				}}
			>
				<TestComponent trigger="programmatic" />
			</MockProvider>,
		);

		// Verify initial state
		expect(screen.getByText('Last trigger: null')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Toggle side nav' }));

		// Verify the trigger was set correctly
		expect(screen.getByText('Last trigger: programmatic')).toBeInTheDocument();
		expect(screen.getByText('Desktop state: expanded')).toBeInTheDocument();
	});

	it('should use default trigger "programmatic" when no trigger is provided', async () => {
		setMediaQuery('(min-width: 64rem)', { initial: true });
		const user = userEvent.setup();

		render(
			<MockProvider
				initialState={{
					mobile: 'collapsed',
					desktop: 'collapsed',
					flyout: 'closed',
					lastTrigger: null,
				}}
			>
				<TestComponent />
			</MockProvider>,
		);

		// Verify initial state
		expect(screen.getByText('Last trigger: null')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Toggle side nav' }));

		// Verify the default trigger was set
		expect(screen.getByText('Last trigger: programmatic')).toBeInTheDocument();
		expect(screen.getByText('Desktop state: expanded')).toBeInTheDocument();
	});
});
