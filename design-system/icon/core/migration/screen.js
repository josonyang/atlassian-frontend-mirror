/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::293c69063b1edabe2c55d8883ff3815b>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _screen = _interopRequireDefault(require("@atlaskit/icon/core/screen"));
var _screen2 = _interopRequireDefault(require("@atlaskit/icon/glyph/screen"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * ⚠️ EXPERIMENTAL ⚠️ - New icons are in alpha - and subject to change or removal in future minor or patch releases.
 *
 * Migration Icon component for ScreenIcon.
 * This component is ScreenIcon, with `UNSAFE_fallbackIcon` set to "ScreenIcon".
 *
 * Category: multi-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Multi purpose - Known uses: assets in Jira.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const ScreenIcon = props => /*#__PURE__*/_react.default.createElement(_screen.default, Object.assign({
  LEGACY_fallbackIcon: _screen2.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
ScreenIcon.Name = 'ScreenIconMigration';
var _default = exports.default = ScreenIcon;