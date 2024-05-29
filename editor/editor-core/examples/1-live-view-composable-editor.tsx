import React from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import type { EditorAppearance } from '@atlaskit/editor-common/types';
import { ComposableEditor } from '@atlaskit/editor-core/composable-editor';
import { EditorContext } from '@atlaskit/editor-core/editor-context';
import { useUniversalPreset } from '@atlaskit/editor-core/preset-universal';
import { usePreset } from '@atlaskit/editor-core/use-preset';
import { editorViewModePlugin } from '@atlaskit/editor-plugin-editor-viewmode';
import { selectionMarkerPlugin } from '@atlaskit/editor-plugin-selection-marker';
import { ConfluenceCardClient } from '@atlaskit/editor-test-helpers/confluence-card-client';
import { ConfluenceCardProvider } from '@atlaskit/editor-test-helpers/confluence-card-provider';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';
import { Provider as SmartCardProvider } from '@atlaskit/smart-card';
import { simpleMockProfilecardClient } from '@atlaskit/util-data-test/get-mock-profilecard-client';
import { mentionResourceProvider } from '@atlaskit/util-data-test/mention-story-data';

import { EditorExampleControls } from '../example-helpers/full-page/editor-example-controls';
import type { EditorActions } from '../src';
import WithEditorActions from '../src/ui/WithEditorActions';

const smartLinksProvider = new ConfluenceCardProvider('staging');
const smartCardClient = new ConfluenceCardClient('staging');

const EXAMPLE_NAME = 'live-view-composable-editor';

const MockProfileClient: any = simpleMockProfilecardClient();

const SaveAndCancelButtons = (props: { editorActions: EditorActions }) => {
  const onClickPublish = () => {
    props.editorActions.getResolvedEditorState().then((value) => {
      if (value?.content) {
        localStorage.setItem(
          `${EXAMPLE_NAME}-doc`,
          JSON.stringify(value.content),
        );
      }
    });
  };

  return (
    <ButtonGroup>
      <Button appearance="primary" onClick={onClickPublish}>
        Publish
      </Button>
      <Button appearance="subtle" onClick={() => props.editorActions.clear()}>
        Close
      </Button>
    </ButtonGroup>
  );
};

function getDefaultValue() {
  const doc = localStorage.getItem(`${EXAMPLE_NAME}-doc`);
  return doc ? JSON.parse(doc) : '';
}

function ComposableEditorPage() {
  // [ED-22843] this feature flag is for testing purposes only
  // eslint-disable-next-line @atlaskit/platform/ensure-feature-flag-prefix
  const isLiveViewToggled = getBooleanFF('__live-view-toggle') ? true : false;
  const [appearance, setAppearance] =
    React.useState<EditorAppearance>('full-page');
  const [isViewMode, setIsViewMode] = React.useState(false);

  const universalPreset = useUniversalPreset({
    props: {
      appearance,
      mentionProvider: Promise.resolve(mentionResourceProvider),
      mention: {
        profilecardProvider: Promise.resolve({
          cloudId: 'DUMMY-CLOUDID',
          resourceClient: MockProfileClient,
          getActions: (id: string) => {
            const actions = [
              {
                label: 'Mention',
                callback: () => {},
              },
              {
                label: 'Message',
                callback: () => {},
              },
            ];

            return id === '1' ? actions : actions.slice(0, 1);
          },
        }),
      },
      allowStatus: true,
      allowTasksAndDecisions: true,
      allowAnalyticsGASV3: true,
      allowExpand: {
        allowInsertion: true,
        allowInteractiveExpand: true,
      },
      allowFragmentMark: true,
      allowExtension: {
        allowExtendFloatingToolbars: true,
      },
      allowBreakout: true,
      allowLayouts: { allowBreakout: true },
      allowTables: {
        advanced: true,
        stickyHeaders: true
      },
      allowDate: true,
      allowRule: true,
      allowPanel: { allowCustomPanel: true, allowCustomPanelEdit: true },
      allowFindReplace: true,
      media: {
        allowMediaSingle: true,
        allowCaptions: true,
      },
      elementBrowser: {
        showModal: true,
        replacePlusMenu: true,
      },
      linking: {
        // Currently there is an issue with the linking prop for presets so the provider
        // needs to be passed through the Composable Editor component
        smartLinks: {
          allowBlockCards: true,
          allowEmbeds: true,
          allowResizing: true,
        },
      },
      __livePage: isLiveViewToggled,
      defaultValue: getDefaultValue(),
    },
  });

  // Memoise the preset otherwise we will re-render the editor too often
  const { preset, editorApi } = usePreset(() => {
    return universalPreset
      .add([editorViewModePlugin, { mode: isViewMode ? 'view' : 'edit' }])
      .add(selectionMarkerPlugin);
    // The only things that cause a re-creation of the preset is something in the
    // universal preset to be consistent with current behaviour (ie. this could
    // be a page width change via the `appearance` prop).
  }, [universalPreset, isViewMode]);

  const onDocumentChanged = (adf: any) => {
    if (adf?.state?.doc) {
      localStorage.setItem(
        `${EXAMPLE_NAME}-doc`,
        JSON.stringify(adf?.state?.doc),
      );
    }
  };

  React.useEffect(() => {
    if (!isLiveViewToggled) {
      return;
    }
    editorApi?.core?.actions.execute(
      editorApi?.editorViewMode?.commands.updateViewMode(
        isViewMode ? 'view' : 'edit',
      ),
    );
  }, [
    editorApi?.core?.actions,
    editorApi?.editorViewMode?.commands,
    isLiveViewToggled,
    isViewMode,
  ]);

  return (
    <SmartCardProvider client={smartCardClient}>
      <EditorExampleControls
        appearance={appearance}
        onFullWidthChange={() => {
          if (appearance === 'full-page') {
            setAppearance('full-width');
          } else if (appearance === 'full-width') {
            setAppearance('full-page');
          }
        }}
        onViewMode={() => {
          setIsViewMode(!isViewMode);
        }}
      />
      <ComposableEditor
        appearance={appearance}
        preset={preset}
        defaultValue={getDefaultValue()}
        linking={{
          smartLinks: {
            provider: Promise.resolve(smartLinksProvider),
          },
        }}
        onChange={(adf) => onDocumentChanged(adf)}
        mentionProvider={Promise.resolve(mentionResourceProvider)}
        primaryToolbarComponents={
          isLiveViewToggled ? (
            <></>
          ) : (
            <WithEditorActions
              render={(actions) => (
                <SaveAndCancelButtons editorActions={actions} />
              )}
            />
          )
        }
      />
    </SmartCardProvider>
  );
}

export default function ComposableEditorPageWrapper() {
  return (
    <>
      <EditorContext>
        <ComposableEditorPage />
      </EditorContext>
    </>
  );
}
