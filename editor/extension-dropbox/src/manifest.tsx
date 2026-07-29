import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';

import type { ExtensionManifest } from '@atlaskit/editor-common/extensions';
import { inlineCard } from '@atlaskit/adf-utils/builders';
import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';

import enableDropbox from './enable-dropbox';
import type { DropboxFile } from './types';
import { POPUP_MOUNTPOINT, DROPBOX_IFRAME_NAME } from './constants';

import { fg } from '@atlaskit/platform-feature-flags';
const reactRoots = new WeakMap<Element, Root>();

/** Mounts `element` into `mountPoint`: uses the React 18/19 `createRoot` API when `nike_r19_render_unmount` is on, else the legacy render path. */
const renderToMountPoint = (element: React.ReactElement, mountPoint: Element) => {
	if (fg('nike_r19_render_unmount')) {
		let root = reactRoots.get(mountPoint);

		if (!root) {
			root = createRoot(mountPoint);
			reactRoots.set(mountPoint, root);
		}

		root.render(element);
	} else {
		ReactDOM.render(element, mountPoint);
	}
};

/** Unmounts the tree at `mountPoint`: uses `root.unmount()` when `nike_r19_render_unmount` is on, else the legacy unmount path. */
const unmountFromMountPoint = (mountPoint: Element) => {
	if (fg('nike_r19_render_unmount')) {
		const root = reactRoots.get(mountPoint);

		if (root) {
			root.unmount();
			reactRoots.delete(mountPoint);
		}
	} else {
		ReactDOM.unmountComponentAtNode(mountPoint);
	}
};

declare global {
	interface Window {
		// This is a typed subset of the options available here https://www.dropbox.com/developers/chooser
		// covering only what we are using
		Dropbox: {
			appKey?: string;
			choose: (args: {
				cancel: () => void;
				iframe?: boolean;
				success: (value: DropboxFile[] | PromiseLike<DropboxFile[]>) => void;
				windowName?: string;
			}) => void;
		};
	}
}

async function pickFromDropbox(appKey: string, canMountinIframe: boolean) {
	await enableDropbox(appKey);

	let popupMountPoint;
	let root: Root | null = null;

	// BC - as of 2020-01-21 this does not work, as no dropbox app we have is authorised
	// to iframe in the picker - we are currently waiting for permissions.
	// To test the picker, comment out the render call, and the `iframe` and `winowName` options
	if (canMountinIframe) {
		const Modal = await import('./modal');

		// The decision has been made to simply append our modal to the body
		// Using the passed in popupMountPoint has the potential to cause
		// problems, and several users pass down document.body anyway
		//
		// We want to append it and attach it to a new div so we have complete control.
		popupMountPoint = document.getElementById(POPUP_MOUNTPOINT);
		if (!popupMountPoint) {
			popupMountPoint = document.createElement('div');
			popupMountPoint.id = POPUP_MOUNTPOINT;
			document.body.appendChild(popupMountPoint);
		}
		if (expValEquals('platform_editor_react19_migration', 'isEnabled', true)) {
			root = createRoot(popupMountPoint);
			// eslint-disable-next-line @atlassian/perf-linting/no-unstable-inline-props -- Ignored via go/ees017 (to be fixed)
			root.render(<Modal.default onClose={() => {}} />);
		} else {
			// eslint-disable-next-line @atlassian/perf-linting/no-unstable-inline-props -- Ignored via go/ees017 (to be fixed)
			renderToMountPoint(<Modal.default onClose={() => {}} />, popupMountPoint);
		}
	}

	let files: DropboxFile[];

	try {
		files = await new Promise((resolve, reject) => {
			window.Dropbox.choose({
				iframe: canMountinIframe,
				windowName: canMountinIframe ? DROPBOX_IFRAME_NAME : undefined,
				success: resolve,
				cancel: reject,
			});
		});
		// eslint-disable-next-line no-unused-vars
	} catch (e) {
		if (expValEquals('platform_editor_react19_migration', 'isEnabled', true)) {
			if (root) {
				root.unmount();
			}
		} else if (popupMountPoint) {
			unmountFromMountPoint(popupMountPoint);
		}
		return;
	}
	let node;

	if (!files.length) {
		if (expValEquals('platform_editor_react19_migration', 'isEnabled', true)) {
			if (root) {
				root.unmount();
			}
		} else if (popupMountPoint) {
			unmountFromMountPoint(popupMountPoint);
		}
		return;
	}

	const newNodes = files.map((file) => inlineCard({ url: file.link }));

	if (newNodes.length === 1) {
		node = newNodes[0];
	} else {
		// NOTE: we are not currently passing in `multiselect`, so this is not a possible state,
		// but we likely want to allow multiselect in the future so doing some future-proofing
		node = {
			type: 'paragraph',
			content: newNodes,
		};
	}

	if (expValEquals('platform_editor_react19_migration', 'isEnabled', true)) {
		if (root) {
			root.unmount();
		}
	} else if (popupMountPoint) {
		unmountFromMountPoint(popupMountPoint);
	}
	return node;
}

const manifestFunction = ({
	appKey,
	canMountinIframe,
}: {
	appKey: string;
	canMountinIframe: boolean;
}): ExtensionManifest => ({
	title: 'Dropbox',
	type: 'com.dropbox.fabric',
	key: 'dropbox',
	description: 'Embed Dropbox file to collaborate with your team',
	icons: {
		'16': () =>
			import(
				/* webpackChunkName: "@atlaskit-internal_editor-dropbox" */ './icons/DropboxIcon'
			).then((mod) => mod.default),
		'24': () =>
			import(
				/* webpackChunkName: "@atlaskit-internal_editor-dropbox" */ './icons/DropboxIcon'
			).then((mod) => mod.default),
		'48': () =>
			import(
				/* webpackChunkName: "@atlaskit-internal_editor-dropbox" */ './icons/DropboxIcon'
			).then((mod) => mod.default),
	},
	modules: {
		quickInsert: [
			{
				key: 'item',
				action: () =>
					// eslint-disable-next-line no-async-promise-executor
					new Promise(async (resolve, reject) => {
						try {
							const newNode = await pickFromDropbox(appKey, canMountinIframe);
							if (!newNode) {
								reject();
							} else {
								resolve(newNode);
							}
						} catch (e) {
							reject(e);
						}
					}),
			},
		],
	},
});

export default manifestFunction;
