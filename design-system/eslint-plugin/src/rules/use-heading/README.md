Using primitives allows you to delete bespoke component code and replace it with ready made
solutions made by the Atlassian Design System Team.

## Examples

This rule marks code as violations when it can be replaced 1:1 with a heading component.

### Incorrect

```jsx
<div>
  <h1>text</hi>
  <p>content</p>
</div>
^^^^
```

### Correct

```jsx
<div>
	<Heading size="xlarge">text</Heading>
	<p>content</p>
</div>
```

Currently, the rule is extremely defensive, only reporting on `h1`, `h2`, `h3`, `h4`, `h5` and `h6`
elements that don't have any props outside of `key`, `id` and `data-testid`. We're only targeting
instances that are the first child of their siblings.

## Options

`enableUnsafeAutofix`: Rule reports errors with autofixes instead of suggestions. Defaults to
`false`.

`enableUnsafeReport`: Rule reports errors for native elements that are not autofixable. Defaults to
`true`.
