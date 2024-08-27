import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ExpandedFrame } from '../../../components/ExpandedFrame';
import { expectElementWithText } from '../../../../../__tests__/__utils__/unit-helpers';
import userEvent from '@testing-library/user-event';

describe('ExpandedFrame', () => {
	it('should not render an icon when isPlaceholder=true', async () => {
		render(<ExpandedFrame icon={<span data-testid="icon" />} isPlaceholder={true} />);
		expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
	});

	it('should render an icon when isPlaceholder=false', async () => {
		render(<ExpandedFrame icon={<span data-testid="icon" />} isPlaceholder={false} />);
		expect(await screen.findByTestId('icon')).toBeInTheDocument();
	});

	it('should not render text when isPlaceholder=true', async () => {
		render(<ExpandedFrame text="foobar" isPlaceholder={true} />);
		await expectElementWithText('expanded-frame', '');
	});

	it('should render text when isPlaceholder=false', async () => {
		render(<ExpandedFrame text="foobar" isPlaceholder={false} />);
		await expectElementWithText('expanded-frame', 'foobar');
	});

	it('should not allow scrolling when allowScrolling is undefined', async () => {
		render(<ExpandedFrame />);
		expect(await screen.findByTestId('embed-content-wrapper')).toHaveStyle('overflow: hidden');
	});

	it('should not allow scrolling when allowScrolling is false', async () => {
		render(<ExpandedFrame allowScrollBar={false} setOverflow={true} />);
		expect(await screen.findByTestId('embed-content-wrapper')).toHaveStyle('overflow: hidden');
	});

	it('should allow scrolling when allowScrolling is true', async () => {
		render(<ExpandedFrame allowScrollBar={true} />);
		expect(await screen.findByTestId('embed-content-wrapper')).toHaveStyle('overflow: auto');
	});

	it('should allow scrolling when allowScrolling is true and setOverflow is true', async () => {
		render(<ExpandedFrame allowScrollBar={true} setOverflow={true} />);
		expect(await screen.findByTestId('embed-content-wrapper')).toHaveStyle('overflow: auto');
	});

	it('should not set overflow property when setOverflow is false', async () => {
		render(<ExpandedFrame allowScrollBar={false} setOverflow={false} />);
		expect(await screen.findByTestId('embed-content-wrapper')).toHaveStyle('overflow: ');
	});

	it('should not allow scrolling (or clip content) when setOverflow is false even if allowScrollBar is true', async () => {
		render(<ExpandedFrame allowScrollBar={true} setOverflow={false} />);
		expect(await screen.findByTestId('embed-content-wrapper')).toHaveStyle('overflow: ');
	});

	it('should clip content and not allow scrolling when setOverflow is true and allowScrollBar is false', async () => {
		render(<ExpandedFrame allowScrollBar={false} setOverflow={true} />);
		expect(await screen.findByTestId('embed-content-wrapper')).toHaveStyle('overflow: hidden');
	});

	it('should not render header and frame when frameStyle = "hide" & href is provided', async () => {
		const { container } = render(<ExpandedFrame frameStyle="hide" href="some.url" />);
		expect(await screen.findByTestId('expanded-frame')).toBeDefined();
		const embedHeaderElements = container.getElementsByClassName('embed-header');
		expect(embedHeaderElements).toHaveLength(1);

		const frameStyle = window.getComputedStyle(embedHeaderElements[0]);
		expect(frameStyle.opacity).toBe('0');
	});

	it('should not render header and frame when frameStyle = "hide" & placeholder is true', async () => {
		const { container } = render(<ExpandedFrame frameStyle="hide" isPlaceholder={true} />);
		expect(await screen.findByTestId('expanded-frame')).toBeDefined();
		const embedHeaderElements = container.getElementsByClassName('embed-header');
		expect(embedHeaderElements).toHaveLength(1);

		const frameStyle = window.getComputedStyle(embedHeaderElements[0]);
		expect(frameStyle.opacity).toBe('0');
	});

	it('No tooltip is rendered by default', () => {
		render(<ExpandedFrame text="foobar" isPlaceholder={false} />);
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
	});

	it('Tooltip is rendered when hovered', async () => {
		render(<ExpandedFrame text="foobar" isPlaceholder={false} />);
		const header = await screen.getByText('foobar');

		await userEvent.hover(header);

		const tooltip = await waitFor(
			() =>
				screen.findByRole('tooltip', {
					name: 'foobar',
				}),
			{ timeout: 2000 },
		);

		expect(tooltip).toBeVisible();
	});

	it('Tooltip is not rendered when not hovered', async () => {
		render(<ExpandedFrame text="foobar" isPlaceholder={false} />);
		const header = await screen.getByText('foobar');

		await userEvent.hover(header);
		await userEvent.unhover(header);

		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
	});
});
