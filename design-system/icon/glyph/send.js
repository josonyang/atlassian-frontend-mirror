"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _send = _interopRequireDefault(require("@atlaskit/icon/core/send"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SendIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentcolor"><path d="M6.978 19.477c0 1.371 1.645 2.042 2.577 1.05L21.558 7.723C22.518 6.695 21.803 5 20.409 5H3.496C2.178 5 1.505 6.607 2.418 7.572l4.56 4.828zm1.993-1.265v-6.627L3.856 6.169c.303.322.078.857-.36.857h15.963z"/><path d="m8.416 12.902 4.01-1.95a1.04 1.04 0 0 0 .474-1.365.98.98 0 0 0-1.324-.489l-4.01 1.95c-.497.242-.71.853-.475 1.364a.98.98 0 0 0 1.325.49"/></g></svg>`
}, props, {
  newIcon: _send.default
}));
SendIcon.displayName = 'SendIcon';
var _default = exports.default = SendIcon;