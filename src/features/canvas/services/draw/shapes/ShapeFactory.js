import Rectangle from './implementations/Rectangle.js';
import Circle from './implementations/Circle.js';

export default class ShapeFactory {
  static createShape(type, context, x, y, ...params) {
    switch (type) {
      case 'rectangle': {
        const [width, height, id] = params;
        return new Rectangle(context, x, y, width, height, id);
      }

      case 'circle': {
        const [radius, id] = params;
        return new Circle(context, x, y, radius, id);
      }

      default:
        throw new Error(`알수 없는 도구`);
    }
  }
}
