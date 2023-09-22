/** @jsx jsx */
import { useEffect, useState } from 'react';

import { css, jsx } from '@emotion/react';
import type { IntlShape } from 'react-intl-next';

import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import { cardMessages as messages } from '@atlaskit/editor-common/messages';
import type { Command } from '@atlaskit/editor-common/types';
import {
  FloatingToolbarButton as Button,
  FloatingToolbarSeparator as Separator,
  SmallerEditIcon,
} from '@atlaskit/editor-common/ui';
import {
  canRenderDatasource,
  getDatasourceType,
} from '@atlaskit/editor-common/utils';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import type { JsonLdDatasourceResponse } from '@atlaskit/link-client-extension';
import type { CardContext } from '@atlaskit/link-provider';

import { showDatasourceModal } from '../pm-plugins/actions';

import { CardContextProvider } from './CardContextProvider';

export interface EditDatasourceButtonProps {
  intl: IntlShape;
  editorAnalyticsApi?: EditorAnalyticsAPI;
  url?: string;
  editorView?: EditorView;
  editorState: EditorState;
  cardContext?: CardContext;
}

const buttonStyles = css({
  pointerEvents: 'auto',
});

const buttonWrapperStyles = css({
  display: 'flex',
});

const EditDatasourceButtonWithCardContext = ({
  cardContext,
  intl,
  editorAnalyticsApi,
  url,
  editorView,
  editorState,
}: EditDatasourceButtonProps) => {
  const [datasourceId, setDatasourceId] = useState<string | null>(null);
  useEffect(() => {
    const fetchDatasource = async () => {
      try {
        const response =
          url &&
          cardContext &&
          (await cardContext?.connections?.client?.fetchData(url));
        const datasources =
          (response && (response as JsonLdDatasourceResponse).datasources) ||
          [];

        setDatasourceId(datasources[0]?.id || null);
      } catch (e) {
        setDatasourceId(null);
      }
    };

    void fetchDatasource();
  }, [cardContext, url]);

  if (!datasourceId || !canRenderDatasource(datasourceId, false)) {
    return null;
  }

  if (url) {
    const urlState = cardContext?.store?.getState()[url];
    if (urlState?.error?.kind === 'fatal') {
      return null;
    }
  }

  const dispatchCommand = (fn?: Function) => {
    fn && fn(editorState, editorView && editorView.dispatch);
    if (editorView && !editorView.hasFocus()) {
      editorView.focus();
    }
  };

  return (
    <div css={buttonWrapperStyles}>
      <Button
        css={buttonStyles}
        title={intl.formatMessage(messages.datasourceTitle)}
        icon={<SmallerEditIcon />}
        selected={false}
        onClick={() =>
          dispatchCommand(editDatasource(datasourceId, editorAnalyticsApi))
        }
        testId={'card-edit-datasource-button'}
      />
      <Separator />
    </div>
  );
};

export const EditDatasourceButton = ({
  intl,
  editorAnalyticsApi,
  url,
  editorView,
  editorState,
}: EditDatasourceButtonProps) => {
  return (
    <CardContextProvider>
      {({ cardContext }) => (
        <EditDatasourceButtonWithCardContext
          url={url}
          intl={intl}
          editorAnalyticsApi={editorAnalyticsApi}
          editorView={editorView}
          editorState={editorState}
          cardContext={cardContext}
        />
      )}
    </CardContextProvider>
  );
};

export const editDatasource =
  (
    datasourceId: string,
    editorAnalyticsApi: EditorAnalyticsAPI | undefined,
  ): Command =>
  (state, dispatch) => {
    const datasourceType = getDatasourceType(datasourceId);

    if (dispatch && datasourceType) {
      const { tr } = state;
      showDatasourceModal(datasourceType)(tr);
      // editorAnalyticsApi?.attachAnalyticsEvent(
      //   buildEditLinkPayload(
      //     type as
      //       | ACTION_SUBJECT_ID.CARD_INLINE
      //       | ACTION_SUBJECT_ID.CARD_BLOCK
      //       | ACTION_SUBJECT_ID.EMBEDS,
      //   ),
      // )(tr);
      dispatch(tr);
      return true;
    }
    return false;
  };