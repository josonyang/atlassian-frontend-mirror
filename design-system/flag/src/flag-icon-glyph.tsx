import React, { type ReactElement } from 'react';

import ErrorIcon from '@atlaskit/icon/core/status-error';
import InformationIcon from '@atlaskit/icon/core/status-information';
import SuccessIcon from '@atlaskit/icon/core/status-success';
import WarningIcon from '@atlaskit/icon/core/status-warning';

import { type AppearanceTypes } from './types';

export const flagIconGlyph: Record<AppearanceTypes, ReactElement> = {
	error: <ErrorIcon label="" />,
	info: <InformationIcon label="" />,
	normal: <InformationIcon label="" />,
	success: <SuccessIcon label="" />,
	warning: <WarningIcon label="" />,
};
