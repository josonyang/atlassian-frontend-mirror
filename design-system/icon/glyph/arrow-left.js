"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _arrowLeft = _interopRequireDefault(require("@atlaskit/icon/core/arrow-left"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ArrowLeftIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M12.207 5.793a1 1 0 0 1 0 1.414L8.414 11H18a1 1 0 1 1 0 2H8.414l3.793 3.793a1 1 0 1 1-1.415 1.414l-5.499-5.5A1 1 0 0 1 5 12.028v-.057a1 1 0 0 1 .293-.678l5.499-5.5a1 1 0 0 1 1.415 0" clip-rule="evenodd"/></svg>`
}, props, {
  newIcon: _arrowLeft.default
}));
ArrowLeftIcon.displayName = 'ArrowLeftIcon';
var _default = exports.default = ArrowLeftIcon;