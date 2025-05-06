export const USER_ARI_PREFIX = 'ari:cloud:identity::user/' as const;
export type UserARI = `${typeof USER_ARI_PREFIX}${string}`;
export const TEAM_ARI_PREFIX = 'ari:cloud:identity::team/' as const;
export type TeamARI = `${typeof TEAM_ARI_PREFIX}${string}`;
