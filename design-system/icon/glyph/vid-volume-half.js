"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _volumeLow = _interopRequireDefault(require("@atlaskit/icon/core/volume-low"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VidVolumeHalfIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentcolor" fill-rule="evenodd" d="m8.121 8.024 5.073-3.92A.5.5 0 0 1 14 4.5v14.964a.5.5 0 0 1-.806.395l-4.962-3.835H3.999c-.552 0-.999-.453-.999-.997V9.022c0-.551.441-.998.999-.998h2.606l.036.001h1.48m7.426 2.53c-.372-.202-.522-.69-.335-1.09.188-.4.64-.561 1.012-.36 1.133.614 1.745 1.606 1.745 2.88 0 1.27-.61 2.265-1.738 2.893-.37.206-.824.05-1.015-.349s-.046-.887.324-1.093c.645-.358.922-.812.922-1.452 0-.637-.274-1.082-.915-1.43"/></svg>`
}, props, {
  newIcon: _volumeLow.default
}));
VidVolumeHalfIcon.displayName = 'VidVolumeHalfIcon';
var _default = exports.default = VidVolumeHalfIcon;