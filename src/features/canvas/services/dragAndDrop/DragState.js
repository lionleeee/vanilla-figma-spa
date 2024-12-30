export default class DragStateManager {
  constructor() {
    this.previousTarget = null;
    this.draggingItem = null;
    this.dropPosition = null;
  }

  setPreviousTarget(target) {
    this.previousTarget = target;
  }

  setDraggingItem(item) {
    this.draggingItem = item;
  }

  setDropPosition(position) {
    this.dropPosition = position;
  }

  clearState() {
    this.previousTarget = null;
    this.draggingItem = null;
    this.dropPosition = null;
  }

  isPreviousTarget(target) {
    return target === this.previousTarget;
  }

  isDraggingItem(target) {
    return target === this.draggingItem;
  }
}
