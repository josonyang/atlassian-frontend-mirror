import React, { useCallback, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, type SerializedStyles } from '@emotion/react';

import { SmartLinkStatus } from '../../../../../constants';
import { useMouseDownEvent } from '../../../../../state/analytics/useLinkClicked';
import { Title } from '../../elements';
import ActionGroup from '../action-group';

import TitleBlockErroredView from './errored';
import TitleBlockResolvedView from './resolved';
import TitleBlockResolvingView from './resolving';
import { type TitleBlockProps } from './types';

const getActionStyles = (showOnHover?: boolean, isOpen?: boolean): SerializedStyles | undefined => {
	if (showOnHover && !isOpen) {
		return css({
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
			'.actions-button-group': {
				opacity: 0,
			},
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
			'&:hover .actions-button-group, .actions-button-group:focus-within': {
				opacity: 1,
			},
		});
	}
};

const getTitleBlockViewComponent = (status: SmartLinkStatus) => {
	switch (status) {
		case SmartLinkStatus.Pending:
		case SmartLinkStatus.Resolving:
			return TitleBlockResolvingView;
		case SmartLinkStatus.Resolved:
			return TitleBlockResolvedView;
		case SmartLinkStatus.Unauthorized:
		case SmartLinkStatus.Forbidden:
		case SmartLinkStatus.NotFound:
		case SmartLinkStatus.Errored:
		case SmartLinkStatus.Fallback:
		default:
			return TitleBlockErroredView;
	}
};

/**
 * Represents a TitleBlock, which is the foundation of Flexible UI.
 * This contains an icon, the link, and any associated metadata and actions in one block.
 * The TitleBlock will also render differently given the state of the smart link.
 * This can be found in the corresponding Resolving, Resolved and Errored views.
 * @public
 * @param {TitleBlockProps} TitleBlockProps
 * @see Block
 * @see TitleBlockResolvingView
 * @see TitleBlockResolvedView
 * @see TitleBlockErroredView
 */
const TitleBlock = ({
	actions = [],
	anchorTarget,
	hideTitleTooltip,
	maxLines,
	onActionMenuOpenChange,
	onClick,
	overrideCss,
	status = SmartLinkStatus.Fallback,
	showActionOnHover,
	testId = 'smart-block-title',
	text,
	icon,
	theme,
	hideRetry,
	metadataPosition,
	hideIcon = false,
	...props
}: TitleBlockProps) => {
	if (hideRetry && props.retry) {
		delete props.retry;
	}

	const [actionDropdownOpen, setActionDropdownOpen] = useState(false);
	const onDropdownOpenChange = useCallback(
		(isOpen: boolean) => {
			setActionDropdownOpen(isOpen);
			if (onActionMenuOpenChange) {
				onActionMenuOpenChange({ isOpen });
			}
		},
		[onActionMenuOpenChange],
	);
	const actionGroup = actions.length > 0 && (
		<ActionGroup
			items={actions}
			visibleButtonsNum={showActionOnHover ? 1 : 2}
			onDropdownOpenChange={onDropdownOpenChange}
		/>
	);
	const actionStyles = getActionStyles(showActionOnHover, actionDropdownOpen);
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	const combinedCss = css(actionStyles, overrideCss);

	const overrideText = !!text ? { text } : {};

	const onMouseDown = useMouseDownEvent();

	const title = (
		<Title
			hideTooltip={hideTitleTooltip}
			maxLines={maxLines}
			onClick={onClick}
			onMouseDown={onMouseDown}
			target={anchorTarget}
			theme={theme}
			{...overrideText}
		/>
	);

	const Component = getTitleBlockViewComponent(status);
	return (
		<Component
			{...props}
			actionGroup={actionGroup}
			overrideCss={combinedCss}
			testId={testId}
			title={title}
			metadataPosition={metadataPosition}
			hideIcon={hideIcon}
			icon={icon}
		/>
	);
};

export default TitleBlock;
