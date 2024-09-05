import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { type DisplayViewModes } from '../../../../common/types';

import { DatasourceViewModeProvider, useViewModeContext } from './useViewModeContext';

describe('useViewModeContext custom hook', () => {
	const setup = ({
		defaultViewMode,
		disableDisplayDropdown = false,
	}: {
		defaultViewMode: DisplayViewModes | null;
		disableDisplayDropdown?: boolean;
	}) => {
		const wrapper = ({ children }: { children?: React.ReactNode }) => {
			return (
				<>
					{defaultViewMode ? (
						<DatasourceViewModeProvider
							viewMode={defaultViewMode}
							disableDisplayDropdown={disableDisplayDropdown}
						>
							{children}
						</DatasourceViewModeProvider>
					) : (
						<div>{children}</div>
					)}
				</>
			);
		};

		const { result, waitForNextUpdate, rerender } = renderHook(() => useViewModeContext(), {
			wrapper,
		});

		return {
			result,
			waitForNextUpdate,
			rerender,
		};
	};

	it('viewMode should be correctly set for an initial value', async () => {
		const { result } = setup({ defaultViewMode: 'table' });

		expect(result.current.currentViewMode).toEqual('table');
	});
	it('viewMode should be correctly set in context via the hook', async () => {
		const { result } = setup({ defaultViewMode: 'table' });

		expect(result.current.currentViewMode).toEqual('table');

		act(() => {
			result.current.setCurrentViewMode('inline');
		});

		expect(result.current.currentViewMode).toEqual('inline');
	});
	it('disableDisplayDropdown should be correctly set for an initial value', () => {
		const { result } = setup({ disableDisplayDropdown: true, defaultViewMode: 'table' });
		expect(result.current.disableDisplayDropdown).toBe(true);
	});
	it('should throw error if no context exists to wrap the component', () => {
		jest.spyOn(console, 'error').mockImplementation(jest.fn());
		const { result } = setup({ defaultViewMode: null });
		expect(result.error).not.toBe(undefined);
	});
});
