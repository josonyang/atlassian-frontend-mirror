# `no-css-prop-in-object-spread`

Disallows the `css` property inside objects that are spread into JSX. The Compiled JSX pragma only processes `css` when it is a **direct** JSX attribute — a `css` key inside a spread object is silently ignored, causing styles to be lost.

## Rule details

👎 Examples of **incorrect** code for this rule:

```tsx
// Inline object spread with css key — styles will be lost
<div {...{ css: myStyles, id: 'foo' }} />

// Variable spread where the object contains a css key
const props = { css: dropZoneStyles, tabIndex: 0 };
<div {...props} />
```

👍 Examples of **correct** code for this rule:

```tsx
// Pass css directly as a JSX prop
<div css={myStyles} id="foo" />

// Keep other props in the spread, promote css to a direct prop
const props = { tabIndex: 0 };
<div css={dropZoneStyles} {...props} />
```
