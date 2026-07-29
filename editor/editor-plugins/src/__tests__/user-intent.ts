// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('user-intent wrapper', () => {
	it('check ./user-intent exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-user-intent');
		const wrapper = require('../user-intent/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./user-intent/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-user-intent/types');
		const wrapper = require('../user-intent/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./user-intent/user-intent-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-user-intent/user-intent-plugin');
		const wrapper = require('../user-intent/entry-points/user-intent-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./user-intent/user-intent-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-user-intent/user-intent-plugin-type');
		const wrapper = require('../user-intent/entry-points/user-intent-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
