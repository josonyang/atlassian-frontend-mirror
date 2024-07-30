"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _image = _interopRequireDefault(require("@atlaskit/icon/core/image"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EditorImageIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="m11 15-1-1-2 2h8v-1.8L14 12zM6 6.5c0-.276.229-.5.5-.5h11c.276 0 .5.229.5.5v11c0 .276-.229.5-.5.5h-11a.504.504 0 0 1-.5-.5zM9.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/></svg>`
}, props, {
  newIcon: _image.default
}));
EditorImageIcon.displayName = 'EditorImageIcon';
var _default = exports.default = EditorImageIcon;