/**
 * @jsxRuntime classic
 * @jsx jsx
 * @jsxFrag
 */
import React, { useCallback } from 'react';

import { useIntl } from 'react-intl-next';

import { cssMap, jsx } from '@atlaskit/css';
import { ContextPanelConsumer } from '@atlaskit/editor-common/context-panel';
import { TOOLBARS } from '@atlaskit/editor-common/toolbar';
import type { PublicPluginAPI } from '@atlaskit/editor-common/types';
import { ToolbarArrowKeyNavigationProvider } from '@atlaskit/editor-common/ui-menu';
import type { ToolbarPlugin } from '@atlaskit/editor-plugins/toolbar';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';
import { token } from '@atlaskit/tokens';

import type { PrimaryToolbarComponents } from '../../../types';
import { isToolbar } from '../../../utils/toolbar';
import { ToolbarNext } from '../../Toolbar/Toolbar';
import { useToolbarPortal } from '../../Toolbar/ToolbarPortal';

type FullPageToolbarNextProps = {
	beforeIcon?: React.ReactNode;
	customPrimaryToolbarComponents?: PrimaryToolbarComponents;
	disabled?: boolean; // make it required when cleaning up platform_editor_toolbar_aifc_patch_4
	editorAPI?: PublicPluginAPI<[ToolbarPlugin]>;
	editorView?: EditorView;
	popupsBoundariesElement?: HTMLElement;
	popupsMountPoint?: HTMLElement;
	popupsScrollableElement?: HTMLElement;
	showKeyline: boolean;
	toolbarDockingPosition?: 'top' | 'none';
};

const styles = cssMap({
	// copied from mainToolbarIconBeforeStyle
	mainToolbarIconBefore: {
		marginTop: token('space.200', '16px'),
		marginRight: token('space.200', '16px'),
		marginBottom: token('space.200', '16px'),
	},
	mainToolbarIconBeforeNew: {
		alignItems: 'center',
		display: 'flex',
	},
	mainToolbarWrapper: {
		borderBottom: `${token('border.width')} solid ${token('color.border')}`,
		paddingBlock: token('space.075'),
		paddingInline: token('space.150'),
	},
	mainToolbarNew: {
		display: 'flex',
		height: '32px',
	},
	mainToolbarZIndex: {
		// same value akEditorFloatingDialogZIndex and is accepted
		zIndex: 510,
		position: 'relative',
	},
	mainToolbarWithKeyline: {
		boxShadow: token('elevation.shadow.overflow'),
	},
	customToolbarWrapperStyle: {
		alignItems: 'center',
		display: 'flex',
	},
	firstChildWrapperOneLine: {
		display: 'flex',
		flexGrow: 1,
	},
	secondChildWrapperOneLine: {
		display: 'flex',
		minWidth: 'fit-content',
		alignItems: 'center',
	},
	beforePrimaryToolbarComponents: {
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
});

const MainToolbarWrapper = ({
	children,
	testId,
	showKeyline,
}: {
	children: React.ReactNode;
	showKeyline: boolean;
	testId?: string;
}) => {
	return (
		<div
			css={[
				styles.mainToolbarWrapper,
				showKeyline && styles.mainToolbarWithKeyline,
				expValEquals('platform_editor_toolbar_support_custom_components', 'isEnabled', true) &&
					styles.mainToolbarNew,
				expValEquals('platform_editor_toolbar_aifc_patch_3', 'isEnabled', true) &&
					styles.mainToolbarZIndex,
			]}
			data-testid={testId}
		>
			{children}
		</div>
	);
};

const FirstChildWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div css={styles.firstChildWrapperOneLine} data-testid="main-toolbar-first-child-wrapper">
			{children}
		</div>
	);
};

const SecondChildWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div css={styles.secondChildWrapperOneLine} data-testid="main-toolbar-second-child-wrapper">
			{children}
		</div>
	);
};

export const FullPageToolbarNext = ({
	editorAPI,
	beforeIcon,
	toolbarDockingPosition,
	editorView,
	popupsMountPoint,
	showKeyline,
	customPrimaryToolbarComponents,
	disabled,
}: FullPageToolbarNextProps) => {
	const components = editorAPI?.toolbar?.actions.getComponents();
	const intl = useIntl();
	const toolbar = components?.find((component) => component.key === TOOLBARS.PRIMARY_TOOLBAR);

	// When a toolbar portal context is provided, render the  toolbar inside a portal.
	// Otherwise fall back to a fragment just to avoid forking rendering logic.
	const { Portal: ToolbarPortal } = useToolbarPortal() ?? { Portal: React.Fragment };
	const hasToolbarPortal = ToolbarPortal !== React.Fragment;
	const mountPoint = hasToolbarPortal ? undefined : popupsMountPoint;

	const isShortcutToFocusToolbar = useCallback((event: KeyboardEvent) => {
		//Alt + F9 to reach first element in this main toolbar
		return event.altKey && event.key === 'F9';
	}, []);

	const handleEscape = useCallback(
		(event: KeyboardEvent) => {
			if (!editorView?.hasFocus()) {
				editorView?.focus();
			}
			event.preventDefault();
			event.stopPropagation();
		},
		[editorView],
	);

	return (
		<ContextPanelConsumer>
			{({ width: ContextPanelWidth }) => (
				<ToolbarArrowKeyNavigationProvider
					editorView={editorView}
					childComponentSelector="[data-testid='ak-editor-main-toolbar']"
					isShortcutToFocusToolbar={isShortcutToFocusToolbar}
					handleEscape={handleEscape}
					intl={intl}
				>
					<ToolbarPortal>
						<MainToolbarWrapper
							testId="ak-editor-main-toolbar"
							showKeyline={showKeyline || ContextPanelWidth > 0}
						>
							{beforeIcon && (
								<div
									css={[
										styles.mainToolbarIconBefore,
										expValEquals(
											'platform_editor_toolbar_support_custom_components',
											'isEnabled',
											true,
										) && styles.mainToolbarIconBeforeNew,
									]}
								>
									{beforeIcon}
								</div>
							)}
							{expValEquals(
								'platform_editor_toolbar_support_custom_components',
								'isEnabled',
								true,
							) ? (
								<>
									<FirstChildWrapper>
										{toolbarDockingPosition !== 'none' &&
											components &&
											isToolbar(toolbar) &&
											(!expValEquals('platform_editor_toolbar_aifc_patch_3', 'isEnabled', true) ||
												editorView) && (
												<ToolbarNext
													toolbar={toolbar}
													components={components}
													editorView={editorView}
													editorAPI={editorAPI}
													popupsMountPoint={mountPoint}
													editorAppearance="full-page"
													isDisabled={disabled}
												/>
											)}
									</FirstChildWrapper>
									<SecondChildWrapper>
										<div css={styles.customToolbarWrapperStyle}>
											{!!customPrimaryToolbarComponents &&
												'before' in customPrimaryToolbarComponents && (
													<div
														css={[styles.beforePrimaryToolbarComponents]}
														data-testid={'before-primary-toolbar-components-plugin'}
													>
														{customPrimaryToolbarComponents.before}
													</div>
												)}
											{!!customPrimaryToolbarComponents && 'after' in customPrimaryToolbarComponents
												? customPrimaryToolbarComponents.after
												: customPrimaryToolbarComponents}
										</div>
									</SecondChildWrapper>
								</>
							) : (
								toolbarDockingPosition !== 'none' &&
								components &&
								isToolbar(toolbar) &&
								(!expValEquals('platform_editor_toolbar_aifc_patch_3', 'isEnabled', true) ||
									editorView) && (
									<ToolbarNext
										toolbar={toolbar}
										components={components}
										editorView={editorView}
										editorAPI={editorAPI}
										popupsMountPoint={mountPoint}
										editorAppearance="full-page"
										isDisabled={disabled}
									/>
								)
							)}
						</MainToolbarWrapper>
					</ToolbarPortal>
				</ToolbarArrowKeyNavigationProvider>
			)}
		</ContextPanelConsumer>
	);
};
