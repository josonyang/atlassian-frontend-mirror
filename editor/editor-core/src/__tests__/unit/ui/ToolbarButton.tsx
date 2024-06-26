import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';

import { FabricChannel } from '@atlaskit/analytics-listeners';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE } from '@atlaskit/editor-common/analytics';
import { TOOLBAR_BUTTON, ToolbarButton } from '@atlaskit/editor-common/ui-menu';
import Tooltip from '@atlaskit/tooltip';

const noop = () => {};

describe('@atlaskit/editor-core/ui/ToolbarButton', () => {
	it('should not render tooltip if title is not set', () => {
		const toolbarButtonElem = mount(
			<ToolbarButton onClick={noop} selected={false} disabled={false} />,
		);

		expect(toolbarButtonElem.find(Tooltip)).toHaveLength(0);
		toolbarButtonElem.unmount();
	});

	it('should render tooltip if title is set', () => {
		const toolbarButtonElem = mount(
			<ToolbarButton onClick={noop} selected={false} disabled={false} title="tooltip text" />,
		);

		expect(toolbarButtonElem.find(Tooltip)).toHaveLength(1);
		toolbarButtonElem.unmount();
	});

	it('should not display tooltip if hideTooltip prop is passed in', () => {
		const toolbarButtonElem = mount(
			<ToolbarButton
				onClick={noop}
				selected={false}
				disabled={false}
				hideTooltip={true}
				title="tooltip text"
			/>,
		);

		toolbarButtonElem.simulate('mouseover');

		const tooltip = toolbarButtonElem.find(Tooltip);

		expect(tooltip.html()).not.toContain('tooltip text');
		toolbarButtonElem.unmount();
	});

	it('should pass titlePosition to tooltip position', () => {
		const toolbarButtonElem = mount(
			<ToolbarButton
				onClick={noop}
				selected={false}
				disabled={false}
				title="tooltip text"
				titlePosition="left"
			/>,
		);

		const tooltip = toolbarButtonElem.find(Tooltip);
		tooltip.simulate('mouseover');
		expect(tooltip.prop('position')).toEqual('left');
		toolbarButtonElem.unmount();
	});

	describe('when button id is not set', () => {
		it('should not fire the analytics event', () => {
			const onEvent = jest.fn();
			const component = render(
				<AnalyticsListener onEvent={onEvent} channel={FabricChannel.editor}>
					<ToolbarButton
						testId="some-test-id"
						onClick={noop}
						selected={false}
						disabled={false}
						title="tooltip text"
						titlePosition="left"
					/>
				</AnalyticsListener>,
			);

			const { getByTestId } = component;
			fireEvent.click(getByTestId('some-test-id'));
			expect(onEvent).not.toHaveBeenCalled();
		});
	});

	describe('when button id is set', () => {
		it('should fire the analytics event with the button id', () => {
			const onEvent = jest.fn();
			const component = render(
				<AnalyticsListener onEvent={onEvent} channel={FabricChannel.editor}>
					<ToolbarButton
						buttonId={TOOLBAR_BUTTON.UNDO}
						testId="some-test-id"
						onClick={noop}
						selected={false}
						disabled={false}
						title="tooltip text"
						titlePosition="left"
					/>
				</AnalyticsListener>,
			);

			const { getByTestId } = component;
			fireEvent.click(getByTestId('some-test-id'));
			expect(onEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					payload: {
						action: ACTION.CLICKED,
						actionSubject: ACTION_SUBJECT.TOOLBAR_BUTTON,
						actionSubjectId: TOOLBAR_BUTTON.UNDO,
						eventType: EVENT_TYPE.UI,
						attributes: expect.any(Object),
					},
				}),
				'editor',
			);
		});
	});
});
