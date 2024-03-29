export const statusAdf = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'status',
          attrs: {
            text: 'test',
            color: 'neutral',
            localId: 'e2ea8bec-2b6e-492c-8665-cbfe95a200f5',
            style: '',
          },
        },
      ],
    },
  ],
};

export const statusWithTextAdf = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'status',
          attrs: {
            text: 'test',
            color: 'neutral',
            localId: 'e2ea8bec-2b6e-492c-8665-cbfe95a200f5',
            style: '',
          },
        },
        {
          type: 'text',
          text: 'text after status',
        },
      ],
    },
  ],
};
