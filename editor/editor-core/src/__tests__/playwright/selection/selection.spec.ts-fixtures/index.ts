export const selectableNodesDocument = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'a',
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'info',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'b',
            },
          ],
        },
      ],
    },
    {
      type: 'layoutSection',
      content: [
        {
          type: 'layoutColumn',
          attrs: {
            width: 50,
          },
          content: [
            {
              type: 'codeBlock',
              attrs: {},
              content: [
                {
                  type: 'text',
                  text: 'c',
                },
              ],
            },
            {
              type: 'panel',
              attrs: {
                panelType: 'note',
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'date',
                      attrs: {
                        timestamp: '1588291200000',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 50,
          },
          content: [
            {
              type: 'paragraph',
              content: [],
            },
          ],
        },
      ],
    },
    {
      type: 'decisionList',
      attrs: {
        localId: '8db833ad-e2c7-4036-9e68-db3d5b478e2f',
      },
      content: [
        {
          type: 'decisionItem',
          attrs: {
            localId: 'c1bafe87-9cd1-4ccf-917f-1d93bfe9f0ec',
            state: 'DECIDED',
          },
          content: [
            {
              type: 'text',
              text: 'd',
            },
          ],
        },
        {
          type: 'decisionItem',
          attrs: {
            localId: '64738aeb-8c66-485a-94fb-de1e1231208f',
            state: 'DECIDED',
          },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'e',
        },
      ],
    },
  ],
};

export const blockNodesDocument = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'test',
        },
      ],
    },
    {
      type: 'table',
      attrs: {
        isNumberColumnEnabled: false,
        layout: 'default',
        localId: '4f2aa06b-d490-4ea4-b23f-309f55c648d5',
      },
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
    {
      type: 'extension',
      attrs: {
        extensionType: 'com.atlassian.confluence.macro.core',
        extensionKey: 'block-eh',
        parameters: {
          macroParams: {},
          macroMetadata: {
            placeholder: [
              {
                data: {
                  url: '',
                },
                type: 'icon',
              },
            ],
          },
        },
        text: 'Block extension demo',
        layout: 'default',
        localId: 'f73f58d2-e728-4d32-a5aa-201fc74e5969',
      },
    },
    {
      type: 'paragraph',
      content: [],
    },
    {
      type: 'bodiedExtension',
      attrs: {
        extensionType: 'com.atlassian.confluence.macro.core',
        extensionKey: 'bodied-eh',
        parameters: {
          macroParams: {},
          macroMetadata: {
            placeholder: [
              {
                data: {
                  url: '',
                },
                type: 'icon',
              },
            ],
          },
        },
        layout: 'default',
        localId: 'dfd705a7-3ae8-47c0-a3c3-8d89d4a805dc',
      },
      content: [
        {
          type: 'paragraph',
          content: [],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
  ],
};
