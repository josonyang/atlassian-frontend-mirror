import type { ADFEntity } from '@atlaskit/adf-utils/types';
import { validator } from '@atlaskit/adf-utils/validator';
import type {
	ErrorCallbackOptions,
	Validate,
	ValidationError,
	ValidationErrorMap,
} from '@atlaskit/adf-utils/validatorTypes';
import type { Schema } from '@atlaskit/editor-prosemirror/model';

import { ACTION_SUBJECT_ID } from '../analytics';

export const UNSUPPORTED_NODE_ATTRIBUTE = 'unsupportedNodeAttribute';

import { fireUnsupportedEvent } from './track-unsupported-content';
import type { UnsupportedContentPayload } from './unsupportedContent/types';

export type DispatchAnalyticsEvent = (event: UnsupportedContentPayload) => void;

const errorCallbackFor = (
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	marks: any,
	validate: Validate,
	dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
	validationOverrides?: { allowNestedTables?: boolean },
) => {
	return (entity: ADFEntity, error: ValidationError, options: ErrorCallbackOptions) => {
		return validationErrorHandler(
			entity,
			error,
			{ ...options, allowNestedTables: validationOverrides?.allowNestedTables },
			marks,
			validate,
			dispatchAnalyticsEvent,
		);
	};
};

export const validationErrorHandler = (
	entity: ADFEntity,
	error: ValidationError,
	options: ErrorCallbackOptions,
	marks: string[],
	validate: Validate,
	dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
) => {
	if (entity && entity.type === UNSUPPORTED_NODE_ATTRIBUTE) {
		return entity;
	}

	if (options.isMark) {
		return wrapWithUnsupported(error.meta as ADFEntity, 'mark');
	}

	if (options.isNodeAttribute) {
		const entityType = entity && entity.type ? entity.type : undefined;
		return {
			type: UNSUPPORTED_NODE_ATTRIBUTE,
			attrs: {
				type: { nodeType: entityType },
				unsupported: error.meta,
			},
		};
	}

	if (entity && marks.indexOf(entity.type) > -1) {
		return;
	}

	/**
	 * There's a inconsistency between ProseMirror and ADF.
	 * `content` is actually optional in ProseMirror.
	 * And, also empty `text` node is not valid.
	 */
	if (error.code === 'MISSING_PROPERTIES' && entity.type === 'paragraph') {
		return { type: 'paragraph', content: [] };
	}

	// Ignored via go/ees007
	// eslint-disable-next-line @atlaskit/editor/enforce-todo-comment-format
	// TODO: We can repair missing content like `panel` without a `paragraph`.
	if (error.code === 'INVALID_CONTENT_LENGTH') {
		if (error.meta && options.allowUnsupportedBlock && entity.content) {
			return getEntityForInvalidContentLength(
				error,
				entity,
				validate,
				marks,
				dispatchAnalyticsEvent,
			);
		} else {
			// Can't fix it by wrapping
			if (dispatchAnalyticsEvent) {
				trackValidationError(dispatchAnalyticsEvent, error, entity);
			}
		}
	}

	// Nested tables don't actually exist in ADF. In ADF they are stored as an `extension` node with the nested table content serialized in a property of that extension.
	// Usually when we validate ADF we are validating this `extension` and then later transforming it into nested tables for usage by ProseMirror.
	// Under certain circumstances however, ADF validation is performed on this already transformed extension and since nested tables aren't allowed by ADF this
	// produces an error. For example, nested renderers in Confluence `bodiedExtension`'s. The nested renderer receives the already transformed nested tables that originated from the
	// `extension` node and validates it. This is invalid ADF so an error is thrown.
	// This override allows an exception to be made for nested tables in the validator in this circumstance.
	if (options.allowNestedTables) {
		const meta = error.meta as ValidationErrorMap['INVALID_CONTENT'] | undefined;
		if (
			options.allowNestedTables &&
			meta?.parentType &&
			['tableCell', 'tableHeader'].includes(meta?.parentType) &&
			error.code === 'INVALID_CONTENT' &&
			entity.type === 'table'
		) {
			return entity;
		}
	}

	if (options.allowUnsupportedBlock) {
		return wrapWithUnsupported(entity);
	}

	if (options.allowUnsupportedInline) {
		return wrapWithUnsupported(entity, 'inline');
	}

	if (dispatchAnalyticsEvent) {
		trackValidationError(dispatchAnalyticsEvent, error, entity);
	}
	return entity;
};

function getEntityForInvalidContentLength(
	error: ValidationError,
	entity: ADFEntity,
	validate: Validate,
	marks: string[],
	dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
): ADFEntity {
	const meta = error.meta as ValidationErrorMap['INVALID_CONTENT_LENGTH'];
	if (meta.type === 'maximum') {
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		entity.content = entity
			.content!.filter((x): x is ADFEntity => !!x)
			.map((child, index) => {
				return index >= meta.requiredLength && child.type !== 'unsupportedBlock'
					? wrapWithUnsupported(child)
					: validate(child, errorCallbackFor(marks, validate, dispatchAnalyticsEvent)).entity;
			});
	}
	if (meta.type === 'minimum') {
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (entity.content!.length === 0) {
			return wrapWithUnsupported(entity);
		}
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		entity.content = entity
			.content!.filter((x): x is ADFEntity => !!x)
			.map((child) => {
				return child.type !== 'unsupportedBlock' ? wrapWithUnsupported(child) : child;
			});
	}
	return entity;
}

function trackValidationError(
	dispatchAnalyticsEvent: DispatchAnalyticsEvent,
	error: ValidationError,
	entity: ADFEntity,
) {
	if (!dispatchAnalyticsEvent) {
		return;
	}

	fireUnsupportedEvent(
		dispatchAnalyticsEvent,
		ACTION_SUBJECT_ID.UNSUPPORTED_ERROR,
		{
			type: entity.type || '',
			ancestry: entity.ancestorHierarchy || '',
			parentType: entity.parentType || '',
			marks: entity.marks || [],
			attrs: entity.attrs || {},
		},
		error.code,
	);
}

export const validateADFEntity = (
	schema: Schema,
	node: ADFEntity,
	dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
	validationOverrides?: { allowNestedTables?: boolean },
): ADFEntity => {
	const nodes = Object.keys(schema.nodes);
	const marks = Object.keys(schema.marks);
	const validate = validator(nodes, marks, { allowPrivateAttributes: true });
	const emptyDoc: ADFEntity = { type: 'doc', content: [] };

	const { entity = emptyDoc } = validate(
		node,
		errorCallbackFor(marks, validate, dispatchAnalyticsEvent, validationOverrides),
	);

	return entity;
};

export function wrapWithUnsupported(
	originalValue: ADFEntity,
	type: 'block' | 'inline' | 'mark' = 'block',
) {
	let unsupportedNodeType: string;
	switch (type) {
		case 'inline':
			unsupportedNodeType = 'unsupportedInline';
			break;

		case 'mark':
			unsupportedNodeType = 'unsupportedMark';
			break;

		default:
			unsupportedNodeType = 'unsupportedBlock';
	}

	return {
		type: unsupportedNodeType,
		attrs: { originalValue },
	};
}
