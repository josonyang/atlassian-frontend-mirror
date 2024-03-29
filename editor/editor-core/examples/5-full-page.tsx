/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { Fragment } from 'react';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import { MockActivityResource } from '../example-helpers/activity-provider';
import { createSearchProvider, Scope } from '@atlassian/search-provider';
import ExamplesErrorBoundary from '../example-helpers/ExamplesErrorBoundary';
import { IntlProvider } from 'react-intl-next';

import { AtlassianIcon } from '@atlaskit/logo/atlassian-icon';
import Flag from '@atlaskit/flag';
import Warning from '@atlaskit/icon/glyph/warning';

import { mentionResourceProvider } from '@atlaskit/util-data-test/mention-story-data';
import { autoformattingProvider } from '@atlaskit/editor-test-helpers/autoformatting-provider';
import { cardProviderStaging } from '@atlaskit/editor-test-helpers/card-provider';
import { storyContextIdentifierProviderFactory } from '@atlaskit/editor-test-helpers/context-identifier-provider';
import { extensionHandlers } from '@atlaskit/editor-test-helpers/extensions';
import { storyMediaProviderFactory } from '@atlaskit/editor-test-helpers/media-provider';
import { customInsertMenuItems } from '@atlaskit/editor-test-helpers/mock-insert-menu';
import { macroProvider } from '@atlaskit/editor-test-helpers/mock-macro-provider';
import { exampleMediaFeatureFlags } from '@atlaskit/media-test-helpers/exampleMediaFeatureFlags';
import { combineExtensionProviders } from '@atlaskit/editor-common/extensions';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import type { Providers } from '@atlaskit/editor-common/provider-factory';

// import { tablesPlugin } from '@atlaskit/editor-plugin-table';

import { getExampleExtensionProviders } from '../example-helpers/get-example-extension-providers';
import {
  TTI_SEVERITY_THRESHOLD_DEFAULTS,
  TTI_FROM_INVOCATION_SEVERITY_THRESHOLD_DEFAULTS,
} from '@atlaskit/editor-common/utils';

import { SmartCardProvider, CardClient } from '@atlaskit/link-provider';

import {
  currentUser,
  getEmojiProvider,
} from '@atlaskit/util-data-test/get-emoji-provider';
import { getMockTaskDecisionResource } from '@atlaskit/util-data-test/task-decision-story-data';
import { simpleMockProfilecardClient } from '@atlaskit/util-data-test/get-mock-profilecard-client';

import { Editor } from './../src';
import type {
  EditorProps,
  // EditorPlugin,
} from './../src/editor';
import EditorContext from './../src/ui/EditorContext';
import WithEditorActions from './../src/ui/WithEditorActions';
import { fromLocation, encode, amend, check } from '../example-helpers/adf-url';
import * as FeatureFlagUrl from '../example-helpers/feature-flag-url';
import { copy } from '../example-helpers/copy';
import quickInsertProviderFactory from '../example-helpers/quick-insert-provider';
import { DevTools } from '../example-helpers/DevTools';
import { TitleInput } from '../example-helpers/PageElements';
import type { EditorActions } from './../src';
import type { PanelPluginConfig } from '@atlaskit/editor-plugin-panel';
import {
  PROSEMIRROR_RENDERED_NORMAL_SEVERITY_THRESHOLD,
  PROSEMIRROR_RENDERED_DEGRADED_SEVERITY_THRESHOLD,
} from '../src/create-editor/consts';
import BreadcrumbsMiscActions from '../example-helpers/breadcrumbs-misc-actions';
import {
  DEFAULT_MODE,
  LOCALSTORAGE_defaultMode,
} from '../example-helpers/example-constants';
import type {
  ExampleProps,
  EditorState,
  ExampleRendererProps,
  ExampleEditorProps,
} from '../example-helpers/full-page/types';
import { ReactRenderer } from '@atlaskit/renderer';
import { addGlobalEventEmitterListeners } from '@atlaskit/media-test-helpers/globalEventEmitterListeners';
import {
  isMediaMockOptedIn,
  mediaMock,
} from '@atlaskit/media-test-helpers/media-mock';
import type { MediaFeatureFlags } from '@atlaskit/media-common';
import { usePresetContext } from '../src/presets/context';
import type { OptionalPlugin } from '@atlaskit/editor-common/types';
import type { ExtensionPlugin } from '@atlaskit/editor-plugin-extension';

const BROWSER_FREEZE_NORMAL_SEVERITY_THRESHOLD = 2000;
const BROWSER_FREEZE_DEGRADED_SEVERITY_THRESHOLD = 3000;
// const tableOptions = {
//   advanced: true,
//   allowColumnSorting: true,
//   stickyHeaders: true,
//   allowCollapse: true,
//   allowDistributeColumns: true,
//   permittedLayouts: 'all' as any,
// };

// TODO: restore when using new table plugin in editor-core
// Plugins must be created outside
// let moduleTablePlugin: EditorPlugin | undefined;
// const __getFullPageDangerouslyAppendedPlugins = (
//   props: EditorProps,
// ): EditorPlugin[] => {
//   const tablePlugin =
//     moduleTablePlugin ||
//     tablesPlugin({
//       tableOptions,
//       breakoutEnabled: props.appearance === 'full-page',
//       allowContextualMenu: false,
//       fullWidthEnabled: props.appearance === 'full-width',
//       // wasFullWidthEnabled: prevProps && prevProps.appearance === 'full-width',
//     });
//   moduleTablePlugin = tablePlugin;
//   return [tablePlugin];
// };

addGlobalEventEmitterListeners();
if (isMediaMockOptedIn()) {
  mediaMock.enable();
}

/**
 * +-------------------------------+
 * + [Editor core v] [Full page v] +  48px height
 * +-------------------------------+
 * +                               +  16px padding-top
 * +            Content            +
 * +                               +  16px padding-bottom
 * +-------------------------------+  ----
 *                                    80px - 48px (Outside of iframe)
 *
 */
export const wrapper: any = css`
  box-sizing: border-box;
  height: 100%;
`;

export const content: any = css`
  padding: 0;
  height: 100%;
  box-sizing: border-box;
`;

// eslint-disable-next-line no-console
const SAVE_ACTION = () => console.log('Save');

const defaultMediaFeatureFlags: MediaFeatureFlags = {
  ...exampleMediaFeatureFlags,
  mediaInline: true,
};

export const LOCALSTORAGE_defaultDocKey = 'fabric.editor.example.full-page';
export const LOCALSTORAGE_defaultTitleKey =
  'fabric.editor.example.full-page.title';

export const saveChanges =
  ({
    editorActions,
    setMode,
  }: {
    editorActions?: EditorActions;
    setMode?: (mode: boolean) => void;
  }) =>
  async () => {
    if (!editorActions) {
      return;
    }

    const value = await editorActions.getValue();

    // eslint-disable-next-line no-console
    console.log(value);

    localStorage.setItem(LOCALSTORAGE_defaultDocKey, JSON.stringify(value));
    if (setMode) {
      setMode(false);
    }
  };

export const SaveAndCancelButtons = (props: {
  editorActions?: EditorActions;
  setMode?: (mode: boolean) => void;
}) => (
  <ButtonGroup>
    <Button
      tabIndex={-1}
      appearance="primary"
      onClick={saveChanges(props)}
      testId="publish-button"
    >
      Publish
    </Button>

    <Button
      tabIndex={-1}
      appearance="subtle"
      onClick={() => {
        if (!props.editorActions) {
          return;
        }
        props.editorActions.clear();
        localStorage.removeItem(LOCALSTORAGE_defaultDocKey);
        localStorage.removeItem(LOCALSTORAGE_defaultTitleKey);
      }}
      testId="close-button"
    >
      Close
    </Button>
  </ButtonGroup>
);

const searchProvider = createSearchProvider(
  'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
  Scope.ConfluencePageBlog,
  'https://api-private.stg.atlassian.com/gateway/api/xpsearch-aggregator',
);

export const getProviders = (): Partial<Providers> => ({
  emojiProvider: getEmojiProvider({
    uploadSupported: true,
    currentUser,
  }),
  mentionProvider: Promise.resolve(mentionResourceProvider),
  taskDecisionProvider: Promise.resolve(getMockTaskDecisionResource()),
  contextIdentifierProvider: storyContextIdentifierProviderFactory(),
  activityProvider: Promise.resolve(new MockActivityResource()),
  searchProvider: Promise.resolve(searchProvider),
  macroProvider: Promise.resolve(macroProvider),
  autoformattingProvider: Promise.resolve(autoformattingProvider),
});

export const mediaProvider = storyMediaProviderFactory();

export const quickInsertProvider = quickInsertProviderFactory();

export const getAppearance = (): 'full-page' | 'full-width' => {
  return (localStorage.getItem(LOCALSTORAGE_defaultMode) || DEFAULT_MODE) ===
    DEFAULT_MODE
    ? 'full-page'
    : 'full-width';
};

const smartCardClient = new CardClient('staging');
export class ExampleEditorComponent extends React.Component<
  ExampleEditorProps,
  EditorState
> {
  state: EditorState = {
    disabled: true,
    title: localStorage.getItem(LOCALSTORAGE_defaultTitleKey) || '',
    appearance: this.props.editorProps.appearance || getAppearance(),
  };

  private startTime: number = 0;
  private editorActions: EditorActions | null = null;
  private providers = getProviders();

  UNSAFE_componentWillMount() {
    this.startTime = new Date().getTime();
  }

  componentDidMount() {
    // This is to simulate a scenario where the consumer may try to call `focus` on mount
    // We would prefer to notice any issues with this in development rather than in product.
    if (this.editorActions) {
      this.editorActions.focus();
    }

    // eslint-disable-next-line no-console
    console.log(`To try the macro paste handler, paste one of the following links:

  www.dumbmacro.com?paramA=CFE
  www.smartmacro.com?paramB=CFE
    `);
  }

  componentDidUpdate(prevProps: ExampleEditorProps) {
    if (
      prevProps.editorProps.appearance !== this.props.editorProps.appearance
    ) {
      this.setState(() => ({
        appearance: this.props.editorProps.appearance || 'full-page',
      }));
    }

    if (
      prevProps.editorProps.defaultValue !== this.props.editorProps.defaultValue
    ) {
      this.editorActions?.replaceDocument(
        this.props.editorProps.defaultValue,
        false,
      );
    }
  }

  onEditorReady = (editorActions: EditorActions) => {
    const timeTaken = new Date().getTime() - this.startTime;
    console.log('Editor init time', timeTaken, 'ms');

    if (this.props.onExampleEditorReady) {
      this.props.onExampleEditorReady(editorActions, timeTaken);
    }

    (window as any).__editorView = editorActions._privateGetEditorView();
  };

  onCopyLinkWithContent = async () => {
    if (!this.editorActions) {
      return;
    }

    const value = await this.editorActions.getValue();
    if (!value) {
      return;
    }

    const encoded = encode(value);
    const url = amend(window.parent.location, encoded);

    window.parent.history.pushState(value, window.parent.document.title, url);
    copy(url);

    const warning = check(url);

    if (warning) {
      this.setState({
        warning,
      });
    }
  };

  render() {
    const { editorProps } = this.props;
    const { media } = editorProps;
    const mediaEditorProps = media
      ? media.featureFlags
      : defaultMediaFeatureFlags;
    return (
      <ExamplesErrorBoundary>
        <div css={wrapper}>
          <div css={content}>
            <SmartCardProvider client={smartCardClient}>
              <Editor
                allowUndoRedoButtons={true}
                allowBorderMark={true}
                allowAnalyticsGASV3={true}
                quickInsert={{ provider: Promise.resolve(quickInsertProvider) }}
                allowTextColor={true}
                allowTables={{
                  advanced: true,
                  allowColumnSorting: true,
                  stickyHeaders: true,
                  allowCollapse: true,
                  allowDistributeColumns: true,
                }}
                // allowTables={false}
                allowBreakout={true}
                allowJiraIssue={true}
                allowPanel
                allowExtension={{
                  allowBreakout: true,
                }}
                allowRule={true}
                allowDate={true}
                allowLayouts={{
                  allowBreakout: true,
                  UNSAFE_addSidebarLayouts: true,
                  UNSAFE_allowSingleColumnLayout: true,
                }}
                allowTextAlignment={true}
                allowIndentation={true}
                allowTemplatePlaceholders={{ allowInserting: true }}
                smartLinks={{
                  provider: Promise.resolve(cardProviderStaging),
                  allowBlockCards: true,
                  allowEmbeds: true,
                  allowResizing: true,
                  useAlternativePreloader: false,
                }}
                allowExpand={{
                  allowInsertion: true,
                  allowInteractiveExpand: true,
                }}
                waitForMediaUpload={true}
                allowStatus={true}
                allowFindReplace={{
                  allowMatchCase: true,
                }}
                allowNestedTasks
                codeBlock={{
                  allowCopyToClipboard: true,
                  appearance: this.state.appearance,
                }}
                {...this.providers}
                media={{
                  provider: mediaProvider,
                  allowMediaSingle: true,
                  allowResizing: true,
                  allowLinking: true,
                  allowResizingInTables: true,
                  allowAltTextOnImages: true,
                  altTextValidator: (value: string) => {
                    const errors = [];
                    if (!/^[A-Z]/g.test(value)) {
                      errors.push('Please start with capital letter.');
                    }
                    if (!/^[^"<>&\\]*$/g.test(value)) {
                      errors.push('Please remove special characters.');
                    }
                    if (!/(\w.+\s).+/g.test(value)) {
                      errors.push('Please use at least two words.');
                    }
                    return errors;
                  },
                  allowCaptions: true,
                  featureFlags: mediaEditorProps,
                }}
                allowHelpDialog
                placeholder="Use markdown shortcuts to format your page as you type, like * for lists, # for headers, and *** for a horizontal rule."
                placeholderBracketHint="Did you mean to use '/' to insert content?"
                shouldFocus={true}
                disabled={this.state.disabled}
                defaultValue={
                  (localStorage &&
                    localStorage.getItem(LOCALSTORAGE_defaultDocKey)) ||
                  undefined
                }
                contentComponents={
                  <WithEditorActions
                    render={(actions) => (
                      <Fragment>
                        <BreadcrumbsMiscActions
                          appearance={this.state.appearance}
                          onFullWidthChange={this.setFullWidthMode}
                        />
                        <TitleInput
                          value={this.state.title}
                          onChange={this.handleTitleChange}
                          innerRef={this.handleTitleRef}
                          onFocus={this.handleTitleOnFocus}
                          onBlur={this.handleTitleOnBlur}
                          onKeyDown={(e: React.KeyboardEvent) => {
                            this.onKeyPressed(e, actions);
                          }}
                        />
                      </Fragment>
                    )}
                  />
                }
                primaryToolbarComponents={[
                  <WithEditorActions
                    key={1}
                    render={(actions) => {
                      this.editorActions = actions;

                      return (
                        <Fragment>
                          {this.props.customPrimaryToolbarComponents}
                          <Button
                            isDisabled={!actions}
                            onClick={this.onCopyLinkWithContent}
                            style={{ marginRight: 5 }}
                          >
                            Copy link
                          </Button>
                          <SaveAndCancelButtons
                            editorActions={actions}
                            setMode={this.props.setMode}
                          />
                        </Fragment>
                      );
                    }}
                  />,
                ]}
                primaryToolbarIconBefore={
                  <Button
                    iconBefore={<AtlassianIcon />}
                    appearance="subtle"
                    shouldFitContainer
                  ></Button>
                }
                onSave={SAVE_ACTION}
                insertMenuItems={customInsertMenuItems}
                extensionHandlers={extensionHandlers}
                performanceTracking={{
                  ttiTracking: {
                    enabled: true,
                    trackSeverity: true,
                    ttiSeverityNormalThreshold:
                      TTI_SEVERITY_THRESHOLD_DEFAULTS.NORMAL,
                    ttiSeverityDegradedThreshold:
                      TTI_SEVERITY_THRESHOLD_DEFAULTS.DEGRADED,
                    ttiFromInvocationSeverityNormalThreshold:
                      TTI_FROM_INVOCATION_SEVERITY_THRESHOLD_DEFAULTS.NORMAL,
                    ttiFromInvocationSeverityDegradedThreshold:
                      TTI_FROM_INVOCATION_SEVERITY_THRESHOLD_DEFAULTS.DEGRADED,
                  },
                  transactionTracking: { enabled: true },
                  uiTracking: { enabled: true },
                  nodeViewTracking: { enabled: true },
                  inputTracking: {
                    enabled: true,
                    countNodes: true,
                    trackSingleKeypress: true,
                    trackRenderingTime: true,
                  },
                  bFreezeTracking: {
                    trackInteractionType: true,
                    trackSeverity: true,
                    severityNormalThreshold:
                      BROWSER_FREEZE_NORMAL_SEVERITY_THRESHOLD,
                    severityDegradedThreshold:
                      BROWSER_FREEZE_DEGRADED_SEVERITY_THRESHOLD,
                  },
                  proseMirrorRenderedTracking: {
                    trackSeverity: true,
                    severityNormalThreshold:
                      PROSEMIRROR_RENDERED_NORMAL_SEVERITY_THRESHOLD,
                    severityDegradedThreshold:
                      PROSEMIRROR_RENDERED_DEGRADED_SEVERITY_THRESHOLD,
                  },
                  contentRetrievalTracking: {
                    enabled: true,
                    successSamplingRate: 2,
                    failureSamplingRate: 1,
                    reportErrorStack: true,
                  },
                  onEditorReadyCallbackTracking: { enabled: true },
                  pasteTracking: { enabled: true },
                  renderTracking: {
                    editor: {
                      enabled: true,
                      useShallow: false,
                    },
                    reactEditorView: {
                      enabled: true,
                      useShallow: false,
                    },
                  },
                }}
                {...editorProps}
                featureFlags={{
                  ...editorProps.featureFlags,
                  // Enabling to catch during dev by default
                  'safer-dispatched-transactions': true,
                }}
                appearance={this.state.appearance}
                onEditorReady={this.onEditorReady}
                trackValidTransactions={{ samplingRate: 100 }}
                // dangerouslyAppendPlugins={{
                //   __plugins: [
                //     ...(this.props.dangerouslyAppendPlugins?.__plugins || []),
                //     ...__getFullPageDangerouslyAppendedPlugins({
                //       ...this.props,
                //       appearance: this.state.appearance,
                //     }),
                //   ],
                // }}
              />
            </SmartCardProvider>
          </div>
          {this.state.warning && (
            <div
              style={{
                position: 'fixed',
                top: 90,
                right: 15,
                width: 400,
                zIndex: 100,
              }}
            >
              <Flag
                actions={[
                  {
                    content: 'Sure',
                    onClick: () => this.setState({ warning: undefined }),
                  },
                ]}
                appearance="warning"
                description={this.state.warning.message}
                icon={<Warning label="Heads up!" />}
                title={this.state.warning.title}
                id="warning"
              />
            </div>
          )}
        </div>
      </ExamplesErrorBoundary>
    );
  }
  private onKeyPressed = (e: React.KeyboardEvent, actions: EditorActions) => {
    if ((e.key === 'Tab' && !e.shiftKey) || e.key === 'Enter') {
      // Move to the editor view
      const target = e.currentTarget as HTMLInputElement;
      target.blur();
      e.preventDefault();
      actions.focus();
      return false;
    }
    return;
  };

  private handleTitleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const title = (e.target as HTMLInputElement).value;
    this.setState({
      title,
    });

    if (this.props.onTitleChange) {
      this.props.onTitleChange(title);
    }
  };

  private handleTitleOnFocus = () => this.setState({ disabled: false });
  private handleTitleOnBlur = () => this.setState({ disabled: false });
  private handleTitleRef = (ref?: HTMLElement) => {
    if (ref) {
      ref.focus();
    }
  };

  private setFullWidthMode = (fullWidthMode: boolean) => {
    this.setState({ appearance: fullWidthMode ? 'full-width' : 'full-page' });
  };
}

export const ExampleEditor = ExampleEditorComponent;

const Renderer = (props: ExampleRendererProps) => {
  const emojiProvider = getEmojiProvider();
  const mentionProvider = Promise.resolve(mentionResourceProvider);
  const MockProfileClient: any = simpleMockProfilecardClient();
  const profilecardProvider = Promise.resolve({
    cloudId: 'DUMMY-CLOUDID',
    resourceClient: MockProfileClient,
    getActions: (id: string) => {
      const actions = [
        {
          label: 'Mention',
          callback: () => console.log('profile-card:mention'),
        },
        {
          label: 'Message',
          callback: () => console.log('profile-card:message'),
        },
      ];

      return id === '1' ? actions : actions.slice(0, 1);
    },
  });
  const taskDecisionProvider = Promise.resolve(getMockTaskDecisionResource());
  const contextIdentifierProvider = storyContextIdentifierProviderFactory();

  const providerFactory = ProviderFactory.create({
    mentionProvider,
    mediaProvider,
    emojiProvider,
    profilecardProvider,
    taskDecisionProvider,
    contextIdentifierProvider,
  });

  if (props.extensionProviders && props.extensionProviders.length > 0) {
    providerFactory.setProvider(
      'extensionProvider',
      Promise.resolve(combineExtensionProviders(props.extensionProviders)),
    );
  }

  const document = !props.document
    ? undefined
    : typeof props.document === 'string'
    ? JSON.parse(props.document)
    : props.document;

  const mediaFeatureFlags = props.mediaFeatureFlags
    ? props.mediaFeatureFlags
    : defaultMediaFeatureFlags;

  return (
    <div
      style={{
        margin: '30px 0',
      }}
    >
      <Button
        appearance="primary"
        onClick={() => props.setMode(true)}
        style={{
          position: 'absolute',
          right: '0',
          margin: '0 20px',
          zIndex: 100,
        }}
        testId="edit-button"
      >
        Edit
      </Button>
      <SmartCardProvider client={smartCardClient}>
        <IntlProvider locale="en">
          <ReactRenderer
            allowHeadingAnchorLinks
            allowAltTextOnImages
            allowColumnSorting
            adfStage="stage0"
            dataProviders={providerFactory}
            extensionHandlers={extensionHandlers}
            document={document}
            appearance={getAppearance()}
            stickyHeaders={{ offsetTop: 0 }}
            media={{
              featureFlags: mediaFeatureFlags,
            }}
            allowCustomPanels={props.allowCustomPanel}
            eventHandlers={{
              onUnhandledClick: props.clickToEdit
                ? (e) => {
                    console.log('onUnhandledClick called');
                    props.setMode(true);
                  }
                : undefined,
            }}
          />
        </IntlProvider>
      </SmartCardProvider>
    </div>
  );
};

export function FullPageExample(props: ExampleProps) {
  const { editorProps = {} } = props;
  const [isEditingMode, setMode] = React.useState(true);

  const maybeDoc =
    editorProps.defaultValue || fromLocation<object>(window.parent.location);
  const doc = maybeDoc instanceof window.Error ? undefined : maybeDoc;
  const localDraft =
    (localStorage && localStorage.getItem(LOCALSTORAGE_defaultDocKey)) ||
    undefined;

  const maybeFlags = FeatureFlagUrl.fromLocation<string>(
    window.parent.location,
  );

  const defaultFeatureFlags = {
    maxUnsafeChromeSpellcheckingVersion: 100,
  };

  const featureFlags =
    editorProps.featureFlags ||
    (!maybeFlags || maybeFlags instanceof window.Error
      ? defaultFeatureFlags
      : JSON.parse(maybeFlags ?? '{}'));

  let allowCustomPanel = false;
  if (editorProps.allowPanel && typeof editorProps.allowPanel === 'object') {
    allowCustomPanel =
      (editorProps.allowPanel as PanelPluginConfig).allowCustomPanel || false;
  }

  const { media } = editorProps;
  const mediaProps = media?.featureFlags
    ? media.featureFlags
    : defaultMediaFeatureFlags;
  type StackPlugins = [OptionalPlugin<ExtensionPlugin>];
  const editorApi = usePresetContext<StackPlugins>();
  const passedEditorProps: EditorProps = {
    ...editorProps,
    extensionProviders: (editorActions?: EditorActions) => [
      getExampleExtensionProviders(editorApi, editorActions),
    ],
    allowExtension: {
      allowAutoSave: true,
      allowExtendFloatingToolbars: true,
    },
    allowFragmentMark: true,
    insertMenuItems: [],
    featureFlags,
    defaultValue: doc || localDraft,
  };

  return (
    <EditorContext>
      <div style={{ height: '100%' }}>
        <DevTools />
        {isEditingMode ? (
          <ExampleEditor
            editorProps={passedEditorProps}
            onExampleEditorReady={props.onExampleEditorReady}
            onTitleChange={props.onTitleChange}
            setMode={setMode}
            customPrimaryToolbarComponents={
              props.customPrimaryToolbarComponents
            }
          />
        ) : (
          <div style={{ padding: '16px 32px' }}>
            <Renderer
              document={localDraft || doc}
              setMode={setMode}
              extensionProviders={
                typeof editorProps.extensionProviders === 'function'
                  ? editorProps.extensionProviders()
                  : editorProps.extensionProviders
              }
              allowCustomPanel={allowCustomPanel}
              clickToEdit={props.clickToEdit}
              mediaFeatureFlags={mediaProps}
            />
          </div>
        )}
      </div>
    </EditorContext>
  );
}

export default FullPageExample;
