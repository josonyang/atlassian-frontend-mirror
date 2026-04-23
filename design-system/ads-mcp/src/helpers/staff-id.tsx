import { userInfo } from 'node:os';

// Get staff ID using the same logic as @repo-feature-flags-statsig
export const staffId: string =
	process.env.STAFF_ID || process.env.USER || process.env.ATLAS_USER || userInfo().username;
