import { createContext } from 'react';

export const SELECTION_STYLE_CONTEXT_DO_NOT_USE: import('react').Context<
	'notch' | 'border' | 'none'
> = createContext<'notch' | 'border' | 'none'>('border');
