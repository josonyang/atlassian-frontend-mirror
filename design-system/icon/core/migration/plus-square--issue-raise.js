/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::c8829fbe18d9ef0b7a6c5c1521961961>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _plusSquare = _interopRequireDefault(require("@atlaskit/icon/core/plus-square"));
var _issueRaise = _interopRequireDefault(require("@atlaskit/icon/glyph/issue-raise"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Migration Icon component for PlusSquareIcon.
 * This component is PlusSquareIcon, with `UNSAFE_fallbackIcon` set to "IssueRaiseIcon".
 *
 * Category: multi-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Multi purpose - Known usages: 'New feature' Jira issue status.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const PlusSquareIcon = props => /*#__PURE__*/_react.default.createElement(_plusSquare.default, Object.assign({
  LEGACY_fallbackIcon: _issueRaise.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
PlusSquareIcon.Name = 'PlusSquareIconMigration';
var _default = exports.default = PlusSquareIcon;