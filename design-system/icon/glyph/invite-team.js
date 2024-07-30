"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _personAdd = _interopRequireDefault(require("@atlaskit/icon/core/person-add"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const InviteTeamIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><rect width="2" height="6" x="18" y="5" rx="1"/><rect width="6" height="2" x="16" y="7" rx="1"/><path d="M5 14c0-1.105.902-2 2.009-2h7.982c1.11 0 2.009.894 2.009 2.006v4.44c0 3.405-12 3.405-12 0z"/><circle cx="11" cy="7" r="4"/></g></svg>`
}, props, {
  newIcon: _personAdd.default
}));
InviteTeamIcon.displayName = 'InviteTeamIcon';
var _default = exports.default = InviteTeamIcon;