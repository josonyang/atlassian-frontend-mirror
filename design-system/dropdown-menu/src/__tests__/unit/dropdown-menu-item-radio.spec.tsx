import React from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { ffTest } from '@atlassian/feature-flags-test-utils';

import DropdownMenu, { DropdownItemRadio, DropdownItemRadioGroup } from '../../index';

/**
 * With the FF off the default selected state is not persisted.
 */
ffTest.on('platform_dst_dropdown_radio_default_selected_fix', 'Dropdown item radio', () => {
	it('should persist default selected state', async () => {
		render(
			<DropdownMenu trigger="Views" shouldRenderToParent>
				<DropdownItemRadioGroup title="Views" id="actions">
					<DropdownItemRadio id="detail" defaultSelected>
						Detail view
					</DropdownItemRadio>
					<DropdownItemRadio id="list">List view</DropdownItemRadio>
				</DropdownItemRadioGroup>
			</DropdownMenu>,
		);

		// Open the dropdown
		await userEvent.click(screen.getByRole('button', { name: 'Views' }));

		// The `defaultSelected` item should be checked
		expect(screen.getByRole('menuitemradio', { name: 'Detail view' })).toBeChecked();

		// Close the dropdown
		await userEvent.click(screen.getByRole('button', { name: 'Views' }));
		expect(screen.queryByRole('menuitemradio', { name: 'Detail view' })).not.toBeInTheDocument();

		// Open the dropdown
		await userEvent.click(screen.getByRole('button', { name: 'Views' }));

		// The `defaultSelected` item should still be checked
		expect(screen.getByRole('menuitemradio', { name: 'Detail view' })).toBeChecked();
	});
});
