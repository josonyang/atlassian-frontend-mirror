/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::267cad59c76b16aeee5f58cfa4a1f733>>
 * @codegenCommand yarn workspace @atlaskit/temp-nav-app-icons build-temp-logos
 */
import React from 'react';

import { IconWrapper } from '../../utils/icon-wrapper';
import type { AppIconProps } from '../../utils/types';

// `height` is set to 100% to allow the SVG to scale with the parent element
const svg = `<svg height="100%" viewBox="0 0 24 24">
    <path fill="var(--tile-color,#fb9700)" d="M0 6a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z"/>
    <path fill="var(--icon-color, #101214)" d="M18.545 18.545a4.49 4.49 0 0 0-4.48-4.48h-4.13v-3.78h-4.48v7.434c0 .576.25.826.826.826zM5.455 5.455a4.454 4.454 0 0 0 4.455 4.48h4.155v3.78h4.48V6.28q0-.825-.826-.826z"/>
</svg>
`;

/**
 * __AlignIcon__
 *
 * A temporary component to represent the icon for Align.
 * @deprecated This component has been replaced by the component `AlignIcon` in `@atlaskit/logo`.
 * Please migrate any usages of this temporary component, using the prop `shouldUseNewLogoDesign` where necessary
 * to enable the new design by default.
 *
 */
export function AlignIcon({ size, appearance = 'brand', label = 'Align', testId }: AppIconProps) {
	return (
		<IconWrapper svg={svg} label={label} appearance={appearance} size={size} testId={testId} />
	);
}
