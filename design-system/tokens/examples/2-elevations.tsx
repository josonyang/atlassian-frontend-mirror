/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import AtlassianIcon from '@atlaskit/icon/glyph/emoji/atlassian';
import { token } from '@atlaskit/tokens';

import { useVrGlobalTheme } from './utils/use-vr-global-theme';

const nonInteractiveStyles = {
	sunken: {
		label: 'elevation.surface.sunken',
		surface: token('elevation.surface.sunken'),
		shadow: 'none',
	},
};
const interactiveBackgroundStyles = {
	default: {
		label: 'elevation.surface',
		surface: token('elevation.surface'),
		surfaceHovered: token('elevation.surface.hovered'),
		surfacePressed: token('elevation.surface.pressed'),
		shadow: 'none',
	},
	defaultOutline: {
		label: 'elevation.surface (with border)',
		surface: token('elevation.surface'),
		surfaceHovered: token('elevation.surface.hovered'),
		surfacePressed: token('elevation.surface.pressed'),
		shadow: 'none',
		border: token('color.border'),
	},
	raised: {
		label: 'elevation.surface.raised',
		surface: token('elevation.surface.raised'),
		surfaceHovered: token('elevation.surface.raised.hovered'),
		surfacePressed: token('elevation.surface.raised.pressed'),
		shadow: token('elevation.shadow.raised'),
	},
	overlay: {
		label: 'elevation.surface.overlay',
		surface: token('elevation.surface.overlay'),
		surfaceHovered: token('elevation.surface.overlay.hovered'),
		surfacePressed: token('elevation.surface.overlay.pressed'),
		shadow: token('elevation.shadow.overlay'),
	},
};

const interactiveElevationStyles = {
	default: {
		label: 'elevation.surface',
		surface: token('elevation.surface'),
		surfaceHovered: token('elevation.surface.overlay'),
		surfacePressed: token('elevation.surface.raised'),
		shadow: 'none',
		shadowHovered: token('elevation.shadow.overlay'),
		shadowPressed: token('elevation.shadow.raised'),
	},
	defaultOutline: {
		label: 'elevation.surface (with border)',
		surface: token('elevation.surface'),
		surfaceHovered: token('elevation.surface.overlay'),
		surfacePressed: token('elevation.surface.raised'),
		border: token('color.border'),
		shadow: 'none',
		shadowHovered: token('elevation.shadow.overlay'),
		shadowPressed: token('elevation.shadow.raised'),
	},
	raised: {
		label: 'elevation.surface.raised',
		surface: token('elevation.surface.raised'),
		surfaceHovered: token('elevation.surface.overlay'),
		surfacePressed: token('elevation.surface.raised'),
		shadow: token('elevation.shadow.raised'),
		shadowHovered: token('elevation.shadow.overlay'),
		shadowPressed: token('elevation.shadow.raised'),
	},
};

const containerStyles = css({
	padding: '2em',
});

const boxStyles = css({
	display: 'flex',
	boxSizing: 'border-box',
	width: '100%',
	maxWidth: '200px',
	minHeight: '100px',
	padding: '1em',
	alignItems: 'center',
	borderRadius: token('border.radius.100', '3px'),
	marginBlockStart: '1em',
	textAlign: 'left',
	transition: 'box-shadow 200ms, background 200ms, border 200ms',
});

const Box = ({ text, style }: { text: string; style: Record<string, string> }) => {
	const isInteractive = style.surfacePressed || style.shadowPressed;
	const ComponentType = isInteractive ? 'button' : 'div';
	return (
		<ComponentType
			css={[
				boxStyles,
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				css({
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
					backgroundColor: style.surface,
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
					border: style.border ? `1px solid ${style.border}` : 'none',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
					boxShadow: style.shadow,
					color: token('color.text'),
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
					cursor: isInteractive ? 'pointer' : 'default',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
					':hover': {
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
						backgroundColor: style.surfaceHovered || style.surface,
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
						boxShadow: style.shadowHovered || style.shadow,
					},
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
					':active': {
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
						backgroundColor: style.surfacePressed || style.surface,
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
						boxShadow: style.shadowPressed || style.shadow,
					},
				}),
			]}
		>
			<AtlassianIcon label="Atlassian logo" primaryColor={style.iconColor} />
			{text}
		</ComponentType>
	);
};

export default () => {
	useVrGlobalTheme();

	return (
		<div css={containerStyles}>
			<h2>Elevations & Surfaces</h2>
			<h3>Non-interactive surfaces</h3>
			{Object.entries(nonInteractiveStyles).map(([key, styles]) => (
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				<Box key={key} style={styles} text={styles.label || key} />
			))}
			<h3>Interactive elevations (approach 1: background change)</h3>
			{Object.entries(interactiveBackgroundStyles).map(([key, styles]) => (
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				<Box key={key} style={styles} text={styles.label || key} />
			))}
			<h3>Interactive elevations (approach 2: elevation change)</h3>
			{Object.entries(interactiveElevationStyles).map(([key, styles]) => (
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				<Box key={key} style={styles} text={styles.label || key} />
			))}
		</div>
	);
};
