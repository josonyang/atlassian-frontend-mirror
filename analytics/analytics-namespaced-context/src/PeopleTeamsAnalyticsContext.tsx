import { type FunctionComponent } from 'react';
import createNamespaceContext, { type Props } from './helper/createNamespaceContext';

export const PEOPLE_TEAMS_CONTEXT = 'peopleTeamsCtx';

export const PeopleTeamsAnalyticsContext: FunctionComponent<Props> = createNamespaceContext(
	PEOPLE_TEAMS_CONTEXT,
	'PeopleTeamsAnalyticsContext',
);
