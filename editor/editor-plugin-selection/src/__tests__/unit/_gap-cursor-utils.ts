// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  bodiedExtension,
  code_block,
  decisionItem,
  decisionList,
  extension,
  hr,
  media,
  mediaGroup,
  mediaSingle,
  p,
  panel,
  table,
  taskItem,
  taskList,
  tdCursor,
  tdEmpty,
  tr,
} from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { bodiedExtensionData } from '@atlaskit/editor-test-helpers/mock-extension-data';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import randomId from '@atlaskit/editor-test-helpers/random-id';

const extensionAttrs = bodiedExtensionData[0].attrs;

const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
const temporaryFileId = `temporary:${randomId()}`;

const cursorIfSelected = (selected?: boolean) => (selected ? '{<>}' : '');

export const blockNodes = {
  table: (opts: { selected?: boolean } = {}) =>
    table({ localId: 'uniqueId' })(tr(opts.selected ? tdCursor : tdEmpty)),
  taskList: (opts: { id?: string; selected?: boolean } = {}) =>
    taskList({ localId: opts.id })(
      taskItem({ localId: opts.id })(cursorIfSelected(opts.selected)),
    ),
};

export type BlockNodesKeys = Array<keyof typeof blockNodes>;

export const blockContainerNodes = {
  code_block: (opts: { id?: string; selected?: boolean } = {}) =>
    code_block({ language: 'java', uniqueId: opts.id })(
      cursorIfSelected(opts.selected),
    ),
  panel: (opts: { id?: string; selected?: boolean } = {}) =>
    panel({ localId: opts.id })(p(cursorIfSelected(opts.selected))),
  decisionList: (opts: { id?: string; selected?: boolean } = {}) =>
    decisionList({ localId: opts.id })(
      decisionItem({ localId: opts.id })(cursorIfSelected(opts.selected)),
    ),
  bodiedExtension: (opts: { selected?: boolean } = {}) =>
    bodiedExtension(extensionAttrs)(p(cursorIfSelected(opts.selected))),
};

export type BlockContainerNodesKeys = Array<keyof typeof blockContainerNodes>;

export const leafBlockNodes = {
  hr: hr(),
  extension: extension(extensionAttrs)(),
  mediaSingle: mediaSingle({ layout: 'center' })(
    media({
      id: temporaryFileId,
      type: 'file',
      collection: testCollectionName,
      width: 100,
      height: 200,
    })(),
  ),
  mediaGroup: mediaGroup(
    media({
      id: temporaryFileId,
      type: 'link',
      collection: testCollectionName,
    })(),
  ),
};

export type LeafBlockNodesKeys = Array<keyof typeof leafBlockNodes>;
