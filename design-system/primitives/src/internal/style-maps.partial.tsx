import { css, SerializedStyles } from '@emotion/react';

import { token } from '@atlaskit/tokens';

/**
 * THIS SECTION WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::fc517b480964965a9d7e6e5c8d921c19>>
 * @codegenId dimensions
 * @codegenCommand yarn codegen-styles
 * @codegenParams ["dimensions"]
 * @codegenDependency ../../scripts/codegen-file-templates/dimensions.tsx <<SignedSource::9e8ad113b10e9429c514c69bd362f479>>
 */
export const dimensionMap = {
  '100%': '100%',
  'size.100': '16px',
  'size.200': '24px',
  'size.300': '32px',
  'size.400': '40px',
  'size.500': '48px',
  'size.600': '96px',
  'size.1000': '192px',
} as const;

export type Width = keyof typeof dimensionMap;
export type Height = keyof typeof dimensionMap;
export type MinWidth = keyof typeof dimensionMap;
export type MaxWidth = keyof typeof dimensionMap;
export type MinHeight = keyof typeof dimensionMap;
export type MaxHeight = keyof typeof dimensionMap;
export type Top = keyof typeof dimensionMap;
export type Left = keyof typeof dimensionMap;
export type Bottom = keyof typeof dimensionMap;
export type Right = keyof typeof dimensionMap;
export type BlockSize = keyof typeof dimensionMap;
export type InlineSize = keyof typeof dimensionMap;
export type MaxBlockSize = keyof typeof dimensionMap;
export type MaxInlineSize = keyof typeof dimensionMap;
export type MinBlockSize = keyof typeof dimensionMap;
export type MinInlineSize = keyof typeof dimensionMap;

/**
 * @codegenEnd
 */

/**
 * THIS SECTION WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::8ce817b8abf862e7945a9c9792a1255e>>
 * @codegenId spacing
 * @codegenCommand yarn codegen-styles
 * @codegenParams ["padding", "space", "inset"]
 * @codegenDependency ../../../tokens/src/artifacts/tokens-raw/atlassian-spacing.tsx <<SignedSource::167d3b69b159ae33e74d4ea5ab7eade6>>
 */
export const paddingMap = {
  'space.0': token('space.0', '0px'),
  'space.025': token('space.025', '2px'),
  'space.050': token('space.050', '4px'),
  'space.075': token('space.075', '6px'),
  'space.100': token('space.100', '8px'),
  'space.150': token('space.150', '12px'),
  'space.200': token('space.200', '16px'),
  'space.250': token('space.250', '20px'),
  'space.300': token('space.300', '24px'),
  'space.400': token('space.400', '32px'),
  'space.500': token('space.500', '40px'),
  'space.600': token('space.600', '48px'),
  'space.800': token('space.800', '64px'),
  'space.1000': token('space.1000', '80px'),
} as const;
export type Padding =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type PaddingBlock =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type PaddingBlockEnd =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type PaddingBlockStart =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type PaddingBottom =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type PaddingInline =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type PaddingInlineEnd =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type PaddingInlineStart =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type PaddingLeft =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type PaddingRight =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type PaddingTop =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';

export const spaceMap = {
  'space.0': token('space.0', '0px'),
  'space.025': token('space.025', '2px'),
  'space.050': token('space.050', '4px'),
  'space.075': token('space.075', '6px'),
  'space.100': token('space.100', '8px'),
  'space.150': token('space.150', '12px'),
  'space.200': token('space.200', '16px'),
  'space.250': token('space.250', '20px'),
  'space.300': token('space.300', '24px'),
  'space.400': token('space.400', '32px'),
  'space.500': token('space.500', '40px'),
  'space.600': token('space.600', '48px'),
  'space.800': token('space.800', '64px'),
  'space.1000': token('space.1000', '80px'),
} as const;
export type Gap =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type RowGap =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type ColumnGap =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';

export const insetMap = {
  'space.0': token('space.0', '0px'),
  'space.025': token('space.025', '2px'),
  'space.050': token('space.050', '4px'),
  'space.075': token('space.075', '6px'),
  'space.100': token('space.100', '8px'),
  'space.150': token('space.150', '12px'),
  'space.200': token('space.200', '16px'),
  'space.250': token('space.250', '20px'),
  'space.300': token('space.300', '24px'),
  'space.400': token('space.400', '32px'),
  'space.500': token('space.500', '40px'),
  'space.600': token('space.600', '48px'),
  'space.800': token('space.800', '64px'),
  'space.1000': token('space.1000', '80px'),
} as const;
export type Inset =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type InsetBlock =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type InsetBlockEnd =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type InsetBlockStart =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type InsetInline =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type InsetInlineEnd =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';
export type InsetInlineStart =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';

/**
 * @codegenEnd
 */

/**
 * THIS SECTION WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::4da498214befc7e312ff00d4f9f5379f>>
 * @codegenId colors
 * @codegenCommand yarn codegen-styles
 * @codegenParams ["border", "background", "shadow", "text"]
 * @codegenDependency ../../../tokens/src/artifacts/tokens-raw/atlassian-light.tsx <<SignedSource::10aa7e87eca39e4d6594a764e78e0698>>
 */
export const borderColorMap = {
  'color.border': token('color.border', '#091e4221'),
  'accent.red': token('color.border.accent.red', '#FF5630'),
  'accent.orange': token('color.border.accent.orange', '#D94008'),
  'accent.yellow': token('color.border.accent.yellow', '#FFAB00'),
  'accent.green': token('color.border.accent.green', '#36B37E'),
  'accent.teal': token('color.border.accent.teal', '#00B8D9'),
  'accent.blue': token('color.border.accent.blue', '#0065FF'),
  'accent.purple': token('color.border.accent.purple', '#6554C0'),
  'accent.magenta': token('color.border.accent.magenta', '#CD519D'),
  'accent.gray': token('color.border.accent.gray', '#5E6C84'),
  disabled: token('color.border.disabled', '#FAFBFC'),
  focused: token('color.border.focused', '#4C9AFF'),
  input: token('color.border.input', '#FAFBFC'),
  inverse: token('color.border.inverse', '#FFFFFF'),
  selected: token('color.border.selected', '#0052CC'),
  brand: token('color.border.brand', '#0052CC'),
  danger: token('color.border.danger', '#FF5630'),
  warning: token('color.border.warning', '#FFC400'),
  success: token('color.border.success', '#00875A'),
  discovery: token('color.border.discovery', '#998DD9'),
  information: token('color.border.information', '#0065FF'),
  bold: token('color.border.bold', '#344563'),
} as const;

export type BorderColor = keyof typeof borderColorMap;

export const backgroundColorMap = {
  'accent.red.subtlest': token(
    'color.background.accent.red.subtlest',
    '#FF8F73',
  ),
  'accent.red.subtler': token('color.background.accent.red.subtler', '#FF7452'),
  'accent.red.subtle': token('color.background.accent.red.subtle', '#DE350B'),
  'accent.red.bolder': token('color.background.accent.red.bolder', '#DE350B'),
  'accent.orange.subtlest': token(
    'color.background.accent.orange.subtlest',
    '#F18D13',
  ),
  'accent.orange.subtler': token(
    'color.background.accent.orange.subtler',
    '#B65C02',
  ),
  'accent.orange.subtle': token(
    'color.background.accent.orange.subtle',
    '#5F3811',
  ),
  'accent.orange.bolder': token(
    'color.background.accent.orange.bolder',
    '#43290F',
  ),
  'accent.yellow.subtlest': token(
    'color.background.accent.yellow.subtlest',
    '#FFE380',
  ),
  'accent.yellow.subtler': token(
    'color.background.accent.yellow.subtler',
    '#FFC400',
  ),
  'accent.yellow.subtle': token(
    'color.background.accent.yellow.subtle',
    '#FF991F',
  ),
  'accent.yellow.bolder': token(
    'color.background.accent.yellow.bolder',
    '#FF991F',
  ),
  'accent.green.subtlest': token(
    'color.background.accent.green.subtlest',
    '#79F2C0',
  ),
  'accent.green.subtler': token(
    'color.background.accent.green.subtler',
    '#57D9A3',
  ),
  'accent.green.subtle': token(
    'color.background.accent.green.subtle',
    '#00875A',
  ),
  'accent.green.bolder': token(
    'color.background.accent.green.bolder',
    '#00875A',
  ),
  'accent.teal.subtlest': token(
    'color.background.accent.teal.subtlest',
    '#79E2F2',
  ),
  'accent.teal.subtler': token(
    'color.background.accent.teal.subtler',
    '#00C7E6',
  ),
  'accent.teal.subtle': token('color.background.accent.teal.subtle', '#00A3BF'),
  'accent.teal.bolder': token('color.background.accent.teal.bolder', '#00A3BF'),
  'accent.blue.subtlest': token(
    'color.background.accent.blue.subtlest',
    '#4C9AFF',
  ),
  'accent.blue.subtler': token(
    'color.background.accent.blue.subtler',
    '#2684FF',
  ),
  'accent.blue.subtle': token('color.background.accent.blue.subtle', '#0052CC'),
  'accent.blue.bolder': token('color.background.accent.blue.bolder', '#0052CC'),
  'accent.purple.subtlest': token(
    'color.background.accent.purple.subtlest',
    '#998DD9',
  ),
  'accent.purple.subtler': token(
    'color.background.accent.purple.subtler',
    '#8777D9',
  ),
  'accent.purple.subtle': token(
    'color.background.accent.purple.subtle',
    '#5243AA',
  ),
  'accent.purple.bolder': token(
    'color.background.accent.purple.bolder',
    '#5243AA',
  ),
  'accent.magenta.subtlest': token(
    'color.background.accent.magenta.subtlest',
    '#E774BB',
  ),
  'accent.magenta.subtler': token(
    'color.background.accent.magenta.subtler',
    '#E774BB',
  ),
  'accent.magenta.subtle': token(
    'color.background.accent.magenta.subtle',
    '#E774BB',
  ),
  'accent.magenta.bolder': token(
    'color.background.accent.magenta.bolder',
    '#E774BB',
  ),
  'accent.gray.subtlest': token(
    'color.background.accent.gray.subtlest',
    '#6B778C',
  ),
  'accent.gray.subtler': token(
    'color.background.accent.gray.subtler',
    '#5E6C84',
  ),
  'accent.gray.subtle': token('color.background.accent.gray.subtle', '#42526E'),
  'accent.gray.bolder': token('color.background.accent.gray.bolder', '#505F79'),
  disabled: token('color.background.disabled', '#091e4289'),
  input: token('color.background.input', '#FAFBFC'),
  'input.hovered': token('color.background.input.hovered', '#EBECF0'),
  'input.pressed': token('color.background.input.pressed', '#FFFFFF'),
  'inverse.subtle': token('color.background.inverse.subtle', '#00000029'),
  'inverse.subtle.hovered': token(
    'color.background.inverse.subtle.hovered',
    '#0000003D',
  ),
  'inverse.subtle.pressed': token(
    'color.background.inverse.subtle.pressed',
    '#00000052',
  ),
  neutral: token('color.background.neutral', '#DFE1E6'),
  'neutral.hovered': token('color.background.neutral.hovered', '#091e4214'),
  'neutral.pressed': token('color.background.neutral.pressed', '#B3D4FF'),
  'neutral.subtle': token('color.background.neutral.subtle', 'transparent'),
  'neutral.subtle.hovered': token(
    'color.background.neutral.subtle.hovered',
    '#091e4214',
  ),
  'neutral.subtle.pressed': token(
    'color.background.neutral.subtle.pressed',
    '#B3D4FF',
  ),
  'neutral.bold': token('color.background.neutral.bold', '#42526E'),
  'neutral.bold.hovered': token(
    'color.background.neutral.bold.hovered',
    '#505F79',
  ),
  'neutral.bold.pressed': token(
    'color.background.neutral.bold.pressed',
    '#344563',
  ),
  selected: token('color.background.selected', '#DEEBFF'),
  'selected.hovered': token('color.background.selected.hovered', '#B3D4FF'),
  'selected.pressed': token('color.background.selected.pressed', '#4C9AFF'),
  'selected.bold': token('color.background.selected.bold', '#0052CC'),
  'selected.bold.hovered': token(
    'color.background.selected.bold.hovered',
    '#2684FF',
  ),
  'selected.bold.pressed': token(
    'color.background.selected.bold.pressed',
    '#0052CC',
  ),
  'brand.bold': token('color.background.brand.bold', '#0052CC'),
  'brand.bold.hovered': token('color.background.brand.bold.hovered', '#0065FF'),
  'brand.bold.pressed': token('color.background.brand.bold.pressed', '#0747A6'),
  danger: token('color.background.danger', '#FFEBE6'),
  'danger.hovered': token('color.background.danger.hovered', '#FFBDAD'),
  'danger.pressed': token('color.background.danger.pressed', '#FF8F73'),
  'danger.bold': token('color.background.danger.bold', '#DE350B'),
  'danger.bold.hovered': token(
    'color.background.danger.bold.hovered',
    '#FF5630',
  ),
  'danger.bold.pressed': token(
    'color.background.danger.bold.pressed',
    '#BF2600',
  ),
  warning: token('color.background.warning', '#FFFAE6'),
  'warning.hovered': token('color.background.warning.hovered', '#FFF0B3'),
  'warning.pressed': token('color.background.warning.pressed', '#FFE380'),
  'warning.bold': token('color.background.warning.bold', '#FFAB00'),
  'warning.bold.hovered': token(
    'color.background.warning.bold.hovered',
    '#FFC400',
  ),
  'warning.bold.pressed': token(
    'color.background.warning.bold.pressed',
    '#FF991F',
  ),
  success: token('color.background.success', '#E3FCEF'),
  'success.hovered': token('color.background.success.hovered', '#ABF5D1'),
  'success.pressed': token('color.background.success.pressed', '#79F2C0'),
  'success.bold': token('color.background.success.bold', '#00875A'),
  'success.bold.hovered': token(
    'color.background.success.bold.hovered',
    '#57D9A3',
  ),
  'success.bold.pressed': token(
    'color.background.success.bold.pressed',
    '#00875A',
  ),
  discovery: token('color.background.discovery', '#EAE6FF'),
  'discovery.hovered': token('color.background.discovery.hovered', '#C0B6F2'),
  'discovery.pressed': token('color.background.discovery.pressed', '#998DD9'),
  'discovery.bold': token('color.background.discovery.bold', '#5243AA'),
  'discovery.bold.hovered': token(
    'color.background.discovery.bold.hovered',
    '#8777D9',
  ),
  'discovery.bold.pressed': token(
    'color.background.discovery.bold.pressed',
    '#5243AA',
  ),
  information: token('color.background.information', '#DEEBFF'),
  'information.hovered': token(
    'color.background.information.hovered',
    '#B3D4FF',
  ),
  'information.pressed': token(
    'color.background.information.pressed',
    '#4C9AFF',
  ),
  'information.bold': token('color.background.information.bold', '#0052CC'),
  'information.bold.hovered': token(
    'color.background.information.bold.hovered',
    '#2684FF',
  ),
  'information.bold.pressed': token(
    'color.background.information.bold.pressed',
    '#0052CC',
  ),
  'color.blanket': token('color.blanket', '#091e4289'),
  'color.blanket.selected': token('color.blanket.selected', '#388BFF14'),
  'color.blanket.danger': token('color.blanket.danger', '#EF5C4814'),
  'elevation.surface': token('elevation.surface', '#FFFFFF'),
  'elevation.surface.hovered': token('elevation.surface.hovered', '#FAFBFC'),
  'elevation.surface.pressed': token('elevation.surface.pressed', '#F4F5F7'),
  'elevation.surface.overlay': token('elevation.surface.overlay', '#FFFFFF'),
  'elevation.surface.overlay.hovered': token(
    'elevation.surface.overlay.hovered',
    '#FAFBFC',
  ),
  'elevation.surface.overlay.pressed': token(
    'elevation.surface.overlay.pressed',
    '#F4F5F7',
  ),
  'elevation.surface.raised': token('elevation.surface.raised', '#FFFFFF'),
  'elevation.surface.raised.hovered': token(
    'elevation.surface.raised.hovered',
    '#FAFBFC',
  ),
  'elevation.surface.raised.pressed': token(
    'elevation.surface.raised.pressed',
    '#F4F5F7',
  ),
  'elevation.surface.sunken': token('elevation.surface.sunken', '#F4F5F7'),
} as const;

export type BackgroundColor = keyof typeof backgroundColorMap;

export const shadowMap = {
  overflow: token(
    'elevation.shadow.overflow',
    '0px 0px 8px #091e423f, 0px 0px 1px #091e424f',
  ),
  'overflow.perimeter': token(
    'elevation.shadow.overflow.perimeter',
    '#091e421f',
  ),
  'overflow.spread': token('elevation.shadow.overflow.spread', '#091e4229'),
  overlay: token(
    'elevation.shadow.overlay',
    '0px 8px 12px #091e423f, 0px 0px 1px #091e424f',
  ),
  raised: token(
    'elevation.shadow.raised',
    '0px 1px 1px #091e423f, 0px 0px 1px #091e4221',
  ),
} as const;

export type Shadow = keyof typeof shadowMap;

export const textColorMap = {
  'color.text': token('color.text', '#172B4D'),
  'accent.red': token('color.text.accent.red', '#DE350B'),
  'accent.red.bolder': token('color.text.accent.red.bolder', '#BF2600'),
  'accent.orange': token('color.text.accent.orange', '#F18D13'),
  'accent.orange.bolder': token('color.text.accent.orange.bolder', '#B65C02'),
  'accent.yellow': token('color.text.accent.yellow', '#FF991F'),
  'accent.yellow.bolder': token('color.text.accent.yellow.bolder', '#FF8B00'),
  'accent.green': token('color.text.accent.green', '#00875A'),
  'accent.green.bolder': token('color.text.accent.green.bolder', '#006644'),
  'accent.teal': token('color.text.accent.teal', '#00A3BF'),
  'accent.teal.bolder': token('color.text.accent.teal.bolder', '#008DA6'),
  'accent.blue': token('color.text.accent.blue', '#0052CC'),
  'accent.blue.bolder': token('color.text.accent.blue.bolder', '#0747A6'),
  'accent.purple': token('color.text.accent.purple', '#5243AA'),
  'accent.purple.bolder': token('color.text.accent.purple.bolder', '#403294'),
  'accent.magenta': token('color.text.accent.magenta', '#E774BB'),
  'accent.magenta.bolder': token('color.text.accent.magenta.bolder', '#DA62AC'),
  'accent.gray': token('color.text.accent.gray', '#505F79'),
  'accent.gray.bolder': token('color.text.accent.gray.bolder', '#172B4D'),
  disabled: token('color.text.disabled', '#A5ADBA'),
  inverse: token('color.text.inverse', '#FFFFFF'),
  selected: token('color.text.selected', '#0052CC'),
  brand: token('color.text.brand', '#0065FF'),
  danger: token('color.text.danger', '#DE350B'),
  warning: token('color.text.warning', '#974F0C'),
  'warning.inverse': token('color.text.warning.inverse', '#172B4D'),
  success: token('color.text.success', '#006644'),
  discovery: token('color.text.discovery', '#403294'),
  information: token('color.text.information', '#0052CC'),
  subtlest: token('color.text.subtlest', '#7A869A'),
  subtle: token('color.text.subtle', '#42526E'),
} as const;

export type TextColor = keyof typeof textColorMap;

/**
 * @codegenEnd
 */

/**
 * THIS SECTION WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::8838ca696c1fa533db0eb127be15d81e>>
 * @codegenId misc
 * @codegenCommand yarn codegen-styles
 * @codegenParams ["align-self", "border-style", "display", "flex-direction", "flex-grow", "flex-shrink", "flex", "layer", "overflow", "position"]
 * @codegenDependency ../../scripts/codegen-file-templates/align-self.tsx <<SignedSource::074079802534462de54bf882bb2073e5>>
 * @codegenDependency ../../scripts/codegen-file-templates/border-style.tsx <<SignedSource::87e7e289ffeaac901997c4af98084a5f>>
 * @codegenDependency ../../scripts/codegen-file-templates/dimensions.tsx <<SignedSource::9e8ad113b10e9429c514c69bd362f479>>
 * @codegenDependency ../../scripts/codegen-file-templates/display.tsx <<SignedSource::04ea30fcb3c02f2545af7fdc0206e645>>
 * @codegenDependency ../../scripts/codegen-file-templates/flex-direction.tsx <<SignedSource::19809ba11675679c188b0d98fb651dc1>>
 * @codegenDependency ../../scripts/codegen-file-templates/flex-grow.tsx <<SignedSource::b8a06b122cb609170f1f42778a6c270e>>
 * @codegenDependency ../../scripts/codegen-file-templates/flex-shrink.tsx <<SignedSource::bf6626972898bf22d2eeee2130693d47>>
 * @codegenDependency ../../scripts/codegen-file-templates/flex.tsx <<SignedSource::ffa0189d14f1f00a16ec1e9f43a17ce9>>
 * @codegenDependency ../../scripts/codegen-file-templates/layer.tsx <<SignedSource::79d24a1e558f12d671c06a7609f90dc1>>
 * @codegenDependency ../../scripts/codegen-file-templates/overflow.tsx <<SignedSource::ccb841f2f51525aed895c06e00f15089>>
 * @codegenDependency ../../scripts/codegen-file-templates/position.tsx <<SignedSource::8709494ef16c48046c1784a9aaec6d80>>
 */
export const alignSelfMap = {
  center: 'center',
  start: 'start',
  stretch: 'stretch',
  end: 'end',
  baseline: 'baseline',
} as const;

export type AlignSelf = keyof typeof alignSelfMap;

export const borderStyleMap = {
  none: 'none',
  solid: 'solid',
} as const;

export type BorderStyle = keyof typeof borderStyleMap;

export const displayMap = {
  flex: 'flex',
  block: 'block',
  inline: 'inline',
  inlineBlock: 'inline-block',
  inlineFlex: 'inline-flex',
} as const;

export type Display = keyof typeof displayMap;

export const flexDirectionMap = {
  row: 'row',
  column: 'column',
} as const;

export type FlexDirection = keyof typeof flexDirectionMap;

export const flexGrowMap = {
  '0': 0,
  '1': 1,
} as const;

export type FlexGrow = keyof typeof flexGrowMap;

export const flexShrinkMap = {
  '0': 0,
  '1': 1,
} as const;

export type FlexShrink = keyof typeof flexShrinkMap;

export const flexMap = {
  '1': 1,
} as const;

export type Flex = keyof typeof flexMap;

export const layerMap = {
  card: 100,
  navigation: 200,
  dialog: 300,
  layer: 400,
  blanket: 500,
  modal: 510,
  flag: 600,
  spotlight: 700,
  tooltip: 800,
} as const;

export type Layer = keyof typeof layerMap;

export const overflowMap = {
  auto: 'auto',
  hidden: 'hidden',
} as const;

export type Overflow = keyof typeof overflowMap;

export const overflowInlineMap = {
  auto: 'auto',
  hidden: 'hidden',
} as const;

export type OverflowInline = keyof typeof overflowInlineMap;

export const overflowBlockMap = {
  auto: 'auto',
  hidden: 'hidden',
} as const;

export type OverflowBlock = keyof typeof overflowBlockMap;

export const positionMap = {
  absolute: 'absolute',
  fixed: 'fixed',
  relative: 'relative',
  static: 'static',
} as const;

export type Position = keyof typeof positionMap;

/**
 * @codegenEnd
 */

/**
 * THIS SECTION WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::e3e1d54f37a0f8c524ccc5c8e22ad5bf>>
 * @codegenId border
 * @codegenCommand yarn codegen-styles
 * @codegenParams ["width", "radius"]
 * @codegenDependency ../../../tokens/src/artifacts/tokens-raw/atlassian-shape.tsx <<SignedSource::a4f70bd83edd3dd448c6eccda60abdf7>>
 */
export const borderWidthMap = {
  'width.0': token('border.width.0', '0'),
  'width.050': token('border.width.050', '0.0625rem'),
  'width.100': token('border.width.100', '0.125rem'),
} as const;

export type BorderWidth = keyof typeof borderWidthMap;

export const borderRadiusMap = {
  'radius.050': token('border.radius.050', '0.125rem'),
  'radius.100': token('border.radius.100', '0.25rem'),
  'radius.200': token('border.radius.200', '0.5rem'),
  'radius.300': token('border.radius.300', '0.75rem'),
  'radius.400': token('border.radius.400', '1rem'),
  'radius.round': token('border.radius.round', '50%'),
} as const;

export type BorderRadius = keyof typeof borderRadiusMap;

/**
 * @codegenEnd
 */

export type TokenisedProps = {
  alignSelf?: AlignSelf;
  backgroundColor?: BackgroundColor;
  blockSize?: BlockSize;
  borderColor?: BorderColor;
  borderRadius?: BorderRadius;
  borderStyle?: BorderStyle;
  borderWidth?: BorderWidth;
  bottom?: Bottom;
  boxShadow?: Shadow;
  color?: TextColor;
  columnGap?: ColumnGap;
  display?: Display;
  flex?: Flex;
  flexDirection?: FlexDirection;
  flexGrow?: FlexGrow;
  flexShrink?: FlexShrink;
  gap?: Gap;
  height?: Height;
  inlineSize?: InlineSize;
  inset?: Inset;
  insetBlock?: InsetBlock;
  insetBlockEnd?: InsetBlockEnd;
  insetBlockStart?: InsetBlockStart;
  insetInline?: InsetInline;
  insetInlineEnd?: InsetInlineEnd;
  insetInlineStart?: InsetInlineStart;
  left?: Left;
  maxBlockSize?: MaxBlockSize;
  maxHeight?: MaxHeight;
  maxInlineSize?: MaxInlineSize;
  maxWidth?: MaxWidth;
  minBlockSize?: MinBlockSize;
  minHeight?: MinHeight;
  minInlineSize?: MinInlineSize;
  minWidth?: MinWidth;
  overflow?: Overflow;
  overflowBlock?: OverflowBlock;
  overflowInline?: OverflowInline;
  padding?: Padding;
  paddingBlock?: PaddingBlock;
  paddingBlockEnd?: PaddingBlockEnd;
  paddingBlockStart?: PaddingBlockStart;
  paddingInline?: PaddingInline;
  paddingInlineEnd?: PaddingInlineEnd;
  paddingInlineStart?: PaddingInlineStart;
  position?: Position;
  right?: Right;
  rowGap?: RowGap;
  top?: Top;
  width?: Width;
  zIndex?: Layer;
};

const spacingProperties = [
  'padding',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBlockEnd',
  'paddingInline',
  'paddingInlineStart',
  'paddingInlineEnd',
  'gap',
  'rowGap',
  'columnGap',
] as const;
type SpacingProperty = (typeof spacingProperties)[number];

type TokenMappableProperty = SpacingProperty | 'backgroundColor';
type PropsToken = SpacingToken | BackgroundColorToken;
type TokenMap = Partial<Record<PropsToken, ReturnType<typeof token>>>;
type SerializedStylesMap = Record<PropsToken, SerializedStyles>;

const getSerializedStylesMap = (
  cssProperty: TokenMappableProperty,
  tokenMap: TokenMap,
): SerializedStylesMap => {
  return Object.keys(tokenMap).reduce((emotionSpacingMap, token) => {
    emotionSpacingMap[token as PropsToken] = css({
      [cssProperty]: tokenMap[token as PropsToken],
    });

    return emotionSpacingMap;
  }, {} as SerializedStylesMap);
};
type SpacingToken = keyof typeof paddingMap;
type BackgroundColorToken = keyof typeof backgroundColorMap;
type SpacingStyleMap = Record<
  SpacingProperty,
  Record<SpacingToken, SerializedStyles>
>;
type BackgroundColorStyleMap = Record<BackgroundColorToken, SerializedStyles>;

export const paddingStylesMap: SpacingStyleMap = spacingProperties.reduce(
  (styleMap, spacingProperty: SpacingProperty) => {
    styleMap[spacingProperty] = getSerializedStylesMap(
      spacingProperty,
      paddingMap,
    );

    return styleMap;
  },
  {} as SpacingStyleMap,
);

export const spaceStylesMap: SpacingStyleMap = spacingProperties.reduce(
  (styleMap, spacingProperty: SpacingProperty) => {
    styleMap[spacingProperty] = getSerializedStylesMap(
      spacingProperty,
      spaceMap,
    );

    return styleMap;
  },
  {} as SpacingStyleMap,
);

export const backgroundColorStylesMap: BackgroundColorStyleMap =
  getSerializedStylesMap('backgroundColor', backgroundColorMap);
