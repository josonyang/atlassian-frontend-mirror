"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _information = _interopRequireDefault(require("@atlaskit/icon/core/information"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const InfoIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill-rule="evenodd"><path fill="currentColor" d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12"/><rect width="2" height="7" x="11" y="10" fill="inherit" rx="1"/><circle cx="12" cy="8" r="1" fill="inherit"/></g></svg>`
}, props, {
  newIcon: _information.default
}));
InfoIcon.displayName = 'InfoIcon';
var _default = exports.default = InfoIcon;