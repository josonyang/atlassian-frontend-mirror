/* eslint-disable @atlaskit/design-system/consistent-css-prop-usage */
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { useCallback, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';

import Button, { ButtonGroup, Theme as ButtonTheme, CustomThemeButton } from '@atlaskit/button';
import { Label } from '@atlaskit/form';
import Select from '@atlaskit/select';
import * as colors from '@atlaskit/theme/colors';
import GlobalTheme from '@atlaskit/theme/components';
import { type ThemeModes } from '@atlaskit/theme/types';
import { token } from '@atlaskit/tokens';

type Option = {
	[key: string]: any;
	label: string;
	value: ThemeModes;
};

const options: Option[] = [
	{ value: 'light', label: 'Light Theme' },
	{ value: 'dark', label: 'Dark Mode' },
];

function ThemeModeSwitcher({
	Component,
	title,
}: {
	Component: typeof Button | typeof CustomThemeButton;
	title: string;
}) {
	const [mode, setMode] = useState<ThemeModes>('light');
	const getMode = useCallback(() => ({ mode }), [mode]);
	const selectId = `${title}--select`;

	return (
		<React.Fragment>
			<h3 css={{ marginBottom: token('space.200', '16px') }}>
				Light + Dark Themes (using {title})
			</h3>
			<div
				style={{
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					padding: token('space.250', '20px'),
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
					backgroundColor: mode === 'light' ? colors.N0 : colors.N800,
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
					border: `2px solid ${colors.N800}`,
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					borderRadius: '5px',
				}}
			>
				<GlobalTheme.Provider value={getMode}>
					<ButtonTheme.Provider value={(current, props) => current({ ...props, mode })}>
						<ButtonGroup>
							<Component>Default Button</Component>
							<Component appearance="primary">Primary Button</Component>
							<Component appearance="subtle">Subtle Button</Component>
						</ButtonGroup>
					</ButtonTheme.Provider>
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
					<div style={{ marginTop: '1rem' }}>
						<Label htmlFor={selectId}>Select a theme</Label>
						<Select
							styles={{
								container: (provided) => ({
									...provided,
									marginTop: token('space.150', '12px'),
								}),
							}}
							inputId={selectId}
							options={options}
							defaultValue={options[0]}
							onChange={(option) => {
								if (option && !Array.isArray(option)) {
									setMode((option as Option).value);
								}
							}}
						/>
					</div>
				</GlobalTheme.Provider>
			</div>
		</React.Fragment>
	);
}

function Example() {
	return (
		<React.Fragment>
			<ThemeModeSwitcher title="CustomThemeButton" Component={CustomThemeButton} />

			<ThemeModeSwitcher title="Button" Component={Button} />
		</React.Fragment>
	);
}

export default () => <Example />;
