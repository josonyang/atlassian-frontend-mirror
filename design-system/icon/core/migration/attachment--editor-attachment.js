/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::8a69bf19e2cfb48f001f8e45932af50f>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _attachment = _interopRequireDefault(require("@atlaskit/icon/core/attachment"));
var _attachment2 = _interopRequireDefault(require("@atlaskit/icon/glyph/editor/attachment"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Migration Icon component for AttachmentIcon.
 * This component is AttachmentIcon, with `UNSAFE_fallbackIcon` set to "EditorAttachmentIcon".
 *
 * Category: single-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Reserved for attaching files to work types or other objects.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const AttachmentIcon = props => /*#__PURE__*/_react.default.createElement(_attachment.default, Object.assign({
  LEGACY_fallbackIcon: _attachment2.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
AttachmentIcon.Name = 'AttachmentIconMigration';
var _default = exports.default = AttachmentIcon;