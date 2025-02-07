/**
 *
 * PLEASE DO NOT REMOVE THIS EXAMPLE
 * it is used on developer.atlassian.com documentation
 *
 * this is the page where it is used; https://developer.atlassian.com/cloud/jira/platform/apis/document/playground/
 *
 */
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import { type ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { type HelpDialogPlugin } from '@atlaskit/editor-plugins/help-dialog';
import { storyMediaProviderFactory } from '@atlaskit/editor-test-helpers/media-provider';
import type { EmojiProvider } from '@atlaskit/emoji/resource';
import TextArea from '@atlaskit/textarea';
import { currentUser, getEmojiProvider } from '@atlaskit/util-data-test/get-emoji-provider';
import { mentionResourceProvider } from '@atlaskit/util-data-test/mention-story-data';
import { getMockTaskDecisionResource } from '@atlaskit/util-data-test/task-decision-story-data';

import type { EditorActions, EditorProps } from '../src';
import { ComposableEditor } from '../src/composable-editor';
import { useUniversalPreset } from '../src/preset-universal';
import EditorContext from '../src/ui/EditorContext';
import ToolbarHelp from '../src/ui/ToolbarHelp';
import WithEditorActions from '../src/ui/WithEditorActions';
import { usePreset } from '../src/use-preset';

interface AdfState {
	isValidAdf: boolean;
}

// eslint-disable-next-line @atlaskit/design-system/no-css-tagged-template-expression, @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
const wrapper: any = css`
	display: 'flex';
	padding: '10px';
	flex-direction: 'column';
`;

export const providers: any = {
	emojiProvider: getEmojiProvider({
		uploadSupported: true,
		currentUser,
	}) as Promise<EmojiProvider>,
	taskDecisionProvider: Promise.resolve(getMockTaskDecisionResource()),
	mentionProvider: Promise.resolve(mentionResourceProvider),
};

// Ignored via go/ees005
// eslint-disable-next-line @repo/internal/react/no-class-components
export default class Example extends React.Component<{}, AdfState> {
	private editorActions?: EditorActions;
	private adfTextArea?: HTMLTextAreaElement;
	state = {
		isValidAdf: true,
	};

	render() {
		return (
			<EditorContext>
				<div css={wrapper}>
					<div>
						<WithEditorActions
							render={(actions) => {
								this.editorActions = actions;
								return (
									<ComposableEditorWrapper
										onChange={this.handleEditorChange}
										appearance="full-page"
										allowRule={true}
										allowTextColor={true}
										allowTables={{
											allowControls: true,
										}}
										allowPanel={true}
										allowHelpDialog={true}
										placeholder="We support markdown! Try **bold**, `inline code`, or ``` for code blocks."
										// Ignored via go/ees005
										// eslint-disable-next-line react/jsx-key
										primaryToolbarComponents={[<ToolbarHelp editorApi={undefined} />]}
										media={{
											provider: storyMediaProviderFactory(),
											allowMediaSingle: true,
										}}
										{...providers}
									/>
								);
							}}
						/>
					</div>
					<div>
						<h2>ADF</h2>
						<TextArea
							onChange={this.handleAdfChange}
							isInvalid={!this.state.isValidAdf}
							ref={(ref: any) => (this.adfTextArea = ref)}
							placeholder='{"version": 1...'
							isMonospaced={true}
							minimumRows={20}
						/>
					</div>
				</div>
			</EditorContext>
		);
	}

	private handleAdfChange = (e: { target: { value: string } }) => {
		try {
			if (this.editorActions) {
				this.editorActions.replaceDocument(e.target.value);
			}
		} catch (error) {
			this.setState({ isValidAdf: false });
			if (error instanceof Error) {
				throw error;
			}
			throw new Error(String(error));
		}
		this.setState({ isValidAdf: true });
	};

	private handleEditorChange = () => {
		this.updateFields();
	};

	private updateFields = () => {
		if (!this.editorActions) {
			return;
		}

		this.editorActions.getValue().then((value) => {
			if (this.adfTextArea) {
				this.adfTextArea.value = JSON.stringify(value, null, 2);
			}
		});
	};
}

const ComposableEditorWrapper = (props: EditorProps) => {
	const universalPreset = useUniversalPreset({ props });
	const { preset, editorApi } = usePreset(() => universalPreset, [universalPreset]);

	return (
		<ComposableEditor
			preset={preset}
			{...props}
			primaryToolbarComponents={
				<ToolbarHelp
					key={1}
					titlePosition="top"
					title="Help"
					editorApi={
						props.allowHelpDialog ? (editorApi as ExtractInjectionAPI<HelpDialogPlugin>) : undefined
					}
				/>
			}
		/>
	);
};
