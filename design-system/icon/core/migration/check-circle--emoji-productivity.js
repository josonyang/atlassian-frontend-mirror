/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::7f9ad5812ba23ca8aa4f397c637fb80a>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _checkCircle = _interopRequireDefault(require("@atlaskit/icon/core/check-circle"));
var _productivity = _interopRequireDefault(require("@atlaskit/icon/glyph/emoji/productivity"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Migration Icon component for CheckCircleIcon.
 * This component is CheckCircleIcon, with `UNSAFE_fallbackIcon` set to "EmojiProductivityIcon".
 *
 * Category: multi-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Multi purpose - Known uses: completed items, productivity emoji category. Completed task issue status in JSM Calendar view.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const CheckCircleIcon = props => /*#__PURE__*/_react.default.createElement(_checkCircle.default, Object.assign({
  LEGACY_fallbackIcon: _productivity.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
CheckCircleIcon.Name = 'CheckCircleIconMigration';
var _default = exports.default = CheckCircleIcon;