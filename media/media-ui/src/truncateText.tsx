import React from 'react';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from '@emotion/styled';

const truncateCommonStyles = `
  display: inline-block;
  vertical-align: bottom;
  white-space: nowrap;
  overflow: hidden;
`;

type TruncateStyledProps = Omit<Required<TruncateProps>, 'text'>;

// eslint-disable-next-line @atlaskit/design-system/no-styled-tagged-template-expression, @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const TruncateLeft = styled.span`
	${truncateCommonStyles}
	max-width: calc(100% - ${({ fontSizePX, endFixedChars }: TruncateStyledProps) =>
		fontFaceScaleFactor(fontSizePX) * endFixedChars + 1}em);
	min-width: ${({ fontSizePX, startFixedChars }: TruncateStyledProps) =>
		fontFaceScaleFactor(fontSizePX) * startFixedChars};
	text-overflow: ellipsis;
`;

// eslint-disable-next-line @atlaskit/design-system/no-styled-tagged-template-expression, @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const TruncateRight = styled.span`
	${truncateCommonStyles}
	max-width: calc(100% - ${({ fontSizePX, startFixedChars }: TruncateStyledProps) =>
		fontFaceScaleFactor(fontSizePX) * startFixedChars});
	position: relative;
`;

export type TruncateProps = {
	text: string;
	fontSizePX?: number;
	startFixedChars?: number;
	endFixedChars?: number;
};

export type TruncateOutput = {
	left: string;
	right: string;
};

export const calculateTruncation = (
	text: string,
	startFixedChars: number,
	endFixedChars: number,
): TruncateOutput => {
	const minAllowedLength = endFixedChars + startFixedChars;
	if (text.length <= minAllowedLength) {
		// if no truncation return same value for left and right
		return {
			left: text,
			right: text,
		};
	}
	const splitAt = text.length - endFixedChars;
	const left = text.substr(0, splitAt);
	const right = text.substr(splitAt);
	return {
		left,
		right,
	};
};

const fontFaceScaleFactor = (fontSizePX: number) =>
	(fontSizePX / 11) * 0.46; /* factor for fontSize of 11px */

const placeholder = ' ';

export const Truncate: React.FC<TruncateProps> = ({
	text,
	fontSizePX = 11, // Must be calibrated with fontSize
	startFixedChars = 4, // 1 char + 3 dots
	endFixedChars = 7, // file extension 3/4 chars + a fraction of the name
}) => {
	const { left: leftStr, right: rightStr } = calculateTruncation(
		text,
		startFixedChars,
		endFixedChars,
	);

	return (
		<>
			<TruncateLeft
				fontSizePX={fontSizePX}
				startFixedChars={startFixedChars}
				endFixedChars={endFixedChars}
			>
				{leftStr}
			</TruncateLeft>
			<TruncateRight
				fontSizePX={fontSizePX}
				startFixedChars={startFixedChars}
				endFixedChars={endFixedChars}
			>
				{leftStr === rightStr ? placeholder : rightStr}
			</TruncateRight>
		</>
	);
};
