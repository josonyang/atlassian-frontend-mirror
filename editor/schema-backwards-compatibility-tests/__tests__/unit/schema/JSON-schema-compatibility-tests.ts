import * as v1schema from '@atlaskit/adf-schema';
import { defaultSchema } from '@atlaskit/adf-schema/schema-default';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import type {
  MarkType,
  Node,
  NodeType,
} from '@atlaskit/editor-prosemirror/model';
import { initialize } from '@atlaskit/editor-test-helpers/ajv';
import {
  bodiedExtension,
  extension,
  p,
  table,
  td,
  th,
  tr,
} from '@atlaskit/editor-test-helpers/doc-builder';
import {
  pmNodeBuilder as builder,
  pmNodeFactory as factory,
  pmMarkBuilder as markBuilder,
} from '@atlaskit/editor-test-helpers/schema-element-builder';

// TODO: We did this change when we bump ajv version 6.
// It will be refactored in this ticket: https://product-fabric.atlassian.net/browse/ED-10888.
/**
 * Check if JSON is valid according to JSON schema.
 */
const ajv = initialize();

const validate = ajv.compile(v1schema);
const isValidJSONSchema = (json: { version: number }) => {
  json.version = 1;
  validate(json);
  return validate.errors === null;
};

const unsupportedNodes = [
  'confluenceUnsupportedBlock',
  'confluenceUnsupportedInline',
  'unsupportedBlock',
  'unsupportedInline',
  'confluenceJiraIssue',
  'unknownBlock',

  // following nodes do not have schema defined
  'image',
  'placeholder',
  'layoutSection',
  'layoutColumn',
  'inlineCard',
  'blockCard',
  'status',
  'embedCard',
];

const unsupportedMarks = [
  'link',
  'breakout',
  'alignment',
  'indentation',
  '__colorGroupDeclaration',
  '__fontStyleGroupDeclaration',
  '__searchQueryGroupDeclaration',
  '__linkGroupDeclaration',
  'confluenceInlineComment',
  'annotation',
  'border',
  'unsupportedMark',
  'unsupportedNodeAttribute',
  'typeAheadQuery',
  'dataConsumer',
  'fragment', // The test suite was designed to test the marks on the text and generates an invalid dataset for the marks on the node.
];

/**
 * Create an array of all nodes in the schema.
 */
const nodes: NodeType[] = [];
for (const nodeName in defaultSchema.nodes) {
  nodes.push(defaultSchema.nodes[nodeName]);
}

/**
 * Create an array of all marks in the schema.
 */
const marks: MarkType[] = [];
for (const markName in defaultSchema.marks) {
  marks.push(defaultSchema.marks[markName]);
}

/**
 * Create block test data adding marks supported by the block.
 */
const buildWithMarks = (nodeType: NodeType): Function[] => {
  const buildNodes: Function[] = [];
  marks.forEach((mark: MarkType) => {
    if (
      nodeType.allowsMarkType(mark) &&
      unsupportedMarks.indexOf(mark.name) < 0
    ) {
      buildNodes.push(
        (factory as any)[nodeType.name]((markBuilder as any)[mark.name]),
      );
    }
  });
  return buildNodes;
};

/**
 * Create test data for node type up to passed depth.
 */
const getNodeMatches = (
  nodeType: NodeType,
  maxDepth = 0,
  depth = 0,
): Function[] => {
  const matches: Function[] = [];
  nodes.forEach(n => {
    if (
      n.name !== nodeType.name &&
      nodeType.contentMatch.matchType(n) &&
      unsupportedNodes.indexOf(n.name) < 0
    ) {
      if (depth === 0) {
        // if depth is 0 build a child node.
        matches.push((factory as any)[nodeType.name]((builder as any)[n.name]));
      } else if (depth > 0) {
        // if depth is greater than 0 find further child nodes.
        const childNodes = getNodeMatches(n, maxDepth, depth - 1);
        if (childNodes.length === 0) {
          // if child has no further child for instance 'text' node add it.
          matches.push(
            (factory as any)[nodeType.name]((builder as any)[n.name]),
          );
        } else {
          // add all the various combinations of child and its further children.
          matches.push(
            ...childNodes.map(c => (factory as any)[nodeType.name](c)),
          );
        }
      }
    }
  });
  if (nodeType.isBlock) {
    // Add marks if its block on doc level.
    // Checking depth is to ensure testing of mark combination only once and not in nested blocks.
    if (depth === maxDepth - 1) {
      matches.push(...buildWithMarks(nodeType));
    }
    // If its block node with no matching content, just build and return it.
    // This is for cases like 'rule'
    if (matches.length === 0) {
      matches.push((builder as any)[nodeType.name]);
    }
  }
  return matches;
};

/**
 * Generate display name of node adding name of all its children.
 */
const getDisplayName = (node: Node) => {
  if (!node) {
    return '';
  }
  let displayName: string = `${getDisplayName(node.firstChild!)} -> `;
  const markDisplayText =
    node.marks && node.marks.map(mark => mark.type && mark.type.name).join(',');
  if (markDisplayText) {
    displayName += `${markDisplayText} -> `;
  }
  displayName += node.type && node.type.name;
  return displayName;
};

describe('ProseMirror and JSON schema tests', () => {
  // create node test data up to 2 level depths.
  const dataSet = getNodeMatches(defaultSchema.nodes.doc, 4, 4);
  const transformer = new JSONTransformer();

  dataSet.forEach(editorData => {
    const editorDoc = editorData(defaultSchema);
    const editorJson = transformer.encode(editorDoc);
    it(`should validate JSON schema for ${getDisplayName(editorDoc)}`, () => {
      expect(isValidJSONSchema(editorJson)).toBe(true);
    });
  });

  /**
   *  Separately testing fragment with supported nodes, as the above test suite generates an invalid dataset for nodes with fragment marks
   */
  it(`should validate JSON schema for  -> extension -> fragment -> doc`, () => {
    const editorDoc = (factory as any)['doc'](
      (markBuilder as any)['fragment'](
        extension({ extensionKey: '123', extensionType: 'extension' })(),
      ),
    )(defaultSchema);
    const editorJson = transformer.encode(editorDoc);
    expect(isValidJSONSchema(editorJson)).toBe(true);
  });

  it(`should validate JSON schema for  -> bodiedExtension -> fragment -> doc`, () => {
    const editorDoc = (factory as any)['doc'](
      (markBuilder as any)['fragment'](
        bodiedExtension({
          extensionKey: '123',
          extensionType: 'bodiedExtension',
        })(p('extended paragraph')),
      ),
    )(defaultSchema);
    const editorJson = transformer.encode(editorDoc);
    expect(isValidJSONSchema(editorJson)).toBe(true);
  });

  it(`should validate JSON schema for  -> table -> fragment -> doc`, () => {
    const editorDoc = (factory as any)['doc'](
      (markBuilder as any)['fragment'](
        table()(
          tr(th({ colspan: 1, rowspan: 1 })(p('fake table header'))),
          tr(td({ colspan: 1, rowspan: 1 })(p('fake table row'))),
        ),
      ),
    )(defaultSchema);
    const editorJson = transformer.encode(editorDoc);
    expect(isValidJSONSchema(editorJson)).toBe(true);
  });
});

/**
 * Attributes __fileName, __fileMimeType etc on media node break tests.
 */
