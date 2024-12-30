export default class DragStateManager {
  constructor() {
    this.previousTarget = null;
    this.draggingItem = null;
  }

  setPreviousTarget(target) {
    this.previousTarget = target;
  }

  setDraggingItem(item) {
    this.draggingItem = item;
  }

  clearState() {
    this.previousTarget = null;
    this.draggingItem = null;
  }

  isPreviousTarget(target) {
    return target === this.previousTarget;
  }

  isDraggingItem(target) {
    return target === this.draggingItem;
  }
}
