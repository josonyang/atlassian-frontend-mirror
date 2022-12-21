// TODO: https://product-fabric.atlassian.net/browse/DSP-4138
/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
import React from 'react';

export default function IconEmoji() {
  return (
    <svg focusable="false" aria-hidden width={40} height={40}>
      <g fill="none" fillRule="evenodd">
        <path fill="#FFF" d="M0 0h40v40H0z" />
        <path
          d="M32 20c0 6.627-5.373 12-12 12S8 26.627 8 20 13.373 8 20 8s12 5.373 12 12"
          fill="#FFCC4D"
        />
        <path
          d="M20 22c-2.415 0-4.018-.281-6-.667-.453-.087-1.333 0-1.333 1.334 0 2.666 3.063 6 7.333 6s7.333-3.334 7.333-6c0-1.334-.88-1.422-1.333-1.334-1.982.386-3.585.667-6 .667"
          fill="#664500"
        />
        <path
          d="M14 22.667s2 .666 6 .666 6-.666 6-.666-1.333 2.666-6 2.666-6-2.666-6-2.666"
          fill="#FFF"
        />
        <path
          d="M17.667 17c0 1.29-.746 2.333-1.667 2.333-.92 0-1.667-1.044-1.667-2.333 0-1.289.746-2.333 1.667-2.333.92 0 1.667 1.044 1.667 2.333m8 0c0 1.29-.746 2.333-1.667 2.333-.92 0-1.667-1.044-1.667-2.333 0-1.289.746-2.333 1.667-2.333.92 0 1.667 1.044 1.667 2.333"
          fill="#664500"
        />
      </g>
    </svg>
  );
}
