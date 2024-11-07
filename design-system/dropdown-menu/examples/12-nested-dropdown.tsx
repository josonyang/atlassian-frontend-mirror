import React from 'react';

import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import { token } from '@atlaskit/tokens';

const NestedDropdown = () => {
	return (
		<DropdownMenu
			placement="right-start"
			shouldRenderToParent
			trigger={({ triggerRef, ...triggerProps }) => (
				<DropdownItem
					{...triggerProps}
					ref={triggerRef}
					elemAfter={<ChevronRightIcon primaryColor={token('color.icon.subtle', '')} label="" />}
				>
					<span>Nested Menu</span>
				</DropdownItem>
			)}
		>
			<DropdownItemGroup>
				<NestedDropdown />
				<NestedDropdown />
				<DropdownItem>One of many items</DropdownItem>
				<DropdownItem>One of many items</DropdownItem>
			</DropdownItemGroup>
		</DropdownMenu>
	);
};
const NestedDropdownMenuExample = () => {
	return (
		<DropdownMenu trigger="Nested" shouldRenderToParent>
			<DropdownItemGroup>
				<NestedDropdown />
				<NestedDropdown />
				<DropdownItem>One of many items</DropdownItem>
				<DropdownItem>One of many items</DropdownItem>
			</DropdownItemGroup>
		</DropdownMenu>
	);
};
export default NestedDropdownMenuExample;
