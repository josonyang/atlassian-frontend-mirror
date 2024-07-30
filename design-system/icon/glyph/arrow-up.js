"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _arrowUp = _interopRequireDefault(require("@atlaskit/icon/core/arrow-up"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ArrowUpIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="m11.293 5.293-5.5 5.499a1 1 0 0 0 0 1.415 1 1 0 0 0 1.414 0L11 8.414V18a1 1 0 0 0 2 0V8.414l3.793 3.793a1 1 0 1 0 1.414-1.415l-5.5-5.499A1 1 0 0 0 12 5a1 1 0 0 0-.707.293"/></svg>`
}, props, {
  newIcon: _arrowUp.default
}));
ArrowUpIcon.displayName = 'ArrowUpIcon';
var _default = exports.default = ArrowUpIcon;