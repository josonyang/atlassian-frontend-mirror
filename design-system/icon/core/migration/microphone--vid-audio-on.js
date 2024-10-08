/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::760758e58700ead1cd1fda6e8ec1f17c>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _microphone = _interopRequireDefault(require("@atlaskit/icon/core/microphone"));
var _vidAudioOn = _interopRequireDefault(require("@atlaskit/icon/glyph/vid-audio-on"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * ⚠️ EXPERIMENTAL ⚠️ - New icons are in alpha - and subject to change or removal in future minor or patch releases.
 *
 * Migration Icon component for MicrophoneIcon.
 * This component is MicrophoneIcon, with `UNSAFE_fallbackIcon` set to "VidAudioOnIcon".
 *
 * Category: multi-purpose
 * Location: @atlaskit/icon
 * Usage guidance: Multi purpose - Known uses: record sounds in Trello.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const MicrophoneIcon = props => /*#__PURE__*/_react.default.createElement(_microphone.default, Object.assign({
  LEGACY_fallbackIcon: _vidAudioOn.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
MicrophoneIcon.Name = 'MicrophoneIconMigration';
var _default = exports.default = MicrophoneIcon;