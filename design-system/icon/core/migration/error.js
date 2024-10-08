/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::dbfae93167a25d090a93adb983df0b8d>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _error = _interopRequireDefault(require("@atlaskit/icon/core/error"));
var _error2 = _interopRequireDefault(require("@atlaskit/icon/glyph/error"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * ⚠️ EXPERIMENTAL ⚠️ - New icons are in alpha - and subject to change or removal in future minor or patch releases.
 *
 * Migration Icon component for ErrorIcon.
 * This component is ErrorIcon, with `UNSAFE_fallbackIcon` set to "ErrorIcon".
 *
 * Category: single-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Single purpose - Reserved for when there is an error.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const ErrorIcon = props => /*#__PURE__*/_react.default.createElement(_error.default, Object.assign({
  LEGACY_fallbackIcon: _error2.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
ErrorIcon.Name = 'ErrorIconMigration';
var _default = exports.default = ErrorIcon;