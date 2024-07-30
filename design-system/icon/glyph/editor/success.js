"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _checkCircle = _interopRequireDefault(require("@atlaskit/icon/core/check-circle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EditorSuccessIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16m1.364-10.964-2.152 4.11-1.543-1.39a1 1 0 1 0-1.338 1.487l2.5 2.25a1 1 0 0 0 1.555-.279l2.75-5.25a1 1 0 0 0-1.772-.928"/></svg>`
}, props, {
  newIcon: _checkCircle.default
}));
EditorSuccessIcon.displayName = 'EditorSuccessIcon';
var _default = exports.default = EditorSuccessIcon;