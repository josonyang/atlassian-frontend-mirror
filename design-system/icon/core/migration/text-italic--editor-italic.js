/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::aec5db239618c2d64fd149e10e1727f3>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _textItalic = _interopRequireDefault(require("@atlaskit/icon/core/text-italic"));
var _italic = _interopRequireDefault(require("@atlaskit/icon/glyph/editor/italic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * ⚠️ EXPERIMENTAL ⚠️ - New icons are in alpha - and subject to change or removal in future minor or patch releases.
 *
 * Migration Icon component for TextItalicIcon.
 * This component is TextItalicIcon, with `UNSAFE_fallbackIcon` set to "EditorItalicIcon".
 *
 * Category: single-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Single purpose - Reserved for italicizing text.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const TextItalicIcon = props => /*#__PURE__*/_react.default.createElement(_textItalic.default, Object.assign({
  LEGACY_fallbackIcon: _italic.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
TextItalicIcon.Name = 'TextItalicIconMigration';
var _default = exports.default = TextItalicIcon;