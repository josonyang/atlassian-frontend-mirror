/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useEffect, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx, type SerializedStyles } from '@emotion/react';

import { AVATAR_SIZES, AvatarContent, type SizeType } from '@atlaskit/avatar';
import PeopleGroupIcon from '@atlaskit/icon/core/people-group';
import TeamIcon from '@atlaskit/icon/glyph/people';
import { fg } from '@atlaskit/platform-feature-flags';
import { N0, N90 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { FallbackAvatar } from './fallback';
import { TeamAvatarImage as TeamAvatarImageNext } from './teams-avatar-image-next';

type AvatarImageProps = {
	size: SizeType;
	alt?: string;
	src?: string;
	testId?: string;
};

const ICON_BACKGROUND = token('color.icon.inverse', N0);
const ICON_COLOR = token('color.icon.subtle', N90);
// used in a size calculation so can't be a token. Without this the avatar looks very squished
const ICON_PADDING = 4;

const avatarDefaultIconStyles = css({
	display: 'flex',
	backgroundColor: ICON_COLOR,
	borderRadius: '50%',
	width: '100%',
	height: '100%',
	justifyContent: 'center',
	alignItems: 'center',
});

const SIZES: Record<SizeType, number> = {
	xsmall: 16,
	small: 24,
	medium: 32,
	large: 40,
	xlarge: 96,
	xxlarge: 128,
};

const nestedAvatarStyles = Object.entries(AVATAR_SIZES).reduce(
	(styles, [key, size]) => {
		return {
			...styles,

			[key]: css({
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
				width: `${size}px`,
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
				height: `${size}px`,

				// eslint-disable-next-line @atlaskit/design-system/no-nested-styles, @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
				'& svg': {
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
					width: `${size - ICON_PADDING}px`,
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
					height: `${size - ICON_PADDING}px`,
				},
			}),
		};
	},
	{} as Record<SizeType, SerializedStyles>,
);

const avatarImageStyles = css({
	display: 'flex',
	flex: '1 1 100%',
	width: '100%',
	height: '100%',
});

/**
 * __Avatar image__
 *
 * An avatar image is an internal component used to control the rendering phases of an image.
 */
export const TeamAvatarImageLegacy = ({ alt = '', src, size, testId }: AvatarImageProps) => {
	const [hasImageErrored, setHasImageErrored] = useState(false);

	// If src changes, reset state
	useEffect(() => {
		setHasImageErrored(false);
	}, [src]);

	if (!src || hasImageErrored) {
		if (fg('enable-team-avatar-switch')) {
			return (
				<FallbackAvatar
					aria-label={alt}
					width={SIZES[size]}
					height={SIZES[size]}
					data-testid={testId}
				/>
			);
		}
		return (
			<span css={[avatarDefaultIconStyles, nestedAvatarStyles[size]]}>
				<PeopleGroupIcon
					label={alt}
					color={ICON_BACKGROUND}
					LEGACY_secondaryColor={ICON_COLOR}
					testId={testId && `${testId}--team`}
					spacing="spacious"
					LEGACY_fallbackIcon={TeamIcon}
				/>
			</span>
		);
	}

	return (
		<AvatarContent>
			<img
				src={src}
				alt={alt}
				data-testid={testId && `${testId}--image`}
				css={avatarImageStyles}
				onError={() => setHasImageErrored(true)}
			/>
		</AvatarContent>
	);
};

export const TeamAvatarImage = (props: AvatarImageProps) => {
	if (fg('team-avatar-radii')) {
		return <TeamAvatarImageNext {...props} />;
	}
	return <TeamAvatarImageLegacy {...props} />;
};
