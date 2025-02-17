/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::a32c5fe505fea3eab9328caf0ed2ac5b>>
 * @codegenCommand yarn build:icon-glyphs
 */
import React from 'react';

import { IconFacade } from '@atlaskit/icon/base';
import type { GlyphProps } from '@atlaskit/icon/types';

const PullRequest24Icon = (props: Omit<GlyphProps, 'primaryColor' | 'secondaryColor' | 'size'>) => (
	<IconFacade
		dangerouslySetGlyph={`<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="#36b37e" fill-rule="evenodd" d="M3 0h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3m4 3C5.4 3 4 4.3 4 6c0 1.3.8 2.4 2 2.8V20c0 .6.4 1 1 1s1-.4 1-1V8.8c1.2-.4 2-1.5 2-2.8 0-1.7-1.3-3-3-3m7.414 2H15a3 3 0 0 1 3 3v7.17a3.001 3.001 0 1 1-2 0V8a1 1 0 0 0-1-1h-.583l.292.292a.999.999 0 1 1-1.413 1.415l-2.002-2a1 1 0 0 1-.001-1.415l2.003-2.002a1 1 0 0 1 1.414 0 1 1 0 0 1-.001 1.415zM7 7c-.5 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1m10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>`}
		// eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
		{...props}
		size="medium"
	/>
);

PullRequest24Icon.displayName = 'PullRequest24Icon';

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default PullRequest24Icon;
