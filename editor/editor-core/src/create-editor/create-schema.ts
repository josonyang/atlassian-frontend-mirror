import { sortByOrder } from './sort-by-order';
import type { MarkSpec, NodeSpec } from '@atlaskit/editor-prosemirror/model';
import { Schema } from '@atlaskit/editor-prosemirror/model';
import { sanitizeNodes } from '@atlaskit/adf-schema';
import { fixExcludes } from './create-editor';
import type { MarkConfig, NodeConfig } from '../types/pm-config';

export function createSchema(editorConfig: {
  marks: MarkConfig[];
  nodes: NodeConfig[];
}) {
  const marks = fixExcludes(
    editorConfig.marks.sort(sortByOrder('marks')).reduce((acc, mark) => {
      acc[mark.name] = mark.mark;
      return acc;
    }, {} as { [nodeName: string]: MarkSpec }),
  );
  const nodes = sanitizeNodes(
    editorConfig.nodes.sort(sortByOrder('nodes')).reduce((acc, node) => {
      acc[node.name] = node.node;
      return acc;
    }, {} as { [nodeName: string]: NodeSpec }),
    marks,
  );

  return new Schema({ nodes, marks });
}
