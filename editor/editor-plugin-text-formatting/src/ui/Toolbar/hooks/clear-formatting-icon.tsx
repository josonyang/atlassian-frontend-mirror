/** @jsx jsx */
import { useCallback, useMemo } from 'react';

import { jsx } from '@emotion/react';

import { INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import {
  clearFormatting as clearFormattingKeymap,
  tooltip,
} from '@atlaskit/editor-common/keymaps';
import { toolbarMessages } from '@atlaskit/editor-common/messages';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { shortcutStyle } from '@atlaskit/editor-shared-styles/shortcut';

import { clearFormattingWithAnalytics } from '../../../commands/clear-formatting';
import type { ClearFormattingState } from '../../../pm-plugins/clear-formatting';
import { pluginKey as clearFormattingPluginKey } from '../../../pm-plugins/clear-formatting';
import type { IconHookProps, MenuIconItem } from '../types';

interface ClearIconHookProps extends IconHookProps {
  editorAnalyticsAPI: EditorAnalyticsAPI | undefined;
}

const useClearFormattingPluginState = (
  editorState: EditorState,
): ClearFormattingState | undefined => {
  return useMemo(
    () => clearFormattingPluginKey.getState(editorState),
    [editorState],
  );
};

export const useClearIcon = ({
  intl,
  editorState,
  editorAnalyticsAPI,
}: ClearIconHookProps): MenuIconItem | null => {
  const pluginState = useClearFormattingPluginState(editorState);
  const isPluginAvailable = Boolean(pluginState);
  const formattingIsPresent = Boolean(pluginState?.formattingIsPresent);
  const clearFormattingLabel = intl.formatMessage(
    toolbarMessages.clearFormatting,
  );

  const clearFormattingToolbar = useCallback(
    (state, dispatch) =>
      clearFormattingWithAnalytics(INPUT_METHOD.TOOLBAR, editorAnalyticsAPI)(
        state,
        dispatch,
      ),
    [editorAnalyticsAPI],
  );

  return useMemo(() => {
    if (!isPluginAvailable) {
      return null;
    }

    return {
      key: 'clearFormatting',
      command: clearFormattingToolbar,
      content: clearFormattingLabel,
      elemAfter: (
        // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
        <div css={shortcutStyle}>{tooltip(clearFormattingKeymap)}</div>
      ),
      value: {
        name: 'clearFormatting',
      },
      isActive: false,
      isDisabled: !formattingIsPresent,
      'aria-label': clearFormattingKeymap
        ? tooltip(clearFormattingKeymap, String(clearFormattingLabel))
        : String(clearFormattingLabel),
    };
  }, [
    isPluginAvailable,
    clearFormattingToolbar,
    clearFormattingLabel,
    formattingIsPresent,
  ]);
};
