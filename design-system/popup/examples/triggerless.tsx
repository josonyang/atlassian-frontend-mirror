/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { css, jsx } from '@compiled/react';

import ButtonGroup from '@atlaskit/button/button-group';
import { IconButton } from '@atlaskit/button/new';
import { cssMap } from '@atlaskit/css';
import AddItemIcon from '@atlaskit/icon/glyph/add-item';
import JiraCaptureIcon from '@atlaskit/icon/glyph/jira/capture';
import AddCommentIcon from '@atlaskit/icon/glyph/media-services/add-comment';
import Popup from '@atlaskit/popup';
import { Box } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

const triggerStyles = css({
	backgroundColor: token('color.background.accent.blue.subtler'),
});
const popupStyles = cssMap({
	root: {
		paddingInlineStart: token('space.050'),
		paddingInlineEnd: token('space.050'),
		paddingBlockStart: token('space.050'),
		paddingBlockEnd: token('space.050'),
	},
});
const HighlightPopup = (props: { children: React.ReactNode }) => (
	<Popup
		shouldRenderToParent
		isOpen
		placement="bottom"
		content={() => (
			<Box xcss={popupStyles.root}>
				<ButtonGroup label="Triggerless popup options">
					<IconButton icon={AddCommentIcon} label="Add comment" />
					<IconButton icon={AddItemIcon} label="Add item" />
					<IconButton icon={JiraCaptureIcon} label="Capture in Jira" />
				</ButtonGroup>
			</Box>
		)}
		trigger={(triggerProps) => (
			<span css={triggerStyles} {...triggerProps}>
				{props.children}
			</span>
		)}
	/>
);

export default () => {
	return (
		<main>
			Thanks to soaring electricity costs and the potentially-enormous power drain of cooling
			equipment, <HighlightPopup>few people can happily leave aircon running 24/7</HighlightPopup>.
			This is especially true for those renters who must rely upon portable devices.
		</main>
	);
};
