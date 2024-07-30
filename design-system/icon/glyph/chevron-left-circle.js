"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _chevronLeft = _interopRequireDefault(require("@atlaskit/icon/utility/chevron-left"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ChevronLeftCircleIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill-rule="evenodd"><circle cx="12" cy="12" r="10" fill="currentColor"/><path fill="inherit" d="M13.706 9.698a.99.99 0 0 0 0-1.407 1.01 1.01 0 0 0-1.419 0l-2.965 2.94a1.09 1.09 0 0 0 0 1.548l2.955 2.93a1.01 1.01 0 0 0 1.42 0 .99.99 0 0 0 0-1.407l-2.318-2.297z"/></g></svg>`
}, props, {
  newIcon: _chevronLeft.default,
  iconType: "utility"
}));
ChevronLeftCircleIcon.displayName = 'ChevronLeftCircleIcon';
var _default = exports.default = ChevronLeftCircleIcon;