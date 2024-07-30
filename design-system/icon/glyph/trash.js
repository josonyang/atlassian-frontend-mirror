"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _delete = _interopRequireDefault(require("@atlaskit/icon/core/delete"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TrashIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M5 5a1 1 0 0 0-1 1v1h16V6a1 1 0 0 0-1-1zm11.15 15h-8.3a1 1 0 0 1-.99-.83L5 8h14l-1.86 11.17a1 1 0 0 1-.99.83M9 4.5a.5.5 0 0 1 .49-.5h5.02a.5.5 0 0 1 .49.5V5H9z"/></svg>`
}, props, {
  newIcon: _delete.default
}));
TrashIcon.displayName = 'TrashIcon';
var _default = exports.default = TrashIcon;