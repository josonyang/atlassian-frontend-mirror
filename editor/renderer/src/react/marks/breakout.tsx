/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import type { BreakoutMarkAttrs } from '@atlaskit/adf-schema';
import { WidthConsumer } from '@atlaskit/editor-common/ui';
import { calcBreakoutWithCustomWidth, calcBreakoutWidth } from '@atlaskit/editor-common/utils';
import { blockNodesVerticalMargin } from '@atlaskit/editor-shared-styles';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';
import type { MarkProps } from '../types';

const wrapperStyles = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	margin: `${blockNodesVerticalMargin} 0`,
	// eslint-disable-next-line @atlaskit/design-system/use-tokens-space
	marginLeft: '50%',
	transform: 'translateX(-50%)',
});

export default function Breakout(props: MarkProps<BreakoutMarkAttrs>) {
	return (
		<WidthConsumer>
			{({ width }) => (
				<div
					css={wrapperStyles}
					data-mode={props.mode}
					// Ignored via go/ees005
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...(editorExperiment('advanced_layouts', true) && {
						'data-has-width': !!props.width,
						'data-width': props.width,
					})}
					style={{
						width: editorExperiment('advanced_layouts', true)
							? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
								calcBreakoutWithCustomWidth(
									props.mode,
									'width' in props ? props.width : null,
									width,
								)
							: // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
								calcBreakoutWidth(props.mode, width),
					}}
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
					className="fabric-editor-breakout-mark fabric-editor-block-mark"
				>
					{props.children}
				</div>
			)}
		</WidthConsumer>
	);
}
