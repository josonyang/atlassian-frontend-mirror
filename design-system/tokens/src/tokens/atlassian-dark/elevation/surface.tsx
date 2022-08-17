import type { BaseToken } from '../../../palettes/palette';
import type { SurfaceTokenSchema, ValueSchema } from '../../../types';

const elevation: ValueSchema<SurfaceTokenSchema<BaseToken>> = {
  elevation: {
    surface: {
      '[default]': {
        value: 'DN0',
      },
      sunken: {
        value: 'DN-100',
      },
      raised: {
        value: 'DN100',
      },
      overlay: {
        value: 'DN200',
      },
    },
  },
};

export default elevation;
