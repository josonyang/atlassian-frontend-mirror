"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _add = _interopRequireDefault(require("@atlaskit/icon/core/add"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AddIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M13 11V3.993A.997.997 0 0 0 12 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 0 0 3 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0 0 21 12c0-.556-.445-1-.993-1z"/></svg>`
}, props, {
  newIcon: _add.default
}));
AddIcon.displayName = 'AddIcon';
var _default = exports.default = AddIcon;