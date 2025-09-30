import React from 'react';

import type { RegisterToolbar, RegisterComponent, ToolbarComponentTypes } from '../../types';

import { getSortedChildren, isSection, NoOp } from './common';
import type { ToolbarProps } from './types';

const hasParents = (
	component: RegisterComponent,
): component is Exclude<RegisterComponent, RegisterToolbar> => {
	return component.type !== 'toolbar';
};

const getChildTypesForParent = (parentType: string): string[] => {
	switch (parentType) {
		case 'toolbar':
			return ['section'];
		case 'section':
			return ['group'];
		case 'group':
			return ['button', 'menu'];
		case 'menu':
		case 'nested-menu':
			return ['menu-section'];
		case 'menu-section':
			return ['menu-item', 'nested-menu'];
		default:
			return [];
	}
};

const getFallbackComponent = (type: string, fallbacks: ToolbarProps['fallbacks']) => {
	switch (type) {
		case 'group':
			return fallbacks.group;
		case 'menu-section':
			return fallbacks.menuSection;
		case 'section':
			return fallbacks.section;
		default:
			return NoOp;
	}
};

type ComponentRendererProps = {
	allComponents: Exclude<RegisterComponent, RegisterToolbar>[];
	component: RegisterComponent;
	fallbacks: ToolbarProps['fallbacks'];
	parents: ToolbarComponentTypes;
};

const ComponentRenderer = ({
	component,
	parents,
	allComponents,
	fallbacks,
}: ComponentRendererProps) => {
	const childTypes = getChildTypesForParent(component.type);

	const children = getSortedChildren(
		allComponents.filter((comp) => childTypes.includes(comp.type)),
		component.key,
	);

	if (
		(component.type === 'menu' ||
			component.type === 'group' ||
			component.type === 'nested-menu' ||
			component.type === 'menu-section') &&
		children.length === 0
	) {
		return null;
	}

	const Component = component.component || getFallbackComponent(component.type, fallbacks);

	const newParents = [...parents, { key: component.key, type: component.type }];

	if (children.length === 0) {
		return <Component parents={parents}>{null}</Component>;
	}

	return (
		<Component parents={parents}>
			{children.map((child) => (
				<ComponentRenderer
					key={child.key}
					component={child as RegisterComponent}
					parents={newParents}
					allComponents={allComponents}
					fallbacks={fallbacks}
				/>
			))}
		</Component>
	);
};

export const ToolbarModelRenderer = ({ toolbar, components, fallbacks }: ToolbarProps) => {
	const ToolbarComponent = toolbar.component || NoOp;

	const sections = getSortedChildren(components.filter(isSection), toolbar.key);

	return (
		<ToolbarComponent>
			{sections.map((section) => (
				<ComponentRenderer
					key={section.key}
					component={section as RegisterComponent}
					parents={[{ key: toolbar.key, type: toolbar.type }]}
					allComponents={components.filter(hasParents)}
					fallbacks={fallbacks}
				/>
			))}
		</ToolbarComponent>
	);
};
