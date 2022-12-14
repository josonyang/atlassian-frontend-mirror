import { JsonLd } from 'json-ld-types';

import { PreviewActionData } from '../../../state/flexible-ui-context/types';
import { extractDownloadUrl } from '../../common/detail';
import { extractPreview as extractPreviewData } from '@atlaskit/linking-common';
import {
  extractLink,
  extractProvider,
  extractTitle,
} from '@atlaskit/linking-common/extractors';
import { extractLinkIcon } from '../icon';

export const extractPreviewAction = (
  response: JsonLd.Response,
): PreviewActionData | undefined => {
  const data = response.data as JsonLd.Data.BaseData;
  const src = extractPreviewData(data, 'web')?.src;
  if (src) {
    return {
      downloadUrl: extractDownloadUrl(data as JsonLd.Data.Document),
      providerName: extractProvider(data)?.text,
      src,
      title: extractTitle(data),
      linkIcon: extractLinkIcon(response),
      url: extractLink(data),
    };
  }
};
