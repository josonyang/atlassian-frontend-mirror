import React from 'react';

import { token } from '@atlaskit/tokens';

import Card from './token-card-base';

const TokenBrandCodeBlock = `// bold styles
color: token('color.text.inverse'),
backgroundColor: token('color.background.brand.bold'),
border: \`1px solid \${token('color.border.brand')}\`,
hoverBackgroundColor: token('color.background.brand.bold.hovered'),
activeBackgroundColor: token('color.background.brand.bold.pressed'),
iconColor: token('color.icon.inverse'),
`;

const brandStyles = {
	bold: {
		color: token('color.text.inverse'),
		backgroundColor: token('color.background.brand.bold'),
		border: `1px solid ${token('color.border.brand')}`,
		hoverBackgroundColor: token('color.background.brand.bold.hovered'),
		activeBackgroundColor: token('color.background.brand.bold.pressed'),
		iconColor: token('color.icon.inverse'),
	},
};

const TokenBrand = () => {
	return (
		// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
		<div style={{ display: 'flex', columnGap: '24px' }}>
			{Object.entries(brandStyles).map(([key, subStyle]) => (
				<Card key={key} tokenSet={subStyle} />
			))}
		</div>
	);
};

export default { example: TokenBrand, code: TokenBrandCodeBlock };
