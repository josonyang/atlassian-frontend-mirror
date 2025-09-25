/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::9f200c2eac2cd9165b71d24b95a477cd>>
 * @codegenCommand yarn build:icon-glyphs
 */
import React from 'react';

import { IconTile } from '@atlaskit/icon';
import NewIcon from '@atlaskit/icon-lab/core/page-live-doc';
import type { GlyphProps } from '@atlaskit/icon/types';
import NewObjectComponent from '@atlaskit/object/tile/page-live-doc';
import { fg } from '@atlaskit/platform-feature-flags';

import IconObjectOld from '../../glyph-legacy/page-live-doc/24';

/**
 * __24px `page-live-doc` icon object__
 *
 * - [Examples](https://atlassian.design/components/icon-object/examples)
 * - [Code](https://atlassian.design/components/icon-object/code)
 * - [Usage](https://atlassian.design/components/icon-object/usage)
 */
const PageLiveDoc24Icon: {
	({
		label,
		testId,
	}: Omit<GlyphProps, 'primaryColor' | 'secondaryColor' | 'size'>): React.JSX.Element;
	displayName: string;
} = ({ label, testId }) => {
	// Feature flag to migrate to new object package
	if (fg('platform_dst_icon_object_to_object')) {
		// Map props based on size: 16px -> object (medium), 24px -> tile (small)
		return <NewObjectComponent label={label} testId={testId} size="small" />;
	}

	return (
		<IconTile
			icon={NewIcon}
			appearance="magentaBold"
			size="24"
			label={label}
			testId={testId}
			LEGACY_fallbackComponent={<IconObjectOld label={label} testId={testId} />}
		/>
	);
};

PageLiveDoc24Icon.displayName = 'PageLiveDoc24Icon';

export default PageLiveDoc24Icon;
