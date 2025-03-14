"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _paintBucket = _interopRequireDefault(require("@atlaskit/icon/core/paint-bucket"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EditorBackgroundColorIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentcolor" d="m7.818 12.56 4.243 4.243 4.242-4.242-4.242-4.243zm-1.414 1.415a1.995 1.995 0 0 1 0-2.828l4.243-4.243a1.995 1.995 0 0 1 2.828 0l4.243 4.243c.78.78.786 2.041 0 2.828l-4.243 4.243a1.996 1.996 0 0 1-2.828 0zM6.5 13h11l-5.44 5.218zm2.732-8.925a1 1 0 0 1 1.414 0l3.536 3.536-1.414 1.414L9.232 5.49a1 1 0 0 1 0-1.415M18 16s1.5 2 1.5 3.5c0 1-1 1.5-1.5 1.5s-1.5-.4-1.5-1.5C16.5 18 18 16 18 16"/></svg>`
}, props, {
  newIcon: _paintBucket.default
}));
EditorBackgroundColorIcon.displayName = 'EditorBackgroundColorIcon';
var _default = exports.default = EditorBackgroundColorIcon;