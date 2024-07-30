"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _arrowDown = _interopRequireDefault(require("@atlaskit/icon/core/arrow-down"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ArrowDownIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M11 6v9.586l-3.793-3.793a1 1 0 0 0-1.414 0c-.39.39-.39 1.024 0 1.415l5.5 5.499A1 1 0 0 0 12 19a1 1 0 0 0 .707-.293l5.5-5.499a1 1 0 1 0-1.414-1.415L13 15.586V6a1 1 0 0 0-2 0"/></svg>`
}, props, {
  newIcon: _arrowDown.default
}));
ArrowDownIcon.displayName = 'ArrowDownIcon';
var _default = exports.default = ArrowDownIcon;