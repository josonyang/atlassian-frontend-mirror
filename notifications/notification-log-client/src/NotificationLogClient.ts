import {
	type RequestServiceOptions,
	type ServiceConfig,
	utils,
} from '@atlaskit/util-service-support';
import { type NotificationLogProvider, type NotificationCountResponse } from './types';

export const DEFAULT_SOURCE = 'atlaskitNotificationLogClient';

export default class NotificationLogClient implements NotificationLogProvider {
	private serviceConfig: ServiceConfig;
	private cloudId?: string;
	private source: string;

	constructor(baseUrl: string, cloudId?: string, source: string = DEFAULT_SOURCE) {
		this.serviceConfig = { url: baseUrl };
		this.cloudId = cloudId;
		this.source = source;
	}

	public async countUnseenNotifications(
		options: RequestServiceOptions = {},
	): Promise<NotificationCountResponse> {
		const mergedOptions: RequestServiceOptions = {
			path: '/api/3/notifications/count/unseen',
			...options,
			queryParams: {
				...(this.cloudId && { cloudId: this.cloudId }),
				source: this.source,
				...(options.queryParams || {}),
			},
			requestInit: {
				mode: 'cors',
				headers: {
					'x-app-version': `${process.env._PACKAGE_VERSION_}-${DEFAULT_SOURCE}`,
				},
				...(options.requestInit || {}),
			},
		};

		return utils.requestService(
			this.serviceConfig,
			mergedOptions,
		) as Promise<NotificationCountResponse>;
	}
}
