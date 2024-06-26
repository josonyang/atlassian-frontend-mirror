import { type Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { encode, type NodeEncoder, type NodeEncoderOpts } from '..';

const panelTypeColorMapping: { [key: string]: string } = {
	info: '#deebff',
	note: '#eae6ff',
	success: '#e3fcef',
	warning: '#fffae6',
	error: '#ffebe6',
};

export const panel: NodeEncoder = (node: PMNode, { context }: NodeEncoderOpts = {}): string => {
	const result: string[] = [];
	node.forEach((n) => {
		result.push(encode(n, context));
	});
	return `{panel:bgColor=${panelTypeColorMapping[node.attrs.panelType] || ''}}
${result.join('\n\n')}
{panel}`;
};
