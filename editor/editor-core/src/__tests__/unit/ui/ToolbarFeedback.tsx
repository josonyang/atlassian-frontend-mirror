import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { PublicPluginAPI } from '@atlaskit/editor-common/types';
import { analyticsEventKey } from '@atlaskit/editor-common/utils';
import type { ContextIdentifierPlugin } from '@atlaskit/editor-plugins/context-identifier';
import type { FeedbackDialogPlugin } from '@atlaskit/editor-plugins/feedback-dialog';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { renderWithIntl } from '@atlaskit/editor-test-helpers/rtl';

import type EditorActions from '../../../actions';
import * as presetContext from '../../../presets/context';
import EditorContext from '../../../ui/EditorContext';
import ToolbarFeedback from '../../../ui/ToolbarFeedback';

describe('@atlaskit/editor-core/ui/ToolbarFeedback', () => {
	beforeAll(() => {
		window.jQuery = { ajax: () => {} };
	});

	afterAll(() => {
		if (window.jQuery) {
			delete window.jQuery;
		}
	});

	describe('analytics', () => {
		const mockEventDispatcher: { emit: jest.Mock } = { emit: jest.fn() };

		it('should trigger feedback button clicked analytics event when feedback icon clicked', async () => {
			renderWithIntl(
				<EditorContext
					editorActions={{ eventDispatcher: mockEventDispatcher } as unknown as EditorActions}
				>
					<ToolbarFeedback
						packageName={'editor'}
						packageVersion={'1.1.1'}
						labels={['label1', 'label2']}
					/>
				</EditorContext>,
			);
			await userEvent.click(screen.getByRole('button'));
			expect(mockEventDispatcher.emit).toHaveBeenCalledWith(analyticsEventKey, {
				payload: {
					action: 'clicked',
					actionSubject: 'button',
					actionSubjectId: 'feedbackButton',
					eventType: 'ui',
				},
			});
		});
	});

	describe('openFeedbackDialog', () => {
		const mockEventDispatcher: { emit: jest.Mock } = { emit: jest.fn() };

		it('should open opt out popup for bitbucket when feedback icon is clicked', async () => {
			renderWithIntl(
				<EditorContext
					editorActions={{ eventDispatcher: mockEventDispatcher } as unknown as EditorActions}
				>
					<ToolbarFeedback product="bitbucket" />
				</EditorContext>,
			);
			const confirmationText =
				'We are rolling out a new editing experience across Atlassian products. Help us improve by providing feedback.';
			expect(screen.queryAllByText(confirmationText).length).toEqual(0);
			await userEvent.click(screen.getByRole('button'));
			expect(screen.queryAllByText(confirmationText).length).toEqual(1);
		});

		it('should call openFeedbackDialog with correct params', async () => {
			const usePresetContext = jest.spyOn(presetContext, 'usePresetContext');
			const mockOpenFeedbackDialog = jest.fn();
			usePresetContext.mockImplementation(() => {
				return {
					contextIdentifier: {
						sharedState: {
							currentState: () => {
								return {
									contextIdentifierProvider: {
										objectId: 'object-id',
									},
								};
							},
						},
					},
					feedbackDialog: {
						actions: {
							openFeedbackDialog: mockOpenFeedbackDialog,
						},
					},
				} as unknown as PublicPluginAPI<[ContextIdentifierPlugin, FeedbackDialogPlugin]>;
			});

			renderWithIntl(
				<EditorContext
					editorActions={{ eventDispatcher: mockEventDispatcher } as unknown as EditorActions}
				>
					<ToolbarFeedback
						packageName={'editor'}
						packageVersion={'1.1.1'}
						labels={['label1', 'label2']}
					/>
				</EditorContext>,
			);

			await userEvent.click(screen.getByRole('button'));

			expect(mockOpenFeedbackDialog).toHaveBeenCalledWith({
				packageName: 'editor',
				packageVersion: '1.1.1',
				labels: ['label1', 'label2'],
				contentId: 'object-id',
			});
		});
	});
});
