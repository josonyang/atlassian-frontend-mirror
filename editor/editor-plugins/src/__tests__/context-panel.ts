// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('context-panel wrapper', () => {
	it('check ./context-panel exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-context-panel');
		const wrapper = require('../context-panel/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./context-panel/contextPanelPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-context-panel/contextPanelPlugin');
		const wrapper = require('../context-panel/entry-points/contextPanelPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./context-panel/contextPanelPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-context-panel/contextPanelPluginType');
		const wrapper = require('../context-panel/entry-points/contextPanelPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./context-panel/object-siderbar-types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-context-panel/object-siderbar-types');
		const wrapper = require('../context-panel/entry-points/object-siderbar-types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./context-panel/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-context-panel/types');
		const wrapper = require('../context-panel/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
