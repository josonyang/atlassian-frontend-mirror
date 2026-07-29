// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('quick-insert wrapper', () => {
	it('check ./quick-insert exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-quick-insert');
		const wrapper = require('../quick-insert/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./quick-insert/quick-insert-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-quick-insert/quick-insert-plugin');
		const wrapper = require('../quick-insert/entry-points/quick-insert-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./quick-insert/quick-insert-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-quick-insert/quick-insert-plugin-type');
		const wrapper = require('../quick-insert/entry-points/quick-insert-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
