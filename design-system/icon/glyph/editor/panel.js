"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _information = _interopRequireDefault(require("@atlaskit/icon/core/information"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EditorPanelIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M12 19a7 7 0 1 1 0-14 7 7 0 0 1 0 14m0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11m0-6a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>`
}, props, {
  newIcon: _information.default
}));
EditorPanelIcon.displayName = 'EditorPanelIcon';
var _default = exports.default = EditorPanelIcon;