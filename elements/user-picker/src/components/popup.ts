import memoizeOne from 'memoize-one';
import { type Placement } from '@atlaskit/popper';

import { type Target, type BoundariesElement, type RootBoundary } from '../types';

export const getPopupProps = memoizeOne(
	(
		width: string | number,
		target: Target,
		onFlip: (data: any) => any,
		boundariesElement?: BoundariesElement,
		offset?: number[],
		placement?: Placement,
		rootBoundary?: RootBoundary,
		shouldFlip?: boolean,
		popupTitle?: string,
		strategy?: 'fixed' | 'absolute',
	) => ({
		searchThreshold: -1,
		controlShouldRenderValue: true,
		minMenuWidth: width,
		maxMenuWidth: width,
		autoFocus: false,
		target,
		popupTitle,
		popperProps: {
			placement: placement || 'auto',
			strategy: strategy || 'fixed',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset,
					},
				},
				{
					name: 'handleFlipStyle',
					enabled: true,
					order: 910,
					fn: (data: any) => onFlip(data),
				},
				{
					name: 'preventOverflow',
					options: {
						rootBoundary: rootBoundary,
						boundary: boundariesElement,
					},
				},
				{
					name: 'flip',
					enabled: shouldFlip,
				},
			],
		},
	}),
);
