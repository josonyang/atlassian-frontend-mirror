"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _chevronUp = _interopRequireDefault(require("@atlaskit/icon/utility/chevron-up"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const HipchatChevronUpIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="m11.294 8.708-4.549 4.559a1.051 1.051 0 1 0 1.486 1.488l.001-.001 3.77-3.776 3.768 3.776a1.05 1.05 0 0 0 1.486.001h.001a1.054 1.054 0 0 0 .001-1.489L12.71 8.708a1 1 0 0 0-1.415-.001"/></svg>`
}, props, {
  newIcon: _chevronUp.default,
  iconType: "utility"
}));
HipchatChevronUpIcon.displayName = 'HipchatChevronUpIcon';
var _default = exports.default = HipchatChevronUpIcon;