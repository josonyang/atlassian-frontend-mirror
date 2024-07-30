"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _spreadsheet = _interopRequireDefault(require("@atlaskit/icon/core/spreadsheet"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MediaServicesSpreadsheetIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill-rule="evenodd"><rect width="16" height="16" x="4" y="4" fill="currentColor" rx="2"/><rect width="4" height="2" x="7" y="8" fill="inherit" rx="1"/><rect width="4" height="2" x="7" y="11" fill="inherit" rx="1"/><rect width="4" height="2" x="13" y="11" fill="inherit" rx="1"/><rect width="4" height="2" x="7" y="14" fill="inherit" rx="1"/><rect width="4" height="2" x="13" y="14" fill="inherit" rx="1"/><rect width="4" height="2" x="13" y="8" fill="inherit" rx="1"/></g></svg>`
}, props, {
  newIcon: _spreadsheet.default
}));
MediaServicesSpreadsheetIcon.displayName = 'MediaServicesSpreadsheetIcon';
var _default = exports.default = MediaServicesSpreadsheetIcon;