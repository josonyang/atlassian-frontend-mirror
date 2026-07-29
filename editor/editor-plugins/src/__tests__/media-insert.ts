// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('media-insert wrapper', () => {
	it('check ./media-insert exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-media-insert');
		const wrapper = require('../media-insert/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./media-insert/media-insert-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-media-insert/media-insert-plugin');
		const wrapper = require('../media-insert/entry-points/media-insert-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./media-insert/media-insert-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-media-insert/media-insert-plugin-type');
		const wrapper = require('../media-insert/entry-points/media-insert-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
