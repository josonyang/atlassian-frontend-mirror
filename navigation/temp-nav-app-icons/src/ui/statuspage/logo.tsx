/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::83359616d713919bb6b747137758dd01>>
 * @codegenCommand yarn workspace @atlaskit/temp-nav-app-icons build-temp-logos
 */
import React from 'react';

import { LogoWrapper } from '../../utils/logo-wrapper';
import type { AppLogoProps } from '../../utils/types';

// `height` is set to 100% to allow the SVG to scale with the parent element
// The text color is set to "currentColor" to allow the SVG to inherit the color set by the parent based on the theme.
const svg = `<svg height="100%" viewBox="0 0 110 24">
    <path fill="var(--tile-color,#ffc716)" d="M0 6a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z"/>
    <path fill="var(--icon-color, #101214)" d="M12 9.796c-1.924 0-3.796.832-5.324 2.118q-.238.227-.475.227c-.132 0-.263-.076-.369-.202L3.908 9.771c-.105-.126-.158-.252-.158-.353 0-.151.08-.277.237-.429C6.307 7.023 9.127 5.914 12 5.914s5.693 1.109 8.013 3.075c.158.152.237.278.237.429 0 .1-.053.227-.158.353l-1.924 2.168c-.106.126-.238.202-.37.202q-.236 0-.474-.227c-1.529-1.286-3.4-2.118-5.324-2.118m0 8.118c-2.135 0-3.875-1.664-3.875-3.68 0-2.018 1.74-3.682 3.875-3.682s3.875 1.64 3.875 3.681-1.74 3.68-3.875 3.68"/>
    <path fill="var(--text-color, #292a2e)" d="M105.04 17.15q-1.16 0-2-.48a3.26 3.26 0 0 1-1.29-1.37q-.45-.88-.45-2.08 0-1.18.44-2.06A3.4 3.4 0 0 1 103 9.77q.82-.5 1.93-.5.72 0 1.36.23t1.14.71q.49.47.77 1.2t.28 1.72v.57h-6.34v-1.25h5.39l-.9.35a2.8 2.8 0 0 0-.19-1.08 1.55 1.55 0 0 0-.57-.72q-.37-.26-.93-.26T104 11q-.39.26-.59.7t-.2.99v.88q0 .69.23 1.17.24.47.66.71t.98.24q.37 0 .68-.11a1.5 1.5 0 0 0 .53-.31q.22-.21.34-.52l1.75.34q-.18.62-.64 1.09-.45.46-1.13.73-.68.25-1.54.25m-8.91 2.86q-.94 0-1.63-.24-.69-.23-1.13-.65a2.3 2.3 0 0 1-.62-.94l1.64-.51q.11.21.31.42.21.21.55.35.35.14.87.14.81 0 1.28-.38.47-.37.47-1.16v-1.41h-.15q-.14.29-.4.58a2 2 0 0 1-.68.48q-.42.19-1.07.19a3.1 3.1 0 0 1-1.58-.41q-.7-.41-1.13-1.24-.42-.83-.42-2.08 0-1.28.42-2.15t1.14-1.31a2.9 2.9 0 0 1 1.58-.44q.66 0 1.09.23.44.22.7.54.27.32.4.61h.09V9.36h1.89v7.62q0 1.02-.47 1.7-.46.68-1.29 1-.82.33-1.88.33m.03-4.62q.55 0 .94-.27.38-.27.58-.77.21-.5.21-1.21 0-.7-.2-1.22-.2-.53-.58-.81-.38-.29-.94-.29-.57 0-.96.3-.38.3-.58.83a3.5 3.5 0 0 0-.19 1.2q0 .68.2 1.19t.58.79q.39.27.95.27m-9.36 1.73a2.9 2.9 0 0 1-1.59-.46q-.7-.46-1.12-1.33-.41-.88-.41-2.15 0-1.29.42-2.17.42-.87 1.14-1.32a2.9 2.9 0 0 1 1.58-.44q.66 0 1.09.23.43.22.69.54t.4.61h.08V9.36h1.91V17h-1.9v-1.22h-.08a2.6 2.6 0 0 1-.41.61q-.27.32-.7.53t-1.08.21m.57-1.55q.55 0 .94-.3.38-.3.58-.84.21-.54.21-1.25 0-.72-.2-1.25t-.58-.83-.94-.29q-.57 0-.96.3a1.85 1.85 0 0 0-.58.83 3.6 3.6 0 0 0-.19 1.23q0 .69.2 1.23t.58.85q.39.31.95.31m-12.19 4.29V9.36h1.89v1.28h.1q.14-.29.4-.61t.69-.54 1.09-.22q.87 0 1.57.44.71.44 1.13 1.32.42.87.42 2.17 0 1.26-.41 2.15-.41.87-1.12 1.33a2.87 2.87 0 0 1-1.6.46q-.64 0-1.07-.21a2.3 2.3 0 0 1-.7-.53 3 3 0 0 1-.4-.61h-.07v4.07zm3.61-4.28q.57 0 .95-.31t.57-.85q.2-.54.2-1.23a3.5 3.5 0 0 0-.2-1.22 1.8 1.8 0 0 0-.57-.83q-.38-.31-.95-.31-.56 0-.94.29t-.58.83q-.2.53-.2 1.24t.2 1.25q.21.54.59.84.39.3.94.3m-8.43 1.57q-.9 0-1.6-.25a2.84 2.84 0 0 1-1.14-.75 2.5 2.5 0 0 1-.57-1.2l1.8-.32q.15.55.54.82t1.03.27q.62 0 .98-.24t.36-.61q0-.31-.25-.51t-.76-.31l-1.31-.27q-1.09-.23-1.63-.77t-.54-1.39q0-.72.4-1.24.4-.53 1.1-.81.71-.29 1.65-.29.89 0 1.53.25.65.25 1.05.7.4.44.55 1.06l-1.71.31a1.3 1.3 0 0 0-.46-.66q-.33-.27-.92-.27-.53 0-.89.23t-.36.6q0 .32.23.52.24.2.8.33l1.34.27q1.09.23 1.63.74t.54 1.33q0 .74-.43 1.3-.43.55-1.19.87-.75.31-1.74.31m-9.02-.07q-.79 0-1.39-.34a2.34 2.34 0 0 1-.92-.98q-.33-.65-.33-1.55V9.37h1.93v4.54q0 .75.38 1.16t1.05.42q.46 0 .81-.19.35-.2.55-.57t.2-.9V9.38h1.93V17h-1.83l-.02-1.9h.12q-.31.98-.93 1.49t-1.56.51m-3.99-7.74v1.48h-4.44V9.36zm-3.38-1.82h1.92v7.27q0 .38.17.57t.56.19q.12 0 .32-.03t.32-.06l.29 1.46q-.31.1-.64.13a5 5 0 0 1-.62.04q-1.13 0-1.73-.55-.59-.56-.59-1.59zm-6.29 9.59a2.9 2.9 0 0 1-1.59-.46q-.7-.46-1.12-1.33-.41-.88-.41-2.15 0-1.29.42-2.17.42-.87 1.13-1.32a2.9 2.9 0 0 1 1.58-.44q.66 0 1.09.23.43.22.69.54t.4.61h.08V9.36h1.91V17h-1.9v-1.22h-.08a2.6 2.6 0 0 1-.41.61q-.27.32-.7.53t-1.08.21m.57-1.55q.55 0 .94-.3.38-.3.58-.84.21-.54.21-1.25 0-.72-.2-1.25t-.58-.83q-.38-.29-.94-.29-.57 0-.96.3-.38.3-.58.83a3.6 3.6 0 0 0-.19 1.23q0 .69.2 1.23t.58.85q.39.31.95.31m-4.62-6.21v1.48h-4.44V9.36zm-3.38-1.82h1.92v7.27q0 .38.17.57t.56.19q.12 0 .32-.03.21-.03.32-.06l.29 1.46q-.31.1-.64.13a5 5 0 0 1-.62.04q-1.13 0-1.73-.55-.59-.56-.59-1.59zm-5.72 9.61q-1.2 0-2.09-.37t-1.39-1.09q-.5-.73-.53-1.77h1.92q.04.53.32.88t.74.53q.46.17 1.02.17.57 0 1.01-.17.44-.18.68-.49.25-.31.25-.72a.9.9 0 0 0-.22-.62 1.7 1.7 0 0 0-.62-.42 5.3 5.3 0 0 0-.96-.31l-1.13-.29q-1.28-.32-2.01-.99-.72-.67-.72-1.76 0-.91.49-1.59t1.35-1.06 1.94-.38q1.11 0 1.94.38t1.3 1.06q.47.67.49 1.54h-1.9q-.06-.64-.55-.98-.49-.35-1.29-.35a2.5 2.5 0 0 0-.94.17q-.39.16-.6.44a1.06 1.06 0 0 0-.2.64q0 .4.24.66.25.26.63.42.39.16.81.26l.94.23q.61.14 1.15.38.55.24.97.6.42.35.66.84t.24 1.14q0 .91-.46 1.59t-1.33 1.06-2.1.38"/>
</svg>
`;

/**
 * __StatuspageLogo__
 *
 * A temporary component to represent the logo for Statuspage.
 *
 */
export function StatuspageLogo({ size, appearance = 'brand', label, testId }: AppLogoProps) {
	return (
		<LogoWrapper
			svg={svg}
			label={label || 'Statuspage'}
			appearance={appearance}
			size={size}
			testId={testId}
		/>
	);
}
