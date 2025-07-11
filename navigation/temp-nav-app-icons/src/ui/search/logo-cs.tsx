/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::61358862951418a6c20d332ec9e5bc3e>>
 * @codegenCommand yarn workspace @atlaskit/temp-nav-app-icons build-temp-logos
 */
import React from 'react';

import { LogoWrapper } from '../../utils/logo-wrapper';
import type { AppLogoProps } from '../../utils/types';

// `height` is set to 100% to allow the SVG to scale with the parent element
// The text color is set to "currentColor" to allow the SVG to inherit the color set by the parent based on the theme.
const svg = `<svg height="100%" viewBox="0 0 130 32">
    <path fill="var(--text-color, #1e1f21)" d="M128.82 16.35v8.99h-2.64v-8.53c0-3.16-1.1-4.72-3.62-4.72-2.45 0-4.14 1.63-4.14 4.72v8.53h-2.64V3.59h2.64v8.96c1.01-1.81 2.85-2.85 5.06-2.85 3.44 0 5.34 2.33 5.34 6.66m-16.04 6.21v2.36c-.92.49-2.33.71-3.74.71-5.46 0-8-3.31-8-8 0-4.63 2.55-7.94 8-7.94 1.38 0 2.45.18 3.65.74v2.45c-.98-.46-2.02-.74-3.47-.74-3.99 0-5.61 2.51-5.61 5.49s1.66 5.49 5.67 5.49c1.56 0 2.55-.21 3.5-.55m-18.23-6.29v9.05h-2.58V10h2.58v2.7c.89-1.81 2.42-3.1 5.43-2.91v2.58c-3.37-.34-5.43.68-5.43 3.93m-17.87 1.37c0 3.68 1.47 5.52 4.2 5.52 2.36 0 4.48-1.5 4.48-4.91v-1.23c0-3.4-1.93-4.91-4.17-4.91-2.97 0-4.51 1.96-4.51 5.52m8.68 7.67v-2.76c-.98 2.02-2.82 3.07-5.18 3.07-4.08 0-6.13-3.46-6.13-7.97 0-4.32 2.15-7.97 6.44-7.97 2.24 0 3.96 1.01 4.88 3.01V10H88v15.33zM65.08 12.09c-2.79 0-4.2 1.81-4.48 4.48h8.56c-.15-2.85-1.44-4.48-4.08-4.48m5.89 12.64c-1.26.68-3.19.92-4.75.92-5.73 0-8.25-3.31-8.25-8 0-4.63 2.58-7.94 7.24-7.94 4.72 0 6.62 3.28 6.62 7.94v1.2h-11.2c.37 2.61 2.06 4.29 5.67 4.29 1.78 0 3.28-.34 4.66-.83zm-15.33-4.95c0 3.5-2.08 5.86-7.08 5.86-3.89 0-5.7-.77-7.27-1.56v-2.82c1.87.98 4.75 1.69 7.42 1.69 3.04 0 4.17-1.2 4.17-2.97 0-1.78-1.1-2.73-4.94-3.65-4.54-1.1-6.56-2.67-6.56-5.98 0-3.13 2.39-5.46 7.08-5.46 2.91 0 4.78.71 6.16 1.47v2.76c-2.02-1.16-4.2-1.53-6.29-1.53-2.64 0-4.2.92-4.2 2.76 0 1.66 1.29 2.48 4.84 3.37 4.26 1.07 6.66 2.45 6.66 6.07"/>
    <path fill="var(--tile-color,#dddee1)" d="M0 8a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z"/>
    <path fill="var(--icon-color, #101214)" fill-rule="evenodd" d="M7.127 14.833a7.583 7.583 0 0 0 11.286 6.62l4.464 4.464 2.887-2.888-4.455-4.455a7.583 7.583 0 1 0-14.181-3.74m2.917 0a4.667 4.667 0 1 0 9.333 0 4.667 4.667 0 0 0-9.333 0" clip-rule="evenodd"/>
</svg>
`;

/**
 * __SearchLogoCS__
 *
 * A temporary component to represent the logo for Search.
 *
 */
export function SearchLogoCS({ size, appearance = 'brand', label, testId }: AppLogoProps) {
	return (
		<LogoWrapper
			svg={svg}
			label={label || 'Search'}
			appearance={appearance}
			size={size}
			testId={testId}
		/>
	);
}
