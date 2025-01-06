import Shape from '../base/Shape.js';

export default class Text extends Shape {
  constructor(context, x, y, id, properties = {}) {
    super(context, x, y, id);
    this.properties = properties;
  }

  draw() {
    const {
      color,
      opacity = 1,
      text = 'Text',
      fontSize = '20px',
      fontFamily = 'Arial',
    } = this.properties;

    this.context.font = `${fontSize} ${fontFamily}`;
    this.context.fillStyle = color;
    this.context.globalAlpha = opacity;
    this.context.fillText(text, this.x, this.y);
    this.context.globalAlpha = 1;
  }

  preview() {
    const {
      text = 'Text',
      fontSize = '20px',
      fontFamily = 'Arial',
    } = this.properties;

    this.context.font = `${fontSize} ${fontFamily}`;
    this.context.fillStyle = 'rgba(0, 0, 255, 0.5)';
    this.context.fillText(text, this.x, this.y);
  }

  getLayerInfo() {
    return {
      type: 'text',
      id: this.id,
      x: this.x,
      y: this.y,
      properties: this.properties,
    };
  }
}
