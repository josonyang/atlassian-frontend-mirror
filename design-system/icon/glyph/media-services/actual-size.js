"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _maximize = _interopRequireDefault(require("@atlaskit/icon/core/maximize"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MediaServicesActualSizeIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M16.587 6.003H15A1 1 0 0 1 15 4h3.9l.047.001a.98.98 0 0 1 .736.285l.032.032c.2.2.296.47.284.736l.001.048v3.896a1 1 0 1 1-2 0V7.411l-3.309 3.308a.977.977 0 0 1-1.374-.005l-.032-.032a.976.976 0 0 1-.005-1.374zM7.413 17.997H9A1 1 0 0 1 9 20H5.1l-.047-.001a.98.98 0 0 1-.736-.285l-.032-.032A.98.98 0 0 1 4 18.946v-3.944a1 1 0 1 1 2 0v1.587l3.309-3.308a.977.977 0 0 1 1.374.005l.032.032a.976.976 0 0 1 .005 1.374z"/></svg>`
}, props, {
  newIcon: _maximize.default
}));
MediaServicesActualSizeIcon.displayName = 'MediaServicesActualSizeIcon';
var _default = exports.default = MediaServicesActualSizeIcon;