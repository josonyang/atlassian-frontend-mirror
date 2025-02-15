import React from 'react';

import { mount } from 'enzyme';

import { ffTest } from '@atlassian/feature-flags-test-utils';

import EditorActions from '../../../actions';
import EditorContext from '../../../ui/EditorContext';
import WithEditorActions from '../../../ui/WithEditorActions';

describe('WithEditorActions', () => {
	ffTest.both('platform_editor_react18_phase2_v2', 'react 18', () => {
		it('should render component with editorActions', () => {
			const editorActions = new EditorActions();
			const component = jest.fn(() => null);
			const wrapper = mount(
				<EditorContext editorActions={editorActions}>
					<WithEditorActions render={component} />
				</EditorContext>,
			);
			expect(component).toBeCalledWith(editorActions);
			wrapper.unmount();
		});
	});

	ffTest.both('platform_editor_react18_phase2_v2', 'react 18', () => {
		it('should re-render component after editor is registered in editorActions', () => {
			const mockEditorView: any = {};
			const editorActions = new EditorActions();
			const component = jest.fn(() => null);
			const wrapper = mount(
				<EditorContext editorActions={editorActions}>
					<WithEditorActions render={component} />
				</EditorContext>,
			);
			editorActions._privateRegisterEditor(mockEditorView, {} as any);
			wrapper.update();
			const lastCall: any = component.mock.calls.pop();
			const [actions]: [EditorActions] = lastCall;
			expect(actions._privateGetEditorView()).toBe(mockEditorView);
			wrapper.unmount();
		});
	});

	ffTest.both('platform_editor_react18_phase2_v2', 'react 18', () => {
		it('should render component with editor actions even if they were registered before WithEditorActions component renders', () => {
			const mockEditorView: any = {};
			const editorActions = new EditorActions();
			const component = jest.fn(() => null);
			editorActions._privateRegisterEditor(mockEditorView, {} as any);
			const wrapper = mount(
				<EditorContext editorActions={editorActions}>
					<WithEditorActions render={component} />
				</EditorContext>,
			);
			wrapper.update();
			const lastCall: any = component.mock.calls.pop();
			const [actions]: [EditorActions] = lastCall;
			expect(actions._privateGetEditorView()).toBe(mockEditorView);
			wrapper.unmount();
		});
	});
});
