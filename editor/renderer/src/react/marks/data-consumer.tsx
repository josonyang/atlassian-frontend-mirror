import React from 'react';
import { type DataConsumerAttributes } from '@atlaskit/adf-schema';
import { type MarkProps } from '../types';

export default function DataConsumer(props: MarkProps<DataConsumerAttributes>) {
	const WrapperElement = props.isInline ? 'span' : 'div';

	return (
		<WrapperElement
			data-source={props.sources ? JSON.stringify(props.sources) : undefined}
			data-mark-type="dataConsumer"
			{...props.dataAttributes}
		>
			{props.children}
		</WrapperElement>
	);
}
