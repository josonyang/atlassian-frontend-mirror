"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _alignRight = _interopRequireDefault(require("@atlaskit/icon/core/align-right"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EditorAlignRightIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M7 11h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2m5 4h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2M7 7h10a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2"/></svg>`
}, props, {
  newIcon: _alignRight.default
}));
EditorAlignRightIcon.displayName = 'EditorAlignRightIcon';
var _default = exports.default = EditorAlignRightIcon;