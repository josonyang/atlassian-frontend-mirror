import { type JsonLd } from '@atlaskit/json-ld-types';

import {
	TEST_BASE_DATA,
	TEST_LINK,
	TEST_NAME,
	TEST_OBJECT,
	TEST_URL,
} from '../../__mocks__/jsonld';
import { extractTag } from '../extractTag';

const BASE_DATA = TEST_BASE_DATA as JsonLd.Data.Task;

describe('extractors.lozenge.tag', () => {
	it('returns undefined when tag is not present', () => {
		expect(extractTag(BASE_DATA)).toBe(undefined);
	});

	it('returns lozenge when tag is present - string', () => {
		expect(extractTag({ ...BASE_DATA, tag: TEST_URL })).toEqual({
			text: TEST_URL,
			appearance: 'default',
		});
	});

	it('returns lozenge when tag is present - link', () => {
		expect(extractTag({ ...BASE_DATA, tag: TEST_LINK })).toEqual({
			text: TEST_NAME,
			appearance: 'default',
		});
	});

	it('returns lozenge when tag is present - object', () => {
		expect(extractTag({ ...BASE_DATA, tag: TEST_OBJECT })).toEqual({
			text: TEST_NAME,
			appearance: 'default',
		});
	});

	it('returns lozenge when tag is present - object', () => {
		expect(
			extractTag({
				...BASE_DATA,
				tag: { ...TEST_OBJECT, appearance: 'success' } as any,
			}),
		).toEqual({
			text: TEST_NAME,
			appearance: 'success',
		});
	});

	it('returns lozenge when tag is present - array', () => {
		expect(
			extractTag({
				...BASE_DATA,
				tag: [{ ...TEST_OBJECT, appearance: 'success' } as any, TEST_OBJECT],
			}),
		).toEqual({
			text: TEST_NAME,
			appearance: 'success',
		});
	});
});
