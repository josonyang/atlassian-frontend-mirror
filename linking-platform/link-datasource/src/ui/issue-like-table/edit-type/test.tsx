import type { DatasourceType } from '@atlaskit/linking-types';

import type { DatasourceTypeWithOnlyValues } from '../types';

import { editType, isEditTypeSupported } from './index';

describe('editType', () => {
	describe('string type', () => {
		it('returns inline edit props for string component', () => {
			const props = editType({ type: 'string', values: ['value'] });
			expect(props).toEqual({ defaultValue: 'value', editView: expect.any(Function) });
		});

		it('returns empty string value for string component', () => {
			const props = editType({ type: 'string', values: [] });
			expect(props).toEqual({ defaultValue: '', editView: expect.any(Function) });
		});

		it('returns first string value for string component', () => {
			const props = editType({ type: 'string', values: ['value1', 'value2', 'value3'] });
			expect(props).toEqual({ defaultValue: 'value1', editView: expect.any(Function) });
		});
	});

	it.each<[DatasourceType['type'], DatasourceType['value'][]]>([
		['boolean', [true]],
		['date', ['2023-03-16T14:04:02.200+0000']],
		['datetime', ['2023-03-16T14:04:02.200+0000']],
		['icon', [{ source: 'url' }]],
		['link', [{ url: 'url' }]],
		['number', [123]],
		['richtext', [{ text: '<p></p>>' }]],
		['status', [{ text: 'DONE' }]],
		['tag', [{ text: 'ON' }]],
		['time', ['2023-03-16T14:04:02.200+0000']],
		['user', [{ displayName: 'Chad', url: 'url' }]],
	])('returns empty inline edit props for %s component', (type, values) => {
		const props = editType({ type, values } as DatasourceTypeWithOnlyValues);
		expect(props).toEqual({ defaultValue: '', editView: expect.any(Function) });
	});

	it('returns empty inline edit props by default', () => {
		// @ts-ignore DatasourceType
		const props = editType({ type: 'unknown', values: ['value'] });
		expect(props).toEqual({ defaultValue: '', editView: expect.any(Function) });
	});
});

describe('isEditTypeSupported', () => {
	it.each<[DatasourceType['type'], boolean]>([
		['boolean', false],
		['date', false],
		['datetime', false],
		['icon', false],
		['link', false],
		['number', false],
		['richtext', false],
		['status', false],
		['string', true],
		['tag', false],
		['time', false],
		['user', false],
	])(
		'returns empty inline edit props for %s component',
		(type: DatasourceType['type'], expected: boolean) => {
			const isSupported = isEditTypeSupported(type);
			expect(isSupported).toBe(expected);
		},
	);
});
