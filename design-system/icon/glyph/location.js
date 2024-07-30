"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _location = _interopRequireDefault(require("@atlaskit/icon/core/location"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LocationIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M12 21c-2.28 0-6-8.686-6-12a6 6 0 1 1 12 0c0 3.314-3.72 12-6 12m0-9a2.912 2.912 0 1 0 0-5.824A2.912 2.912 0 0 0 12 12"/></svg>`
}, props, {
  newIcon: _location.default
}));
LocationIcon.displayName = 'LocationIcon';
var _default = exports.default = LocationIcon;