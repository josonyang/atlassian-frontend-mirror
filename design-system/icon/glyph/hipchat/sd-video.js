"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _video = _interopRequireDefault(require("@atlaskit/icon/core/video"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const HipchatSdVideoIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M21 7c.523 0 1 .395 1 .94v8.12c0 .545-.477.94-1 .94-.157 0-.318-.035-.47-.112L17 15.118V8.873l3.531-1.763c.152-.075.312-.11.469-.11M3.998 6H14a2 2 0 0 1 2 2.003v7.995A2 2 0 0 1 14.001 18H4a2 2 0 0 1-2-2.002V8.003A2 2 0 0 1 3.999 6"/></svg>`
}, props, {
  newIcon: _video.default
}));
HipchatSdVideoIcon.displayName = 'HipchatSdVideoIcon';
var _default = exports.default = HipchatSdVideoIcon;