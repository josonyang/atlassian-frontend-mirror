/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::7362f1539ca2a546dc19a8921f3140fa>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _minimize = _interopRequireDefault(require("@atlaskit/icon/core/minimize"));
var _fitToPage = _interopRequireDefault(require("@atlaskit/icon/glyph/media-services/fit-to-page"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * ⚠️ EXPERIMENTAL ⚠️ - New icons are in alpha - and subject to change or removal in future minor or patch releases.
 *
 * Migration Icon component for MinimizeIcon.
 * This component is MinimizeIcon, with `UNSAFE_fallbackIcon` set to "MediaServicesFitToPageIcon".
 *
 * Category: single-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Single purpose - Reserved for minimizing or docking modals to the bottom of the viewport.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const MinimizeIcon = props => /*#__PURE__*/_react.default.createElement(_minimize.default, Object.assign({
  LEGACY_fallbackIcon: _fitToPage.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
MinimizeIcon.Name = 'MinimizeIconMigration';
var _default = exports.default = MinimizeIcon;