import { useContext } from 'react';

import { SurfaceContext } from './surface-context';
/**
 * __useSurface__
 *
 * Return the current surface. If no parent sets a surface color it falls back to the default surface.
 *
 * @see SurfaceContext
 */
export const useSurface: () => any = (): any => {
	return useContext(SurfaceContext);
};

SurfaceContext.displayName = 'SurfaceProvider';

export { SurfaceContext } from './surface-context';
