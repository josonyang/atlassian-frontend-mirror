import { createContext, type Context } from 'react';

import { type TTopLevelItem } from './data';

export function createRegistry(): { getElementForFilter: (filterId: string) => HTMLElement | null; getElementForProject: (projectId: string) => HTMLElement | null; getElementForTopLevelItem: (item: TTopLevelItem) => HTMLElement | null; registerFilter: ({ filterId, element }: { element: HTMLElement; filterId: string; }) => () => void; registerProject: ({ projectId, element }: { element: HTMLElement; projectId: string; }) => () => void; registerTopLevelItem: ({ item, element }: { element: HTMLElement; item: TTopLevelItem; }) => () => void; } {
	const projectRegistry = new Map<string, HTMLElement>();
	const filterRegistry = new Map<string, HTMLElement>();

	function registerProject({ projectId, element }: { element: HTMLElement; projectId: string }) {
		projectRegistry.set(projectId, element);
		return function cleanup(): void {
			projectRegistry.delete(projectId);
		};
	}

	function registerFilter({ filterId, element }: { element: HTMLElement; filterId: string }) {
		filterRegistry.set(filterId, element);
		return function cleanup(): void {
			filterRegistry.delete(filterId);
		};
	}

	function registerTopLevelItem({ item, element }: { element: HTMLElement; item: TTopLevelItem }) {
		filterRegistry.set(item, element);
		return function cleanup(): void {
			filterRegistry.delete(item);
		};
	}

	function getElementForProject(projectId: string): HTMLElement | null {
		return projectRegistry.get(projectId) ?? null;
	}

	function getElementForFilter(filterId: string): HTMLElement | null {
		return filterRegistry.get(filterId) ?? null;
	}

	function getElementForTopLevelItem(item: TTopLevelItem): HTMLElement | null {
		return filterRegistry.get(item) ?? null;
	}

	return {
		registerFilter,
		registerProject,
		registerTopLevelItem,
		getElementForFilter,
		getElementForProject,
		getElementForTopLevelItem,
	};
}

export const RegistryContext: Context<{
    getElementForFilter: (filterId: string) => HTMLElement | null;
    getElementForProject: (projectId: string) => HTMLElement | null;
    getElementForTopLevelItem: (item: TTopLevelItem) => HTMLElement | null;
    registerFilter: ({ filterId, element }: { element: HTMLElement; filterId: string; }) => () => void;
    registerProject: ({ projectId, element }: { element: HTMLElement; projectId: string; }) => () => void;
    registerTopLevelItem: ({ item, element }: { element: HTMLElement; item: TTopLevelItem; }) => () => void;
} | null> = createContext<ReturnType<typeof createRegistry> | null>(null);
