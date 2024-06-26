import React from 'react';

import { UnAuthClient } from '../utils/custom-client';
import VRCardView from '../utils/vr-card-view';

export default () => <VRCardView appearance="inline" client={new UnAuthClient()} />;
