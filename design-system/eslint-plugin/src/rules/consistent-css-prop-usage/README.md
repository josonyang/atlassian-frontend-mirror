> Ensures consistency with CSS prop usage.

## Rationale

Every product should be defining styles in the same way, using the same tools, enforced by the same linting rules, which we can then all evolve and scale together.

## How the rule works

This rule checks for the following cases:

- When styles are defined inline.
- When styles are not using `css` object api.
- When styles are coming from outside of the module i.e. using imports.
- When styles are spread inside another styles and not using array composition.

This rule has no options.

## Examples

👎 Example of **incorrect** code for this rule:

```js
function Button({ children }) {
  return <div css={css({...})}>{children}</div>;
                   ^^^^^^^ css function call used inline (performance issue)
}
```

```js
const container = {
      ^^^^^^^^^ should be a css function call
  zIndex: 10,
};

function Button({ children }) {
  return <button css={container}>{children}</button>;
}
```

```js
import { container } from './styles';
         ^^^^^^^^^ styles should be local, not shared

function Button({ children }) {
  return <button css={container}>{children}</button>;
}
```

```js
const baseContainerStyles = css({
  zIndex: 5,
});

const containerStyles = css({
  ...baseContainerStyles,
  ^^^^^^^^^^^^^^^^^^^^^^ compose styles by providing an array to the css call instead (see example below)
  zIndex: 7,
});

function Button({ children }) {
  return <button css={containerStyles}>{children}</button>;
}
```

👍 Example of **correct** code for this rule:

```js
const containerStyles = css({
  zIndex: 1,
});

function Button({ children }) {
  return <button css={containerStyles}>{children}</button>;
}
```

```js
const baseContainerStyles = css({
  zIndex: 5,
});

const containerStyles = css({
  zIndex: 7,
});

function Button({ children }) {
  return (
    <button css={[baseContainerStyles, containerStyles]}>{children}</button>
  );
}
```
