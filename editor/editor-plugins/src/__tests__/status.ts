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
});
