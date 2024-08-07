/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import React, { type MouseEvent, type ReactNode } from 'react';

import { type FileDetails } from '@atlaskit/media-client';
import { type UIAnalyticsEvent } from '@atlaskit/analytics-next';
import Tooltip from '@atlaskit/tooltip';

import { ImageContainer, Wrapper } from '../ui/wrapper';
import {
	type CardAppearance,
	type CardDimensions,
	type MediaCardCursor,
	type TitleBoxIcon,
} from '../../types';
import { type CardAction, attachDetailsToActions } from '../actions';
import { TitleBox } from '../ui/titleBox/titleBox';
import { TickBox } from '../ui/tickBox/tickBox';
import { Blanket } from '../ui/blanket/blanket';
import { ActionsBar } from '../ui/actionsBar/actionsBar';
import { fileCardImageViewSelector } from '../classnames';
import { type Breakpoint } from '../ui/common';
import { type MediaFilePreview } from '@atlaskit/media-file-preview';
import OpenMediaViewerButton from '../ui/openMediaViewerButton/openMediaViewerButton';

export type SharedCardViewProps = {
	readonly cardPreview?: MediaFilePreview;
	readonly testId?: string;
	readonly dimensions?: CardDimensions;
	readonly openMediaViewerButtonRef?: React.Ref<HTMLButtonElement>;
	readonly shouldOpenMediaViewer?: boolean;
	readonly onClick?: (
		event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
		analyticsEvent?: UIAnalyticsEvent,
	) => void;
	readonly onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
	readonly appearance?: CardAppearance;
	readonly disableOverlay?: boolean;
	readonly actions?: Array<CardAction>;
	readonly selectable?: boolean;
	readonly selected?: boolean;
	readonly metadata?: FileDetails;
	readonly titleBoxBgColor?: string;
	readonly titleBoxIcon?: TitleBoxIcon;
	readonly mediaCardCursor?: MediaCardCursor;
	readonly shouldHideTooltip?: boolean;
	overriddenCreationDate?: number;
};

export type CardViewWrapperProps = SharedCardViewProps & {
	children: React.ReactNode;
	readonly breakpoint: Breakpoint;
	customBlanket?: () => ReactNode;
	customTitleBox?: () => ReactNode;
	progressBar?: () => ReactNode;
};

export const CardViewWrapper = React.forwardRef(
	(
		{
			cardPreview,
			testId,
			dimensions,
			appearance = 'auto',
			metadata,
			selected,
			selectable,
			actions,
			breakpoint,
			disableOverlay,
			titleBoxBgColor,
			titleBoxIcon,
			shouldHideTooltip,
			children,
			onClick,
			onMouseEnter,
			mediaCardCursor,
			customBlanket,
			customTitleBox,
			progressBar,
			shouldOpenMediaViewer,
			openMediaViewerButtonRef = null,
			overriddenCreationDate,
			...props
		}: CardViewWrapperProps,
		ref: React.Ref<HTMLDivElement>,
	) => {
		const { name, createdAt, mediaType } = metadata || {};

		const actionsWithDetails = metadata && actions ? attachDetailsToActions(actions, metadata) : [];

		const defaultBlanket = !disableOverlay && <Blanket />;

		const defaultTitleBox = !disableOverlay && !!name && (
			<TitleBox
				name={name}
				createdAt={overriddenCreationDate ?? createdAt}
				breakpoint={breakpoint}
				titleBoxIcon={titleBoxIcon}
				titleBoxBgColor={titleBoxBgColor}
			/>
		);

		const contents = (
			<React.Fragment>
				<ImageContainer
					testId={fileCardImageViewSelector}
					mediaName={name}
					status={status}
					selected={selected ? true : undefined}
					{...props}
				>
					{children}
					{customBlanket ? customBlanket() : defaultBlanket}
					{customTitleBox ? customTitleBox() : defaultTitleBox}
					{!disableOverlay && !!selectable && <TickBox selected={selected} />}
					{progressBar && progressBar()}
				</ImageContainer>
				{!disableOverlay && actions && actions.length !== 0 && (
					<ActionsBar filename={name} actions={actionsWithDetails} />
				)}
			</React.Fragment>
		);

		const shouldRenderPlayButton = () => {
			if (mediaType !== 'video' || !cardPreview) {
				return false;
			}
			return true;
		};

		const isPlayButtonClickable = shouldRenderPlayButton() && disableOverlay;
		const isTickBoxSelectable = !disableOverlay && !!selectable && !selected;
		const shouldDisplayTooltip = !disableOverlay && !shouldHideTooltip;
		const shouldDisplayBackground = !cardPreview || !disableOverlay;

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
					appearance={appearance}
					onClick={onClick}
					onMouseEnter={onMouseEnter}
					innerRef={ref}
					breakpoint={breakpoint}
					mediaCardCursor={mediaCardCursor}
					disableOverlay={!!disableOverlay}
					selected={!!selected}
					displayBackground={shouldDisplayBackground}
					isPlayButtonClickable={!!isPlayButtonClickable}
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
	},
);
