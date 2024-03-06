/* eslint-disable no-console */

import React from 'react';

import { IntlProvider } from 'react-intl-next';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import { token } from '@atlaskit/tokens';

import ToolsDrawer from '../example-helpers/ToolsDrawer';
import { name, version } from '../package.json';
import { Editor } from '../src';
import CollapsedEditor from '../src/ui/CollapsedEditor';
import EditorContext from '../src/ui/EditorContext';
import ToolbarFeedback from '../src/ui/ToolbarFeedback';
import ToolbarHelp from '../src/ui/ToolbarHelp';
import WithEditorActions from '../src/ui/WithEditorActions';

const SAVE_ACTION = () => console.log('Save');
const CANCEL_ACTION = () => console.log('Cancel');
const EXPAND_ACTION = () => console.log('Expand');

const exampleDocument = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Some example document with emojis ' },
        {
          type: 'emoji',
          attrs: {
            shortName: ':catchemall:',
            id: 'atlassian-catchemall',
            text: ':catchemall:',
          },
        },
        { type: 'text', text: ' and mentions ' },
        {
          type: 'mention',
          attrs: { id: '0', text: '@Carolyn', accessLevel: '' },
        },
        { type: 'text', text: '. ' },
      ],
    },
  ],
};

export type Props = {};
export type State = {
  hasJquery?: boolean;
  isExpanded?: boolean;
};

export default class EditorWithFeedback extends React.Component<Props, State> {
  state = {
    hasJquery: false,
    isExpanded: true,
  };

  componentDidMount() {
    delete window.jQuery;
    this.loadJquery();
  }

  onFocus = () =>
    this.setState((prevState) => ({ isExpanded: !prevState.isExpanded }));

  render() {
    if (!this.state.hasJquery) {
      return <h3>Please wait, loading jQuery ...</h3>;
    }

    return (
      <IntlProvider locale="en">
        <EditorContext>
          <div>
            <WithEditorActions
              render={(actions) => (
                <ButtonGroup>
                  <Button
                    onClick={() => actions.replaceDocument(exampleDocument)}
                  >
                    Load Document
                  </Button>
                  <Button onClick={() => actions.clear()}>Clear</Button>
                </ButtonGroup>
              )}
            />
            <ToolsDrawer
              imageUploadProvider="resolved"
              renderEditor={({
                mentionProvider,
                emojiProvider,
                imageUploadProvider,
                onChange,
                disabled,
                contextIdentifierProvider,
              }: any) => (
                <div style={{ padding: token('space.250', '20px') }}>
                  <CollapsedEditor
                    placeholder="What do you want to say?"
                    isExpanded={this.state.isExpanded}
                    onFocus={this.onFocus}
                    onExpand={EXPAND_ACTION}
                  >
                    <Editor
                      appearance="comment"
                      allowAnalyticsGASV3={true}
                      allowTables={{
                        isHeaderRowRequired: true,
                      }}
                      textFormatting={{
                        disableSuperscriptAndSubscript: true,
                        disableUnderline: true,
                      }}
                      allowHelpDialog={true}
                      disabled={disabled}
                      mentionProvider={mentionProvider}
                      emojiProvider={emojiProvider}
                      legacyImageUploadProvider={imageUploadProvider}
                      contextIdentifierProvider={contextIdentifierProvider}
                      shouldFocus={true}
                      onChange={onChange}
                      onSave={SAVE_ACTION}
                      onCancel={CANCEL_ACTION}
                      quickInsert={true}
                      feedbackInfo={{
                        product: 'bitbucket',
                        packageVersion: version,
                        packageName: name,
                        labels: ['atlaskit-comment-bitbucket'],
                      }}
                      primaryToolbarComponents={[
                        <ToolbarFeedback
                          product="bitbucket"
                          key="toolbar-feedback"
                        />,
                        <ToolbarHelp key="toolbar-help" />,
                      ]}
                    />
                  </CollapsedEditor>
                </div>
              )}
            />
          </div>
        </EditorContext>
      </IntlProvider>
    );
  }

  private loadJquery = () => {
    const scriptElem = document.createElement('script');
    scriptElem.type = 'text/javascript';
    scriptElem.src =
      'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';

    scriptElem.onload = () => {
      this.setState({
        ...this.state,
        hasJquery: true,
      });
    };

    document.body.appendChild(scriptElem);
  };
}
