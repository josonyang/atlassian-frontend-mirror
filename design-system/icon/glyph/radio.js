"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RadioIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill-rule="evenodd"><circle cx="12" cy="12" r="6" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="inherit"/></g></svg>`
}, props));
RadioIcon.displayName = 'RadioIcon';
var _default = exports.default = RadioIcon;