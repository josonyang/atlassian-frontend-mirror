/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::946f7d5ec1dd58b66037bb8b983bfad0>>
 * @codegenCommand yarn build:icon-glyphs
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _information = _interopRequireDefault(require("@atlaskit/icon/utility/information"));
var _panel = _interopRequireDefault(require("@atlaskit/icon/glyph/editor/panel"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Migration Icon component for InformationIcon.
 * This component is InformationIcon, with `UNSAFE_fallbackIcon` set to "EditorPanelIcon".
 *
 * Category: utility
 * Location: @atlaskit/icon
 * Usage guidance: Reserved for Helper Messages in Forms.
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-icons)
 */
const InformationIcon = props => /*#__PURE__*/_react.default.createElement(_information.default, Object.assign({
  LEGACY_fallbackIcon: _panel.default
  // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
}, props));
InformationIcon.Name = 'InformationIconMigration';
var _default = exports.default = InformationIcon;