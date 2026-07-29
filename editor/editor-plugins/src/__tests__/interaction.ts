// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('interaction wrapper', () => {
	it('check ./interaction exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-interaction');
		const wrapper = require('../interaction/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./interaction/interaction-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-interaction/interaction-plugin');
		const wrapper = require('../interaction/entry-points/interaction-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./interaction/interaction-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-interaction/interaction-plugin-type');
		const wrapper = require('../interaction/entry-points/interaction-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./interaction/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-interaction/types');
		const wrapper = require('../interaction/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
