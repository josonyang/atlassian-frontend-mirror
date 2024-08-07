/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
import React from 'react';

import { useIconThemed } from '../use-icon-themed';

export default function IconListOrdered() {
	const { iconThemed } = useIconThemed();
	const lineColour = iconThemed({ light: '#C1C7D0', dark: '#454F59' });
	return (
		<svg focusable="false" aria-hidden width={40} height={40} viewBox="0 0 40 40">
			<g fill="none" fillRule="evenodd">
				<path fill={iconThemed({ light: '#FFF', dark: '#161A1D' })} d="M0 0h40v40H0z" />
				<g transform="translate(9 9)">
					<rect fill={lineColour} x={6} y={10} width={17} height={2} rx={1} />
					<rect fill={lineColour} x={6} y={2} width={17} height={2} rx={1} />
					<rect fill={lineColour} x={6} y={18} width={17} height={2} rx={1} />
					<path
						fill={iconThemed({ light: '#6C798F', dark: '#5A6977' })}
						d="M1.159 4.996v-3.58h-.056L0 2.176v-.875L1.162.5H2.1v4.496zM0 9.97C0 9.094.67 8.5 1.648 8.5c.943 0 1.6.542 1.6 1.319 0 .492-.266.915-1.049 1.65l-.864.825v.056h1.98v.786H.052v-.66L1.53 11.03c.636-.62.795-.855.795-1.15 0-.363-.294-.62-.708-.62-.438 0-.739.288-.739.705v.019H0v-.016zm1.172 9.22v-.71h.554c.431 0 .724-.251.724-.623 0-.365-.283-.598-.727-.598-.441 0-.734.249-.76.642H.086c.032-.86.67-1.401 1.663-1.401.932 0 1.603.51 1.603 1.225 0 .526-.33.935-.838 1.04v.056c.624.07 1.014.485 1.014 1.083 0 .797-.75 1.373-1.785 1.373-1.015 0-1.701-.56-1.742-1.417h.91c.028.384.353.627.841.627.475 0 .806-.268.806-.655 0-.397-.312-.643-.822-.643h-.563z"
					/>
				</g>
			</g>
		</svg>
	);
}
