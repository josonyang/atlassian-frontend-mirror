import { nativeEmbedAlignmentStyles } from '../native-embed-styles';

describe('nativeEmbedAlignmentStyles', () => {
	it('contains resized embeds in both old and new panel structures when containment is enabled', () => {
		const styles = nativeEmbedAlignmentStyles.styles;

		expect(styles).toContain(
			'.ProseMirror .ak-editor-panel .extension-container:has([data-native-embed-panel-resize-containment="true"])',
		);
		expect(styles).toContain(
			'.ProseMirror .ak-editor-panel__content .extension-container:has([data-native-embed-panel-resize-containment="true"])',
		);
		expect(styles).toContain(
			'.fabric-editor--full-width-mode:not(:has(#chromeless-editor)) .ak-editor-panel .extension-container.block:has([data-native-embed-panel-resize-containment="true"])',
		);
		expect(styles).toContain(
			'.fabric-editor--full-width-mode:not(:has(#chromeless-editor)) .ak-editor-panel__content .extension-container.block:has([data-native-embed-panel-resize-containment="true"])',
		);
		expect(styles).toContain('width:auto !important');
		expect(styles).toContain('max-width:var(--native-embed-width) !important');
	});
});
