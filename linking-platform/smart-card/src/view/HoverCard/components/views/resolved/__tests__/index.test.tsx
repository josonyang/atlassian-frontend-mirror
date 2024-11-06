import React from 'react';

import { act, fireEvent, render, type RenderOptions } from '@testing-library/react';
import { type JsonLd } from 'json-ld-types';
import { IntlProvider } from 'react-intl-next';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import { type JsonLdDatasourceResponse } from '@atlaskit/link-client-extension';
import { SmartCardProvider } from '@atlaskit/link-provider';
import type { CardState, ProductType } from '@atlaskit/linking-common';

import { getCardState } from '../../../../../../../examples/utils/flexible-ui';
import MockAtlasProject from '../../../../../../__fixtures__/atlas-project';
import mockAtlasProjectWithAiSummary from '../../../../../../__fixtures__/atlas-project-with-ai-summary';
import { SmartLinkPosition, SmartLinkSize } from '../../../../../../constants';
import { useSmartLinkAnalytics } from '../../../../../../state/analytics';
import { useAISummary } from '../../../../../../state/hooks/use-ai-summary';
import { AISummariesStore } from '../../../../../../state/hooks/use-ai-summary/ai-summary-service/store';
import * as useInvoke from '../../../../../../state/hooks/use-invoke';
import * as useResolve from '../../../../../../state/hooks/use-resolve';
import { ANALYTICS_CHANNEL } from '../../../../../../utils/analytics';
import { mocks } from '../../../../../../utils/mocks';
import {
	mockBaseResponseWithErrorPreview,
	mockBaseResponseWithPreview,
	mockConfluenceResponse,
	mockIframelyResponse,
	mockJiraResponse,
	mockJiraResponseWithDatasources,
} from '../../../../__tests__/__mocks__/mocks';
import HoverCardResolvedView from '../index';

jest.mock('../../../../../../state/hooks/use-ai-summary', () => {
	const original = jest.requireActual('../../../../../../state/hooks/use-ai-summary');
	return {
		useAISummary: jest.fn().mockImplementation(({ url, ari, product }) => {
			return {
				summariseUrl: original.useAISummary({ url, ari, product }).summariseUrl,
				state: { status: 'ready', content: '' },
			};
		}),
	};
});

// Must be similar to the product name we use inside the mocked module below.
const productName: ProductType = 'ATLAS';

const titleBlockProps = {
	maxLines: 2,
	size: SmartLinkSize.Large,
	position: SmartLinkPosition.Center,
};

describe('HoverCardResolvedView', () => {
	const id = 'resolved-test-id';
	const location = 'resolved-test-location';
	const spy = jest.fn();
	const url = 'test-url';
	let cardState: CardState;

	const wrapper: RenderOptions['wrapper'] = ({ children }) => (
		<IntlProvider locale="en">
			<AnalyticsListener onEvent={spy} channel={ANALYTICS_CHANNEL}>
				<SmartCardProvider
					storeOptions={{
						initialState: {
							'test-url': cardState,
						},
					}}
					product={productName}
					isAdminHubAIEnabled
				>
					{children}
				</SmartCardProvider>
			</AnalyticsListener>
		</IntlProvider>
	);

	const TestComponent = ({
		mockResponse = mockConfluenceResponse as JsonLdDatasourceResponse,
		isAISummaryEnabled,
		cardState,
	}: {
		mockResponse?: JsonLd.Response;
		isAISummaryEnabled?: boolean;
		cardState: any;
	}) => {
		const analyticsEvents = useSmartLinkAnalytics(url, id, location);

		return (
			<HoverCardResolvedView
				analytics={analyticsEvents}
				extensionKey={mockResponse.meta.key}
				id="123"
				flexibleCardProps={{ cardState, children: null, url }}
				onActionClick={jest.fn()}
				cardState={cardState}
				url={url}
				titleBlockProps={titleBlockProps}
				isAISummaryEnabled={isAISummaryEnabled}
			/>
		);
	};

	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.useRealTimers();
	});

	const setup = ({
		mockResponse = mockConfluenceResponse as JsonLdDatasourceResponse,
		isAISummaryEnabled,
	}: {
		mockResponse?: JsonLd.Response;
		isAISummaryEnabled?: boolean;
	} = {}) => {
		cardState = getCardState({
			data: mockResponse.data,
			meta: mockResponse.meta,
			status: 'resolved',
			datasources: (mockResponse as JsonLdDatasourceResponse).datasources,
		});

		const renderResult = render(
			<TestComponent
				cardState={cardState}
				mockResponse={mockResponse}
				isAISummaryEnabled={isAISummaryEnabled}
			/>,
			{ wrapper },
		);

		const rerenderTestComponent = () =>
			renderResult.rerender(
				<TestComponent
					cardState={cardState}
					mockResponse={mockResponse}
					isAISummaryEnabled={isAISummaryEnabled}
				/>,
			);

		return { ...renderResult, rerenderTestComponent };
	};

	it('renders hover card blocks', async () => {
		const { findAllByTestId, findByTestId } = setup();
		act(() => {
			jest.runAllTimers();
		});
		const titleBlock = await findByTestId('smart-block-title-resolved-view');
		await findAllByTestId('smart-block-metadata-resolved-view');
		const snippetBlock = await findByTestId('smart-block-snippet-resolved-view');
		const actionBlock = await findByTestId('smart-block-action');

		const footerBlock = await findByTestId('smart-ai-footer-block-resolved-view');
		expect(titleBlock.textContent?.trim()).toBe('I love cheese');
		expect(snippetBlock.textContent).toBe('Here is your serving of cheese');
		expect(actionBlock).toBeInTheDocument();
		expect(footerBlock.textContent?.trim()).toBe('Confluence');
	});

	describe('preview or snippet', () => {
		it('should render preview instead of snippet when preview data is available', async () => {
			const { findByTestId, queryByTestId } = setup({
				mockResponse: mockBaseResponseWithPreview as JsonLd.Response,
			});
			act(() => {
				jest.runAllTimers();
			});
			await findByTestId('smart-block-title-resolved-view');
			await findByTestId('smart-block-preview-resolved-view');

			expect(queryByTestId('smart-block-snippet-resolved-view')).toBeNull();
		});

		it('should fallback to rendering snippet if preview data is available but fails to load', async () => {
			const { findByTestId, queryByTestId } = setup({
				mockResponse: mockBaseResponseWithErrorPreview as JsonLd.Response,
			});
			act(() => {
				jest.runAllTimers();
			});
			await findByTestId('smart-block-title-resolved-view');
			fireEvent.transitionEnd(await findByTestId('smart-block-preview-resolved-view'));
			await findByTestId('smart-block-snippet-resolved-view');

			expect(queryByTestId('smart-block-preview-resolved-view')).toBeNull();
		});
	});

	describe('metadata', () => {
		it('renders correctly for confluence links', async () => {
			const { findByTestId } = setup();
			await findByTestId('authorgroup-metadata-element');
			const commentCount = await findByTestId('commentcount-metadata-element');
			const reactCount = await findByTestId('reactcount-metadata-element');

			expect(commentCount.textContent).toBe('4');
			expect(reactCount.textContent).toBe('8');
		});

		it('renders correctly for jira links', async () => {
			const { findByTestId } = setup({
				mockResponse: mockJiraResponse as JsonLd.Response,
			});
			await findByTestId('assignedtogroup-metadata-element');
			const priority = await findByTestId('priority-metadata-element');
			const state = await findByTestId('state-metadata-element');

			expect(priority.textContent).toBe('Major');
			expect(state.textContent).toBe('Done');
		});

		it('renders correctly for other providers', async () => {
			const { findByTestId } = setup({
				mockResponse: mockIframelyResponse as JsonLd.Response,
			});
			const titleBlock = await findByTestId('smart-block-title-resolved-view');
			const modifiedOn = await findByTestId('modifiedon-metadata-element');
			await findByTestId('authorgroup-metadata-element');

			expect(titleBlock.textContent?.trim()).toBe('I love cheese');
			expect(modifiedOn.textContent).toBe('Updated on Jan 1, 2022');
		});
	});

	describe('actions', () => {
		it('renders PreviewAction', async () => {
			const { findByTestId } = setup();

			const action = await findByTestId('smart-action-preview-action');
			expect(action.textContent).toBe('Open preview');
		});

		it('renders CopyLinkAction', async () => {
			const { findByTestId } = setup();

			const action = await findByTestId('smart-action-copy-link-action');
			expect(action.textContent).toBe('Copy link');
		});

		it('renders FollowAction', async () => {
			jest.spyOn(useInvoke, 'default').mockReturnValue(jest.fn());
			jest.spyOn(useResolve, 'default').mockReturnValue(jest.fn());
			const { findByTestId } = setup({
				mockResponse: MockAtlasProject,
			});

			const action = await findByTestId('smart-action-follow-action');
			expect(action?.textContent).toEqual('Follow project');
		});

		describe('AISummaryAction', () => {
			beforeEach(() => {
				AISummariesStore.clear();
			});

			it('renders AI summary action', async () => {
				const { findByTestId } = setup({
					mockResponse: mockAtlasProjectWithAiSummary,
					isAISummaryEnabled: true,
				});

				const aiSummaryAction = await findByTestId(
					'smart-action-ai-summary-action-summarise-action',
				);
				expect(aiSummaryAction?.textContent).toEqual('Summarize with AI');
			});

			it('renders snippet as a placeholder', async () => {
				const { findByTestId } = setup({
					mockResponse: mockAtlasProjectWithAiSummary,
					isAISummaryEnabled: true,
				});

				const snippet = await findByTestId('smart-block-snippet-resolved-view');

				expect(snippet).toBeInTheDocument();
			});

			it('renders AI summary block and hides the snippet when is summary content available', async () => {
				jest.mocked(useAISummary).mockReturnValueOnce({
					state: { status: 'loading', content: '' },
					summariseUrl: jest.fn(),
				});

				const { findByTestId, queryByTestId, rerenderTestComponent } = setup({
					mockResponse: mockAtlasProjectWithAiSummary,
					isAISummaryEnabled: true,
				});

				const snippet = queryByTestId('smart-block-snippet-resolved-view');
				expect(snippet).toBeInTheDocument();

				jest.mocked(useAISummary).mockReturnValueOnce({
					state: {
						status: 'loading',
						content: 'first piece of summary is here',
					},
					summariseUrl: jest.fn(),
				});

				rerenderTestComponent();

				const aiSummaryBlock = await findByTestId('smart-ai-summary-block-resolved-view');
				const snippetAfterRerender = queryByTestId('smart-block-snippet-resolved-view');

				expect(aiSummaryBlock).toBeInTheDocument();
				expect(snippetAfterRerender).not.toBeInTheDocument();
			});

			it('should use a resolved data URL instead of provided URL', () => {
				// Provided URL can be different from the data URL obtained from the resolver (see short links as example).
				// We want to ensure that all components within the Hover Card subscribe to the same URL AI Summary update
				// and do not create two different instances of AI Summary Service.
				setup({
					mockResponse: {
						...mockAtlasProjectWithAiSummary,
						data: {
							...mockAtlasProjectWithAiSummary.data,
							url: 'http://data-link-url.com',
						},
					},
					isAISummaryEnabled: true,
				});

				expect(AISummariesStore.size).toBe(1);
				// Provided URL
				expect(AISummariesStore.get(url)).not.toBeDefined();
				// Data url from the cardState
				expect(AISummariesStore.get('http://data-link-url.com')).toBeDefined();
			});

			it('should call the useAISummary hook with a product name when it`s available in SmartLinkContext', () => {
				setup({
					mockResponse: mockAtlasProjectWithAiSummary,
					isAISummaryEnabled: true,
				});

				expect(useAISummary).toHaveBeenCalledWith(
					expect.objectContaining({
						product: productName,
					}),
				);
			});
		});
	});

	describe('analytics', () => {
		it('should fire render success event when hover card is rendered', async () => {
			const { findByTestId } = setup({
				mockResponse: {
					...mockConfluenceResponse,
					...mocks.analytics.details,
				} as JsonLd.Response,
			});
			await findByTestId('smart-block-title-resolved-view');

			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({
					payload: {
						action: 'renderSuccess',
						actionSubject: 'smartLink',
						eventType: 'ui',
						attributes: {
							componentName: 'smart-cards',
							packageName: expect.any(String),
							packageVersion: expect.any(String),
							status: 'resolved',
							extensionKey: 'spaghetti-key',
							definitionId: 'spaghetti-id',
							destinationProduct: 'spaghetti-product',
							destinationSubproduct: 'spaghetti-subproduct',
							location: 'resolved-test-location',
							display: 'hoverCardPreview',
							canBeDatasource: false,
							id: expect.any(String),
							resourceType: 'spaghetti-resource',
							destinationObjectType: 'spaghetti-resource',
						},
					},
				}),
				ANALYTICS_CHANNEL,
			);
		});

		it('should fire render success event with canBeDatasource = true when hover card is rendered and state has datasources data', async () => {
			const { findByTestId } = setup({
				mockResponse: {
					...mockJiraResponseWithDatasources,
					...mocks.analytics.details,
				} as JsonLd.Response,
			});
			await findByTestId('smart-block-title-resolved-view');
			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({
					payload: {
						action: 'renderSuccess',
						actionSubject: 'smartLink',
						eventType: 'ui',
						attributes: {
							componentName: 'smart-cards',
							packageName: expect.any(String),
							packageVersion: expect.any(String),
							status: 'resolved',
							extensionKey: 'spaghetti-key',
							definitionId: 'spaghetti-id',
							destinationProduct: 'spaghetti-product',
							destinationSubproduct: 'spaghetti-subproduct',
							location: 'resolved-test-location',
							display: 'hoverCardPreview',
							canBeDatasource: true,
							id: expect.any(String),
							resourceType: 'spaghetti-resource',
							destinationObjectType: 'spaghetti-resource',
						},
					},
				}),
				ANALYTICS_CHANNEL,
			);
		});
	});
});
