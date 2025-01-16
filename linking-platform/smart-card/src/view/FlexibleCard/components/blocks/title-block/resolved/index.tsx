/**
 * @jsxRuntime classic
 * @jsx jsx
 */

import { css, jsx } from '@compiled/react';

import { token } from '@atlaskit/tokens';

import {
	SmartLinkAlignment,
	SmartLinkDirection,
	SmartLinkPosition,
	SmartLinkWidth,
} from '../../../../../../constants';
import { LinkIcon } from '../../../elements';
import Block from '../../block';
import { ElementGroupNew as ElementGroup } from '../../element-group';
import { renderElementItems } from '../../utils';
import { type TitleBlockViewProps } from '../types';

import TitleBlockResolvedViewOld from './TitleBlockResolvedViewOld';

const style = css({
	gap: token('space.050', '0.25rem'),
});

/**
 * This renders a fully resolved TitleBlock.
 * This should render when a Smart Link returns a valid response.
 * @see TitleBlock
 */
const TitleBlockResolvedViewNew = ({
	actionGroup,
	metadata = [],
	position,
	subtitle = [],
	testId,
	text,
	icon,
	title,
	metadataPosition,
	hideIcon,
	...blockProps
}: TitleBlockViewProps) => {
	const metadataElements = renderElementItems(metadata);
	const subtitleElements = renderElementItems(subtitle);

	return (
		<Block {...blockProps} testId={`${testId}-resolved-view`}>
			{!hideIcon && <LinkIcon overrideIcon={icon} position={position} />}
			<ElementGroup
				direction={SmartLinkDirection.Vertical}
				width={SmartLinkWidth.Flexible}
				css={style}
				size={blockProps.size}
			>
				{title}
				{subtitleElements && (
					<ElementGroup direction={SmartLinkDirection.Horizontal}>{subtitleElements}</ElementGroup>
				)}
			</ElementGroup>
			{metadataElements && (
				<ElementGroup
					direction={SmartLinkDirection.Horizontal}
					align={SmartLinkAlignment.Right}
					position={metadataPosition ?? SmartLinkPosition.Center}
					size={blockProps.size}
				>
					{metadataElements}
				</ElementGroup>
			)}
			{actionGroup}
		</Block>
	);
};

export default TitleBlockResolvedViewOld;
export { TitleBlockResolvedViewNew };
