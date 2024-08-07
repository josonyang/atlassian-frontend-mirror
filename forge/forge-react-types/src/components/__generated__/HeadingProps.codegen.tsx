/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - HeadingProps
 *
 * @codegen <<SignedSource::37a4316677f5ba172ee3bc7debb8e96b>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit/heading/__generated__/index.partial.tsx <<SignedSource::0719604f8e152c9ed92804908d88b7f5>>
 */
import type { HeadingProps as PlatformHeadingProps } from '@atlaskit/heading';

type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = Pick<PlatformHeadingProps, 'children' | 'id' | 'testId'> & {
	as: HeadingTags;
	color?: 'default' | 'inverse';
};