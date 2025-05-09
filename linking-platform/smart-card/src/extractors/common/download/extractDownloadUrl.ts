import { type JsonLd } from '@atlaskit/json-ld-types';

export const extractDownloadUrl = (jsonLd: JsonLd.Data.Document): string | undefined => {
	if (jsonLd['atlassian:downloadUrl']) {
		return jsonLd['atlassian:downloadUrl'];
	}
};
