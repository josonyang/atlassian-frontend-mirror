import { token } from '@atlaskit/tokens';

/**
 * Styles taken from packages/design-system/checkbox/src/internal/theme.tsx
 * To be used until mobile editor does not require legacy themed() API anymore
 */
const checkboxTheme = {
	light: {
		borderColor: {
			rest: token('color.border.input'),
			hovered: token('color.border.input'),
			disabled: token('color.background.disabled'),
			checked: token('color.background.selected.bold'),
			active: token('color.border'),
			focused: token('color.border.focused'),
			hoveredAndChecked: token('color.background.selected.bold.hovered'),
		},
		boxColor: {
			rest: token('color.background.input'),
			hovered: token('color.background.input.hovered'),
			disabled: token('color.background.disabled'),
			active: token('color.background.input.pressed'),
			hoveredAndChecked: token('color.background.selected.bold.hovered'),
			checked: token('color.background.selected.bold'),
		},
		tickColor: {
			disabledAndChecked: token('color.icon.disabled'),
			activeAndChecked: token('color.icon.inverse'),
			checked: token('color.icon.inverse'),
		},
	},
	/**
	 * Fallback colours for dark mode taken from
	 * packages/design-system/tokens/src/artifacts/themes/atlassian-dark.tsx
	 * To be used to keep mobile / web checkbox dark mode consistent
	 * until mobile editor does not require legacy themed() API anymore
	 */
	dark: {
		borderColor: {
			rest: token('color.border.input'),
			hovered: token('color.border.input'),
			disabled: token('color.background.disabled', '#BCD6F00A'),
			checked: token('color.background.selected.bold', '#579DFF'),
			active: token('color.border', '#A6C5E229'),
			focused: token('color.border.focused', '#85B8FF'),
			hoveredAndChecked: token('color.background.selected.bold.hovered', '#85B8FF'),
		},
		boxColor: {
			rest: token('color.background.input', '#22272B'),
			hovered: token('color.background.input.hovered', '#282E33'),
			disabled: token('color.background.disabled', '#BCD6F00A'),
			active: token('color.background.input.pressed', '#22272B'),
			hoveredAndChecked: token('color.background.selected.bold.hovered', '#85B8FF'),
			checked: token('color.background.selected.bold', '#579DFF'),
		},
		tickColor: {
			disabledAndChecked: token('color.icon.disabled', '#BFDBF847'),
			activeAndChecked: token('color.icon.inverse', '#1D2125'),
			checked: token('color.icon.inverse', '#1D2125'),
		},
	},
};

export default checkboxTheme;
