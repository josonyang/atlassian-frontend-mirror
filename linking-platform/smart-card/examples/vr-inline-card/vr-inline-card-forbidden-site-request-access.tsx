import React from 'react';

import { ForbiddenWithSiteRequestAccessClient } from '@atlaskit/link-test-helpers';

import VRCardView from '../utils/vr-card-view';

export default () => (
	<VRCardView appearance="inline" client={new ForbiddenWithSiteRequestAccessClient()} />
);
