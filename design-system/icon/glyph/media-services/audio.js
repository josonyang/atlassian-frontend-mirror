"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _audio = _interopRequireDefault(require("@atlaskit/icon/core/audio"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MediaServicesAudioIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><rect width="16" height="16" x="4" y="4" fill="currentColor" rx="2"/><path fill="inherit" d="M16 9.283V13.6h-.003A1.5 1.5 0 1 1 14.5 12q.264.001.5.085v-2.08l-4 .431V14.6h-.003A1.5 1.5 0 0 1 8 14.5a1.5 1.5 0 0 1 2-1.415V9.034c0-.238.186-.451.432-.478l5.136-.553a.38.38 0 0 1 .432.384z"/></svg>`
}, props, {
  newIcon: _audio.default
}));
MediaServicesAudioIcon.displayName = 'MediaServicesAudioIcon';
var _default = exports.default = MediaServicesAudioIcon;