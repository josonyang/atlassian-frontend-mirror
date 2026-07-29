# Synced Block Provider — Developer Agent Guide

> **Package**: `@atlaskit/editor-synced-block-provider`
>
> **For workflow guidance, debugging, and cross-package task guides, load the `synced-blocks`
> skill:**
> `get_skill(skill_name_or_path="platform/packages/editor/.agents/skills/synced-blocks/SKILL.md")`

---

## Quick Context

This package manages the lifecycle and state of synced blocks for both source and reference nodes.
It provides the data fetching, caching, subscription, and persistence layer used by the editor
plugin and the renderer across Confluence and Jira.

---

## Source Structure

```
src/
├── index.ts                          # Barrel export
├── store-manager/
│   ├── syncBlockStoreManager.ts          # Facade: delegates to source + reference managers
│   ├── sourceSyncBlockStoreManager.ts    # Source lifecycle: updateSyncBlockData, flush,
│   │                                       hasUnsavedChanges(), hasPendingCreations(),
│   │                                       commitPendingCreation(), discardUnpublishedBlocks(),
│   │                                       deleteSyncBlocksWithConfirmation()
│   ├── referenceSyncBlockStoreManager.ts # Reference lifecycle: fetch, cache, subscriptions, flush
│   ├── syncBlockBatchFetcher.ts          # Debounced/deduped batch fetch of reference data
│   ├── syncBlockInMemorySessionCache.ts  # Session cache (survives view↔edit within a session)
│   ├── syncBlockSubscriptionManager.ts   # Real-time subscription registry (AGG/Relay)
│   └── syncBlockProviderFactoryManager.ts # Builds/wires the provider instances
├── clients/
│   ├── block-service/
│   │   ├── blockService.ts           # Block service API client (fetch, batch, CRUD)
│   │   └── ari.ts                    # Block ARI generation/parsing
│   ├── confluence/
│   │   ├── ari.ts                    # Confluence page ARI generation/parsing
│   │   └── fetchMediaToken.ts        # Media token fetching via GraphQL (MediaUploadTokenQuery)
│   └── jira/
│       └── ari.ts                    # Jira work item ARI generation/parsing
├── providers/
│   └── block-service/
│       └── blockServiceAPI.ts        # Provider factory and API helpers
├── hooks/
│   ├── useFetchSyncBlockData.ts      # React hook: fetch + subscribe to a block instance
│   ├── useFetchSyncBlockTitle.ts     # React hook: fetch source title/url metadata
│   └── useHandleContentChanges.ts    # Wires editor content changes into source manager
├── common/
│   ├── consts.ts                     # Shared constants (e.g. SYNC_BLOCK_PRODUCTS)
│   ├── rebase-transaction.ts         # Shared transaction rebase helpers
│   └── types.ts                      # Cross-module types
├── utils/
│   ├── errorHandling.ts              # Error normalisation
│   ├── experienceTracking.ts         # Experience analytics dispatch
│   ├── resolveSyncBlockInstance.ts   # ADF/instance resolution
│   ├── resourceId.ts                 # Resource ID parsing/validation
│   ├── retry.ts                      # Backoff/retry helpers
│   ├── utils.ts                      # Misc helpers
│   └── validValue.ts                 # Value validation
└── types/                            # Public types re-exported from index
```

---

## Key Exports and Types

### Store Manager Hierarchy

```
SyncBlockStoreManager (facade — delegates to source + reference managers)
├── sourceManager: SourceSyncBlockStoreManager
│   ├── updateSyncBlockData(node) → marks isDirty + hasReceivedContentChange, caches content
│   ├── flush() → persist all dirty source changes to Block Service
│   ├── hasUnsavedChanges() → hasReceivedContentChange && any block isDirty
│   ├── hasPendingCreations() / isPendingCreation(id) → O(1) pending-creation checks (EDITOR-6930)
│   ├── commitPendingCreation(...) → reconcile a pending source after it persists
│   ├── createBodiedSyncBlockNode(...) / generateBodiedSyncBlockAttrs() → build a new source node
│   ├── discardUnpublishedBlocks() → drop never-published sources (EDITOR-6473)
│   ├── deleteSyncBlocksWithConfirmation() → confirmed source deletion (+ retryDeletion())
│   ├── registerConfirmationCallback() / setFireAnalyticsEvent() → product-supplied hooks
│   └── (no create()/delete(): sources are created lazily then flushed — see the skill)
└── referenceManager: ReferenceSyncBlockStoreManager
    ├── fetchSyncBlocksData(nodes) → batch fetch with deduplication
    ├── subscribeToSyncBlock(resourceId, callback) → AGG WebSocket / Relay
    ├── fetchSyncBlockSourceInfo(resourceId) → title, URL metadata
    ├── flush() → flush reference-side pending work
    └── destroy() → cleanup subscriptions and batchers
```

### ARI Utilities

| Function                                                     | Purpose                   |
| ------------------------------------------------------------ | ------------------------- |
| `generateBlockAri({cloudId, parentId, product, resourceId})` | Generate source block ARI |
| `generateBlockAriFromReference({cloudId, resourceId})`       | Generate reference ARI    |
| `getConfluencePageAri({pageId, cloudId, pageType})`          | Confluence page ARI       |
| `getJiraWorkItemAri({cloudId, workItemId})`                  | Jira issue ARI            |

### Block Service API

The client in `clients/block-service/blockService.ts` communicates via GraphQL at
`/gateway/api/graphql`: Fetch, Create, Update, Delete, Source Info, References Info. The GraphQL
mutations are **not** debounced at the client — write batching is driven by the product layer
calling `flush()` (Confluence draft-sync/publish, Jira save). Reference reads are batched/deduped
via `syncBlockBatchFetcher.ts`. Grep for the current timing constants rather than assuming a value.

### Media Token Fetching

`fetchMediaToken(contentId)` → GraphQL `MediaUploadTokenQuery` → returns
`{token, config: {clientId, fileStoreUrl}, collectionId}`

---

## Related Packages

- **Plugin**: `platform/packages/editor/editor-plugin-synced-block/`
- **Renderer**: `platform/packages/editor/editor-synced-block-renderer/`
- **Confluence**: `confluence/next/packages/fabric-providers/src/SyncedBlockProvider.ts`
- **Jira**: `jira/src/packages/issue/issue-view-synced-block-provider/`
