import type {
	ExtensionManifest,
	ExtensionModule,
	ExtensionModuleNodes,
} from '@atlaskit/editor-common/extensions';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
	cqlDeserializer,
	cqlSerializer,
	mockFieldResolver,
} from '@atlaskit/editor-test-helpers/example-helpers';

import { customFields, nativeFields } from './fields';

const exampleFields = [...nativeFields, ...customFields];

const quickInsert: ExtensionModule[] = exampleFields.map((field) => ({
	key: field.name,
	title: field.label,
	description: `type: ${field.type} (${field.name})`,
	icon: () =>
		import(
			/* webpackChunkName: "@atlaskit-internal_icon-code" */ '@atlaskit/icon/glyph/editor/code'
		).then((mod) => mod.default),
	action: {
		type: 'node',
		key: field.name,
		parameters: {},
	},
}));

const nodes = exampleFields.reduce<ExtensionModuleNodes>((curr, field) => {
	curr[field.name] = {
		type: 'extension',
		// Ignored via go/ees005
		// eslint-disable-next-line require-await
		render: async () => () => null,
		// Ignored via go/ees005
		// eslint-disable-next-line require-await
		getFieldsDefinition: async () => [field],
	};

	return curr;
}, {});

const manifest: ExtensionManifest = {
	title: 'Editor fields example',
	type: 'twp.editor.example',
	key: 'all-fields',
	description: 'Example of fields supported by the editor',
	icons: {
		'48': () =>
			import(
				/* webpackChunkName: "@atlaskit-internal_icon-code" */ '@atlaskit/icon/glyph/editor/code'
			).then((mod) => mod.default),
	},
	modules: {
		quickInsert,
		nodes,
		fields: {
			custom: {
				'mock-resolver': {
					resolver: mockFieldResolver,
				},
			},
			fieldset: {
				cql: {
					serializer: cqlSerializer,
					deserializer: cqlDeserializer,
				},
			},
			user: {
				'user-jdog-provider': {
					// Ignored via go/ees005
					// eslint-disable-next-line require-await
					provider: async () => {
						return {
							siteId: '49d8b9d6-ee7d-4931-a0ca-7fcae7d1c3b5',
							principalId: 'Context',
							fieldId: 'storybook',
							productKey: 'jira',
						};
					},
				},
			},
		},
	},
};

export default manifest;
