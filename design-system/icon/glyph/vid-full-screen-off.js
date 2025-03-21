"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _shrinkDiagonal = _interopRequireDefault(require("@atlaskit/icon/core/shrink-diagonal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VidFullScreenOffIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentcolor" fill-rule="evenodd"><path fill-rule="nonzero" d="M9 15.003v2.995a1 1 0 1 0 2 0v-3.896C11 13.494 10.507 13 9.9 13H6a1 1 0 0 0 0 2.003z"/><path fill-rule="nonzero" d="M3.74 20.294a.997.997 0 0 0 1.407.005l5.152-5.152a1 1 0 0 0-.005-1.407l-.034-.034a.997.997 0 0 0-1.407-.005l-5.152 5.152a1 1 0 0 0 .005 1.407z"/><path d="M19.067 3.321 13.32 9.066a1.115 1.115 0 0 0 .005 1.57l.036.037a1.11 1.11 0 0 0 1.571.005l5.747-5.744a1.116 1.116 0 0 0-.006-1.57l-.037-.037a1.117 1.117 0 0 0-1.57-.006"/><path d="M13 6.002v3.896c0 .608.493 1.102 1.1 1.102H18a1 1 0 0 0 0-2.003h-3V6.002a1 1 0 1 0-2 0"/></g></svg>`
}, props, {
  newIcon: _shrinkDiagonal.default
}));
VidFullScreenOffIcon.displayName = 'VidFullScreenOffIcon';
var _default = exports.default = VidFullScreenOffIcon;