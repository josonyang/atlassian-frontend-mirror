// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('feedback-dialog wrapper', () => {
	it('check ./feedback-dialog exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-feedback-dialog');
		const wrapper = require('../feedback-dialog/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./feedback-dialog/feedbackDialogPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-feedback-dialog/feedbackDialogPlugin');
		const wrapper = require('../feedback-dialog/entry-points/feedbackDialogPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./feedback-dialog/feedbackDialogPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-feedback-dialog/feedbackDialogPluginType');
		const wrapper = require('../feedback-dialog/entry-points/feedbackDialogPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
