import React from 'react';

import { render, screen } from '@testing-library/react';

import IconRecent from '@atlaskit/icon/core/migration/clock--recent';
import IconEmail from '@atlaskit/icon/core/migration/email';
import IconLocation from '@atlaskit/icon/core/migration/location';

import { IconLabel } from '../../components/Icon';

describe('Profilecard', () => {
	describe('IconLabel', () => {
		it('should render no label when not children are present', () => {
			render(<IconLabel />);
			expect(screen.queryByText(/./)).not.toBeInTheDocument();
		});

		it('should render LabelIcon without icon when icon property is not set', () => {
			render(<IconLabel>Labeltext</IconLabel>);
			expect(screen.getByText('Labeltext')).toBeVisible();
			expect(screen.queryByRole('img')).not.toBeInTheDocument();
		});

		it('should render LabelIcon without icon when icon property is an unavailable icon', () => {
			render(<IconLabel icon="foobar">Labeltext</IconLabel>);
			expect(screen.getByText('Labeltext')).toBeVisible();
			expect(screen.queryByRole('img')).not.toBeInTheDocument();
		});

		describe('should render LabelIcon with valid icons', () => {
			const validIcons = ['location', 'time', 'email'];
			const icons = [IconLocation, IconRecent, IconEmail];

			validIcons.forEach((label, index) => {
				it(`should render LabelIcon for ${label}`, () => {
					render(<IconLabel icon={label}>Labeltext</IconLabel>);
					expect(screen.getByText('Labeltext')).toBeVisible();
					expect(screen.getByRole('img')).toBeVisible();
					expect(screen.getByRole('img')).toHaveAttribute('aria-label', icons[index].displayName);
				});
			});
		});

		it('should capture and report a11y violations', async () => {
			const { container } = render(<IconLabel icon="location">Labeltext</IconLabel>);
			await expect(container).toBeAccessible();
		});
	});
});
