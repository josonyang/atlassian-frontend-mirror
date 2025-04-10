/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { css, jsx } from "@compiled/react";

const SIZE = 100;

const genericErrorStyles = css({
	width: `${SIZE}px`,
	height: `${SIZE}px`,
	display: 'block',
});

const id = 'related-links-unavailable-svg';

export const SpotSearchNoResult = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			data-testid={id}
			viewBox="0 0 275 275"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			css={genericErrorStyles}
			{...props}
		>
			<path
				d="M185.8 91.8398C183.73 87.8698 181.19 83.9198 178.16 79.9998C175.09 76.0298 171.85 72.5298 168.49 69.4898C148.48 51.4098 123.89 49.7498 100.86 62.2398C96.93 64.3698 93.05 66.9098 89.24 69.8498C85.27 72.9198 81.7 76.1798 78.54 79.5898C60.71 98.8298 56.14 123 68.5 146.8C70.59 150.82 73.16 154.83 76.23 158.81C79.26 162.73 82.45 166.18 85.77 169.18C105.65 187.13 130.22 188.8 153.36 176.36C157.46 174.16 161.51 171.53 165.48 168.46C169.29 165.52 172.72 162.39 175.77 159.13C193.68 139.96 198.25 115.7 185.78 91.8398H185.8Z"
				fill="white"/>
			<path
				d="M123.44 191.28C108.24 191.28 93.7 185.56 81.19 174.27C77.54 170.97 74.05 167.18 70.82 163.01C67.55 158.78 64.72 154.39 62.43 149.97C49.09 124.3 53.13 96.9499 73.52 74.9399C76.97 71.2199 80.85 67.6799 85.05 64.4299C89.1 61.2999 93.32 58.5299 97.59 56.2099C123.97 41.8999 151.49 44.8899 173.08 64.3999C176.77 67.7399 180.3 71.5699 183.58 75.7999C186.81 79.9699 189.6 84.2999 191.88 88.6599C205.36 114.45 201.32 141.84 180.8 163.8C177.49 167.35 173.75 170.74 169.69 173.87C165.48 177.12 161.08 179.99 156.62 182.39C145.57 188.33 134.33 191.27 123.44 191.27V191.28ZM130.69 60.9799C122.04 60.9799 113.08 63.3899 104.12 68.2599C100.5 70.2299 96.9 72.5899 93.42 75.2699C89.81 78.0599 86.49 81.0799 83.56 84.2499C67.1 102.02 63.91 123.11 74.58 143.65C76.5 147.34 78.88 151.04 81.66 154.62C84.39 158.15 87.32 161.34 90.38 164.1C107.54 179.6 128.76 181.81 150.14 170.33C153.94 168.29 157.7 165.84 161.31 163.04C164.79 160.35 167.97 157.46 170.79 154.45C187.34 136.74 190.51 115.63 179.74 95.0099C177.84 91.3699 175.48 87.7199 172.75 84.1899C169.97 80.5999 167 77.3599 163.91 74.5699C153.91 65.5399 142.59 60.9799 130.71 60.9799H130.69Z"
				fill="#DDDEE1"/>
			<path
				d="M179.96 171C176.42 166.07 172.62 166.1 168.91 168.97C165.43 171.66 164.5 175.3 168.21 180.09L172.45 185.57L184.2 176.48L179.96 171Z"
				fill="#DDDEE1"/>
			<path d="M187.155 174.199L169.513 187.839L202.665 230.717L220.307 217.077L187.155 174.199Z" fill="#DDDEE1"/>
			<path d="M184.32 176.391L172.35 185.646L183.592 200.186L195.562 190.932L184.32 176.391Z" fill="#B7B9BE"/>
			<path
				d="M133.191 135.999H123.188V135.365C122.847 128.249 126.886 120.545 132.628 117.392L132.735 117.335C132.891 117.254 133.041 117.16 133.187 117.063C136.32 115.043 138.103 111.565 137.993 107.733C137.884 103.937 135.925 100.598 132.753 98.8051C130.749 97.6711 128.515 97.0723 126.29 97.0723C119.516 97.0723 114.005 102.622 114.005 109.443H104C104 97.0689 113.999 87 126.289 87C130.227 87 134.156 88.0454 137.652 90.0226C143.914 93.5645 147.78 100.077 147.991 107.443C148.204 114.843 144.699 121.603 138.619 125.524C138.21 125.793 137.793 126.041 137.38 126.258C134.995 127.598 132.999 131.723 133.183 134.947L133.191 136V135.999Z"
				fill="#DDDEE1"/>
			<path fillRule="evenodd" clipRule="evenodd"
						d="M127.222 141.775C127.726 141.691 128.277 141.64 128.84 141.64C129.318 141.64 129.859 141.668 130.429 141.765C133.69 142.3 136.342 144.587 136.986 148.149L136.991 148.175L136.996 148.203C137.078 148.699 137.13 149.24 137.13 149.81C137.13 150.377 137.079 150.924 136.992 151.43L136.99 151.44C136.36 155.039 133.666 157.318 130.418 157.847C129.857 157.94 129.334 157.97 128.84 157.97C128.267 157.97 127.732 157.918 127.243 157.839L127.241 157.839C123.977 157.31 121.312 155.027 120.665 151.466L120.659 151.437L120.654 151.408C120.573 150.919 120.52 150.387 120.52 149.81C120.52 149.24 120.572 148.699 120.654 148.203L120.659 148.174L120.665 148.145C121.315 144.567 123.99 142.316 127.219 141.775L127.222 141.775Z"
						fill="#DDDEE1"/>
		</svg>
	)
};
