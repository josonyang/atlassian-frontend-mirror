/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::a3faab1bcefe19c563b672d584f3c7fc>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _issues = _interopRequireDefault(require("@atlaskit/icon/core/issues"));
var _issues2 = _interopRequireDefault(require("@atlaskit/icon/glyph/issues"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Migration Icon component for IssuesIcon.
 * This component is IssuesIcon, with `UNSAFE_fallbackIcon` set to "IssuesIcon".
 *
 * Category: single-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Single purpose - Reserved for multiple issues in Jira.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const IssuesIcon = props => /*#__PURE__*/_react.default.createElement(_issues.default, Object.assign({
  LEGACY_fallbackIcon: _issues2.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
IssuesIcon.Name = 'IssuesIconMigration';
var _default = exports.default = IssuesIcon;