/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::4c59186aba001fe94e9b789c0ee0bd14>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _contentWidthWide = _interopRequireDefault(require("@atlaskit/icon/core/content-width-wide"));
var _mediaWide = _interopRequireDefault(require("@atlaskit/icon/glyph/editor/media-wide"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * ⚠️ EXPERIMENTAL ⚠️ - New icons are in alpha - and subject to change or removal in future minor or patch releases.
 *
 * Migration Icon component for ContentWidthWideIcon.
 * This component is ContentWidthWideIcon, with `UNSAFE_fallbackIcon` set to "EditorMediaWideIcon".
 *
 * Category: single-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Single purpose - Reserved for setting media and content to a wide width.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const ContentWidthWideIcon = props => /*#__PURE__*/_react.default.createElement(_contentWidthWide.default, Object.assign({
  LEGACY_fallbackIcon: _mediaWide.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
ContentWidthWideIcon.Name = 'ContentWidthWideIconMigration';
var _default = exports.default = ContentWidthWideIcon;