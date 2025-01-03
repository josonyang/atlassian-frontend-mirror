"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _grid = _interopRequireDefault(require("@atlaskit/icon/core/grid"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TableIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentcolor" fill-rule="evenodd"><path fill-rule="nonzero" d="M4 17.995h15.992c-.009 0-.009-9.99-.009-9.99H3.992c.008 0 .008 9.99.008 9.99m-2-12C2 4.892 2.898 4 3.99 4h16.02C21.108 4 22 4.895 22 5.994v12.012A1.997 1.997 0 0 1 20.01 20H3.99A1.994 1.994 0 0 1 2 18.006z"/><path fill-rule="nonzero" d="M8 6v12h2V6zm6 0v12h2V6z"/><path d="M4 12h17v2H4z"/></g></svg>`
}, props, {
  newIcon: _grid.default
}));
TableIcon.displayName = 'TableIcon';
var _default = exports.default = TableIcon;