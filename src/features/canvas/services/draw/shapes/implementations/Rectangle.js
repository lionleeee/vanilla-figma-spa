import Shape from '../base/Shape.js';

export default class Rectangle extends Shape {
  constructor(context, x, y, width, height, id, properties = {}) {
    super(context, x, y, id);
    this.width = width;
    this.height = height;
    this.properties = properties;
  }

  draw() {
    const { color, opacity = 1 } = this.properties;
    this.context.fillStyle = color;
    this.context.globalAlpha = opacity;
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.globalAlpha = 1;
  }
  preview() {
    this.context.strokeStyle = 'rgba(255, 0, 0, 1)';
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  getLayerInfo() {
    return {
      type: 'rectangle',
      id: this.id,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      properties: this.properties,
    };
  }
}
