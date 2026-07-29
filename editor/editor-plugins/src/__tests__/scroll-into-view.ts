// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('scroll-into-view wrapper', () => {
	it('check ./scroll-into-view exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-scroll-into-view');
		const wrapper = require('../scroll-into-view/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./scroll-into-view/scroll-into-view-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-scroll-into-view/scroll-into-view-plugin');
		const wrapper = require('../scroll-into-view/entry-points/scroll-into-view-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./scroll-into-view/scroll-into-view-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-scroll-into-view/scroll-into-view-plugin-type');
		const wrapper = require('../scroll-into-view/entry-points/scroll-into-view-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
