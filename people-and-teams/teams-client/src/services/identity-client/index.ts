import { type EditableUserFields } from '../../types';
import { DEFAULT_CONFIG } from '../constants';
import { RestClient } from '../rest-client';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
	dataURItoFile,
	FieldType,
	type MutabilityContraints,
	toManageAPIInput,
	transformUserManageConfig,
} from './utils';

const defaultConfig = {
	serviceUrl: `${DEFAULT_CONFIG.stargateRoot}/users`,
};

export class IdentityClient extends RestClient {
	constructor(config = {}) {
		super({ ...defaultConfig, ...config });
	}

	async getUserManageConfig(userId: string): Promise<{
		mutabilityConstraints: {
			field: FieldType;
			reason: string | null;
		}[];
	}> {
		return this.getResourceCached<MutabilityContraints>(`/${userId}/manage`).then((resp) => {
			return transformUserManageConfig(resp);
		});
	}

	/**
	 * @deprecated
	 * User fetchUserAvatarInfo instead
	 */
	async getMyAvatarUploadedStatus(userId: string): Promise<{
		uploaded: boolean;
		url: string;
	}> {
		return this.fetchUserAvatarInfo(userId);
	}

	async deleteAvatar(userId: string): Promise<unknown> {
		return this.deleteResource(`/${userId}/manage/avatar`);
	}

	async fetchUserAvatarInfo(userId: string): Promise<{
		uploaded: boolean;
		url: string;
	}> {
		return this.getResource<{ uploaded: boolean; url: string }>(`/${userId}/manage/avatar`);
	}

	async updateUser({
		id,
		...user
	}: Partial<EditableUserFields> & { id: string }): Promise<unknown> {
		return this.patchResource(`/${id}/manage/profile`, toManageAPIInput(user));
	}

	async updateUserAvatar({ id, fileURI }: { id: string; fileURI: string }): Promise<string> {
		const fileObject = dataURItoFile(fileURI);
		const formData = new FormData();
		formData.append('file', fileObject);

		const response = await this.makeRequest<{ url: string }>(`/${id}/manage/avatar`, {
			method: 'PUT',
			body: formData,
		});

		return response.url;
	}
}

const _default_1: IdentityClient = new IdentityClient();
export default _default_1;
