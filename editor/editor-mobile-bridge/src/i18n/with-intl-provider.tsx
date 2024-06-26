import React from 'react';
import { IntlProvider } from 'react-intl-next';
import type { IntlShape } from 'react-intl-next';
import { useTranslations } from './use-translations';

type geti18NMessagesType = (localeFileName: string) => Promise<Object>;

export interface WithIntlProviderProps {
	locale: string;
	onLocaleChanged?: () => void;
	onWillLocaleChange?: () => void;
}

interface Props extends WithIntlProviderProps {
	children?: React.ReactNode;
	geti18NMessages: geti18NMessagesType;
}

const IntlProviderWrapper = (props: React.PropsWithChildren<Props>) => {
	const { locale, messages } = useTranslations(
		props.locale,
		props.geti18NMessages,
		props.onLocaleChanged,
		props.onWillLocaleChange,
	);

	if (!messages) {
		return null;
	}

	return (
		<IntlProvider
			key={locale.replace('_', '-')}
			locale={locale.replace('_', '-')}
			messages={messages as IntlShape['messages']}
		>
			{props.children}
		</IntlProvider>
	);
};

export function withIntlProvider<T extends {}>(
	WrappedComponent: React.ComponentType<React.PropsWithChildren<T>>,
	geti18NMessages: geti18NMessagesType,
): React.ComponentType<React.PropsWithChildren<Omit<T & WithIntlProviderProps, 'intl'>>> {
	return ({ locale, onLocaleChanged, onWillLocaleChange, ...restProps }) => {
		return (
			<IntlProviderWrapper
				geti18NMessages={geti18NMessages}
				locale={locale}
				onLocaleChanged={onLocaleChanged}
				onWillLocaleChange={onWillLocaleChange}
			>
				<WrappedComponent {...(restProps as T)} />
			</IntlProviderWrapper>
		);
	};
}
