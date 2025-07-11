/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@compiled/react';

import Icon from '@atlaskit/icon';
import type { CustomGlyphProps } from '@atlaskit/icon';
import { token } from '@atlaskit/tokens';

const containerStyles = css({
	color: token('color.icon.warning'),
});

const CustomGlyph = (props: CustomGlyphProps) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		data-testid={props['data-testid']}
		aria-label={props['aria-label']}
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
		className={props.className}
	>
		<path
			fill="currentColor"
			d="M24 12c0 6.627-5.373 12-12 12-6.628 0-12-5.373-12-12C0 5.372 5.372 0 12 0c6.627 0 12 5.372 12 12zM12 2.92A9.08 9.08 0 002.92 12 9.08 9.08 0 0012 21.08 9.08 9.08 0 0021.081 12 9.08 9.08 0 0012 2.92zm0 16.722A7.64 7.64 0 014.36 12 7.64 7.64 0 0112 4.36 7.64 7.64 0 0119.641 12a7.64 7.64 0 01-7.64 7.641z"
		/>
	</svg>
);

const CustomIconExample = () => {
	return (
		<div css={containerStyles}>
			{/* primaryColor is explicitly set */}
			<Icon glyph={CustomGlyph} label="" primaryColor={token('color.icon.brand')} />
			{/* inherited from the color prop of the parent element */}
			<Icon glyph={CustomGlyph} label="" />
		</div>
	);
};

export default CustomIconExample;
