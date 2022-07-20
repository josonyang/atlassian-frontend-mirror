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
  <svg
    height="32"
    viewBox="0 0 278 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="${colors.textColor}"
      clip-rule="evenodd"
      d="m97.0767 4v19.1237h2.3791v-6.305l6.0842 6.305h3.234l-6.776-6.8448 6.5-6.6485h-3.096l-5.9462 6.3296v-11.96zm-84.0054.55058c-.2088-.0757-.4319-.1066-.654-.09058-.222-.0155-.4448.01575-.6534.09164-.2085.07589-.3979.19465-.5553.34821-.1573.15356-.279.33835-.3568.54183s-.1098.4209-.0939.63752c0 .42944.1748.84129.486 1.14495s.7333.47425 1.1734.47425.8622-.17059 1.1734-.47425.486-.71551.486-1.14495c.0165-.21674-.0152-.43438-.0928-.6381s-.1993-.38872-.3568-.5424c-.1575-.15367-.3471-.27241-.5558-.34812zm.5089 5.07982h-2.3792v13.4933h2.3792zm-5.69792-4.22587h-2.48914l.00943 12.49357c0 1.7695-.726 2.9962-2.82857 2.9962-.88006.0065-1.753432-.1496-2.574-.46v2.349c.962129.3182 1.97311.4727 2.98886.457 3.42885 0 4.89342-2.2387 4.89342-5.5047zm11.61582 17.71917h-2.3226v-13.4933h2.3226v2.3736c.8014-1.5916 2.1843-2.7232 4.8966-2.56373v2.26933c-3.0423-.3067-4.8966.5919-4.8966 3.4531zm11.3678.2791c2.1308 0 3.7903-.9169 4.6734-2.6987l.0032 2.4196h2.3791v-13.4933h-2.3791v2.3828c-.8329-1.7541-2.3823-2.64347-4.4-2.64347-3.872 0-5.808 3.21077-5.808 7.01657 0 3.9682 1.8543 7.0165 5.5314 7.0165zm4.6734-6.4768c0 2.9961-1.9077 4.3179-4.0385 4.3179-2.4609 0-3.7872-1.6192-3.7966-4.8576 0-3.1311 1.3828-4.8576 4.0637-4.8576 2.0303 0 3.7714 1.3217 3.7714 4.3178zm8.6023-11.52147h2.5709l4.7142 15.43457 5.1732-15.43457h2.9291l5.1732 15.43457 4.73-15.43457h2.4891l-5.7106 17.71917h-3.1805l-5.0286-15.1401-5.0286 15.1401h-3.0988zm34.3763 3.9652c-4.1486 0-6.5811 2.94097-6.5811 6.98897s2.4608 7.0533 6.5811 7.0533 6.5277-3.0053 6.5277-7.0533-2.3791-6.98897-6.5277-6.98897zm0 11.87417c-2.9574 0-4.2586-2.3215-4.2586-4.8852h.0032c0-2.5638 1.3231-4.83 4.2554-4.83s4.2052 2.2662 4.2052 4.83c0 2.5637-1.2478 4.8852-4.2052 4.8852zm11.6162 1.8798h-2.3226v-13.4933h2.3226v2.3736c.8014-1.5916 2.1843-2.7232 4.8966-2.56373v2.26933c-3.0423-.3067-4.8966.5919-4.8966 3.4531zm28.7349-16.2533v16.2533h-2.492v-17.71917h4.315l4.12 10.17217 1.688 4.8852 1.688-4.8852 4.148-10.17217h4.01v17.71917h-2.489v-16.07543l-2.131 6.39703-4.007 9.6784h-2.407l-3.954-9.6784zm26.164 16.5324c2.131 0 3.791-.9169 4.674-2.6987l.003 2.4196h2.379v-13.4933h-2.379v2.3828c-.833-1.7541-2.382-2.64347-4.4-2.64347-3.872 0-5.808 3.21077-5.808 7.01657 0 3.9682 1.854 7.0165 5.531 7.0165zm4.674-6.4768c0 2.9961-1.908 4.3179-4.039 4.3179-2.461 0-3.787-1.6192-3.796-4.8576 0-3.1311 1.383-4.8576 4.063-4.8576 2.031 0 3.772 1.3217 3.772 4.3178zm17.729 6.1977h-2.379v-8.142c0-2.4288-.997-3.5082-3.263-3.5082-2.2 0-3.733 1.4321-3.733 4.1584v7.4918h-2.38v-13.4933h2.38v2.2141c.423-.7665 1.054-1.4041 1.825-1.8424.771-.43831 1.651-.66034 2.543-.64157 3.181 0 5.007 2.14667 5.007 5.85737zm8.02.2791c2.131 0 3.791-.9169 4.674-2.6987l.003 2.4196h2.379v-13.4933h-2.379v2.3828c-.833-1.7541-2.382-2.64347-4.4-2.64347-3.872 0-5.808 3.21077-5.808 7.01657 0 3.9682 1.854 7.0165 5.531 7.0165zm4.674-6.4768c0 2.9961-1.908 4.3179-4.039 4.3179-2.461 0-3.771-1.6192-3.771-4.8668 0-3.1219 1.367-4.8484 4.038-4.8484 2.031 0 3.772 1.3217 3.772 4.3178zm15.293 3.7781c-.883 1.7818-2.543 2.6987-4.673 2.6987-3.659 0-5.475-3.0391-5.475-7.0257 0-3.8058 1.907-7.01657 5.751-7.01657 2.021 0 3.567.88937 4.4 2.64347v-2.3736h2.326v12.2667c0 3.9682-1.911 6.6393-6.861 6.6393-1.672.0477-3.34-.1995-4.922-.7299v-2.2294c1.549.5193 3.174.7927 4.812.8096 3.457 0 4.645-1.8094 4.645-4.3179zm-4.035.5398c2.127 0 4.035-1.3218 4.035-4.3179v-1.0795c0-2.9961-1.741-4.3178-3.771-4.3178-2.684 0-4.067 1.7265-4.067 4.8576.012 3.2384 1.339 4.8576 3.803 4.8576zm9.126-4.8944c0 4.14 2.266 7.0533 7.44 7.0533 1.411 0 3.152-.2147 4.28-.7943v-2.1466c-1.346.477-2.767.7199-4.199.7176-3.262 0-4.783-1.4843-5.116-3.7782h10.091v-1.0518c0-4.1002-1.709-6.98897-5.971-6.98897-4.202 0-6.525 2.91337-6.525 6.98897zm10.095-.92h-7.719v-.0154c.252-2.346 1.522-3.9437 4.039-3.9437 2.379 0 3.542 1.4352 3.68 3.9591zm16.981 7.6942h-2.379v-8.142c0-2.4288-.996-3.5082-3.266-3.5082-2.2 0-3.73 1.4321-3.73 4.1584v7.4918h-2.379v-13.4933h2.369v2.2141c.423-.7667 1.055-1.4045 1.826-1.8428.771-.4384 1.651-.66028 2.543-.64117 2.351 0 3.954 1.15917 4.645 3.29357.776-2.0792 2.628-3.29357 4.925-3.29357 3.096 0 4.812 2.05157 4.812 5.85737v7.9058h-2.379v-7.4918c.009-2.7815-.972-4.1615-3.253-4.1615-2.2 0-3.734 1.4321-3.734 4.1584zm11.864-6.7742c0 4.14 2.266 7.0533 7.439 7.0533 1.412 0 3.153-.2147 4.287-.8035v-2.1466c-1.347.4808-2.77.7269-4.205.7268-3.262 0-4.783-1.4843-5.116-3.7782h10.094v-1.0518c0-4.1002-1.712-6.98897-5.971-6.98897-4.205 0-6.528 2.91337-6.528 6.98897zm10.095-.92h-7.716v-.0154c.258-2.346 1.515-3.9437 4.03-3.9437 2.385 0 3.548 1.4352 3.686 3.9591zm16.981 7.6942h-2.379v-8.142c0-2.4288-1.003-3.5113-3.262-3.5113-2.2 0-3.734 1.4321-3.734 4.1584v7.4949h-2.379v-13.4933h2.379v2.2141c.423-.7667 1.054-1.4045 1.825-1.8428.771-.4384 1.651-.66028 2.543-.64117 3.181 0 5.007 2.14667 5.007 5.85737zm10.287-2.3644c-.49.1102-.99.1728-1.493.1871-1.465 0-2.184-.8096-2.188-1.9964v-7.1729h3.678v-2.1467h-3.678v-2.852h-2.322v2.852h-2.241v2.1681h2.241v7.2067c0 2.5085 1.439 4.2075 4.4 4.2075.542.0028 1.082-.0695 1.603-.2147z"
      fill-rule="evenodd"
    />
  </svg>`;
};

export const JiraWorkManagementWordmark = ({
  appearance,
  label = 'Jira Work Management',
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
      svg={svg({ appearance, textColor })}
      iconColor={iconColor}
      iconGradientStart={iconGradientStart}
      iconGradientStop={iconGradientStop}
      size={size}
      testId={testId}
      textColor={textColor}
    />
  );
};
