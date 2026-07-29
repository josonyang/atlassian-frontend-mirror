// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('help-dialog wrapper', () => {
	it('check ./help-dialog exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-help-dialog');
		const wrapper = require('../help-dialog/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./help-dialog/commands exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-help-dialog/commands');
		const wrapper = require('../help-dialog/entry-points/commands');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./help-dialog/helpDialogPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-help-dialog/helpDialogPlugin');
		const wrapper = require('../help-dialog/entry-points/helpDialogPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./help-dialog/helpDialogPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-help-dialog/helpDialogPluginType');
		const wrapper = require('../help-dialog/entry-points/helpDialogPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
