"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _comment = _interopRequireDefault(require("@atlaskit/icon/core/comment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const QuestionsIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><path fill-rule="nonzero" d="M15 16h4V6H5v10h7.333L15 18zm2 2v2a1 1 0 0 1-1.6.8L11.667 18H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z"/><path d="M7 10h10V8H7zm0 4h6v-2H7z"/></g></svg>`
}, props, {
  newIcon: _comment.default
}));
QuestionsIcon.displayName = 'QuestionsIcon';
var _default = exports.default = QuestionsIcon;