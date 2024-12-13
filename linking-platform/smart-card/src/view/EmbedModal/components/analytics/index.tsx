import React, { type ErrorInfo, useCallback } from 'react';

import { fg } from '@atlaskit/platform-feature-flags';

import { CardDisplay } from '../../../../constants';
import {
	failUfoExperience,
	startUfoExperience,
	succeedUfoExperience,
} from '../../../../state/analytics';
import { type EmbedModalContext, type EmbedModalProps, EmbedModalSize } from '../../types';

import { type WithAnalytics } from './types';

const getResizeFrom = (size?: EmbedModalSize): EmbedModalSize =>
	size === EmbedModalSize.Small ? EmbedModalSize.Large : EmbedModalSize.Small;

const withAnalytics =
	(Component: React.ComponentType<EmbedModalProps>) => (props: EmbedModalProps & WithAnalytics) => {
		const {
			analytics,
			fireEvent,
			extensionKey,
			id,
			onClose,
			onOpen,
			onOpenFailed,
			onResize,
			origin,
		} = props;

		const handleOnOpen = useCallback(
			(context: EmbedModalContext) => {
				if (fg('platform-smart-card-migrate-embed-modal-analytics')) {
					fireEvent?.('screen.embedPreviewModal.viewed', {
						origin: origin ?? null,
						size: context.size,
					});
				} else {
					analytics?.screen.modalViewedEvent({
						name: 'embedPreviewModal',
						attributes: {
							origin,
							size: context.size,
						},
					});
				}

				if (fg('platform-smart-card-migrate-embed-modal-analytics')) {
					succeedUfoExperience('smart-link-rendered', id || 'NULL', {
						extensionKey,
						display: CardDisplay.EmbedPreview,
					});

					// UFO will disregard this if authentication experience has not yet been started
					succeedUfoExperience('smart-link-authenticated', id || 'NULL', {
						display: CardDisplay.EmbedPreview,
					});

					fireEvent?.('ui.smartLink.renderSuccess', {
						display: CardDisplay.EmbedPreview,
					});
				} else {
					analytics?.ui.renderSuccessEvent({
						status: 'resolved',
						display: CardDisplay.EmbedPreview,
					});
				}

				if (onOpen) {
					onOpen(context);
				}
			},
			[analytics?.screen, analytics?.ui, fireEvent, extensionKey, id, onOpen, origin],
		);

		const handleOnOpenFailed = useCallback(
			(error: Error, errorInfo: ErrorInfo) => {
				if (fg('platform-smart-card-migrate-embed-modal-analytics')) {
					startUfoExperience('smart-link-rendered', id || 'NULL');
					failUfoExperience('smart-link-rendered', id || 'NULL');
					failUfoExperience('smart-link-authenticated', id || 'NULL');
					fireEvent?.('ui.smartLink.renderFailed', {
						display: CardDisplay.EmbedPreview,
						error: error as any,
						errorInfo: errorInfo as any,
						id: id ?? null,
					});
				} else {
					analytics?.ui.renderFailedEvent({
						display: CardDisplay.EmbedPreview,
						error,
						errorInfo,
					});
				}

				if (onOpenFailed) {
					onOpenFailed(error, errorInfo);
				}
			},
			[analytics?.ui, fireEvent, id, onOpenFailed],
		);

		const handleOnClose = useCallback(
			(context: EmbedModalContext) => {
				if (fg('platform-smart-card-migrate-embed-modal-analytics')) {
					fireEvent?.('ui.modal.closed.embedPreview', {
						origin: origin ?? null,
						previewTime: context.duration ?? null,
						size: context.size,
					});
				} else {
					analytics?.ui.modalClosedEvent({
						actionSubjectId: 'embedPreview',
						attributes: {
							origin,
							previewTime: context.duration,
							size: context.size,
						},
					});
				}

				if (onClose) {
					onClose(context);
				}
			},
			[analytics?.ui, fireEvent, onClose, origin],
		);

		const handleOnResize = useCallback(
			(context: EmbedModalContext) => {
				if (fg('platform-smart-card-migrate-embed-modal-analytics')) {
					fireEvent?.('ui.button.clicked.embedPreviewResize', {
						newSize: context.size,
						origin: origin ?? null,
						previousSize: getResizeFrom(context.size),
					});
				} else {
					analytics?.ui.buttonClickedEvent({
						actionSubjectId: 'embedPreviewResize',
						attributes: {
							newSize: context.size,
							origin,
							previousSize: getResizeFrom(context.size),
						},
					});
				}

				if (onResize) {
					onResize(context);
				}
			},
			[analytics?.ui, fireEvent, onResize, origin],
		);

		return (
			<Component
				{...props}
				onClose={handleOnClose}
				onOpen={handleOnOpen}
				onOpenFailed={handleOnOpenFailed}
				onResize={handleOnResize}
			/>
		);
	};

export default withAnalytics;
