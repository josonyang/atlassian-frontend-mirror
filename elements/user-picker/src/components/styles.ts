import { B100, N0, N10, N20, N30, N100, R50, R400, N90 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import memoizeOne from 'memoize-one';
import { mergeStyles, type StylesConfig } from '@atlaskit/select';
import { fg } from '@atlaskit/platform-feature-flags';

export const BORDER_PADDING = token('space.075', '6px');
export const AVATAR_PADDING = 6;
export const INDICATOR_WIDTH = 39;

export const getStyles = memoizeOne(
	(
		width: string | number,
		isMulti?: boolean,
		isCompact?: boolean,
		overrideStyles?: StylesConfig,
		isVisualRefresh?: boolean,
		isPopupStyles?: boolean,
		height?: number | string,
	): StylesConfig => {
		let styles: StylesConfig = {
			menu: (css, state) => ({
				...css,
				width,
				minWidth: state.selectProps.menuMinWidth,
				zIndex: '400',
			}),
			menuList: (css) => ({
				...css,
				zIndex: '400',
			}),
			control: (css, state) => {
				const isMulti = state.selectProps.isMulti;
				return {
					...css,
					width,
					borderColor: state.isFocused
						? token('color.border.focused', css.borderColor)
						: state.isInvalid
							? token('color.border.danger', R400)
							: state.selectProps.subtle || state.selectProps.noBorder
								? 'transparent'
								: token('color.border.input', N90),
					backgroundColor: state.isFocused
						? token('color.background.input', css['backgroundColor'])
						: state.selectProps.subtle
							? 'transparent'
							: state.selectProps.textFieldBackgroundColor
								? token('color.background.input', N10)
								: token('color.background.input', N20),
					'&:hover .fabric-user-picker__clear-indicator': { opacity: 1 },
					':hover': {
						...css[':hover'],
						borderColor: state.isFocused
							? css[':hover']
								? token('color.border.focused', css[':hover'].borderColor)
								: token('color.border.focused', B100)
							: state.isInvalid
								? token('color.border.danger', R400)
								: state.selectProps.subtle
									? 'transparent'
									: token('color.border.input', N90),
						backgroundColor:
							state.selectProps.subtle && state.selectProps.hoveringClearIndicator
								? token('color.background.danger', R50)
								: state.isFocused
									? css[':hover']
										? token('color.background.input', css[':hover'].backgroundColor)
										: token('color.background.input', N0)
									: state.isDisabled
										? token('color.background.disabled', N10)
										: token('color.background.input.hovered', N30),
					},
					padding: 0,
					minHeight: (height && fg('jifjam_bulk_operations')) || isCompact ? 'none' : 44,
					/* IE 11 needs to set height explicitly to be vertical align when being in not compact mode */
					height:
						height && fg('jifjam_bulk_operations') ? height : isCompact || isMulti ? '100%' : 44,
					maxWidth: '100%',
				};
			},
			clearIndicator: ({ paddingTop, paddingBottom, paddingLeft, paddingRight, ...css }) => ({
				...css,
				// By default show clear indicator, except for on devices where "hover" is supported.
				// This means mobile devices (which do not support hover) will be able to see the clear indicator.
				opacity: 1,
				'@media (hover: hover) and (pointer: fine)': {
					opacity: 0,
				},
				transition: css.transition + ', opacity 150ms',
				paddingTop: 0,
				padding: 0,
				':hover': {
					color: token('color.icon.danger', R400),
				},
			}),
			indicatorsContainer: (css) => ({
				...css,
				paddingRight: token('space.050', '4px'),
			}),
			valueContainer: ({ paddingTop, paddingBottom, position, ...css }, state) => {
				const isMulti = state.selectProps.isMulti;

				return {
					...css,
					gridTemplateColumns: 'auto 1fr',
					paddingTop: isCompact ? 0 : BORDER_PADDING,
					paddingBottom: isCompact ? 0 : BORDER_PADDING,
					paddingLeft: isMulti ? BORDER_PADDING : 0,
					overflowX: 'hidden',
					overflowY: 'auto',
					scrollbarWidth: 'none',
					maxHeight: state.selectProps.maxPickerHeight || '100%',
					'::-webkit-scrollbar': {
						width: 0,
						background: 'transparent',
					},
				};
			},
			multiValue: (css) => ({
				...css,
				borderRadius: 24,
				cursor: 'default',
			}),
			multiValueLabel: (css) => ({
				...css,
				display: 'flex',
			}),
			multiValueRemove: (css) => ({
				...css,
				borderRadius: 24,
				cursor: 'pointer',
			}),
			placeholder: (css, state) => {
				// fix styling in IE 11: when the position is absolute and `left` prop is not defined,
				// IE and other browsers auto calculate value of "left" prop differently,
				// so we want to explicitly set value for the `left` property
				if (css.position === 'absolute' && !css.left) {
					css.left = `${BORDER_PADDING}px`;
				}

				return {
					...css,
					gridArea: '1/2/2/3',
					paddingLeft: state.selectProps.isMulti ? 0 : BORDER_PADDING,
					/* Margin left right of 2px set by default */
					// margin: `0 ${BORDER_PADDING}px`,
					margin: 0,
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				};
			},
			option: (css) => {
				if (isVisualRefresh) {
					return {
						...css,
						overflow: 'hidden',
						paddingLeft: isPopupStyles ? token('space.200', '16px') : token('space.100', '8px'),
						paddingRight: isPopupStyles ? token('space.200', '16px') : token('space.100', '8px'),
					};
				}
				return {
					...css,
					overflow: 'hidden',
				};
			},
			input: (css, state) => ({
				...css,
				gridArea: '1/2/2/3',
				gridTemplateColumns: isMulti && state.placeholder ? '0 123px' : css.gridTemplateColumns,
				/* Necessary to make input height and tag height the same. */
				margin: `${token('space.050', '4px')} 0`,
				/* Padding top and bottom of 2 is set by default. */
				paddingTop: 0,
				paddingBottom: 0,

				paddingLeft: state.selectProps.isMulti ? 0 : BORDER_PADDING,
				'& input::placeholder': {
					/* Chrome, Firefox, Opera, Safari 10.1+ */
					color: token('color.text.subtlest', N100),
					opacity: 1 /* Firefox */,
				},
				'& input:-ms-input-placeholder': {
					/* Internet Explorer 10-11 */
					color: token('color.text.subtlest', N100),
				},
			}),
			singleValue: (css) => ({
				...css,
				margin: 0,
				gridArea: '1/2/2/3',
			}),
		};

		return overrideStyles ? mergeStyles(styles, overrideStyles) : styles;
	},
);

export const getPopupStyles = memoizeOne(
	(
		width: string | number,
		isMulti?: boolean,
		overrideStyles?: StylesConfig,
		isVisualRefresh?: boolean,
	): StylesConfig => ({
		...getStyles(width, isMulti, false, overrideStyles, isVisualRefresh, true),
	}),
);
