/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::a16470c3bb291b102b1f88d7113da531>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _starUnstarred = _interopRequireDefault(require("@atlaskit/icon/utility/star-unstarred"));
var _star = _interopRequireDefault(require("@atlaskit/icon/glyph/star"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Migration Icon component for StarUnstarredIcon.
 * This component is StarUnstarredIcon, with `UNSAFE_fallbackIcon` set to "StarIcon".
 *
 * Category: utility
 * Location: @atlaskit/icon
 * Usage guidance: Reserved for starring or favoriting objects as a secondary/tertiary action.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const StarUnstarredIcon = props => /*#__PURE__*/_react.default.createElement(_starUnstarred.default, Object.assign({
  LEGACY_fallbackIcon: _star.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
StarUnstarredIcon.Name = 'StarUnstarredIconMigration';
var _default = exports.default = StarUnstarredIcon;