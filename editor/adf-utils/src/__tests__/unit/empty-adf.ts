import { getEmptyADF } from '../../empty-adf';

describe('empty adf', () => {
  it('returns agreed format for a given empty document', () => {
    expect(getEmptyADF()).toEqual({
      type: 'doc',
      version: 1,
      content: [],
    });
  });
});
