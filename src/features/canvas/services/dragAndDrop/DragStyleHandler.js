export default class DragStyleHandler {
  static addDraggingClass(element) {
    element?.classList.add('dragging');
  }

  static removeDraggingClass(element) {
    element?.classList.remove('dragging');
  }

  static removeDropLocation(element) {
    element?.classList.remove('drop-above', 'drop-below');
  }

  static addDropLocation(element, isAbove) {
    element?.classList.add(isAbove ? 'drop-above' : 'drop-below');
  }
}
