// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('code-bidi-warning wrapper', () => {
	it('check ./code-bidi-warning exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-code-bidi-warning');
		const wrapper = require('../code-bidi-warning/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./code-bidi-warning/codeBidiWarningPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-code-bidi-warning/codeBidiWarningPlugin');
		const wrapper = require('../code-bidi-warning/entry-points/codeBidiWarningPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./code-bidi-warning/codeBidiWarningPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-code-bidi-warning/codeBidiWarningPluginType');
		const wrapper = require('../code-bidi-warning/entry-points/codeBidiWarningPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
