"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _refresh = _interopRequireDefault(require("@atlaskit/icon/core/refresh"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RefreshIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentcolor" fill-rule="evenodd"><path fill-rule="nonzero" d="M8 6.003v2.995a1 1 0 1 0 2 0V5.102C10 4.494 9.507 4 8.9 4H5a1 1 0 0 0 0 2.003z"/><path fill-rule="nonzero" d="M9.428 18.018C7.351 16.989 6 14.807 6 12.37c0-2.266 1.167-4.319 3.02-5.425.48-.286.646-.922.371-1.421a.98.98 0 0 0-1.364-.386C5.557 6.611 4 9.35 4 12.37c0 3.248 1.802 6.158 4.57 7.529.498.247 1.095.026 1.332-.493.237-.52.025-1.141-.474-1.388"/><path d="M14 15.002v3.896c0 .608.493 1.102 1.1 1.102H19a1 1 0 0 0 0-2.003h-3v-2.995a1 1 0 1 0-2 0"/><path d="M14.097 4.596c-.237.52-.025 1.14.474 1.387 2.077 1.029 3.428 3.21 3.428 5.647 0 2.266-1.167 4.32-3.021 5.425a1.063 1.063 0 0 0-.37 1.42c.274.5.885.673 1.364.387 2.47-1.473 4.027-4.212 4.027-7.232 0-3.248-1.802-6.158-4.57-7.528A.96.96 0 0 0 15.002 4a1 1 0 0 0-.905.596"/></g></svg>`
}, props, {
  newIcon: _refresh.default
}));
RefreshIcon.displayName = 'RefreshIcon';
var _default = exports.default = RefreshIcon;