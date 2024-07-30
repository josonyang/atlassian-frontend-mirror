"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _fullscreenExit = _interopRequireDefault(require("@atlaskit/icon/core/fullscreen-exit"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MediaServicesFullScreenIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M16 8h3a1 1 0 0 1 0 2h-3a2 2 0 0 1-2-2V5a1 1 0 0 1 2 0zm-8 2H5a1 1 0 1 1 0-2h3V5a1 1 0 1 1 2 0v3a2 2 0 0 1-2 2m8 4h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3a2 2 0 0 1 2-2m-8 2H5a1 1 0 0 1 0-2h3a2 2 0 0 1 2 2v3a1 1 0 0 1-2 0z"/></svg>`
}, props, {
  newIcon: _fullscreenExit.default
}));
MediaServicesFullScreenIcon.displayName = 'MediaServicesFullScreenIcon';
var _default = exports.default = MediaServicesFullScreenIcon;