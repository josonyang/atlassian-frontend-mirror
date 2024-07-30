"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _lockUnlocked = _interopRequireDefault(require("@atlaskit/icon/core/lock-unlocked"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UnlockIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor"><path d="M5 11.009C5 9.899 5.897 9 7.006 9h9.988A2.01 2.01 0 0 1 19 11.009v7.982c0 1.11-.897 2.009-2.006 2.009H7.006A2.01 2.01 0 0 1 5 18.991zM7 11v8h10v-8z"/><circle cx="12" cy="15" r="2"/><path d="M8 6.251v-.249A4.004 4.004 0 0 1 12 2a4 4 0 0 1 4 4.002V6.5h-2v-.498A2 2 0 0 0 12 4c-1.102 0-2 .898-2 2.002V11H8zm6 .249h2a1 1 0 0 1-2 0"/></g></svg>`
}, props, {
  newIcon: _lockUnlocked.default
}));
UnlockIcon.displayName = 'UnlockIcon';
var _default = exports.default = UnlockIcon;