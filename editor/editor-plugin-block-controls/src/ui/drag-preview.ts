import { browser } from '@atlaskit/editor-common/browser';
import { fg } from '@atlaskit/platform-feature-flags';
import { B200, N20, N30 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

const previewStyleNew = {
	borderColor: token('color.border', N30),
	borderStyle: 'solid',
	borderRadius: token('border.radius.100', '3px'),
	borderWidth: token('border.width.outline', '2px'),
	backgroundColor: token('color.skeleton.subtle', N20),
};

const previewStyleOld = {
	borderColor: token('color.border.focused', B200),
	borderStyle: 'solid',
	borderRadius: token('border.radius.100', '3px'),
	borderWidth: token('border.width.outline', '2px'),
	backgroundColor: token('color.blanket.selected', '#388BFF14'),
};

export const dragPreview = (container: HTMLElement, dom: HTMLElement, nodeType: string) => {
	let nodeContainer = dom;
	container.style.pointerEvents = 'none';
	const parent = document.createElement('div');
	// ProseMirror class is required to make sure the cloned dom is styled correctly
	parent.classList.add('ProseMirror', 'block-ctrl-drag-preview');

	const embedCard: HTMLElement | null = dom.querySelector('.embedCardView-content-wrap');
	let shouldBeGenericPreview = nodeType === 'embedCard' || nodeType === 'extension' || !!embedCard;

	if (fg('platform_editor_elements_drag_and_drop_ed_23189')) {
		const iframeContainer = dom.querySelector('iframe');
		if (nodeType === 'embedCard') {
			nodeContainer = dom.querySelector('.rich-media-item') || dom;
		} else if (nodeType === 'extension' && iframeContainer) {
			nodeContainer = iframeContainer;
		}
		shouldBeGenericPreview =
			nodeType === 'embedCard' || !!embedCard || (nodeType === 'extension' && !!iframeContainer);
	}

	const nodeContainerRect = nodeContainer.getBoundingClientRect();
	container.style.width = `${nodeContainerRect.width}px`;
	container.style.height = `${nodeContainerRect.height}px`;

	const previewStyle = fg('platform_editor_elements_drag_and_drop_ed_23189')
		? previewStyleNew
		: previewStyleOld;

	if (shouldBeGenericPreview) {
		parent.style.border = `${previewStyle.borderWidth} ${previewStyle.borderStyle} ${previewStyle.borderColor}`;
		parent.style.borderRadius = previewStyle.borderRadius;
		parent.style.backgroundColor = previewStyle.backgroundColor;
		parent.style.height = '100%';
		parent.setAttribute('data-testid', 'block-ctrl-generic-drag-preview');
	} else {
		const resizer: HTMLElement | null = dom.querySelector('.resizer-item');
		const clonedDom =
			resizer && ['mediaSingle', 'table'].includes(nodeType)
				? // Ignored via go/ees005
					// eslint-disable-next-line @atlaskit/editor/no-as-casting
					(resizer.cloneNode(true) as HTMLElement)
				: // Ignored via go/ees005
					// eslint-disable-next-line @atlaskit/editor/no-as-casting
					(dom.cloneNode(true) as HTMLElement);

		// Remove any margin from the cloned element to ensure is doesn't position incorrectly
		clonedDom.style.marginLeft = '0';
		clonedDom.style.marginTop = '0';
		clonedDom.style.marginRight = '0';
		clonedDom.style.marginBottom = '0';
		clonedDom.style.boxShadow = 'none';
		clonedDom.style.opacity = browser.windows
			? '1'
			: fg('platform_editor_elements_drag_and_drop_ed_23189')
				? '0.31'
				: '0.4';

		parent.appendChild(clonedDom);
	}
	container.appendChild(parent);

	const scrollParent = document.querySelector('.fabric-editor-popup-scroll-parent');
	const scrollParentClassNames = scrollParent?.className;

	// Add the scroll parent class to the container to ensure the cloned element is styled correctly
	container.className = scrollParentClassNames || '';
	container.classList.remove('fabric-editor-popup-scroll-parent');
	// Prevents a scrollbar from showing
	container.style.overflow = 'visible';

	return () => container;
};
