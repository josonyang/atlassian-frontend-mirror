/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::bb2cc4ea5af2d1777c2d9fec8906ccec>>
 * @codegenCommand yarn workspace @atlaskit/temp-nav-app-icons build-temp-logos
 */
import React from 'react';

import { LogoWrapper } from '../../utils/logo-wrapper';
import type { AppLogoProps } from '../../utils/types';

// `height` is set to 100% to allow the SVG to scale with the parent element
// The text color is set to "currentColor" to allow the SVG to inherit the color set by the parent based on the theme.
const svg = `<svg width="96" height="24" fill="none" viewBox="0 0 96 24">
    <path fill="#dddee1" d="M0 6a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z"/>
    <path fill="#1e1f21" d="M14.63 5.88v9.19h3.06v-9.2zM5.88 18.13h11.81v-1.75H5.87zm0-3.07v-4.81h3.06v4.81zm4.37-6.56v6.56h3.06V8.5z"/>
    <path fill="currentcolor" d="M91.15 17.15q-.9 0-1.6-.25a2.84 2.84 0 0 1-1.14-.75 2.5 2.5 0 0 1-.57-1.2l1.8-.32q.15.55.54.82t1.02.27q.62 0 .98-.24t.36-.61q0-.31-.25-.51t-.76-.31l-1.31-.27q-1.09-.23-1.63-.77t-.54-1.39q0-.72.4-1.24.4-.53 1.1-.81.71-.29 1.65-.29.89 0 1.53.25.65.25 1.05.7.4.44.55 1.06l-1.71.31a1.3 1.3 0 0 0-.46-.66q-.33-.27-.92-.27-.53 0-.9.23-.35.23-.35.6 0 .32.23.52.24.2.8.33l1.34.27q1.09.23 1.63.74t.54 1.33q0 .74-.43 1.3-.43.55-1.19.87-.75.31-1.74.31m-7.82-.02q-1.13 0-1.96-.49a3.3 3.3 0 0 1-1.28-1.38q-.45-.89-.45-2.06 0-1.18.45-2.07.45-.9 1.28-1.39t1.96-.49q.66 0 1.22.17t1 .49.73.78.41 1.03l-1.8.36q-.06-.3-.2-.54a1.5 1.5 0 0 0-.33-.4 1.3 1.3 0 0 0-.44-.26 1.6 1.6 0 0 0-.56-.09q-.58 0-.97.31t-.59.86q-.2.54-.2 1.24t.2 1.24.59.86q.39.31.97.31.32 0 .57-.09.26-.09.46-.27a1.6 1.6 0 0 0 .34-.42q.14-.25.2-.56l1.79.35q-.11.6-.4 1.06a2.8 2.8 0 0 1-.73.79 3.3 3.3 0 0 1-1.01.51q-.56.17-1.23.17M76.24 17V9.36h1.93V17zm-.02-8.73V6.52h1.98v1.75zm-1.34 1.09v1.48h-4.44V9.36zM71.5 7.54h1.92v7.27q0 .38.17.57t.56.19q.12 0 .32-.03t.32-.06l.29 1.46q-.31.1-.64.13a5 5 0 0 1-.62.04q-1.13 0-1.73-.55-.59-.56-.59-1.59zm-8.93 12.17.44-1.47.23.06q.41.11.73.06a.83.83 0 0 0 .52-.27q.2-.22.27-.62l.08-.44-2.88-7.67H64l1.34 4.05q.24.75.39 1.49.16.75.34 1.54h-.47l.37-1.54q.18-.75.43-1.49l1.4-4.05h2.02l-3.26 8.58a3.8 3.8 0 0 1-.59 1.06 2.3 2.3 0 0 1-.88.68q-.52.24-1.25.24-.4 0-.74-.06a2.5 2.5 0 0 1-.53-.14m-1.61-2.67q-1.12 0-1.65-.5t-.53-1.49V6.82h1.93v7.96q0 .39.12.57.13.17.45.17.17 0 .26-.01.1-.01.16-.03l.32 1.42q-.16.06-.44.11a3.5 3.5 0 0 1-.61.05m-8.19.07a2.9 2.9 0 0 1-1.59-.46q-.7-.46-1.12-1.33-.41-.88-.41-2.15 0-1.29.42-2.17.42-.87 1.14-1.32a2.9 2.9 0 0 1 1.58-.44q.66 0 1.09.23.43.22.69.54t.4.61h.08V9.36h1.91V17h-1.9v-1.22h-.08a2.6 2.6 0 0 1-.41.61q-.27.32-.7.53t-1.08.21m.57-1.55q.56 0 .94-.3t.58-.84q.21-.54.21-1.25 0-.72-.2-1.25t-.58-.83-.94-.29q-.57 0-.96.3-.38.3-.58.83a3.6 3.6 0 0 0-.19 1.23q0 .69.2 1.23t.58.85q.39.31.95.31m-10.13-3.02V17h-1.93V9.36h1.82l.03 1.9h-.13q.31-.97.92-1.48.62-.51 1.57-.51.79 0 1.37.34.6.34.92.98.33.64.33 1.55V17h-1.92v-4.54q0-.74-.38-1.16t-1.05-.42q-.45 0-.81.2a1.34 1.34 0 0 0-.55.57q-.2.37-.2.9M30.42 17l3.52-10.19h2.54L40.08 17h-2.17l-1.72-5.09a58 58 0 0 1-.58-1.97 212 212 0 0 1-.64-2.41h.42a532 532 0 0 1-.61 2.43 43 43 0 0 1-.55 1.96L32.58 17zm2.13-2.44V13h5.4v1.56z"/>
</svg>
`;

/**
 * __AnalyticsLogo__
 *
 * Note: This component is a temporary solution for use in certain navigation elements for Team '25, until
 * the new language is incoporated into `@atlaskit/logo`.
 *
 * If you are using this component at scale, please reach out to Design System Team so we can assist.
 */
export function AnalyticsLogo({ label, testId }: AppLogoProps) {
	return <LogoWrapper svg={svg} label={label || 'Analytics'} testId={testId} />;
}
