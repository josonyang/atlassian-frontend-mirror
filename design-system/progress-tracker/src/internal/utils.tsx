import { TextColor } from '@atlaskit/ds-explorations/text';
import { B300, N70 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import type { Status } from '../types';

import { REGULAR_FONT_WEIGHT, SEMI_BOLD_FONT_WEIGHT } from './constants';

export const getMarkerColor = (status: Status) => {
  switch (status) {
    case 'unvisited':
      return token('color.icon.subtle', N70);
    case 'current':
    case 'visited':
    case 'disabled':
      return token('color.icon.brand', B300);
    default:
      return;
  }
};

export const getTextColor = (status: Status): TextColor | undefined => {
  switch (status) {
    case 'unvisited':
      return 'subtlest';
    case 'current':
      return 'brand';
    case 'visited':
      return 'color.text';
    case 'disabled':
      return 'disabled';
    default:
      return;
  }
};

export const getFontWeight = (status: Status) => {
  switch (status) {
    case 'unvisited':
      return REGULAR_FONT_WEIGHT;
    case 'current':
    case 'visited':
    case 'disabled':
      return SEMI_BOLD_FONT_WEIGHT;
    default:
      return undefined;
  }
};
