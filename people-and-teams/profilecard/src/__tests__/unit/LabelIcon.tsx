import React from 'react';

import { mount, shallow } from 'enzyme';

import IconRecent from '@atlaskit/icon/core/migration/clock--recent';
import IconEmail from '@atlaskit/icon/core/migration/email';
import IconLocation from '@atlaskit/icon/core/migration/location';

import { IconLabel } from '../../components/Icon';
import { DetailsLabelIcon, DetailsLabelText } from '../../styled/Card';

describe('Profilecard', () => {
	describe('IconLabel', () => {
		it('should render no label when not children are present', () => {
			const wrapper = shallow(<IconLabel />);
			expect(wrapper.text()).toBe('');
		});

		it('should render LabelIcon without icon when icon property is not set', () => {
			const wrapper = mount(<IconLabel>Labeltext</IconLabel>);
			expect(wrapper.length).toBeGreaterThan(0);
			expect(wrapper.find(DetailsLabelText).text()).toBe('Labeltext');

			const icon = wrapper.find(DetailsLabelIcon);
			expect(icon.find('Memo(Icon)')).toHaveLength(0);
		});

		it('should render LabelIcon without icon when icon property is an unavailable icon', () => {
			const wrapper = mount(<IconLabel icon="foobar">Labeltext</IconLabel>);
			expect(wrapper.length).toBeGreaterThan(0);
			expect(wrapper.find(DetailsLabelText).text()).toBe('Labeltext');

			const icon = wrapper.find(DetailsLabelIcon);
			expect(icon.find('Memo(Icon)')).toHaveLength(0);
		});

		describe('should render LabelIcon with valid icons', () => {
			const validIcons = ['location', 'time', 'email'];
			const icons = [IconLocation, IconRecent, IconEmail];

			validIcons.forEach((label, index) => {
				it(`should render LabelIcon for ${label}`, () => {
					const wrapper = mount(<IconLabel icon={label}>Labeltext</IconLabel>);
					expect(wrapper.length).toBeGreaterThan(0);
					expect(wrapper.find(DetailsLabelText).text()).toBe('Labeltext');
					const icon = wrapper.find(icons[index]);
					expect(icon).toHaveLength(1);
				});
			});
		});
	});
});
