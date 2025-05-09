"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _base = require("@atlaskit/icon/base");
var _calendarPlus = _interopRequireDefault(require("@atlaskit/icon/core/calendar-plus"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ScheduleFilledIcon = props => /*#__PURE__*/_react.default.createElement(_base.IconFacade, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentcolor" fill-rule="evenodd"><path d="M19 10.341V6.745C19 5.783 18.206 5 17.227 5H17v1c0 1.105-.888 2-2 2-1.105 0-2-.888-2-2V5H9v1c0 1.105-.888 2-2 2-1.105 0-2-.888-2-2V5h-.227C3.793 5 3 5.781 3 6.745v10.51C3 18.218 3.794 19 4.773 19h7.03A6 6 0 0 1 19 10.341"/><path d="M14 6V5h2v1a1 1 0 0 1-2 0m0-2a1 1 0 0 1 2 0v1h-2zM6 4a1 1 0 0 1 2 0v1H6zm0 2V5h2v1a1 1 0 0 1-2 0m12 9v-1.01a1 1 0 0 0-1-.99c-.56 0-1 .44-1 .99V15h-1.01a1 1 0 0 0-.99 1c0 .56.44 1 .99 1H16v1.01a1 1 0 0 0 1 .99c.56 0 1-.44 1-.99V17h1.01a1 1 0 0 0 .99-1c0-.56-.44-1-.99-1zm-1 6a5 5 0 1 1 0-10 5 5 0 0 1 0 10"/></g></svg>`
}, props, {
  newIcon: _calendarPlus.default
}));
ScheduleFilledIcon.displayName = 'ScheduleFilledIcon';
var _default = exports.default = ScheduleFilledIcon;