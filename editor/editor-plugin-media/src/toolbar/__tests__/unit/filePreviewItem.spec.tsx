import React from 'react';

import { render, waitFor } from '@testing-library/react';
import type { IntlShape } from 'react-intl-next';

import type { MediaPluginState } from '../../../pm-plugins/types';
import { FilePreviewItem } from '../../filePreviewItem';

describe('<FilePreviewItem />', () => {
  it('should render MediaViewer when shouldOpenMediaViewer=true and clicked', async () => {
    const mediaPluginState = {
      mediaClientConfig: {},
      selectedMediaContainerNode: jest.fn().mockReturnValue({
        attrs: { id: '1234', collection: 'collection-name' },
      }) as any,
    } as MediaPluginState;
    const intl = {
      formatMessage: jest.fn(message => message.id),
    } as unknown as IntlShape;

    const { getByTestId } = render(
      <FilePreviewItem mediaPluginState={mediaPluginState} intl={intl} />,
    );
    const resolvedView = await waitFor(() =>
      getByTestId('file-preview-toolbar-button'),
    );

    resolvedView.click();

    const mediaViewer = await waitFor(() => getByTestId('media-viewer-popup'));

    expect(mediaViewer).toBeTruthy();
  });
});
