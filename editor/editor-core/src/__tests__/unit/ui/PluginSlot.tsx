import React from 'react';

import { act, render, screen } from '@testing-library/react';

import { EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { ffTest } from '@atlassian/feature-flags-test-utils';

import EditorActions from '../../../actions';
import PluginSlot from '../../../ui/PluginSlot';

// Mock props and dependencies
const mockEditorView = {} as EditorView;
const mockContainerElement = document.createElement('div');
const mockContentArea = document.createElement('div');

const defaultProps = {
	editorView: mockEditorView,
	editorActions: new EditorActions(),
	items: [],
	providerFactory: new ProviderFactory(),
	eventDispatcher: new EventDispatcher(),
	popupsMountPoint: undefined,
	popupsBoundariesElement: undefined,
	popupsScrollableElement: undefined,
	containerElement: mockContainerElement,
	disabled: false,
	wrapperElement: null,
	contentArea: mockContentArea,
	pluginHooks: undefined,
	appearance: 'full-page' as const,
	dispatchAnalyticsEvent: jest.fn(),
};

describe('PluginSlot Component', () => {
	describe('should not render anything when items and pluginHooks are empty and editorView is missing', () => {
		ffTest('platform_editor_react_18_plugin_slot', () => {
			const { container } = render(<PluginSlot {...defaultProps} editorView={undefined} />);
			expect(container.firstChild).toBeNull();
		});
	});

	describe('should render when items and pluginHooks are empty and editorView is missing', () => {
		ffTest('platform_editor_react_18_plugin_slot', () => {
			render(<PluginSlot {...defaultProps} items={[() => <p>hi</p>]} />);
			expect(screen.getByText('hi')).toBeVisible();
		});
	});

	describe('should render items once if props do not change', () => {
		ffTest('platform_editor_react_18_plugin_slot', () => {
			const testItem = jest.fn(() => <p>hi</p>);
			const items = [testItem];
			const { rerender } = render(<PluginSlot {...defaultProps} items={items} />);
			rerender(<PluginSlot {...defaultProps} items={items} />);
			rerender(<PluginSlot {...defaultProps} items={items} />);
			expect(testItem).toHaveBeenCalledTimes(1);
		});
	});

	describe('should re-render items if specific props change (ie. disabled)', () => {
		ffTest('platform_editor_react_18_plugin_slot', () => {
			const testItem = jest.fn(() => <p>hi</p>);
			const items = [testItem];
			const { rerender } = render(<PluginSlot {...defaultProps} items={items} />);
			rerender(<PluginSlot {...defaultProps} items={items} />);
			rerender(<PluginSlot {...defaultProps} items={items} disabled={true} />);
			expect(testItem).toHaveBeenCalledTimes(2);
		});
	});

	describe('should not re-render if items updates but has the same component', () => {
		ffTest(
			'platform_editor_react_18_plugin_slot',
			// Improved behaviour
			() => {
				const testItem = jest.fn(() => <p>hi</p>);
				const { rerender } = render(<PluginSlot {...defaultProps} items={[testItem]} />);
				rerender(<PluginSlot {...defaultProps} items={[testItem]} />);
				expect(testItem).toHaveBeenCalledTimes(1);
			},
			() => {
				const testItem = jest.fn(() => <p>hi</p>);
				const { rerender } = render(<PluginSlot {...defaultProps} items={[testItem]} />);
				rerender(<PluginSlot {...defaultProps} items={[testItem]} />);
				expect(testItem).toHaveBeenCalledTimes(2);
			},
		);
	});

	describe('should not items if event unrelated to width fires', () => {
		ffTest('platform_editor_react_18_plugin_slot', () => {
			const testItem = jest.fn(() => <p>hi</p>);
			const items = [testItem];
			const event = new Event('transitionend');
			Object.defineProperty(event, 'propertyName', { value: 'height' });

			render(<PluginSlot {...defaultProps} items={items} />);
			act(() => {
				defaultProps.contentArea.dispatchEvent(event);
			});
			expect(testItem).toHaveBeenCalledTimes(1);
		});
	});
});
