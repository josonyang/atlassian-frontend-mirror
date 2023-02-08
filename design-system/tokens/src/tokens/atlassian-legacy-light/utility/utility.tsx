import type { BaseToken } from '../../../palettes/legacy-palette';
import type { UtilTokenSchema, ValueSchema } from '../../../types';

const utility: ValueSchema<UtilTokenSchema<BaseToken>> = {
  UNSAFE: {
    transparent: {
      value: 'transparent',
    },
  },
};

export default { utility };
