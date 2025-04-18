import { type JsonLd } from '@atlaskit/json-ld-types';
import { extractImage } from '@atlaskit/link-extractors';

import { MediaType } from '../../constants';
import { type Media } from '../../state/flexible-ui-context/types';

const extractPreview = (data: JsonLd.Data.BaseData): Media | undefined => {
	if (!data) {
		return undefined;
	}

	const url = extractImage(data);

	return url ? { type: MediaType.Image, url } : undefined;
};

export default extractPreview;
