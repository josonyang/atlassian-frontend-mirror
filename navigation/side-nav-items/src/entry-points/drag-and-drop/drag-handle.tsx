// Remove LazyDragHandle when "navx-4718-inline-drag-handle" is cleaned up.
export { LazyDragHandle } from '../../ui/menu-item/drag-handle/lazy-drag-handle';

// By exporting DragHandle, we are effectively breaking the bundling that the lazy-drag-handle was using.
// We can't use importCond in platform packages, so we don't have a choice.
export { DragHandleNew as DragHandle } from '../../ui/menu-item/drag-handle/drag-handle-new';
