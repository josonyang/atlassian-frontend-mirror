import EventEmitter from 'events';

import type { AnnotationId, AnnotationMarkStates, AnnotationTypes } from '@atlaskit/adf-schema';

export interface AnnotationState<Type> {
	annotationType: Type;
	id: AnnotationId;
	state: AnnotationMarkStates | null;
}

export enum AnnotationUpdateEvent {
	SET_ANNOTATION_FOCUS = 'SET_ANNOTATION_FOCUS',
	SET_ANNOTATION_HOVERED = 'SET_ANNOTATION_HOVERED',
	SET_ANNOTATION_STATE = 'SET_ANNOTATION_STATE',
	REMOVE_ANNOTATION_FOCUS = 'REMOVE_ANNOTATION_FOCUS',
	REMOVE_ANNOTATION_HOVERED = 'REMOVE_ANNOTATION_HOVERED',
	ON_ANNOTATION_CLICK = 'ON_ANNOTATION_CLICK',
	DESELECT_ANNOTATIONS = 'DESELECT_ANNOTATIONS',
}

type SetFocusPayload = Record<'annotationId', AnnotationId>;
type SetHoveredPayload = Record<'annotationId', AnnotationId>;

export type OnAnnotationClickPayload = {
	annotationIds: Array<AnnotationId>;
	eventTarget: HTMLElement;
	eventTargetType?: string;
	viewMethod?: string;
};

type SetStatePayload = Record<AnnotationId, AnnotationState<AnnotationTypes.INLINE_COMMENT>>;

export type AnnotationUpdateEventPayloads = {
	[AnnotationUpdateEvent.ON_ANNOTATION_CLICK]: OnAnnotationClickPayload;
	[AnnotationUpdateEvent.SET_ANNOTATION_FOCUS]: SetFocusPayload;
	[AnnotationUpdateEvent.SET_ANNOTATION_HOVERED]: SetHoveredPayload;
	[AnnotationUpdateEvent.SET_ANNOTATION_STATE]: SetStatePayload;
};

type Callback<T> = T extends keyof AnnotationUpdateEventPayloads
	? (payload: AnnotationUpdateEventPayloads[T]) => void
	: () => void;

export class AnnotationUpdateEmitter {
	private emitter: EventEmitter = new EventEmitter();

	emit<T extends keyof AnnotationUpdateEventPayloads>(
		event: T,
		params: AnnotationUpdateEventPayloads[T],
	): boolean;
	emit<T extends AnnotationUpdateEvent>(event: T): boolean;
	emit(event: AnnotationUpdateEvent, params?: never): boolean {
		if (typeof params === 'undefined') {
			return this.emitter.emit(event);
		}

		return this.emitter.emit(event, params);
	}

	on<T extends AnnotationUpdateEvent>(event: T, listener: Callback<T>): void;
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	on(event: string, listener: (payload?: any) => void): EventEmitter {
		return this.emitter.on(event, listener);
	}

	off<T extends AnnotationUpdateEvent>(event: T, listener: Callback<T>): void;
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	off(event: string, listener: (payload?: any) => void): EventEmitter {
		return this.emitter.removeListener(event, listener);
	}

	listeners(event: AnnotationUpdateEvent) {
		return this.emitter.listeners(event);
	}
}
