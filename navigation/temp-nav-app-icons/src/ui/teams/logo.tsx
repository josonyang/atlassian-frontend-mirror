/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::bb02033275bfcacf6e78f660f50925c7>>
 * @codegenCommand yarn workspace @atlaskit/temp-nav-app-icons build-temp-logos
 */
import React from 'react';

import { LogoWrapper } from '../../utils/logo-wrapper';
import type { AppLogoProps } from '../../utils/types';

// `height` is set to 100% to allow the SVG to scale with the parent element
// The text color is set to "currentColor" to allow the SVG to inherit the color set by the parent based on the theme.
const svg = `<svg width="76" height="24" fill="none" viewBox="0 0 76 24">
    <path fill="#dddee1" d="M0 6a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z"/>
    <path fill="#1e1f21" d="M8.06 11.25a2.63 2.63 0 1 0 0-5.25 2.63 2.63 0 0 0 0 5.25m7.88 0a2.63 2.63 0 1 0 0-5.25 2.63 2.63 0 0 0 0 5.25m.17 1.31a2.89 2.89 0 0 1 2.89 2.9V18h-7.22l1.66-3.67a2.89 2.89 0 0 1 2.67-1.77M5 15.63V18h4.81l1.31-2.81a2.63 2.63 0 0 0-2.62-2.63h-.44A3.06 3.06 0 0 0 5 15.63"/>
    <path fill="currentcolor" d="M71.88 17.15q-.9 0-1.6-.25a2.84 2.84 0 0 1-1.14-.75 2.5 2.5 0 0 1-.57-1.2l1.8-.32q.15.55.54.82t1.03.27q.62 0 .98-.24t.36-.61q0-.31-.25-.51t-.76-.31l-1.31-.27q-1.1-.24-1.64-.78t-.54-1.39q0-.72.4-1.24.4-.53 1.1-.81.71-.29 1.65-.29.89 0 1.53.25.65.25 1.05.7.4.44.55 1.06l-1.71.31a1.3 1.3 0 0 0-.46-.66q-.33-.27-.92-.27-.53 0-.89.23t-.36.6q0 .32.23.52.24.2.8.33l1.34.27q1.09.23 1.63.74t.54 1.33q0 .74-.43 1.3-.43.55-1.19.87-.75.31-1.74.31M56.21 17V9.36h1.8l.08 1.87h-.14q.17-.7.51-1.13.35-.44.81-.64.47-.21.97-.21.83 0 1.33.52.51.52.73 1.57h-.22q.17-.71.55-1.18.39-.46.91-.69.53-.23 1.12-.23.69 0 1.24.3.56.3.87.88.32.58.32 1.42V17h-1.92v-4.82q0-.67-.37-1a1.32 1.32 0 0 0-.89-.32q-.4 0-.7.18a1.2 1.2 0 0 0-.46.49q-.16.32-.16.73V17h-1.87v-4.89q0-.57-.35-.91-.34-.34-.89-.34-.37 0-.68.17a1.2 1.2 0 0 0-.48.51q-.18.33-.18.81V17zm-5.99.13a2.9 2.9 0 0 1-1.59-.46q-.7-.46-1.12-1.33-.41-.88-.41-2.15 0-1.29.42-2.17.42-.87 1.14-1.32a2.9 2.9 0 0 1 1.58-.44q.66 0 1.09.23.43.22.69.54t.4.61h.08V9.36h1.91V17h-1.9v-1.22h-.08a2.6 2.6 0 0 1-.41.61q-.27.32-.7.53t-1.08.21m.57-1.55q.55 0 .94-.3.38-.3.58-.84.21-.54.21-1.25 0-.72-.2-1.25t-.58-.83q-.38-.29-.94-.29-.57 0-.96.3a1.85 1.85 0 0 0-.58.83 3.6 3.6 0 0 0-.19 1.23q0 .69.2 1.23t.58.85q.39.31.95.31m-8.29 1.58q-1.16 0-2-.48a3.25 3.25 0 0 1-1.29-1.37q-.45-.88-.45-2.08 0-1.18.44-2.06a3.4 3.4 0 0 1 1.26-1.39q.82-.5 1.93-.5.72 0 1.36.23t1.14.71q.49.47.77 1.2t.28 1.72v.57h-6.34v-1.25h5.39l-.9.35a2.8 2.8 0 0 0-.19-1.08 1.55 1.55 0 0 0-.57-.72q-.37-.26-.93-.26-.55 0-.94.26t-.59.7-.2.99v.88q0 .69.23 1.17.24.47.66.71t.99.24q.37 0 .68-.11t.53-.31a1.4 1.4 0 0 0 .34-.52l1.75.34q-.18.62-.64 1.09-.45.46-1.13.73-.68.25-1.54.25m-12.03-8.7V6.82h8.22v1.64h-3.12V17h-1.97V8.46z"/>
</svg>
`;

/**
 * __TeamsLogo__
 *
 * Note: This component is a temporary solution for use in certain navigation elements for Team '25, until
 * the new language is incoporated into `@atlaskit/logo`.
 *
 * If you are using this component at scale, please reach out to Design System Team so we can assist.
 */
export function TeamsLogo({ label, testId }: AppLogoProps) {
	return <LogoWrapper svg={svg} label={label || 'Teams'} testId={testId} />;
}
