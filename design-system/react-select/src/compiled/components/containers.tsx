/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type CSSProperties, type ReactNode } from 'react';

import { css, cssMap, cx, jsx } from '@compiled/react';

import { fg } from '@atlaskit/platform-feature-flags';
import { token } from '@atlaskit/tokens';

import { getStyleProps } from '../../get-style-props';
import { type CommonPropsAndClassName, type GroupBase } from '../../types';

// ==============================
// Root Container
// ==============================

export interface ContainerProps<
	Option = unknown,
	IsMulti extends boolean = boolean,
	Group extends GroupBase<Option> = GroupBase<Option>,
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
	/**
	 * Whether the select is disabled.
	 */
	isDisabled: boolean;
	isFocused: boolean;
	/**
	 * The children to be rendered.
	 */
	children: ReactNode;
	/**
	 * Inner props to be passed down to the container.
	 */
	innerProps: {};
}

// iOS Safari automatically zooms into form inputs on focus when the font size is less than 16px.
// To prevent this zoom behaviour on mobile devices, the select container uses font.body.large (16px) by default,
// then switches to the smaller font.body on screens wider than 30rem (desktop).
// @see: https://medium.com/@rares.popescu/2-ways-to-avoid-the-automatic-zoom-in-on-input-fields-8a71479e542e

const containerStyles = cssMap({
	default: {
		position: 'relative',
		font: token('font.body.large'),
		pointerEvents: 'all',
		'@media (min-width: 30rem)': {
			font: token('font.body'),
		},
	},
	rtl: {
		direction: 'rtl',
	},
	disabled: {
		cursor: 'not-allowed',
	},
});

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export const SelectContainer: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: ContainerProps<Option, IsMulti, Group>,
) => JSX.Element = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: ContainerProps<Option, IsMulti, Group>,
) => {
	const { children, innerProps, isDisabled, isRtl, xcss } = props;
	const { className, css } = getStyleProps(props, 'container', {
		'--is-disabled': isDisabled,
		'--is-rtl': isRtl,
	});
	return (
		<div
			css={[
				containerStyles.default,
				isRtl && containerStyles.rtl,
				isDisabled && containerStyles.disabled,
			]}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop, @atlaskit/ui-styling-standard/local-cx-xcss, @compiled/local-cx-xcss
			className={cx(className as any, xcss, '-container')}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop
			style={css as CSSProperties}
			{...innerProps}
		>
			{children}
		</div>
	);
};

// ==============================
// Value Container
// ==============================

export interface ValueContainerProps<
	Option = unknown,
	IsMulti extends boolean = boolean,
	Group extends GroupBase<Option> = GroupBase<Option>,
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
	/**
	 * Props to be passed to the value container element.
	 */
	innerProps?: {};
	/**
	 * The children to be rendered.
	 */
	children: ReactNode;
	isDisabled: boolean;
	/**
	 * Whether the select is compact.
	 */
	isCompact?: boolean;
}

const valueContainerStyles = cssMap({
	default: {
		alignItems: 'center',
		display: 'grid',
		flex: 1,
		flexWrap: 'wrap',
		WebkitOverflowScrolling: 'touch',
		position: 'relative',
		overflow: 'hidden',
		paddingInlineEnd: token('space.075'),
		paddingInlineStart: token('space.075'),
	},
	verticalPaddingStandard: {
		paddingBlockStart: token('space.025'),
		paddingBlockEnd: token('space.025'),
	},
	verticalPaddingTagUpliftMulti: {
		paddingBlockStart: token('space.050'),
		paddingBlockEnd: token('space.050'),
	},
	verticalPaddingTagUpliftCompactMulti: {
		paddingBlockStart: token('space.025'),
		paddingBlockEnd: token('space.025'),
	},
	verticalPaddingCompactNonUplift: {
		paddingBlockStart: token('space.0'),
		paddingBlockEnd: token('space.0'),
	},
	flex: {
		display: 'flex',
	},
	flexWithGap: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: token('space.050'),
	},
});

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export const ValueContainer: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: ValueContainerProps<Option, IsMulti, Group>,
) => JSX.Element = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: ValueContainerProps<Option, IsMulti, Group>,
) => {
	const {
		children,
		innerProps,
		isMulti,
		hasValue,
		isCompact,
		xcss,
		selectProps: { controlShouldRenderValue },
	} = props;

	const { css, className } = getStyleProps(props, 'valueContainer', {
		'value-container': true,
		'value-container--is-multi': isMulti,
		'value-container--has-value': hasValue,
	});

	const ffTagUplifts = fg('platform-dst-lozenge-tag-badge-visual-uplifts');
	const tagUpliftMultiVertical = ffTagUplifts && isMulti;
	const tagUpliftChipRow =
		ffTagUplifts && isMulti && hasValue && controlShouldRenderValue;

	return (
		<div
			css={[
				valueContainerStyles.default,
				tagUpliftMultiVertical &&
					isCompact &&
					valueContainerStyles.verticalPaddingTagUpliftCompactMulti,
				tagUpliftMultiVertical &&
					!isCompact &&
					valueContainerStyles.verticalPaddingTagUpliftMulti,
				!tagUpliftMultiVertical && !isCompact && valueContainerStyles.verticalPaddingStandard,
				!tagUpliftMultiVertical &&
					isCompact &&
					valueContainerStyles.verticalPaddingCompactNonUplift,
				isMulti && hasValue && controlShouldRenderValue && valueContainerStyles.flex,
				tagUpliftChipRow && valueContainerStyles.flexWithGap,
			]}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop, @atlaskit/ui-styling-standard/local-cx-xcss, @compiled/local-cx-xcss
			className={cx(className as any, xcss, '-ValueContainer')}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop
			style={css as CSSProperties}
			{...innerProps}
		>
			{children}
		</div>
	);
};

// ==============================
// Indicator Container
// ==============================

export interface IndicatorsContainerProps<
	Option = unknown,
	IsMulti extends boolean = boolean,
	Group extends GroupBase<Option> = GroupBase<Option>,
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
	isDisabled: boolean;
	/**
	 * The children to be rendered.
	 */
	children: ReactNode;
	/**
	 * Props to be passed to the indicators container element.
	 */
	innerProps?: {};
}

const indicatorContainerStyles = css({
	display: 'flex',
	alignItems: 'center',
	flexShrink: 0,
	alignSelf: 'stretch',
	paddingInlineEnd: token('space.050'),
});

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export const IndicatorsContainer: <
	Option,
	IsMulti extends boolean,
	Group extends GroupBase<Option>,
>(
	props: IndicatorsContainerProps<Option, IsMulti, Group>,
) => JSX.Element = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: IndicatorsContainerProps<Option, IsMulti, Group>,
) => {
	const { children, innerProps, xcss } = props;
	const { css, className } = getStyleProps(props, 'indicatorsContainer', {
		indicators: true,
	});
	return (
		<div
			css={indicatorContainerStyles}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop
			style={css as CSSProperties}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop, @atlaskit/ui-styling-standard/local-cx-xcss, @compiled/local-cx-xcss
			className={cx(className as any, xcss, '-IndicatorsContainer')}
			{...innerProps}
		>
			{children}
		</div>
	);
};
