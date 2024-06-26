import {
	type ExtensionAutoConvertHandler,
	type ExtensionKey,
	type ExtensionManifest,
	type ExtensionType,
} from './extension-manifest';
import { type Parameters } from './extension-parameters';

export interface ExtensionProvider<T extends Parameters = any> {
	getExtensions(): Promise<ExtensionManifest<T>[]>;
	getExtension(type: ExtensionType, key: ExtensionKey): Promise<ExtensionManifest<T> | undefined>;
	search(keyword: string): Promise<ExtensionManifest<T>[]>;
	getAutoConverter(): Promise<ExtensionAutoConvertHandler[]>;
}
