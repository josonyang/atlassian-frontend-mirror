/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx, css } from '@emotion/react';

import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { RendererContext } from '../types';
import type { Serializer } from '../../serializer';
import type { ExtensionLayout } from '@atlaskit/adf-schema';
import type { ExtensionHandlers } from '@atlaskit/editor-common/extensions';
import type { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { sharedMultiBodiedExtensionStyles } from '@atlaskit/editor-common/ui';
import { fg } from '@atlaskit/platform-feature-flags';

const containerCSS = css({
	minHeight: '100px',
	flexBasis: '100%',
});

type Props = React.PropsWithChildren<{
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	serializer: Serializer<any>;
	extensionHandlers?: ExtensionHandlers;
	rendererContext: RendererContext;
	providers: ProviderFactory;
	extensionType: string;
	extensionKey: string;
	path?: PMNode[];
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	originalContent?: any;
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	parameters?: any;
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	content?: any;
	layout?: ExtensionLayout;
	localId?: string;
}>;

const ExtensionFrame = (props: Props) => {
	return (
		<div
			css={[
				containerCSS,
				fg('platform_editor_multi_body_extension_extensibility') &&
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
					sharedMultiBodiedExtensionStyles.extensionFrameContent,
			]}
			data-extension-frame="true"
		>
			{props.children}
		</div>
	);
};

export default ExtensionFrame;
