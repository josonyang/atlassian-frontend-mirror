import React from 'react';
import Select, { components, type SingleValueProps } from '@atlaskit/select';

export type Locale = {
	value: string;
	label: string;
};

export type LocaleSelectProps = {
	id?: string;
	locales?: Locale[];
	locale?: Locale;
	defaultLocale?: Locale;
	onLocaleChange?: (locale: Locale) => void;
};

export const defaultLocales: Locale[] = [
	{ value: 'en-AU', label: 'English (Australia)' },
	{ value: 'en-GB', label: 'English (United Kingdom)' },
	{ value: 'en-US', label: 'English (United States)' },
	{ value: 'ko-KR', label: '한국어 (대한민국)' },
	{ value: 'nl-NL', label: 'Nederlands (Nederland)' },
	{ value: 'ru-RU', label: 'русский (Россия)' },
	{ value: 'hu-HU', label: 'magyar (Magyarország)' },
	{ value: 'pt-BR', label: 'português (Brasil)' },
	{ value: 'de-DE', label: 'Deutsch (Deutschland)' },
	{ value: 'is-IS', label: 'íslenska (Ísland)' },
	{ value: 'cs-CZ', label: 'čeština (Česká republika)' },
	{ value: 'da-DK', label: 'Dansk (Danmark)' },
	{ value: 'et-EE', label: 'Eesti (Eesti)' },
	{ value: 'pl-PL', label: 'polski (Polska)' },
	{ value: 'sk-SK', label: 'Slovenčina (Slovenská republika)' },
	{ value: 'it-IT', label: 'italiano (Italia)' },
	{ value: 'pt-PT', label: 'português (Portugal)' },
	{ value: 'vi-VN', label: 'Tiếng Việt (Việt Nam)' },
	{ value: 'zh-CN', label: '中文 (中国)' },
	{ value: 'es-ES', label: 'español (España)' },
	{ value: 'sv-SE', label: 'svenska (Sverige)' },
	{ value: 'ja-JP', label: '日本語 (日本)' },
	{ value: 'fi-FI', label: 'suomi (Suomi)' },
	{ value: 'fr-FR', label: 'français (France)' },
	{ value: 'ro-RO', label: 'română (România)' },
	{ value: 'no-NO', label: 'norsk (Norge)' },
];

const SingleValue = ({ children, ...props }: SingleValueProps<Locale, false>) => {
	const selectedLang = props.data.value;
	return (
		<components.SingleValue {...props} innerProps={{ lang: selectedLang }}>
			{children}
		</components.SingleValue>
	);
};

const LocaleSelect = ({
	id,
	locales = defaultLocales,
	locale,
	defaultLocale = defaultLocales[0],
	onLocaleChange = () => {},
}: LocaleSelectProps) => (
	<Select<Locale>
		inputId={id}
		options={locales}
		value={locale}
		defaultValue={defaultLocale}
		onChange={(locale) => onLocaleChange(locale as Locale)}
		components={{ SingleValue }}
		styles={{
			container: (css: any) => ({ ...css, width: 300, margin: '0.5em 0' }),
			dropdownIndicator: (css: any) => ({ ...css, paddingLeft: 0 }),
			menu: (css: any) => ({ ...css, width: 300 }),
		}}
	/>
);

export default LocaleSelect;
