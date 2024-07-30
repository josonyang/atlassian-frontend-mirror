"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _grid = _interopRequireDefault(require("@atlaskit/icon/core/grid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MediaServicesGridIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><rect width="8" height="8" x="3" y="3" rx="1"/><rect width="8" height="8" x="3" y="13" rx="1"/><rect width="8" height="8" x="13" y="3" rx="1"/><rect width="8" height="8" x="13" y="13" rx="1"/></g></svg>`
}, props, {
  newIcon: _grid.default
}));
MediaServicesGridIcon.displayName = 'MediaServicesGridIcon';
var _default = exports.default = MediaServicesGridIcon;