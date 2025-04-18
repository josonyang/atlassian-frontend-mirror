import { snapshot } from '@af/visual-regression';

import {
	BlockExtensionWithSmartLink,
	BodiedExtensionWithSmartLink,
	EmptyBodiedExtension,
	InlineExtensionWithSmartLink,
} from './1P-bodied-extension-edit-button-enabled.fixtures';

snapshot(BlockExtensionWithSmartLink);
snapshot(BodiedExtensionWithSmartLink);
snapshot(EmptyBodiedExtension);
snapshot(InlineExtensionWithSmartLink);
