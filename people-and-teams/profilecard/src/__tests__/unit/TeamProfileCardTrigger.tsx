import React from 'react';

import { act, createEvent, fireEvent, render } from '@testing-library/react';
import { createIntl, createIntlCache, IntlProvider } from 'react-intl-next';

import { getMockTeamClient } from '../../../examples/helper/util';
import ProfileClient from '../../client/ProfileCardClient';
import { TeamProfileCardTriggerInternal as TeamProfileCardTrigger } from '../../components/Team/TeamProfileCardTrigger';
import {
	cardTriggered,
	fireEvent as fireAnalyticsEvent,
	teamRequestAnalytics,
} from '../../util/analytics';

import { createAnalyticsEvent, flexiTime } from './helper/_mock-analytics';

jest.mock('../../util/analytics', () => {
	return {
		...(jest.requireActual('../../util/analytics') as object),
		fireEvent: jest.fn(),
	};
});

const cache = createIntlCache();
const intl = createIntl(
	{
		locale: 'en',
		messages: {},
	},
	cache,
);

const defaultProps = {
	createAnalyticsEvent,
	viewProfileLink: 'http://example.com/team/123',
	teamId: '123',
	orgId: 'DUMMY-ORG-ID',
};

const renderWithIntl = (component: React.ReactNode) => {
	return render(
		<IntlProvider locale="en" defaultLocale="en-US">
			{component}
		</IntlProvider>,
	);
};

const sampleProfile = {
	id: '123',
	displayName: 'The cool cats',
	description: 'A team',
	members: [],
};

const sampleAgent = {
	id: 'agentId',
	name: 'Profile card agent',
	description: 'this is a agent to use in profile card',
	favourite: true,
	favourite_count: 1234,

	named_id: '',
	creator_type: 'CUSTOMER',
	is_default: false,
	actor_type: 'AGENT',
	user_defined_conversation_starters: [],
	deactivated: false,
};

const mockResourceClient: unknown = {
	getTeamProfile: () => {
		return Promise.resolve(sampleProfile);
	},
	shouldShowGiveKudos: () => {
		return Promise.resolve(false);
	},
	getTeamCentralBaseUrl: () => {
		return 'http://dummy-url';
	},
	getRovoAgentProfile: () => {
		return Promise.resolve(sampleAgent);
	},
};

describe('TeamProfileCardTrigger', () => {
	describe('Open and close conditions', () => {
		beforeEach(() => {
			jest.clearAllMocks();
			createAnalyticsEvent.mockClear();
			jest.useFakeTimers();
		});

		it('should open "click" trigger after click', () => {
			const { getByTestId, queryByTestId } = renderWithIntl(
				<>
					<TeamProfileCardTrigger
						{...defaultProps}
						resourceClient={mockResourceClient as ProfileClient}
						trigger="click"
						intl={intl}
					>
						<span data-testid="test-inner-trigger">This is the trigger</span>
					</TeamProfileCardTrigger>
					<span data-testid="outer-content">Hello</span>
				</>,
			);

			expect(queryByTestId('team-profilecard')).toBe(null);

			expect(getByTestId('test-inner-trigger')).toBeDefined();
			expect(getByTestId('team-profilecard-trigger-wrapper')).toBeDefined();

			act(() => {
				fireEvent.click(getByTestId('team-profilecard-trigger-wrapper'));
				jest.runAllTimers();
			});

			expect(fireAnalyticsEvent).toHaveBeenCalledWith(
				expect.any(Function),
				flexiTime(cardTriggered('team', 'click', defaultProps.teamId)),
			);

			expect(getByTestId('team-profilecard')).toBeDefined();

			act(() => {
				fireEvent.click(getByTestId('outer-content'));
				jest.runAllTimers();
			});

			expect(queryByTestId('team-profilecard')).toBe(null);
		});

		it('should open "click" trigger after click (with kudos)', async () => {
			const resourceClient: unknown = {
				...(mockResourceClient as object),
				shouldShowGiveKudos: () => {
					return Promise.resolve(true);
				},
			};

			jest.useFakeTimers();

			const { findByText, getByTestId } = renderWithIntl(
				<TeamProfileCardTrigger
					{...defaultProps}
					resourceClient={resourceClient as ProfileClient}
					trigger="click"
					intl={intl}
				>
					<span data-testid="test-inner-trigger">This is the trigger</span>
				</TeamProfileCardTrigger>,
			);

			act(() => {
				fireEvent.click(getByTestId('team-profilecard-trigger-wrapper'));
				jest.runAllTimers();
			});

			expect(await findByText('Give kudos')).toBeDefined();
		});

		it('should open "hover" trigger after mouse over', () => {
			const { getByTestId, queryByTestId } = renderWithIntl(
				<TeamProfileCardTrigger
					{...defaultProps}
					resourceClient={mockResourceClient as ProfileClient}
					trigger="hover"
					intl={intl}
				>
					<span data-testid="test-inner-trigger">This is the trigger</span>
				</TeamProfileCardTrigger>,
			);

			expect(queryByTestId('team-profilecard')).toBe(null);

			expect(getByTestId('test-inner-trigger')).toBeDefined();
			expect(getByTestId('team-profilecard-trigger-wrapper')).toBeDefined();

			act(() => {
				fireEvent.mouseOver(getByTestId('team-profilecard-trigger-wrapper'));
				jest.runAllTimers();
			});

			expect(fireAnalyticsEvent).toHaveBeenCalledWith(
				expect.any(Function),
				flexiTime(cardTriggered('team', 'hover', defaultProps.teamId)),
			);

			expect(getByTestId('team-profilecard')).toBeDefined();

			act(() => {
				fireEvent.mouseLeave(getByTestId('team-profilecard-trigger-wrapper'));
				jest.runAllTimers();
			});

			expect(queryByTestId('team-profilecard')).toBe(null);
		});

		it('should open "hover-click" trigger after click', () => {
			const { getByTestId, queryByTestId } = renderWithIntl(
				<>
					<TeamProfileCardTrigger
						{...defaultProps}
						resourceClient={mockResourceClient as ProfileClient}
						trigger="hover-click"
						intl={intl}
					>
						<span data-testid="test-inner-trigger">This is the trigger</span>
					</TeamProfileCardTrigger>
					<span data-testid="outer-content">Hello</span>
				</>,
			);

			expect(queryByTestId('team-profilecard')).toBe(null);

			expect(getByTestId('test-inner-trigger')).toBeDefined();
			expect(getByTestId('team-profilecard-trigger-wrapper')).toBeDefined();

			act(() => {
				fireEvent.click(getByTestId('team-profilecard-trigger-wrapper'));
				jest.runAllTimers();
			});

			expect(getByTestId('team-profilecard')).toBeDefined();

			act(() => {
				fireEvent.click(getByTestId('outer-content'));
				jest.runAllTimers();
			});

			expect(queryByTestId('team-profilecard')).toBe(null);
		});

		it('should open "hover-click" trigger after mouse over', () => {
			const { getByTestId, queryByTestId } = renderWithIntl(
				<TeamProfileCardTrigger
					{...defaultProps}
					resourceClient={mockResourceClient as ProfileClient}
					trigger="hover-click"
					intl={intl}
				>
					<span data-testid="test-inner-trigger">This is the trigger</span>
				</TeamProfileCardTrigger>,
			);

			expect(queryByTestId('team-profilecard')).toBe(null);

			expect(getByTestId('test-inner-trigger')).toBeDefined();
			expect(getByTestId('team-profilecard-trigger-wrapper')).toBeDefined();

			act(() => {
				fireEvent.mouseOver(getByTestId('team-profilecard-trigger-wrapper'));
				jest.runAllTimers();
			});

			expect(getByTestId('team-profilecard')).toBeDefined();

			act(() => {
				fireEvent.mouseLeave(getByTestId('team-profilecard-trigger-wrapper'));
				jest.runAllTimers();
			});

			expect(queryByTestId('team-profilecard')).toBe(null);
		});
	});

	describe('Trigger wrapping', () => {
		describe('Link type trigger click behaviour', () => {
			const setupClickTest = () => {
				const viewProfileOnClick = jest.fn();

				const { getByTestId } = renderWithIntl(
					<TeamProfileCardTrigger
						{...defaultProps}
						resourceClient={mockResourceClient as ProfileClient}
						triggerLinkType="link"
						trigger="hover-click"
						viewProfileOnClick={viewProfileOnClick}
						intl={intl}
					>
						<span data-testid="test-inner-trigger">This is the trigger</span>
					</TeamProfileCardTrigger>,
				);

				const trigger = getByTestId('team-profilecard-trigger-wrapper');

				return { trigger };
			};

			it('should preventDefault on basic click', () => {
				const { trigger } = setupClickTest();

				const basicClick = createEvent.click(trigger);
				basicClick.preventDefault = jest.fn();

				act(() => {
					fireEvent(trigger, basicClick);
				});

				expect(basicClick.preventDefault).toHaveBeenCalledTimes(1);
			});

			it('should not preventDefault on cmd+click', () => {
				const { trigger } = setupClickTest();

				const cmdClick = createEvent.click(trigger, { metaKey: true });
				cmdClick.preventDefault = jest.fn();

				act(() => {
					fireEvent(trigger, cmdClick);
				});

				expect(cmdClick.preventDefault).not.toHaveBeenCalled();
			});

			it('should not preventDefault on alt+click', () => {
				const { trigger } = setupClickTest();

				const altClick = createEvent.click(trigger, { altKey: true });
				altClick.preventDefault = jest.fn();

				act(() => {
					fireEvent(trigger, altClick);
				});

				expect(altClick.preventDefault).not.toHaveBeenCalled();
			});

			it('should not preventDefault on ctrl+click', () => {
				const { trigger } = setupClickTest();

				const ctrlClick = createEvent.click(trigger, { ctrlKey: true });
				ctrlClick.preventDefault = jest.fn();

				act(() => {
					fireEvent(trigger, ctrlClick);
				});

				expect(ctrlClick.preventDefault).not.toHaveBeenCalled();
			});

			it('should not preventDefault on shift+click', () => {
				const { trigger } = setupClickTest();

				const shiftClick = createEvent.click(trigger, { shiftKey: true });
				shiftClick.preventDefault = jest.fn();

				act(() => {
					fireEvent(trigger, shiftClick);
				});

				expect(shiftClick.preventDefault).not.toHaveBeenCalled();
			});
		});

		it('should wrap in an anchor tag for link type triggers', () => {
			const viewProfileOnClick = jest.fn();

			const { getByTestId } = renderWithIntl(
				<TeamProfileCardTrigger
					{...defaultProps}
					resourceClient={mockResourceClient as ProfileClient}
					triggerLinkType="link"
					trigger="hover-click"
					viewProfileOnClick={viewProfileOnClick}
					intl={intl}
				>
					<span data-testid="test-inner-trigger">This is the trigger</span>
				</TeamProfileCardTrigger>,
			);

			const trigger = getByTestId('team-profilecard-trigger-wrapper');

			expect(trigger.nodeName).toBe('A');

			expect(getByTestId('test-inner-trigger').parentElement).toBe(trigger);

			act(() => {
				fireEvent.click(trigger);
			});

			expect(viewProfileOnClick).not.toHaveBeenCalled();
		});

		it('should wrap in an anchor tag for none type triggers', () => {
			const { getByTestId } = renderWithIntl(
				<TeamProfileCardTrigger
					{...defaultProps}
					resourceClient={mockResourceClient as ProfileClient}
					triggerLinkType="none"
					trigger="hover-click"
					intl={intl}
				>
					<span data-testid="test-inner-trigger">This is the trigger</span>
				</TeamProfileCardTrigger>,
			);

			const trigger = getByTestId('team-profilecard-trigger-wrapper');

			expect(trigger.nodeName).toBe('SPAN');

			expect(getByTestId('test-inner-trigger').parentElement).toBe(trigger);
		});

		it('should wrap in an anchor tag for clickable link type triggers', () => {
			const viewProfileOnClick = jest.fn();

			const { getByTestId } = renderWithIntl(
				<TeamProfileCardTrigger
					{...defaultProps}
					resourceClient={mockResourceClient as ProfileClient}
					triggerLinkType="clickable-link"
					trigger="hover-click"
					viewProfileOnClick={viewProfileOnClick}
					intl={intl}
				>
					<span data-testid="test-inner-trigger">This is the trigger</span>
				</TeamProfileCardTrigger>,
			);

			const trigger = getByTestId('team-profilecard-trigger-wrapper');

			expect(trigger.nodeName).toBe('A');

			expect(getByTestId('test-inner-trigger').parentElement).toBe(trigger);

			act(() => {
				fireEvent.click(trigger);
			});

			expect(viewProfileOnClick).toHaveBeenCalled();
		});
	});

	describe('Error handling', () => {
		it('should show error when resource client throws', async () => {
			const getTeamProfile = jest.fn();
			const resourceClient: unknown = {
				...(mockResourceClient as object),
				getTeamProfile,
			};

			jest.useFakeTimers();

			const { findByTestId, getByTestId } = renderWithIntl(
				<TeamProfileCardTrigger
					{...defaultProps}
					resourceClient={resourceClient as ProfileClient}
					trigger="click"
					intl={intl}
				>
					<span data-testid="test-inner-trigger">This is the trigger</span>
				</TeamProfileCardTrigger>,
			);

			getTeamProfile.mockImplementationOnce(() => {
				return Promise.reject('Error');
			});

			act(() => {
				fireEvent.click(getByTestId('team-profilecard-trigger-wrapper'));
				jest.runAllTimers();
			});

			expect(getByTestId('team-profilecard')).toBeDefined();
			const errorSection = await findByTestId('team-profilecard-error');
			expect(errorSection).toBeDefined();
		});

		it('should re-fetch when clicking refresh button', async () => {
			const getTeamProfile = jest.fn();
			const resourceClient: unknown = {
				...(mockResourceClient as object),
				getTeamProfile,
			};

			jest.useFakeTimers();

			const { findByTestId, findByText, getByTestId, getByText } = renderWithIntl(
				<TeamProfileCardTrigger
					{...defaultProps}
					resourceClient={resourceClient as ProfileClient}
					trigger="click"
					intl={intl}
				>
					<span data-testid="test-inner-trigger">This is the trigger</span>
				</TeamProfileCardTrigger>,
			);

			getTeamProfile.mockImplementationOnce(() => {
				return Promise.reject('Error');
			});

			act(() => {
				fireEvent.click(getByTestId('team-profilecard-trigger-wrapper'));
				jest.runAllTimers();
			});

			expect(getByTestId('team-profilecard')).toBeDefined();
			const errorSection = await findByTestId('team-profilecard-error');
			expect(errorSection).toBeDefined();

			expect(getTeamProfile).toHaveBeenCalledTimes(1);

			getTeamProfile.mockImplementationOnce(() => {
				return Promise.resolve(sampleProfile);
			});

			const refreshButton = getByText('Try again');

			expect(refreshButton).not.toBe(null);

			act(() => {
				fireEvent.click(refreshButton!);
				jest.runAllTimers();
			});

			expect(await findByText(sampleProfile.displayName)).toBeDefined();
			expect(getTeamProfile).toHaveBeenCalledTimes(2);
		});
	});

	describe('Profile client analytics', () => {
		beforeEach(() => {
			createAnalyticsEvent.mockClear();
			jest.useFakeTimers();
		});

		it('Request success analytics', async () => {
			const MockTeamClient = getMockTeamClient({
				team: sampleProfile,
				timeout: 0,
				error: undefined,
				errorRate: 0,
				traceId: '123',
			});

			const clientArgs = {
				cacheSize: 10,
				cacheMaxAge: 0,
				url: 'DUMMY',
			};

			const profileClient = new ProfileClient(clientArgs, {
				teamClient: new MockTeamClient(clientArgs),
			});

			const { getByTestId } = renderWithIntl(
				<TeamProfileCardTrigger
					{...defaultProps}
					resourceClient={profileClient}
					trigger="click"
					intl={intl}
				>
					<span data-testid="test-inner-trigger">This is the trigger</span>
				</TeamProfileCardTrigger>,
			);

			act(() => {
				fireEvent.click(getByTestId('team-profilecard-trigger-wrapper'));
				jest.runAllTimers();
			});

			await new Promise(setImmediate);

			expect(fireAnalyticsEvent).toHaveBeenCalledWith(
				expect.any(Function),
				flexiTime(teamRequestAnalytics('triggered')),
			);

			expect(fireAnalyticsEvent).toHaveBeenCalledWith(
				expect.any(Function),
				flexiTime(
					teamRequestAnalytics('succeeded', {
						duration: expect.anything(),
						gateway: true,
					}),
				),
			);
		});

		it('Request failure analytics', async () => {
			const error = [
				{
					message: 'Bad request',
					extensions: {
						statusCode: 400,
						errorType: 'UNDERLYING_SERVICE',
					},
				},
			];
			const MockTeamClient = getMockTeamClient({
				team: sampleProfile,
				timeout: 0,
				error,
				errorRate: 1,
				traceId: '123',
			});

			const clientArgs = {
				cacheSize: 10,
				cacheMaxAge: 0,
				url: 'DUMMY',
			};

			const profileClient = new ProfileClient(clientArgs, {
				teamClient: new MockTeamClient(clientArgs),
			});

			const { getByTestId } = renderWithIntl(
				<TeamProfileCardTrigger
					{...defaultProps}
					resourceClient={profileClient}
					trigger="click"
					intl={intl}
				>
					<span data-testid="test-inner-trigger">This is the trigger</span>
				</TeamProfileCardTrigger>,
			);

			act(() => {
				fireEvent.click(getByTestId('team-profilecard-trigger-wrapper'));
				jest.runAllTimers();
			});

			await new Promise(setImmediate);

			expect(fireAnalyticsEvent).toHaveBeenCalledWith(
				expect.any(Function),
				flexiTime(teamRequestAnalytics('triggered')),
			);

			expect(fireAnalyticsEvent).toHaveBeenCalledWith(
				expect.any(Function),
				flexiTime(
					teamRequestAnalytics('failed', {
						duration: expect.anything(),
						errorCount: 1,
						errorMessage: 'AGGErrors',
						errorDetails: [
							{
								errorMessage: 'Bad request',
								errorType: 'UNDERLYING_SERVICE',
								errorStatusCode: 400,
								isSLOFailure: true,
							},
						],
						gateway: true,
						isSLOFailure: true,
						traceId: '123',
					}),
				),
			);
		});
	});
});
