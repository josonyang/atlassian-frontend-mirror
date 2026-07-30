// Usage: cd platform && ../node_modules/.bin/jscodeshift -t packages/editor/editor-common/codemods/117.0.0-upgrade-react-peer-dependencies.ts --extensions json --parser babel packages/editor/*/package.json

import type { API, FileInfo, Options } from 'jscodeshift';

const NEW_PEER_DEP_RANGE = '^18.2.0 || ^19.2.0'; // Ensure backwards compatible while rest of Platform migrates
const NEW_DEV_DEP_RANGE = '^19.2.0'; // Ensure everyone is using React 19 types from now on
const VALID_ORIGINAL_RANGES = [NEW_PEER_DEP_RANGE, NEW_DEV_DEP_RANGE, 'root:*', '^18.2.0'];

const EXCLUDED_PACKAGE_JSON_PATHS = [
	'packages/editor/renderer/package.json',
	'packages/editor/editor-plugin-block-controls-tests/package.json',
	'packages/editor/editor-plugin-block-menu-tests/package.json',
	'packages/editor/editor-plugin-media-tests/package.json',
	'packages/editor/editor-plugin-ai/package.json',
	'packages/editor/editor-common-tests/package.json',
	'packages/editor/editor-plugin-find-replace-tests/package.json',
	'packages/editor/editor-core/package.json',
	'packages/editor/editor-plugin-ai-tests/package.json',
	'packages/editor/editor-plugin-extension-tests/package.json',
	'packages/editor/editor-plugin-synced-block-tests/package.json',
	'packages/editor/generative-ai-modal/package.json',
	'packages/editor/editor-plugin-floating-toolbar-tests/package.json',
	'packages/editor/editor-plugin-show-diff-tests/package.json',
	'packages/editor/editor-plugin-table-tests/package.json',
	'packages/editor/editor-plugin-annotation-tests/package.json',
	'packages/editor/editor-plugin-quick-insert-tests/package.json',
	'packages/editor/editor-plugin-highlight-tests/package.json',
	'packages/editor/editor-referentiality/package.json',
	'packages/editor/editor-plugin-paste-tests/package.json',
	'packages/editor/editor-synced-block-renderer-tests/package.json',
];

type DependencyName = 'react' | 'react-dom' | '@types/react' | '@types/react-dom';

const updateDependency = (
	dependencies: Record<string, string> | undefined,
	dependencyName: DependencyName,
	filePath: string,
	newValue: string,
): void => {
	if (!dependencies?.[dependencyName]) {
		return;
	}

	const dependencyRange = dependencies[dependencyName];
	if (!VALID_ORIGINAL_RANGES.includes(dependencyRange)) {
		// oxlint-disable-next-line no-console -- Codemod intentionally reports unexpected dependency ranges.
		console.warn(
			`WARNING: ${dependencyName} in ${filePath} has unexpected range ${dependencyRange}. Skipping...`,
		);
		return;
	}

	dependencies[dependencyName] = newValue;
};

const transformer = (fileInfo: FileInfo, _api: API, _options: Options): string => {
	const isExcluded = EXCLUDED_PACKAGE_JSON_PATHS.some((excludedPath) =>
		fileInfo.path.endsWith(excludedPath),
	);

	if (
		!fileInfo.path.endsWith('package.json') ||
		fileInfo.path.includes('/node_modules/') ||
		isExcluded
	) {
		return fileInfo.source;
	}

	const packageJson = JSON.parse(fileInfo.source);

	updateDependency(packageJson.peerDependencies, 'react', fileInfo.path, NEW_PEER_DEP_RANGE);
	updateDependency(packageJson.peerDependencies, 'react-dom', fileInfo.path, NEW_PEER_DEP_RANGE);
	updateDependency(packageJson.devDependencies, 'react', fileInfo.path, NEW_DEV_DEP_RANGE);
	updateDependency(packageJson.devDependencies, 'react-dom', fileInfo.path, NEW_DEV_DEP_RANGE);
	updateDependency(packageJson.devDependencies, '@types/react', fileInfo.path, NEW_DEV_DEP_RANGE);
	updateDependency(
		packageJson.devDependencies,
		'@types/react-dom',
		fileInfo.path,
		NEW_DEV_DEP_RANGE,
	);

	return `${JSON.stringify(packageJson, null, '\t')}\n`;
};

export default transformer;
