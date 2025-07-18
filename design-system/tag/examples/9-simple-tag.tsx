import React from 'react';

// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box } from '@atlaskit/primitives';
import { SimpleTag as Tag } from '@atlaskit/tag';

export default () => (
	<Box id="simpleTags" role="group" aria-label="Simple tag examples">
		<Tag text="standard Tag" color="standard" />
		<Tag text="blue Tag" color="blue" />
		<Tag text="green Tag" color="green" />
		<Tag text="teal Tag" color="teal" />
		<Tag text="purple Tag" color="purple" />
		<Tag text="red Tag" color="red" />
		<Tag text="yellow Tag" color="yellow" />
		<Tag text="orange Tag" color="orange" />
		<Tag text="magenta Tag" color="magenta" />
		<Tag text="lime Tag" color="lime" />
		<Tag text="grey Tag" color="grey" />
		<Tag text="greenLight Tag" color="greenLight" />
		<Tag text="tealLight Tag" color="tealLight" />
		<Tag text="blueLight Tag" color="blueLight" />
		<Tag text="purpleLight Tag" color="purpleLight" />
		<Tag text="redLight Tag" color="redLight" />
		<Tag text="yellowLight Tag" color="yellowLight" />
		<Tag text="orangeLight Tag" color="orangeLight" />
		<Tag text="magentaLight Tag" color="magentaLight" />
		<Tag text="limeLight Tag" color="limeLight" />
		<Tag text="greyLight Tag" color="greyLight" />
	</Box>
);
