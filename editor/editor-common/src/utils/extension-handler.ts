import type { Extension, ExtensionHandler, Parameters } from '../extensions/types';

export function getExtensionRenderer<T extends Parameters>(
	extensionHandler: Extension<T> | ExtensionHandler<T>,
): ExtensionHandler<T> {
	if (typeof extensionHandler === 'object') {
		return extensionHandler.render;
	} else {
		return extensionHandler;
	}
}
