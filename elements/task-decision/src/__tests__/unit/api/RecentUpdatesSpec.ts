import { RecentUpdates, ACTION_DECISION_FPS_EVENTS } from '../../../api/TaskDecisionResource';
import {
	type ObjectKey,
	type ServiceTask,
	type TaskState,
	type PubSubClient,
} from '../../../types';

const serviceTask = (key: ObjectKey, state?: TaskState, creationDate?: Date): ServiceTask => ({
	...key,
	creationDate: creationDate ? creationDate.toISOString() : new Date().toISOString(),
	lastUpdateDate: creationDate ? creationDate.toISOString() : new Date().toISOString(),
	parentLocalId: '123',
	participants: [],
	position: 1,
	state: state || 'TODO',
	type: 'TASK',
});

const objectKey = {
	localId: 'task-1',
	objectAri: 'objectAri',
};

describe('RecentUpdates', () => {
	let mockPubSubClient: PubSubClient;

	beforeEach(() => {
		mockPubSubClient = {
			on: jest.fn(),
			off: jest.fn(),
			join: jest.fn(),
			leave: jest.fn(),
		};
	});

	it('should not subscribe to any PubSub event if PubSubClient not provided', () => {
		// eslint-disable-next-line no-unused-expressions
		new RecentUpdates();
		expect(mockPubSubClient.on).not.toHaveBeenCalled();
	});

	it('should subscribe to all action&decision PubSub event if PubSubClient is provided', () => {
		// eslint-disable-next-line no-unused-expressions
		new RecentUpdates(mockPubSubClient);
		expect(mockPubSubClient.on).toHaveBeenCalledWith(
			ACTION_DECISION_FPS_EVENTS,
			expect.any(Function),
		);
	});

	describe('#destroy', () => {
		it('should unsubscribe to all action&decision PubSub event if PubSubClient is provided', () => {
			const recentUpdates = new RecentUpdates(mockPubSubClient);
			recentUpdates.destroy();
			expect(mockPubSubClient.off).toHaveBeenCalledWith(
				ACTION_DECISION_FPS_EVENTS,
				expect.any(Function),
			);
		});
	});

	describe('#onPubSubEvent', () => {
		it('should notify of recent updates', () => {
			const recentUpdates = new RecentUpdates(mockPubSubClient);
			const mockRecentUpdatesListener = jest.fn();
			recentUpdates.subscribe('objectAri', {
				id: jest.fn(),
				recentUpdates: mockRecentUpdatesListener,
			});

			recentUpdates.onPubSubEvent(ACTION_DECISION_FPS_EVENTS, serviceTask(objectKey));

			expect(mockRecentUpdatesListener).toHaveBeenCalledWith({
				objectAri: 'objectAri',
			});
		});
	});
});
