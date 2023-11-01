import { waitFor } from '@testing-library/react';

import { EVENT_CHANNEL } from '../../../../analytics';

import {
  assetsContext,
  defaultAssetsMeta,
  getObjectSchemasDefaultHookState,
  geValidateAqlTextDefaultHookState,
  mockFetchObjectSchemasSuccess,
  setup,
} from './_utils';

const getButtonClickEventPayload = (
  actionSubjectId: 'insert' | 'cancel',
  attributes = {},
) => ({
  payload: {
    eventType: 'ui',
    actionSubject: 'button',
    action: 'clicked',
    actionSubjectId: actionSubjectId,
    attributes: {
      ...attributes,
    },
  },
  context: [assetsContext],
});

describe('Analytics: AssetsConfigModal', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should fire screen viewed analytics event when config modal is shown', async () => {
    const { onAnalyticFireEvent } = await setup();
    await waitFor(() => {
      expect(onAnalyticFireEvent).toBeFiredWithAnalyticEventOnce(
        {
          payload: {
            eventType: 'screen',
            name: 'datasourceModalDialog',
            action: 'viewed',
            attributes: {},
          },
          context: [assetsContext],
        },
        EVENT_CHANNEL,
      );
    });
  });

  it('should fire "ui.modal.ready.datasource" when modal is ready after fetching schemas for the user to search and display data', async () => {
    const mockFetchObjectSchemas = jest
      .fn()
      .mockResolvedValue(mockFetchObjectSchemasSuccess);

    const { onAnalyticFireEvent } = await setup({
      objectSchemasHookState: {
        ...getObjectSchemasDefaultHookState(),
        objectSchemas: mockFetchObjectSchemasSuccess.objectSchemas,
        fetchObjectSchemas: mockFetchObjectSchemas,
      },
    });

    await waitFor(() => {
      expect(mockFetchObjectSchemas).toHaveBeenCalled();
      expect(onAnalyticFireEvent).toBeFiredWithAnalyticEventOnce(
        {
          payload: {
            eventType: 'ui',
            action: 'ready',
            actionSubject: 'modal',
            actionSubjectId: 'datasource',
            attributes: {
              instancesCount: null,
              schemasCount: 2,
            },
          },
          context: [assetsContext],
        },
        EVENT_CHANNEL,
      );
    });
  });

  describe('button clicked events', () => {
    const actionAttributeTests = (
      actionSubjectId: 'insert' | 'cancel',
      buttonName: 'Insert objects' | 'Cancel',
    ) => {
      let defaultAttributes = {};
      beforeEach(() => {
        defaultAttributes = {
          ...defaultAssetsMeta,
          searchCount: 1,
          actions: [],
        };
      });
      describe('with "actions" attribute', () => {
        it(`should fire "ui.button.clicked.${actionSubjectId}" with action = "schema updated" when user selected a new schema and then clicked the ${buttonName} button`, async () => {
          const mockFetchObjectSchemas = jest
            .fn()
            .mockResolvedValue(mockFetchObjectSchemasSuccess);

          const {
            selectNewSchema,
            assertAnalyticsAfterButtonClick,
            clickSearchButton,
          } = await setup({
            objectSchemasHookState: {
              ...getObjectSchemasDefaultHookState(),
              objectSchemas: mockFetchObjectSchemasSuccess.objectSchemas,
              fetchObjectSchemas: mockFetchObjectSchemas,
            },
          });

          await selectNewSchema('schemaTwo');
          await clickSearchButton();

          await assertAnalyticsAfterButtonClick(
            buttonName,
            getButtonClickEventPayload(actionSubjectId, {
              ...defaultAttributes,
              actions: ['schema updated'],
            }),
          );
        });

        it(`should fire "ui.button.clicked.${actionSubjectId}" with action = "query updated" when user searched with a new query and then clicked the ${buttonName} button`, async () => {
          const mockValidateAqlText = jest.fn().mockResolvedValue({
            isValid: true,
            message: null,
          });

          const {
            searchWithNewAql,
            assertAnalyticsAfterButtonClick,
            clickSearchButton,
          } = await setup({
            validateAqlTextHookState: {
              ...geValidateAqlTextDefaultHookState(),
              validateAqlText: mockValidateAqlText,
            },
          });

          searchWithNewAql('objectType = "test aql query"');
          await waitFor(() => {
            expect(mockValidateAqlText).toBeCalledTimes(1);
          });
          await clickSearchButton();

          await assertAnalyticsAfterButtonClick(
            buttonName,
            getButtonClickEventPayload(actionSubjectId, {
              ...defaultAttributes,
              actions: ['query updated'],
            }),
          );
        });
      });
    };

    describe('insert', () => {
      const INSERT_BUTTON_NAME = 'Insert objects';
      const INSERT_ACTION_SUBJECT_ID = 'insert';

      actionAttributeTests(INSERT_ACTION_SUBJECT_ID, INSERT_BUTTON_NAME);
    });

    describe('cancel', () => {
      const CANCEL_BUTTON_NAME = 'Cancel';
      const CANCEL_BUTTON_ACTION_SUBJECT_ID = 'cancel';

      actionAttributeTests(CANCEL_BUTTON_ACTION_SUBJECT_ID, CANCEL_BUTTON_NAME);
    });
  });
});
