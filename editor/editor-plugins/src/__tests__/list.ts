// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('list wrapper', () => {
	it('check ./list exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-list');
		const wrapper = require('../list/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./list/list-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-list/list-plugin');
		const wrapper = require('../list/entry-points/list-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./list/list-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-list/list-plugin-type');
		const wrapper = require('../list/entry-points/list-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./list/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-list/types');
		const wrapper = require('../list/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
