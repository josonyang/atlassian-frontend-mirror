import React from 'react';

import { mount } from 'enzyme';

import * as EventDispatcher from '@atlaskit/editor-common/event-dispatcher';
import { analyticsEventKey } from '@atlaskit/editor-common/utils';

import EditorContext from '../../../ui/EditorContext';
import WithHelpTrigger from '../../../ui/WithHelpTrigger';
import { name } from '../../../version-wrapper';

describe(name, () => {
	describe('WithHelpTrigger', () => {
		it('should render child component as is', () => {
			const dummy = () => <div>test</div>;
			const wrapper = mount(
				<EditorContext>
					<WithHelpTrigger render={dummy} />
				</EditorContext>,
			);
			expect(wrapper.html()).toEqual('<div>test</div>');
			wrapper.unmount();
		});

		it('should pass function openHelp as parameter to render method', () => {
			const stub = jest.fn();
			stub.mockImplementation(() => <div>test</div>);
			const wrapper = mount(
				<EditorContext>
					<WithHelpTrigger render={stub} />
				</EditorContext>,
			);
			expect(stub).toHaveBeenCalled();
			wrapper.unmount();
		});

		describe('open help', () => {
			it('should trigger help clicked analytics event', () => {
				let mockDispatch;
				const mockCreateDispatch = jest
					.spyOn(EventDispatcher, 'createDispatch')
					.mockReturnValue((mockDispatch = jest.fn()));

				mount(
					<EditorContext>
						<WithHelpTrigger
							render={(openHelp) => {
								openHelp();
								return null;
							}}
						/>
					</EditorContext>,
				);

				expect(mockDispatch).toHaveBeenCalledWith(analyticsEventKey, {
					payload: {
						action: 'clicked',
						actionSubject: 'button',
						actionSubjectId: 'helpButton',
						attributes: { inputMethod: 'toolbar' },
						eventType: 'ui',
					},
				});
				mockCreateDispatch.mockRestore();
			});
		});
	});
});
