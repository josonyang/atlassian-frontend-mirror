// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('selection wrapper', () => {
	it('check ./selection exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection');
		const wrapper = require('../selection/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./selection/selection-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection/selection-plugin');
		const wrapper = require('../selection/entry-points/selection-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./selection/selection-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection/selection-plugin-type');
		const wrapper = require('../selection/entry-points/selection-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./selection/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection/types');
		const wrapper = require('../selection/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
