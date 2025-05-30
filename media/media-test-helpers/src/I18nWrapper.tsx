import React, { useState } from 'react';
import { IntlProvider } from 'react-intl-next';
import LocaleSelect, { type Locale, defaultLocales } from '@atlaskit/locale/LocaleSelect';
import { locales } from '@atlaskit/media-ui/locales';
import { Box, xcss } from '@atlaskit/primitives';
import { Label } from '@atlaskit/form';

function getMessages(localeValue: string) {
	const lang = localeValue.substring(0, 2);
	const langWithRegion = localeValue.replace('-', '_');
	return locales[langWithRegion] || locales[lang];
}

const selectableLocales = defaultLocales.reduce((result, locale) => {
	if (!getMessages(locale.value)) {
		return result;
	}
	return [...result, locale];
}, [] as Locale[]);

export interface I18NWrapperState {
	locale: Locale;
}

export interface I18NWrapperProps {
	children: React.ReactNode;
}

export const I18NWrapper = ({ children }: I18NWrapperProps) => {
	const [locale, setLocale] = useState({ label: 'en', value: 'en' });

	const lang = locale.value.substring(0, 2);
	const messages = getMessages(locale.value);
	return (
		<>
			<Box xcss={localeBoxStyles}>
				<Label htmlFor="media-locale-select">Language</Label>
				<LocaleSelect
					id="media-locale-select"
					onLocaleChange={setLocale}
					locales={selectableLocales}
				/>
			</Box>
			<IntlProvider
				locale={lang}
				messages={messages}
				// We need to add this key to force a re-render and refresh translations
				// when selected language has changed
				key={locale.value}
			>
				<>{children}</>
			</IntlProvider>
		</>
	);
};

const localeBoxStyles = xcss({ marginBottom: 'space.150', marginTop: 'space.150' });
