/** @jsx jsx */
import React, { useState, useEffect, Fragment } from 'react';
import { css, jsx } from '@emotion/react';
import { IntlShape } from 'react-intl-next';
import { EditorState } from 'prosemirror-state';

import LinkIcon from '@atlaskit/icon/glyph/editor/link';
import OpenIcon from '@atlaskit/icon/glyph/shortcut';
import { isSafeUrl } from '@atlaskit/adf-schema';

import { checkMediaType } from '../utils/check-media-type';
import { MediaLinkingState } from '../pm-plugins/linking';

import ToolbarButton from '../../floating-toolbar/ui/Button';
import Separator from '../../floating-toolbar/ui/Separator';

import { linkToolbarMessages, linkMessages } from '../../../messages';
import { ToolTipContent, addLink } from '../../../keymaps';
import { stateKey } from '../pm-plugins/plugin-key';
import { MediaClientConfig } from '@atlaskit/media-core';
import { currentMediaNode } from '../utils/current-media-node';

export interface LinkingToolbarProps {
  editorState: EditorState;
  intl: IntlShape;
  mediaLinkingState: MediaLinkingState;
  onAddLink: React.MouseEventHandler;
  onEditLink: React.MouseEventHandler;
  onOpenLink: React.MouseEventHandler;
}

// need this wrapper, need to have 4px between items.
const wrapper = css`
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

export const LinkToolbarAppearance: React.FC<LinkingToolbarProps> = ({
  editorState,
  mediaLinkingState,
  intl,
  onAddLink,
  onEditLink,
  onOpenLink,
}) => {
  const [showLinkingControls, setShowLinkingControls] = useState(false);

  useEffect(() => {
    setShowLinkingControls(false);
    const mediaNode = currentMediaNode(editorState);
    if (!mediaNode) {
      return;
    }

    const mediaClientConfig: MediaClientConfig =
      stateKey.getState(editorState)?.mediaClientConfig;

    if (!mediaClientConfig) {
      return;
    }

    checkMediaType(mediaNode, mediaClientConfig).then((mediaType) => {
      if (mediaType === 'external' || mediaType === 'image') {
        setShowLinkingControls(true);
      }
    });
  }, [editorState]);

  if (!showLinkingControls) {
    return null;
  }

  if (mediaLinkingState && mediaLinkingState.editable) {
    const isValidUrl = isSafeUrl(mediaLinkingState.link);
    const title = intl.formatMessage(linkToolbarMessages.editLink);
    const linkTitle = intl.formatMessage(
      isValidUrl ? linkMessages.openLink : linkToolbarMessages.unableToOpenLink,
    );

    return (
      <Fragment>
        <div css={wrapper}>
          <ToolbarButton
            onClick={onEditLink}
            title={title}
            tooltipContent={
              <ToolTipContent description={title} keymap={addLink} />
            }
          >
            {title}
          </ToolbarButton>
        </div>
        <div css={wrapper}>
          <Separator />
        </div>
        <ToolbarButton
          target="_blank"
          href={isValidUrl ? mediaLinkingState.link : undefined}
          disabled={!isValidUrl}
          onClick={onOpenLink}
          title={linkTitle}
          icon={<OpenIcon label={linkTitle}></OpenIcon>}
          className="hyperlink-open-link"
        />
        <Separator />
      </Fragment>
    );
  } else {
    const title = intl.formatMessage(linkToolbarMessages.addLink);
    return (
      <Fragment>
        <ToolbarButton
          testId="add-link-button"
          onClick={onAddLink}
          title={title}
          tooltipContent={
            <ToolTipContent description={title} keymap={addLink} />
          }
          icon={<LinkIcon label={title} />}
        />
        <Separator />
      </Fragment>
    );
  }
};
