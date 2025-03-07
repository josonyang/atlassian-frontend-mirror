/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::b7f27e4837e9b70aa04ca488f27f5e80>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _issue = _interopRequireDefault(require("@atlaskit/icon/core/issue"));
var _issue2 = _interopRequireDefault(require("@atlaskit/icon/glyph/issue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Migration Icon component for IssueIcon.
 * This component is IssueIcon, with `UNSAFE_fallbackIcon` set to "IssueIcon".
 *
 * Category: single-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Single purpose - Reserved for issues in Jira.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const IssueIcon = props => /*#__PURE__*/_react.default.createElement(_issue.default, Object.assign({
  LEGACY_fallbackIcon: _issue2.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
IssueIcon.Name = 'IssueIconMigration';
var _default = exports.default = IssueIcon;