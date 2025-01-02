import Shape from '../base/Shape.js';

export default class Rectangle extends Shape {
  constructor(context, x, y, width, height) {
    super(context, x, y);
    this.width = width;
    this.height = height;
  }

  draw() {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  preview() {
    this.context.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  getLayerInfo() {
    return {
      type: 'rectangle',
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}
