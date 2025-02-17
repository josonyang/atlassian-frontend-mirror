/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { css, jsx } from '@compiled/react';

import { type CardAuthFlowOpts, type EnvironmentsKeys } from '@atlaskit/link-provider';
import Select, { type OptionsType } from '@atlaskit/select';
import { N200, N40A, N50A } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { type CardAppearance } from '../../src';

import { type ExampleUIConfig } from './types';

interface ViewTypeOption {
	label: string;
	value: CardAppearance;
}
interface AuthFlowOption {
	label: string;
	value: CardAuthFlowOpts['authFlow'];
}
interface EnvironmentOption {
	label: string;
	value: EnvironmentsKeys;
}

const viewTypeOptions: OptionsType<ViewTypeOption> = [
	{ label: 'Inline', value: 'inline' },
	{ label: 'Card', value: 'block' },
	{ label: 'Embed', value: 'embed' },
];
const authFlowOptions: OptionsType<AuthFlowOption> = [
	{ label: 'OAuth2', value: 'oauth2' },
	{ label: 'Disabled', value: 'disabled' },
];
const environmentOptions: OptionsType<EnvironmentOption> = [
	{ label: 'Staging', value: 'stg' },
	{ label: 'Production', value: 'prod' },
];

const menuWrapperStyles = css({
	display: 'flex',
	flexDirection: 'column',
	width: '240px',
	marginRight: token('space.300', '24px'),
});
const menuTitleStyles = css({
	marginBottom: token('space.100', '8px'),
	color: token('color.text.subtlest', N200),
});

interface ShowcaseMenuProps {
	onViewTypeChange: (appearance: CardAppearance) => void;
	onAuthFlowChange: (authFlow: CardAuthFlowOpts['authFlow']) => void;
	onEnvironmentChange: (environment: EnvironmentsKeys) => void;
	onEntityChange: (entities: string[]) => void;
	entities: string[];
	config: ExampleUIConfig;
}

const outerDivStyles = css({
	position: 'fixed',
	bottom: 0,
	left: 0,
	width: '100%',
	paddingTop: token('space.300', '24px'),
	paddingRight: '60px',
	paddingBottom: token('space.300', '24px'),
	paddingLeft: '60px',
	backgroundColor: token('elevation.surface', 'white'),
	boxShadow: token('elevation.shadow.overflow', `0 1px 1px ${N50A}, 0 0 1px 1px ${N40A}`),
	display: 'flex',
	zIndex: 500,
});

export const ShowcaseMenu = ({
	onViewTypeChange,
	onAuthFlowChange,
	onEnvironmentChange,
	onEntityChange,
	entities,
	config,
}: ShowcaseMenuProps) => {
	return (
		<div css={outerDivStyles}>
			<div css={menuWrapperStyles}>
				<h6 css={menuTitleStyles}>View Type</h6>
				<Select
					menuPosition="fixed"
					defaultValue={viewTypeOptions.find((option) => option.value === config.appearance)}
					options={viewTypeOptions}
					onChange={(evt) => {
						if (evt) {
							onViewTypeChange((evt as ViewTypeOption).value);
						}
					}}
				/>
			</div>
			<div css={menuWrapperStyles}>
				<h6 css={menuTitleStyles}>Auth Flow</h6>
				<Select
					menuPosition="fixed"
					defaultValue={authFlowOptions.find((option) => option.value === config.authFlow)}
					options={authFlowOptions}
					onChange={(evt) => {
						if (evt) {
							onAuthFlowChange((evt as AuthFlowOption).value);
						}
					}}
				/>
			</div>
			<div css={menuWrapperStyles}>
				<h6 css={menuTitleStyles}>Environment</h6>
				<Select
					menuPosition="fixed"
					defaultValue={environmentOptions.find((option) => option.value === config.environment)}
					options={environmentOptions}
					onChange={(evt) => {
						if (evt) {
							onEnvironmentChange((evt as EnvironmentOption).value);
						}
					}}
				/>
			</div>
			<div css={menuWrapperStyles}>
				<h6 css={menuTitleStyles}>Entity</h6>
				<Select
					menuPosition="fixed"
					isMulti={true}
					defaultValue={config.selectedEntities.map((selectedEntity) => ({
						label: selectedEntity,
						value: selectedEntity,
					}))}
					options={entities.map((entity) => ({ label: entity, value: entity }))}
					onChange={(evt) => {
						if (evt) {
							onEntityChange((evt as EnvironmentOption[]).map((e) => e.value));
						}
					}}
					placeholder="Filter by entity..."
				/>
			</div>
		</div>
	);
};
