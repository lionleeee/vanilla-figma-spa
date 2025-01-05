import ShapeFactory from './shapes/ShapeFactory.js';

export default class Preview {
  constructor(context) {
    this.context = context;
    this.canvas = this.createPreviewCanvas();
    this.previewContext = this.canvas.getContext('2d');
  }

  createPreviewCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.context.canvas.width;
    canvas.height = this.context.canvas.height;
    canvas.style.position = 'absolute';
    canvas.style.pointerEvents = 'none';

    const updatePosition = () => {
      const rect = this.context.canvas.getBoundingClientRect();
      canvas.style.top = `${rect.top}px`;
      canvas.style.left = `${rect.left}px`;
    };

    updatePosition();

    this.context.canvas.parentNode.appendChild(canvas);
    return canvas;
  }

  clear() {
    this.previewContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  previewShape(type, startPoint, currentPoint) {
    this.clear();

    const width = currentPoint.x - startPoint.x;
    const height = currentPoint.y - startPoint.y;

    let shape;
    switch (type) {
      case 'rectangle':
        shape = ShapeFactory.createShape(
          'rectangle',
          this.previewContext,
          startPoint.x,
          startPoint.y,
          width,
          height
        );
        break;
      case 'circle':
        const radius = Math.sqrt(width * width + height * height) / 2;
        shape = ShapeFactory.createShape(
          'circle',
          this.previewContext,
          startPoint.x,
          startPoint.y,
          radius
        );
        break;
      case 'line':
        shape = ShapeFactory.createShape(
          'line',
          this.previewContext,
          startPoint.x,
          startPoint.y,
          currentPoint.x,
          currentPoint.y,
          null,
          {}
        );
        break;
    }

    if (shape) {
      shape.preview();
    }
  }
}
