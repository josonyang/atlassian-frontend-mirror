import type { GetStatusTransitionsInvokeResponse } from '@atlaskit/linking-types/smart-link-actions';
import type { ThemeAppearance } from '@atlaskit/lozenge';

import { type LozengeItem } from '../../view/FlexibleCard/components/elements/common/base-lozenge-element/lozenge-action/types';

const extractLozengeActionItems = (response: GetStatusTransitionsInvokeResponse): LozengeItem[] => {
	const items =
		response?.transitions?.map(({ appearance, id, name }) => ({
			appearance: (appearance as ThemeAppearance) ?? 'default',
			id,
			text: name,
		})) ?? [];

	return items.sort(
		(a, b) => a.appearance.localeCompare(b.appearance) || a.text.localeCompare(b.text),
	);
};

export default extractLozengeActionItems;
