import Shape from '../base/Shape.js';

export default class Circle extends Shape {
  constructor(context, x, y, radius) {
    super(context, x, y);
    this.radius = radius;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = 'blue';
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fill();
  }

  preview() {
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(0, 0, 255, 0.5)';
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.stroke();
  }

  getLayerInfo() {
    return {
      type: 'circle',
      x: this.x,
      y: this.y,
      radius: this.radius,
    };
  }
}
