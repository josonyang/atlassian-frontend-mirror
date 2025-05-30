import type { StylesProps } from './styles';
import type {
	ClassNamesState,
	CommonPropsAndClassName,
	GroupBase,
	InputActionMeta,
	MultiValue,
	OnChangeValue,
	Options,
	PropsValue,
	SingleValue,
} from './types';

// ==============================
// NO OP
// ==============================

export const noop = () => {};

// ==============================
// Class Name Prefixer
// ==============================

/**
 * String representation of component state for styling with class names.
 *
 * Expects an array of strings OR a string/object pair:
 * - className(['comp', 'comp-arg', 'comp-arg-2'])
 * @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 * - className('comp', { some: true, state: false })
 * @returns 'react-select__comp react-select__comp--some'
 */
function applyPrefixToName(prefix: string, name: string) {
	if (!name) {
		return prefix;
	} else if (name[0] === '-') {
		return prefix + name;
	} else {
		return prefix + '__' + name;
	}
}

export function classNames(
	prefix?: string | null,
	state?: ClassNamesState,
	...classNameList: string[]
) {
	const arr = [...classNameList];
	if (state && prefix) {
		for (let key in state) {
			if (state.hasOwnProperty(key) && state[key]) {
				arr.push(`${applyPrefixToName(prefix, key)}`);
			}
		}
	}

	return arr
		.filter((i) => i)
		.map((i) => String(i).trim())
		.join(' ');
}
// ==============================
// Clean Value
// ==============================

export const cleanValue = <Option,>(value: PropsValue<Option>): Options<Option> => {
	if (isArray(value)) {
		return value.filter(Boolean);
	}
	if (typeof value === 'object' && value !== null) {
		return [value];
	}
	return [];
};

// ==============================
// Clean Common Props
// ==============================

export const cleanCommonProps = <
	Option,
	IsMulti extends boolean,
	Group extends GroupBase<Option>,
	AdditionalProps,
>(
	props: Partial<CommonPropsAndClassName<Option, IsMulti, Group>> & AdditionalProps,
): Omit<AdditionalProps, keyof CommonPropsAndClassName<Option, IsMulti, Group>> => {
	//className
	const {
		className, // not listed in commonProps documentation, needs to be removed to allow Emotion to generate classNames
		clearValue,
		cx,
		xcss,
		getStyles,
		getClassNames,
		getValue,
		hasValue,
		isMulti,
		isRtl,
		options, // not listed in commonProps documentation
		selectOption,
		selectProps,
		setValue,
		...innerProps
	} = props;
	return { ...innerProps };
};

// ==============================
// Get Style Props
// ==============================

export const getStyleProps = <
	Option,
	IsMulti extends boolean,
	Group extends GroupBase<Option>,
	Key extends keyof StylesProps<Option, IsMulti, Group>,
>(
	props: Pick<
		CommonPropsAndClassName<Option, IsMulti, Group>,
		'cx' | 'getStyles' | 'getClassNames' | 'className'
	> &
		StylesProps<Option, IsMulti, Group>[Key],
	name: Key,
	classNamesState?: ClassNamesState,
) => {
	const { cx, getStyles, getClassNames, className } = props;

	return {
		css: getStyles(name, props),
		className: cx(classNamesState ?? {}, getClassNames(name, props), className),
	};
};

// ==============================
// Handle Input Change
// ==============================

export function handleInputChange(
	inputValue: string,
	actionMeta: InputActionMeta,
	onInputChange?: (newValue: string, actionMeta: InputActionMeta) => string | void,
) {
	if (onInputChange) {
		const newValue = onInputChange(inputValue, actionMeta);
		if (typeof newValue === 'string') {
			return newValue;
		}
	}
	return inputValue;
}

// ==============================
// Scroll Helpers
// ==============================

export function isDocumentElement(el: HTMLElement | typeof window): el is typeof window {
	return [document.documentElement, document.body, window].indexOf(el) > -1;
}

// Normalized Scroll Top
// ------------------------------

export function normalizedHeight(el: HTMLElement | typeof window): number {
	if (isDocumentElement(el)) {
		return window.innerHeight;
	}

	return el.clientHeight;
}

// Normalized scrollTo & scrollTop
// ------------------------------

export function getScrollTop(el: HTMLElement | typeof window): number {
	if (isDocumentElement(el)) {
		return window.pageYOffset;
	}
	return el.scrollTop;
}

export function scrollTo(el: HTMLElement | typeof window, top: number): void {
	// with a scroll distance, we perform scroll on the element
	if (isDocumentElement(el)) {
		window.scrollTo(0, top);
		return;
	}

	el.scrollTop = top;
}

// Get Scroll Parent
// ------------------------------

export function getScrollParent(element: HTMLElement) {
	let style = getComputedStyle(element);
	const excludeStaticParent = style.position === 'absolute';
	const overflowRx = /(auto|scroll)/;

	if (style.position === 'fixed') {
		return document.documentElement;
	}

	for (let parent: HTMLElement | null = element; (parent = parent.parentElement); ) {
		style = getComputedStyle(parent);
		if (excludeStaticParent && style.position === 'static') {
			continue;
		}
		if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
			return parent;
		}
	}

	return document.documentElement;
}

// Animated Scroll To
// ------------------------------

/**
 * @param t: time (elapsed)
 * @param b: initial value
 * @param c: amount of change
 * @param d: duration
 */
function easeOutCubic(t: number, b: number, c: number, d: number): number {
	return c * ((t = t / d - 1) * t * t + 1) + b;
}

export function animatedScrollTo(
	element: HTMLElement | typeof window,
	to: number,
	duration = 200,
	callback: (element: HTMLElement | typeof window) => void = noop,
) {
	const start = getScrollTop(element);
	const change = to - start;
	const increment = 10;
	let currentTime = 0;

	function animateScroll() {
		currentTime += increment;
		const val = easeOutCubic(currentTime, start, change, duration);
		scrollTo(element, val);
		if (currentTime < duration) {
			window.requestAnimationFrame(animateScroll);
		} else {
			callback(element);
		}
	}
	animateScroll();
}

// Scroll Into View
// ------------------------------

export function scrollIntoView(menuEl: HTMLElement, focusedEl: HTMLElement): void {
	const menuRect = menuEl.getBoundingClientRect();
	const focusedRect = focusedEl.getBoundingClientRect();
	const overScroll = focusedEl.offsetHeight / 3;

	if (focusedRect.bottom + overScroll > menuRect.bottom) {
		scrollTo(
			menuEl,
			Math.min(
				focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll,
				menuEl.scrollHeight,
			),
		);
	} else if (focusedRect.top - overScroll < menuRect.top) {
		scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
	}
}

// ==============================
// Get bounding client object
// ==============================

// cannot get keys using array notation with DOMRect
export function getBoundingClientObj(element: HTMLElement) {
	const rect = element.getBoundingClientRect();
	return {
		bottom: rect.bottom,
		height: rect.height,
		left: rect.left,
		right: rect.right,
		top: rect.top,
		width: rect.width,
	};
}

// ==============================
// Touch Capability Detector
// ==============================

export function isTouchCapable() {
	try {
		document.createEvent('TouchEvent');
		return true;
	} catch (e) {
		return false;
	}
}

// ==============================
// Mobile Device Detector
// ==============================

export function isMobileDevice() {
	try {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);
	} catch (e) {
		return false;
	}
}

// ==============================
// Passive Event Detector
// ==============================

// https://github.com/rafgraph/detect-it/blob/main/src/index.ts#L19-L36
let passiveOptionAccessed = false;
const options = {
	get passive() {
		return (passiveOptionAccessed = true);
	},
};
// check for SSR
const w: typeof window | { addEventListener?: never; removeEventListener?: never } =
	typeof window !== 'undefined' ? window : {};
if (w.addEventListener && w.removeEventListener) {
	// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
	w.addEventListener('p', noop, options);
	// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
	w.removeEventListener('p', noop, false);
}

export const supportsPassiveEvents: boolean = passiveOptionAccessed;

export function notNullish<T>(item: T | null | undefined): item is T {
	return item != null;
}

function isArray<T>(arg: unknown): arg is readonly T[] {
	return Array.isArray(arg);
}

export function valueTernary<Option, IsMulti extends boolean>(
	isMulti: IsMulti | undefined,
	multiValue: MultiValue<Option>,
	singleValue: SingleValue<Option>,
): OnChangeValue<Option, IsMulti> {
	return (isMulti ? multiValue : singleValue) as OnChangeValue<Option, IsMulti>;
}

export function singleValueAsValue<Option, IsMulti extends boolean>(
	singleValue: SingleValue<Option>,
): OnChangeValue<Option, IsMulti> {
	return singleValue as OnChangeValue<Option, IsMulti>;
}

export function multiValueAsValue<Option, IsMulti extends boolean>(
	multiValue: MultiValue<Option>,
): OnChangeValue<Option, IsMulti> {
	return multiValue as OnChangeValue<Option, IsMulti>;
}

export const removeProps = <Props extends object, K extends string[]>(
	propsObj: Props,
	...properties: K
): Omit<Props, K[number]> => {
	let propsMap = Object.entries(propsObj).filter(([key]) => !properties.includes(key));

	return propsMap.reduce((newProps: { [key: string]: any }, [key, val]) => {
		newProps[key] = val;
		return newProps;
	}, {}) as Omit<Props, K[number]>;
};

/**
 * Filters out unsupported selectors (e.g., pseudo-classes, complex selectors) from a styles object.
 * @param styles - The styles object to filter.
 * @returns A new object containing only supported styles.
 */
export const filterUnsupportedSelectors = (styles: Record<string, any>): Record<string, any> => {
	const unsupportedSelectors = [
		':', // pseudo-classes/elements
		'[', // attribute selectors
		'>', // child combinator
		'+', // adjacent sibling combinator
		'~', // general sibling combinator
		' ', // descendant combinator
		'*', // universal selector
		'#', // ID selector
		'.', // class selector
		'@', // at-rules
		'&', // parent selector
		'|', // namespace separator
		'^', // starts with
		'$', // ends with
		'=', // equals
	];

	return Object.keys(styles).reduce(
		(filteredStyles, key) => {
			if (!unsupportedSelectors.some((selector) => key.includes(selector))) {
				filteredStyles[key] = styles[key];
			}
			return filteredStyles;
		},
		{} as Record<string, any>,
	);
};
