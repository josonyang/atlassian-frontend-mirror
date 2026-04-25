/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { cssMap, jsx } from '@atlaskit/css';

export interface PriorityIconProps {
	[key: string]: any;
	label?: string;
	testId?: string;
}

export interface PathData {
	d: string;
	fill: string;
}

const style = cssMap({
	span: { display: 'inline-block' },
	svg: { verticalAlign: 'bottom', maxWidth: '100%', maxHeight: '100%' },
});

export const createPriorityIcon = (
	displayName: string,
	paths: PathData[],
): {
	({ label, testId, ...props }: PriorityIconProps): JSX.Element;
	displayName: string;
} => {
	const Icon = ({ label, testId, ...props }: PriorityIconProps): JSX.Element => (
		<span
			role={label ? 'img' : undefined}
			aria-label={label}
			aria-hidden={label ? undefined : true}
			data-testid={testId}
			css={style.span}
			{...props}
		>
			<svg width="24" height="24" viewBox="0 0 24 24" role="presentation" css={style.svg}>
				{paths.map((p, i) => (
					<path key={i} d={p.d} fill={p.fill} />
				))}
			</svg>
		</span>
	);

	Icon.displayName = displayName;

	return Icon;
};
