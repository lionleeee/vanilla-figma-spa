import ShapeFactory from './shapes/ShapeFactory.js';

const SHAPE_TYPES = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  LINE: 'line',
};

export default class Preview {
  constructor(context) {
    this.context = context;
    this.canvas = this.createPreviewCanvas();
    this.previewContext = this.canvas.getContext('2d');
    this.initEventListeners();
  }

  handlePositionUpdate() {
    const { top, left } = this.getCanvasPosition();
    this.canvas.style.top = `${top}px`;
    this.canvas.style.left = `${left}px`;
  }

  initEventListeners() {
    this.handlePositionUpdate = this.handlePositionUpdate.bind(this);
    this.scrollContainer = document.querySelector('.canvas-wrapper');
    this.scrollContainer.addEventListener('scroll', this.handlePositionUpdate);
    window.addEventListener('resize', this.handlePositionUpdate);
  }

  getCanvasPosition() {
    const rect = this.context.canvas.getBoundingClientRect();
    return {
      top: rect.top - window.scrollY,
      left: rect.left + window.scrollX,
    };
  }

  createPreviewCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.context.canvas.width;
    canvas.height = this.context.canvas.height;

    this.setCanvasStyles(canvas);
    this.setCanvasPosition(canvas);

    this.context.canvas.parentNode.appendChild(canvas);
    return canvas;
  }

  setCanvasStyles(canvas) {
    canvas.style.position = 'absolute';
    canvas.style.pointerEvents = 'none';
  }

  setCanvasPosition(canvas) {
    const { top, left } = this.getCanvasPosition();
    canvas.style.top = `${top}px`;
    canvas.style.left = `${left}px`;
  }

  calculateShapeSize(startPoint, currentPoint) {
    return {
      width: currentPoint.x - startPoint.x,
      height: currentPoint.y - startPoint.y,
    };
  }

  clear() {
    this.previewContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  previewShape(type, startPoint, currentPoint) {
    this.clear();
    const dimensions = this.calculateShapeSize(startPoint, currentPoint);
    const shapeParams = this.getShapeParams(
      type,
      startPoint,
      currentPoint,
      dimensions
    );

    this.drawShape(type, shapeParams);
  }

  drawShape(type, shapeParams) {
    const shape = ShapeFactory.createShape(
      type,
      this.previewContext,
      ...shapeParams
    );
    if (shape) {
      shape.preview();
    }
  }

  getShapeParams(type, startPoint, currentPoint, shapeSize) {
    const { width, height } = shapeSize;

    switch (type) {
      case SHAPE_TYPES.RECTANGLE:
        return [startPoint.x, startPoint.y, width, height];

      case SHAPE_TYPES.CIRCLE:
        const radius = this.calculateRadius(width, height);
        return [startPoint.x, startPoint.y, radius];

      case SHAPE_TYPES.LINE:
        return [
          startPoint.x,
          startPoint.y,
          currentPoint.x,
          currentPoint.y,
          null,
          {},
        ];

      default:
        return [];
    }
  }

  calculateRadius(width, height) {
    return Math.sqrt(width * width + height * height) / 2;
  }
}
