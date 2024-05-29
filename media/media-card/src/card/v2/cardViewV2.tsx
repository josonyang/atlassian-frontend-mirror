/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { type MouseEvent, useEffect, useState, useRef } from 'react';
import { type MessageDescriptor } from 'react-intl-next';

import {
  type MediaItemType,
  type FileDetails,
  type ImageResizeMode,
} from '@atlaskit/media-client';
import {
  withAnalyticsEvents,
  type WithAnalyticsEventsProps,
  type UIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import { MimeTypeIcon } from '@atlaskit/media-ui/mime-type-icon';
import SpinnerIcon from '@atlaskit/spinner';
import Tooltip from '@atlaskit/tooltip';
import { messages } from '@atlaskit/media-ui';

import {
  type CardStatus,
  type CardPreview,
  type MediaCardCursor,
  type CardDimensions,
  type TitleBoxIcon,
} from '../../types';
import { type MediaFilePreview } from '@atlaskit/media-file-preview';
import { createAndFireMediaCardEvent } from '../../utils/analytics';
import { type CardAction, attachDetailsToActions } from '../actions';
import { cardImageContainerStyles } from '../ui/styles';
import { ImageRenderer } from '../ui/imageRenderer/imageRenderer';
import { TitleBox } from '../ui/titleBox/titleBox';
import { FailedTitleBox } from '../ui/titleBox/failedTitleBox';
import { ProgressBar } from '../ui/progressBar/progressBar';
import { PlayButton } from '../ui/playButton/playButton';
import { TickBox } from '../ui/tickBox/tickBox';
import { Blanket } from '../ui/blanket/blanket';
import { ActionsBar } from '../ui/actionsBar/actionsBar';
import { IconWrapper } from '../ui/iconWrapper/iconWrapper';
import {
  PreviewUnavailable,
  CreatingPreview,
  FailedToUpload,
  PreviewCurrentlyUnavailable,
  FailedToLoad,
} from '../ui/iconMessage';
import {
  isUploadError,
  isRateLimitedError,
  isPollingError,
  type MediaCardError,
} from '../../errors';
import { Wrapper } from '../ui/wrapper';
import { fileCardImageViewSelector } from '../classnames';
import { useBreakpoint } from '../useBreakpoint';
import OpenMediaViewerButton from '../ui/openMediaViewerButton/openMediaViewerButton';

export interface CardViewV2Props {
  readonly disableOverlay?: boolean;
  readonly resizeMode?: ImageResizeMode;
  readonly dimensions: CardDimensions;
  readonly actions?: Array<CardAction>;
  readonly selectable?: boolean;
  readonly selected?: boolean;
  readonly alt?: string;
  readonly testId?: string;
  readonly titleBoxBgColor?: string;
  readonly titleBoxIcon?: TitleBoxIcon;
  readonly status: CardStatus;
  readonly mediaItemType: MediaItemType;
  readonly mediaCardCursor?: MediaCardCursor;
  readonly metadata?: FileDetails;
  readonly error?: MediaCardError;
  readonly onClick?: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
    analyticsEvent?: UIAnalyticsEvent,
  ) => void;
  readonly openMediaViewerButtonRef?: React.Ref<HTMLButtonElement>;
  readonly shouldOpenMediaViewer?: boolean;
  readonly onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  readonly onDisplayImage?: () => void;
  // FileCardProps
  readonly cardPreview?: MediaFilePreview;
  readonly progress?: number;
  // CardView can't implement forwardRef as it needs to pass and at the same time
  // handle the HTML element internally. There is no standard way to do this.
  // Therefore, we restrict the use of refs to callbacks only, not RefObjects.
  readonly innerRef?: (instance: HTMLDivElement | null) => void;
  readonly onImageLoad?: (cardPreview: MediaFilePreview) => void;
  readonly onImageError?: (cardPreview: MediaFilePreview) => void;
  readonly nativeLazyLoad?: boolean;
  readonly forceSyncDisplay?: boolean;
  // Used to disable animation for testing purposes
  disableAnimation?: boolean;
  shouldHideTooltip?: boolean;
}

export type CardViewV2BaseProps = CardViewV2Props & WithAnalyticsEventsProps;

export interface RenderConfigByStatusV2 {
  renderTypeIcon?: boolean;
  iconMessage?: JSX.Element;
  renderImageRenderer?: boolean;
  renderPlayButton?: boolean;
  renderTitleBox?: boolean;
  renderBlanket?: boolean;
  isFixedBlanket?: boolean;
  renderProgressBar?: boolean;
  renderSpinner?: boolean;
  renderFailedTitleBox?: boolean;
  renderTickBox?: boolean;
  customTitleMessage?: MessageDescriptor;
}

export const CardViewV2Base = ({
  innerRef,
  onImageLoad,
  onImageError,
  dimensions,
  onClick,
  onMouseEnter,
  testId,
  metadata,
  status,
  selected,
  selectable,
  cardPreview,
  mediaCardCursor,
  shouldHideTooltip,
  progress,
  alt,
  resizeMode,
  onDisplayImage,
  nativeLazyLoad,
  forceSyncDisplay,
  actions,
  disableOverlay,
  titleBoxBgColor,
  titleBoxIcon,
  error,
  disableAnimation,
  openMediaViewerButtonRef = null,
  shouldOpenMediaViewer,
}: CardViewV2BaseProps) => {
  const [didImageRender, setDidImageRender] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const prevCardPreviewRef = useRef<MediaFilePreview | undefined>();
  const breakpoint = useBreakpoint(dimensions?.width, divRef);

  useEffect(() => {
    innerRef && !!divRef.current && innerRef(divRef.current);
  }, [innerRef]);

  useEffect(() => {
    // We should only switch didImageRender to false when cardPreview goes undefined, not when it is changed. as this method could be triggered after onImageLoad callback, falling on a race condition
    if (prevCardPreviewRef.current && !cardPreview) {
      setDidImageRender(false);
    }
    prevCardPreviewRef.current = cardPreview;
  }, [cardPreview]);

  const handleOnImageLoad = (prevCardPreview: CardPreview) => {
    if (prevCardPreview.dataURI !== cardPreview?.dataURI) {
      return;
    }
    /*
      We render the icon & icon message always, even if there is cardPreview available.
      If the image fails to load/render, the icon will remain, i.e. the user won't see a change until the root card decides to chage status to error.
      If the image renders successfully, we switch this variable to hide the icon & icon message behind the thumbnail in case the image has transparency.
      It is less likely that root component replaces a suceeded cardPreview for a failed one than the opposite case. Therefore we prefer to hide the icon instead show when the image fails, for a smoother transition
    */
    setDidImageRender(true);
    onImageLoad?.(cardPreview);
  };

  const handleOnImageError = (prevCardPreview: CardPreview) => {
    if (prevCardPreview.dataURI !== cardPreview?.dataURI) {
      return;
    }
    setDidImageRender(false);
    onImageError?.(cardPreview);
  };

  const shouldRenderPlayButton = () => {
    const { mediaType } = metadata || {};
    if (mediaType !== 'video' || !cardPreview) {
      return false;
    }
    return true;
  };

  const getRenderConfigByStatus = (): RenderConfigByStatusV2 => {
    const { name, mediaType } = metadata || {};
    const isZeroSize = metadata && metadata.size === 0;

    const defaultConfig: RenderConfigByStatusV2 = {
      renderTypeIcon: !didImageRender,
      renderImageRenderer: !!cardPreview,
      renderPlayButton: !!cardPreview && mediaType === 'video',
      renderBlanket: !disableOverlay,
      renderTitleBox: !disableOverlay && !!name,
      renderTickBox: !disableOverlay && !!selectable,
    };

    switch (status) {
      case 'uploading':
        return {
          ...defaultConfig,
          renderBlanket: !disableOverlay || mediaType !== 'video',
          isFixedBlanket: true,
          renderProgressBar: true,
        };
      case 'processing':
        return {
          ...defaultConfig,
          iconMessage:
            !didImageRender && !isZeroSize ? (
              <CreatingPreview disableAnimation={disableAnimation} />
            ) : undefined,
        };
      case 'complete':
        return defaultConfig;
      case 'error':
      case 'failed-processing':
        const baseErrorConfig = {
          ...defaultConfig,
          renderTypeIcon: true,
          renderImageRenderer: false,
          renderTitleBox: false,
          renderPlayButton: false,
        };

        let iconMessage;
        let customTitleMessage;
        const { secondaryError } = error || {};
        if (
          isRateLimitedError(secondaryError) ||
          isPollingError(secondaryError)
        ) {
          iconMessage = <PreviewCurrentlyUnavailable />;
        } else if (isUploadError(error)) {
          iconMessage = <FailedToUpload />;
          customTitleMessage = messages.failed_to_upload;
        } else if (!metadata) {
          iconMessage = <FailedToLoad />;
        } else {
          iconMessage = <PreviewUnavailable />;
        }

        if (!disableOverlay) {
          const renderFailedTitleBox = !name || !!customTitleMessage;
          return {
            ...baseErrorConfig,
            renderTitleBox: !!name && !customTitleMessage,
            renderFailedTitleBox,
            iconMessage: !renderFailedTitleBox ? iconMessage : undefined,
            customTitleMessage,
          };
        }
        return {
          ...baseErrorConfig,
          iconMessage,
        };
      case 'loading-preview':
      case 'loading':
      default:
        return {
          ...defaultConfig,
          renderPlayButton: false,
          renderTypeIcon: false,
          renderSpinner: !didImageRender,
        };
    }
  };

  const {
    renderTypeIcon,
    iconMessage,
    renderImageRenderer,
    renderSpinner,
    renderPlayButton,
    renderBlanket,
    renderProgressBar,
    renderTitleBox,
    renderFailedTitleBox,
    renderTickBox,
    isFixedBlanket,
    customTitleMessage,
  } = getRenderConfigByStatus();
  const shouldDisplayBackground =
    !cardPreview ||
    !disableOverlay ||
    status === 'error' ||
    status === 'failed-processing';
  const isPlayButtonClickable = shouldRenderPlayButton() && !!disableOverlay;
  const isTickBoxSelectable = !disableOverlay && !!selectable && !selected;
  // Disable tooltip for Media Single
  const shouldDisplayTooltip = !disableOverlay && !shouldHideTooltip;

  const hasTitleBox = !!(renderTitleBox || renderFailedTitleBox);

  const { mediaType, mimeType, name, createdAt } = metadata || {};

  const actionsWithDetails =
    metadata && actions ? attachDetailsToActions(actions, metadata) : [];

  const contents = (
    <React.Fragment>
      <div
        css={cardImageContainerStyles}
// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
        className={fileCardImageViewSelector}
        data-testid={fileCardImageViewSelector}
        data-test-media-name={name}
        data-test-status={status}
        data-test-progress={progress}
        data-test-selected={selected}
        data-test-source={cardPreview?.source}
      >
        {renderTypeIcon && (
          <IconWrapper breakpoint={breakpoint} hasTitleBox={hasTitleBox}>
            <MimeTypeIcon
              testId="media-card-file-type-icon"
              mediaType={mediaType}
              mimeType={mimeType}
              name={name}
            />
            {iconMessage}
          </IconWrapper>
        )}
        {renderSpinner && (
          <IconWrapper breakpoint={breakpoint} hasTitleBox={hasTitleBox}>
            <SpinnerIcon
              testId="media-card-loading"
              interactionName="media-card-loading"
            />
          </IconWrapper>
        )}
        {renderImageRenderer && !!cardPreview && (
          <ImageRenderer
            cardPreview={cardPreview}
            mediaType={metadata?.mediaType || 'unknown'}
            alt={alt || name}
            resizeMode={resizeMode}
            onDisplayImage={onDisplayImage}
            onImageLoad={handleOnImageLoad}
            onImageError={handleOnImageError}
            nativeLazyLoad={nativeLazyLoad}
            forceSyncDisplay={forceSyncDisplay}
          />
        )}
        {renderPlayButton && (
          <IconWrapper breakpoint={breakpoint} hasTitleBox={hasTitleBox}>
            <PlayButton />
          </IconWrapper>
        )}
        {renderBlanket && <Blanket isFixed={isFixedBlanket} />}
        {renderTitleBox && name && (
          <TitleBox
            name={name}
            createdAt={createdAt}
            breakpoint={breakpoint}
            titleBoxIcon={titleBoxIcon}
            titleBoxBgColor={titleBoxBgColor}
          />
        )}
        {renderFailedTitleBox && (
          <FailedTitleBox
            breakpoint={breakpoint}
            customMessage={customTitleMessage}
          />
        )}
        {renderProgressBar && (
          <ProgressBar
            progress={progress}
            breakpoint={breakpoint}
            positionBottom={!hasTitleBox}
          />
        )}
        {renderTickBox && <TickBox selected={selected} />}
      </div>
      {disableOverlay || !actions || actions.length === 0 ? null : (
        <ActionsBar filename={name} actions={actionsWithDetails} />
      )}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {shouldOpenMediaViewer && (
        <OpenMediaViewerButton
          fileName={name ?? ''}
          innerRef={openMediaViewerButtonRef}
          onClick={onClick}
        />
      )}
      <Wrapper
        testId={testId || 'media-card-view'}
        dimensions={dimensions}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        innerRef={divRef}
        breakpoint={breakpoint}
        mediaCardCursor={mediaCardCursor}
        disableOverlay={!!disableOverlay}
        selected={!!selected}
        displayBackground={shouldDisplayBackground}
        isPlayButtonClickable={isPlayButtonClickable}
        isTickBoxSelectable={isTickBoxSelectable}
        shouldDisplayTooltip={shouldDisplayTooltip}
      >
        {shouldDisplayTooltip ? (
          <Tooltip content={name} position="bottom" tag="div">
            {contents}
          </Tooltip>
        ) : (
          contents
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export const CardViewV2 = withAnalyticsEvents({
  onClick: createAndFireMediaCardEvent({
    eventType: 'ui',
    action: 'clicked',
    actionSubject: 'mediaCard',
    attributes: {},
  }),
})(CardViewV2Base);
