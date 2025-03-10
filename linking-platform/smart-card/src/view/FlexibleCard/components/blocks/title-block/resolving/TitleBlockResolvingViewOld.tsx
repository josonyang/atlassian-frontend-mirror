/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';

import { SmartLinkSize } from '../../../../../../constants';
import { LoadingSkeletonOld } from '../../../common/loading-skeleton';
import { getIconSizeStyles, getIconWidth } from '../../../utils';
import Block from '../../block';
import { type TitleBlockViewProps } from '../types';

/**
 * This represents a TitleBlock for a Smart Link that is currently waiting
 * for a request to finish.
 * This should render when a Smart Link has sent a request.
 * @see TitleBlock
 */
const TitleBlockResolvingViewOld = ({
	actionGroup,
	testId,
	title,
	hideIcon,
	...blockProps
}: TitleBlockViewProps) => {
	const { size = SmartLinkSize.Medium } = blockProps;
	const iconWidth = getIconWidth(size);
	const iconStyles = getIconSizeStyles(iconWidth);

	return (
		<Block {...blockProps} testId={`${testId}-resolving-view`}>
			{!hideIcon && (
				// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
				<span css={iconStyles} data-testid={`${testId}-icon`}>
					<LoadingSkeletonOld testId={`${testId}-icon-loading`} />
				</span>
			)}
			{title}
			{actionGroup}
		</Block>
	);
};

export default TitleBlockResolvingViewOld;
