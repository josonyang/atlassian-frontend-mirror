import { useEffect } from 'react';

import { type Node as PMNode } from '@atlaskit/editor-prosemirror/model';

import type { SyncBlockStoreManager } from '../store-manager/syncBlockStoreManager';

export const useHandleContentChanges = (
	manager: SyncBlockStoreManager,
	syncBlockNode: PMNode,
): void => {
	useEffect(() => {
		//TODO: EDITOR-1921 - add error analytics
		manager.updateSyncBlockData(syncBlockNode);
	}, [manager, syncBlockNode]);
};
