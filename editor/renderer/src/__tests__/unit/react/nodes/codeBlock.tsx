import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { mountWithIntl } from '@atlaskit/editor-test-helpers/enzyme';
import CodeBlock from '../../../../react/nodes/codeBlock/codeBlock';
import { CodeBlock as AkCodeBlock } from '@atlaskit/code';

const textSample = 'window.alert';
const render = (overrides = {}) => {
	return mountWithIntl(
		<CodeBlock
			language="javascript"
			allowCopyToClipboard={false}
			allowWrapCodeBlock={false}
			text={textSample}
			codeBidiWarningTooltipEnabled={true}
			{...overrides}
		/>,
	);
};
describe('Renderer - React/Nodes/CodeBlock', () => {
	it('should render @atlaskit/code component', () => {
		const node = render();
		const codeBlockWrapper = node.find(AkCodeBlock);
		expect(codeBlockWrapper).toHaveLength(1);
		expect(codeBlockWrapper.at(0).prop('text')).toBe(textSample);
		node.unmount();
	});

	it('should render CopyButton component if allowCopyToClipboard is enabled', () => {
		const node = render({ allowCopyToClipboard: true });
		expect(node.find('CopyButton')).toHaveLength(1);
		node.unmount();
	});

	it('should not render CopyButton component if allowCopyToClipboard is disabled', () => {
		const node = render();
		expect(node.find('CopyButton').exists()).toBe(false);
		node.unmount();
	});

	it('should render wrap button if allowWrapCodeBlock is enabled', () => {
		const node = render({ allowWrapCodeBlock: true });
		expect(node.find('CodeBlockWrapButton')).toHaveLength(1);
		node.unmount();
	});

	it('should not render wrap button if allowWrapCodeBlock is disabled', () => {
		const node = render();
		expect(node.find('CodeBlockWrapButton').exists()).toBe(false);
		node.unmount();
	});
});
