/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::91b0c684ab99e7afef721778c04a15c2>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _checkCircle = _interopRequireDefault(require("@atlaskit/icon/utility/check-circle"));
var _productivity = _interopRequireDefault(require("@atlaskit/icon/glyph/emoji/productivity"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * ⚠️ EXPERIMENTAL ⚠️ - New icons are in alpha - and subject to change or removal in future minor or patch releases.
 *
 * Migration Icon component for CheckCircleIcon.
 * This component is CheckCircleIcon, with `UNSAFE_fallbackIcon` set to "EmojiProductivityIcon".
 *
 * Category: utility
 * Location: @atlaskit/icon
 * Usage guidance: 📦 @atlaskit/icon/utility/check-circle
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const CheckCircleIcon = props => /*#__PURE__*/_react.default.createElement(_checkCircle.default, Object.assign({
  LEGACY_fallbackIcon: _productivity.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
CheckCircleIcon.Name = 'CheckCircleIconMigration';
var _default = exports.default = CheckCircleIcon;