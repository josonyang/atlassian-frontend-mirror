import { type JsonLd } from '@atlaskit/json-ld-types';
import { R500 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { extractorPriorityMap } from '../icon/priority';

export const extractTitleTextColor = (jsonLd: JsonLd.Primitives.Object): string | undefined => {
	const type = jsonLd['@type'];
	if (Array.isArray(type)) {
		const highestPriorityType = type.sort(
			(a, b) => extractorPriorityMap[b] - extractorPriorityMap[a],
		)[0];
		switch (highestPriorityType) {
			case 'atlassian:UndefinedLink':
				return token('color.text.danger', R500);
			default:
				return undefined;
		}
	}
};
