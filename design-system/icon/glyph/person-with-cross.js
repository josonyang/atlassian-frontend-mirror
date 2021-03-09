"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _base = _interopRequireDefault(require("@atlaskit/icon/base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PersonWithCrossIcon = props => /*#__PURE__*/_react.default.createElement(_base.default, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M11.94 12a6.478 6.478 0 00-1.81 4.5c0 1.626.597 3.112 1.583 4.252C8.161 21.448 3 20.68 3 18.446V14c0-1.105.902-2 2.009-2h6.93zM9 11a4 4 0 110-8 4 4 0 010 8zm8.61 5.5l1.161-1.165a.78.78 0 00-.003-1.107.789.789 0 00-1.112.003L16.5 15.389l-1.156-1.158a.788.788 0 00-1.112-.003.782.782 0 00-.003 1.11l1.162 1.163-1.162 1.164a.78.78 0 00.003 1.107.789.789 0 001.112-.003l1.156-1.158 1.156 1.158a.788.788 0 001.112.003.782.782 0 00.003-1.11L17.609 16.5zM16.5 22a5.5 5.5 0 110-11 5.5 5.5 0 010 11z" fill="currentColor" fill-rule="evenodd"/></svg>`
}, props));

PersonWithCrossIcon.displayName = 'PersonWithCrossIcon';
var _default = PersonWithCrossIcon;
exports.default = _default;