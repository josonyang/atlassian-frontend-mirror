import React from 'react';

import Icon from '@atlaskit/icon';
import type { CustomGlyphProps, IconProps } from '@atlaskit/icon/types';

const MegaphoneStarIconGlyph = (props: CustomGlyphProps) => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 12 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		data-testid={props['data-testid']}
		aria-label={props['aria-label']}
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
		className={props.className}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M4.638 2.19104L3.6785 4.62354L1.247 5.58204C1.17438 5.61085 1.11209 5.66082 1.06821 5.72545C1.02432 5.79009 1.00085 5.86641 1.00085 5.94454C1.00085 6.02266 1.02432 6.09899 1.06821 6.16362C1.11209 6.22826 1.17438 6.27822 1.247 6.30704L3.6785 7.26604L4.638 9.69754C4.66682 9.77015 4.71678 9.83244 4.78141 9.87633C4.84605 9.92022 4.92237 9.94368 5.0005 9.94368C5.07863 9.94368 5.15495 9.92022 5.21958 9.87633C5.28422 9.83244 5.33418 9.77015 5.363 9.69754H5.3625L6.3215 7.26604L8.7535 6.30654C8.82592 6.27753 8.88799 6.22749 8.93171 6.16288C8.97543 6.09827 8.9988 6.02205 8.9988 5.94404C8.9988 5.86602 8.97543 5.7898 8.93171 5.72519C8.88799 5.66058 8.82592 5.61055 8.7535 5.58154L6.3215 4.62354L5.3625 2.19104C5.34288 2.14136 5.31321 2.09626 5.27535 2.05858C5.2375 2.02089 5.19227 1.99143 5.1425 1.97204C5.09496 1.95323 5.04419 1.94397 4.99307 1.9448C4.94196 1.94563 4.89151 1.95653 4.84461 1.97686C4.79771 1.9972 4.75527 2.02659 4.71974 2.06334C4.6842 2.10009 4.65625 2.14348 4.6375 2.19104H4.638ZM8.7865 1.17604L8.415 2.11904L7.473 2.49054C7.42134 2.51147 7.3771 2.54736 7.34595 2.59359C7.3148 2.63982 7.29816 2.69429 7.29816 2.75004C7.29816 2.80578 7.3148 2.86026 7.34595 2.90649C7.3771 2.95272 7.42134 2.9886 7.473 3.00954L8.415 3.38104L8.7865 4.32404C8.80706 4.3761 8.8428 4.42077 8.88907 4.45225C8.93535 4.48373 8.99003 4.50056 9.046 4.50056C9.10197 4.50056 9.15664 4.48373 9.20292 4.45225C9.2492 4.42077 9.28494 4.3761 9.3055 4.32404L9.678 3.38104L10.6195 3.00954C10.6718 2.98918 10.7167 2.95351 10.7483 2.90721C10.78 2.86091 10.7969 2.80612 10.7969 2.75004C10.7969 2.69395 10.78 2.63917 10.7483 2.59287C10.7167 2.54656 10.6718 2.5109 10.6195 2.49054L9.678 2.11904L9.3055 1.17654C9.29163 1.14092 9.27051 1.10858 9.24348 1.08155C9.21646 1.05453 9.18411 1.03341 9.1485 1.01954C9.07963 0.992897 9.00305 0.994432 8.93531 1.02381C8.86756 1.05319 8.81411 1.10805 8.7865 1.17654V1.17604ZM8.4345 7.67754L8.0625 8.61904L7.121 8.99104C7.08522 9.00482 7.05269 9.02589 7.02549 9.05292C6.99829 9.07995 6.97701 9.11234 6.963 9.14804C6.93614 9.21701 6.93769 9.29381 6.96729 9.36164C6.9969 9.42948 7.05216 9.48283 7.121 9.51004L8.0625 9.88154L8.4345 10.8235C8.463 10.8955 8.5195 10.9525 8.5915 10.981C8.66041 11.0079 8.73715 11.0064 8.80498 10.9769C8.8728 10.9474 8.9262 10.8923 8.9535 10.8235L9.3255 9.88154L10.267 9.51004C10.3193 9.48968 10.3642 9.45401 10.3958 9.40771C10.4275 9.3614 10.4444 9.30662 10.4444 9.25054C10.4444 9.19445 10.4275 9.13967 10.3958 9.09337C10.3642 9.04707 10.3193 9.0114 10.267 8.99104L9.3255 8.61904L8.9535 7.67754C8.93971 7.64167 8.91858 7.60909 8.89146 7.58188C8.86433 7.55467 8.83182 7.53343 8.796 7.51954C8.72709 7.49283 8.65041 7.49446 8.5827 7.52406C8.51498 7.55365 8.46171 7.60882 8.4345 7.67754V7.67754Z"
			fill="currentColor"
		/>
	</svg>
);

/**
 * __MegaphoneStarIcon__
 */
const MegaphoneStarIcon = ({ label, primaryColor, secondaryColor, size, testId }: IconProps) => (
	<Icon
		label={label}
		primaryColor={primaryColor}
		secondaryColor={secondaryColor}
		size={size}
		testId={testId}
		glyph={MegaphoneStarIconGlyph}
	/>
);

export default MegaphoneStarIcon;
