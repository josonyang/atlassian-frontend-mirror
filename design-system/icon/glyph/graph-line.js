"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _chartTrend = _interopRequireDefault(require("@atlaskit/icon/core/chart-trend"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const GraphLineIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor"><path d="M21 17H5c-.55 0-1-.45-1-1.01V6a1 1 0 1 0-2 0v9.99A3 3 0 0 0 5 19h16a1 1 0 0 0 0-2m-3-8v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z"/><path d="M13.293 13.707a1 1 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414L14 11.586l-2.293-2.293a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 1.414 1.414L11 11.414z"/></g></svg>`
}, props, {
  newIcon: _chartTrend.default
}));
GraphLineIcon.displayName = 'GraphLineIcon';
var _default = exports.default = GraphLineIcon;