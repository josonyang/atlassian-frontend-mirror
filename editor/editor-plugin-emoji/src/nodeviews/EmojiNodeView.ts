import type { IntlShape } from 'react-intl-next';

import { isSSR } from '@atlaskit/editor-common/core-utils';
import {
	messages,
	EmojiSharedCssClassName,
	defaultEmojiHeight,
} from '@atlaskit/editor-common/emoji';
import { logException } from '@atlaskit/editor-common/monitoring';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { DOMSerializer } from '@atlaskit/editor-prosemirror/model';
import type { NodeView } from '@atlaskit/editor-prosemirror/view';
import type {
	EmojiDescription,
	ImageRepresentation,
	MediaApiRepresentation,
	SpriteRepresentation,
	EmojiProvider,
	EmojiRepresentation,
} from '@atlaskit/emoji/types';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import type { EmojiPlugin } from '../emojiPluginType';

import { emojiToDom } from './emojiNodeSpec';

interface Params {
	intl: IntlShape;
	api: ExtractInjectionAPI<EmojiPlugin> | undefined;
}

/**
 * Check if we can nicely fallback to the nodes text
 *
 * @param fallbackText string of the nodes fallback text
 *
 * @example
 * isSingleEmoji('😀') // true
 */
export function isSingleEmoji(fallbackText: string): boolean {
	// Regular expression to match a single emoji character
	const emojiRegex =
		/^(\p{Emoji_Presentation}|\p{Extended_Pictographic}\u{FE0F}?(?:\u{200D}\p{Extended_Pictographic}\u{FE0F}?)+|\p{Regional_Indicator}\p{Regional_Indicator})$/u;
	return emojiRegex.test(fallbackText);
}

/**
 * Emoji node view for renderering emoji nodes
 */
export class EmojiNodeView implements NodeView {
	dom: Node;
	domElement: HTMLElement | undefined;
	private readonly node: PMNode;
	private readonly intl: IntlShape;
	private renderingFallback: boolean = false;

	readonly destroy = () => {};

	private static logError(error: Error) {
		void logException(error, {
			location: 'editor-plugin-emoji/EmojiNodeView',
		});
	}

	/**
	 * Prosemirror node view for rendering emoji nodes. This class is responsible for
	 * rendering emoji nodes in the editor, handling updates, and managing fallback rendering.
	 *
	 * @param node - The ProseMirror node representing the emoji.
	 * @param extraProps - An object containing additional parameters.
	 * @param extraProps.intl - The internationalization object for formatting messages.
	 * @param extraProps.api - The editor API for accessing shared state and connectivity features.
	 *
	 * @example
	 * const emojiNodeView = new EmojiNodeView(node, { intl, api });
	 */
	constructor(node: PMNode, { intl, api }: Params) {
		this.node = node;
		this.intl = intl;
		const { dom } = DOMSerializer.renderSpec(document, emojiToDom(this.node));
		this.dom = dom;
		this.domElement = dom instanceof HTMLElement ? dom : undefined;

		if (isSSR()) {
			// The provider doesn't work in SSR, and we don't want to render fallback in SSR,
			// that's why we don't need to continue node rendering.
			// In SSR we want to show a placeholder, that `emojiToDom()` returns.
			return;
		}

		// We use the `emojiProvider` from the shared state
		// because it supports the `emojiProvider` prop in the `ComposableEditor` options
		// as well as the `emojiProvider` in the `EmojiPlugin` options.
		const sharedState = api?.emoji?.sharedState;
		if (!sharedState) {
			return;
		}

		let emojiProvider: EmojiProvider | undefined = sharedState.currentState()?.emojiProvider;
		if (emojiProvider) {
			void this.updateDom(emojiProvider);
		}

		const unsubscribe = sharedState.onChange(({ nextSharedState }) => {
			if (emojiProvider === nextSharedState?.emojiProvider) {
				// Do not update if the provider is the same
				return;
			}

			emojiProvider = nextSharedState?.emojiProvider;
			void this.updateDom(emojiProvider);
		});

		// Refresh emojis if we go back online
		const subscribeToConnection = api?.connectivity?.sharedState.onChange(
			({ prevSharedState, nextSharedState }) => {
				if (
					prevSharedState?.mode === 'offline' &&
					nextSharedState?.mode === 'online' &&
					this.renderingFallback &&
					editorExperiment('platform_editor_offline_editing_web', true)
				) {
					this.updateDom(sharedState.currentState()?.emojiProvider);
				}
			},
		);

		this.destroy = () => {
			unsubscribe();
			subscribeToConnection?.();
		};
	}

	private async updateDom(emojiProvider: EmojiProvider | undefined) {
		try {
			const { shortName, id, text: fallback } = this.node.attrs;

			const emojiDescription = await emojiProvider?.fetchByEmojiId(
				{
					id,
					shortName,
					fallback,
				},
				true,
			);
			if (!emojiDescription) {
				EmojiNodeView.logError(new Error('Emoji description is not loaded'));
				this.renderFallback();
				return;
			}

			const emojiRepresentation = emojiDescription?.representation;
			if (!EmojiNodeView.isEmojiRepresentationSupported(emojiRepresentation)) {
				EmojiNodeView.logError(new Error('Emoji representation is not supported'));

				this.renderFallback();

				return;
			}

			this.renderEmoji(emojiDescription, emojiRepresentation);
		} catch (error) {
			EmojiNodeView.logError(
				error instanceof Error ? error : new Error('Unknown error on EmojiNodeView updateDom'),
			);

			this.renderFallback();
		}
	}

	private static isEmojiRepresentationSupported(
		representation: EmojiRepresentation,
	): representation is Exclude<EmojiRepresentation, undefined> {
		return (
			!!representation &&
			('sprite' in representation || 'imagePath' in representation || 'mediaPath' in representation)
		);
	}

	// Pay attention, this method should be called only when the emoji provider returns
	// emoji data to prevent rendering empty emoji during loading.
	private cleanUpAndRenderCommonAttributes() {
		// Clean up the DOM before rendering the new emoji
		if (this.domElement) {
			this.domElement.innerHTML = '';
			this.domElement.style.cssText = '';
			this.domElement.classList.remove(EmojiSharedCssClassName.EMOJI_PLACEHOLDER);
			this.domElement.removeAttribute('aria-label'); // The label is set in the renderEmoji method
			this.domElement.removeAttribute('aria-busy');
		}
	}

	private renderFallback() {
		this.renderingFallback = true;
		this.cleanUpAndRenderCommonAttributes();

		const fallbackElement = document.createElement('span');
		fallbackElement.innerText = this.node.attrs.text || this.node.attrs.shortName;
		fallbackElement.setAttribute('data-testid', `fallback-emoji-${this.node.attrs.shortName}`);
		fallbackElement.setAttribute('data-emoji-type', 'fallback');

		this.dom.appendChild(fallbackElement);
	}

	private renderEmoji(
		description: EmojiDescription,
		representation: Exclude<EmojiRepresentation, undefined>,
	) {
		this.renderingFallback = false;
		this.cleanUpAndRenderCommonAttributes();

		const emojiType = 'sprite' in representation ? 'sprite' : 'image';

		// Add wrapper for the emoji
		const containerElement = document.createElement('span');
		containerElement.setAttribute('role', 'img');
		containerElement.classList.add(EmojiSharedCssClassName.EMOJI_CONTAINER);
		containerElement.setAttribute('data-testid', `${emojiType}-emoji-${description.shortName}`);
		containerElement.setAttribute('data-emoji-type', emojiType);
		containerElement.setAttribute(
			'aria-label',
			`${this.intl.formatMessage(messages.emojiNodeLabel)} ${description.shortName}`,
		);

		const emojiElement =
			'sprite' in representation
				? this.createSpriteEmojiElement(representation)
				: this.createImageEmojiElement(description, representation);

		containerElement.appendChild(emojiElement);

		this.dom.appendChild(containerElement);
	}

	private createSpriteEmojiElement(representation: SpriteRepresentation): HTMLSpanElement {
		const spriteElement = document.createElement('span');

		spriteElement.classList.add(EmojiSharedCssClassName.EMOJI_SPRITE);

		const sprite = representation.sprite;

		const xPositionInPercent = (100 / (sprite.column - 1)) * representation.xIndex;
		const yPositionInPercent = (100 / (sprite.row - 1)) * representation.yIndex;

		spriteElement.style.backgroundImage = `url(${sprite.url})`;
		spriteElement.style.backgroundPosition = `${xPositionInPercent}% ${yPositionInPercent}%`;
		spriteElement.style.backgroundSize = `${sprite.column * 100}% ${sprite.row * 100}%`;
		spriteElement.style.width = `${defaultEmojiHeight}px`;
		spriteElement.style.minWidth = `${defaultEmojiHeight}px`;
		spriteElement.style.height = `${defaultEmojiHeight}px`;
		spriteElement.style.minHeight = `${defaultEmojiHeight}px`;

		return spriteElement;
	}

	private createImageEmojiElement(
		emojiDescription: EmojiDescription,
		representation: ImageRepresentation | MediaApiRepresentation,
	): HTMLImageElement {
		const imageElement = document.createElement('img');

		imageElement.classList.add(EmojiSharedCssClassName.EMOJI_IMAGE);

		imageElement.src =
			'imagePath' in representation ? representation.imagePath : representation.mediaPath;
		imageElement.loading = 'lazy';
		imageElement.alt = emojiDescription.name || emojiDescription.shortName;

		if (representation.width && representation.height) {
			imageElement.height = defaultEmojiHeight;
			// Because img.width is round to the nearest integer.
			imageElement.setAttribute(
				'width',
				`${(defaultEmojiHeight / representation.height) * representation.width}`,
			);
		}

		if (editorExperiment('platform_editor_offline_editing_web', true)) {
			// If there's an error (ie. offline) render the ascii fallback if possible, otherwise
			// mark the node to refresh when returning online.
			imageElement.onerror = () => {
				// Create a check that confirms if this.node.attrs.text if an ascii emoji
				if (isSingleEmoji(this.node.attrs.text)) {
					this.renderFallback();
				} else {
					this.renderingFallback = true;
				}
			};
		}

		return imageElement;
	}
}
