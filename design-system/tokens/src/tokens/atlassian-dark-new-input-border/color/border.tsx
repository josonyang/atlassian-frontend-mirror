import type { BaseToken } from '../../../palettes/palette';
import type { BorderColorTokenSchema, ValueSchema } from '../../../types';

const color: ValueSchema<BorderColorTokenSchema<BaseToken>> = {
  color: {
    border: {
      '[default]': {
        value: 'DarkNeutral300A',
      },
      bold: {
        value: 'DarkNeutral600',
      },
      inverse: {
        value: 'DarkNeutral0',
      },
      focused: {
        value: 'Blue300',
      },
      input: {
        value: 'DarkNeutral600',
      },
      disabled: {
        value: 'DarkNeutral200A',
      },
      brand: {
        value: 'Blue400',
      },
      selected: {
        value: 'Blue400',
      },
      danger: {
        value: 'Red500',
      },
      warning: {
        value: 'Yellow500',
      },
      success: {
        value: 'Green500',
      },
      discovery: {
        value: 'Purple500',
      },
      information: {
        value: 'Blue500',
      },
    },
  },
};

export default color;
