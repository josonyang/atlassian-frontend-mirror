"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _lockLocked = _interopRequireDefault(require("@atlaskit/icon/core/lock-locked"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LockFilledIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M8 10V8.002A4.004 4.004 0 0 1 12 4a4 4 0 0 1 4 4.002V10a2 2 0 0 1 2 2v6c0 1.105-.902 2-2.009 2H8.01A2 2 0 0 1 6 18v-6c0-1.102.897-1.995 2-2m2 0h4V8.002A2 2 0 0 0 12 6c-1.102 0-2 .898-2 2.002zm2 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/></svg>`
}, props, {
  newIcon: _lockLocked.default
}));
LockFilledIcon.displayName = 'LockFilledIcon';
var _default = exports.default = LockFilledIcon;