import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useIntl } from 'react-intl-next';

import {
  AnalyticsEventPayload,
  useAnalyticsEvents,
} from '@atlaskit/analytics-next';
import { GiveKudosLauncherLazy, KudosType } from '@atlaskit/give-kudos';
import Popup from '@atlaskit/popup';
import { layers } from '@atlaskit/theme/constants';

import filterActionsInner from '../../internal/filterActions';
import getLabelMessage from '../../internal/getLabelMessage';
import { CardWrapper } from '../../styled/Card';
import {
  ProfileCardAction,
  ProfileCardClientData,
  ProfilecardProps,
  ProfileCardTriggerProps,
  TeamCentralReportingLinesData,
} from '../../types';
import { cardTriggered, fireEvent } from '../../util/analytics';
import { DELAY_MS_HIDE, DELAY_MS_SHOW } from '../../util/config';

import { ProfileCardLazy } from './lazyProfileCard';
import UserLoadingState from './UserLoadingState';

export default function ProfilecardTriggerNext({
  trigger = 'hover',
  userId,
  cloudId,
  resourceClient,
  actions = [],
  position = 'bottom-start',
  children,
  testId,
  addFlag,
  onReportingLinesClick,
  ariaLabel,
  ariaLabelledBy,
  prepopulatedData,
}: ProfileCardTriggerProps) {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const { formatMessage } = useIntl();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const showDelay = trigger === 'click' ? 0 : DELAY_MS_SHOW;
  const hideDelay = trigger === 'click' ? 0 : DELAY_MS_HIDE;

  const [showTimer, setShowTimer] = useState<number>(0);
  const [hideTimer, setHideTimer] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<ProfileCardClientData | null>(null);
  const [reportingLinesData, setReportingLinesData] = useState<
    TeamCentralReportingLinesData | undefined
  >(undefined);
  const [shouldShowGiveKudos, setShouldShowGiveKudos] = useState(false);
  const [teamCentralBaseUrl, setTeamCentralBaseUrl] = useState<
    string | undefined
  >(undefined);
  const [kudosDrawerOpen, setKudosDrawerOpen] = useState(false);
  const [isTriggeredUsingKeyboard, setTriggeredUsingKeyboard] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Reset state when the userId changes
    setIsLoading(undefined);
    setHasError(false);
    setError(null);
    setData(null);
    setReportingLinesData(undefined);
    setShouldShowGiveKudos(false);
    setTeamCentralBaseUrl(undefined);
  }, [userId]);

  const fireAnalytics = useCallback(
    (payload: AnalyticsEventPayload) => {
      // Don't fire any analytics if the component is unmounted
      if (!isMounted) {
        return;
      }

      fireEvent(createAnalyticsEvent, payload);
    },
    [createAnalyticsEvent, isMounted],
  );

  const hideProfilecard = useCallback(() => {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    if (!isTriggeredUsingKeyboard) {
      setHideTimer(
        window.setTimeout(() => {
          setVisible(false);
        }, hideDelay),
      );
    }
  }, [hideDelay, hideTimer, showTimer, isTriggeredUsingKeyboard]);

  const handleKeyboardClose = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key && event.key !== 'Escape') {
        return;
      }
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
      setTriggeredUsingKeyboard(false);
      setVisible(false);
    },
    [setTriggeredUsingKeyboard, setVisible],
  );

  const handleClientSuccess = useCallback(
    (
      profileData: ProfileCardClientData,
      reportingLinesData: TeamCentralReportingLinesData,
      shouldShowGiveKudos: boolean,
    ) => {
      if (!isMounted) {
        return;
      }

      setIsLoading(false);
      setHasError(false);
      setData(profileData);
      setReportingLinesData(reportingLinesData);
      setShouldShowGiveKudos(shouldShowGiveKudos);
    },
    [
      isMounted,
      setHasError,
      setIsLoading,
      setData,
      setReportingLinesData,
      setShouldShowGiveKudos,
    ],
  );

  const handleClientError = useCallback(
    (err: any) => {
      if (!isMounted) {
        return;
      }

      setIsLoading(false);
      setHasError(true);
      setError(err);
    },
    [isMounted, setHasError, setIsLoading, setError],
  );

  const clientFetchProfile = useCallback(async () => {
    if (isLoading === true) {
      // don't fetch data when fetching is in process
      return;
    }

    setTeamCentralBaseUrl(resourceClient.getTeamCentralBaseUrl());
    setIsLoading(true);
    setHasError(false);
    setError(null);
    setData(null);

    try {
      const requests = Promise.all([
        resourceClient.getProfile(cloudId || '', userId, fireAnalytics),
        resourceClient.getReportingLines(userId),
        resourceClient.shouldShowGiveKudos(),
      ]);

      const responses = await requests;
      handleClientSuccess(...responses);
    } catch (err) {
      handleClientError(err);
    }
  }, [
    cloudId,
    fireAnalytics,
    isLoading,
    resourceClient,
    userId,
    handleClientSuccess,
    handleClientError,
  ]);

  const showProfilecard = useCallback(() => {
    clearTimeout(hideTimer);
    clearTimeout(showTimer);
    setShowTimer(
      window.setTimeout(() => {
        if (!visible) {
          void clientFetchProfile();
          setVisible(true);
        }
      }, showDelay),
    );
  }, [hideTimer, showDelay, showTimer, visible, clientFetchProfile]);

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      // If the user clicks on the trigger then we don't want that click event to
      // propagate out to parent containers. For example when clicking a mention
      // lozenge in an inline-edit.
      event.stopPropagation();

      showProfilecard();

      if (!visible) {
        fireAnalytics(cardTriggered('user', 'click'));
      }
    },
    [fireAnalytics, showProfilecard, visible],
  );

  const onMouseEnter = useCallback(() => {
    showProfilecard();

    if (!visible) {
      fireAnalytics(cardTriggered('user', 'hover'));
    }
  }, [fireAnalytics, showProfilecard, visible]);

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setTriggeredUsingKeyboard(true);
        showProfilecard();
        if (!visible) {
          fireAnalytics(cardTriggered('user', 'click'));
        }
      }
    },
    [fireAnalytics, showProfilecard, visible],
  );

  const onFocus = useCallback(() => {
    showProfilecard();
  }, [showProfilecard]);

  const containerListeners = useMemo(
    () =>
      trigger === 'hover'
        ? {
            onMouseEnter: onMouseEnter,
            onMouseLeave: hideProfilecard,
            onBlur: hideProfilecard,
            onKeyPress: onKeyPress,
          }
        : {
            onClick: onClick,
            onKeyPress: onKeyPress,
          },
    [hideProfilecard, onClick, onKeyPress, onMouseEnter, trigger],
  );

  const filterActions = useCallback((): ProfileCardAction[] => {
    return filterActionsInner(actions, data);
  }, [actions, data]);

  const openKudosDrawer = () => {
    hideProfilecard();
    setKudosDrawerOpen(true);
  };

  const closeKudosDrawer = () => {
    setKudosDrawerOpen(false);
  };

  const showLoading = isLoading === true || isLoading === undefined;
  const wrapperProps = useMemo(
    () =>
      trigger === 'hover'
        ? {
            onMouseEnter: onMouseEnter,
            onMouseLeave: hideProfilecard,
            onFocus: onFocus,
          }
        : {},
    [hideProfilecard, onFocus, onMouseEnter, trigger],
  );
  const profilecardProps: ProfilecardProps = {
    userId: userId,
    fullName: prepopulatedData?.fullName,
    isCurrentUser: data?.isCurrentUser,
    clientFetchProfile: clientFetchProfile,
    ...data,
    reportingLines: reportingLinesData,
    onReportingLinesClick: onReportingLinesClick,
    isKudosEnabled: shouldShowGiveKudos,
    teamCentralBaseUrl: teamCentralBaseUrl,
    cloudId: cloudId,
    openKudosDrawer: openKudosDrawer,
    isTriggeredUsingKeyboard: isTriggeredUsingKeyboard,
  };

  return (
    <>
      <Popup
        isOpen={!!visible}
        onClose={(event: React.KeyboardEvent) => {
          hideProfilecard();
          handleKeyboardClose(event);
        }}
        placement={position}
        content={() =>
          showLoading ? (
            <LoadingView fireAnalytics={fireAnalytics} />
          ) : (
            <div {...wrapperProps}>
              {visible && (
                <Suspense fallback={null}>
                  <ProfileCardLazy
                    {...profilecardProps}
                    actions={filterActions()}
                    hasError={hasError}
                    errorType={error}
                    withoutElevation
                  />
                </Suspense>
              )}
            </div>
          )
        }
        trigger={(triggerProps) => {
          const { ref: callbackRef, ...innerProps } = triggerProps;
          const ref = (element: HTMLElement | null) => {
            triggerRef.current = element;
            if (typeof callbackRef === 'function') {
              callbackRef(element);
            }
          };
          return (
            <span
              {...innerProps}
              {...containerListeners}
              ref={ref}
              data-testid={testId}
              role="button"
              tabIndex={0}
              aria-label={getLabelMessage(
                ariaLabel,
                profilecardProps.fullName,
                formatMessage,
              )}
              aria-labelledby={ariaLabelledBy}
            >
              {children}
            </span>
          );
        }}
        zIndex={layers.modal()}
        shouldUseCaptureOnOutsideClick
        autoFocus={trigger === 'click'}
      />
      {shouldShowGiveKudos && (
        <Suspense fallback={null}>
          <GiveKudosLauncherLazy
            isOpen={kudosDrawerOpen}
            recipient={{
              type: KudosType.INDIVIDUAL,
              recipientId: userId!,
            }}
            analyticsSource="profile-card"
            teamCentralBaseUrl={teamCentralBaseUrl!}
            cloudId={cloudId!}
            addFlag={addFlag}
            onClose={closeKudosDrawer}
          />
        </Suspense>
      )}
    </>
  );
}

const LoadingView = ({
  fireAnalytics,
}: {
  fireAnalytics: (payload: AnalyticsEventPayload) => void;
}) => (
  <CardWrapper data-testId="profilecard.profilecardtrigger.loading">
    <UserLoadingState fireAnalytics={fireAnalytics} />
  </CardWrapper>
);
