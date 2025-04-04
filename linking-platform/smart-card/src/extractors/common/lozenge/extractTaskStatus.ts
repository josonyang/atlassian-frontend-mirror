import { type JsonLd } from '@atlaskit/json-ld-types';

import { type LinkLozenge } from './types';

export const extractTaskStatus = (jsonLd: JsonLd.Data.Task): LinkLozenge | undefined => {
	const taskStatus = jsonLd['atlassian:taskStatus'];
	if (taskStatus && taskStatus.name) {
		return { text: taskStatus.name, appearance: 'success' };
	}
};
