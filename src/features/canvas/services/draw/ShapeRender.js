export class ShapeRenderer {
  constructor(context) {
    this.context = context;
    this.config = {
      rectangle: { color: 'red', width: 50, height: 50 },
      circle: { color: 'blue', radius: 25 },
      text: { color: 'black', font: '20px Arial' },
    };
  }

  drawRectangle(x, y) {
    const { color, width, height } = this.config.rectangle;
    this.context.fillStyle = color;
    this.context.fillRect(x - width / 2, y - height / 2, width, height);
  }

  drawCircle(x, y) {
    const { color, radius } = this.config.circle;
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.arc(x, y, radius, 0, Math.PI * 2);
    this.context.fill();
  }

  drawText(x, y, text) {
    const { color, font } = this.config.text;
    this.context.fillStyle = color;
    this.context.font = font;
    this.context.fillText(text, x, y);
  }
}
