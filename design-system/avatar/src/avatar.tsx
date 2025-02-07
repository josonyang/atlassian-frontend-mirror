/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import {
	createElement,
	forwardRef,
	isValidElement,
	type MouseEvent,
	type MouseEventHandler,
	type ReactNode,
	type Ref,
	useCallback,
	useEffect,
	useRef,
} from 'react';

import { ClassNames, jsx } from '@emotion/react';
import { type CSSInterpolation } from '@emotion/serialize';

import { type UIAnalyticsEvent, useAnalyticsEvents } from '@atlaskit/analytics-next';
import { useId } from '@atlaskit/ds-lib/use-id';
import FocusRing from '@atlaskit/focus-ring';
import { fg } from '@atlaskit/platform-feature-flags';
import { N0, N70A } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import AvatarImage from './avatar-image';
import { ACTIVE_SCALE_FACTOR, AVATAR_RADIUS, AVATAR_SIZES, BORDER_WIDTH } from './constants';
import { useAvatarContext } from './context';
import { PresenceWrapper } from './presence';
import { StatusWrapper } from './status';
import {
	type AppearanceType,
	type AvatarClickEventHandler,
	type IndicatorSizeType,
	type Presence,
	type SizeType,
	type Status,
} from './types';
import { getButtonProps, getCustomElement, getLinkProps } from './utilities';

const packageName = process.env._PACKAGE_NAME_ as string;
const packageVersion = process.env._PACKAGE_VERSION_ as string;

const getTestId = (testId?: string, children?: AvatarPropTypes['children']) =>
	!children ? { 'data-testid': `${testId}--inner` } : { testId: `${testId}--inner` };

export interface CustomAvatarProps {
	/**
	 * This is used in render props so is okay to be defined.
	 */
	'aria-label'?: string;
	tabIndex?: number;
	testId?: string;
	onClick?: MouseEventHandler;
	className?: string;
	href?: string;
	children: ReactNode;
	ref: Ref<HTMLElement>;
}

// eslint-disable-next-line @repo/internal/react/consistent-types-definitions
export interface AvatarPropTypes {
	/**
	 * Indicates the shape of the avatar. Most avatars are circular, but square avatars
	 * can be used for 'container' objects.
	 */
	appearance?: AppearanceType;
	/**
	 * Used to provide custom content to screen readers.
	 * Status or presence is not added to the label by default if it passed as nodes.
	 * If status or presence is passed as a string, the default content format is "John Smith (online)".
	 */
	label?: string;
	/**
	 * Used to override the default border color around the avatar body.
	 * Accepts any color argument that the border-color CSS property accepts.
	 */
	borderColor?: string;
	/**
	 * Supply a custom avatar component instead of the default.
	 */
	children?: (props: CustomAvatarProps) => ReactNode;
	/**
	 * Provides a url for avatars being used as a link.
	 */
	href?: string;
	/**
	 * Change the style to indicate the avatar is disabled.
	 */
	isDisabled?: boolean;
	/**
	 * Provides alt text for the avatar image.
	 */
	name?: string;
	/**
	 * Indicates a user's online status by showing a small icon on the avatar.
	 * Refer to presence values on the presence component.
	 * Alternatively accepts any React element. For best results, it is recommended to
	 * use square content with height and width of 100%.
	 */
	presence?: Presence | Omit<ReactNode, string> | (string & {}) | null;
	/**
	 * Defines the size of the avatar. Default value is `medium`.
	 *
	 * This can also be controlled by the `size` property of the
	 * `AvatarContext` export from this package. If no prop is given when the
	 * `size` is set via this context, the context's value will be used.
	 */
	size?: SizeType;
	/**
	 * A url to load an image from (this can also be a base64 encoded image).
	 */
	src?: string;
	/**
	 * Indicates contextual information by showing a small icon on the avatar.
	 * Refer to status values on the Status component.
	 */
	status?: Status | Omit<ReactNode, string> | (string & {}) | null;
	/**
	 * The index of where this avatar is in the group `stack`.
	 */
	stackIndex?: number;
	/**
	 * Assign specific tabIndex order to the underlying node.
	 */
	tabIndex?: number;
	/**
	 * Pass target down to the anchor, if href is provided.
	 */
	target?: '_blank' | '_self' | '_top' | '_parent';
	/**
	 * Handler to be called on click.
	 */
	onClick?: AvatarClickEventHandler;
	/**
	 * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests.
	 */
	testId?: string;
	/**
	 * Analytics context meta data.
	 */
	analyticsContext?: Record<string, any>;
	/**
	 * Replace the wrapping element. This accepts the name of a html tag which will
	 * be used to wrap the element.
	 */
	as?: keyof JSX.IntrinsicElements | React.ComponentType<React.AllHTMLAttributes<HTMLElement>>;
}

const getStyles = (
	css: (template: TemplateStringsArray, ...args: Array<CSSInterpolation>) => string,
	{
		size,
		radius,
		appearance,
		borderColor = fg('platform-component-visual-refresh')
			? token('elevation.surface')
			: token('elevation.surface.overlay', N0),
		stackIndex,
		isInteractive,
		isDisabled,
	}: {
		size: number;
		radius: number;
		appearance: AppearanceType;
		borderColor?: string;
		stackIndex?: number;
		isInteractive: boolean;
		isDisabled?: boolean;
	},
) =>
	//eslint-disable-next-line @repo/internal/react/no-css-string-literals
	css`
		height: ${size}px;
		width: ${size}px;
		align-items: stretch;
		background-color: ${borderColor};
		border-radius: ${appearance === 'circle' ? '50%' : `${radius}px`};
		box-sizing: content-box;
		cursor: inherit;
		display: flex;
		flex-direction: column;
		justify-content: center;
		outline: none;
		overflow: hidden;
		position: static;
		transform: translateZ(0);
		transition:
			transform 200ms,
			opacity 200ms;
		box-shadow: 0 0 0 ${BORDER_WIDTH}px ${borderColor};
		border: none;
		margin: ${token('space.025', '2px')};
		padding: ${token('space.0', '0px')};

		&::-moz-focus-inner {
			border: 0;
			margin: ${token('space.0', '0px')};
			padding: ${token('space.0', '0px')};
		}

		&::after {
			background-color: transparent;
			inset: 0px;

			/* Added border-radius style to fix hover issue in safari */
			border-radius: ${appearance === 'circle' ? '50%' : `${radius}px`};
			content: ' ';
			opacity: 0;
			pointer-events: none;
			position: absolute;
			transition: opacity 200ms;
			width: 100%;
		}

		:focus-visible {
			box-shadow: none;
		}

		${stackIndex && `position: relative;`}

		${isInteractive &&
		`
      cursor: pointer;

      :hover {
        &::after {
          background-color: ${token('color.interaction.hovered', N70A)};
          opacity: 1;
        }
      }

      :active {
        &::after {
          background-color: ${token('color.interaction.pressed', N70A)};
          opacity: 1;
        }
      }

      :active {
        transform: scale(${ACTIVE_SCALE_FACTOR});
      }

      @media screen and (forced-colors: active) {
        &:focus-visible {
          outline: 1px solid
        }
      }
    `}

    ${isDisabled &&
		`
        cursor: not-allowed;

        &::after {
          opacity: ${token('opacity.disabled', '0.7')};
          pointer-events: none;
          background-color: ${token('elevation.surface', N0)};
        }
      `}
	`;

/**
 * __Avatar__
 *
 * An avatar is a visual representation of a user or entity.
 *
 * - [Examples](https://atlassian.design/components/avatar/examples)
 * - [Code](https://atlassian.design/components/avatar/code)
 * - [Usage](https://atlassian.design/components/avatar/usage)
 */
const Avatar = forwardRef<HTMLElement, AvatarPropTypes>(
	(
		{
			analyticsContext,
			appearance = 'circle' as AppearanceType,
			label,
			borderColor,
			children,
			href,
			isDisabled,
			name,
			onClick,
			presence,
			size: sizeProp,
			src,
			stackIndex,
			status,
			target,
			testId,
			as: AvatarContainer = 'div',
		},
		ref,
	) => {
		const { createAnalyticsEvent } = useAnalyticsEvents();
		const context = useAvatarContext();

		const size = sizeProp ?? context?.size ?? ('medium' as SizeType);

		const customPresenceNode = isValidElement(presence) ? presence : null;
		const customStatusNode = isValidElement(status) ? status : null;
		const isValidIconSize = size !== 'xxlarge' && size !== 'xsmall';
		const lastAnalytics = useRef(analyticsContext);
		const labelId = useId();

		useEffect(() => {
			lastAnalytics.current = analyticsContext;
		}, [analyticsContext]);

		const onClickHandler = useCallback(
			(event: MouseEvent<HTMLElement>) => {
				if (isDisabled || typeof onClick !== 'function') {
					return;
				}

				const analyticsEvent = createAnalyticsEvent({
					action: 'clicked',
					actionSubject: 'avatar',
					attributes: {
						componentName: 'avatar',
						packageName,
						packageVersion,
					},
				});

				/**
				 * To avoid wrapping this component in AnalyticsContext we manually
				 * push the parent context's meta data into the context.
				 */
				const context: Record<string, any> = {
					componentName: 'avatar',
					packageName,
					packageVersion,
					...lastAnalytics.current,
				};

				analyticsEvent.context.push(context);

				/**
				 * Replicating the logic in the `withAnalyticsEvents` HOC.
				 */
				const clone: UIAnalyticsEvent | null = analyticsEvent.clone();
				if (clone) {
					clone.fire('atlaskit');
				}

				onClick(event, analyticsEvent);
			},
			[createAnalyticsEvent, isDisabled, onClick],
		);

		const componentProps = () => {
			if (isDisabled) {
				return { disabled: true };
			}

			// return only relevant props for either anchor or button elements
			return {
				...(href && getLinkProps(href, target)),
				...(onClick && !href ? getButtonProps(onClickHandler) : { onClick }),
			};
		};

		const isPresence = isValidIconSize && presence && !status;
		const isStatus = isValidIconSize && status;

		// add presence or status to the label by default if presence and status are passed as a string
		// if status or presence are nodes this is not added to the label by default
		const defaultLabel = [
			name,
			isStatus && !customStatusNode && `(${status})`,
			isPresence && !customPresenceNode && `(${presence})`,
		]
			.filter(Boolean)
			.join(' ');

		const isInteractive = onClick || href || isDisabled;
		const containerShouldBeImage = Boolean(!isInteractive && defaultLabel);

		return (
			<AvatarContainer
				data-testid={testId}
				role={containerShouldBeImage ? 'img' : undefined}
				aria-labelledby={containerShouldBeImage ? labelId : undefined}
				style={{
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					display: 'inline-block',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					position: 'relative',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					outline: 0,
					zIndex: stackIndex,
				}}
			>
				<ClassNames>
					{({ css }) => {
						const props: CustomAvatarProps = {
							className: getStyles(css, {
								size: AVATAR_SIZES[size],
								radius: AVATAR_RADIUS[size],
								appearance,
								borderColor,
								stackIndex,
								isInteractive: Boolean(href || onClick) && !isDisabled,
								isDisabled,
							}),
							...componentProps(),
							...(testId && getTestId(testId, children)),
							...((isInteractive || children) && {
								'aria-label': label || defaultLabel,
							}),
							children: (
								<AvatarImage
									// Only pass in the name if an image is provided and the
									// container is not being used as an `img` role
									alt={!containerShouldBeImage && src ? name : undefined}
									appearance={appearance!}
									size={size!}
									src={src}
									testId={testId}
								/>
							),
							ref,
						};

						if (children) {
							return children(props);
						}

						const element = getCustomElement(isDisabled, href, onClick);

						return element === 'a' || element === 'button' ? (
							<FocusRing>{createElement(element, props)}</FocusRing>
						) : (
							createElement(element, props)
						);
					}}
				</ClassNames>
				{isPresence && (
					<PresenceWrapper
						appearance={appearance!}
						size={size as IndicatorSizeType}
						presence={typeof presence === 'string' ? (presence as Presence) : undefined}
						testId={testId}
					>
						{customPresenceNode}
					</PresenceWrapper>
				)}
				{isStatus && (
					<StatusWrapper
						appearance={appearance!}
						size={size as IndicatorSizeType}
						borderColor={borderColor}
						status={typeof status === 'string' ? (status as Status) : undefined}
						testId={testId}
					>
						{customStatusNode}
					</StatusWrapper>
				)}
				{containerShouldBeImage ? (
					<span data-testid={testId && `${testId}--label`} id={labelId} hidden>
						{defaultLabel}
					</span>
				) : undefined}
			</AvatarContainer>
		);
	},
);

Avatar.displayName = 'Avatar';

export default Avatar;
