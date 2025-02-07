"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _textStyle = _interopRequireDefault(require("@atlaskit/icon/core/text-style"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EditorTextStyleIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentcolor" fill-rule="evenodd" d="m6.26 6.678-3.237 9.534a.5.5 0 0 0 .473.66h1.032a.75.75 0 0 0 .717-.53l.648-2.107H9.63l.647 2.107a.75.75 0 0 0 .717.53h1.113a.5.5 0 0 0 .473-.66L9.337 6.677A1 1 0 0 0 8.39 6H7.207a1 1 0 0 0-.947.678M7.736 8.08h.051l1.364 4.453H6.372zm11.113 2.043v-.327a1 1 0 0 1 1-1H20a1 1 0 0 1 1 1v6.078a1 1 0 0 1-1 1h-.151a1 1 0 0 1-1-1v-.312h-.088c-.392.874-1.232 1.439-2.418 1.439-1.975 0-3.221-1.613-3.221-4.182 0-2.546 1.254-4.15 3.221-4.15 1.172 0 2.026.595 2.418 1.454zm-.045 2.712c0-1.47-.685-2.404-1.754-2.404s-1.725.92-1.725 2.404c0 1.491.657 2.395 1.725 2.395 1.076 0 1.754-.911 1.754-2.395"/></svg>`
}, props, {
  newIcon: _textStyle.default
}));
EditorTextStyleIcon.displayName = 'EditorTextStyleIcon';
var _default = exports.default = EditorTextStyleIcon;