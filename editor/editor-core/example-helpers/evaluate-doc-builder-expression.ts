// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
	a,
	alignment,
	annotation,
	blockCard,
	blockquote,
	bodiedExtension,
	br,
	breakout,
	caption,
	code,
	code_block,
	confluenceInlineComment,
	confluenceJiraIssue,
	confluenceUnsupportedBlock,
	confluenceUnsupportedInline,
	dataConsumer,
	date,
	decisionItem,
	decisionList,
	doc,
	em,
	embedCard,
	emoji,
	expand,
	extension,
	extensionFrame,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	hardBreak,
	hr,
	img,
	indentation,
	inlineCard,
	inlineExtension,
	layoutColumn,
	layoutSection,
	li,
	media,
	mediaGroup,
	mediaSingle,
	mention,
	multiBodiedExtension,
	nestedExpand,
	ol,
	p,
	panel,
	panelNote,
	placeholder,
	status,
	strike,
	strong,
	subsup,
	table,
	taskItem,
	taskList,
	td,
	tdCursor,
	tdEmpty,
	textColor,
	th,
	thCursor,
	thEmpty,
	tr,
	typeAheadQuery,
	ul,
	underline,
	unsupportedBlock,
	unsupportedInline,
	unsupportedMark,
	unsupportedNodeAttribute,
} from '@atlaskit/editor-test-helpers/doc-builder';

/**
 * Evaluate a nested function expression string in terms of editor test doc builder
 * @see {doc}
 *
 * @example
 * ```ts
 * const buildoc = evaluateDocBuilderExpression('doc(p("Hello, World!"))');
 *
 * if (!(buildDoc instanceof Error)) {
 *   const doc = buildDoc(defaultSchema);
 *   doc.toString(); // doc(p('Hello, World!'))
 * }
 * ```
 */
export const evaluateDocBuilderExpression = (
	docBuilderExpression: string,
): ReturnType<typeof doc> | Error => {
	const context = {
		a,
		alignment,
		annotation,
		blockCard,
		blockquote,
		bodiedExtension,
		br,
		breakout,
		caption,
		code_block,
		code,
		confluenceInlineComment,
		confluenceJiraIssue,
		confluenceUnsupportedBlock,
		confluenceUnsupportedInline,
		dataConsumer,
		date,
		decisionItem,
		decisionList,
		doc,
		em,
		embedCard,
		emoji,
		expand,
		extension,
		extensionFrame,
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		hardBreak,
		hr,
		img,
		indentation,
		inlineCard,
		inlineExtension,
		layoutColumn,
		layoutSection,
		li,
		media,
		mediaGroup,
		mediaSingle,
		mention,
		multiBodiedExtension,
		nestedExpand,
		ol,
		p,
		panel,
		panelNote,
		placeholder,
		status,
		strike,
		strong,
		subsup,
		table,
		taskItem,
		taskList,
		td,
		tdCursor,
		tdEmpty,
		textColor,
		th,
		thCursor,
		thEmpty,
		tr,
		typeAheadQuery,
		ul,
		underline,
		unsupportedBlock,
		unsupportedInline,
		unsupportedMark,
		unsupportedNodeAttribute,
	};

	const args = Object.keys(context).join(', ');

	try {
		// eslint-disable-next-line no-new-func
		const fn = new Function(`{${args}}`, `return ${docBuilderExpression}`);
		const result = fn(context) ?? (() => ({}));
		return result;
	} catch (err: unknown) {
		return err as Error;
	}
};
