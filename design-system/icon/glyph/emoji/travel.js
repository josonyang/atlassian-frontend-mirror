"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _vehicleCar = _interopRequireDefault(require("@atlaskit/icon/core/vehicle-car"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EmojiTravelIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentcolor" fill-rule="evenodd" d="M15.584 17H8.416l-2.708 2.709a1.004 1.004 0 0 1-1.415 0l-.002-.002a1.004 1.004 0 0 1 0-1.415l1.618-1.617A2 2 0 0 1 5 14.997V6.003C5 4.897 5.897 4 7.006 4h9.988C18.102 4 19 4.894 19 6.003v8.994a2 2 0 0 1-.909 1.678l1.618 1.617a1.004 1.004 0 0 1 0 1.415 1.004 1.004 0 0 1-1.417.002zM17 10V6H7v4zm0 2v3H7v-3zm-1.5 6.997c0 .55-.45 1-1 1h-5c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1m.2-5.517a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-6.691 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/></svg>`
}, props, {
  newIcon: _vehicleCar.default
}));
EmojiTravelIcon.displayName = 'EmojiTravelIcon';
var _default = exports.default = EmojiTravelIcon;