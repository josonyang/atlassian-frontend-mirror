/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import { Editor, EditorContext, WithEditorActions } from '@atlaskit/editor-core';
import { mentionResourceProvider } from '@atlaskit/util-data-test/mention-story-data';
import { getMockTaskDecisionResource } from '@atlaskit/util-data-test/task-decision-story-data';
import { token } from '@atlaskit/tokens';

import { WikiMarkupTransformer } from '../src';

const container = css({
	display: 'grid',
	gridTemplateColumns: '33% 33% 33%',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'#source, #output': {
		border: '2px solid',
		margin: token('space.100', '8px'),
		padding: token('space.100', '8px'),
		whiteSpace: 'pre-wrap',
		'&:focus': {
			outline: 'none',
		},
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
		'&:empty:not(:focus)::before': {
			content: 'attr(data-placeholder)',
			fontSize: '14px',
		},
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'#source': {
		fontSize: 'xx-small',
	},
});

type Props = { actions: any };
type State = { source: string; output: string };
// Ignored via go/ees005
// eslint-disable-next-line @repo/internal/react/no-class-components
class TransformerPanels extends React.PureComponent<Props, State> {
	state: State = { source: '', output: '' };

	componentDidMount() {
		window.setTimeout(() => {
			this.props.actions.replaceDocument(this.state.source);
		});
	}

	handleUpdateToSource = (e: React.FormEvent<HTMLDivElement>) => {
		const value = e.currentTarget.innerText;
		this.setState({ source: value }, () => this.props.actions.replaceDocument(value));
	};

	handleChangeInTheEditor = async () => {
		const value = await this.props.actions.getValue();
		this.setState({ output: value });
	};

	render() {
		return (
			<div css={container}>
				<div
					id="source"
					contentEditable={true}
					data-placeholder="Enter HTML to convert"
					onInput={this.handleUpdateToSource}
				/>
				<div id="editor">
					<Editor
						appearance="comment"
						allowTextColor={true}
						allowRule={true}
						allowTables={{
							allowColumnResizing: true,
							allowMergeCells: true,
							allowNumberColumn: true,
							allowBackgroundColor: true,
							allowHeaderRow: true,
							allowHeaderColumn: true,
							permittedLayouts: 'all',
						}}
						contentTransformerProvider={(schema) => new WikiMarkupTransformer(schema)}
						allowDate={true}
						mentionProvider={Promise.resolve(mentionResourceProvider)}
						taskDecisionProvider={Promise.resolve(getMockTaskDecisionResource())}
						onChange={this.handleChangeInTheEditor}
					/>
				</div>
				<div
					id="output"
					data-placeholder="This is an empty document (or something has gone really wrong)"
				>
					{this.state.output}
				</div>
			</div>
		);
	}
}

export default () => (
	<EditorContext>
		<WithEditorActions render={(actions) => <TransformerPanels actions={actions} />} />
	</EditorContext>
);
