"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _alignImageCenter = _interopRequireDefault(require("@atlaskit/icon/core/align-image-center"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EditorAlignImageCenterIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" role="presentation"><path fill="currentcolor" fill-rule="evenodd" d="M6 17h12a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2m4-8h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1M6 5h12a1 1 0 0 1 0 2H6a1 1 0 1 1 0-2"/></svg>`
}, props, {
  newIcon: _alignImageCenter.default
}));
EditorAlignImageCenterIcon.displayName = 'EditorAlignImageCenterIcon';
var _default = exports.default = EditorAlignImageCenterIcon;