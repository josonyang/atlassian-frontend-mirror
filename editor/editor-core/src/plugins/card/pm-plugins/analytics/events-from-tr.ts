import {
  EditorState,
  ReadonlyTransaction,
  Transaction,
} from 'prosemirror-state';
import { AddMarkStep, RemoveMarkStep } from 'prosemirror-transform';
import { Mark, Schema, Node } from 'prosemirror-model';

import { ACTION } from '@atlaskit/editor-common/analytics';
import { isLinkMark } from '@atlaskit/editor-common/utils';
import { getLinkMetadataFromTransaction } from '@atlaskit/editor-common/card';
import { LinkMetaStep } from '@atlaskit/adf-schema/steps';

import { pmHistoryPluginKey } from '../../../history/pm-history-types';
import { getPluginState } from '../util/state';
import { pluginKey } from '../plugin-key';
import { LifecycleEvent } from '../../types';

import { Link } from './types';
import {
  isLink,
  linkObjectFromNode,
  getLinkUrl,
  appearanceForLink,
  findLinksAtPositions,
} from './utils';

const findLinksInNodeRange = (
  node: Node,
  schema: Schema,
  from: number,
  to: number,
) => {
  const links: Link[] = [];

  node.nodesBetween(from, to, (node, pos) => {
    if (isLink(schema, node)) {
      const entireLinkInRange = pos >= from && pos + node.nodeSize <= to;

      if (entireLinkInRange) {
        const link = linkObjectFromNode(schema, node, pos);
        if (link) {
          links.push(link);
        }
      }
    }
  });

  return links;
};

export const findChangedLinks = (
  tr: Transaction | ReadonlyTransaction,
  state: EditorState,
) => {
  const schema = tr.doc.type.schema;
  const removed: Link[] = [];
  const inserted: Link[] = [];
  const updated: (
    | { removed: Link; inserted: Link }
    | { inserted: Link; previous: { display?: string } }
  )[] = [];

  const queuedForUpgrade = isTransactionQueuedForUpgrade(tr);
  const isResolveReplace = isTransactionResolveReplace(tr);

  // History
  const historyMeta: unknown = tr.getMeta(pmHistoryPluginKey);
  const isUndo = isHistoryMeta(historyMeta) && historyMeta.redo === false;
  const isRedo = isHistoryMeta(historyMeta) && historyMeta.redo === true;

  const isUpdate = isUpdateTr(tr, isUndo || isRedo);

  for (let i = 0; i < tr.steps.length; i++) {
    const step = tr.steps[i];
    const stepMap = step.getMap();
    const removedInStep: Link[] = [];
    const insertedInStep: Link[] = [];

    /**
     * AddMarkStep and RemoveMarkSteps don't produce stepMap ranges
     * because there are no "changed tokens" only marks added/removed
     * So have to check these manually
     */
    if (step instanceof AddMarkStep) {
      const addMarkStep = step as AddMarkStep & {
        from: number;
        mark: Mark;
      };

      if (isLinkMark(addMarkStep.mark, schema)) {
        /**
         * For url text pasted on plain text
         */
        insertedInStep.push({
          type: 'mark',
          pos: addMarkStep.from,
          mark: addMarkStep.mark,
        });
      }
    }

    if (step instanceof RemoveMarkStep) {
      const removeMarkStep = step as RemoveMarkStep & {
        from: number;
        mark: Mark;
      };

      if (isLinkMark(removeMarkStep.mark, schema)) {
        /**
         * For url text pasted on plain text
         */
        removedInStep.push({
          type: 'mark',
          pos: removeMarkStep.from,
          mark: removeMarkStep.mark,
        });
      }
    }

    stepMap.forEach((oldStart, oldEnd, newStart, newEnd) => {
      const before = tr.docs[i];
      const after = tr.docs[i + 1] ?? tr.doc;
      const removedInRange: Link[] = [];
      const insertedInRange: Link[] = [];

      // Removed
      removedInRange.push(
        ...findLinksInNodeRange(before, schema, oldStart, oldEnd),
      );
      // Inserted
      insertedInRange.push(
        ...findLinksInNodeRange(after, schema, newStart, newEnd),
      );

      removedInStep.push(...removedInRange);
      insertedInStep.push(...insertedInRange);
    });

    const omitQueuedLinks = (links: Link[]) => {
      if (!queuedForUpgrade) {
        return links;
      }
      /**
       * Skip/filter out links that have been queued, they will be tracked later
       */
      const queuedPositions = getQueuedPositions(tr);
      return links.filter((link) => !queuedPositions.includes(link.pos));
    };

    /**
     * Skip "deletions" when the transaction is relating to
     * replacing links queued for upgrade to cards,
     * because the "deleted" link has not actually been
     * tracked as "created" yet
     */
    if (!isResolveReplace) {
      removed.push(...removedInStep);
    }
    inserted.push(...omitQueuedLinks(insertedInStep));
  }

  /**
   * If there are no links changed but the transaction is a "resolve" action
   * Then this means we have resolved a link but it has failed to upgrade
   * We should track all resolved links as now being created
   */
  if (inserted.length === 0 && isResolveReplace) {
    const positions = getResolvePositions(tr, state);
    inserted.push(...findLinksAtPositions(tr, positions));
  }

  if (!isUpdate) {
    return {
      removed,
      inserted,
      updated,
    };
  }

  for (let i = 0; i < inserted.length; i++) {
    if (isResolveReplace) {
      const newLink = inserted[i];

      // what is the 2nd argument 'assoc = -1' doing here exactly?
      const mappedPos = tr.mapping.map(newLink.pos, -1);
      const previousDisplay = getResolveLinkPrevDisplay(state, mappedPos);

      updated.push({
        inserted: inserted[i],
        previous: {
          display: previousDisplay,
        },
      });

      continue;
    }

    if (inserted.length === removed.length) {
      updated.push({
        removed: removed[i],
        inserted: inserted[i],
      });
    }
  }

  return {
    inserted: [],
    removed: [],
    updated,
  };
};

/**
 * List of actions to be considered link "updates"
 */
const UPDATE_ACTIONS: string[] = [ACTION.CHANGED_TYPE, ACTION.UPDATED];

/**
 * Returns true if the transaction has LinkMetaSteps that indicate the transaction is
 * intended to be perceived as an update to links, rather than insertion+deletion
 */
const isUpdateTr = (
  tr: Transaction | ReadonlyTransaction,
  isUndoOrRedo: boolean,
) => {
  return !!tr.steps.find((step) => {
    if (!(step instanceof LinkMetaStep)) {
      return false;
    }

    const { action, cardAction } = step.getMetadata();

    /**
     * Undo of a resolve step should be considered an update
     * because the user is choosing to update the url back to the un-upgraded display
     */
    if (cardAction === 'RESOLVE' && isUndoOrRedo) {
      return true;
    }

    if (!action) {
      return false;
    }

    return UPDATE_ACTIONS.includes(action);
  });
};

const hasType = (pluginMeta: unknown): pluginMeta is { type: unknown } => {
  return (
    typeof pluginMeta === 'object' &&
    pluginMeta !== null &&
    'type' in pluginMeta
  );
};

const isTransactionQueuedForUpgrade = (
  tr: Transaction | ReadonlyTransaction,
) => {
  const pluginMeta = tr.getMeta(pluginKey);

  return hasType(pluginMeta) && pluginMeta.type === 'QUEUE';
};

const isTransactionResolveReplace = (tr: Transaction | ReadonlyTransaction) => {
  const pluginMeta = tr.getMeta(pluginKey);

  return hasType(pluginMeta) && pluginMeta.type === 'RESOLVE';
};

const isHistoryMeta = (meta: unknown): meta is { redo: unknown } => {
  return typeof meta === 'object' && meta !== null && 'redo' in meta;
};

const getQueuedPositions = (tr: Transaction | ReadonlyTransaction) => {
  const pluginMeta: unknown = tr.getMeta(pluginKey);

  if (!isTransactionQueuedForUpgrade(tr)) {
    return [];
  }

  return (pluginMeta as any).requests.map(({ pos }: any) => pos);
};

const getResolvePositions = (
  tr: Transaction | ReadonlyTransaction,
  state: EditorState,
) => {
  const cardState = getPluginState(state);
  if (!cardState) {
    return [];
  }

  const pluginMeta: unknown = tr.getMeta(pluginKey);

  if (!isTransactionResolveReplace(tr)) {
    return [];
  }

  return cardState.requests
    .filter((request) => request.url === (pluginMeta as any).url)
    .map((request) => request.pos);
};

const getResolveLinkPrevDisplay = (state: EditorState, pos: number) => {
  const cardState = getPluginState(state);
  if (!cardState) {
    return undefined;
  }

  return cardState.requests.find((request) => request.pos === pos)
    ?.previousAppearance;
};

export function eventsFromTransaction(
  tr: ReadonlyTransaction,
  state: EditorState,
): LifecycleEvent[] {
  const events: LifecycleEvent[] = [];
  try {
    /**
     * Skip transactions sent by collab (identified by 'isRemote' key)
     * Skip entire document replace steps
     * We are only concerned with transactions performed on the document directly by the user
     */
    const isRemote: unknown = tr.getMeta('isRemote');
    const isReplaceDocument: unknown = tr.getMeta('replaceDocument');
    if (isRemote || isReplaceDocument) {
      return events;
    }

    const historyMeta: unknown = tr.getMeta(pmHistoryPluginKey);
    const isUndo = isHistoryMeta(historyMeta) && historyMeta.redo === false;
    const isRedo = isHistoryMeta(historyMeta) && historyMeta.redo === true;

    /**
     * Retrieve metadata from the LinkMetaStep(s) in the transaction
     */
    const { action, inputMethod, sourceEvent } =
      getLinkMetadataFromTransaction(tr);

    const contextualData = {
      action,
      inputMethod,
      sourceEvent,
      isUndo,
      isRedo,
    } as const;

    const { removed, inserted, updated } = findChangedLinks(tr, state);

    const MAX_LINK_EVENTS = 10;
    if (
      [removed, inserted, updated].some((arr) => arr.length > MAX_LINK_EVENTS)
    ) {
      return [];
    }

    for (let i = 0; i < updated.length; i++) {
      const update = updated[i];
      const { inserted: link } = update;

      const url = getLinkUrl(link);
      const display = appearanceForLink(link);
      const previousDisplay =
        'removed' in update
          ? appearanceForLink(update.removed)
          : update.previous.display ?? 'unknown';

      if (url) {
        events.push({
          type: 'updated',
          data: {
            ...contextualData,
            url,
            display,
            previousDisplay,
          },
        });
      }
    }

    const pushEvents = (links: Link[], type: 'deleted' | 'created') => {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const url = getLinkUrl(link);
        const display = appearanceForLink(link);

        if (url) {
          events.push({
            type,
            data: {
              ...contextualData,
              url,
              display,
            },
          });
        }
      }
    };

    pushEvents(removed, 'deleted');
    pushEvents(inserted, 'created');

    return events;
  } catch (err: unknown) {
    return events;
  }
}