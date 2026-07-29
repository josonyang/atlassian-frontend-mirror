// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('indentation wrapper', () => {
	it('check ./indentation exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-indentation');
		const wrapper = require('../indentation/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./indentation/indentationPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-indentation/indentationPlugin');
		const wrapper = require('../indentation/entry-points/indentationPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./indentation/indentationPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-indentation/indentationPluginType');
		const wrapper = require('../indentation/entry-points/indentationPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./indentation/utils exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-indentation/utils');
		const wrapper = require('../indentation/entry-points/utils');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
