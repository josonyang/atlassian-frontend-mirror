import React from 'react';
import { type ListenerProps, FabricChannel } from '../types';

import processEvent from './process-event';
import GenericAnalyticsListener from '../GenericAnalyticsListener';

export default function TownsquareHomeAnalyticsListener(props: ListenerProps) {
	return (
		<GenericAnalyticsListener
			{...props}
			channel={FabricChannel.townsquareHome}
			processEvent={processEvent}
		/>
	);
}
