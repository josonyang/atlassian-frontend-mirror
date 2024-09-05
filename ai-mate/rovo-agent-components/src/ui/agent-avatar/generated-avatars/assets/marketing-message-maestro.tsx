/* eslint-disable @atlaskit/ui-styling-standard/enforce-style-prop */
import React from 'react';

import { type AvatarIconProps } from './types';

export default ({ size, primaryColor, secondaryColor }: AvatarIconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 42 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M19.0069 1.14541C20.241 0.436192 21.759 0.436193 22.9931 1.14541L39.9931 10.9152C41.2346 11.6287 42 12.9514 42 14.3833V33.891C42 35.3229 41.2346 36.6456 39.9931 37.3591L22.9931 47.1289C21.759 47.8381 20.241 47.8381 19.0069 47.1289L2.00691 37.3591C0.765414 36.6456 0 35.3229 0 33.891V14.3833C0 12.9514 0.765415 11.6287 2.00691 10.9152L19.0069 1.14541Z"
			fill={primaryColor}
		/>
		<mask
			id="mask0_7095_41146"
			style={{ maskType: 'alpha' }}
			maskUnits="userSpaceOnUse"
			x="0"
			y="0"
			width="42"
			height="48"
		>
			<path
				d="M19.0069 1.14541C20.241 0.436192 21.759 0.436193 22.9931 1.14541L39.9931 10.9152C41.2346 11.6287 42 12.9514 42 14.3833V33.891C42 35.3229 41.2346 36.6456 39.9931 37.3591L22.9931 47.1289C21.759 47.8381 20.241 47.8381 19.0069 47.1289L2.00691 37.3591C0.765414 36.6456 0 35.3229 0 33.891V14.3833C0 12.9514 0.765415 11.6287 2.00691 10.9152L19.0069 1.14541Z"
				fill={primaryColor}
			/>
		</mask>
		<g mask="url(#mask0_7095_41146)">
			<path
				d="M38.8146 33.2372C42.8863 26.2593 41.6736 20.7329 40.7508 17.0853C41.2687 15.0932 35.744 6.57273 37.391 11.9803C39.4893 14.2246 40.9099 22.1599 39.2797 26.6694C40.3775 27.8999 35.5039 36.4685 38.8144 33.2338L38.8146 33.2372Z"
				fill={secondaryColor}
			/>
			<path
				d="M35.4493 29.7688C37.6984 27.0185 37.2267 23.1905 36.9474 21.6173C37.7975 22.8484 37.2465 19.476 36.8197 18.9481C36.8839 19.4831 36.5196 19.221 36.4571 18.7768C37.3824 18.5829 34.8601 12.8143 33.8218 14.4824C34.2377 15.1759 33.9231 15.5506 34.6706 15.5721C33.8085 15.9813 35.1115 16.6446 35.2234 16.884C35.0807 17.4173 34.8669 17.416 35.4162 18.0683C35.468 18.9811 35.2885 20.3008 35.6629 21.8181C35.8553 23.9518 35.255 25.1507 35.183 26.929C34.948 27.6898 33.3874 31.5119 35.443 29.7759L35.4493 29.7688Z"
				fill={secondaryColor}
			/>
			<path
				d="M31.8448 26.7481C32.6747 25.6506 33.1238 24.2986 32.9003 22.4529C32.2919 23.2685 32.2675 22.5394 32.5537 22.0249C33.3266 22.9708 32.9746 19.8767 32.4045 20.7103C32.2439 20.5107 32.3221 20.2739 32.5001 20.4221C32.9653 19.2342 30.1673 15.8412 30.8921 18.6887C31.3443 18.5283 30.2507 19.1021 31.3712 19.419C31.092 19.8792 30.9183 19.7476 31.363 20.1129C31.3592 20.5238 30.8977 21.358 31.269 22.1618C31.6128 23.3172 30.6023 23.8022 31.2574 24.6471C30.834 25.1963 30.499 27.72 31.8479 26.7412L31.8448 26.7481Z"
				fill={secondaryColor}
			/>
			<path
				d="M0.920702 17.5408C-1.78535 25.153 0.431775 30.3585 2.01544 33.7715C1.87621 35.8251 8.88604 43.1724 6.26425 38.1643C3.7859 36.3484 0.917413 28.8145 1.68244 24.0808C0.375448 23.0754 3.57425 13.7513 0.921512 17.5441L0.920702 17.5408Z"
				fill={secondaryColor}
			/>
			<path
				d="M4.87117 20.3245C3.17154 23.4444 4.34544 27.1183 4.91179 28.6124C3.848 27.5605 5.01524 30.7721 5.53265 31.2116C5.3702 30.6978 5.7768 30.8877 5.92067 31.3126C5.04745 31.6749 8.59637 36.8753 9.30712 35.0434C8.76974 34.4391 9.00934 34.0125 8.27079 34.1301C9.04207 33.568 7.6386 33.158 7.48415 32.9436C7.52545 32.393 7.73577 32.3547 7.07501 31.8157C6.85471 30.9284 6.78621 29.5982 6.13668 28.1767C5.55174 26.1158 5.91907 24.8263 5.65989 23.0655C5.74963 22.2744 6.57387 18.229 4.87613 20.3163L4.87117 20.3245Z"
				fill={secondaryColor}
			/>
			<path
				d="M8.9736 22.6239C8.36179 23.8563 8.17141 25.2681 8.73353 27.0403C9.18004 26.1259 9.33932 26.8379 9.15349 27.3966C8.21851 26.6105 9.13863 29.5855 9.54412 28.6606C9.73897 28.827 9.70608 29.0741 9.50366 28.9616C9.26701 30.2152 12.646 33.03 11.4054 30.3665C10.9908 30.608 11.959 29.8412 10.7991 29.7378C10.9881 29.2337 11.1832 29.3308 10.6783 29.0544C10.6058 28.6499 10.9045 27.7446 10.3905 27.0237C9.83831 25.9521 10.7413 25.288 9.94069 24.5794C10.2548 23.9612 10.1157 21.4191 8.97193 22.6312L8.9736 22.6239Z"
				fill={secondaryColor}
			/>
		</g>
		<path
			d="M26.7573 33.1935C26.7668 32.8779 26.7428 32.5452 26.6902 32.1992C26.6376 31.8532 26.556 31.5204 26.4524 31.2175C25.8372 29.4126 24.3747 28.4667 22.522 28.4475C22.207 28.4423 21.8787 28.4656 21.5413 28.5169C21.2039 28.5682 20.8575 28.6475 20.546 28.7524C18.784 29.33 17.6724 30.6629 17.6158 32.5611C17.607 32.8811 17.6273 33.2187 17.6806 33.5691C17.7339 33.9194 17.8135 34.2392 17.9121 34.5384C18.5253 36.3303 19.9835 37.2769 21.8418 37.3041C22.1698 37.3073 22.5118 37.2863 22.8621 37.2331C23.2125 37.1798 23.5156 37.1071 23.8191 37.0079C25.5824 36.4389 26.7014 35.096 26.7486 33.1948L26.7573 33.1935Z"
			fill="#101214"
		/>
		<path
			d="M29.83 23.2208L31.0927 31.5253L13.2725 34.2348L12.0098 25.9302C11.1733 20.4285 12.7616 17.1955 15.8738 15.6027C15.8639 15.5378 15.8541 15.4729 15.8436 15.4037C15.8008 15.1226 15.7866 14.8548 15.7917 14.5974C15.835 13.0773 16.7257 12.0082 18.1421 11.545C18.3907 11.4629 18.655 11.3962 18.9404 11.3528C19.2086 11.312 19.4714 11.2942 19.7245 11.3C21.209 11.3132 22.3822 12.073 22.8766 13.5201C22.958 13.7644 23.0197 14.025 23.0625 14.3061C23.0723 14.371 23.0822 14.4359 23.0834 14.5021C26.7044 15.0623 29.1948 17.6751 29.8343 23.2201L29.83 23.2208Z"
			fill="white"
		/>
		<path
			d="M26.6938 32.1942L17.6928 33.5627C17.6396 33.2124 17.6162 32.884 17.6294 32.5634C17.6816 30.6659 18.7976 29.3323 20.5552 28.7553C20.8674 28.6548 21.2002 28.5732 21.5505 28.5199C21.9009 28.4666 22.2119 28.4459 22.5312 28.4505C24.3839 28.4697 25.8421 29.4162 26.4573 31.2212C26.5652 31.5234 26.6405 31.8438 26.6938 32.1942Z"
			fill={primaryColor}
		/>
	</svg>
);
