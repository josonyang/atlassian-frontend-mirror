/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { EditorView } from 'prosemirror-view';
import AvatarGroup from '@atlaskit/avatar-group';

import { avatarContainer } from './styles';
import { ReadOnlyParticipants } from '../participants';
import toAvatar from './to-avatar';
import type { CollabParticipant } from '@atlaskit/collab-provider';
import { scrollToCollabCursor } from '../utils';
import { AnalyticsEvent } from '@atlaskit/analytics-next';
import { FeatureFlags } from '@atlaskit/editor-common/types';

export interface AvatarsProps {
  sessionId?: string;
  participants: ReadOnlyParticipants;
  editorView?: EditorView;
  featureFlags: FeatureFlags;
}

export const Avatars: React.FC<AvatarsProps> = React.memo((props) => {
  const { sessionId, editorView, featureFlags } = props;
  const participants = props.participants.toArray() as CollabParticipant[];
  const avatars = participants
    .sort((p) => (p.sessionId === sessionId ? -1 : 1))
    .map(toAvatar);

  if (!avatars.length) {
    return null;
  }

  return (
    <div css={avatarContainer}>
      <AvatarGroup
        appearance="stack"
        size="medium"
        data={avatars}
        maxCount={3}
        onAvatarClick={(
          _event: React.MouseEvent,
          _analytics: AnalyticsEvent | undefined,
          index: number,
        ) => {
          if (!editorView) {
            return;
          }

          const allowCollabAvatarScroll = featureFlags?.collabAvatarScroll;

          // user does not need to scroll to their own position (index 0)
          if (allowCollabAvatarScroll && index > 0) {
            scrollToCollabCursor(
              editorView,
              participants,
              props.sessionId,
              index,
            );
          }
        }}
      />
      {props.children}
    </div>
  );
});
