import React from 'react';

import { SmartLinkStatus } from '../../../../../constants';
import { Snippet } from '../../elements';
import { getMaxLines } from '../../utils';
import Block from '../block';

import { type SnippetBlockProps } from './types';

const DEFAULT_MAX_LINES = 3;
const MAXIMUM_MAX_LINES = 6;
const MINIMUM_MAX_LINES = 1;

/**
 * Represents a SnippetBlock, which is used to display longer form text content, like descriptions.
 * @public
 * @param {SnippetBlockProps} SnippetBlockProps
 * @see Block
 */
const SnippetBlock = ({
	maxLines = DEFAULT_MAX_LINES,
	status = SmartLinkStatus.Fallback,
	testId = 'smart-block-snippet',
	text,
	...blockProps
}: SnippetBlockProps) => {
	if (status !== SmartLinkStatus.Resolved && !text) {
		return null;
	}
	const snippetMaxLines = getMaxLines(
		maxLines,
		DEFAULT_MAX_LINES,
		MAXIMUM_MAX_LINES,
		MINIMUM_MAX_LINES,
	);
	const statusTestId = !text ? 'resolved' : 'non-resolved';

	return (
		<Block {...blockProps} testId={`${testId}-${statusTestId}-view`}>
			<Snippet maxLines={snippetMaxLines} content={text} />
		</Block>
	);
};

export default SnippetBlock;
