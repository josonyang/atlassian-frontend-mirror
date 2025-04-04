import { type MessageDescriptor } from 'react-intl-next';

export default function getColorMessage(
	messages: Record<string | number, MessageDescriptor>,
	color: string,
): MessageDescriptor | undefined {
	const message = messages[color as keyof typeof messages];

	if (!message) {
		// eslint-disable-next-line no-console
		console.warn(
			`Text color palette does not have an internationalization message for color ${color.toUpperCase()}.
You must add a message description to properly translate this color.
Using current label as default message.
This could have happen when someone changed the 'colorPalette' from 'adf-schema' without updating this file.
`,
		);
	}

	return message;
}
