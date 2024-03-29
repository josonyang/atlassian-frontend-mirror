/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
import React from 'react';
import {
  ExtensionComponentProps,
  Parameters,
} from '@atlaskit/editor-common/extensions';

export interface AwesomeParams extends Parameters {
  item?: string;
  items?: string[];
}

export default ({ node }: ExtensionComponentProps<AwesomeParams>) => {
  const { parameters, extensionKey } = node;
  const [, nodeKey = 'default'] = extensionKey.split(':');

  switch (nodeKey) {
    case 'default':
      return (
        <div
          style={{ border: '1px dashed red', margin: '10px 0' }}
          title="default"
        >
          {parameters && parameters.item}
        </div>
      );
    case 'list':
      return (
        <div
          style={{ border: '1px dashed green', margin: '10px 0' }}
          title="list"
        >
          {parameters && parameters.items && parameters.items.join('-')}
        </div>
      );
  }

  return null;
};
