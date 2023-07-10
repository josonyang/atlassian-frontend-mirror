import { JsonLd } from 'json-ld-types';

import { CONFLUENCE_GENERATOR_ID, JIRA_GENERATOR_ID } from '../../constants';

import extractDocumentTypeIcon from './extract-document-type-icon';
import extractFileFormatIcon from './extract-file-formatIcon';
import extractJiraTaskIcon from './extract-jira-task-icon';
import extractProviderIcon from './extract-provider-icon';
import extractUrlIcon from './extract-url-icon';
import { IconDescriptor } from './types';
import { extractTaskType } from '../../common/lozenge';
import { extractTitle } from '@atlaskit/link-extractors';
import { extractorPriorityMap as priorityMap } from '../../common/icon/priority';
import { IconType } from '../../../constants';

const extractTask = (data: JsonLd.Data.Task, label?: string) => {
  const { id, icon: url } = extractTaskType(data as JsonLd.Data.Task) || {};
  const taskType = id?.split('#').pop();
  const taskIcon = url ? { label, url } : undefined;
  return { taskType, taskIcon };
};

const extractType = (jsonLd: JsonLd.Data.BaseData): string => {
  const type = jsonLd['@type'];
  return Array.isArray(type)
    ? type.sort((a, b) => priorityMap[b] - priorityMap[a])[0]
    : type;
};

const isConfluenceProvider = (provider?: string) =>
  provider === CONFLUENCE_GENERATOR_ID;

const isJiraProvider = (provider?: string) => provider === JIRA_GENERATOR_ID;

const isNativeProvider = (provider?: string) =>
  isConfluenceProvider(provider) || isJiraProvider(provider);

const extractJsonldDataIcon = (
  data: JsonLd.Data.BaseData,
): IconDescriptor | undefined => {
  const generator = data.generator as JsonLd.Primitives.Object;
  const label = extractTitle(data);
  const type = extractType(data);
  const urlIcon = extractUrlIcon(data.icon, label);
  const provider = generator?.['@id'];
  const providerIcon = extractProviderIcon(data);

  switch (type) {
    case 'Document':
    case 'schema:BlogPosting':
    case 'schema:DigitalDocument':
    case 'schema:TextDigitalDocument':
    case 'schema:PresentationDigitalDocument':
    case 'schema:SpreadsheetDigitalDocument':
    case 'atlassian:Template':
    case 'atlassian:UndefinedLink':
      // If we encounter a native provider, we privilege the
      // icon generated by its mime type and document type.
      // Otherwise, we privilege the provider icon,
      // followed by mime type and document type icon.
      const documentData = data as JsonLd.Data.Document;
      const fileFormat = documentData?.['schema:fileFormat'];
      const fileFormatIcon = extractFileFormatIcon(fileFormat);
      const documentTypeIcon = extractDocumentTypeIcon(type, label);
      return isNativeProvider(provider)
        ? fileFormatIcon || documentTypeIcon || providerIcon
        : providerIcon || fileFormatIcon || documentTypeIcon;
    case 'atlassian:Task':
      const taskLabel = label || 'Task';
      if (isJiraProvider(provider)) {
        const { taskType, taskIcon } = extractTask(data as JsonLd.Data.Task);
        return taskType === 'JiraCustomTaskType'
          ? taskIcon ||
              urlIcon ||
              providerIcon || { icon: IconType.Task, label: taskLabel }
          : extractJiraTaskIcon(taskType, taskLabel);
      }
      return { icon: IconType.Task, label: taskLabel };
    case 'atlassian:Goal':
      return urlIcon || { icon: IconType.Task, label: label || 'Goal' };
    case 'atlassian:Project':
      return urlIcon || { icon: IconType.Project, label: label || 'Project' };
    case 'atlassian:SourceCodeCommit':
      return { icon: IconType.Commit, label: label || 'Commit' };
    case 'atlassian:SourceCodePullRequest':
      return { icon: IconType.PullRequest, label: label || 'Pull request' };
    case 'atlassian:SourceCodeReference':
      return { icon: IconType.Branch, label: label || 'Reference' };
    case 'atlassian:SourceCodeRepository':
      return { icon: IconType.Repo, label: label || 'Repository' };
    default:
      return providerIcon;
  }
};

export default extractJsonldDataIcon;
