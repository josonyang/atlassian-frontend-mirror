// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('media wrapper', () => {
	it('check ./media exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-media');
		const wrapper = require('../media/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./media/media-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-media/media-plugin');
		const wrapper = require('../media/entry-points/media-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./media/media-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-media/media-plugin-type');
		const wrapper = require('../media/entry-points/media-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./media/nodeviewHelpers exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-media/nodeviewHelpers');
		const wrapper = require('../media/entry-points/nodeview-helpers');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./media/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-media/types');
		const wrapper = require('../media/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
