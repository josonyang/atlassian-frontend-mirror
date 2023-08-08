import React from 'react';
import type { ComponentType } from 'react';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { fakeMediaProvider } from '@atlaskit/editor-test-helpers/media-provider';
import pixelWidthMedia from '../__fixtures__/media-pixel-size.adf.json';
import pixelWidthMediaNested from '../__fixtures__/media-pixel-size-nested.adf.json';

import { getSchemaBasedOnStage } from '@atlaskit/adf-schema/schema-default';
import { storyContextIdentifierProviderFactory } from '@atlaskit/editor-test-helpers/context-identifier-provider';
import { IntlProvider } from 'react-intl-next';
import { Renderer } from '../../ui';
import { RendererProps } from '../..';

const mediaProvider = fakeMediaProvider();
const contextIdentifierProvider = storyContextIdentifierProviderFactory();
const providerFactory = ProviderFactory.create({
  mediaProvider,
  contextIdentifierProvider,
});

const defaultBaseRendererProps: Omit<RendererProps, 'document'> = {
  adfStage: 'stage0',
  dataProviders: providerFactory,
  schema: getSchemaBasedOnStage('stage0'),
  media: { featureFlags: { captions: true }, allowLinking: true },
};

export const generateRendererComponent = (
  props: RendererProps,
): ComponentType<any> => {
  const renderProps = {
    ...defaultBaseRendererProps,
    ...props,
  };

  return () => {
    return (
      <IntlProvider locale="en">
        <Renderer {...renderProps} />
      </IntlProvider>
    );
  };
};

export const MediaWithPixelWidth = generateRendererComponent({
  document: pixelWidthMedia,
  appearance: 'full-page',
});

export const MediaWithPixelWidthFullWidth = generateRendererComponent({
  document: pixelWidthMedia,
  appearance: 'full-width',
});

export const MediaWithPixelWidthNested = generateRendererComponent({
  document: pixelWidthMediaNested,
  appearance: 'full-page',
});

export const MediaWithPixelWidthFullWidthNested = generateRendererComponent({
  document: pixelWidthMediaNested,
  appearance: 'full-width',
});