import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { PluginKey } from 'prosemirror-state';
import { confluenceJiraIssue } from '@atlaskit/adf-schema';
import { NextEditorPlugin, PMPluginFactory } from '../../types';
import { ReactNodeView } from '../../nodeviews';
import ReactJIRAIssueNode from './nodeviews/jira-issue';

export const pluginKey = new PluginKey('jiraIssuePlugin');

const createPlugin: PMPluginFactory = ({
  portalProviderAPI,
  eventDispatcher,
}) => {
  return new SafePlugin({
    key: pluginKey,
    props: {
      nodeViews: {
        confluenceJiraIssue: ReactNodeView.fromComponent(
          ReactJIRAIssueNode,
          portalProviderAPI,
          eventDispatcher,
        ),
      },
    },
  });
};

const jiraIssuePlugin: NextEditorPlugin<'confluenceJiraIssue'> = () => ({
  name: 'confluenceJiraIssue',

  nodes() {
    return [{ name: 'confluenceJiraIssue', node: confluenceJiraIssue }];
  },

  pmPlugins() {
    return [
      {
        name: 'jiraIssue',
        plugin: createPlugin,
      },
    ];
  },
});

export default jiraIssuePlugin;
