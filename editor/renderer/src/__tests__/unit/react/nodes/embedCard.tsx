import React from 'react';
import type { RichMediaLayout } from '@atlaskit/adf-schema';
import { WidthContext } from '@atlaskit/editor-common/ui';
import '@atlaskit/link-test-helpers/jest';
import type { RendererAppearance } from '@atlaskit/renderer';

import { Card, Client, Provider } from '@atlaskit/smart-card';
import { render } from '@testing-library/react';

import EmbedCard from '../../../../react/nodes/embedCard';

jest.mock('@atlaskit/smart-card', () => {
  const originalModule = jest.requireActual('@atlaskit/smart-card');
  return {
    ...originalModule,
    Card: jest.fn((props) => <originalModule.Card {...props} />),
  };
});

describe('Renderer - React/Nodes/EmbedCard', () => {
  const url =
    'https://pug.jira-dev.com/wiki/spaces/CE/blog/2017/08/18/3105751050/A+better+REST+API+for+Confluence+Cloud+via+Swagger';

  it('should render Card with frameStyle if provided as SmartLinks prop', () => {
    render(
      <Provider client={new Client('staging')}>
        <EmbedCard
          url={url}
          layout={'full-width'}
          smartLinks={{ frameStyle: 'hide' }}
        />
      </Provider>,
    );
    expect(Card).toBeCalledWith(
      expect.objectContaining({
        frameStyle: 'hide',
        appearance: 'embed',
      }),
      expect.anything(),
    );
  });

  describe('width', () => {
    const mediaSingleSelector = '.mediaSingleView-content-wrap';

    const mountEmbedCard = (
      documentWidth: number = 0,
      props?: Partial<React.ComponentProps<typeof EmbedCard>>,
    ) =>
      render(
        <Provider client={new Client('staging')}>
          <WidthContext.Provider
            value={{ width: documentWidth, breakpoint: 'S' }}
          >
            <EmbedCard layout="full-width" url={url} {...props} />
          </WidthContext.Provider>
        </Provider>,
      );

    const runTest = (
      documentWidth: number,
      rendererAppearance: RendererAppearance,
      layout: RichMediaLayout,
      expectedWidth: string,
    ) => {
      it(`should set container width to ${expectedWidth}`, () => {
        const { baseElement } = mountEmbedCard(documentWidth, {
          layout,
          rendererAppearance,
        });

        expect(
          baseElement.querySelector(mediaSingleSelector),
        ).toHaveStyleDeclaration('width', expectedWidth);
      });
    };

    const runScenarios = (
      documentWidth: number,
      scenarios: { [key: string]: string },
    ) => {
      describe(`when document width is ${documentWidth}`, () => {
        describe.each([['comment'], ['full-page'], ['full-width'], ['mobile']])(
          'with renderer appearance %s',
          (rendererAppearance: string) => {
            describe.each(Object.entries(scenarios))(
              'with layout %s',
              (layout: string, expectedWidth: string) => {
                runTest(
                  documentWidth,
                  rendererAppearance as RendererAppearance,
                  layout as RichMediaLayout,
                  expectedWidth,
                );
              },
            );
          },
        );
      });
    };

    runScenarios(2000, { 'full-width': '1800px', wide: '1011px' });
    runScenarios(1000, { 'full-width': '904px', wide: '904px' });
    runScenarios(600, { 'full-width': '504px', wide: '100%' });
    runScenarios(200, { 'full-width': '104px', wide: '100%' });

    describe('with ssr', () => {
      const mountEmbedCardSSR = (
        rendererAppearance: RendererAppearance = 'full-width',
      ) =>
        mountEmbedCard(0, {
          rendererAppearance,
          smartLinks: { ssr: true },
        });

      it(`should set container width to editor full layout width on renderer appearance full-width`, () => {
        const { baseElement } = mountEmbedCardSSR();

        expect(
          baseElement.querySelector(mediaSingleSelector),
        ).toHaveStyleDeclaration('width', '1704px');
      });

      it(`should set container width to editor default layout width on renderer appearance that is not full-width`, () => {
        const { baseElement } = mountEmbedCardSSR('full-page');

        expect(
          baseElement.querySelector(mediaSingleSelector),
        ).toHaveStyleDeclaration('width', '664px');
      });
    });
  });
});
