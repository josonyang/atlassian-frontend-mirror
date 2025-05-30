import type { ComponentType } from 'react';

import type { ADFEntity } from '@atlaskit/adf-utils/types';

import type {
	ExtensionAPI,
	ExtensionParams,
	MultiBodiedExtensionActions,
	UpdateExtension,
} from './extension-handler';
import type { ExtensionIconModule, MaybeESModule } from './extension-manifest-common';
import type { ContextualToolbar } from './extension-manifest-toolbar-item';
import type { Parameters } from './extension-parameters';
import type { FieldDefinition, Option, UserFieldContext } from './field-definitions';

export type ExtensionType = string;
export type ExtensionKey = string;
export type ExtensionModuleKey = string;
export type ExtensionComponentProps<T extends Parameters = Parameters> = {
	node: ExtensionParams<T>;
	actions?: MultiBodiedExtensionActions;
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any; // many renderers pass their own context through too
};

export type ExtensionComponent<T extends Parameters> = ComponentType<
	React.PropsWithChildren<ExtensionComponentProps<T>>
>;
export type ExtensionComponentModule<T extends Parameters> = Promise<
	MaybeESModule<ExtensionComponent<T>>
>;

export type Serializer<T extends Parameters = Parameters> = (data: T) => string;
export type Deserializer<T extends Parameters = Parameters> = (value: string) => T;

export type ExtensionModuleActionObject<T extends Parameters = Parameters> = {
	key: ExtensionModuleKey;
	type: 'node';
	parameters?: T;
};

export type MaybeADFEntity = MaybeESModule<ADFEntity | Array<ADFEntity> | void>;
export type ExtensionModuleActionHandler = (extensionAPI: ExtensionAPI) => Promise<MaybeADFEntity>;

export type ExtensionModuleAction<T extends Parameters = Parameters> =
	| ExtensionModuleActionObject<T>
	| ExtensionModuleActionHandler;

export type ExtensionModule<T extends Parameters = Parameters> = {
	key: string;
	title?: string;
	description?: string;
	icon?: () => ExtensionIconModule;
	priority?: number;
	featured?: boolean;
	keywords?: string[];
	categories?: string[];
	action: ExtensionModuleAction<T>;
	parameters?: T;
};

export type DynamicFieldDefinitions<T> = (parameters: T) => FieldDefinition[];

export type ExtensionModuleNode<T extends Parameters = Parameters> = {
	type: 'extension' | 'inlineExtension' | 'bodiedExtension' | 'multiBodiedExtension';
	render: () => ExtensionComponentModule<T>;
	update?: UpdateExtension<T>;
	getFieldsDefinition?: (
		extensionParameters: T,
	) => Promise<FieldDefinition[] | DynamicFieldDefinitions<T>>;
};

export type PreloadableExtensionModuleNode<T extends Parameters = Parameters> =
	ExtensionModuleNode<T> & {
		preloadRender: () => Promise<void>;
		// sync version of render. call after preloadRender()
		renderSync: () => MaybeESModule<ExtensionComponent<T>>;
	};

export type ExtensionModuleNodes<T extends Parameters = Parameters> = {
	[key: string]: ExtensionModuleNode<T>;
};

export type ExtensionAutoConvertHandler = (text: string) => ADFEntity | undefined;

export type ExtensionModuleAutoConvert = {
	url?: ExtensionAutoConvertHandler[];
};

export type CustomFieldResolver = (
	searchTerm?: string,
	defaultValue?: string | string[],
	parameters?: Parameters,
) => Promise<Option[]>;
export type UserFieldContextProvider = () => Promise<UserFieldContext>;

export type ExtensionModuleFieldTypeCustom = { resolver: CustomFieldResolver };
export type ExtensionModuleFieldTypeUser = {
	provider: UserFieldContextProvider;
};

export type ExtensionModuleFieldTypeFieldset<T extends Parameters = Parameters> = {
	serializer?: Serializer<T>;
	deserializer?: Deserializer<T>;
};

export type ExtensionModuleFields<T extends Parameters = Parameters> = {
	custom?: {
		[key: string]: ExtensionModuleFieldTypeCustom;
	};
	fieldset?: {
		[key: string]: ExtensionModuleFieldTypeFieldset<T>;
	};
	user?: {
		[key: string]: ExtensionModuleFieldTypeUser;
	};
};

export type ExtensionModules<T extends Parameters = Parameters> = {
	// define items to show up in the slash menu, element browser and plus menu
	quickInsert?: ExtensionModule<T>[];
	// define how to handle each type of node (update, render, config, etc)
	nodes?: ExtensionModuleNodes<T>;
	// define how to handle special fields used in config forms
	fields?: ExtensionModuleFields<T>;
	// define how/when to convert pasted content to this extension
	autoConvert?: ExtensionModuleAutoConvert;
	// define buttons in toolbars for certain node types
	contextualToolbars?: ContextualToolbar[];
};

export type ExtensionQuickInsertModule = 'quickInsert';
export type ExtensionModuleType<T extends Parameters = Parameters> = Exclude<
	keyof ExtensionModules<T>,
	'nodes' | 'fields'
>;

type AutoConvertMatches = {
	pattern: string;
};

export type ExtensionDeprecationStatus = {
	isDeprecated: boolean;
	message?: string | React.ReactNode;
};

export type ExtensionManifest<T extends Parameters = Parameters> = {
	type: ExtensionType;
	key: ExtensionKey;
	title: string;
	description?: string;
	summary?: string;
	deprecation?: ExtensionDeprecationStatus;
	categories?: string[];
	keywords?: string[];
	documentationUrl?: string;
	icons: {
		'48': () => ExtensionIconModule;
		[dimensions: string]: () => ExtensionIconModule;
	};
	modules: ExtensionModules<T>;
	autoConvert?: { matchers: Array<AutoConvertMatches> };
};

// deprecated types
export type Icon = () => ExtensionIconModule;
export type Module<T extends Parameters> = MaybeESModule<T>;
