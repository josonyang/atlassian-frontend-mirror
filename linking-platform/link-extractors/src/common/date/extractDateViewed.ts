import { type JsonLd } from '@atlaskit/json-ld-types';

export const extractDateViewed = (jsonLd: JsonLd.Data.Document): string | undefined => {
	if (jsonLd['atlassian:dateViewed']) {
		return jsonLd['atlassian:dateViewed'];
	}
};
