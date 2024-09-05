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
			id="mask0_7095_34615"
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
		<g mask="url(#mask0_7095_34615)">
			<g
				style={{
					mixBlendMode: 'lighten',
				}}
				opacity="0.6"
			>
				<path
					d="M35.2 33.9524C35.7545 34.5991 36.2809 35.2645 36.7841 35.9439C36.7841 35.9439 36.9425 36.1735 37.1662 36.5483C37.4038 36.9185 37.7066 37.4433 38.0048 38.0244C38.303 38.6054 38.5872 39.2567 38.7223 39.8705C38.8015 40.1798 38.8062 40.4703 38.7782 40.7233C38.7503 40.9811 38.6245 41.1638 38.5033 41.3137C38.112 41.6089 37.5482 41.6324 37.0217 41.5808C36.4859 41.5293 35.9548 41.3793 35.4376 41.2153C34.3987 40.8686 33.3876 40.4094 32.4046 39.9127C32.4046 39.9127 32.2462 39.8377 31.9992 39.7253C31.7523 39.6034 31.4215 39.4394 31.0627 39.2614C30.3499 38.9006 29.5485 38.4789 29.1618 38.3102C28.6819 38.0993 28.3511 37.9916 28.2486 38.0197C28.0529 38.0572 28.7565 38.7178 31.1652 39.9643C31.1885 39.9877 31.2817 40.0486 31.2864 40.0627C32.5816 40.6765 33.8442 41.3044 35.2094 41.7776C35.8942 42.0072 36.6024 42.2134 37.3991 42.2368C37.7905 42.2556 38.2378 42.1947 38.6664 41.9604C38.8807 41.8432 39.0811 41.6605 39.2162 41.4403C39.356 41.2153 39.4258 40.9764 39.4631 40.7421C39.4165 40.7796 39.3932 40.6577 39.4258 40.5547L39.4771 40.5968C39.4864 39.9924 39.342 39.5332 39.2162 39.1068C39.0718 38.6897 38.9227 38.3102 38.7503 37.9541C38.4102 37.2371 38.0141 36.5811 37.4457 35.883C37.4457 35.883 37.6181 36.0142 37.6228 36.0189C34.2076 30.9067 28.3092 25.1011 23.2587 20.912L23.2774 20.9401H23.2634C23.7107 21.3619 25.8166 23.358 25.8166 23.358C24.0182 22.1022 22.3222 20.2748 20.5005 18.8316L20.5564 18.7847C21.3392 19.4173 22.0473 19.9608 22.3409 20.167C20.9897 18.9721 18.8931 17.2478 16.7173 15.6546C14.5508 14.0521 12.2958 12.5995 10.7863 11.7514C10.8375 11.8451 11.8113 12.3043 11.9417 12.6042C11.1963 12.131 10.4275 11.6905 9.70535 11.2735C9.76126 11.1704 10.1619 11.4468 10.2505 11.4796C9.94762 11.2875 8.18648 10.1114 5.54476 8.95871C4.8785 8.67756 4.15634 8.4011 3.35963 8.20899C2.95429 8.12465 2.54429 8.03093 2.09235 8.02625C1.64974 8.02625 1.14189 8.05905 0.671322 8.37768C0.433707 8.52293 0.238025 8.77128 0.135524 9.03368C0.0423417 9.29608 -0.00424946 9.56785 0.000409659 9.8162C0.000409659 10.3223 0.121547 10.7674 0.265979 11.1985C0.559504 12.0513 0.978824 12.8151 1.41678 13.5414C2.29735 14.9893 3.28509 16.2591 4.17964 17.3509C5.07885 18.438 5.90351 19.3329 6.52317 19.9796C7.77647 21.2635 8.1958 21.5774 7.09158 20.2092L7.25465 20.2982C6.0526 18.9534 5.07885 17.8054 4.01191 16.2544C3.83952 16.0529 3.83486 16.0201 3.78361 16.0576C3.73236 16.0061 3.6485 15.9264 3.6485 15.9639C3.55066 16.0763 3.2385 15.5703 3.08474 15.3641C3.36429 15.3501 2.48372 14.1927 1.6544 12.8291C1.23973 12.1497 0.848369 11.414 0.634049 10.7674C0.52689 10.4441 0.461662 10.1442 0.443026 9.90054C0.433707 9.65688 0.452344 9.46945 0.489617 9.37574C0.601436 9.3242 0.717914 8.96339 1.07667 8.75253C1.4261 8.53231 1.92462 8.50419 2.15758 8.56042C2.12031 8.56042 1.91065 8.60728 1.88735 8.62602C1.98985 8.64476 2.4977 8.64945 3.17793 8.79471C3.85816 8.93059 4.69214 9.19768 5.4376 9.4882C6.92852 10.0739 8.07932 10.6784 7.1009 10.3223C10.8189 12.4262 15.8041 15.8046 20.5657 19.6281C25.3274 23.447 29.8653 27.711 32.7773 31.305L32.7493 31.2347C32.7913 31.2956 32.9497 31.4549 32.9637 31.5205C33.2991 31.8298 33.8675 32.4296 34.3428 32.9638C34.818 33.4979 35.2 33.9571 35.2 33.9571V33.9524ZM20.1977 18.9721C20.1977 18.9721 20.1837 18.9721 20.1837 18.9815C20.193 18.9581 19.2565 18.2318 19.2193 18.199L19.2705 18.1474C20.3095 18.7753 22.1498 20.9214 20.2396 19.094C20.1604 19.0518 20.1977 19.0049 20.1977 18.9721ZM11.6249 12.7776C11.4525 12.6651 11.2662 12.5386 11.0612 12.4027C13.5212 13.6491 16.3958 16.0248 18.8279 17.796C17.8262 17.4165 15.9719 15.8139 14.9142 15.0642C13.81 14.3707 12.5754 13.4383 11.6249 12.7823V12.7776ZM2.25076 14.0193L2.28804 14.0052L2.33929 14.0849C2.33929 14.0849 2.31599 14.0849 2.29735 14.0709C2.28338 14.0615 2.26008 14.038 2.25076 14.0193ZM34.4173 32.7154C34.2449 32.5983 33.779 31.9891 34.189 32.3031C34.2589 32.4155 34.5431 32.6732 34.4173 32.7154ZM9.01114 11.1095C8.95523 11.2125 8.06534 10.7487 8.13989 10.6081C8.44739 10.7627 8.73159 10.9408 9.01114 11.1095ZM38.6338 38.8725C38.8435 39.0786 38.6851 39.0552 38.6385 39.163C38.6338 39.0974 38.5593 38.8678 38.6291 38.8959V38.8725H38.6338ZM36.6956 41.7542C36.6211 41.8011 36.3462 41.787 36.2204 41.7683C35.9129 41.6605 36.5652 41.6745 36.6956 41.7542ZM29.5951 38.685C29.5485 38.7413 29.3761 38.6663 29.3715 38.582C29.4134 38.5492 29.6277 38.6241 29.6138 38.7132C29.6138 38.7132 29.6138 38.6991 29.5951 38.6897V38.685ZM4.91112 8.85094C5.24657 8.74785 6.04794 9.26797 6.51851 9.42728C6.33681 9.56317 5.58203 9.06648 5.2093 8.95871C5.08816 8.90716 4.98566 8.87436 4.91112 8.84625V8.85094ZM29.5159 26.8535C29.637 26.713 30.2707 27.547 30.5363 27.7673L30.4803 27.8141C30.1076 27.4627 29.8607 27.28 29.5299 26.8676L29.5159 26.8535ZM13.2137 13.3305C13.4187 13.3774 13.6516 13.6163 13.8147 13.7288C13.7541 13.8131 13.0459 13.3539 13.2137 13.3305ZM20.1371 18.438C20.0998 18.5551 19.8063 18.2458 19.7038 18.1802C19.7877 18.213 19.9507 18.2552 20.03 18.3208C20.0812 18.3677 20.0905 18.3864 20.1418 18.438H20.1371ZM29.1944 26.638C28.9102 26.3615 28.6027 26.0617 28.3092 25.7758L28.3698 25.7337C28.668 26.0242 28.9615 26.3147 29.255 26.5958L29.1991 26.638H29.1944ZM26.3431 23.7844L26.3896 23.7328C26.8695 24.0749 26.795 24.2576 26.3524 23.7938L26.3431 23.7844ZM32.8658 30.3257C32.8285 30.2788 32.7633 30.2039 32.726 30.1617C32.1576 29.5525 33.1407 30.2367 32.8658 30.3257ZM35.7405 33.6104C35.8011 33.6713 35.8849 33.7416 35.9362 33.8166C36.2903 34.2898 35.7545 33.8775 35.7405 33.6104Z"
					fill={secondaryColor}
				/>
			</g>
			<g
				style={{
					mixBlendMode: 'lighten',
				}}
				opacity="0.6"
			>
				<path
					d="M11.5644 38.0009C10.8469 38.4601 10.1201 38.9006 9.38396 39.3223C9.38396 39.3223 9.13703 39.4441 8.73634 39.6316C8.33566 39.819 7.78588 40.072 7.17554 40.3204C5.96417 40.8358 4.48723 41.2763 3.64393 41.2622C3.12211 41.2294 2.63756 40.9436 2.53972 40.4469C2.43256 39.9596 2.56301 39.4113 2.73074 38.9006C3.09881 37.8744 3.66722 36.9138 4.28223 35.9908C4.28223 35.9908 4.6503 35.4004 5.09757 34.7397C5.54485 34.0743 6.07599 33.3386 6.29497 32.9731C6.57451 32.5233 6.7236 32.2094 6.71429 32.1063C6.70031 31.9985 6.52326 32.1063 6.13656 32.5139C5.74985 32.9169 5.15814 33.6245 4.38939 34.7537C4.36143 34.7771 4.29155 34.8615 4.27291 34.8615C3.88154 35.4706 3.49484 36.0751 3.13608 36.6983C2.77267 37.3168 2.43722 37.9588 2.17631 38.6616C2.04585 39.0131 1.94335 39.3879 1.8921 39.7862C1.86415 40.1939 1.87346 40.6624 2.14369 41.1123C2.4279 41.5574 2.92177 41.787 3.34109 41.8573C3.76972 41.937 4.17973 41.9229 4.56643 41.862C4.51984 41.8245 4.61768 41.773 4.71553 41.7823L4.69223 41.8432C5.70326 41.623 6.45338 41.3512 7.18952 41.0795C7.921 40.7983 8.60589 40.4797 9.36066 39.9924C9.36066 39.9924 9.21157 40.147 9.20691 40.1517C14.6721 37.3871 21.3206 32.4577 26.208 28.0578L26.1754 28.0719V28.0578C25.6955 28.4373 23.4032 30.232 23.4032 30.232C24.9175 28.6388 26.9768 27.2237 28.6774 25.6306L28.7146 25.6962C27.9738 26.3756 27.3262 26.9988 27.0793 27.2612C28.463 26.0992 30.4851 24.2764 32.3814 22.3506C34.2869 20.4341 36.0574 18.4005 37.101 17.0088C37.0032 17.0463 36.4068 17.9507 36.0947 18.0397C36.6677 17.3603 37.2129 16.6621 37.7254 15.9967C37.8185 16.067 37.4878 16.4278 37.4458 16.5168C37.567 16.3809 37.9676 15.9077 38.536 15.1626C39.0951 14.4129 39.8313 13.3914 40.5115 12.0935C40.8423 11.4375 41.1778 10.7159 41.3082 9.83964C41.3548 9.40386 41.3548 8.865 41.0194 8.38706C40.8423 8.16683 40.6233 7.97471 40.3764 7.87163C40.1341 7.76854 39.8825 7.70762 39.6496 7.69357C38.6945 7.6186 37.8372 7.86694 37.0079 8.12466C36.1785 8.39643 35.3865 8.73849 34.6317 9.09929C31.6033 10.5566 29.0594 12.2903 27.6011 13.3305C26.1521 14.3895 25.7794 14.7597 27.2889 13.86L27.1771 14.0099C28.682 13.0072 29.954 12.2059 31.6266 11.3531C31.8502 11.2126 31.8828 11.2079 31.8549 11.1516C31.9108 11.1095 32.004 11.0345 31.9667 11.0251C31.8689 10.9127 32.4093 10.669 32.6376 10.5425C32.6143 10.819 33.8816 10.102 35.3119 9.40386C36.0294 9.05243 36.7889 8.71506 37.4365 8.49014C38.0795 8.26054 38.6106 8.14808 38.8156 8.13403C38.9088 8.23243 39.3001 8.18088 39.7195 8.22306C39.9291 8.25117 40.1434 8.29803 40.3158 8.39643C40.4789 8.49483 40.5907 8.6354 40.6327 8.73849C40.6187 8.70569 40.4416 8.60729 40.4277 8.59323C40.4416 8.64477 40.5441 8.7338 40.6187 8.91655C40.6839 9.09929 40.7538 9.37106 40.7165 9.70375C40.6653 10.3738 40.3484 11.2079 40.0083 11.9248C39.2955 13.368 38.536 14.4317 39.0159 13.5039C36.4907 16.9666 32.3907 21.4087 27.8946 25.565C23.4079 29.7259 18.5019 33.5823 14.5323 35.958L14.6068 35.9392C14.5416 35.972 14.3599 36.1079 14.2947 36.1126C13.9406 36.3984 13.265 36.881 12.6686 37.2793C12.0769 37.6776 11.5691 37.9963 11.5691 37.9963L11.5644 38.0009ZM28.5935 25.3073C28.5935 25.3073 28.5935 25.2932 28.5888 25.2932C28.5935 25.2932 28.6494 25.2464 28.7333 25.1714C28.8171 25.0964 28.929 24.9933 29.0408 24.8902C29.2644 24.6794 29.488 24.4685 29.5067 24.4545L29.5486 24.5107C28.7705 25.4478 26.3758 26.9566 28.4677 25.3307C28.5189 25.2557 28.5609 25.3026 28.5935 25.3073ZM35.9829 17.6929C36.118 17.5383 36.2671 17.3696 36.4348 17.1822C34.86 19.4595 32.0785 21.9663 29.9679 24.1218C30.4944 23.1846 32.3534 21.5774 33.2526 20.6403C34.1006 19.6422 35.2001 18.5504 35.9829 17.6929ZM34.068 9.88181L34.0773 9.91929L33.9934 9.96147C33.9934 9.96147 33.9934 9.93804 34.0074 9.92398C34.0167 9.90992 34.0447 9.89118 34.068 9.88181ZM12.8969 37.3918C13.0367 37.2372 13.703 36.8576 13.3349 37.2231C13.2138 37.2746 12.9202 37.523 12.8969 37.3918ZM37.9909 15.3173C37.9024 15.247 38.4708 14.4223 38.6013 14.5113C38.4056 14.7972 38.2006 15.0642 37.9909 15.3173ZM6.29031 40.8967C6.07599 41.0982 6.10394 40.9389 5.99678 40.8967C6.06667 40.8967 6.29962 40.8264 6.26701 40.8967H6.29031ZM2.29278 40.1798C2.23688 40.1189 2.18097 39.8284 2.20892 39.7019C2.25551 39.5379 2.28347 39.6269 2.28813 39.7675C2.28813 39.908 2.32074 40.1048 2.28813 40.1845L2.29278 40.1798ZM5.86633 33.3433C5.81974 33.2918 5.91292 33.1278 6.00144 33.1325C6.0294 33.1793 5.92224 33.3855 5.83837 33.3574C5.83837 33.3574 5.85235 33.3574 5.86633 33.3433ZM40.6746 11.4422C40.7631 11.7936 40.1761 12.5714 39.9571 13.0213C39.8406 12.8245 40.4183 12.1122 40.5441 11.742C40.6047 11.6202 40.642 11.5218 40.6746 11.4468V11.4422ZM19.4057 33.3761C19.5269 33.5167 18.6044 34.0227 18.3528 34.257L18.3155 34.1961C18.7162 33.8775 18.9398 33.6619 19.3917 33.3902L19.4104 33.3761H19.4057ZM35.2048 19.1971C35.1302 19.3939 34.8553 19.5907 34.7249 19.7406C34.6503 19.6703 35.2048 19.0284 35.2094 19.1971H35.2048ZM29.1293 25.326C29.0221 25.2698 29.3716 25.0261 29.4508 24.9324C29.4042 25.0074 29.339 25.1667 29.2644 25.2323C29.2132 25.2792 29.1899 25.2838 29.134 25.326H29.1293ZM19.6666 33.0903C19.9834 32.8513 20.3236 32.5889 20.6544 32.3406L20.687 32.4062C20.3562 32.6592 20.0254 32.9075 19.7039 33.1559L19.6713 33.0903H19.6666ZM22.9094 30.6865L22.956 30.7427C22.5413 31.1644 22.3782 31.0614 22.9001 30.6959L22.9094 30.6865ZM15.4734 36.1922C15.5247 36.1594 15.6085 36.1079 15.6551 36.0798C16.34 35.6018 15.52 36.4828 15.4734 36.1922ZM11.8207 38.5867C11.7555 38.6382 11.6669 38.7132 11.5877 38.7553C11.0706 39.0459 11.5504 38.5632 11.8207 38.5867Z"
					fill={secondaryColor}
				/>
			</g>
		</g>
		<path d="M34.9388 22.845H13.6282V33.2575H34.9388V22.845Z" fill="#101214" />
		<path d="M28.315 16.3788H7.00439V26.7913H28.315V16.3788Z" fill="white" />
		<path d="M28.315 22.845H13.6282V26.7913H28.315V22.845Z" fill={primaryColor} />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M33.6132 26.6076L29.0238 31.1969L26.6526 28.7601L27.6763 27.7669L29.0413 29.1669L32.6069 25.6013L33.6176 26.6119L33.6132 26.6076Z"
			fill="white"
		/>
		<path
			d="M19.1069 13.2367C18.8661 13.1873 18.7335 12.9498 18.4436 13.0909C17.574 13.5164 16.4612 14.9083 16.1099 15.4866C15.2673 15.9168 13.7639 17.84 13.1621 18.8345C12.801 19.4763 11.7864 21.1408 11.7864 21.1408L11.6612 21.1314C11.6612 21.1314 9.71067 18.6252 8.71823 18.1127C8.54136 18.0563 8.3473 18.1103 8.1778 18.3619C8.08691 18.4512 8.75754 19.2458 8.91476 19.2552C9.06706 19.1753 9.76717 20.2004 10.1946 20.7176C11.5334 22.3445 11.7938 22.4855 12.4251 21.9636C13.4765 21.0937 18.0186 14.8847 19.1069 13.2343V13.2367Z"
			fill="#101214"
		/>
	</svg>
);
