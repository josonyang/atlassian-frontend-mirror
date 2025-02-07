import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import type { DocBuilder } from '@atlaskit/editor-common/types';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, p } from '@atlaskit/editor-test-helpers/doc-builder';

import ClickAreaInline from '../../../../ui/Addon/ClickAreaInline';

const clickWrapperId = 'click-wrapper';
describe('ClickAreaInline', () => {
	const createEditor = createEditorFactory();
	const editor = (doc: DocBuilder) =>
		createEditor({
			doc,
		});

	it('should create empty terminal empty paragraph when clicked', () => {
		const { editorView } = editor(doc(p('Hello world')));
		render(<ClickAreaInline editorView={editorView} />);
		fireEvent.mouseDown(screen.getByTestId(clickWrapperId), { clientY: 300 });
		expect(editorView.state.doc).toEqualDocument(doc(p('Hello world'), p('')));
	});

	it('should not create empty terminal empty paragraph if it is already present at end', () => {
		const { editorView } = editor(doc(p('Hello world'), p('')));
		render(<ClickAreaInline editorView={editorView} />);
		fireEvent.mouseDown(screen.getByTestId(clickWrapperId), { clientY: 300 });
		expect(editorView.state.doc).toEqualDocument(doc(p('Hello world'), p('')));
	});
});
