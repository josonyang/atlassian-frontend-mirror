"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _attachment = _interopRequireDefault(require("@atlaskit/icon/core/attachment"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EditorAttachmentIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentcolor" d="M17.222 11.557 12.11 16.64a3.01 3.01 0 0 1-4.238.004 2.97 2.97 0 0 1 .002-4.21L13.339 7a1.75 1.75 0 0 1 2.472-.002c.683.679.684 1.775.002 2.452l-5.126 5.095a.493.493 0 0 1-.699-.007.49.49 0 0 1 0-.701l4.764-4.735a.74.74 0 0 0 0-1.052.75.75 0 0 0-1.058 0L8.93 12.785a1.97 1.97 0 0 0 0 2.805c.781.777 2.038.78 2.816.007l5.126-5.094a3.206 3.206 0 0 0-.003-4.557 3.253 3.253 0 0 0-4.589.002l-5.466 5.433a4.45 4.45 0 0 0-.001 6.314 4.516 4.516 0 0 0 6.355-.004l5.113-5.081a.74.74 0 0 0 0-1.053.75.75 0 0 0-1.059 0"/></svg>`
}, props, {
  newIcon: _attachment.default
}));
EditorAttachmentIcon.displayName = 'EditorAttachmentIcon';
var _default = exports.default = EditorAttachmentIcon;