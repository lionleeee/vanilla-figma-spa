import ShapeFactory from './shapes/ShapeFactory.js';

export default class DrawShape {
  constructor(context) {
    this.context = context;
  }

  draw(type, startPoint, endPoint, id, properties = {}) {
    const width = endPoint.x - startPoint.x;
    const height = endPoint.y - startPoint.y;

    let shape;

    switch (type) {
      case 'rectangle':
        shape = ShapeFactory.createShape(
          'rectangle',
          this.context,
          startPoint.x,
          startPoint.y,
          width,
          height,
          id,
          properties
        );
        break;
      case 'circle':
        const radius = Math.sqrt(width * width + height * height) / 2;
        shape = ShapeFactory.createShape(
          'circle',
          this.context,
          startPoint.x,
          startPoint.y,
          radius,
          id,
          properties
        );
        break;
      case 'line':
        shape = ShapeFactory.createShape(
          'line',
          this.context,
          startPoint.x,
          startPoint.y,
          endPoint.x,
          endPoint.y,
          id,
          properties
        );
        break;
      case 'text':
        shape = ShapeFactory.createShape(
          'text',
          this.context,
          startPoint.x,
          startPoint.y,
          id,
          properties
        );
        break;
    }

    if (shape) {
      shape.draw();
      return shape.getLayerInfo();
    }
  }
}
