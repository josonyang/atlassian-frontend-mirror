// abstract-base-vc-calculator.test.ts
import { VCObserverEntry } from '../types';

import AbstractVCCalculatorBase from './abstract-base-vc-calculator';
import * as calculateTTVCPercentiles from './percentile-calc';
import * as getViewportHeight from './utils/get-viewport-height';
import * as getViewportWidth from './utils/get-viewport-width';

// Create a concrete implementation for testing
class TestVCCalculator extends AbstractVCCalculatorBase {
	protected isEntryIncluded(entry: VCObserverEntry): boolean {
		return true; // For testing purposes
	}

	protected isVCClean(filteredEntries: ReadonlyArray<VCObserverEntry>): boolean {
		return true; // For testing purposes
	}
}

describe('AbstractVCCalculatorBase', () => {
	let calculator: TestVCCalculator;

	beforeEach(() => {
		calculator = new TestVCCalculator('test-revision');
		jest.spyOn(getViewportWidth, 'default').mockReturnValue(1024);
		jest.spyOn(getViewportHeight, 'default').mockReturnValue(768);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should return unclean result when isVCClean returns false', async () => {
		const mockCalculator = new (class extends AbstractVCCalculatorBase {
			protected isEntryIncluded() {
				return true;
			}
			protected isVCClean() {
				return false;
			}
		})('test-revision');

		const result = await mockCalculator.calculate({
			orderedEntries: [],
			startTime: 0,
			stopTime: 1000,
		});

		expect(result).toEqual({
			revision: 'test-revision',
			'metric:vc90': null,
			clean: false,
		});
	});

	it('should calculate metrics when entries are valid', async () => {
		const mockPercentileResult = {
			'90': { t: 100, e: [] },
			'25': { t: 25, e: [] },
			'50': { t: 50, e: [] },
		};

		jest.spyOn(calculateTTVCPercentiles, 'default').mockResolvedValue(mockPercentileResult);

		const mockEntry: VCObserverEntry = {
			time: 0,
			type: 'mutation:element',
			data: {
				elementName: 'div',
				rect: new DOMRect(),
				visible: true,
			},
		};

		const result = await calculator.calculate({
			orderedEntries: [mockEntry],
			startTime: 0,
			stopTime: 1000,
		});

		expect(result).toEqual({
			revision: 'test-revision',
			vcDetails: mockPercentileResult,
			clean: true,
			'metric:vc90': 100,
		});
	});

	it('should filter entries using isEntryIncluded', async () => {
		const mockCalculator = new (class extends AbstractVCCalculatorBase {
			protected isEntryIncluded(entry: VCObserverEntry) {
				return entry.type === 'mutation:element';
			}
			protected isVCClean() {
				return true;
			}
		})('test-revision');

		const entries: VCObserverEntry[] = [
			{
				time: 0,
				type: 'mutation:element',
				data: {
					elementName: 'div',
					rect: new DOMRect(),
					visible: true,
				},
			},
			{
				time: 1,
				type: 'window:event',
				data: {
					eventType: 'scroll',
				},
			},
		];

		await mockCalculator.calculate({ orderedEntries: entries, startTime: 0, stopTime: 1000 });

		expect(calculateTTVCPercentiles.default).toHaveBeenCalledWith(
			expect.objectContaining({
				orderedEntries: [entries[0]],
			}),
		);
	});
});
