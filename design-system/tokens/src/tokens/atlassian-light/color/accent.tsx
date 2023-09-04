import type { BaseToken } from '../../../palettes/palette';
import type { AccentColorTokenSchema, ValueSchema } from '../../../types';

const color: ValueSchema<AccentColorTokenSchema<BaseToken>> = {
  color: {
    text: {
      accent: {
        blue: {
          '[default]': { value: 'Blue800' },
          bolder: { value: 'Blue900' },
        },
        red: {
          '[default]': { value: 'Red800' },
          bolder: { value: 'Red900' },
        },
        orange: {
          '[default]': { value: 'Orange800' },
          bolder: { value: 'Orange900' },
        },
        yellow: {
          '[default]': { value: 'Yellow800' },
          bolder: { value: 'Yellow900' },
        },
        green: {
          '[default]': { value: 'Green800' },
          bolder: { value: 'Green900' },
        },
        purple: {
          '[default]': { value: 'Purple800' },
          bolder: { value: 'Purple900' },
        },
        teal: {
          '[default]': { value: 'Teal800' },
          bolder: { value: 'Teal900' },
        },
        magenta: {
          '[default]': { value: 'Magenta800' },
          bolder: { value: 'Magenta900' },
        },
        lime: {
          '[default]': { value: 'Lime800' },
          bolder: { value: 'Lime900' },
        },
        gray: {
          '[default]': { value: 'Neutral800' },
          bolder: { value: 'Neutral1100' },
        },
      },
    },
    icon: {
      accent: {
        blue: { value: 'Blue600' },
        red: { value: 'Red600' },
        orange: { value: 'Orange600' },
        yellow: { value: 'Yellow600' },
        green: { value: 'Green600' },
        purple: { value: 'Purple600' },
        teal: { value: 'Teal600' },
        magenta: { value: 'Magenta600' },
        lime: { value: 'Lime600' },
        gray: { value: 'Neutral600' },
      },
    },
    border: {
      accent: {
        blue: { value: 'Blue600' },
        red: { value: 'Red600' },
        orange: { value: 'Orange600' },
        yellow: { value: 'Yellow600' },
        green: { value: 'Green600' },
        purple: { value: 'Purple600' },
        teal: { value: 'Teal600' },
        magenta: { value: 'Magenta600' },
        lime: { value: 'Lime600' },
        gray: { value: 'Neutral600' },
      },
    },
    background: {
      accent: {
        blue: {
          subtlest: {
            '[default]': { value: 'Blue100' },
            hovered: {
              value: 'Blue200',
            },
            pressed: {
              value: 'Blue300',
            },
          },
          subtler: {
            '[default]': { value: 'Blue200' },
            hovered: {
              value: 'Blue300',
            },
            pressed: {
              value: 'Blue400',
            },
          },
          subtle: {
            '[default]': { value: 'Blue400' },
            hovered: {
              value: 'Blue300',
            },
            pressed: {
              value: 'Blue200',
            },
          },
          bolder: {
            '[default]': { value: 'Blue700' },
            hovered: {
              value: 'Blue800',
            },
            pressed: {
              value: 'Blue900',
            },
          },
        },
        red: {
          subtlest: {
            '[default]': { value: 'Red100' },
            hovered: {
              value: 'Red200',
            },
            pressed: {
              value: 'Red300',
            },
          },
          subtler: {
            '[default]': { value: 'Red200' },
            hovered: {
              value: 'Red300',
            },
            pressed: {
              value: 'Red400',
            },
          },
          subtle: {
            '[default]': { value: 'Red400' },
            hovered: {
              value: 'Red300',
            },
            pressed: {
              value: 'Red200',
            },
          },
          bolder: {
            '[default]': { value: 'Red700' },
            hovered: {
              value: 'Red800',
            },
            pressed: {
              value: 'Red900',
            },
          },
        },
        orange: {
          subtlest: {
            '[default]': { value: 'Orange100' },
            hovered: {
              value: 'Orange200',
            },
            pressed: {
              value: 'Orange300',
            },
          },
          subtler: {
            '[default]': { value: 'Orange200' },
            hovered: {
              value: 'Orange300',
            },
            pressed: {
              value: 'Orange400',
            },
          },
          subtle: {
            '[default]': { value: 'Orange400' },
            hovered: {
              value: 'Orange300',
            },
            pressed: {
              value: 'Orange200',
            },
          },
          bolder: {
            '[default]': { value: 'Orange700' },
            hovered: {
              value: 'Orange800',
            },
            pressed: {
              value: 'Orange900',
            },
          },
        },
        yellow: {
          subtlest: {
            '[default]': { value: 'Yellow100' },
            hovered: {
              value: 'Yellow200',
            },
            pressed: {
              value: 'Yellow300',
            },
          },
          subtler: {
            '[default]': { value: 'Yellow200' },
            hovered: {
              value: 'Yellow300',
            },
            pressed: {
              value: 'Yellow400',
            },
          },
          subtle: {
            '[default]': { value: 'Yellow400' },
            hovered: {
              value: 'Yellow300',
            },
            pressed: {
              value: 'Yellow200',
            },
          },
          bolder: {
            '[default]': { value: 'Yellow700' },
            hovered: {
              value: 'Yellow800',
            },
            pressed: {
              value: 'Yellow900',
            },
          },
        },
        green: {
          subtlest: {
            '[default]': { value: 'Green100' },
            hovered: {
              value: 'Green200',
            },
            pressed: {
              value: 'Green300',
            },
          },
          subtler: {
            '[default]': { value: 'Green200' },
            hovered: {
              value: 'Green300',
            },
            pressed: {
              value: 'Green400',
            },
          },
          subtle: {
            '[default]': { value: 'Green400' },
            hovered: {
              value: 'Green300',
            },
            pressed: {
              value: 'Green200',
            },
          },
          bolder: {
            '[default]': { value: 'Green700' },
            hovered: {
              value: 'Green800',
            },
            pressed: {
              value: 'Green900',
            },
          },
        },
        purple: {
          subtlest: {
            '[default]': { value: 'Purple100' },
            hovered: {
              value: 'Purple200',
            },
            pressed: {
              value: 'Purple300',
            },
          },
          subtler: {
            '[default]': { value: 'Purple200' },
            hovered: {
              value: 'Purple300',
            },
            pressed: {
              value: 'Purple400',
            },
          },
          subtle: {
            '[default]': { value: 'Purple400' },
            hovered: {
              value: 'Purple300',
            },
            pressed: {
              value: 'Purple200',
            },
          },
          bolder: {
            '[default]': { value: 'Purple700' },
            hovered: {
              value: 'Purple800',
            },
            pressed: {
              value: 'Purple900',
            },
          },
        },
        teal: {
          subtlest: {
            '[default]': { value: 'Teal100' },
            hovered: {
              value: 'Teal200',
            },
            pressed: {
              value: 'Teal300',
            },
          },
          subtler: {
            '[default]': { value: 'Teal200' },
            hovered: {
              value: 'Teal300',
            },
            pressed: {
              value: 'Teal400',
            },
          },
          subtle: {
            '[default]': { value: 'Teal400' },
            hovered: {
              value: 'Teal300',
            },
            pressed: {
              value: 'Teal200',
            },
          },
          bolder: {
            '[default]': { value: 'Teal700' },
            hovered: {
              value: 'Teal800',
            },
            pressed: {
              value: 'Teal900',
            },
          },
        },
        magenta: {
          subtlest: {
            '[default]': { value: 'Magenta100' },
            hovered: {
              value: 'Magenta200',
            },
            pressed: {
              value: 'Magenta300',
            },
          },
          subtler: {
            '[default]': { value: 'Magenta200' },
            hovered: {
              value: 'Magenta300',
            },
            pressed: {
              value: 'Magenta400',
            },
          },
          subtle: {
            '[default]': { value: 'Magenta400' },
            hovered: {
              value: 'Magenta300',
            },
            pressed: {
              value: 'Magenta200',
            },
          },
          bolder: {
            '[default]': { value: 'Magenta700' },
            hovered: {
              value: 'Magenta800',
            },
            pressed: {
              value: 'Magenta900',
            },
          },
        },
        lime: {
          subtlest: {
            '[default]': { value: 'Lime100' },
            hovered: {
              value: 'Lime200',
            },
            pressed: {
              value: 'Lime300',
            },
          },
          subtler: {
            '[default]': { value: 'Lime200' },
            hovered: {
              value: 'Lime300',
            },
            pressed: {
              value: 'Lime400',
            },
          },
          subtle: {
            '[default]': { value: 'Lime400' },
            hovered: {
              value: 'Lime300',
            },
            pressed: {
              value: 'Lime200',
            },
          },
          bolder: {
            '[default]': { value: 'Lime700' },
            hovered: {
              value: 'Lime800',
            },
            pressed: {
              value: 'Lime900',
            },
          },
        },
        gray: {
          subtlest: {
            '[default]': { value: 'Neutral200' },
            hovered: {
              value: 'Neutral300',
            },
            pressed: {
              value: 'Neutral400',
            },
          },
          subtler: {
            '[default]': { value: 'Neutral300' },
            hovered: {
              value: 'Neutral400',
            },
            pressed: {
              value: 'Neutral500',
            },
          },
          subtle: {
            '[default]': { value: 'Neutral500' },
            hovered: {
              value: 'Neutral400',
            },
            pressed: {
              value: 'Neutral300',
            },
          },
          bolder: {
            '[default]': { value: 'Neutral700' },
            hovered: {
              value: 'Neutral800',
            },
            pressed: {
              value: 'Neutral900',
            },
          },
        },
      },
    },
  },
};

export default color;
