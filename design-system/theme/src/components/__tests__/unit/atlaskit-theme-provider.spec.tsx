/* eslint-disable testing-library/no-container, testing-library/no-node-access */
import React, { type FC, memo, type ReactNode } from 'react';

import { render } from '@testing-library/react';

import AtlaskitThemeProvider from '../../atlaskit-theme-provider';
import { useGlobalTheme } from '../../theme';

interface RenderCountProps {
	onRender: () => void;
}
const StyledComponent: FC<{ children: ReactNode }> = ({ children }) => {
	const theme = useGlobalTheme();
	return <div data-theme={theme.mode}>{children}</div>;
};
const RenderCount = (props: RenderCountProps) => {
	props.onRender();
	return <div>hello world</div>;
};
/**
 * This will re-render even if props didn't change if theme has an unstable reference.
 */
const RenderCountWithMemo = memo((props: RenderCountProps) => {
	return (
		<StyledComponent>
			<RenderCount {...props} />
		</StyledComponent>
	);
});

describe('<AtlaskitThemeProvider />', () => {
	it('should render child once when parent is rerendered many times when memod', () => {
		const callback = jest.fn();
		const markup = () => (
			<AtlaskitThemeProvider>
				<RenderCountWithMemo onRender={callback} />
			</AtlaskitThemeProvider>
		);
		const { rerender } = render(markup());

		rerender(markup());
		rerender(markup());
		rerender(markup());
		rerender(markup());

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should render two style elements when AKThemeProvider is mounted (theme styles itself and body style)', () => {
		const view = render(
			<>
				<head />
				<body>
					<AtlaskitThemeProvider>
						<div>Should render two styles</div>
					</AtlaskitThemeProvider>
				</body>
			</>,
			{ container: document.documentElement },
		);

		expect(view.container.querySelectorAll('head style')).toHaveLength(2);
	});

	it('should still render two style elements (theme styles itself and body style) when multiple AKThemeProviders are mounted', () => {
		const view = render(
			<>
				<head />
				<body>
					<AtlaskitThemeProvider>
						<AtlaskitThemeProvider>
							<div>Render two styles when there are multiple ThemeProviders</div>
						</AtlaskitThemeProvider>
					</AtlaskitThemeProvider>
				</body>
			</>,
			{ container: document.documentElement },
		);

		expect(view.container.querySelectorAll('head style')).toHaveLength(2);
	});

	it('theme reset style element should be prepended in the head', () => {
		const view = render(
			<>
				<head>
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-global-styles -- Ignored via go/DSP-18766 */}
					<style id="start" />
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-global-styles -- Ignored via go/DSP-18766 */}
					<style id="end" />
				</head>
				<body>
					<AtlaskitThemeProvider>
						<div>Style should be prepended</div>
					</AtlaskitThemeProvider>
				</body>
			</>,
			{ container: document.documentElement },
		);

		expect(view.container.querySelector('style')?.id).toEqual('ds--theme--ak-theme-provider');
	});

	it('theme body background style element should be appended in the head', () => {
		const view = render(
			<>
				<head>
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-global-styles -- Ignored via go/DSP-18766 */}
					<style id="start" />
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-global-styles -- Ignored via go/DSP-18766 */}
					<style id="end" />
				</head>
				<body>
					<AtlaskitThemeProvider>
						<div>Body style should be appended</div>
					</AtlaskitThemeProvider>
				</body>
			</>,
			{ container: document.documentElement },
		);

		expect(view.container.querySelector('style:last-child')?.id).toEqual(
			'ds--theme--ak-body-background',
		);
	});

	it('theme reset should render ahead of any other style elements', () => {
		const view = render(
			<>
				<head>
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-global-styles -- Ignored via go/DSP-18766 */}
					<style data-emotion="css" />
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-global-styles -- Ignored via go/DSP-18766 */}
					<style data-styled-components="css" />
				</head>
				<body>
					<AtlaskitThemeProvider>
						<div>This should render ahead of everything else</div>
					</AtlaskitThemeProvider>
				</body>
			</>,
			{ container: document.documentElement },
		);

		expect(view.container.querySelector('style')?.id).toEqual('ds--theme--ak-theme-provider');
	});

	it('theme reset and body should render if no style elements', () => {
		const view = render(
			<>
				<head />
				<body>
					<AtlaskitThemeProvider>
						<div>Shouldn't have any style elements</div>
					</AtlaskitThemeProvider>
				</body>
			</>,
			{ container: document.documentElement },
		);

		expect(view.container.querySelector('style:first-child')?.id).toEqual(
			'ds--theme--ak-theme-provider',
		);
		expect(view.container.querySelector('style:last-child')?.id).toEqual(
			'ds--theme--ak-body-background',
		);
	});
});
