import React from 'react';

import { act, fireEvent, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import TeamProfileCard from '../../../src/components/TeamProfileCard';

const defaultProps = {
  viewProfileLink: 'http://example.com/team/123',
};

const renderWithIntl = (component: React.ReactNode) => {
  return render(<IntlProvider locale="en">{component}</IntlProvider>);
};

// Returns an integer x such that min <= x < max
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

describe('TeamProfileCard', () => {
  it('should render spinner when isLoading is true', () => {
    const { getByTestId } = renderWithIntl(
      <TeamProfileCard isLoading {...defaultProps} />,
    );

    const spinner = getByTestId('team-profilecard-spinner');

    expect(spinner).toBeDefined();
  });

  it('should render error content when hasError is true', () => {
    const { getByTestId } = renderWithIntl(
      <TeamProfileCard hasError {...defaultProps} />,
    );

    const errorView = getByTestId('team-profilecard-error');

    expect(errorView).toBeDefined();
  });

  it('should call clientFetchProfile when re-fetch button is clicked', () => {
    const clientFetchProfile = jest.fn();
    const { getByTestId } = renderWithIntl(
      <TeamProfileCard
        hasError
        {...defaultProps}
        clientFetchProfile={clientFetchProfile}
      />,
    );

    act(() => {
      fireEvent.click(getByTestId('client-fetch-profile-button'));
    });

    expect(clientFetchProfile).toHaveBeenCalledTimes(1);
  });

  describe('Action buttons', () => {
    describe('View profile button', () => {
      it('should call viewProfileOnClick on click if provided', () => {
        const onClick = jest.fn();
        const { getByText } = renderWithIntl(
          <TeamProfileCard
            {...defaultProps}
            team={{
              id: '123',
              displayName: 'Team name',
              description: 'A team',
            }}
            viewProfileOnClick={onClick}
          />,
        );

        const button = getByText('View profile');

        act(() => {
          fireEvent.click(button);
        });

        expect(onClick).toHaveBeenCalledTimes(1);
      });

      it('should have appropriate href', () => {
        const link = 'http://example.com/team/abcd';
        const { getByText } = renderWithIntl(
          <TeamProfileCard
            team={{
              id: '123',
              displayName: 'Team name',
              description: 'A team',
            }}
            viewProfileLink={link}
          />,
        );

        expect(getByText('View profile').closest('a')).toHaveAttribute(
          'href',
          link,
        );
      });
    });
    it('should not display more button if no actions provided', () => {
      const { getByText, queryByTestId } = renderWithIntl(
        <TeamProfileCard
          {...defaultProps}
          team={{
            id: '123',
            displayName: 'Team name',
            description: 'A team',
          }}
        />,
      );

      expect(queryByTestId('more-actions-button')).toBe(null);

      expect(getByText('View profile')).toBeDefined();
    });

    it('should not display more button if one action is provided', () => {
      const callback = jest.fn();
      const { getByText, queryByTestId } = renderWithIntl(
        <TeamProfileCard
          {...defaultProps}
          team={{
            id: '123',
            displayName: 'Team name',
            description: 'A team',
          }}
          actions={[{ label: 'Extra button', callback }]}
        />,
      );

      expect(queryByTestId('more-actions-button')).toBe(null);

      const actionButton = getByText('Extra button');

      expect(getByText('View profile')).toBeDefined();
      expect(actionButton).toBeDefined();

      act(() => {
        fireEvent.click(actionButton);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should open dropdown when more button clicked', () => {
      const firstCallback = jest.fn();
      const secondCallback = jest.fn();
      const { getByTestId, getByText, queryByText } = renderWithIntl(
        <TeamProfileCard
          {...defaultProps}
          team={{
            id: '123',
            displayName: 'Team name',
            description: 'A team',
          }}
          actions={[
            {
              label: 'First extra',
              callback: firstCallback,
            },
            {
              label: 'Second extra',
              callback: secondCallback,
            },
          ]}
        />,
      );

      const moreButton = getByTestId('more-actions-button');

      expect(getByText('View profile')).toBeDefined();
      expect(moreButton).toBeDefined();

      expect(getByText('First extra')).toBeDefined();

      expect(queryByText('Second extra')).toBe(null);

      act(() => {
        fireEvent.click(moreButton);
      });

      expect(getByText('First extra')).toBeDefined();

      expect(getByText('Second extra')).toBeDefined();

      act(() => {
        fireEvent.click(getByText('Second extra'));
      });

      expect(firstCallback).toHaveBeenCalledTimes(0);
      expect(secondCallback).toHaveBeenCalledTimes(1);

      act(() => {
        fireEvent.click(getByText('First extra'));
      });

      expect(firstCallback).toHaveBeenCalledTimes(1);
      expect(secondCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Member count', () => {
    const generateMembers = (n: number) => {
      const members = [];
      while (n-- > 0) {
        members.push({
          id: Math.random().toString(),
          fullName: Math.random().toString(),
          avatarUrl: '',
        });
      }

      return members;
    };

    it('should include the "Team" label', () => {
      const numMembers = Math.floor(randInt(0, 100));
      const { getByText } = renderWithIntl(
        <TeamProfileCard
          {...defaultProps}
          team={{
            id: '123',
            displayName: 'Some people group',
            description: 'This is a description',
            members: generateMembers(numMembers),
          }}
        />,
      );

      // The component with the member count must start with "Team"
      expect(getByText(/^Team .* members?$/)).toBeDefined();
    });

    it('should show 0 member team', () => {
      const { getByText } = renderWithIntl(
        <TeamProfileCard
          {...defaultProps}
          team={{
            id: '123',
            displayName: 'Team name',
            description: 'A team',
            members: [],
          }}
        />,
      );

      expect(getByText('0 members', { exact: false })).toBeDefined();
    });

    it('should show number of members for number <50', () => {
      const numMembers = randInt(1, 50);
      const { getByText } = renderWithIntl(
        <TeamProfileCard
          {...defaultProps}
          team={{
            id: '123',
            displayName: 'Team name',
            description: 'A team',
            members: generateMembers(numMembers),
          }}
        />,
      );

      // Must be "member" not "members" to account for "1 member"
      expect(getByText(new RegExp(`${numMembers} members?`))).toBeDefined();
    });

    it('should show estimate for teams with >50 members', () => {
      const numMembers = randInt(50, 150);
      const { getByText } = renderWithIntl(
        <TeamProfileCard
          {...defaultProps}
          team={{
            id: '123',
            displayName: 'Team name',
            description: 'A team',
            members: generateMembers(numMembers),
          }}
        />,
      );

      // Must be "member" not "members" to account for "1 member"
      expect(getByText('50+ members', { exact: false })).toBeDefined();
    });

    it('should show member count including you for teams with <50 members', () => {
      const numMembers = randInt(1, 50);
      const members = generateMembers(numMembers);

      const { getByText } = renderWithIntl(
        <TeamProfileCard
          {...defaultProps}
          team={{
            id: '123',
            displayName: 'Team name',
            description: 'A team',
            members,
          }}
          viewingUserId={members[randInt(0, numMembers)].id}
        />,
      );

      // Must be "member" not "members" to account for "1 member"
      expect(
        getByText(new RegExp(`${numMembers} members?, including you`)),
      ).toBeDefined();
    });

    it('should show estimate including you for teams with >50 members', () => {
      const numMembers = randInt(50, 150);
      const members = generateMembers(numMembers);
      const { getByText } = renderWithIntl(
        <TeamProfileCard
          {...defaultProps}
          team={{
            id: '123',
            displayName: 'Team name',
            description: 'A team',
            members,
          }}
          viewingUserId={members[randInt(0, numMembers)].id}
        />,
      );

      // Must be "member" not "members" to account for "1 member"
      expect(
        getByText('50+ members, including you', { exact: false }),
      ).toBeDefined();
    });
  });
});