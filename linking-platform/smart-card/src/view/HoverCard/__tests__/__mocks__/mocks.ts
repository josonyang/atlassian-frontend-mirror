import { overrideEmbedContent } from '../../../../../examples/utils/common';

export const mockBaseResponse = {
  meta: {
    visibility: 'public',
    access: 'granted',
    auth: [],
    definitionId: 'd1',
    key: 'test-object-provider',
  },
  data: {
    '@context': {
      '@vocab': 'https://www.w3.org/ns/activitystreams#',
      atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
      schema: 'http://schema.org/',
    },
    '@type': ['Object'],
    name: 'I love cheese',
    summary: 'Here is your serving of cheese',
    'schema:potentialAction': {
      '@id': 'comment',
      '@type': 'CommentAction',
      identifier: 'test-object-provider',
      name: 'Comment',
    },
    attributedTo: {
      '@type': 'Person',
      icon: {
        '@type': 'Image',
        url: 'avatar_url',
      },
      name: 'Michael Schrute',
    },
    preview: {
      href: overrideEmbedContent,
    },
    url: 'https://some.url',
  },
};

export const mockConfluenceResponse = {
  meta: {
    ...mockBaseResponse.meta,
    key: 'confluence-object-provider',
  },
  data: {
    ...mockBaseResponse.data,
    'schema:commentCount': 4,
    'atlassian:reactCount': 8,
    generator: {
      '@type': 'Application',
      '@id': 'https://www.atlassian.com/#Confluence',
      name: 'Confluence',
    },
  },
};

export const mockJiraResponse = {
  meta: {
    ...mockBaseResponse.meta,
    key: 'jira-object-provider',
  },
  data: {
    ...mockBaseResponse.data,
    updated: '2022-01-01T12:13:15.531+1000',
    tag: {
      '@type': 'Object',
      appearance: 'success',
      name: 'Done',
    },
    '@type': ['Object', 'atlassian:Task'],
    'atlassian:priority': {
      '@type': 'Object',
      icon: {
        '@type': 'Image',
        url: 'major_icon_url',
      },
      name: 'Major',
    },
    generator: {
      '@type': 'Application',
      '@id': 'https://www.atlassian.com/#Jira',
      name: 'Jira',
    },
  },
};

export const mockIframelyResponse = {
  meta: {
    ...mockBaseResponse.meta,
    key: 'iframely-object-provider',
  },
  data: {
    ...mockBaseResponse.data,
    updated: '2022-01-01T12:13:15.531+1000',
    generator: {
      '@type': 'Object',
      icon: {
        '@type': 'Image',
        url: 'icon-url',
      },
      name: 'public-provider',
    },
  },
};

export const mockBaseResponseWithPreview = {
  meta: {
    ...mockBaseResponse.meta,
  },
  data: {
    ...mockBaseResponse.data,
    image: {
      '@type': 'Image',
      url: 'mock-image-url',
    },
  },
};

export const mockBaseResponseWithErrorPreview = {
  meta: {
    ...mockBaseResponse.meta,
  },
  data: {
    ...mockBaseResponse.data,
    image: {
      '@type': 'Image',
      url: 'src-error',
    },
  },
};

export const mockBaseResponseWithDownload = {
  meta: {
    ...mockBaseResponse.meta,
  },
  data: {
    ...mockBaseResponse.data,
    'schema:potentialAction': [
      {
        '@id': 'download',
        '@type': 'DownloadAction',
        name: 'Download',
      },
    ],
    'atlassian:downloadUrl': 'mock-download-url',
  },
};

export const mockSSRResponse = {
  meta: {
    visibility: 'public',
    access: 'granted',
    auth: [],
    definitionId: 'd1',
    key: 'test-object-provider',
  },
  data: {
    '@context': {
      '@vocab': 'https://www.w3.org/ns/activitystreams#',
      atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
      schema: 'http://schema.org/',
    },
    '@type': ['Object'],
    name: 'I am a fan of cheese',
    url: 'https://some.url',
    icon: {
      '@type': 'Image',
      url: 'https://wac-cdn.atlassian.com/assets/img/favicons/bitbucket/favicon-32x32.png',
    },
  },
};

export const mockActionableElementResponse = {
  meta: {
    auth: [],
    definitionId: 'jira-object-provider',
    product: 'jira',
    visibility: 'restricted',
    access: 'granted',
    resourceType: 'issue',
    key: 'jira-object-provider',
  },
  data: {
    '@context': {
      '@vocab': 'https://www.w3.org/ns/activitystreams#',
      atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
      schema: 'http://schema.org/',
    },
    generator: {
      '@type': 'Application',
      '@id': 'https://www.atlassian.com/#Jira',
      name: 'Jira',
    },
    '@type': ['atlassian:Task', 'Object'],
    'atlassian:subscriberCount': 1,
    tag: {
      '@type': 'Object',
      name: 'In Progress',
      appearance: 'inprogress',
    },
    preview: {
      '@type': 'Link',
      href: 'https://preview-link',
      'atlassian:supportedPlatforms': ['web'],
    },
    url: 'https://product-fabric.atlassian.net/browse/EDM-5128',
  },
};

export const mockUnauthorisedResponse = {
  meta: {
    access: 'unauthorized',
    visibility: 'restricted',
    auth: [
      {
        key: 'gdrive',
        displayName: 'Atlassian Links - Google Drive',
        url: 'https://id.stg.internal.atlassian.com/outboundAuth/start?containerId=2357cbb7-bf5c-4fe4-a9c6-c8e172ccb5b1_3b53863d-a6bb-4818-91da-4de04f975f48&serviceKey=gdrive',
      },
    ],
    definitionId: '440fdd47-25ac-4ac2-851f-1b7526365ade',
    key: 'google-object-provider',
    resourceType: 'file',
    version: '3.1.0',
  },
  data: {
    '@context': {
      '@vocab': 'https://www.w3.org/ns/activitystreams#',
      atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
      schema: 'http://schema.org/',
    },
    '@type': 'Object',
    generator: {
      '@type': 'Application',
      name: 'Google',
      icon: {
        '@type': 'Image',
        url: 'https://developers.google.com/drive/images/drive_icon.png',
      },
      image: 'https://links.atlassian.com/images/google_drive.svg',
    },
    url: 'https://docs.google.com/presentation/d/1hH1kRMTn7OORleGEBq64XqOfpctKIU1AnooHPyhcdDw/edit?usp=share_link',
  },
};
