/* eslint-disable @atlaskit/design-system/use-primitives-text */
import React from 'react';

import Link from '@atlaskit/link';
import SectionMessage from '@atlaskit/section-message';

function AlternativePackagesMessage({
	alternatePackages,
}: React.PropsWithoutRef<{
	alternatePackages?: { name: string; link: string }[];
}>) {
	if (!alternatePackages) {
		return null;
	}
	if (alternatePackages.length === 1) {
		return (
			<p>
				Consider using <Link href={alternatePackages[0].link}>{alternatePackages[0].name}</Link>{' '}
				instead.
			</p>
		);
	}
	return (
		<p>
			Consider using one of these packages instead:
			<ul>
				{alternatePackages.map((p) => (
					// Ignored via go/ees005
					// eslint-disable-next-line react/jsx-key
					<li>
						<Link href={p.link}>{p.name}</Link>
					</li>
				))}
			</ul>
		</p>
	);
}

export function createEditorUseOnlyNotice(
	componentName: string,
	alternatePackages?: { name: string; link: string }[],
) {
	return (
		<SectionMessage title="Internal Editor Use Only" appearance="error">
			<p>
				{componentName} is intended for internal use by the Editor Platform as a plugin dependency
				of the Editor within your product.
			</p>
			<p>Direct use of this component is not supported.</p>
			<AlternativePackagesMessage alternatePackages={alternatePackages} />
		</SectionMessage>
	);
}
