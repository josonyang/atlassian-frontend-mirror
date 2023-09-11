import type { RichMediaLayout } from '@atlaskit/adf-schema';

import type { GuidelineTypes, WidthTypes } from '../../guideline/types';

import type { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID } from './enums';
import type { TrackAEP, UIAEP } from './utils';

type MediaBorderActionType = ACTION.UPDATED | ACTION.ADDED | ACTION.DELETED;

export type MediaBorderTrackAction = TrackAEP<
  MediaBorderActionType,
  ACTION_SUBJECT.MEDIA,
  ACTION_SUBJECT_ID.BORDER,
  any,
  undefined
>;

type MediaLinkActionType =
  | ACTION.ADDED
  | ACTION.EDITED
  | ACTION.DELETED
  | ACTION.VISITED
  | ACTION.ERRORED;

export type MediaLinkAEP = TrackAEP<
  MediaLinkActionType,
  ACTION_SUBJECT.MEDIA,
  ACTION_SUBJECT_ID.LINK,
  any,
  undefined
>;

type MediaCaptionActionType = ACTION.DELETED | ACTION.EDITED | ACTION.ADDED;

export type CaptionTrackAction = TrackAEP<
  MediaCaptionActionType,
  ACTION_SUBJECT.MEDIA_SINGLE,
  ACTION_SUBJECT_ID.CAPTION,
  any,
  undefined
>;

type MediaAltTextAction = TrackAEP<
  ACTION.ADDED | ACTION.CLOSED | ACTION.EDITED | ACTION.CLEARED | ACTION.OPENED,
  ACTION_SUBJECT.MEDIA,
  ACTION_SUBJECT_ID.ALT_TEXT,
  undefined,
  undefined
>;

type MediaUIAction = UIAEP<
  ACTION.EDITED,
  ACTION_SUBJECT.MEDIA_SINGLE | ACTION_SUBJECT.EMBEDS,
  ACTION_SUBJECT_ID.RESIZED,
  any,
  undefined
>;

type MediaResizeAttributes = {
  width?: number;
  widthType: WidthTypes;
  layout: string;
  snapType: GuidelineTypes;
  parentNode?: string;
};

export type MediaResizeTrackAction = UIAEP<
  ACTION.EDITED,
  ACTION_SUBJECT.MEDIA_SINGLE | ACTION_SUBJECT.EMBEDS,
  ACTION_SUBJECT_ID.RESIZED,
  MediaResizeAttributes,
  undefined
>;

type MediaInputResizeAttributes = {
  width: number;
  layout: RichMediaLayout;
  validation: 'valid' | 'greater-than-max' | 'less-than-min';
  parentNode?: string;
};

export type MediaInputResizeTrackAction = UIAEP<
  ACTION.EDITED,
  ACTION_SUBJECT.MEDIA_SINGLE | ACTION_SUBJECT.EMBEDS,
  ACTION_SUBJECT_ID.RESIZED,
  MediaInputResizeAttributes,
  undefined
>;

type MediaSwitchType =
  | ACTION_SUBJECT_ID.MEDIA_INLINE
  | ACTION_SUBJECT_ID.MEDIA_GROUP;

type ChangeMediaAEP = TrackAEP<
  ACTION.CHANGED_TYPE,
  ACTION_SUBJECT.MEDIA,
  undefined,
  { newType: MediaSwitchType; previousType: MediaSwitchType },
  undefined
>;

export type MediaAltTextActionType =
  | ACTION.ADDED
  | ACTION.CLOSED
  | ACTION.EDITED
  | ACTION.CLEARED
  | ACTION.OPENED;

export type MediaEventPayload =
  | MediaLinkAEP
  | MediaAltTextAction
  | MediaUIAction
  | MediaResizeTrackAction
  | MediaInputResizeTrackAction
  | MediaBorderTrackAction
  | CaptionTrackAction
  | ChangeMediaAEP;
