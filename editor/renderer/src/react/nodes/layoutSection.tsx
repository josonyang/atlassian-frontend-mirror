import React from 'react';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

export default function LayoutSection(props: React.PropsWithChildren<{ content?: PMNode[] }>) {
	return editorExperiment('advanced_layouts', true) ? (
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
		<div className="layout-section-container">
			<div data-layout-section data-layout-columns={props?.content?.length}>
				{props.children}
			</div>
		</div>
	) : (
		<div data-layout-section>{props.children}</div>
	);
}
