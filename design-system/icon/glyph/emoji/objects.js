"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _lightbulb = _interopRequireDefault(require("@atlaskit/icon/core/lightbulb"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EmojiObjectsIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentcolor" fill-rule="evenodd" d="M11.998 4A5.997 5.997 0 0 0 6 9.998c0 2.218 2.288 4.484 2.288 4.484.39.387.71 1.112.71 1.611s.45.907 1 .907h4c.55 0 1-.408 1-.907s.32-1.224.71-1.611c0 0 2.288-2.266 2.288-4.484A5.997 5.997 0 0 0 11.998 4m0 2a4.003 4.003 0 0 1 3.998 3.998c0 1.029-1.145 2.511-1.695 3.064-.507.501-.912 1.216-1.13 1.938h-2.346c-.217-.722-.622-1.435-1.125-1.934-.555-.557-1.7-2.039-1.7-3.068A4.003 4.003 0 0 1 11.998 6m2.965 13c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v.003c0 .55.45 1 1 1h4c.55 0 1-.45 1-1z"/></svg>`
}, props, {
  newIcon: _lightbulb.default
}));
EmojiObjectsIcon.displayName = 'EmojiObjectsIcon';
var _default = exports.default = EmojiObjectsIcon;