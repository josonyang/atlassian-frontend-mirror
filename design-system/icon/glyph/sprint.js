"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _sprint = _interopRequireDefault(require("@atlaskit/icon/core/sprint"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SprintIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentcolor" d="m17.717 17.137-1.436-1.438a1.003 1.003 0 0 1 1.418-1.418l3.007 3.01a1 1 0 0 1 0 1.417l-3.007 3.01a1.003 1.003 0 0 1-1.417-1.42l1.3-1.3-6.072-.003A8 8 0 0 1 4 11.01C4 6.587 7.582 3 12 3s8 3.587 8 8.01a8 8 0 0 1-.789 3.451l-1.438-1.44a6.1 6.1 0 0 0 .345-2.01A6.12 6.12 0 0 0 12 4.884a6.12 6.12 0 0 0-6.118 6.125 6.12 6.12 0 0 0 5.647 6.102zm-12.163-.119c.561.759 1.456 1.49 2.457 1.981L3.937 19C3.42 19 3 18.552 3 18s.42-1 .937-1l1.614.005z"/></svg>`
}, props, {
  newIcon: _sprint.default
}));
SprintIcon.displayName = 'SprintIcon';
var _default = exports.default = SprintIcon;