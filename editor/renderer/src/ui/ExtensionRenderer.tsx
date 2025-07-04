/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import React from 'react';
import memoizeOne from 'memoize-one';

import type { RendererContext } from '../react/types';
import type { ExtensionLayout } from '@atlaskit/adf-schema';
import { getNodeRenderer } from '@atlaskit/editor-common/extensions';
import type {
	ExtensionHandlers,
	ExtensionProvider,
	MultiBodiedExtensionActions,
} from '@atlaskit/editor-common/extensions';
import type { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { WithProviders } from '@atlaskit/editor-common/provider-factory';
import { getExtensionRenderer } from '@atlaskit/editor-common/utils';
import type { Mark as PMMark } from '@atlaskit/editor-prosemirror/model';
import { token } from '@atlaskit/tokens';

interface Props {
	type: 'extension' | 'inlineExtension' | 'bodiedExtension' | 'multiBodiedExtension';
	extensionHandlers?: ExtensionHandlers;
	providers?: ProviderFactory;
	rendererContext: RendererContext;
	extensionType: string;
	extensionKey: string;
	actions?: MultiBodiedExtensionActions;
	text?: string;
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	parameters?: any;
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	content?: any;
	layout?: ExtensionLayout;
	localId?: string;
	marks?: PMMark[];
	children: ({ result }: { result?: JSX.Element | null }) => JSX.Element;
}

interface State {
	extensionProvider?: ExtensionProvider | null;
}

const inlineExtensionStyle = css({
	display: 'inline-block',
	maxWidth: '100%',
	verticalAlign: 'middle',
	// 0px margin top is important here.
	// When running on server-side emotion will generate style tags before elements.
	// This caused packages/editor/editor-common/src/styles/shared/block-marks.ts to override the margin-top.
	// However as soon as the styles are extracted to <head> it adds back the margin.
	// The timing is tricky as it happens to be when UFO collects the dimension for the placeholder for TTVC calculation.
	// This resulted 1px mismatch on the image. Further cause everything on page to shift by 1px.
	// es-lint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
	margin: `0px 1px ${token('space.050', '4px')}`,
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'& .rich-media-item': {
		maxWidth: '100%',
	},
});

export default function ExtensionRenderer(props: Props) {
	const {
		extensionHandlers,
		rendererContext,
		extensionType,
		extensionKey,
		parameters,
		content,
		text,
		type,
		localId,
		marks,
		actions,
		children,
	} = props;

	const isMounted = React.useRef(true);
	const localGetNodeRenderer = React.useMemo(() => memoizeOne(getNodeRenderer), []);
	const [extensionProvider, setExtensionProvider] = React.useState<ExtensionProvider | null>(null);

	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleProvider = React.useCallback((name: keyof State, providerPromise?: Promise<any>) => {
		providerPromise &&
			providerPromise.then((provider) => {
				if (isMounted.current) {
					setExtensionProvider(provider);
				}
			});
	}, []);

	const renderExtensionNode = React.useCallback(
		(extensionProvider?: ExtensionProvider | null) => {
			const fragmentLocalId = marks?.find((m) => m.type.name === 'fragment')?.attrs?.localId;

			const node = {
				type,
				extensionKey,
				extensionType,
				parameters,
				content: content || text,
				localId,
				fragmentLocalId,
			};

			let result = null;

			try {
				if (extensionHandlers && extensionHandlers[extensionType]) {
					const render = getExtensionRenderer(extensionHandlers[extensionType]);
					result = render(node, rendererContext.adDoc);
				}

				if (!result && extensionProvider) {
					const NodeRenderer = localGetNodeRenderer(extensionProvider, extensionType, extensionKey);
					if (node.type === 'multiBodiedExtension') {
						result = <NodeRenderer node={node} actions={actions} />;
					} else if (node.type === 'inlineExtension') {
						result = (
							<InlineNodeRendererWrapper>
								<NodeRenderer node={node} />
							</InlineNodeRendererWrapper>
						);
					} else {
						result = <NodeRenderer node={node} />;
					}
				}
			} catch (e) {
				/** We don't want this error to block renderer */
				/** We keep rendering the default content */
			}

			return children({ result });
		},
		[
			actions,
			children,
			content,
			extensionHandlers,
			extensionKey,
			extensionType,
			localGetNodeRenderer,
			localId,
			marks,
			parameters,
			rendererContext?.adDoc,
			text,
			type,
		],
	);

	const setupAndRenderExtensionNode = React.useCallback(
		(providers: { extensionProvider?: Promise<ExtensionProvider> }) => {
			if (!extensionProvider && providers.extensionProvider) {
				handleProvider('extensionProvider', providers.extensionProvider);
			}

			return renderExtensionNode(extensionProvider);
		},
		[extensionProvider, handleProvider, renderExtensionNode],
	);

	React.useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	if (!props.providers) {
		return setupAndRenderExtensionNode({});
	}

	return (
		<WithProviders
			providers={['extensionProvider']}
			providerFactory={props.providers}
			renderNode={setupAndRenderExtensionNode}
		/>
	);
}

export const InlineNodeRendererWrapper = ({
	children,
	ssrPlaceholder,
	ssrPlaceholderReplace,
}: React.PropsWithChildren<{ ssrPlaceholder?: string; ssrPlaceholderReplace?: string }>) => {
	return (
		<div
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
			className="inline-extension-renderer"
			css={inlineExtensionStyle}
			data-ssr-placeholder={ssrPlaceholder}
			data-ssr-placeholder-replace={ssrPlaceholderReplace}
		>
			{children}
		</div>
	);
};
