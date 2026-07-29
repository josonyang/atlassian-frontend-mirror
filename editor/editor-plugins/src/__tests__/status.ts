// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('status wrapper', () => {
	it('check ./status exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-status');
		const wrapper = require('../status/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./status/actions exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-status/actions');
		const wrapper = require('../status/entry-points/actions');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./status/status-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-status/status-plugin-type');
		const wrapper = require('../status/entry-points/status-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./status/status-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-status/status-plugin');
		const wrapper = require('../status/entry-points/status-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./status/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-status/types');
		const wrapper = require('../status/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
