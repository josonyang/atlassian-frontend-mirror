import { type JsonLd } from '@atlaskit/json-ld-types';
import { extractUrlFromIconJsonLd } from '@atlaskit/link-extractors';

import { IconType } from '../../constants';
import { type Icon } from '../../state/flexible-ui-context/types';

const priorityMapper: Record<string, IconType> = {
	blocker: IconType.PriorityBlocker,
	critical: IconType.PriorityCritical,
	high: IconType.PriorityHigh,
	highest: IconType.PriorityHighest,
	low: IconType.PriorityLow,
	lowest: IconType.PriorityLowest,
	major: IconType.PriorityMajor,
	medium: IconType.PriorityMedium,
	minor: IconType.PriorityMinor,
	trivial: IconType.PriorityTrivial,
	undefined: IconType.PriorityUndefined,
};

const extractPriority = (data: JsonLd.Data.Task): Icon | undefined => {
	const priority = data['atlassian:priority'];

	if (priority) {
		if (typeof priority === 'string') {
			const icon = priorityMapper[priority.toLowerCase()];
			if (icon) {
				return { icon, label: priority };
			}
		} else if (priority['@type'] === 'Object') {
			return {
				label: priority.name,
				url: priority.icon && extractUrlFromIconJsonLd(priority.icon),
			};
		}
	}
};

export default extractPriority;
