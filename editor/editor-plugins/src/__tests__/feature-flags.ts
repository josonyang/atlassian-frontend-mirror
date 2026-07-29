// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('feature-flags wrapper', () => {
	it('check ./feature-flags exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-feature-flags');
		const wrapper = require('../feature-flags/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./feature-flags/featureFlagsPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-feature-flags/featureFlagsPlugin');
		const wrapper = require('../feature-flags/entry-points/featureFlagsPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./feature-flags/featureFlagsPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-feature-flags/featureFlagsPluginType');
		const wrapper = require('../feature-flags/entry-points/featureFlagsPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
