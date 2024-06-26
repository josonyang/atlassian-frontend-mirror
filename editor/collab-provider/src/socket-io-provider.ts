import { Provider } from './provider';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import type { Config, ProductInformation, InitAndAuthData, AuthCallback } from './types';
import { getProduct, getSubProduct } from './helpers/utils';
import { SOCKET_IO_OPTIONS } from './config';

export function createSocketIOSocket(
	url: string,
	auth?: AuthCallback | InitAndAuthData,
	productInfo?: ProductInformation,
): Socket {
	const { pathname } = new URL(url);
	return io(url, {
		reconnectionDelayMax: SOCKET_IO_OPTIONS.RECONNECTION_DELAY_MAX,
		reconnectionDelay: SOCKET_IO_OPTIONS.RECONNECTION_DELAY,
		randomizationFactor: SOCKET_IO_OPTIONS.RANDOMIZATION_FACTOR,
		closeOnBeforeunload: false,
		withCredentials: true,
		transports: ['polling', 'websocket'],
		path: `/${pathname.split('/')[1]}/socket.io`,
		auth,
		extraHeaders: {
			'x-product': getProduct(productInfo),
			'x-subproduct': getSubProduct(productInfo),
		},
	});
}

export function createSocketIOCollabProvider(config: Omit<Config, 'createSocket'>) {
	return new Provider({ ...config, createSocket: createSocketIOSocket });
}
