"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _image = _interopRequireDefault(require("@atlaskit/icon/core/image"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MediaServicesImageIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill-rule="evenodd"><rect width="16" height="16" x="4" y="4" fill="currentColor" rx="2"/><circle cx="8.667" cy="8.667" r="2" fill="inherit"/><path fill="inherit" d="m6.667 17.333 2.666-2.666L12 17.333z"/><path fill="inherit" d="m14.667 12 2.666 2.933v2.4h-8z"/></g></svg>`
}, props, {
  newIcon: _image.default
}));
MediaServicesImageIcon.displayName = 'MediaServicesImageIcon';
var _default = exports.default = MediaServicesImageIcon;