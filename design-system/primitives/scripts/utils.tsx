export const constructTokenFunctionCall: (
	token: string,
	fallback: string | ShadowDefinition,
) => string = (token: string, fallback: string | ShadowDefinition) => {
	if (Array.isArray(fallback)) {
		fallback = constructShadow(fallback);
	}

	return `token('${token}', '${fallback}')`;
};

export type ShadowDefinition = Array<{
	radius: number;
	offset: {
		x: number;
		y: number;
	};
	color: string;
	opacity: number;
}>;

const constructShadow = (shadowObject: ShadowDefinition) => {
	return shadowObject
		.map((shadow) => `${shadow.offset.x}px ${shadow.offset.y}px ${shadow.radius}px ${shadow.color}`)
		.join(', ');
};

type BooleanCallback<T> = (args: T) => boolean;

export const not: <T extends any>(cb: BooleanCallback<T>) => (val: T) => boolean =
	<T extends any>(cb: BooleanCallback<T>) =>
	(val: T) =>
		!cb(val);
export const or: <T extends any>(...fns: BooleanCallback<T>[]) => (val: T) => boolean =
	<T extends any>(...fns: BooleanCallback<T>[]) =>
	(val: T) =>
		fns.some((fn) => fn(val));

export { compose } from './compose';
export { pick } from './pick';
export { isAccent } from './is-accent';
export { isPressed } from './is-pressed';
export { isHovered } from './is-hovered';
export { capitalize } from './capitalize';
export { generateTypeDefs } from './generate-type-defs';
