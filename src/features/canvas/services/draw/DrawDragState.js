export class DragState {
  constructor() {
    this.isDrawing = false;
    this.startPoint = null;
  }

  startDrag(point) {
    this.isDrawing = true;
    this.startPoint = point;
  }

  isDragging() {
    return this.isDrawing;
  }

  getStartPoint() {
    return this.startPoint;
  }

  reset() {
    this.isDrawing = false;
    this.startPoint = null;
  }
}
