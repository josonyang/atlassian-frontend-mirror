/* eslint-disable @atlaskit/design-system/prefer-primitives, @atlaskit/design-system/consistent-css-prop-usage */
/**
 * @jsxRuntime classic
 * @jsx jsx
 * @jsxFrag
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx, css } from '@emotion/react';

import React, { useState } from 'react';
import type { Mark as PMMark, Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { RendererContext } from '../types';
import type { Serializer } from '../../serializer';
import type { ExtensionLayout } from '@atlaskit/adf-schema';
import type { ExtensionHandlers } from '@atlaskit/editor-common/extensions';
import type { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { WidthConsumer } from '@atlaskit/editor-common/ui';
import { RendererCssClassName } from '../../consts';
import { calcBreakoutWidth } from '@atlaskit/editor-common/utils';
import { useMultiBodiedExtensionActions } from './multiBodiedExtension/actions';
import { useMultiBodiedExtensionContext } from './multiBodiedExtension/context';

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
	marks?: PMMark[];
}>;

const containerStyles = css({
	// Remove top margin if MBE is the first on the doc/page (MBE can only be on the first level)
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors, @atlaskit/ui-styling-standard/no-nested-selectors
	'&:first-child > .ak-renderer-extension': {
		marginTop: 0,
	},
});

const MultiBodiedExtensionChildrenContainer = ({ children }: React.PropsWithChildren) => {
	return <article data-testid="multiBodiedExtension--frames">{children}</article>;
};

const MultiBodiedExtensionNavigation = ({ children }: React.PropsWithChildren) => {
	return <nav data-testid="multiBodiedExtension-navigation">{children}</nav>;
};

const MultiBodiedExtensionWrapper = ({
	width,
	path,
	layout,
	children,
}: React.PropsWithChildren<{
	width: number;
	path: PMNode[];
	layout: ExtensionLayout;
}>) => {
	const isTopLevel = path.length < 1;
	const centerAlignClass =
		isTopLevel && ['wide', 'full-width'].includes(layout)
			? RendererCssClassName.EXTENSION_CENTER_ALIGN
			: '';

	// This hierarchy is copied from regular extension (see extension.tsx)
	return (
		<div
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
			className={`${RendererCssClassName.EXTENSION} ${centerAlignClass}`}
			style={{
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				width: isTopLevel ? calcBreakoutWidth(layout, width) : '100%',
			}}
			data-layout={layout}
			data-testid="multiBodiedExtension--wrapper"
		>
			<div
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop
				className={`${RendererCssClassName.EXTENSION_OVERFLOW_CONTAINER}`}
			>
				{children}
			</div>
		</div>
	);
};

const MultiBodiedExtension = (props: Props) => {
	const {
		children,
		layout = 'default',
		path = [],
		parameters,
		extensionType,
		extensionKey,
		content,
		marks,
		localId,
	} = props;
	const [activeChildIndex, setActiveChildIndex] = useState<number>(0);
	const { loading, extensionContext } = useMultiBodiedExtensionContext({
		extensionType,
		extensionKey,
	});

	const actions = useMultiBodiedExtensionActions({
		updateActiveChild: setActiveChildIndex,
		children,
		childrenContainer: (
			<MultiBodiedExtensionChildrenContainer>{children}</MultiBodiedExtensionChildrenContainer>
		),
		allowBodiedOverride: extensionContext?.privateProps?.__allowBodiedOverride,
	});

	const renderContent = React.useCallback((): React.ReactNode => {
		if (loading || !extensionContext) {
			return null;
		}

		const { NodeRenderer, privateProps } = extensionContext;

		const fragmentLocalId = marks?.find((m) => m.type.name === 'fragment')?.attrs?.localId;

		const node = {
			type: 'multiBodiedExtension',
			extensionKey,
			extensionType,
			parameters,
			content,
			localId,
			fragmentLocalId,
		};

		if (privateProps.__allowBodiedOverride) {
			return <NodeRenderer node={node} actions={actions} />;
		} else {
			return (
				<>
					<MultiBodiedExtensionNavigation>
						<NodeRenderer node={node} actions={actions} />
					</MultiBodiedExtensionNavigation>
					<MultiBodiedExtensionChildrenContainer>{children}</MultiBodiedExtensionChildrenContainer>
				</>
			);
		}
	}, [
		loading,
		extensionContext,
		marks,
		extensionKey,
		extensionType,
		parameters,
		content,
		localId,
		actions,
		children,
	]);

	// make the frame visible
	// eslint-disable-next-line @atlaskit/design-system/no-css-tagged-template-expression
	const containerActiveFrameStyles = css`
		& [data-extension-frame='true']:nth-of-type(${activeChildIndex + 1}) {
			display: block;
		}
	`;

	return (
		<section
			css={[containerStyles, containerActiveFrameStyles]}
			data-testid="multiBodiedExtension--container"
			data-multiBodiedExtension-container
			data-active-child-index={activeChildIndex}
			data-layout={layout}
		>
			<WidthConsumer>
				{({ width }) => (
					<MultiBodiedExtensionWrapper layout={layout} width={width} path={path}>
						{renderContent()}
					</MultiBodiedExtensionWrapper>
				)}
			</WidthConsumer>
		</section>
	);
};

export default MultiBodiedExtension;
