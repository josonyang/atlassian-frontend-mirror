import React from 'react';
import { md, code, Props } from '@atlaskit/docs';

export default md`
  # Media Table

  ## Usage

  ${code`
    import {MediaClientConfig} from '@atlaskit/media-core';
    import { MediaTable, MediaTableItem } from '@atlaskit/media-table';

    const mediaClientConfig: MediaClientConfig = {
      authProvider: () => Promise.resolve()
    };
    const items: MediaTableItem[] = [{
      identifier: {
        id: 'file-id-1',
        mediaItemType: 'file'
      }
    }, {
      identifier: {
        id: 'file-id-2',
        mediaItemType: 'file'
      }
    }]

    <MediaTable
      items={items}
      mediaClientConfig={mediaClientConfig}
    />
  `}

  ${(
    <Props
      heading="Media Table Props"
      props={require('!!extract-react-types-loader!../src/component/mediaTable')}
    />
  )}
`;
