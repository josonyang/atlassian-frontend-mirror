"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _commit = _interopRequireDefault(require("@atlaskit/icon/core/commit"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BitbucketCommitsIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M16 12c0-1.9-1.3-3.4-3-3.9V4c0-.6-.4-1-1-1s-1 .4-1 1v4.1c-1.7.4-3 2-3 3.9s1.3 3.4 3 3.9V20c0 .6.4 1 1 1s1-.4 1-1v-4.1c1.7-.5 3-2 3-3.9m-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"/></svg>`
}, props, {
  newIcon: _commit.default
}));
BitbucketCommitsIcon.displayName = 'BitbucketCommitsIcon';
var _default = exports.default = BitbucketCommitsIcon;