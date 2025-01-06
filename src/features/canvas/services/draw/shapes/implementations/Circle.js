import Shape from '../base/Shape.js';

export default class Circle extends Shape {
  constructor(context, x, y, radius, id, properties = {}) {
    super(context, x, y, id);
    this.radius = radius;
    this.properties = properties;
  }

  draw() {
    this.context.beginPath();
    const { color, opacity = 1 } = this.properties;
    this.context.fillStyle = color;
    this.context.globalAlpha = opacity;
    this.context.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
    this.context.fill();
  }

  preview() {
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(0, 0, 255, 0.5)';
    this.context.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
    this.context.stroke();
  }

  getLayerInfo() {
    return {
      type: 'circle',
      id: this.id,
      x: this.x,
      y: this.y,
      radius: this.radius,
      properties: this.properties,
    };
  }
}
