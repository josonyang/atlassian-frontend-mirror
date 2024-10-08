import EmailIcon from '@atlaskit/icon/core/migration/email';
import { N500 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import { shallow } from 'enzyme';
import React from 'react';
import { AddOptionAvatar, type AddOptionAvatarProps } from '../../../components/AddOptionAvatar';

describe('AddOptionAvatar', () => {
	const shallowAddOptionAvatar = (props: AddOptionAvatarProps) =>
		shallow(<AddOptionAvatar {...props} />);

	it('should render email Icon', () => {
		const component = shallowAddOptionAvatar({
			label: 'Invite',
			isLozenge: false,
		});

		const inviteIcon = component.find(EmailIcon);
		expect(inviteIcon).toHaveLength(1);
		expect(inviteIcon.props()).toMatchObject({
			label: 'Invite',
			LEGACY_size: 'medium',
			color: token('color.text.subtle', N500),
		});
	});
});
