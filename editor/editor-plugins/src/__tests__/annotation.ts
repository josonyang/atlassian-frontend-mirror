// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('annotation wrapper', () => {
	it('check ./annotation exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-annotation');
		const wrapper = require('../annotation/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./annotation/annotationPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-annotation/annotationPlugin');
		const wrapper = require('../annotation/entry-points/annotationPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./annotation/annotationPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-annotation/annotationPluginType');
		const wrapper = require('../annotation/entry-points/annotationPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./annotation/pm-plugins/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-annotation/pm-plugins/types');
		const wrapper = require('../annotation/entry-points/pm-plugins-types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./annotation/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-annotation/types');
		const wrapper = require('../annotation/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
