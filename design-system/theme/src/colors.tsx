/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
import { token } from '@atlaskit/tokens';

import themed from './utils/themed';

// Reds
export const R50 = '#FFEBE6';
export const R75 = '#FFBDAD';
export const R100 = '#FF8F73';
export const R200 = '#FF7452';
export const R300 = '#FF5630';
export const R400 = '#DE350B';
export const R500 = '#BF2600';

// Yellows
export const Y50 = '#FFFAE6';
export const Y75 = '#FFF0B3';
export const Y100 = '#FFE380';
export const Y200 = '#FFC400';
export const Y300 = '#FFAB00';
export const Y400 = '#FF991F';
export const Y500 = '#FF8B00';

// Greens
export const G50 = '#E3FCEF';
export const G75 = '#ABF5D1';
export const G100 = '#79F2C0';
export const G200 = '#57D9A3';
export const G300 = '#36B37E';
export const G400 = '#00875A';
export const G500 = '#006644';

// Blues
export const B50 = '#DEEBFF';
export const B75 = '#B3D4FF';
export const B100 = '#4C9AFF';
export const B200 = '#2684FF';
export const B300 = '#0065FF';
export const B400 = '#0052CC';
export const B500 = '#0747A6';

// Purples
export const P50 = '#EAE6FF';
export const P75 = '#C0B6F2';
export const P100 = '#998DD9';
export const P200 = '#8777D9';
export const P300 = '#6554C0';
export const P400 = '#5243AA';
export const P500 = '#403294';

// Teals
export const T50 = '#E6FCFF';
export const T75 = '#B3F5FF';
export const T100 = '#79E2F2';
export const T200 = '#00C7E6';
export const T300 = '#00B8D9';
export const T400 = '#00A3BF';
export const T500 = '#008DA6';

// Neutrals
export const N0 = '#FFFFFF';
export const N10 = '#FAFBFC';
export const N20 = '#F4F5F7';
export const N30 = '#EBECF0';
export const N40 = '#DFE1E6';
export const N50 = '#C1C7D0';
export const N60 = '#B3BAC5';
export const N70 = '#A5ADBA';
export const N80 = '#97A0AF';
export const N90 = '#8993A4';
export const N100 = '#7A869A';
export const N200 = '#6B778C';
export const N300 = '#5E6C84';
export const N400 = '#505F79';
export const N500 = '#42526E';
export const N600 = '#344563';
export const N700 = '#253858';
export const N800 = '#172B4D';

// ATTENTION: update the tints if you update this
export const N900 = '#091E42';

// Each tint is made of N900 and an alpha channel
export const N10A = 'rgba(9, 30, 66, 0.02)';
export const N20A = 'rgba(9, 30, 66, 0.04)';
export const N30A = 'rgba(9, 30, 66, 0.08)';
export const N40A = 'rgba(9, 30, 66, 0.13)';
export const N50A = 'rgba(9, 30, 66, 0.25)';
export const N60A = 'rgba(9, 30, 66, 0.31)';
export const N70A = 'rgba(9, 30, 66, 0.36)';
export const N80A = 'rgba(9, 30, 66, 0.42)';
export const N90A = 'rgba(9, 30, 66, 0.48)';
export const N100A = 'rgba(9, 30, 66, 0.54)';
export const N200A = 'rgba(9, 30, 66, 0.60)';
export const N300A = 'rgba(9, 30, 66, 0.66)';
export const N400A = 'rgba(9, 30, 66, 0.71)';
export const N500A = 'rgba(9, 30, 66, 0.77)';
export const N600A = 'rgba(9, 30, 66, 0.82)';
export const N700A = 'rgba(9, 30, 66, 0.89)';
export const N800A = 'rgba(9, 30, 66, 0.95)';

// Dark Mode Neutrals
export const DN900 = '#E6EDFA';
export const DN800 = '#DCE5F5';
export const DN700 = '#CED9EB';
export const DN600 = '#B8C7E0';
export const DN500 = '#ABBBD6';
export const DN400 = '#9FB0CC';
export const DN300 = '#8C9CB8';
export const DN200 = '#7988A3';
export const DN100 = '#67758F';
export const DN90 = '#56637A';
export const DN80 = '#455166';
export const DN70 = '#3B475C';
export const DN60 = '#313D52';
export const DN50 = '#283447';
export const DN40 = '#202B3D';
export const DN30 = '#1B2638';
export const DN20 = '#121A29';
export const DN10 = '#0E1624';

// ATTENTION: update the tints if you update this
export const DN0 = '#0D1424';

// Each dark tint is made of DN0 and an alpha channel
export const DN800A = 'rgba(13, 20, 36, 0.06)';
export const DN700A = 'rgba(13, 20, 36, 0.14)';
export const DN600A = 'rgba(13, 20, 36, 0.18)';
export const DN500A = 'rgba(13, 20, 36, 0.29)';
export const DN400A = 'rgba(13, 20, 36, 0.36)';
export const DN300A = 'rgba(13, 20, 36, 0.40)';
export const DN200A = 'rgba(13, 20, 36, 0.47)';
export const DN100A = 'rgba(13, 20, 36, 0.53)';
export const DN90A = 'rgba(13, 20, 36, 0.63)';
export const DN80A = 'rgba(13, 20, 36, 0.73)';
export const DN70A = 'rgba(13, 20, 36, 0.78)';
export const DN60A = 'rgba(13, 20, 36, 0.81)';
export const DN50A = 'rgba(13, 20, 36, 0.85)';
export const DN40A = 'rgba(13, 20, 36, 0.89)';
export const DN30A = 'rgba(13, 20, 36, 0.92)';
export const DN20A = 'rgba(13, 20, 36, 0.95)';
export const DN10A = 'rgba(13, 20, 36, 0.97)';

/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('elevation.surface')` instead.
 */
export const background = themed({
	light: token('elevation.surface', N0),
	dark: token('elevation.surface', DN30),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.background.selected')` instead.
 */
export const backgroundActive = themed({
	light: token('color.background.selected', B50),
	dark: token('color.background.selected', B75),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.background.neutral.hovered')` instead.
 */
export const backgroundHover = themed({
	light: token('color.background.neutral.hovered', N30),
	dark: token('color.background.neutral.hovered', DN70),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('elevation.surface.overlay')` instead.
 */
export const backgroundOnLayer = themed({
	light: token('elevation.surface.overlay', N0),
	dark: token('elevation.surface.overlay', DN50),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.text')` instead.
 */
export const text = themed({
	light: token('color.text', N900),
	dark: token('color.text', DN600),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.text')` instead.
 */
export const textHover = themed({
	light: token('color.text', N800),
	dark: token('color.text', DN600),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.text.selected')` instead.
 */
export const textActive = themed({
	light: token('color.text.selected', B400),
	dark: token('color.text.selected', B400),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.text.subtlest')` instead.
 */
export const subtleText = themed({
	light: token('color.text.subtlest', N200),
	dark: token('color.text.subtlest', DN300),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use token('color.text.subtlest', N200) instead. Use DN200 as the fallback color for dark mode.
 */
export const placeholderText = themed({
	light: token('color.text.subtlest', N200),
	dark: token('color.text.subtlest', DN200),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.text')` instead.
 */
export const heading = themed({
	light: token('color.text', N800),
	dark: token('color.text', DN600),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.text.subtlest')` instead.
 */
export const subtleHeading = themed({
	light: token('color.text.subtlest', N200),
	dark: token('color.text.subtlest', DN300),
});
export const codeBlock = themed({ light: N20, dark: DN50 });
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.link')` instead.
 */
export const link = themed({
	light: token('color.link', B400),
	dark: token('color.link', B100),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.link.pressed')` instead.
 */
export const linkHover = themed({
	light: token('color.link.pressed', B300),
	dark: token('color.link.pressed', B200),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.link.pressed')` instead.
 */
export const linkActive = themed({
	light: token('color.link.pressed', B500),
	dark: token('color.link.pressed', B100),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.border.focused', B200)` instead.
 */
export const linkOutline = themed({
	light: token('color.border.focused', B200),
	dark: token('color.border.focused', B200),
});
/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.background.brand.bold')` instead.
 */
export const primary = themed({
	light: token('color.background.brand.bold', B400),
	dark: token('color.background.brand.bold', B100),
});
export const blue = themed({
	light: B400,
	dark: B100,
});
export const teal = themed({
	light: T300,
	dark: T200,
});
export const purple = themed({
	light: P300,
	dark: P100,
});
export const red = themed({
	light: R300,
	dark: R300,
});
export const yellow = themed({
	light: Y300,
	dark: Y300,
});
export const green = themed({
	light: G300,
	dark: G300,
});

/**
 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-386 Internal documentation for deprecation (no external access)}
 * @deprecated use `token('color.skeleton')` instead.
 */
export const skeleton = () => token('color.skeleton', N20A);
