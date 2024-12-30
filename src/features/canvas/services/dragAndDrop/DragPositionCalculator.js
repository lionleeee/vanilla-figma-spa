export default class DragPositionCalculator {
  static calculateDropPosition(e, targetArea) {
    return e.clientY < targetArea.top + targetArea.height / 2;
  }

  static isAboveFirstItem(e, firstItem) {
    return firstItem && e.clientY < firstItem.getBoundingClientRect().top;
  }

  static isBelowLastItem(e, lastItem) {
    return lastItem && e.clientY > lastItem.getBoundingClientRect().bottom;
  }
}
