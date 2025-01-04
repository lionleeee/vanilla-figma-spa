import Rectangle from './implementations/Rectangle.js';
import Circle from './implementations/Circle.js';

export default class ShapeFactory {
  static createShape(type, context, x, y, ...params) {
    switch (type) {
      case 'rectangle': {
        const [width, height, id, properties] = params;
        return new Rectangle(context, x, y, width, height, id, properties);
      }

      case 'circle': {
        const [radius, id, properties] = params;
        return new Circle(context, x, y, radius, id, properties);
      }

      default:
        throw new Error(`알수 없는 도구`);
    }
  }
}
