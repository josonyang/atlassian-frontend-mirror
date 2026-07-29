// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('insert-block wrapper', () => {
	it('check ./insert-block exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-insert-block');
		const wrapper = require('../insert-block/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./insert-block/insert-block-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-insert-block/insert-block-plugin');
		const wrapper = require('../insert-block/entry-points/insert-block-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./insert-block/insert-block-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-insert-block/insert-block-plugin-type');
		const wrapper = require('../insert-block/entry-points/insert-block-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./insert-block/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-insert-block/types');
		const wrapper = require('../insert-block/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
