import { defineMessages } from 'react-intl';

export const messages: {
    chromeCollapsedPlaceholder: {
        id: string;
        defaultMessage: string;
        description: string;
    };
} = defineMessages({
	chromeCollapsedPlaceholder: {
		id: 'fabric.editor.chromeCollapsedPlaceholder',
		defaultMessage: 'Type something…',
		description: 'placeholder for an input where users insert text',
	},
});
