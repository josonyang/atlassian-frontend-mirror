/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import LikeIcon from '../../glyph/like';
import { token } from '@atlaskit/tokens';

import WarningIcon from '../../glyph/warning';

const stylesStyles = css({
	color: token('color.icon.warning'),
});

const IconPrimaryColorExample = () => {
	return (
		<div css={stylesStyles}>
			{/* primaryColor is explicitly set */}
			<LikeIcon primaryColor={token('color.icon.brand')} label="" />
			{/* inherited from the color prop of the parent element */}
			<WarningIcon label="" />
		</div>
	);
};

export default IconPrimaryColorExample;
