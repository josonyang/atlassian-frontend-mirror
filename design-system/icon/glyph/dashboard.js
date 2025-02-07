"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _dashboard = _interopRequireDefault(require("@atlaskit/icon/core/dashboard"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DashboardIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentcolor"><path d="M4 18h16.008C20 18 20 6 20 6H3.992C4 6 4 18 4 18M2 5.994C2 4.893 2.898 4 3.99 4h16.02C21.108 4 22 4.895 22 5.994v12.012A1.997 1.997 0 0 1 20.01 20H3.99A1.994 1.994 0 0 1 2 18.006z"/><path d="M7 5v14h2V5z"/><path d="M7 11h14V9H7z"/></g></svg>`
}, props, {
  newIcon: _dashboard.default
}));
DashboardIcon.displayName = 'DashboardIcon';
var _default = exports.default = DashboardIcon;