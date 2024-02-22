export const paragraphADF = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
  ],
};

export const paragraphEmojiADF = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Lorem ',
        },
        {
          type: 'emoji',
          attrs: {
            shortName: ':slight_smile:',
            id: '1f642',
            text: '🙂',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'emoji',
          attrs: {
            shortName: ':slight_smile:',
            id: '1f642',
            text: '🙂',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'emoji',
          attrs: {
            shortName: ':slight_smile:',
            id: '1f642',
            text: '🙂',
          },
        },
        {
          type: 'text',
          text: '  ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
  ],
};

export const noAnnotationADF = {
  type: 'doc',
  version: 1,
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '--Text start--',
        },
      ],
    },
    {
      type: 'decisionList',
      attrs: {
        localId: 'test-list-id',
      },
      content: [
        {
          type: 'decisionItem',
          attrs: {
            localId: 'decisionItem-id',
            state: 'DECIDED',
          },
          content: [
            {
              type: 'text',
              text: 'Decition item',
            },
          ],
        },
      ],
    },
    {
      type: 'taskList',
      attrs: {
        localId: 'taskList-id',
      },
      content: [
        {
          type: 'taskItem',
          attrs: {
            localId: 'taskItem-id',
            state: 'TODO',
          },
          content: [
            {
              type: 'text',
              text: 'Task item',
            },
          ],
        },
      ],
    },
    {
      type: 'table',
      attrs: {
        isNumberColumnEnabled: false,
        layout: 'default',
      },
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Table cell 1',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Table cell 2',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'List item 1',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'List item 2',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi nisl, venenatis eget auctor vitae, venenatis quis lorem. Suspendisse maximus tortor vel dui tincidunt cursus. Vestibulum magna nibh, auctor non auctor id, finibus vitae orci. Nulla viverra ipsum et nunc fringilla ultricies. Pellentesque vitae felis molestie justo finibus accumsan. Suspendisse potenti. Nulla facilisi. Integer dignissim quis velit quis elementum. Sed sit amet varius ante. Duis vestibulum porta augue eu laoreet. Morbi id risus et augue sollicitudin aliquam. In et ligula dolor. Nam ac aliquet diam.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 1',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 2',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 3',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '--Text end--',
        },
      ],
    },
  ],
};
