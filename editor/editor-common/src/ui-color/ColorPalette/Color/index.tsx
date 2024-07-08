/** @jsx jsx */
import React, { type ReactElement } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';

import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import { N0 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import Tooltip from '@atlaskit/tooltip';

import { buttonStyle, buttonWrapperStyle } from './styles';

export interface Props {
	value: string;
	label: string;
	tabIndex?: number;
	isSelected?: boolean;
	onClick: (value: string, label: string) => void;
	borderColor: string;
	checkMarkColor?: string;
	autoFocus?: boolean;
	hexToPaletteColor?: (hexColor: string) => string | undefined;
	decorator?: ReactElement;
}

const Color = (props: Props) => {
	const {
		autoFocus,
		tabIndex,
		value,
		label,
		isSelected,
		borderColor,

		/** this is not new usage - old code extracted from editor-core */
		/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
		checkMarkColor = N0,
		/**
		 * When hexToPaletteColor prop is set,
		 * it will be used to get background color style based on
		 * value (which will be hexcode) prop
		 */
		hexToPaletteColor,
		decorator,
	} = props;

	const colorStyle = hexToPaletteColor ? hexToPaletteColor(value) : value;

	const onMouseDown = (e: React.MouseEvent<{}>) => {
		e.preventDefault();
	};

	const onClick = (e: React.MouseEvent<{}>) => {
		const { onClick, value, label } = props;
		e.preventDefault();
		onClick(value, label);
	};

	return (
		<Tooltip content={label}>
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
			<span css={buttonWrapperStyle}>
				<button
					type="button"
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
					css={buttonStyle}
					aria-label={label}
					role="radio"
					aria-checked={isSelected}
					onClick={onClick}
					onMouseDown={onMouseDown}
					tabIndex={tabIndex}
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
					className={`${isSelected ? 'selected' : ''}`}
					style={{
						backgroundColor: colorStyle || token('color.background.input', '#FFFFFF'),
						border: `1px solid ${borderColor}`,
					}}
					autoFocus={autoFocus}
				>
					{!decorator && isSelected && <EditorDoneIcon primaryColor={checkMarkColor} label="" />}
					{decorator}
				</button>
			</span>
		</Tooltip>
	);
};

export default Color;
