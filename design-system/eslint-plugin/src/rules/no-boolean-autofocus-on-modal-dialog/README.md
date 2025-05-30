The modal dialog should only have `ref`'s in the `autoFocus` prop. The default value is `true`,
which is the most accessible base case. Using `false` results in accessibility issues and should be
avoided.

## Examples

This rule will warn makers if the `autoFocus` prop is set using a boolean.

### Incorrect

```tsx
<ModalDialog autoFocus={true}>
 ^^^^^^^^^^^ `autoFocus` should be set to a component's `ref` or left to resolve to the default value of `true`. It is recommended to leave it as is for a maximally accessible experience.
	<ModalHeader hasCloseButton>
		<ModalTitle>Modal Title</ModalTitle>
	</ModalHeader>
</ModalDialog>

<ModalDialog autoFocus={false}>
 ^^^^^^^^^^^ `autoFocus` should be set to a component's `ref` or left to resolve to the default value of `true`. It is recommended to leave it as is for a maximally accessible experience.
	<ModalHeader hasCloseButton>
		<ModalTitle>Modal Title</ModalTitle>
	</ModalHeader>
</ModalDialog>
```

### Correct

```tsx
<ModalDialog>
	<ModalHeader hasCloseButton>
		<ModalTitle>Modal Title</ModalTitle>
	</ModalHeader>
</ModalDialog>
```

```tsx
const ref = useRef<HTMLElement>(null);

<ModalDialog autoFocus={ref}>
	<ModalHeader hasCloseButton>
		<ModalTitle>Modal Title</ModalTitle>
	</ModalHeader>
	<ModalBody>
		<p tabindex={-1} ref={ref}>
			This is the content.
		</p>
	</ModalBody>
</ModalDialog>;
```
