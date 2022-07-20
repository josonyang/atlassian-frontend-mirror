/* eslint-disable max-len */
import React from 'react';

import { defaultLogoParams } from '../constants';
import { LogoProps } from '../types';
import { getColorsFromAppearance } from '../utils';
import Wrapper from '../wrapper';

const svg = ({ appearance, textColor }: LogoProps) => {
  let colors = {
    textColor,
  };

  if (appearance) {
    colors = getColorsFromAppearance(appearance);
  }

  return `
<svg viewBox="0 0 126 32" height="32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
  <g stroke="none" stroke-width="1" fill-rule="evenodd" fill="${colors.textColor}">
    <path d="M13.312,20.984 C12.064,21.608 10.66,22.024 8.866,22.024 C4.81,22.024 2.34,19.424 2.34,15.498 C2.34,11.572 4.732,8.92 8.736,8.92 C10.712,8.92 12.064,9.336 13.286,10.116 L13.286,7.854 C12.064,6.97 10.4,6.658 8.736,6.658 C3.172,6.658 -2.04281037e-14,10.298 -2.04281037e-14,15.498 C-2.04281037e-14,20.88 3.172,24.26 8.788,24.26 C10.556,24.26 12.246,23.948 13.312,23.246 L13.312,20.984 Z M21.918,24.26 C18.018,24.26 15.73,21.374 15.73,17.474 C15.73,13.574 18.018,10.74 21.918,10.74 C25.792,10.74 28.054,13.574 28.054,17.474 C28.054,21.374 25.792,24.26 21.918,24.26 Z M21.918,12.82 C19.136,12.82 17.914,15.004 17.914,17.474 C17.914,19.944 19.136,22.18 21.918,22.18 C24.674,22.18 25.87,19.944 25.87,17.474 C25.87,15.004 24.674,12.82 21.918,12.82 Z M41.704,16.382 C41.704,12.794 39.988,10.74 36.998,10.74 C35.256,10.74 33.722,11.598 32.89,13.132 L32.89,11 L30.654,11 L30.654,24 L32.89,24 L32.89,16.772 C32.89,14.146 34.32,12.768 36.4,12.768 C38.532,12.768 39.468,13.808 39.468,16.148 L39.468,24 L41.704,24 L41.704,16.382 Z M47.918,9.622 C47.918,8.452 48.594,7.646 49.972,7.646 C50.492,7.646 50.986,7.698 51.376,7.776 L51.376,5.722 C50.986,5.618 50.544,5.514 49.868,5.514 C47.086,5.514 45.734,7.152 45.734,9.57 L45.734,11 L43.628,11 L43.628,13.08 L45.734,13.08 L45.734,24 L47.918,24 L47.918,13.08 L51.272,13.08 L51.272,11 L47.918,11 L47.918,9.622 Z M58.318,23.974 L58.318,21.972 C58.058,21.998 57.902,21.998 57.668,21.998 C56.706,21.998 55.926,21.582 55.926,20.412 L55.926,5.566 L53.69,5.566 L53.69,20.672 C53.69,23.064 55.042,24.078 57.174,24.078 C57.746,24.078 58.136,24.026 58.318,23.974 Z M60.216,18.618 C60.216,22.206 61.932,24.26 64.922,24.26 C66.664,24.26 68.198,23.402 69.03,21.868 L69.03,24 L71.266,24 L71.266,11 L69.03,11 L69.03,18.228 C69.03,20.854 67.6,22.232 65.52,22.232 C63.388,22.232 62.452,21.192 62.452,18.852 L62.452,11 L60.216,11 L60.216,18.618 Z M84.89,23.48 C83.824,24.052 82.186,24.26 80.86,24.26 C75.998,24.26 73.866,21.452 73.866,17.474 C73.866,13.548 76.05,10.74 80.002,10.74 C84.006,10.74 85.618,13.522 85.618,17.474 L85.618,18.488 L76.128,18.488 C76.44,20.698 77.87,22.128 80.938,22.128 C82.446,22.128 83.72,21.842 84.89,21.426 L84.89,23.48 Z M79.898,12.768 C77.532,12.768 76.336,14.302 76.102,16.564 L83.356,16.564 C83.226,14.146 82.134,12.768 79.898,12.768 Z M99.32,16.382 C99.32,12.794 97.604,10.74 94.614,10.74 C92.872,10.74 91.338,11.598 90.506,13.132 L90.506,11 L88.27,11 L88.27,24 L90.506,24 L90.506,16.772 C90.506,14.146 91.936,12.768 94.016,12.768 C96.148,12.768 97.084,13.808 97.084,16.148 L97.084,24 L99.32,24 L99.32,16.382 Z M111.618,21.66 C110.812,21.946 109.98,22.128 108.654,22.128 C105.248,22.128 103.844,19.996 103.844,17.474 C103.844,14.952 105.222,12.82 108.602,12.82 C109.824,12.82 110.708,13.054 111.54,13.444 L111.54,11.364 C110.526,10.896 109.616,10.74 108.446,10.74 C103.818,10.74 101.66,13.548 101.66,17.474 C101.66,21.452 103.818,24.26 108.446,24.26 C109.642,24.26 110.838,24.078 111.618,23.662 L111.618,21.66 Z M124.41,23.48 C123.344,24.052 121.706,24.26 120.38,24.26 C115.518,24.26 113.386,21.452 113.386,17.474 C113.386,13.548 115.57,10.74 119.522,10.74 C123.526,10.74 125.138,13.522 125.138,17.474 L125.138,18.488 L115.648,18.488 C115.96,20.698 117.39,22.128 120.458,22.128 C121.966,22.128 123.24,21.842 124.41,21.426 L124.41,23.48 Z M119.418,12.768 C117.052,12.768 115.856,14.302 115.622,16.564 L122.876,16.564 C122.746,14.146 121.654,12.768 119.418,12.768 Z"></path>
  </g>
</svg>`;
};

export const ConfluenceWordmark = ({
  appearance,
  label = 'Confluence',
  size = defaultLogoParams.size,
  testId,
  textColor = defaultLogoParams.textColor,
}: LogoProps) => {
  return (
    <Wrapper
      label={label}
      size={size}
      svg={svg({ appearance, textColor })}
      testId={testId}
      textColor={textColor}
    />
  );
};
