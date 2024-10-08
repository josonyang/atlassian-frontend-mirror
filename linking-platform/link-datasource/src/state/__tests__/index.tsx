import { defaultRegistry } from 'react-sweet-state';
import invariant from 'tiny-invariant';

import { actions, Store } from '../index';
const store = defaultRegistry.getStore(Store);

describe('onAddItems', () => {
	beforeEach(() => {
		store.storeState.resetState();
	});

	const storeApi = {
		getState: store.storeState.getState,
		setState: store.storeState.setState,
		dispatch: jest.fn(),
	};

	it('should add items to the state and return the IDs of the recently added items', () => {
		expect(store.storeState.getState()).toEqual({ items: {} });
		const newAris = actions.onAddItems(
			[
				{
					ari: { data: 'ari1' },
				},
				{
					ari: { data: 'ari2' },
				},
				{
					ari: { data: 'ari3' },
				},
				{
					ari: { data: 'ari4' },
				},
			],
			'jira',
			'work-item',
		)(storeApi);

		expect(newAris).toEqual(['ari1', 'ari2', 'ari3', 'ari4']);
		expect(store.storeState.getState()).toEqual({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari1' } },
				},
				ari2: {
					ari: 'ari2',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari2' } },
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari3' } },
				},
				ari4: {
					ari: 'ari4',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari4' } },
				},
			},
		});
	});

	it('should only add items that do not exist in the store, but return all ARIs that were attempted to be added', () => {
		expect(store.storeState.getState()).toEqual({ items: {} });
		store.storeState.setState({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari1' } },
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari3' } },
				},
			},
		});

		const newAris = actions.onAddItems(
			[
				{
					ari: { data: 'ari1' },
				},
				{
					ari: { data: 'ari2' },
				},
				{
					ari: { data: 'ari3' },
				},
				{
					ari: { data: 'ari4' },
				},
			],
			'jira',
			'work-item',
		)(storeApi);

		expect(newAris).toEqual(['ari1', 'ari2', 'ari3', 'ari4']);
		expect(store.storeState.getState()).toEqual({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari1' } },
				},
				ari2: {
					ari: 'ari2',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari2' } },
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari3' } },
				},
				ari4: {
					ari: 'ari4',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari4' } },
				},
			},
		});
	});
	it('should add items to the state and return the ARIs of the input items, even if there were duplicate item ARIs', () => {
		expect(store.storeState.getState()).toEqual({ items: {} });

		const newAris = actions.onAddItems(
			[
				{
					ari: { data: 'ari1' },
				},
				{
					ari: { data: 'ari1' },
				},
				{
					ari: { data: 'ari3' },
				},
				{
					ari: { data: 'ari3' },
				},
			],
			'jira',
			'work-item',
		)(storeApi);

		expect(newAris).toEqual(['ari1', 'ari1', 'ari3', 'ari3']);
		expect(store.storeState.getState()).toEqual({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari1' } },
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari3' } },
				},
			},
		});
	});

	it('should add items to the state and return the IDs of the recently added items, generating UUIDs for items that do not have ARIs', () => {
		expect(store.storeState.getState()).toEqual({ items: {} });

		const newAris = actions.onAddItems(
			[
				{
					ari: { data: 'ari1' },
				},
				{
					field: { data: 'field1' },
				},
				{
					ari: { data: 'ari3' },
				},
				{
					field: { data: 'field2' },
				},
			],
			'jira',
			'work-item',
		)(storeApi);

		expect(newAris).toEqual(['ari1', expect.any(String), 'ari3', expect.any(String)]);
		invariant(newAris[1]);
		invariant(newAris[3]);
		expect(store.storeState.getState()).toEqual({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari1' } },
				},
				[newAris[1]]: {
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { field: { data: 'field1' } },
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari3' } },
				},
				[newAris[3]]: {
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { field: { data: 'field2' } },
				},
			},
		});
	});

	it('should merge attributes into existing items in the store', () => {
		expect(store.storeState.getState()).toEqual({ items: {} });
		store.storeState.setState({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: {
						ari: { data: 'ari1' },
						attr1: { data: 'old_abc1' },
						attr3: { data: 'old_efg1' },
					},
				},
				ari2: {
					ari: 'ari2',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: {
						ari: { data: 'ari2' },
						attr1: { data: 'old_abc2' },
					},
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: {
						ari: { data: 'ari3' },
						attr1: { data: 'old_abc3' },
						attr2: { data: 'old_efg2' },
					},
				},
				ari4: {
					ari: 'ari4',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: {
						ari: { data: 'ari4' },
						attr1: { data: 'old_abc4' },
					},
				},
			},
		});

		const newAris = actions.onAddItems(
			[
				{
					ari: { data: 'ari1' },
					attr1: { data: 'new_abc1' },
					attr2: { data: 'new_zxc1' },
					attr3: { data: 'new_efg1' },
				},
				{
					ari: { data: 'ari2' },
					newField: { data: 'new_field' },
				},
				{
					ari: { data: 'ari3' },
					attr4: { data: 'new_abc3' },
					attr3: { data: 'new_efg1' },
				},
				{
					ari: { data: 'ari4' },
					attr1: { data: 'new_abc4' },
					attr3: { data: 'new_efg5' },
				},
			],
			'jira',
			'work-item',
		)(storeApi);

		expect(newAris).toEqual(['ari1', 'ari2', 'ari3', 'ari4']);

		expect(store.storeState.getState()).toEqual({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: {
						ari: { data: 'ari1' },
						attr1: { data: 'new_abc1' },
						attr2: { data: 'new_zxc1' },
						attr3: { data: 'new_efg1' },
					},
				},
				ari2: {
					ari: 'ari2',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: {
						ari: { data: 'ari2' },
						attr1: { data: 'old_abc2' },
						newField: { data: 'new_field' },
					},
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: {
						ari: { data: 'ari3' },
						attr1: { data: 'old_abc3' },
						attr2: { data: 'old_efg2' },
						attr3: { data: 'new_efg1' },
						attr4: { data: 'new_abc3' },
					},
				},
				ari4: {
					ari: 'ari4',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: {
						ari: { data: 'ari4' },
						attr1: { data: 'new_abc4' },
						attr3: { data: 'new_efg5' },
					},
				},
			},
		});
	});
});

describe('onUpdateItem', () => {
	beforeEach(() => {
		store.storeState.resetState();
	});

	const storeApi = {
		getState: store.storeState.getState,
		setState: store.storeState.setState,
		dispatch: jest.fn(),
	};

	it('should keep the state empty when calling on an empty state', () => {
		expect(store.storeState.getState()).toEqual({ items: {} });
		actions.onUpdateItem('ari-blah', {
			ari: { data: 'ari4' },
		})(storeApi);

		expect(store.storeState.getState()).toEqual({
			items: {},
		});
	});

	it('should keep the state the same when calling onUpdateItem with a non-existent ari key', () => {
		store.storeState.setState({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari1' } },
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari3' } },
				},
			},
		});
		actions.onUpdateItem('ari-4444', {
			ari: { data: 'ari4' },
		})(storeApi);

		expect(store.storeState.getState()).toEqual({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari1' } },
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari3' } },
				},
			},
		});
	});

	it('should update the item with the new response value', () => {
		store.storeState.setState({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari1' } },
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari3' } },
				},
			},
		});
		actions.onUpdateItem('ari1', {
			ari: { data: 'ari1' },
			fieldValue: { data: 'ABCDEF' },
		})(storeApi);

		expect(store.storeState.getState()).toEqual({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari1' }, fieldValue: { data: 'ABCDEF' } },
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari3' } },
				},
			},
		});
	});

	it('should update the item with the new response value, but ari key updates are NOT allowed', () => {
		store.storeState.setState({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari1' } },
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari3' } },
				},
			},
		});
		actions.onUpdateItem('ari1', {
			ari: { data: 'ari123' },
			fieldValue: { data: 'ABCDEF' },
		})(storeApi);

		expect(store.storeState.getState()).toEqual({
			items: {
				ari1: {
					ari: 'ari1',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari1' }, fieldValue: { data: 'ABCDEF' } },
				},
				ari3: {
					ari: 'ari3',
					entityType: 'work-item',
					integrationKey: 'jira',
					data: { ari: { data: 'ari3' } },
				},
			},
		});
	});
});
