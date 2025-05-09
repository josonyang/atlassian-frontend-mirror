import type { Format } from 'style-dictionary';

import { getTokenId } from '../../../src/utils/token-ids';
import sortTokens from '../sort-tokens';

const formatter: Format['formatter'] = ({ dictionary }) => {
	let tokens: string = '';

	sortTokens(
		dictionary.allTokens
			.filter((token) => token.attributes?.group !== 'palette')
			.filter((token) => token.attributes?.state !== 'deprecated')
			.filter((token) => token.attributes?.state !== 'deleted'),
	).forEach((token) => {
		tokens += `${getTokenId(token.path)}, "${token.attributes?.description.replace(/[\r\n]/g, ' ')}"\n`;
	});

	return tokens;
};

export default formatter;
