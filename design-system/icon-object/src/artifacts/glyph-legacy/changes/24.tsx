/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::4d5cdbc2ca898b4ddf4eaaae54d613f9>>
 * @codegenCommand yarn build:icon-glyphs
 */
import React from 'react';

import { IconFacade } from '@atlaskit/icon/base';
import type { GlyphProps } from '@atlaskit/icon/types';

const Changes24Icon = (props: Omit<GlyphProps, 'primaryColor' | 'secondaryColor' | 'size'>) => (
	<IconFacade
		dangerouslySetGlyph={`<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="#ffab00" fill-rule="evenodd" d="M16.587 15H5a1 1 0 0 0 0 2h11.591l-1.298 1.296a1.001 1.001 0 0 0 1.414 1.416l3.005-3.001a1 1 0 0 0 0-1.415l-3.005-3.003a.999.999 0 1 0-1.414 1.414zM7.418 7l1.294-1.293a.999.999 0 1 0-1.414-1.414L4.293 7.296a1 1 0 0 0 0 1.415l3.005 3a1 1 0 0 0 1.414-1.415L7.414 9H19a1 1 0 0 0 0-2zM3 0h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3"/></svg>`}
		// eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
		{...props}
		size="medium"
	/>
);

Changes24Icon.displayName = 'Changes24Icon';

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default Changes24Icon;
