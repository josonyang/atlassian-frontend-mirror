export const inlineCardAdf = {
  type: 'doc',
  version: 1,
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'line 1',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'line 2',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'inlineCard',
          attrs: {
            url: 'https://inlineCardTestUrl/longName',
          },
        },
        { type: 'text', text: ' line 3' },
      ],
    },
  ],
};
