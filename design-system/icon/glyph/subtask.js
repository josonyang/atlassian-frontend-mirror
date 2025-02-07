"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _subtasks = _interopRequireDefault(require("@atlaskit/icon/core/subtasks"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SubtaskIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentcolor"><path d="M19 7c1.105.003 2 .899 2 2.006v9.988A2.005 2.005 0 0 1 18.994 21H9.006A2.005 2.005 0 0 1 7 19h11c.555 0 1-.448 1-1zM3 5.006C3 3.898 3.897 3 5.006 3h9.988C16.102 3 17 3.897 17 5.006v9.988A2.005 2.005 0 0 1 14.994 17H5.006A2.005 2.005 0 0 1 3 14.994zM5 5v10h10V5z"/><path d="M7.707 9.293a1 1 0 1 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414L9 10.586z"/></g></svg>`
}, props, {
  newIcon: _subtasks.default
}));
SubtaskIcon.displayName = 'SubtaskIcon';
var _default = exports.default = SubtaskIcon;