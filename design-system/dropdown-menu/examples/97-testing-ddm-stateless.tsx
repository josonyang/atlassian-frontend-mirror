import React, { useState } from 'react';

import DropdownMenuStateless, {
	DropdownItemRadio,
	DropdownItemRadioGroup,
	type OnOpenChangeArgs,
} from '@atlaskit/dropdown-menu';

const DropdownMenuStatelessExample = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<DropdownMenuStateless
			isOpen={isOpen}
			onOpenChange={(attrs: OnOpenChangeArgs) => {
				setIsOpen(attrs.isOpen);
			}}
			trigger="Filter city"
			appearance="default"
			testId="lite-mode-ddm"
			shouldRenderToParent
		>
			<DropdownItemRadioGroup id="cities">
				<DropdownItemRadio id="sydney" defaultSelected>
					Sydney
				</DropdownItemRadio>

				<DropdownItemRadio id="melbourne">Melbourne</DropdownItemRadio>
			</DropdownItemRadioGroup>
		</DropdownMenuStateless>
	);
};

export default DropdownMenuStatelessExample;
