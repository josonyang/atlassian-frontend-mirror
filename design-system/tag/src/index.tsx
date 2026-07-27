export { default } from './tag/internal/removable';
export { default as SimpleTag } from './tag/internal/simple';
export { RemovableTag } from './tag/removable-tag';
export type { RemovableTagProps } from './tag/internal/removable';
export type { SimpleTagProps } from './tag/internal/shared/types';

export type { AppearanceType, MigrationFallback, TagColor } from './types';

// Export new visual refresh components
export { default as AvatarTag } from './tag-new/avatar-tag';
export { default as TagDropdownTrigger } from './tag-new/tag-dropdown-trigger';
export type { NewTagColor, TagNewProps, TagDropdownTriggerProps } from './tag-new/types';
export type { AvatarTagProps, AvatarRenderProps, TypesOfAvatars } from './tag-new/avatar-tag';
