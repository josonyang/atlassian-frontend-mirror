"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _page = _interopRequireDefault(require("@atlaskit/icon/core/page"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DocumentFilledIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="m18.99 8.99.01 1.015V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.275c.469 0 .922.164 1.282.464L18.631 7.7c.227.19.359.471.359.768zM12.02 5 12 8.192a.99.99 0 0 0 .994.991h4z"/></svg>`
}, props, {
  newIcon: _page.default
}));
DocumentFilledIcon.displayName = 'DocumentFilledIcon';
var _default = exports.default = DocumentFilledIcon;