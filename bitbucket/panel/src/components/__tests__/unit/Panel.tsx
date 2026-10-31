import React, { type PropsWithChildren } from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import Panel, { PanelStateless } from '../../Panel';

const NestedContent = () => (
	<p>
		Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
		veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud
		elit officia tempor esse quis.
	</p>
);

type TestWrapperProps = PropsWithChildren<{
	locale?: string;
}>;

const TestWrapper = ({ children, locale = 'en' }: TestWrapperProps) => (
	<IntlProvider locale={locale}>{children}</IntlProvider>
);

const Header = <span>Header</span>;

describe('Panel component', () => {
	it('toggles height prop of AnimateHeight component when clicked on header', async () => {
		const { container, getByText } = render(
			<TestWrapper>
				<Panel header={Header}>
					<NestedContent />
				</Panel>
			</TestWrapper>,
		);

		let panelContent = container.getElementsByClassName('panel-content');
		expect(panelContent[0]).toHaveStyle({ height: '0px' });

		await userEvent.click(getByText('Header'));
		await waitFor(() => expect(panelContent[0]).toHaveStyle({ height: 'auto' }));

		await expect(document.body).toBeAccessible();
	});
	it('is expanded by default when isDefaultExpanded is passed', async () => {
		const { container } = render(
			<TestWrapper>
				<Panel header={Header} isDefaultExpanded>
					<NestedContent />
				</Panel>
			</TestWrapper>,
		);

		const panelContent = container.getElementsByClassName('panel-content');
		expect(panelContent[0]).toHaveStyle({ height: 'auto' });

		await expect(document.body).toBeAccessible();
	});

	it('toggles aria-expanded on the expand button when the header is clicked', async () => {
		render(
			<TestWrapper>
				<Panel header={Header}>
					<NestedContent />
				</Panel>
			</TestWrapper>,
		);

		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('aria-expanded', 'false');

		await userEvent.click(screen.getByText('Header'));
		await waitFor(() => expect(button).toHaveAttribute('aria-expanded', 'true'));

		await userEvent.click(screen.getByText('Header'));
		await waitFor(() => expect(button).toHaveAttribute('aria-expanded', 'false'));
	});

	it('toggles via keyboard on the expand button', async () => {
		render(
			<TestWrapper>
				<Panel header={Header}>
					<NestedContent />
				</Panel>
			</TestWrapper>,
		);

		const button = screen.getByRole('button');
		await userEvent.tab();
		expect(button).toHaveFocus();

		await userEvent.keyboard('{Enter}');
		await waitFor(() => expect(button).toHaveAttribute('aria-expanded', 'true'));
	});

	it('uses ariaLabel as the accessible name of the expand button', () => {
		render(
			<TestWrapper>
				<Panel header={Header} ariaLabel="Toggle details">
					<NestedContent />
				</Panel>
			</TestWrapper>,
		);

		expect(screen.getByRole('button', { name: 'Toggle details' })).toBeInTheDocument();
	});

	it('PanelStateless calls onChange with the toggled value', async () => {
		const onChange = jest.fn();
		const { container } = render(
			<TestWrapper>
				<PanelStateless header={Header} isExpanded={false} onChange={onChange}>
					<NestedContent />
				</PanelStateless>
			</TestWrapper>,
		);

		await userEvent.click(screen.getByText('Header'));
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith(true);

		// consumers (frontbucket) query this class name
		expect(container.getElementsByClassName('panel-content')).toHaveLength(1);
	});

	it('renders the button wrapper hook used for hover/focus reveal', () => {
		const { container } = render(
			<TestWrapper>
				<Panel header={Header} isDefaultExpanded>
					<NestedContent />
				</Panel>
			</TestWrapper>,
		);

		expect(container.querySelector('[data-panel-button-wrapper]')).not.toBeNull();
	});
});
