"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _zoomOut = _interopRequireDefault(require("@atlaskit/icon/core/zoom-out"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MediaServicesZoomOutIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="m16.436 15.085 3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406M13.5 11.5h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2"/></svg>`
}, props, {
  newIcon: _zoomOut.default
}));
MediaServicesZoomOutIcon.displayName = 'MediaServicesZoomOutIcon';
var _default = exports.default = MediaServicesZoomOutIcon;