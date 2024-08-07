import React from 'react';

import { B400, B50, N10, N30, N500 } from '@atlaskit/theme/colors';
import { borderRadius as borderRadiusFn } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';

import { ButtonItem, type CSSFn, type ItemState } from '../src';

import ImgIcon from './common/img-icon';
import Yeti from './icons/yeti.png';

export default () => (
	<div data-testid="button-items">
		<ButtonItem>Activate</ButtonItem>
		<ButtonItem isDisabled>Activate</ButtonItem>
		<ButtonItem>Activate</ButtonItem>
		<ButtonItem description="Next-gen software project">Activate</ButtonItem>
		<ButtonItem description="Legacy software project" isDisabled>
			Activate
		</ButtonItem>
		<ButtonItem iconBefore={<ImgIcon src={Yeti} alt="" />} description="Next-gen software project">
			Activate
		</ButtonItem>
		<ButtonItem
			// eslint-disable-next-line @repo/internal/react/no-unsafe-overrides
			cssFn={styleOverrides}
			description="Style overrides via cssFn"
		>
			Activate
		</ButtonItem>
		<ButtonItem
			isDisabled
			// eslint-disable-next-line @repo/internal/react/no-unsafe-overrides
			cssFn={styleOverrides}
			description="Style overrides via cssFn"
		>
			Activate
		</ButtonItem>

		<ButtonItem
			// eslint-disable-next-line @repo/internal/react/no-unsafe-overrides
			cssFn={styleOverrides}
			description="Style overrides via cssFn"
		>
			Activate
		</ButtonItem>
	</div>
);

// Mimics overrides in side-navigation
const borderRadius = borderRadiusFn();
const styleOverrides: CSSFn = ({ isSelected, isDisabled }: ItemState) => {
	return {
		padding: `${token('space.100', '8px')} ${token('space.300', '24px')}`,
		borderRadius,
		backgroundColor: N10,
		color: N500,
		'&:hover': {
			backgroundColor: N30,
			textDecoration: 'none',
			color: N500,
		},
		'&:active': {
			color: B400,
			backgroundColor: B50,
			boxShadow: 'none',
		},
		['& [data-item-elem-before]']: {
			display: 'flex',
			height: 8 * 1.25,
			width: 8 * 1.25,
			alignItems: 'center',
			justifyContent: 'center',
			marginRight: token('space.200', '16px'),
		},
		...(isSelected && {
			backgroundColor: N30,
			color: B400,
		}),
		...(isDisabled && {
			backgroundColor: `${N10} !important`,
		}),
	};
};
