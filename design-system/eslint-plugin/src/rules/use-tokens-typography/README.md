Enforces the use of design tokens for typography properties.

Using design tokens results in a harmonious experience for end users whilst providing theming and
consistency. Typography tokens are strongly recommended to further align our experiences and make
future changes easier.

Note: This rule is fairly defensive when it comes to replacing values with tokens. It will only run
over style blocks that contain a fontSize property. It will then attempt to match that font size to
a token. If multiple matching tokens are found it then tries to match on font weight. If a token can
be found to match the font size but not font weight, the token is applied and then a font weight
token override is applied to ensure the tokenised styles match the original. One main exception is
line height - **this rule will match against tokens that have a different line height**. Letter
spacing values are also ignored.

## Examples

Using anything other than design tokens such as hardcoded values or legacy theme constants will be
considered violations.

### Incorrect

```js
import { fontSize } from '@atlaskit/theme/constants';

css({ fontSize: fontSize() });
                ^^^^^^^^^^

css({ fontSize: '14px' });
                ^^^^^^

css({
  fontSize: '14px',
            ^^^^^^
  lineHeight: '20px',
  fontWeight: 600
});

```

### Correct

```js
import { token } from '@atlaskit/tokens';

css({ font: token('font.heading.large') });

css({ font: token('font.body') });
```

## Options

`shouldEnforceFallbacks`: Set to `true` to ensure token fallback values are added. Defaults to
`false`.

`enableUnsafeAutofix`: Rule creates errors with autofixes instead of suggestions. Defaults to
`false`.

`patterns`: Array of patterns to enable, new patterns will gradually be rolled out behind this
config option. Available patterns `style-object`, `font-weight`, `font-family`, `banned-properties`,
`restricted-capitalisation`. Defaults to enabling all patterns.
