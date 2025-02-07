"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _textStyle = _interopRequireDefault(require("@atlaskit/icon/core/text-style"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EmojiKeyboardIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentcolor" fill-rule="evenodd" d="m5.84 6.95-3.82 9.97a.5.5 0 0 0 .47.68H3.7a.5.5 0 0 0 .47-.33l.68-1.88a.5.5 0 0 1 .47-.33h3.8a.5.5 0 0 1 .47.33l.68 1.88a.5.5 0 0 0 .47.33h1.27a.5.5 0 0 0 .47-.68L8.69 6.95a.7.7 0 0 0-.66-.45H6.49a.7.7 0 0 0-.65.45m1.57 2.46 1.25 3.41a.2.2 0 0 1-.19.27h-2.5a.2.2 0 0 1-.19-.27l1.25-3.41a.2.2 0 0 1 .38 0m10.14 6.46c1.22 0 2.14-1.01 2.14-2.6s-.9-2.53-2.14-2.53c-1.26 0-2.18.94-2.18 2.53 0 1.58.9 2.6 2.18 2.6m2.16.6c-.37.83-1.28 1.43-2.44 1.43-2.57 0-4.27-2-4.27-4.64 0-2.55 1.66-4.57 4.2-4.57 1.56 0 2.28.83 2.5 1.33v-.34c0-.25.01-.39.21-.58q.21-.18.62-.16h.76a.58.58 0 0 1 .5.17c.21.2.19.42.19.58v6.39q0 .34.02.9 0 .29-.12.43a.63.63 0 0 1-.51.24h-.93c-.19 0-.45-.08-.53-.18s-.16-.23-.18-.53a6 6 0 0 1-.01-.36z"/></svg>`
}, props, {
  newIcon: _textStyle.default
}));
EmojiKeyboardIcon.displayName = 'EmojiKeyboardIcon';
var _default = exports.default = EmojiKeyboardIcon;