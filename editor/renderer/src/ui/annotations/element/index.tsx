import React, { useMemo, useCallback, useContext } from 'react';
import {
	type AnnotationId,
	type AnnotationDataAttributes,
	AnnotationMarkStates,
	type AnnotationTypes,
} from '@atlaskit/adf-schema';
import { MarkComponent } from './mark';
import { useInlineCommentsFilter } from '../hooks/use-inline-comments-filter';
import { useInlineCommentSubscriberContext } from '../hooks/use-inline-comment-subscriber';
import { useHasFocusEvent } from '../hooks/use-events';
import { InlineCommentsStateContext } from '../context';
import { AnnotationUpdateEvent } from '@atlaskit/editor-common/types';
import type { OnAnnotationClickPayload } from '@atlaskit/editor-common/types';

type MarkElementProps = React.PropsWithChildren<{
	id: AnnotationId;
	annotationParentIds: AnnotationId[];
	dataAttributes: AnnotationDataAttributes;
	annotationType: AnnotationTypes;
	useBlockLevel?: boolean;
}>;

const MarkElement = ({
	annotationParentIds,
	children,
	dataAttributes,
	id,
	useBlockLevel,
}: MarkElementProps) => {
	const updateSubscriber = useInlineCommentSubscriberContext();
	const states = useContext(InlineCommentsStateContext);
	const { hasFocus, isHovered } = useHasFocusEvent({ id, updateSubscriber });
	const dataAttributesMemorized = useMemo(() => dataAttributes, [dataAttributes]);
	const onClick = useCallback(
		(props: OnAnnotationClickPayload) => {
			if (!updateSubscriber) {
				return;
			}

			if (useBlockLevel) {
				return;
			}

			const { eventTarget, annotationIds } = props;
			updateSubscriber.emit(AnnotationUpdateEvent.ON_ANNOTATION_CLICK, {
				annotationIds,
				eventTarget,
			});
		},
		[updateSubscriber, useBlockLevel],
	);

	const activeParentIds = useInlineCommentsFilter({
		annotationIds: annotationParentIds,
		filter: {
			state: AnnotationMarkStates.ACTIVE,
		},
	});

	return (
		<MarkComponent
			id={id}
			dataAttributes={dataAttributesMemorized}
			annotationParentIds={activeParentIds}
			onClick={onClick}
			hasFocus={hasFocus}
			isHovered={isHovered}
			state={states[id]}
			useBlockLevel={useBlockLevel}
		>
			{children}
		</MarkComponent>
	);
};

export { MarkElement };
