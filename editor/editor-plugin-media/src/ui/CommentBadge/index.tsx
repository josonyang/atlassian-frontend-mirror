import React, { useCallback, useMemo, useState } from 'react';

import type { IntlShape } from 'react-intl-next';
import { injectIntl } from 'react-intl-next';

import type { AnnotationMarkDefinition } from '@atlaskit/adf-schema';
import { VIEW_METHOD } from '@atlaskit/editor-common/analytics';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import {
	CommentBadge as CommentBadgeComponent,
	CommentBadgeNext,
} from '@atlaskit/editor-common/media-single';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';

import type { MediaNextEditorPluginType } from '../../mediaPluginType';
import type { getPosHandler } from '../../types';

type CommentBadgeProps = {
	intl: IntlShape;
	api: ExtractInjectionAPI<MediaNextEditorPluginType>;
	mediaNode: PMNode | null;
	view: EditorView;
	getPos: getPosHandler;
	isDrafting: boolean;
	badgeOffsetRight?: string;
};

const CommentBadgeWrapper = ({
	api,
	mediaNode,
	view,
	getPos,
	intl,
	isDrafting,
	badgeOffsetRight,
}: CommentBadgeProps) => {
	const [entered, setEntered] = useState(false);
	const { annotationState } = useSharedPluginState(api, ['annotation']);
	const {
		state: {
			schema: {
				nodes: { media },
				marks: { annotation },
			},
		},
		state,
		dispatch,
	} = view;

	const status = useMemo(() => {
		if (!annotationState?.selectedAnnotations || !mediaNode) {
			return 'default';
		}

		return annotationState.selectedAnnotations.some(
			(annotation) => !!mediaNode.marks.find((mark) => mark.attrs.id === annotation.id),
		) && !annotationState.isInlineCommentViewClosed
			? 'active'
			: 'default';
	}, [annotationState, mediaNode]);

	const onClick = useCallback(() => {
		if (api.annotation && mediaNode) {
			const { showCommentForBlockNode } = api.annotation.actions;
			showCommentForBlockNode(mediaNode, VIEW_METHOD.BADGE)(state, dispatch);
		}
	}, [api.annotation, dispatch, mediaNode, state]);

	const pos = getPos();

	const hasNoComments =
		!Number.isFinite(pos) ||
		!annotationState?.annotations ||
		!mediaNode ||
		mediaNode.type !== media ||
		mediaNode.marks.every(
			(maybeAnnotation) =>
				maybeAnnotation.type !== annotation ||
				!(maybeAnnotation.attrs.id in annotationState.annotations) ||
				annotationState.annotations[maybeAnnotation.attrs.id],
		);

	if ((!isDrafting && hasNoComments) || !mediaNode) {
		return null;
	}

	/**
	 * After performing certain operations like drag and drop,
	 * the position may momentarily shift. It will NOT always be an HTML element;
	 * it could also be plain text.
	 */
	const maybeMediaSingleElement = view.domAtPos((pos as number) + 1).node;
	const mediaSingleElement =
		maybeMediaSingleElement instanceof HTMLElement ? maybeMediaSingleElement : null;

	return (
		<CommentBadgeComponent
			badgeOffsetRight={badgeOffsetRight}
			width={mediaNode.attrs.width}
			height={mediaNode.attrs.height}
			onClick={onClick}
			mediaSingleElement={mediaSingleElement}
			intl={intl}
			status={entered ? 'entered' : status}
			onMouseEnter={() => setEntered(true)}
			onMouseLeave={() => setEntered(false)}
		/>
	);
};

export const CommentBadge = injectIntl(CommentBadgeWrapper);

/**
 * Remove CommentBadgeWrapper component above
 * and rename CommentBadgeNextWrapper to CommentBadgeWrapper
 * when clean up platform_editor_add_media_from_url_rollout feature flag
 */

type CommentBadgeNextWrapperProps = {
	mediaSingleElement?: HTMLElement | null;
	marks?: AnnotationMarkDefinition[];
	isDrafting?: boolean;
	api: ExtractInjectionAPI<MediaNextEditorPluginType>;
	mediaNode: PMNode | null;
	view: EditorView;
	getPos: getPosHandler;
};

export const CommentBadgeNextWrapper = ({
	api,
	mediaNode,
	view,
	getPos,
	isDrafting,
}: CommentBadgeNextWrapperProps) => {
	const [entered, setEntered] = useState(false);
	const { annotationState } = useSharedPluginState(api, ['annotation']);
	const {
		state: {
			schema: {
				nodes: { media },
				marks: { annotation },
			},
		},
		state,
		dispatch,
	} = view;

	const status = useMemo(() => {
		if (!annotationState?.selectedAnnotations || !mediaNode) {
			return 'default';
		}

		return annotationState.selectedAnnotations.some(
			(annotation) => !!mediaNode.marks.find((mark) => mark.attrs.id === annotation.id),
		) && !annotationState.isInlineCommentViewClosed
			? 'active'
			: 'default';
	}, [annotationState, mediaNode]);

	const onClick = useCallback(() => {
		if (api.annotation && mediaNode) {
			const { showCommentForBlockNode } = api.annotation.actions;
			showCommentForBlockNode(mediaNode, VIEW_METHOD.BADGE)(state, dispatch);
		}
	}, [api.annotation, dispatch, mediaNode, state]);

	const pos = getPos();

	const hasNoComments =
		!Number.isFinite(pos) ||
		!annotationState?.annotations ||
		!mediaNode ||
		mediaNode.type !== media ||
		mediaNode.marks.every(
			(maybeAnnotation) =>
				maybeAnnotation.type !== annotation ||
				!(maybeAnnotation.attrs.id in annotationState.annotations) ||
				annotationState.annotations[maybeAnnotation.attrs.id],
		);

	if ((!isDrafting && hasNoComments) || !mediaNode) {
		return null;
	}

	const maybeMediaSingleElement = view.domAtPos((pos as number) + 1).node;
	const mediaSingleElement =
		maybeMediaSingleElement instanceof HTMLElement ? maybeMediaSingleElement : null;

	return (
		<CommentBadgeNext
			onClick={onClick}
			mediaSingleElement={mediaSingleElement}
			status={entered ? 'entered' : status}
			onMouseEnter={() => setEntered(true)}
			onMouseLeave={() => setEntered(false)}
		/>
	);
};
