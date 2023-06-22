import type { BaseToken } from '../../../palettes/palette';
import type { ShadowTokenSchema, ValueSchema } from '../../../types';

const shadow: ValueSchema<ShadowTokenSchema<BaseToken>> = {
  elevation: {
    shadow: {
      raised: {
        value: [
          {
            // This inset shadow is just to allow animations between shadow types
            radius: 0,
            spread: 1,
            // @ts-ignore no current palette colour for this yet
            color: '#000000',
            offset: { x: 0, y: 0 },
            opacity: 0,
            inset: true,
          },
          {
            radius: 1,
            offset: { x: 0, y: 1 },
            color: 'DarkNeutral-100A',
            // This opacity overrides the color alpha.
            opacity: 0.5,
          },
          {
            radius: 1,
            offset: { x: 0, y: 0 },
            color: 'DarkNeutral-100A',
            // This opacity overrides the color alpha.
            opacity: 0.5,
          },
        ],
      },
      overflow: {
        '[default]': {
          value: [
            {
              radius: 12,
              offset: { x: 0, y: 0 },
              // @ts-ignore no current palette colour for this yet
              color: '#030404',
              // This opacity overrides the color alpha.
              opacity: 0.56,
            },
            {
              radius: 1,
              offset: { x: 0, y: 0 },
              // @ts-ignore no current palette colour for this yet
              color: '#030404',
              // This opacity overrides the color alpha.
              opacity: 0.5,
            },
          ],
        },
        // @ts-ignore no current palette colour for this yet
        spread: { value: '#0304048f' },
        // @ts-ignore no current palette colour for this yet
        perimeter: { value: '#03040480' },
      },
      overlay: {
        value: [
          {
            radius: 0,
            spread: 1,
            color: 'DarkNeutral100A',
            offset: { x: 0, y: 0 },
            opacity: 0.12,
            inset: true,
          },
          {
            radius: 12,
            offset: { x: 0, y: 8 },
            color: 'DarkNeutral-100A',
            // This opacity overrides the color alpha.
            opacity: 0.36,
          },
          {
            radius: 1,
            offset: { x: 0, y: 0 },
            color: 'DarkNeutral-100A',
            // This opacity overrides the color alpha.
            opacity: 0.5,
          },
        ],
      },
    },
  },
};

export default shadow;
