/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::070cec1569f62d006f8f98578db00081>>
 * @codegenCommand yarn build:icon-glyphs
 */
import React from 'react';

import { UNSAFE_IconFacade as IconFacade } from '@atlaskit/icon/base';
import type { GlyphProps } from '@atlaskit/icon/types';

const Branch24Icon = (props: Omit<GlyphProps, 'primaryColor' | 'secondaryColor' | 'size'>) => (
	<IconFacade
		dangerouslySetGlyph={`<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="#2684ff" fill-rule="evenodd" d="M9 15.17V8.83a3.001 3.001 0 1 0-2 0v6.34A3.001 3.001 0 1 0 10.83 19H15a3 3 0 0 0 3-3v-2.308a3.001 3.001 0 1 0-2 0V16a1 1 0 0 1-1 1h-4.17A3 3 0 0 0 9 15.17M3 0h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3m5 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2m9 4.862a1 1 0 1 1 0-2 1 1 0 0 1 0 2M8 19a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/></svg>`}
		// eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
		{...props}
		size="medium"
	/>
);

Branch24Icon.displayName = 'Branch24Icon';

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default Branch24Icon;
