import type { FontFamilyBaseToken as BaseToken } from '../../../palettes/typography-palette';
import type { AttributeSchema, FontFamilyTokenSchema } from '../../../types';

const font: AttributeSchema<FontFamilyTokenSchema<BaseToken>> = {
  font: {
    family: {
      sans: {
        attributes: {
          group: 'fontFamily',
          state: 'active',
          introduced: '0.10.33',
          description: 'Helpful guidance goes here',
        },
      },
      monospace: {
        attributes: {
          group: 'fontFamily',
          state: 'active',
          introduced: '0.10.33',
          description: 'Helpful guidance goes here',
        },
      },
    },
  },
};

export default font;
