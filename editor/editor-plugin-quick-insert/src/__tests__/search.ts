import type { QuickInsertItem } from '@atlaskit/editor-common/provider-factory';
import { find } from '@atlaskit/editor-common/quick-insert';

import { getQuickInsertSuggestions } from '../search';

const action = (): false => false;

describe('Quick Insert Search', () => {
  const getTitles = (item: { title: string }) => item.title;

  const items: QuickInsertItem[] = [
    {
      priority: 1,
      title: 'Table',
      keywords: ['cell'],
      categories: ['formatting'],
      action,
      featured: true,
    },
    { priority: 9, title: 'Panel', categories: ['formatting'], action },
    {
      priority: 8,
      title: 'Code snippet',
      categories: ['formatting'],
      action,
      featured: true,
    },
    { priority: 7, title: 'Date', categories: ['elements'], action },
    {
      priority: 6,
      title: 'Quote',
      categories: ['elements'],
      action,
      featured: true,
    },
    { priority: 2, title: 'Files and Images', action },
    { priority: 3, title: 'Horizontal rule', action },
    { priority: 4, title: 'Action', action },
    { priority: 5, title: 'Decision', action, featured: true },
    { priority: 10, title: 'Task Report', action, featured: true },
  ];

  describe('should match substring', () => {
    it.each<[string, string, QuickInsertItem[], string[]]>([
      ['by exact match', 'Date', items, ['Date']],
      ['when searching by keywords', 'cell', items, ['Table']],
      [
        'for a word which includes first letter',
        'hor',
        items,
        ['Horizontal rule'],
      ],
      [
        'for a sentence which includes first letter of last word',
        'rul',
        items,
        ['Horizontal rule'],
      ],
      [
        'and respect the priority',
        'ta',
        items,
        ['Table', 'Task Report', 'Horizontal rule'],
      ],
      [
        'and take into account weights for keyword and title',
        'excel',
        [
          {
            title: 'Office Excel',
            action,
            featured: true,
            keywords: ['viewxls'],
          },
          {
            title: 'Excerpt',
            action,
            featured: false,
            keywords: ['excerpt-include'],
          },
          {
            title: 'Excerpt include',
            action,
            featured: false,
            keywords: ['excerpt-include'],
          },
        ],
        ['Office Excel', 'Excerpt', 'Excerpt include'],
      ],
    ])('%s', (_, searchString, items, expectedTitles) => {
      const result = find(searchString, items);
      expect(result.length).toEqual(expectedTitles.length);
      expect(result.map(x => x.title)).toEqual(expectedTitles);
    });
  });

  it('should find an item approximately matching a query', () => {
    expect(find('dete', items)[0].title).toBe('Date');
  });

  it('should find items that approximately match a query', () => {
    expect(find('te', items).map(getTitles)).toEqual(['Date', 'Quote']);
  });

  it('should respect item priority', () => {
    expect(find('', items).map(getTitles)).toEqual([
      'Table',
      'Files and Images',
      'Horizontal rule',
      'Action',
      'Decision',
      'Quote',
      'Date',
      'Code snippet',
      'Panel',
      'Task Report',
    ]);
  });

  it('should respect item priority when 2 items match a query with the same score', () => {
    expect(
      find('code', [
        ...items,
        { priority: 9, title: 'Code inline', action },
      ]).map(getTitles),
    ).toEqual(['Code snippet', 'Code inline']);
  });

  it('should not match string when character repeats more times than in original string', () => {
    expect(find('//', [{ title: '/', action }])).toEqual([]);
  });

  it('should find items that match partial query containing trailing space', () => {
    expect(
      find('block ', [
        ...items,
        { priority: 9, title: 'Block extensions', action },
      ]).map(getTitles),
    ).toEqual(['Block extensions']);

    expect(
      find('qu', [
        ...items,
        { priority: 9, title: 'Block extensions', action },
      ]).map(getTitles),
    ).toEqual(['Quote']);
  });

  describe('getQuickInsertSuggestions - featured items', () => {
    it('should get featured items from quickInsertItems', () => {
      const featuredItems = getQuickInsertSuggestions(
        {
          featuredItems: true,
        },
        () => items,
        [
          {
            priority: 9,
            title: 'Code inline',
            categories: ['formatting'],
            action,
          },
          {
            priority: 9,
            title: 'Page builder',
            categories: ['advanced'],
            action,
          },
        ],
      );

      expect(featuredItems).toStrictEqual([
        {
          priority: 1,
          title: 'Table',
          categories: ['formatting'],
          keywords: ['cell'],
          action,
          featured: true,
        },
        {
          priority: 8,
          title: 'Code snippet',
          categories: ['formatting'],
          action,
          featured: true,
        },
        {
          priority: 6,
          title: 'Quote',
          categories: ['elements'],
          action,
          featured: true,
        },
        { priority: 5, title: 'Decision', action, featured: true },
        { priority: 10, title: 'Task Report', action, featured: true },
      ]);
    });
  });

  describe('getQuickInsertSuggestions', () => {
    const search = (query?: string, category?: string): QuickInsertItem[] =>
      getQuickInsertSuggestions(
        {
          query,
          category,
        },
        () => items,
        [
          {
            priority: 9,
            title: 'Code inline',
            categories: ['formatting'],
            action,
          },
          {
            priority: 9,
            title: 'Page builder',
            categories: ['advanced'],
            action,
          },
        ],
      );

    it('should match items based on a search term', () => {
      expect(search('Date')[0].title).toBe('Date');
      expect(search('hor')[0].title).toEqual('Horizontal rule');
      expect(search('rul')[0].title).toEqual('Horizontal rule');
      expect(search('te').map(getTitles)).toEqual(['Date', 'Quote']);
      expect(search('dete')[0].title).toBe('Date');
      expect(search('page ').map(getTitles)).toEqual(['Page builder']);
    });

    it('should match items based on a category', () => {
      expect(search('', 'formatting').map(getTitles)).toEqual([
        'Table',
        'Code snippet',
        'Panel',
        'Code inline',
      ]);
    });

    it('should be able to search inside a category', () => {
      expect(search('Tab', 'formatting').map(getTitles)).toEqual(['Table']);

      expect(search('Panel', 'formatting').map(getTitles)).toEqual(['Panel']);

      expect(search('Code ', 'formatting').map(getTitles)).toEqual([
        'Code snippet',
        'Code inline',
      ]);
    });

    it('should ignore category = all', () => {
      expect(search('', 'all').map(getTitles)).toEqual([
        'Table',
        'Files and Images',
        'Horizontal rule',
        'Action',
        'Decision',
        'Quote',
        'Date',
        'Code snippet',
        'Panel',
        'Code inline',
        'Page builder',
        'Task Report',
      ]);
    });

    it('should respect item priority', () => {
      expect(search('').map(getTitles)).toEqual([
        'Table',
        'Files and Images',
        'Horizontal rule',
        'Action',
        'Decision',
        'Quote',
        'Date',
        'Code snippet',
        'Panel',
        'Code inline',
        'Page builder',
        'Task Report',
      ]);
    });
  });
});
