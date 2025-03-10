/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::a7fbed5716d2f78c3ec231c6ed510001>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _baseNew = _interopRequireDefault(require("@atlaskit/icon/base-new"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Icon: "Text".
 * Category: single-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Single purpose - Reserved for representing text objects.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const TextIcon = props => /*#__PURE__*/_react.default.createElement(_baseNew.default, Object.assign({
  dangerouslySetGlyph: `<path stroke="currentcolor" stroke-width="1.5" d="M8.063 1.75H2.75V5m5.313-3.25h5.187V5M8.063 1.75v12.5m0 0H10.5m-2.437 0H5.5"/>`
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
TextIcon.displayName = 'TextIcon';
var _default = exports.default = TextIcon;