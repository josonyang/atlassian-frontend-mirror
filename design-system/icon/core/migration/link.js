/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::0c2e6e563a714afa66b2c445d0695bd6>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _link = _interopRequireDefault(require("@atlaskit/icon/core/link"));
var _link2 = _interopRequireDefault(require("@atlaskit/icon/glyph/link"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Migration Icon component for LinkIcon.
 * This component is LinkIcon, with `UNSAFE_fallbackIcon` set to "LinkIcon".
 *
 * Category: single-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Single purpose - Reserved for links, urls, or copy link.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const LinkIcon = props => /*#__PURE__*/_react.default.createElement(_link.default, Object.assign({
  LEGACY_fallbackIcon: _link2.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
LinkIcon.Name = 'LinkIconMigration';
var _default = exports.default = LinkIcon;