"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _compass = _interopRequireDefault(require("@atlaskit/icon/core/compass"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DiscoverFilledIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18m-1.101-10.78c-.248.127-.55.427-.678.678L8.24 14.797c-.55 1.084-.118 1.514.965.963l3.898-1.98c.248-.127.55-.427.677-.678l1.981-3.899c.552-1.083.12-1.514-.964-.964zM12 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/></svg>`
}, props, {
  newIcon: _compass.default
}));
DiscoverFilledIcon.displayName = 'DiscoverFilledIcon';
var _default = exports.default = DiscoverFilledIcon;