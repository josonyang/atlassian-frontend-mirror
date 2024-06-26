import React from 'react';
// eslint-disable-next-line
import icons from '!!raw-loader!../src/icons-sprite.svg';
// eslint-disable-next-line
import stuff from '!!style-loader!css-loader!../src/bundle.css';
import Warning from './utils/warning';

import iconIds from '../src/internal/iconIds';

// eslint-disable-next-line react/no-danger
const Spritemap = () => <div dangerouslySetInnerHTML={{ __html: icons }} />;

export default () => (
	<div>
		<Spritemap />
		<Warning />
		{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-global-styles -- Ignored via go/DSP-18766 */}
		<style>
			{`
            .icon-example {
              display: flex;
              align-items: center;
              font-family: monospace;
            }
            .icon-example > svg {
              margin-right: 16px;
            }
          `}
		</style>
		{iconIds.map((iconId) => (
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
			<p className="icon-example" key={iconId}>
				{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766 */}
				<svg focusable="false" className="ak-icon">
					<use xlinkHref={`#${iconId}`} />
				</svg>
				{`<svg focusable="false"><use xlink:href="#${iconId}" /></svg>`}
			</p>
		))}
	</div>
);
