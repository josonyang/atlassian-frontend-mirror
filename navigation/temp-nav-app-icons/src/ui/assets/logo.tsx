/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::2c773428cf9e5e1e0b0c93061f6b87df>>
 * @codegenCommand yarn workspace @atlaskit/temp-nav-app-icons build-temp-logos
 */
import React from 'react';

import { LogoWrapper } from '../../utils/logo-wrapper';
import type { AppLogoProps } from '../../utils/types';

// `height` is set to 100% to allow the SVG to scale with the parent element
// The text color is set to "currentColor" to allow the SVG to inherit the color set by the parent based on the theme.
const svg = `<svg width="77" height="24" fill="none" viewBox="0 0 77 24">
    <path fill="#ffc716" d="M0 6a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z"/>
    <path fill="#101214" fill-rule="evenodd" d="M8.34 11.495a3.64 3.64 0 0 0 3.155-3.154h2.3V6.523h-2.537a3.638 3.638 0 1 0-4.735 4.735v2.538H8.34zM7.887 9.25a1.364 1.364 0 1 0 0-2.727 1.364 1.364 0 0 0 0 2.727" clip-rule="evenodd"/>
    <path fill="#101214" d="M19.25 7.43a2.27 2.27 0 1 1-4.54 0 2.27 2.27 0 0 1 4.55 0M7.43 19.25a2.27 2.27 0 1 0 0-4.54 2.27 2.27 0 0 0 0 4.55m9.55-.01a2.27 2.27 0 1 0 0-4.54 2.27 2.27 0 0 0 0 4.55m-3.18-3.19h-3.18v1.82h3.18zm2.27-5.46v3.18h1.82v-3.18z"/>
    <path fill="currentcolor" d="M71.99 17.15q-.9 0-1.6-.25a2.84 2.84 0 0 1-1.14-.75 2.5 2.5 0 0 1-.57-1.2l1.8-.32q.15.55.54.82t1.02.27q.62 0 .98-.24t.36-.61q0-.31-.25-.51t-.76-.31l-1.31-.27q-1.09-.23-1.63-.77t-.54-1.39q0-.72.4-1.24.4-.53 1.1-.81.71-.29 1.65-.29.89 0 1.53.25.65.25 1.05.7.41.44.55 1.06l-1.71.31a1.3 1.3 0 0 0-.46-.66q-.33-.27-.92-.27-.53 0-.9.23-.35.23-.35.6 0 .32.23.52.24.2.8.33l1.34.27q1.09.23 1.63.74t.54 1.33q0 .74-.43 1.3-.43.55-1.19.87-.75.31-1.74.31m-4.25-7.81v1.48h-4.44V9.36zm-3.38-1.82h1.92v7.27q0 .38.17.57t.56.19q.12 0 .32-.03t.32-.06l.29 1.46q-.31.1-.64.13a5 5 0 0 1-.62.04q-1.13 0-1.73-.55-.59-.56-.59-1.59zm-5.19 9.61q-1.16 0-2-.48a3.26 3.26 0 0 1-1.29-1.37q-.45-.88-.45-2.08 0-1.18.44-2.06a3.4 3.4 0 0 1 1.26-1.39q.82-.5 1.93-.5.72 0 1.36.23t1.14.71q.49.47.77 1.2t.28 1.72v.57h-6.34v-1.25h5.39l-.9.35a2.8 2.8 0 0 0-.19-1.08 1.55 1.55 0 0 0-.57-.72q-.37-.26-.93-.26-.55 0-.94.26t-.59.7-.2.99v.88q0 .69.23 1.17.24.47.66.71t.99.24q.37 0 .68-.11t.53-.31a1.4 1.4 0 0 0 .34-.52l1.75.34q-.18.62-.64 1.09-.45.46-1.13.73-.68.25-1.54.25m-8.27-.01q-.9 0-1.6-.25a2.84 2.84 0 0 1-1.14-.75 2.5 2.5 0 0 1-.57-1.2l1.8-.32q.15.55.54.82t1.03.27q.62 0 .98-.24t.36-.61q0-.31-.25-.51t-.76-.31l-1.31-.27q-1.1-.24-1.64-.78t-.54-1.39q0-.72.4-1.24.4-.53 1.1-.81.71-.29 1.65-.29.89 0 1.53.25.65.25 1.05.7.4.44.55 1.06l-1.71.31a1.3 1.3 0 0 0-.46-.66q-.33-.27-.92-.27-.53 0-.89.23t-.36.6q0 .32.23.52.24.2.8.33l1.34.27q1.09.23 1.63.74t.54 1.33q0 .74-.43 1.3-.43.55-1.19.87-.75.31-1.74.31m-7.8-.01q-.9 0-1.6-.25a2.84 2.84 0 0 1-1.14-.75 2.5 2.5 0 0 1-.57-1.2l1.8-.32q.15.55.54.82t1.02.27q.62 0 .98-.24t.36-.61q0-.31-.25-.51t-.76-.31l-1.31-.27q-1.09-.24-1.63-.78t-.54-1.39q0-.72.4-1.24.4-.53 1.1-.81.71-.29 1.65-.29.89 0 1.53.25.65.25 1.05.7.4.44.55 1.06l-1.71.31a1.3 1.3 0 0 0-.46-.66q-.33-.27-.92-.27-.53 0-.9.23-.35.23-.35.6 0 .32.23.52.24.2.8.33l1.34.27q1.1.23 1.63.74.54.51.54 1.33 0 .74-.43 1.3-.43.55-1.19.87-.75.31-1.74.31M29.44 17l3.52-10.19h2.54L39.1 17h-2.17l-1.72-5.09a58 58 0 0 1-.58-1.97l-.64-2.41h.42a546 546 0 0 1-.61 2.43q-.28 1.09-.55 1.96L31.6 17zm2.13-2.44V13h5.4v1.56z"/>
</svg>
`;

/**
 * __AssetsLogo__
 *
 * Note: This component is a temporary solution for use in certain navigation elements for Team '25, until
 * the new language is incoporated into `@atlaskit/logo`.
 *
 * If you are using this component at scale, please reach out to Design System Team so we can assist.
 */
export function AssetsLogo({ label, testId }: AppLogoProps) {
	return <LogoWrapper svg={svg} label={label || 'Assets'} testId={testId} />;
}
