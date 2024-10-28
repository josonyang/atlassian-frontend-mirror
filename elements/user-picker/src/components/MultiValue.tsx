/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';
import { Box, Inline, xcss } from '@atlaskit/primitives';
import { components, type OptionType } from '@atlaskit/select';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import { AddOptionAvatar } from './AddOptionAvatar';
import { SizeableAvatar } from './SizeableAvatar';
import { getAvatarUrl, isEmail, isGroup, isTeam } from './utils';
import { type Option, type UserPickerProps } from '../types';
import PeopleIcon from '@atlaskit/icon/core/migration/people-group--people';
import { type MultiValueProps } from '@atlaskit/select';
import { token } from '@atlaskit/tokens';
import { VerifiedTeamIcon } from '@atlaskit/people-teams-ui-public/verified-team-icon';
import { fg } from '@atlaskit/platform-feature-flags';

export const scrollToValue = (valueContainer: HTMLDivElement, control: HTMLElement) => {
	const { top, height } = valueContainer.getBoundingClientRect();
	const { height: controlHeight } = control.getBoundingClientRect();

	if (top - height < 0) {
		valueContainer.scrollIntoView();
	}

	if (top + height > controlHeight) {
		valueContainer.scrollIntoView(false);
	}
};

const groupTagContainer = xcss({
	paddingLeft: 'space.025',
	marginTop: 'space.025',
});

const nameWrapper = css({
	font: token('font.body'),
	paddingLeft: token('space.050', '4px'),
});

type Props = MultiValueProps<OptionType> & {
	isFocused?: boolean;
	data: Option;
	innerProps: any;
	removeProps: { onClick: Function };
	selectProps: UserPickerProps;
	ref?: React.RefObject<HTMLDivElement>;
};

export class MultiValue extends React.Component<Props> {
	private containerRef: React.RefObject<HTMLDivElement>;
	constructor(props: Props) {
		super(props);
		this.containerRef = React.createRef<HTMLDivElement>();
	}

	componentDidUpdate() {
		const { isFocused } = this.props;
		if (
			isFocused &&
			this.containerRef.current &&
			this.containerRef.current.parentElement &&
			this.containerRef.current.parentElement.parentElement
		) {
			scrollToValue(
				this.containerRef.current,
				this.containerRef.current.parentElement.parentElement,
			);
		}
	}

	shouldComponentUpdate(nextProps: Props) {
		const {
			data: { label, data },
			innerProps,
			isFocused,
		} = this.props;

		const {
			data: { label: nextLabel, data: nextData },
			innerProps: nextInnerProps,
			isFocused: nextIsFocused,
		} = nextProps;

		// We can ignore onRemove here because it is an anonymous function
		// that will be recreated every time but with the same implementation.
		return (
			data !== nextData ||
			label !== nextLabel ||
			innerProps !== nextInnerProps ||
			isFocused !== nextIsFocused
		);
	}

	getElemBefore = () => {
		const {
			data: { data },
		} = this.props;
		if (isEmail(data)) {
			// This element is a decorative icon and does not require a label
			return <AddOptionAvatar isLozenge />;
		}

		if (isGroup(data)) {
			return (
				<Box xcss={groupTagContainer}>
					<PeopleIcon
						LEGACY_margin="-2px 0 0 0"
						color="currentColor"
						label="" // This element is a decorative icon and does not require a label
						LEGACY_size="small"
					/>
				</Box>
			);
		}

		return (
			<SizeableAvatar
				appearance="multi"
				src={getAvatarUrl(data)}
				type={isTeam(data) && fg('verified-team-in-user-picker') ? 'team' : 'person'}
			/>
		);
	};

	getElemAfter = () => {
		const {
			data: { data },
		} = this.props;
		if (isTeam(data) && data.verified && fg('verified-team-in-user-picker')) {
			return <VerifiedTeamIcon size="small" />;
		}
		return null;
	};

	render() {
		const { children, innerProps, ...rest } = this.props;

		return (
			<components.MultiValue
				{...rest}
				innerProps={{ ref: this.containerRef }}
				cropWithEllipsis={false}
			>
				<Inline alignBlock="center">
					{this.getElemBefore()} <div css={nameWrapper}>{children}</div>
					{this.getElemAfter()}
				</Inline>
			</components.MultiValue>
		);
	}
}
