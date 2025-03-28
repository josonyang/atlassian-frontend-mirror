import React from 'react';

import { ErroredClient } from '../utils/custom-client';
import VRCardView from '../utils/vr-card-view';

export const BlockCardErrorView = () => (
	<VRCardView appearance="block" client={new ErroredClient()} />
);
