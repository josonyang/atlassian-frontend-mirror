"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _creditCard = _interopRequireDefault(require("@atlaskit/icon/core/credit-card"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CreditcardFilledIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M3 10.99h18V17c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2zM6.01 16h2v-2h-2zM21 8.99V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v1.99"/></svg>`
}, props, {
  newIcon: _creditCard.default
}));
CreditcardFilledIcon.displayName = 'CreditcardFilledIcon';
var _default = exports.default = CreditcardFilledIcon;