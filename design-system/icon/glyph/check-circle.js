"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _checkCircle = _interopRequireDefault(require("@atlaskit/icon/core/check-circle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CheckCircleIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill-rule="evenodd"><circle cx="12" cy="12" r="10" fill="currentColor"/><path fill="inherit" d="M9.707 11.293a1 1 0 1 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414L11 12.586z"/></g></svg>`
}, props, {
  newIcon: _checkCircle.default
}));
CheckCircleIcon.displayName = 'CheckCircleIcon';
var _default = exports.default = CheckCircleIcon;