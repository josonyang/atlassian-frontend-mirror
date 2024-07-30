"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _warning = _interopRequireDefault(require("@atlaskit/icon/core/warning"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EditorWarningIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="m13.31 5.343 7.359 13.17A1 1 0 0 1 19.796 20H4.204a1 1 0 0 1-.873-1.488l7.36-13.169a1.5 1.5 0 0 1 2.618 0M12 8.5a1.09 1.09 0 0 0-1.081 1.239l.513 3.766a.573.573 0 0 0 1.136 0l.513-3.766A1.09 1.09 0 0 0 12 8.5m0 8.63a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25"/></svg>`
}, props, {
  newIcon: _warning.default
}));
EditorWarningIcon.displayName = 'EditorWarningIcon';
var _default = exports.default = EditorWarningIcon;