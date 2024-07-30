"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _arrowRight = _interopRequireDefault(require("@atlaskit/icon/core/arrow-right"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ArrowRightIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M11.793 5.793a1 1 0 0 0 0 1.414L15.586 11H6a1 1 0 0 0 0 2h9.586l-3.793 3.793a1 1 0 0 0 0 1.414c.39.39 1.024.39 1.415 0l5.499-5.5a1 1 0 0 0 .293-.679v-.057a1 1 0 0 0-.293-.678l-5.499-5.5a1 1 0 0 0-1.415 0"/></svg>`
}, props, {
  newIcon: _arrowRight.default
}));
ArrowRightIcon.displayName = 'ArrowRightIcon';
var _default = exports.default = ArrowRightIcon;