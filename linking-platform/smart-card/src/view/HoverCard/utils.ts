import { JsonLd } from 'json-ld-types';
import { ElementName } from '../../constants';
import { extractType } from '@atlaskit/link-extractors';
import { extractOwnedBy } from '../../extractors/flexible/utils';

export const getSimulatedMetadata = (
  extensionKey: string = '',
  data: JsonLd.Data.BaseData,
): JsonLd.Primitives.Property<any> => {
  const types = data ? extractType(data) : undefined;

  switch (extensionKey) {
    case 'bitbucket-object-provider':
    case 'native-bitbucket-object-provider':
      if (types?.includes('atlassian:SourceCodePullRequest')) {
        return {
          metadata: {
            primary: [
              ElementName.AuthorGroup,
              ElementName.ModifiedOn,
              ElementName.SubscriberCount,
              ElementName.State,
            ],
            secondary: [],
            subtitle: [ElementName.SourceBranch, ElementName.TargetBranch],
          },
        };
      }
      return {
        metadata: {
          primary: [ElementName.ModifiedOn, ElementName.CreatedBy],
          secondary: [],
          subtitle: [],
        },
      };
    case 'confluence-object-provider':
      const primaryAttribution =
        data && extractOwnedBy(data)
          ? ElementName.OwnedBy
          : ElementName.CreatedBy;
      return {
        metadata: {
          primary: [ElementName.AuthorGroup, primaryAttribution],
          secondary: [ElementName.CommentCount, ElementName.ReactCount],
          subtitle: [],
        },
      };

    case 'jira-object-provider':
      return {
        metadata: {
          primary: [
            ElementName.AuthorGroup,
            ElementName.State,
            ElementName.Priority,
          ],
          secondary: [],
          subtitle: [],
        },
      };

    case 'trello-object-provider':
      return {
        metadata: {
          primary: [
            ElementName.AuthorGroup,
            ElementName.State,
            ElementName.DueOn,
          ],
          secondary: [
            ElementName.ReactCount,
            ElementName.CommentCount,
            ElementName.AttachmentCount,
            ElementName.ChecklistProgress,
          ],
          subtitle: [ElementName.Location],
        },
      };

    case 'watermelon-object-provider':
      if (types?.includes('atlassian:Project')) {
        return {
          metadata: {
            primary: [
              ElementName.AuthorGroup,
              ElementName.ModifiedOn,
              ElementName.State,
              ElementName.DueOn,
            ],
            secondary: [],
            subtitle: [],
          },
        };
      }
      return {
        metadata: {
          primary: [
            ElementName.AuthorGroup,
            ElementName.State,
            ElementName.DueOn,
          ],
          secondary: [],
          subtitle: [],
        },
      };

    default:
      return {
        metadata: {
          primary: [ElementName.ModifiedOn, ElementName.CreatedBy],
          secondary: [],
          subtitle: [],
        },
      };
  }
};
