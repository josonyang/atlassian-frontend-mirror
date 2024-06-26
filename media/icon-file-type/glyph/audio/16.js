'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

var _base = require('@atlaskit/icon/base');

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

const Audio16Icon = (props) =>
	/*#__PURE__*/ _react.default.createElement(
		_base.Icon,
		Object.assign(
			{
				dangerouslySetGlyph: `<svg width="16" height="16" viewBox="0 0 16 16" role="presentation"><path fill="#FF5630" fill-rule="evenodd" d="M2 0h12a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2zm11 4.195v-.753c0-.271-.23-.468-.514-.44l-6.115.634a.565.565 0 00-.514.545v4.616a2 2 0 00-.571-.083H5a2 2 0 00-2 2V11a2 2 0 002 2h.286a2 2 0 002-2V5.76l4.285-.444v2.767A2 2 0 0011 8h-.286a2 2 0 00-2 2v.286a2 2 0 002 2H11a2 2 0 002-2V4.195z"/></svg>`,
			},
			props,
			{
				size: 'small',
			},
		),
	);

Audio16Icon.displayName = 'Audio16Icon';
var _default = Audio16Icon;
exports.default = _default;
