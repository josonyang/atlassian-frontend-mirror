import React from 'react';
import { EditorView } from 'prosemirror-view';
import {
  ProviderFactory,
  WithProviders,
} from '@atlaskit/editor-common/provider-factory';
import { LinkPickerProps } from '@atlaskit/link-picker';

import HyperlinkAddToolbarComp from './HyperlinkAddToolbar';
import { LinkInputType, LinkPickerOptions } from '../../types';
import { INPUT_METHOD } from '../../../analytics/types';
import { stateKey as pluginKey } from '../../pm-plugins/main';
import WithPluginState from '../../../../ui/WithPluginState';
import { getFeatureFlags } from '../../../feature-flags-context';
import { EditorLinkPicker, EditorLinkPickerProps } from '../EditorLinkPicker';

export interface Props
  extends Pick<EditorLinkPickerProps, 'onCancel' | 'invokeMethod'> {
  view: EditorView;
  providerFactory: ProviderFactory;
  onSubmit: (
    href: string,
    title: string | undefined,
    displayText: string | undefined,
    inputMethod: LinkInputType,
  ) => void;
  linkPickerOptions?: LinkPickerOptions;
  displayText?: string;
  displayUrl?: string;
}

/**
 * Wraps around the editor's onSubmit handler so that the plugin can interface with the link picker
 */
const onSubmitInterface =
  (onSubmit: Props['onSubmit']): LinkPickerProps['onSubmit'] =>
  ({ url, title, displayText, rawUrl, meta }) => {
    onSubmit(
      url,
      title ?? rawUrl,
      displayText || undefined,
      meta.inputMethod === 'manual'
        ? INPUT_METHOD.MANUAL
        : INPUT_METHOD.TYPEAHEAD,
    );
  };

export default class HyperlinkAddToolbar extends React.PureComponent<Props> {
  render() {
    const {
      linkPickerOptions = {},
      onSubmit,
      displayText,
      displayUrl,
      providerFactory,
      view,
      onCancel,
      invokeMethod,
    } = this.props;

    return (
      <WithProviders
        providers={['activityProvider', 'searchProvider']}
        providerFactory={providerFactory}
        renderNode={({ activityProvider, searchProvider }) => (
          <WithPluginState
            editorView={view}
            plugins={{
              hyperlinkPluginState: pluginKey,
            }}
            render={({ hyperlinkPluginState }) => {
              const { lpLinkPicker } = getFeatureFlags(view.state);

              if (lpLinkPicker) {
                return (
                  <EditorLinkPicker
                    view={view}
                    invokeMethod={
                      // Provide `invokeMethod` prop as preferred value (card plugin passes as prop) otherwise assume this
                      // is being used from inside the hyperlink plugin and use inputMethod from plugin state
                      invokeMethod ?? hyperlinkPluginState?.inputMethod
                    }
                    editorAppearance={hyperlinkPluginState?.editorAppearance}
                    {...linkPickerOptions}
                    url={displayUrl}
                    displayText={displayText}
                    onSubmit={onSubmitInterface(onSubmit)}
                    onCancel={onCancel}
                  />
                );
              }

              return (
                <HyperlinkAddToolbarComp
                  activityProvider={activityProvider}
                  searchProvider={searchProvider}
                  onSubmit={onSubmit}
                  displayText={displayText}
                  displayUrl={displayUrl}
                  pluginState={hyperlinkPluginState!}
                  view={view}
                />
              );
            }}
          />
        )}
      />
    );
  }
}
