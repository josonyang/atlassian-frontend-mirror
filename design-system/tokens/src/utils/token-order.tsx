/**
 * Create specific rules for ordering tokens based on their root path and subpath.
 */
export const tokenOrder = [
  {
    path: 'color',
    subpaths: [
      'text',
      'link',
      'icon',
      'border',
      'background',
      'blanket',
      'interaction',
      'skeleton',
      'chart',
      // deleted ↓
      'accent',
      'iconBorder',
      'overlay',
    ],
  },
  {
    path: 'elevation',
    subpaths: ['surface', 'shadow'],
  },
  {
    path: 'opacity',
    subpaths: [],
  },
  { path: 'shadow', subpaths: ['card', 'overlay'] }, // Deleted
  {
    path: 'utility',
    subpaths: [],
  },
  {
    path: 'shape',
    subpaths: ['radius', 'width'],
  },
  {
    path: 'space',
    subpaths: [],
  },
  {
    path: 'font',
    subpaths: ['family', 'size', 'weight', 'lineHeight'],
  },
  {
    path: 'typography',
    subpaths: [],
  },
  {
    path: 'value', // Legacy palette
    subpaths: [],
  },
];
