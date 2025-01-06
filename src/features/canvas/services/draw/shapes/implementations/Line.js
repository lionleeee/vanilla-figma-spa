import Shape from '../base/Shape.js';

export default class Line extends Shape {
  constructor(context, x, y, endX, endY, id, properties = {}) {
    super(context, x, y, id);
    this.endX = endX;
    this.endY = endY;
    this.properties = properties;
  }

  draw() {
    const { color, opacity = 1, lineWidth = 2 } = this.properties;
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.lineWidth = lineWidth;
    this.context.globalAlpha = opacity;
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.endX, this.endY);
    this.context.stroke();
    this.context.globalAlpha = 1;
    this.context.lineWidth = 1;
  }

  preview() {
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(0, 0, 0, 1)';
    this.context.lineWidth = 2;
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.endX, this.endY);
    this.context.stroke();
  }

  getLayerInfo() {
    return {
      type: 'line',
      id: this.id,
      x: this.x,
      y: this.y,
      endX: this.endX,
      endY: this.endY,
      properties: this.properties,
    };
  }
}
