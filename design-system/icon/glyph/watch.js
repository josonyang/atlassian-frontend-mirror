"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _eyeOpen = _interopRequireDefault(require("@atlaskit/icon/core/eye-open"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const WatchIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentcolor" fill-rule="evenodd"><path d="M12 18c-4.536 0-7.999-4.26-7.999-6 0-2.001 3.459-6 8-6 4.376 0 7.998 3.973 7.998 6 0 1.74-3.462 6-7.998 6m0-14C6.48 4 2 8.841 2 12c0 3.086 4.576 8 10 8 5.423 0 10-4.914 10-8 0-3.159-4.48-8-10-8"/><path d="M11.978 13.984c-1.104 0-2-.897-2-2s.896-2 2-2c1.103 0 2 .897 2 2s-.897 2-2 2m0-6c-2.206 0-4 1.794-4 4s1.793 4 4 4 4-1.794 4-4-1.794-4-4-4"/></g></svg>`
}, props, {
  newIcon: _eyeOpen.default
}));
WatchIcon.displayName = 'WatchIcon';
var _default = exports.default = WatchIcon;