import './card-states.card.test.mock';

import React from 'react';

import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl-next';

import FabricAnalyticsListeners, { type AnalyticsWebClient } from '@atlaskit/analytics-listeners';
import {
	type CardClient,
	type CardProviderStoreOpts,
	SmartCardProvider as Provider,
} from '@atlaskit/link-provider';
import { mockSimpleIntersectionObserver } from '@atlaskit/link-test-helpers';

import { fakeFactory, mockGenerator, mocks } from '../../../utils/mocks';
import { Card } from '../../Card';

mockSimpleIntersectionObserver();

describe('smart-card: card states, flexible block withUrl', () => {
	const mockOnError = jest.fn();
	let mockClient: CardClient;
	let mockFetch: jest.Mock;
	let mockUrl: string;
	const mockAnalyticsClient = {
		sendUIEvent: jest.fn().mockResolvedValue(undefined),
		sendOperationalEvent: jest.fn().mockResolvedValue(undefined),
		sendTrackEvent: jest.fn().mockResolvedValue(undefined),
		sendScreenEvent: jest.fn().mockResolvedValue(undefined),
	} satisfies AnalyticsWebClient;

	beforeEach(() => {
		mockFetch = jest.fn(() => Promise.resolve(mocks.success));
		mockClient = new (fakeFactory(mockFetch))();
		mockUrl = 'https://drive.google.com/drive/folders/test';
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('> state: resolved', () => {
		it('should capture and report a11y violations', async () => {
			const { container } = render(
				<FabricAnalyticsListeners client={mockAnalyticsClient}>
					<IntlProvider locale="en">
						<Provider client={mockClient}>
							<Card appearance="block" url={mockUrl} />
						</Provider>
					</IntlProvider>
				</FabricAnalyticsListeners>,
			);

			await expect(container).toBeAccessible();
		});

		it('flexible block card: should render with metadata when resolved', async () => {
			render(
				<FabricAnalyticsListeners client={mockAnalyticsClient}>
					<IntlProvider locale="en">
						<Provider client={mockClient}>
							<Card appearance="block" url={mockUrl} />
						</Provider>
					</IntlProvider>
				</FabricAnalyticsListeners>,
			);

			const resolvedCard = await screen.findByTestId('smart-block-resolved-view');
			const resolvedViewName = await screen.findByText('I love cheese');
			const resolvedViewDescription = await screen.findByText('Here is your serving of cheese: 🧀');

			expect(resolvedCard).toBeTruthy();
			expect(resolvedViewName).toBeTruthy();
			expect(resolvedViewDescription).toBeTruthy();
			expect(mockFetch).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockAnalyticsClient.sendUIEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					action: 'renderSuccess',
					actionSubject: 'smartLink',
					attributes: expect.objectContaining({
						display: 'block',
						status: 'resolved',
					}),
				}),
			);
		});

		it('should fetch again when URL changes', async () => {
			const { rerender } = render(
				<IntlProvider locale="en">
					<Provider client={mockClient}>
						<Card appearance="block" url={mockUrl} />
					</Provider>
				</IntlProvider>,
			);
			const resolvedCard = await screen.findByTestId('smart-block-resolved-view');
			const resolvedView = await screen.findByText('I love cheese');

			expect(resolvedCard).toBeTruthy();
			expect(resolvedView).toBeTruthy();
			expect(mockFetch).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledTimes(1);

			rerender(
				<IntlProvider locale="en">
					<Provider client={mockClient}>
						<Card appearance="block" url="https://google.com" />
					</Provider>
				</IntlProvider>,
			);

			expect(mockFetch).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledTimes(2);
		});

		it('should not fetch again when appearance changes', async () => {
			const { rerender } = render(
				<IntlProvider locale="en">
					<Provider client={mockClient}>
						<Card appearance="block" url={mockUrl} />
					</Provider>
				</IntlProvider>,
			);

			const resolvedCard = await screen.findByTestId('smart-block-resolved-view');
			const resolvedView = await screen.findByText('I love cheese');
			expect(resolvedCard).toBeTruthy();
			expect(resolvedView).toBeTruthy();
			expect(mockFetch).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledTimes(1);

			rerender(
				<IntlProvider locale="en">
					<Provider client={mockClient}>
						<Card appearance="block" url={mockUrl} />
					</Provider>
				</IntlProvider>,
			);
			expect(mockFetch).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe('> state: forbidden', () => {
		const getResponseWithAccessType = (accessType: string) => ({
			data: {
				...mocks.forbidden.data,
				generator: {
					'@type': 'Application',
					name: 'Google',
					icon: {
						'@type': 'Image',
						url: 'https://developers.google.com/drive/images/drive_icon.png',
					},
					image: 'https://links.atlassian.com/images/google_drive.svg',
				},
			},
			meta: {
				...mocks.forbidden.meta,
				requestAccess: {
					accessType: accessType,
				},
			},
		});

		describe('with auth services available', () => {
			it('flexible block card: renders the forbidden view if no access, with auth prompt', async () => {
				mockFetch.mockImplementationOnce(async () => mocks.forbidden);
				render(
					<Provider client={mockClient}>
						<Card appearance="block" url={mockUrl} onError={mockOnError} />
					</Provider>,
				);
				const frame = await screen.findByTestId('smart-block-forbidden-view');
				expect(frame).toBeTruthy();
				const forbiddenLink = await screen.findByText('Restricted content');
				expect(forbiddenLink).toBeTruthy();
				const forbiddenLinkButton = screen.getByRole('button');
				expect(forbiddenLinkButton).toBeTruthy();
				expect(forbiddenLinkButton).toHaveTextContent('Try another account');
				expect(mockFetch).toHaveBeenCalled();
				expect(mockFetch).toHaveBeenCalledTimes(1);
				expect(mockOnError).toHaveBeenCalledWith({
					url: mockUrl,
					status: 'forbidden',
				});
			});

			it('flexible block card: renders the forbidden view with "Direct Access" access type', async () => {
				mockFetch.mockImplementationOnce(async () => getResponseWithAccessType('DIRECT_ACCESS'));
				render(
					<Provider client={mockClient}>
						<Card appearance="block" url={mockUrl} onError={mockOnError} />
					</Provider>,
				);
				const frame = await screen.findByTestId('smart-block-forbidden-view');
				expect(frame).toBeTruthy();
				const forbiddenLink = await screen.findByText('Join Google to view this content');
				expect(forbiddenLink).toBeTruthy();

				const messageContainer = await screen.findByTestId('smart-element-text');
				expect(messageContainer).toHaveTextContent(
					'Your team uses Google to collaborate and you can start using it right away!',
				);

				const buttons = screen.getAllByRole('button');
				expect(buttons?.length).toBe(2);

				const forbiddenLinkButton = buttons[0];
				expect(forbiddenLinkButton).toBeTruthy();
				expect(forbiddenLinkButton).toHaveTextContent('Try another account');

				const joinButton = buttons[1];
				expect(joinButton).toBeTruthy();
				expect(joinButton!).toHaveTextContent('Join now');

				expect(mockFetch).toHaveBeenCalled();
				expect(mockFetch).toHaveBeenCalledTimes(1);
				expect(mockOnError).toHaveBeenCalledWith({
					url: mockUrl,
					status: 'forbidden',
				});
			});

			it('flexible block card: renders the forbidden view with "Request Access" access type', async () => {
				mockFetch.mockImplementationOnce(async () => getResponseWithAccessType('REQUEST_ACCESS'));
				render(
					<Provider client={mockClient}>
						<Card appearance="block" url={mockUrl} onError={mockOnError} />
					</Provider>,
				);
				const frame = await screen.findByTestId('smart-block-forbidden-view');
				expect(frame).toBeTruthy();
				const forbiddenLink = await screen.findByText('Join Google to view this content');
				expect(forbiddenLink).toBeTruthy();

				const messageContainer = await screen.findByTestId('smart-element-text');
				expect(messageContainer).toHaveTextContent(
					'Your team uses Google to collaborate. Send your admin a request for access.',
				);

				const buttons = screen.getAllByRole('button');
				expect(buttons?.length).toBe(2);

				const forbiddenLinkButton = buttons[0];
				expect(forbiddenLinkButton).toBeTruthy();
				expect(forbiddenLinkButton).toHaveTextContent('Try another account');

				const joinButton = buttons[1];
				expect(joinButton).toBeTruthy();
				expect(joinButton!).toHaveTextContent('Request access');

				expect(mockFetch).toHaveBeenCalled();
				expect(mockFetch).toHaveBeenCalledTimes(1);
				expect(mockOnError).toHaveBeenCalledWith({
					url: mockUrl,
					status: 'forbidden',
				});
			});

			it('flexible block card: renders the forbidden view with "Pending Request Exists" access type', async () => {
				mockFetch.mockImplementationOnce(async () =>
					getResponseWithAccessType('PENDING_REQUEST_EXISTS'),
				);
				render(
					<Provider client={mockClient}>
						<Card appearance="block" url={mockUrl} onError={mockOnError} />
					</Provider>,
				);
				const frame = await screen.findByTestId('smart-block-forbidden-view');
				expect(frame).toBeTruthy();
				const forbiddenLink = await screen.findByText('Access to Google is pending');
				expect(forbiddenLink).toBeTruthy();

				const messageContainer = await screen.findByTestId('smart-element-text');
				expect(messageContainer).toHaveTextContent(
					'Your request to access drive.google.com is awaiting admin approval.',
				);

				const forbiddenLinkButton = screen.getByText('Try another account');
				expect(forbiddenLinkButton).toBeTruthy();
				expect(forbiddenLinkButton).toHaveTextContent('Try another account');

				expect(mockFetch).toHaveBeenCalled();
				expect(mockFetch).toHaveBeenCalledTimes(1);
				expect(mockOnError).toHaveBeenCalledWith({
					url: mockUrl,
					status: 'forbidden',
				});
			});

			it('flexible block card: renders the forbidden view with "Forbidden" access type', async () => {
				mockFetch.mockImplementationOnce(async () => getResponseWithAccessType('FORBIDDEN'));
				render(
					<Provider client={mockClient}>
						<Card appearance="block" url={mockUrl} onError={mockOnError} />
					</Provider>,
				);
				const frame = await screen.findByTestId('smart-block-forbidden-view');
				expect(frame).toBeTruthy();
				const forbiddenLink = await screen.findByText("You don't have access to this content");
				expect(forbiddenLink).toBeTruthy();

				const messageContainer = await screen.findByTestId('smart-element-text');
				expect(messageContainer).toHaveTextContent(
					'Contact your admin to request access to drive.google.com.',
				);

				const forbiddenLinkButton = screen.getByRole('button');
				expect(forbiddenLinkButton).toBeTruthy();
				expect(forbiddenLinkButton).toHaveTextContent('Try another account');

				expect(mockFetch).toHaveBeenCalled();
				expect(mockFetch).toHaveBeenCalledTimes(1);
				expect(mockOnError).toHaveBeenCalledWith({
					url: mockUrl,
					status: 'forbidden',
				});
			});

			it('flexible block card: renders the forbidden view with "Denied Request Exists" access type', async () => {
				mockFetch.mockImplementationOnce(async () =>
					getResponseWithAccessType('DENIED_REQUEST_EXISTS'),
				);
				render(
					<Provider client={mockClient}>
						<Card appearance="block" url={mockUrl} onError={mockOnError} />
					</Provider>,
				);
				const frame = await screen.findByTestId('smart-block-forbidden-view');
				expect(frame).toBeTruthy();
				const forbiddenLink = await screen.findByText("You don't have access to this content");
				expect(forbiddenLink).toBeTruthy();

				const messageContainer = await screen.findByTestId('smart-element-text');
				expect(messageContainer).toHaveTextContent(
					"Your admin didn't approve your request to view Google pages from drive.google.com.",
				);

				const forbiddenLinkButton = screen.getByRole('button');
				expect(forbiddenLinkButton).toBeTruthy();
				expect(forbiddenLinkButton).toHaveTextContent('Try another account');

				expect(mockFetch).toHaveBeenCalled();
				expect(mockFetch).toHaveBeenCalledTimes(1);
				expect(mockOnError).toHaveBeenCalledWith({
					url: mockUrl,
					status: 'forbidden',
				});
			});
		});

		describe('with no auth services available', () => {
			it('flexible block card: renders the forbidden view if no access, no auth prompt', async () => {
				mocks.forbidden.meta.auth = [];
				mockFetch.mockImplementationOnce(async () => mocks.forbidden);
				render(
					<Provider client={mockClient}>
						<Card appearance="block" url={mockUrl} onError={mockOnError} />
					</Provider>,
				);
				const frame = await screen.findByTestId('smart-block-forbidden-view');
				expect(frame).toBeTruthy();
				const forbiddenLink = await screen.findByText('Restricted content');
				const forbiddenLinkButton = screen.queryByRole('button');
				expect(forbiddenLink).toBeTruthy();
				expect(forbiddenLinkButton).toBeFalsy();
				expect(mockFetch).toHaveBeenCalled();
				expect(mockFetch).toHaveBeenCalledTimes(1);
				expect(mockOnError).toHaveBeenCalledWith({
					url: mockUrl,
					status: 'forbidden',
				});
			});
		});
	});

	describe('> state: unauthorized', () => {
		it('renders correctly when provider details are not available', async () => {
			mockFetch.mockImplementationOnce(async () => mocks.unauthorized);
			render(
				<Provider client={mockClient}>
					<Card appearance="block" url={mockUrl} onError={mockOnError} />
				</Provider>,
			);
			const frame = await screen.findByTestId('smart-block-unauthorized-view');
			expect(frame).toBeTruthy();

			const unauthorizedLink = await screen.findByText(mockUrl);
			expect(unauthorizedLink).toBeTruthy();

			expect(mockFetch).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockOnError).toHaveBeenCalledWith({
				url: mockUrl,
				status: 'unauthorized',
			});

			const unauthorizedContent = screen.getByTestId('smart-block-unauthorized-view-content');
			expect(unauthorizedContent).toBeTruthy();
			expect(unauthorizedContent).toHaveTextContent(
				'Connect your account to collaborate on work across Atlassian products. Learn more about Smart Links.',
			);

			const providerImage = screen.queryByTestId('smart-block-card-footer-provider-image');
			expect(providerImage).toBeFalsy();

			const providerLabel = screen.queryByTestId('smart-block-card-footer-provider-label');
			expect(providerLabel).toBeFalsy();

			const connectButton = screen.getByTestId('smart-action-connect-account');
			expect(connectButton).toBeTruthy();
			expect(connectButton.innerHTML).not.toContain('Connect to');
			expect(connectButton.innerHTML).toContain('Connect');
		});

		it('renders with connect flow when auth services are available', async () => {
			const unauthorizedMockWithProviderDetails = {
				...mocks.unauthorized,
				data: {
					...mocks.unauthorized.data,
					generator: {
						'@type': 'Application',
						name: 'Google',
						icon: {
							'@type': 'Image',
							url: 'https://developers.google.com/drive/images/drive_icon.png',
						},
						image: 'https://links.atlassian.com/images/google_drive.svg',
					},
				},
			};
			mockFetch.mockImplementationOnce(async () => unauthorizedMockWithProviderDetails);
			render(
				<Provider client={mockClient}>
					<Card appearance="block" url={mockUrl} onError={mockOnError} />
				</Provider>,
			);
			const frame = await screen.findByTestId('smart-block-unauthorized-view');
			expect(frame).toBeTruthy();

			const unauthorizedLink = await screen.findByText(mockUrl);
			expect(unauthorizedLink).toBeTruthy();

			expect(mockFetch).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockOnError).toHaveBeenCalledWith({
				url: mockUrl,
				status: 'unauthorized',
			});

			const unauthorizedTitle = await screen.findByTestId('smart-block-title-errored-view');
			expect(unauthorizedTitle).toBeTruthy();

			// Title should only have the icon and the url
			expect(unauthorizedTitle.childElementCount).toEqual(4); // doubled likely to compiled css

			const imgTags = unauthorizedTitle.querySelectorAll('img');
			expect(imgTags).toBeTruthy();
			expect(imgTags.length).toEqual(1);
			expect(imgTags[0].getAttribute('src')).toEqual(
				'https://developers.google.com/drive/images/drive_icon.png',
			);

			expect(unauthorizedTitle.querySelectorAll('a')[0].innerHTML).toContain(
				'https://drive.google.com/drive/folders/test',
			);

			const unauthorizedContent = screen.getByTestId('smart-block-unauthorized-view-content');
			expect(unauthorizedContent).toBeTruthy();
			expect(unauthorizedContent).toHaveTextContent(
				'Connect your Google account to collaborate on work across Atlassian products. Learn more about Smart Links.',
			);

			const providerImage = screen.getByTestId('smart-block-card-footer-provider-image');
			expect(providerImage).toBeTruthy();
			expect(providerImage.getAttribute('src')).toEqual(
				'https://developers.google.com/drive/images/drive_icon.png',
			);

			const providerLabel = screen.getByTestId('smart-block-card-footer-provider-label');
			expect(providerLabel).toBeTruthy();
			expect(providerLabel.innerHTML).toContain('Google');
			const connectButton = screen.getByTestId('smart-action-connect-account');
			expect(connectButton).toBeTruthy();
			expect(connectButton.innerHTML).toContain('Connect to Google');
		});

		it('renders without connect flow when auth services are not available', async () => {
			mocks.unauthorized.meta.auth = [];
			mockFetch.mockImplementationOnce(async () => mocks.unauthorized);
			render(
				<Provider client={mockClient}>
					<Card appearance="block" url={mockUrl} onError={mockOnError} />
				</Provider>,
			);
			const frame = await screen.findByTestId('smart-block-unauthorized-view');
			expect(frame).toBeTruthy();
			const unauthorizedLink = await screen.findByText(mockUrl);
			const unauthorizedLinkButton = screen.queryByRole('button');
			expect(unauthorizedLink).toBeTruthy();
			expect(unauthorizedLinkButton).toBeFalsy();
			expect(mockFetch).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockOnError).toHaveBeenCalledWith({
				url: mockUrl,
				status: 'unauthorized',
			});
		});
	});

	describe('> state: error', () => {
		it('flexible block card: renders error card when resolve fails', async () => {
			mockFetch.mockImplementationOnce(() => Promise.reject(new Error('Something went wrong')));
			render(
				<Provider client={mockClient}>
					<Card appearance="block" url={mockUrl} onError={mockOnError} />
				</Provider>,
			);
			const frame = await screen.findByTestId('smart-block-errored-view');
			const link = await screen.findByText(mockUrl);

			expect(frame).toBeTruthy();
			expect(link).toBeTruthy();
			expect(mockFetch).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockOnError).toHaveBeenCalledWith({
				url: mockUrl,
				status: 'errored',
			});
		});

		it('flexible block card: renders not found card when link not found', async () => {
			mockFetch.mockImplementationOnce(async () => ({
				...mocks.notFound,
				data: {
					...mocks.notFound.data,
					generator: mockGenerator,
				},
			}));

			render(
				<Provider client={mockClient}>
					<Card appearance="block" url={mockUrl} onError={mockOnError} />
				</Provider>,
			);
			const frame = await screen.findByTestId('smart-block-not-found-view');
			expect(frame).toBeTruthy();
			const link = await screen.findByText("We can't show you this Jira page");
			expect(link).toBeTruthy();
			expect(mockFetch).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockOnError).toHaveBeenCalledWith({
				url: mockUrl,
				status: 'not_found',
			});
		});
	});

	describe('> state: invalid', () => {
		it('block: does not throw error when state is invalid', async () => {
			const storeOptions = {
				initialState: { [mockUrl]: {} },
			} as CardProviderStoreOpts;
			render(
				<Provider client={mockClient} storeOptions={storeOptions}>
					<Card appearance="block" url={mockUrl} />
				</Provider>,
			);

			const link = await screen.findByTestId('smart-block-resolved-view');
			expect(link).toBeTruthy();
		});
	});
});
