import fs from 'fs';
import path from 'path';

import {
	deprecatedCore as deprecatedIconLabCore,
	deprecatedUtility as deprecatedIconLabUtility,
} from '@atlaskit/icon-lab/deprecated-map';
import deprecatedCore from '@atlaskit/icon/deprecated-map';

import type { DeprecatedCategories, DeprecatedConfig } from './types';

export const getConfig = (specifier: DeprecatedCategories): DeprecatedConfig => {
	const configPath = path.resolve(__dirname, '..', '..', '..', 'configs', 'deprecated.json');
	const source = fs.readFileSync(configPath, 'utf8');
	const parsedConfig = JSON.parse(source);

	const combinedConfig = {
		...parsedConfig,
		imports: {
			...parsedConfig.imports,
			...deprecatedCore,
			...deprecatedIconLabCore,
			...deprecatedIconLabUtility,
		},
	};

	return combinedConfig[specifier];
};
