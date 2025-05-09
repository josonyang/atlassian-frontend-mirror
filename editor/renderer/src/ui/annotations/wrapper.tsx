import React, { useCallback, useContext } from 'react';
import type { AnnotationsDraftContextWrapperChildrenProps } from './context';
import { AnnotationsDraftContextWrapper, ProvidersContext } from './context';
import { RangeValidator as HoverRangeValidator } from './hover/range-validator';
import { SelectionRangeValidator } from './selection/range-validator';
import type { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import {
	useAnnotationRangeDispatch,
	useAnnotationRangeState,
} from './contexts/AnnotationRangeContext';

type Props = {
	rendererRef: React.RefObject<HTMLDivElement>;
	createAnalyticsEvent?: CreateUIAnalyticsEvent;
	isNestedRender?: boolean;
};

export const AnnotationsContextWrapper = (props: React.PropsWithChildren<Props>): JSX.Element => {
	const providers = useContext(ProvidersContext);
	const { range, type } = useAnnotationRangeState();
	const { setDraftRange, clearDraftRange } = useAnnotationRangeDispatch();
	const { rendererRef, createAnalyticsEvent, children, isNestedRender } = props;
	const inlineCommentProvider = providers && providers.inlineComment;
	const selectionComponent = inlineCommentProvider && inlineCommentProvider.selectionComponent;
	const hoverComponent = inlineCommentProvider && inlineCommentProvider.hoverComponent;

	// We want to set the draft to the range the user highlighted
	const setRangeForDraft = useCallback(() => {
		setDraftRange(range, type);
	}, [range, setDraftRange, type]);

	const clearRangeForDraft = useCallback(() => {
		clearDraftRange(type);
	}, [type, clearDraftRange]);

	const render = useCallback(
		({
			applyAnnotationDraftAt,
			clearAnnotationDraft,
		}: AnnotationsDraftContextWrapperChildrenProps) => {
			return (
				<>
					{children}
					{!!hoverComponent && (
						<HoverRangeValidator
							createAnalyticsEvent={createAnalyticsEvent}
							rendererRef={rendererRef}
							// Ignored via go/ees005
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							component={hoverComponent!}
							applyAnnotationDraftAt={applyAnnotationDraftAt}
							clearAnnotationDraft={clearAnnotationDraft}
						/>
					)}
					{!!selectionComponent && (
						<SelectionRangeValidator
							createAnalyticsEvent={createAnalyticsEvent}
							rendererRef={rendererRef}
							// Ignored via go/ees005
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							selectionComponent={selectionComponent!}
							applyAnnotationDraftAt={applyAnnotationDraftAt}
							clearAnnotationDraft={clearAnnotationDraft}
						/>
					)}
				</>
			);
		},
		[hoverComponent, selectionComponent, children, rendererRef, createAnalyticsEvent],
	);

	if (!selectionComponent && !hoverComponent) {
		return <>{children}</>;
	}

	return (
		<AnnotationsDraftContextWrapper
			setDraftRange={setRangeForDraft}
			clearDraftRange={clearRangeForDraft}
			isNestedRender={isNestedRender}
		>
			{render}
		</AnnotationsDraftContextWrapper>
	);
};
