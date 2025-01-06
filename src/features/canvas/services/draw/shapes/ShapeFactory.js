import Rectangle from './implementations/Rectangle.js';
import Circle from './implementations/Circle.js';
import Line from './implementations/Line.js';
import Text from './implementations/Text.js';

export default class ShapeFactory {
  static createShape(type, ...args) {
    switch (type) {
      case 'rectangle':
        return new Rectangle(...args);
      case 'circle':
        return new Circle(...args);
      case 'line':
        return new Line(...args);
      case 'text':
        return new Text(...args);
      default:
        throw new Error(`Unknown shape type: ${type}`);
    }
  }
}
