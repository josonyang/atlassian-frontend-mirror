import { useEffect, useRef, useState } from 'react';

import type { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import type { ExtensionProvider } from '@atlaskit/editor-common/extensions';
import { usePreviousState } from '@atlaskit/editor-common/hooks';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';

import type EditorActions from '../../actions';
import type { QuickInsertOptions } from '@atlaskit/editor-common/types';
import type { QuickInsertProvider } from '@atlaskit/editor-common/provider-factory';
import type {
  EditorNextProps,
  EditorProps,
  ExtensionProvidersProp,
} from '../../types/editor-props';
import prepareExtensionProvider from '../../utils/prepare-extension-provider';
import prepareQuickInsertProvider from '../../utils/prepare-quick-insert-provider';
import getProvidersFromEditorProps from '../utils/getProvidersFromEditorProps';
import handleProviders from '../utils/handleProviders';

export type ProviderFactoryState = {
  extensionProvider?: ExtensionProvider;
  quickInsertProvider?: Promise<QuickInsertProvider>;
};

function createNewState(
  editorActions: EditorActions,
  quickInsert: QuickInsertOptions | undefined,
  extensionProviders: ExtensionProvidersProp | undefined,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
): ProviderFactoryState {
  const extensionProvider = prepareExtensionProvider(() => editorActions)(
    extensionProviders,
  );
  const quickInsertProvider = prepareQuickInsertProvider(
    editorActions,
    extensionProvider,
    quickInsert,
    createAnalyticsEvent,
  );
  return {
    extensionProvider,
    quickInsertProvider,
  };
}

/**
 *
 * This hook is used to create the provider factory object.
 *
 * @param props
 * @param editorActions
 * @param createAnalyticsEvent
 * @returns ProviderFactory for Editor
 */
export default function useProviderFactory(
  props: EditorNextProps,
  editorActions: EditorActions,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
): ProviderFactory {
  const {
    extensionProviders,
    quickInsert,
    linking,
    autoformattingProvider,
    media,
    emojiProvider,
    mentionProvider,
    legacyImageUploadProvider,
    taskDecisionProvider,
    contextIdentifierProvider,
    searchProvider,
    macroProvider,
    activityProvider,
    collabEdit,
    collabEditProvider,
    presenceProvider,
  } = props;

  const UNSAFE_cards = (props as EditorProps).UNSAFE_cards;
  const smartLinks = (props as EditorProps).smartLinks;

  const providerFactory = useRef(new ProviderFactory());
  const [providerState, setProviderState] = useState<ProviderFactoryState>(
    createNewState(
      editorActions,
      quickInsert,
      extensionProviders,
      createAnalyticsEvent,
    ),
  );
  const prevProps = usePreviousState({ extensionProviders, quickInsert });

  useEffect(() => {
    if (
      (extensionProviders &&
        extensionProviders !== prevProps?.extensionProviders) ||
      // Though this will introduce some performance regression related to quick insert
      // loading but we can remove it soon when Forge will move to new API.
      // quickInsert={Promise.resolve(consumerQuickInsert)} is one of the main reason behind this performance issue.
      (quickInsert && quickInsert !== prevProps?.quickInsert)
    ) {
      const newState = createNewState(
        editorActions,
        quickInsert,
        extensionProviders,
        createAnalyticsEvent,
      );
      setProviderState(newState);

      handleProviders(
        providerFactory.current,
        getProvidersFromEditorProps({
          linking,
          smartLinks,
          UNSAFE_cards,
          autoformattingProvider,
          media,
          emojiProvider,
          mentionProvider,
          legacyImageUploadProvider,
          taskDecisionProvider,
          contextIdentifierProvider,
          searchProvider,
          macroProvider,
          activityProvider,
          collabEdit,
          collabEditProvider,
          presenceProvider,
        }),
        newState.extensionProvider,
        newState.quickInsertProvider,
      );
      return;
    }
    handleProviders(
      providerFactory.current,
      getProvidersFromEditorProps({
        linking,
        smartLinks,
        UNSAFE_cards,
        autoformattingProvider,
        media,
        emojiProvider,
        mentionProvider,
        legacyImageUploadProvider,
        taskDecisionProvider,
        contextIdentifierProvider,
        searchProvider,
        macroProvider,
        activityProvider,
        collabEdit,
        collabEditProvider,
        presenceProvider,
      }),
      providerState.extensionProvider,
      providerState.quickInsertProvider,
    );
  }, [
    linking,
    smartLinks,
    UNSAFE_cards,
    autoformattingProvider,
    media,
    emojiProvider,
    mentionProvider,
    legacyImageUploadProvider,
    taskDecisionProvider,
    contextIdentifierProvider,
    searchProvider,
    macroProvider,
    activityProvider,
    collabEdit,
    collabEditProvider,
    presenceProvider,
    prevProps?.quickInsert,
    prevProps?.extensionProviders,
    createAnalyticsEvent,
    editorActions,
    providerState.extensionProvider,
    providerState.quickInsertProvider,
    extensionProviders,
    quickInsert,
  ]);

  // componentWillUnmount equivalent
  useEffect(() => {
    return () => {
      // Disable this next line because it is not a React node
      // so we can safely call destroy on the ref.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      providerFactory.current.destroy();
    };
  }, []);

  return providerFactory.current;
}