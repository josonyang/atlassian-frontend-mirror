import React, { useEffect, useState } from 'react';

import Spinner from '@atlaskit/spinner';
import { token } from '@atlaskit/tokens';

import CommonCell from './common-cell';
import { LoaderItemContainer, TreeRowContainer } from './styled';

interface LoaderItemProps {
	/**
	 * @default 1
	 */
	depth?: number;
	onComplete: (...args: any[]) => void;
	isCompleting?: boolean;
	loadingLabel?: string;
}

const LoaderItem = ({ depth = 1, loadingLabel, isCompleting, onComplete }: LoaderItemProps) => {
	const [phase, setPhase] = useState<'loading' | 'complete'>('loading');

	useEffect(() => {
		if (phase === 'loading' && isCompleting) {
			setPhase(() => {
				onComplete();
				return 'complete';
			});
		}
	}, [isCompleting, onComplete, phase]);

	return phase === 'loading' ? (
		<TreeRowContainer>
			<CommonCell indent={`calc(${token('space.300', '25px')} * ${depth})`} width="100%">
				<LoaderItemContainer isRoot={depth === 1}>
					<Spinner size="small" testId="table-tree-spinner" label={loadingLabel} />
				</LoaderItemContainer>
			</CommonCell>
		</TreeRowContainer>
	) : null;
};

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default LoaderItem;
