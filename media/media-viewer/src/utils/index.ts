import { type Identifier, isFileIdentifier, type MediaType } from '@atlaskit/media-client';
import { getMediaTypeFromMimeType } from '@atlaskit/media-common';

import { getType } from 'mime';

export const isSameIdentifier = (id1: Identifier, id2: Identifier) => {
	if (isFileIdentifier(id1) && isFileIdentifier(id2)) {
		return id1.id === id2.id;
	}
	if (!isFileIdentifier(id1) && !isFileIdentifier(id2)) {
		return id1.dataURI === id2.dataURI;
	}
	return false;
};

// TODO MS-1752 - current implementation makes viewer navigation to misbehave
// if passed a file with the same id (with different occurrenceKeys) or with the same dataURI twice
export const getSelectedIndex = (items: Identifier[], selectedItem: Identifier) => {
	return items.findIndex((item) => isSameIdentifier(item, selectedItem));
};

export const getMediaTypeFromFilename = (filename: string): MediaType => {
	const mimeType = getMimeTypeFromFilename(filename);
	return getMediaTypeFromMimeType(mimeType);
};

export const getMimeTypeFromFilename = (filename: string): string => {
	const extension = filename.split('.').pop();
	if (!extension) {
		return '';
	}

	const mimeType = getType(extension);
	if (!mimeType) {
		return '';
	}

	return mimeType;
};

export const getFolderParent = (path: string): string => {
	const pathParts = path.substring(0, path.length - 1).split('/');
	pathParts.pop();
	const parent = pathParts.at(-1);

	if (!parent) {
		return ''; // root
	}

	return pathParts.join('/') + '/';
};

export const extractArchiveFolderName = (folderName: string): string => {
	const index = folderName.lastIndexOf('.');
	return index > -1 ? folderName.substring(0, index) + '/' : folderName + '/';
};

export const getFormattedFolderName = (folderName: string): string => {
	// We assume name ends with '/' unless it is the root directory
	if (folderName === '') {
		return '';
	}

	const name = folderName.substring(0, folderName.length - 1);
	const index = name.lastIndexOf('/');
	if (index === -1) {
		return name;
	}
	return name.substring(index + 1);
};

export const isMacPrivateFile = (fileName: string): boolean => {
	return fileName.startsWith('__MACOSX') || fileName.includes('.DS_Store');
};

export const rejectAfter = <T>(fn: () => Promise<T>, delay = 5000): Promise<T> => {
	return new Promise<T>(async (resolve, reject) => {
		const timeoutId = setTimeout(() => reject(new Error('timed out')), delay);

		try {
			resolve(await fn());
		} catch (error) {
			reject(error);
		} finally {
			clearTimeout(timeoutId);
		}
	});
};
