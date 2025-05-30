import React, { useContext } from 'react';
import { Mounter } from './mounter';
import type { InlineCommentHoverComponentProps } from '@atlaskit/editor-common/types';
import { RendererContext as ActionsContext } from '../../RendererActionsContext';
import type { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import {
	useAnnotationRangeDispatch,
	useAnnotationRangeState,
} from '../contexts/AnnotationRangeContext';
import { useAnnotationHoverContext } from '../contexts/AnnotationHoverContext';

type Props = {
	component: React.ComponentType<InlineCommentHoverComponentProps>;
	rendererRef: React.RefObject<HTMLDivElement>;
	createAnalyticsEvent?: CreateUIAnalyticsEvent;
};

export const RangeValidator = (props: Props) => {
	const { component, rendererRef, createAnalyticsEvent } = props;
	const actions = useContext(ActionsContext);
	const { clearHoverRange } = useAnnotationRangeDispatch();
	const { range, type } = useAnnotationRangeState();
	const { isWithinRange } = useAnnotationHoverContext();

	if (!range || type !== 'hover') {
		return null;
	}

	const documentPosition = actions.getPositionFromRange(range);
	return (
		<Mounter
			isWithinRange={isWithinRange}
			range={range}
			wrapperDOM={rendererRef}
			component={component}
			onClose={clearHoverRange}
			documentPosition={documentPosition}
			isAnnotationAllowed={true}
			applyAnnotation={actions.applyAnnotation.bind(actions)}
			generateIndexMatch={actions.generateAnnotationIndexMatch.bind(actions)}
			createAnalyticsEvent={createAnalyticsEvent}
		/>
	);
};

RangeValidator.displayName = 'HoverRangeValidator';
