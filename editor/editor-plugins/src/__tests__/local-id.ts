// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('local-id wrapper', () => {
	it('check ./local-id exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-local-id');
		const wrapper = require('../local-id/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./local-id/local-id-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-local-id/local-id-plugin');
		const wrapper = require('../local-id/entry-points/local-id-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./local-id/local-id-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-local-id/local-id-plugin-type');
		const wrapper = require('../local-id/entry-points/local-id-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./local-id/utils/generateShortUUID exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-local-id/utils/generateShortUUID');
		const wrapper = require('../local-id/entry-points/generate-short-uuid');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
