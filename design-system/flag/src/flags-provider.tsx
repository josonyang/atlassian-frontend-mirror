import React, { useCallback, useMemo, useState } from 'react';

import AutoDismissFlag from './auto-dismiss-flag';
import Flag from './flag';
import { FlagContext } from './flag-context';
import FlagGroup from './flag-group';
import type { CreateFlagArgs, FlagAPI, FlagArgs, FlagId } from './flag-provider';

const getUniqueId = (() => {
	let count: number = 0;
	return () => `flag-provider-unique-id:${count++}`;
})();

// eslint-disable-next-line @atlaskit/volt-strict-mode/no-multiple-exports
export function FlagsProvider({
	children,
	shouldRenderToParent,
}: {
	children: React.ReactNode;
	shouldRenderToParent?: boolean;
}): React.JSX.Element {
	const [flags, setFlags] = useState<FlagArgs[]>([]);

	const removeFlag = useCallback((id: FlagId) => {
		setFlags((current) => {
			return current.slice(0).filter((flag) => flag.id !== id);
		});
	}, []);

	const api: FlagAPI = useMemo(
		() => ({
			showFlag: function show(value: CreateFlagArgs) {
				const flag: FlagArgs = {
					...value,
					id: value.id || getUniqueId(),
				};

				setFlags((current): FlagArgs[] => {
					const index: number = current.findIndex((value) => value.id === flag.id);

					// If flag is not found add it
					if (index === -1) {
						return [flag, ...current];
					}

					// If flag already exists with the same id, then replace it
					const shallow: FlagArgs[] = [...current];
					shallow[index] = flag;
					return shallow;
				});

				return function dismiss() {
					removeFlag(flag.id);
				};
			},
			hideFlag: removeFlag,
		}),
		[removeFlag],
	);

	return (
		<>
			<FlagContext.Provider value={api}>{children}</FlagContext.Provider>
			<FlagGroup onDismissed={removeFlag} shouldRenderToParent={shouldRenderToParent}>
				{flags.map((flag) => {
					const { isAutoDismiss, ...restProps } = flag;
					const FlagType = isAutoDismiss ? AutoDismissFlag : Flag;
					return <FlagType {...restProps} key={flag.id} />;
				})}
			</FlagGroup>
		</>
	);
}
