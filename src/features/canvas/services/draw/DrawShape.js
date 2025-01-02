import ShapeFactory from './shapes/ShapeFactory.js';

export default class DrawShape {
  constructor(context) {
    this.context = context;
  }

  draw(type, startPoint, endPoint, id) {
    const width = endPoint.x - startPoint.x;
    const height = endPoint.y - startPoint.y;

    console.log(type, startPoint, endPoint, id);
    let shape;
    switch (type) {
      case '사각형':
        shape = ShapeFactory.createShape(
          'rectangle',
          this.context,
          startPoint.x,
          startPoint.y,
          width,
          height,
          id
        );
        break;
      case '원형':
        const radius = Math.sqrt(width * width + height * height) / 2;
        shape = ShapeFactory.createShape(
          'circle',
          this.context,
          startPoint.x,
          startPoint.y,
          radius,
          id
        );
        break;
    }

    if (shape) {
      shape.draw();
      return shape.getLayerInfo();
    }
  }
}
