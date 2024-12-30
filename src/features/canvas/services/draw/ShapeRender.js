export class ShapeRenderer {
  constructor(context) {
    this.context = context;
    this.config = {
      rectangle: { color: 'red', strokeColor: 'rgba(255, 0, 0, 0.5)' },
      circle: { color: 'blue', strokeColor: 'rgba(0, 0, 255, 0.5)' },
      text: { color: 'black', font: '20px Arial' },
    };
  }

  drawRectangle(context, x, y, width, height, isPreview = false) {
    const config = this.config.rectangle;
    context.beginPath();
    if (isPreview) {
      context.strokeStyle = config.strokeColor;
      context.strokeRect(x, y, width, height);
    } else {
      context.fillStyle = config.color;
      context.fillRect(x, y, width, height);
    }
  }

  drawCircle(context, x, y, radius, isPreview = false) {
    const config = this.config.circle;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    if (isPreview) {
      context.strokeStyle = config.strokeColor;
      context.stroke();
    } else {
      context.fillStyle = config.color;
      context.fill();
    }
  }

  drawText(context, x, y, text) {
    const config = this.config.text;
    context.fillStyle = config.color;
    context.font = config.font;
    context.fillText(text, x, y);
  }
}
