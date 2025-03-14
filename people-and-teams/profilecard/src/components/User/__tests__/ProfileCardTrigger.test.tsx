import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IntlProvider } from 'react-intl-next';

import { GiveKudosLauncherLazy } from '@atlaskit/give-kudos';
import { ffTest } from '@atlassian/feature-flags-test-utils';

import ProfileClient from '../../../client/ProfileCardClient';
import { getMockProfileClient } from '../../../mocks';
import { type ProfileCardTriggerProps } from '../../../types';
import { DELAY_MS_SHOW } from '../../../util/config';
import { ProfileCardLazy } from '../lazyProfileCard';
import ProfilecardTrigger from '../ProfileCardTrigger';

const mockClient = getMockProfileClient(ProfileClient, 0);

jest.mock('@atlaskit/analytics-next', () => ({
	useAnalyticsEvents: jest.fn(() => ({
		createAnalyticsEvent: jest.fn(() => ({ fire: jest.fn() })),
	})),
}));

jest.mock('@atlaskit/give-kudos', () => ({
	...jest.requireActual('@atlaskit/give-kudos'),
	GiveKudosLauncherLazy: jest.fn(),
}));

jest.mock('../../../util/analytics');

jest.mock('../lazyProfileCard', () => ({
	ProfileCardLazy: jest.fn(),
}));

const mockGiveKudosLauncherLazy = GiveKudosLauncherLazy as unknown as jest.Mock;
const mockProfileCardLazy = ProfileCardLazy as unknown as jest.Mock;

describe('Profile card trigger', () => {
	const mockTeamCentralBaseUrl = 'mock-team-central-base-url';

	const mockGiveKudosLauncherLazyText = 'MockGiveKudosLauncherLazy';
	const mockProfileCardLazyText = 'MockProfileCardLazy';
	const mockTriggerText = 'Trigger';

	const mockGetTeamCentralBaseUrl = jest.fn();
	const mockShouldShowGiveKudos = jest.fn();
	const mockResourceClient = {
		...mockClient,
		getTeamCentralBaseUrl: mockGetTeamCentralBaseUrl,
		shouldShowGiveKudos: mockShouldShowGiveKudos,
	};
	const mockDefaultProps = {
		cloudId: 'cloud-id',
		userId: 'user-id',
		resourceClient: mockResourceClient,
	};

	beforeEach(() => {
		jest.clearAllMocks();

		mockGiveKudosLauncherLazy.mockImplementation(() => <div>{mockGiveKudosLauncherLazyText}</div>);
		mockProfileCardLazy.mockImplementation(() => <div>{mockProfileCardLazyText}</div>);

		mockGetTeamCentralBaseUrl.mockResolvedValue(mockTeamCentralBaseUrl);
		mockShouldShowGiveKudos.mockResolvedValue(true);
	});

	const renderProfileCardTrigger = (props: Partial<ProfileCardTriggerProps>) => {
		return render(
			<IntlProvider locale="en">
				<ProfilecardTrigger {...mockDefaultProps} {...props}>
					<div>{mockTriggerText}</div>
				</ProfilecardTrigger>
			</IntlProvider>,
		);
	};

	it('should capture and report a11y violations', async () => {
		const { container } = renderProfileCardTrigger({});
		await expect(container).toBeAccessible();
	});

	it('renders the trigger', async () => {
		renderProfileCardTrigger({});

		expect(await screen.findByText(mockTriggerText)).toBeVisible();
	});

	describe('popup', () => {
		const userForFakeTimers = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

		beforeEach(() => {
			jest.useFakeTimers();
		});

		afterEach(() => {
			jest.useRealTimers();
		});

		it('renders the popup after a delay on trigger hover', async () => {
			renderProfileCardTrigger({});

			expect(screen.queryByText(mockProfileCardLazyText)).toBeNull();

			// hover the trigger
			// timer started, so popup should not appear yet
			await userForFakeTimers.hover(screen.getByText(mockTriggerText));
			await waitFor(() => {
				expect(screen.queryByText(mockProfileCardLazyText)).toBeNull();
			});

			// timer not quite there, so popup should not appear yet
			jest.advanceTimersByTime(DELAY_MS_SHOW - 1);

			await waitFor(() => {
				expect(screen.queryByText(mockProfileCardLazyText)).toBeNull();
			});

			// now the popup should appear
			jest.advanceTimersByTime(1);
			await waitFor(() => {
				expect(screen.queryByText(mockProfileCardLazyText)).toBeVisible();
			});
		});

		it('renders the popup immediately on trigger click', async () => {
			renderProfileCardTrigger({ trigger: 'click' });

			await waitFor(() => {
				expect(screen.queryByText(mockProfileCardLazyText)).toBeNull();
			});

			// click the trigger
			await userForFakeTimers.click(screen.getByText(mockTriggerText));

			// popup should appear immediately, (there is still a setTimeout, after 0ms)
			jest.advanceTimersByTime(1);
			await waitFor(() => {
				expect(screen.queryByText(mockProfileCardLazyText)).toBeVisible();
			});
		});

		ffTest.on('fix_profilecard_trigger_isvisible', 'isVisible fixed', () => {
			it('renders the popup based on isVisible prop', async () => {
				const { rerender } = renderProfileCardTrigger({ isVisible: true });

				// popup should appear immediately, (there is still a setTimeout, after 0ms)
				jest.advanceTimersByTime(1);
				await waitFor(() => {
					expect(screen.queryByText(mockProfileCardLazyText)).toBeVisible();
				});

				rerender(
					<IntlProvider locale="en">
						<ProfilecardTrigger {...mockDefaultProps} isVisible={false}>
							<div>{mockTriggerText}</div>
						</ProfilecardTrigger>
					</IntlProvider>,
				);

				await waitFor(() => {
					expect(screen.queryByText(mockProfileCardLazyText)).toBeNull();
				});
			});
		});
	});

	it('renders with valid team central values', async () => {
		const mockGetProfile = jest.fn();
		const mockGetReportingLines = jest.fn();

		renderProfileCardTrigger({
			resourceClient: {
				...mockResourceClient,
				getProfile: mockGetProfile,
				getReportingLines: mockGetReportingLines,
			},
			trigger: 'click',
		});

		// click the trigger
		await userEvent.click(await screen.findByText(mockTriggerText));

		expect(await screen.findByText(mockGiveKudosLauncherLazyText)).toBeInTheDocument();

		expect(mockGetTeamCentralBaseUrl).toHaveBeenCalledTimes(1);
		expect(mockGetTeamCentralBaseUrl).toHaveBeenCalledWith({
			withOrgContext: true,
			withSiteContext: true,
		});
		expect(mockGiveKudosLauncherLazy).toHaveBeenCalledTimes(1);
		expect(mockGiveKudosLauncherLazy.mock.calls[0][0].teamCentralBaseUrl).toBe(
			mockTeamCentralBaseUrl,
		);
		expect(mockProfileCardLazy).toHaveBeenCalled();
		mockProfileCardLazy.mock.calls.forEach((call) => {
			const relevantCallArgs = call[0];
			expect(
				(relevantCallArgs.isKudosEnabled === false &&
					relevantCallArgs.teamCentralBaseUrl === undefined) ||
					relevantCallArgs.teamCentralBaseUrl !== undefined,
			).toBe(true);
		});
	});

	it('renders tabIndex 0 when ariaHideProfileTrigger is not set', async () => {
		renderProfileCardTrigger({
			prepopulatedData: { fullName: 'Tester' },
		});

		const profileTriggerButton = await screen.findByRole('button', {
			name: 'More information about Tester',
		});

		expect(profileTriggerButton).toHaveAttribute('tabIndex', '0');
		expect(profileTriggerButton).not.toHaveAttribute('aria-hidden');
		expect(profileTriggerButton).toHaveAttribute('aria-label');
	});

	it('renders tabIndex 0 when ariaHideProfileTrigger is false', async () => {
		renderProfileCardTrigger({
			prepopulatedData: { fullName: 'Tester' },
			ariaHideProfileTrigger: false,
		});
		const profileTriggerButton = await screen.findByRole('button', {
			name: 'More information about Tester',
		});

		expect(profileTriggerButton).toHaveAttribute('tabIndex', '0');
		expect(profileTriggerButton).not.toHaveAttribute('aria-hidden');
		expect(profileTriggerButton).toHaveAttribute('aria-label');
	});

	it('renders tabIndex -1 when ariaHideProfileTrigger is true', async () => {
		renderProfileCardTrigger({
			prepopulatedData: { fullName: 'Tester' },
			ariaHideProfileTrigger: true,
			testId: 'profile-card-testid',
		});
		const profileTriggerButton = await screen.findByTestId('profile-card-testid');

		expect(profileTriggerButton).toHaveAttribute('tabIndex', '-1');
		expect(profileTriggerButton).toHaveAttribute('aria-hidden', 'true');
		expect(profileTriggerButton).not.toHaveAttribute('aria-label');
		expect(profileTriggerButton).not.toHaveAttribute('aria-labelledby');
	});
});
