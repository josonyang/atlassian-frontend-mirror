/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import { genericErrorStyles } from './styled';

const GenericErrorSVG = (props: React.SVGProps<SVGSVGElement>) => {
  const id = 'link-picker-ui-generic-error-svg';

  return (
    <svg
      height="90"
      viewBox="0 0 164 212"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={genericErrorStyles}
      {...props}
    >
      <path
        d="m95.43 74.16 66.44 115.08c5.84 10.12-1.46 22.76-13.14 22.76H15.85c-11.68 0-18.98-12.65-13.14-22.76L69.15 74.16c5.84-10.12 20.44-10.12 26.28 0Zm-7.56 83.55 2.88-44.35c.34-5.29-3.86-9.78-9.16-9.78-5.31 0-9.51 4.48-9.16 9.78l2.88 44.35a6.3 6.3 0 0 0 6.28 5.89c3.31 0 6.06-2.58 6.28-5.89Zm-15.84 23.54c0 5.66 4.76 10.1 10.39 9.58 4.85-.45 8.73-4.5 8.83-9.37.11-5.45-4.31-9.94-9.73-9.94-5.23-.01-9.49 4.37-9.49 9.73Z"
        fill={`url(#${id})`}
      />
      <path
        opacity=".6"
        d="M93.35 27.17 85.94.45c-.17-.62-1.07-.58-1.19.05l-4.66 25.1-5.8-1.08a.612.612 0 0 0-.7.76L81 52c.17.62 1.07.58 1.19-.05l4.66-25.1 5.8 1.08c.45.08.82-.33.7-.76ZM66.77 41.81 55.9 33.26c-.22-.18-.53.07-.41.33l5.53 11.43-2.66 1.29c-.18.09-.2.33-.05.45l10.87 8.55c.22.18.53-.07.41-.33l-5.53-11.43 2.66-1.29c.17-.08.2-.33.05-.45Z"
        fill="#C1C7D0"
      />
      <path
        opacity=".6"
        d="M102.78 56.75a.993.993 0 0 1-.92-1.38c-.24-.77-2.29-2.85-3.54-4.11-2.97-3.01-4.93-5-3.84-6.49 1.09-1.48 3.58-.22 7.35 1.7 1.32.67 3.35 1.7 4.45 2.03-.64-.95-2.24-2.58-3.28-3.63-2.97-3.01-4.93-5-3.84-6.49 1.08-1.48 3.58-.22 7.34 1.7 1.32.67 3.34 1.7 4.45 2.03-.64-.95-2.24-2.57-3.28-3.62-2.97-3.01-4.93-5-3.84-6.49 1.08-1.48 3.57-.22 7.34 1.7 1.58.8 4.18 2.13 4.98 2.13a1.005 1.005 0 0 1 1.46 1.36c-1.09 1.48-3.57.22-7.34-1.7-1.32-.67-3.34-1.7-4.44-2.03.64.95 2.24 2.57 3.28 3.62 2.97 3.01 4.93 5 3.84 6.49-1.08 1.48-3.57.22-7.34-1.7-1.32-.67-3.35-1.7-4.45-2.03.64.95 2.24 2.57 3.28 3.63 2.97 3.01 4.93 5 3.84 6.49-1.09 1.48-3.58.22-7.35-1.7-1.32-.67-3.35-1.71-4.45-2.03.64.95 2.24 2.58 3.28 3.63 2.97 3.01 4.93 5 3.84 6.49-.21.26-.51.4-.82.4Zm5.56 14.32c-.35 0-.69-.19-.88-.52-1.04-1.88-2.22-4.02-.91-5.21 1.31-1.2 3.34.18 5.49 1.63.87.59 2.26 1.53 2.93 1.71-.12-.68-.93-2.15-1.45-3.07-1.26-2.27-2.45-4.41-1.14-5.61 1.31-1.2 3.34.18 5.49 1.63.96.65 2.54 1.72 3.1 1.74a1 1 0 0 1 1.27 1.54c-1.31 1.2-3.34-.17-5.49-1.63-.87-.59-2.26-1.53-2.93-1.71.12.68.93 2.15 1.45 3.07 1.26 2.27 2.45 4.41 1.14 5.61-1.31 1.2-3.34-.18-5.49-1.63-.87-.59-2.26-1.53-2.93-1.71.12.68.93 2.14 1.22 2.67.27.48.09 1.09-.39 1.36-.15.09-.32.13-.48.13Zm-54.32-2.89c-.22 0-.44-.04-.67-.14-1.64-.69-1.24-3.11-.81-5.67.17-1.04.45-2.7.33-3.38-.57.39-1.56 1.75-2.18 2.6-1.53 2.09-2.99 4.07-4.62 3.38a.991.991 0 0 1-.53-1.31c.2-.48.73-.72 1.21-.57.52-.21 1.65-1.75 2.34-2.68 1.53-2.09 2.98-4.08 4.62-3.38 1.64.69 1.24 3.11.81 5.67-.17 1.04-.45 2.7-.33 3.38.57-.39 1.56-1.75 2.18-2.6 1.53-2.09 2.98-4.08 4.62-3.38 1.63.69 1.24 3.09.89 5.21-.09.54-.6.91-1.15.83-.54-.09-.92-.6-.83-1.15.1-.59.37-2.24.26-2.92-.57.39-1.56 1.75-2.18 2.6-1.33 1.79-2.59 3.51-3.96 3.51Z"
        fill="#B3BAC5"
      />
      <defs>
        <linearGradient
          id={id}
          x1="26.169"
          y1="228.621"
          x2="138.408"
          y2="116.382"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C1C7D0" />
          <stop offset=".297" stopColor="#C6CBD4" stopOpacity=".881" />
          <stop offset=".63" stopColor="#D3D7DE" stopOpacity=".748" />
          <stop offset=".98" stopColor="#E9EBEF" stopOpacity=".608" />
          <stop offset="1" stopColor="#EBECF0" stopOpacity=".6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GenericErrorSVG;
