"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _starStarred = _interopRequireDefault(require("@atlaskit/icon/core/star-starred"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const StarFilledIcon = props => /*#__PURE__*/_react.default.createElement(_base.UNSAFE_IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="m12.072 17.284-3.905 2.053a1 1 0 0 1-1.451-1.054l.745-4.349-3.159-3.08a1 1 0 0 1 .554-1.705l4.366-.635 1.953-3.956a1 1 0 0 1 1.794 0l1.952 3.956 4.366.635a1 1 0 0 1 .555 1.705l-3.16 3.08.746 4.349a1 1 0 0 1-1.45 1.054z"/></svg>`
}, props, {
  newIcon: _starStarred.default
}));
StarFilledIcon.displayName = 'StarFilledIcon';
var _default = exports.default = StarFilledIcon;