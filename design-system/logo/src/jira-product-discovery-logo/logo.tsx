/* eslint-disable max-len */
import React from 'react';

import { uid } from 'react-uid';

import { defaultLogoParams } from '../constants';
import { LogoProps } from '../types';
import { getColorsFromAppearance } from '../utils';
import Wrapper from '../wrapper';

const svg = ({
  appearance,
  iconGradientStart,
  iconGradientStop,
  iconColor,
  textColor,
}: LogoProps) => {
  let colors = {
    iconGradientStart,
    iconGradientStop,
    iconColor,
    textColor,
  };
  // Will be fixed upon removal of deprecated iconGradientStart and
  // iconGradientStop props, or with React 18's useId() hook when we update.
  // eslint-disable-next-line @repo/internal/react/disallow-unstable-values
  let id = uid({ iconGradientStart: iconGradientStop });

  if (appearance) {
    colors = getColorsFromAppearance(appearance);
    id = `jpdLogo-${appearance}`;
  }

  return `
  <svg
    height="32"
    viewBox="0 0 264 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M109.373 24.1314C111.344 24.1314 112.88 23.2604 113.699 21.5707V23.8754H115.902V5.72177H113.699V13.3265C112.932 11.6624 111.498 10.817 109.629 10.817C106.044 10.817 104.252 13.8641 104.252 17.4745C104.252 21.2384 105.967 24.1314 109.373 24.1314ZM113.699 17.9865C113.699 20.8282 111.933 22.0827 109.961 22.0827C107.682 22.0827 106.453 20.5472 106.453 17.4745C106.453 14.5041 107.734 12.8657 110.217 12.8657C112.087 12.8657 113.699 14.1201 113.699 16.9619V17.9865ZM38.3549 7.69363C38.3549 6.72078 37.7149 6.15699 36.8189 6.15699C35.9223 6.15699 35.2822 6.72078 35.2822 7.69363C35.2822 8.66648 35.9223 9.22971 36.8189 9.22971C37.7155 9.22971 38.3549 8.66648 38.3549 7.69363ZM37.8947 11.073H35.6924V23.8754H37.8947V11.073ZM32.6207 7.0536H30.3161H30.3155V18.9087C30.3155 20.5728 29.6504 21.7505 27.7042 21.7505C26.8599 21.7505 26.0145 21.5968 25.3232 21.3152V23.5431C25.9638 23.7735 26.8855 23.9778 28.0887 23.9778C31.2639 23.9778 32.6207 21.8523 32.6207 18.7545V7.0536ZM43.3719 23.8754H41.2214V11.073H43.3719V13.3265C44.1144 11.8154 45.395 10.7407 47.9045 10.8944V13.0449C45.0878 12.7633 43.3719 13.6081 43.3719 16.3224V23.8754ZM53.8952 24.1314C55.8665 24.1314 57.4026 23.2604 58.2219 21.5707V23.8754H60.4241V11.073H58.2219V13.3265C57.4544 11.6624 56.0202 10.817 54.1513 10.817C50.5665 10.817 48.7744 13.8641 48.7744 17.4745C48.7744 21.2384 50.4897 24.1314 53.8952 24.1314ZM58.2219 17.9865C58.2219 20.8282 56.4554 22.0827 54.4835 22.0827C52.2044 22.0827 50.9756 20.5472 50.9756 17.4745C50.9756 14.5042 52.2562 12.8657 54.7395 12.8657C56.609 12.8657 58.2219 14.1201 58.2219 16.9619V17.9865ZM74.5039 18.37H71.1501V23.8754H68.8455V7.0536H74.5039C78.7031 7.0536 80.7518 9.20411 80.7518 12.6609C80.7518 16.3224 78.7031 18.3705 74.5039 18.3705V18.37ZM78.3703 12.7115C78.3703 10.6634 77.2182 9.25531 74.2479 9.25531H71.1501V16.1682H74.2479C77.2182 16.2712 78.3703 14.8626 78.3703 12.7115ZM82.7722 23.8754H84.9227V16.3224C84.9227 13.6081 86.6386 12.7633 89.4553 13.0449V10.8944C86.9458 10.7407 85.6652 11.8154 84.9227 13.3265V11.073H82.7722V23.8754ZM90.3247 17.4489C90.3247 13.6081 92.5776 10.817 96.4184 10.817C100.233 10.817 102.461 13.6081 102.461 17.4489C102.461 21.2896 100.233 24.1314 96.4184 24.1314C92.5776 24.1314 90.3247 21.2896 90.3247 17.4489ZM92.4752 17.4489C92.4752 19.881 93.6785 22.0827 96.4184 22.0827C99.1321 22.0827 100.31 19.881 100.31 17.4489C100.31 15.0167 99.1321 12.8657 96.4184 12.8657C93.6785 12.8657 92.4752 15.0162 92.4752 17.4489ZM118.972 11.073H121.173V18.8057C121.173 21.1104 122.095 22.1345 124.195 22.1345C126.244 22.1345 127.652 20.7776 127.652 18.1913V11.073H129.853V23.8754H127.652V21.7761C126.832 23.2865 125.321 24.1314 123.606 24.1314C120.661 24.1314 118.972 22.1083 118.972 18.5753V11.073ZM139.096 24.1314C140.273 24.1314 141.451 23.9516 142.22 23.5425H142.22V21.5707C141.426 21.8523 140.607 22.0315 139.301 22.0315C135.947 22.0315 134.564 19.9328 134.564 17.4489C134.564 14.965 135.922 12.8657 139.25 12.8657C140.453 12.8657 141.324 13.0961 142.143 13.4801V11.4314C141.145 10.9706 140.248 10.817 139.096 10.817C134.538 10.817 132.413 13.5825 132.413 17.4489C132.413 21.3659 134.539 24.1314 139.096 24.1314ZM149.796 21.8016C150.285 21.8016 150.751 21.7082 151.127 21.6329L151.179 21.6224V23.7473C150.795 23.8503 150.359 23.9522 149.693 23.9522C146.954 23.9522 145.623 22.3393 145.623 19.9578V13.1217H143.549V11.073H145.623V8.35926H147.773V11.073H151.179V13.1217H147.773V19.9066C147.773 21.033 148.439 21.8011 149.796 21.8011V21.8016ZM165.158 7.0536H158.961V23.8759H165.158C170.586 23.8759 173.248 20.5984 173.248 15.5032C173.248 10.4591 170.611 7.0536 165.158 7.0536ZM161.266 21.6736V9.25587H165.055C169.127 9.25587 170.944 11.4832 170.944 15.58C170.944 19.6506 169.024 21.6736 165.183 21.6736H161.266ZM176.805 6.15699C177.701 6.15699 178.341 6.72078 178.341 7.69363C178.341 8.66648 177.701 9.22971 176.805 9.22971C175.908 9.22971 175.268 8.66648 175.268 7.69363C175.268 6.72078 175.908 6.15699 176.805 6.15699ZM175.678 11.073H177.881V23.8754H175.678V11.073ZM180.772 23.1841C181.745 23.6962 183.307 24.1314 185.228 24.1314V24.1325C188.659 24.1325 190.041 22.5191 190.041 20.3941C190.041 18.1668 188.607 17.1166 185.765 16.4254C183.409 15.8621 182.795 15.2984 182.795 14.4029C182.795 13.4039 183.666 12.8406 185.279 12.8406C186.635 12.8406 187.89 13.2503 189.426 14.0183V11.7392C188.479 11.2272 186.968 10.8176 185.304 10.8176C182.385 10.8176 180.67 12.1744 180.67 14.4023C180.67 16.5011 181.874 17.6025 184.715 18.2937C187.148 18.8826 187.891 19.4458 187.891 20.4186C187.891 21.4176 187.02 22.1083 185.33 22.1083C183.717 22.1083 181.874 21.4939 180.772 20.8539V23.1841ZM201.613 23.5425C200.844 23.9516 199.667 24.1314 198.489 24.1314C193.932 24.1314 191.806 21.3659 191.806 17.4489C191.806 13.5825 193.931 10.817 198.489 10.817C199.641 10.817 200.538 10.9706 201.536 11.4314V13.4801C200.717 13.0961 199.846 12.8657 198.643 12.8657C195.315 12.8657 193.957 14.965 193.957 17.4489C193.957 19.9328 195.34 22.0315 198.694 22.0315C200.001 22.0315 200.819 21.8523 201.613 21.5707V23.5425H201.613ZM209.446 10.817C205.605 10.817 203.352 13.6081 203.352 17.4489C203.352 21.2896 205.605 24.1314 209.446 24.1314C213.261 24.1314 215.488 21.2896 215.488 17.4489C215.488 13.6081 213.261 10.817 209.446 10.817ZM209.446 22.0827C206.706 22.0827 205.503 19.881 205.503 17.4489C205.503 15.0162 206.706 12.8657 209.446 12.8657C212.16 12.8657 213.337 15.0167 213.337 17.4489C213.337 19.881 212.16 22.0827 209.446 22.0827ZM221.068 23.8754L216.101 11.073H218.406L222.554 22.0065L226.676 11.073H228.98L224.013 23.8754H221.068ZM229.594 17.4489C229.594 21.3659 231.693 24.1314 236.481 24.1314C237.788 24.1314 239.4 23.9266 240.45 23.3633V21.3403C239.298 21.7499 238.044 22.0315 236.559 22.0315C233.537 22.0315 232.129 20.6234 231.821 18.4473H241.167V17.4489C241.167 13.5569 239.579 10.817 235.636 10.817C231.745 10.817 229.594 13.5825 229.594 17.4489ZM238.94 16.5528H231.796C232.026 14.3249 233.204 12.8145 235.534 12.8145C237.736 12.8145 238.812 14.1719 238.94 16.5528ZM245.927 23.8754H243.777V11.073H245.927V13.3265C246.67 11.8154 247.95 10.7407 250.46 10.8944V13.0449C247.643 12.7633 245.927 13.6081 245.927 16.3224V23.8754ZM250.919 11.073L255.554 23.0556H256.987C255.936 25.8467 255.143 27.0761 253.351 27.0761C252.711 27.0761 251.866 26.9987 251.123 26.7683V28.6628C251.763 28.9194 252.377 29.0218 253.479 29.0218C256.731 29.0218 257.55 27.1273 258.984 23.4657L263.823 11.073H261.468L257.371 22.0315L253.275 11.073H250.919Z"
      fill="${colors.textColor}"
      />
    <path
      d="M11.6865 15.0406C11.6865 15.0406 11.7026 15.3579 11.7026 15.7959C11.7026 17.4277 10.3797 18.7506 8.74787 18.7506C7.11607 18.7506 5.79314 17.4277 5.79314 15.7959C5.79314 14.1641 7.11607 12.8412 8.74787 12.8412C9.18588 12.8412 9.45469 12.8573 9.45469 12.8573V7.08252C9.2215 7.0636 8.98608 7.05191 8.74787 7.05191C3.91645 7.05135 0 10.9678 0 15.7992C0 20.6307 3.91645 24.5465 8.74732 24.5465C13.5782 24.5465 17.4946 20.6301 17.4946 15.7992C17.4946 15.521 17.4896 15.3278 17.4668 15.0412H11.6859L11.6865 15.0406Z"
      fill="url(#${id})"
      />
    <path
      d="M10.7886 6.18872C13.2163 6.84489 15.644 6.84489 18.0717 6.18872C18.247 6.14141 18.4045 6.29891 18.3572 6.47423C17.701 8.9019 17.701 11.3296 18.3572 13.7573C18.4045 13.9326 18.247 14.0901 18.0717 14.0428C15.644 13.3866 13.2163 13.3866 10.7886 14.0428C10.6133 14.0901 10.4558 13.9326 10.5031 13.7573C11.1593 11.3296 11.1593 8.9019 10.5031 6.47423C10.4558 6.29891 10.6133 6.14141 10.7886 6.18872V6.18872Z"
      fill="${colors.iconColor}"
      />
    <defs>
      <linearGradient
        id="${id}"
        x1="7.66149"
        y1="16.8845"
        x2="13.7229"
        y2="10.8231"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="${colors.iconGradientStop}" />
        <stop offset="0.927" stop-color="${colors.iconGradientStart}" ${
    colors.iconGradientStart === 'inherit' ? 'stop-opacity="0.4"' : ''
  } />
      </linearGradient>
    </defs>
  </svg>`;
};

/**
 * __Jira Product Discovery logo__
 *
 * The Jira Product Discovery logo with both the wordmark and the icon combined.
 *
 * - [Examples](https://atlassian.design/components/logo/examples)
 * - [Code](https://atlassian.design/components/logo/code)
 * - [Usage](https://atlassian.design/components/logo/usage)
 */
export const JiraProductDiscoveryLogo = ({
  appearance,
  label = 'Jira Product Discovery',
  size = defaultLogoParams.size,
  testId,
  iconColor = defaultLogoParams.iconColor,
  iconGradientStart = defaultLogoParams.iconGradientStart,
  iconGradientStop = defaultLogoParams.iconGradientStop,
  textColor = defaultLogoParams.textColor,
}: LogoProps) => {
  return (
    <Wrapper
      appearance={appearance}
      label={label}
      iconColor={iconColor}
      iconGradientStart={iconGradientStart}
      iconGradientStop={iconGradientStop}
      size={size}
      svg={svg({
        appearance,
        iconGradientStart,
        iconGradientStop,
        iconColor,
        textColor,
      })}
      testId={testId}
      textColor={textColor}
    />
  );
};