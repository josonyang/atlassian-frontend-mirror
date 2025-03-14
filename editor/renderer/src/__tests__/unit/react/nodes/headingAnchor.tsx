import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeadingAnchor from '../../../../react/nodes/heading-anchor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { renderWithIntl } from '@atlaskit/editor-test-helpers/rtl';

describe('Heading Anchor', () => {
	const onClickHandler = () => Promise.resolve();

	it('should render a tooltip with a meaningful message on hover', async () => {
		act(() => {
			renderWithIntl(<HeadingAnchor onCopyText={() => Promise.resolve()} level={1} />);
		});

		const copyLinkButton = screen.getByRole('button', {
			name: 'Copy link to heading',
		});
		expect(copyLinkButton).toBeVisible();

		await userEvent.hover(copyLinkButton);
		await waitFor(() => expect(screen.getByRole('tooltip', { name: 'Copy link to heading' })));
	});

	it('should update the tooltip with a meaningful message when the user has clicked the copy button', async () => {
		act(() => {
			renderWithIntl(<HeadingAnchor onCopyText={onClickHandler} level={1} />);
		});

		await userEvent.click(
			screen.getByRole('button', {
				name: 'Copy link to heading',
			}),
		);

		const copiedButton = await screen.findByRole('button', { name: 'Copied!' });
		await waitFor(() => expect(copiedButton).toBeVisible());

		await userEvent.hover(copiedButton);
		await waitFor(() => expect(screen.getByRole('tooltip', { name: 'Copied!' })).toBeVisible());
	});

	test('when hideFromScreenReader is true, it should hide the button from screen readers, and be tabbable', () => {
		act(() => {
			renderWithIntl(
				<HeadingAnchor level={1} hideFromScreenReader={true} onCopyText={jest.fn()} />,
			);
		});
		const anchorButton = screen.getByTestId('anchor-button');
		expect(anchorButton).toHaveAttribute('aria-hidden', 'true');
		expect(anchorButton).not.toHaveAttribute('tabindex');
		expect(anchorButton).not.toHaveAttribute('aria-label');
	});

	it('when hideFromScreenReader is not provided, it should be accessible, have the correct aria-label, but not be tabbable', () => {
		act(() => {
			renderWithIntl(<HeadingAnchor level={1} onCopyText={jest.fn()} />);
		});

		const anchorButton = screen.getByTestId('anchor-button');
		expect(anchorButton).toHaveAttribute('aria-hidden', 'false');
		expect(anchorButton).toHaveAttribute('tabindex', '-1');
		expect(anchorButton).toHaveAttribute('aria-label', 'Copy link to heading');
	});
});
